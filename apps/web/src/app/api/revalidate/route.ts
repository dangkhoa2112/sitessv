import { createHmac, timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const revalidationSchema = z.object({
  path: z.string().min(1).optional(),
  paths: z.array(z.string().min(1)).optional(),
  type: z.enum(['page', 'layout']).optional()
});

function normalizePath(path: string) {
  if (path.includes('://')) return null;

  const pathname = path.split(/[?#]/)[0].trim();
  if (!pathname || pathname.startsWith('//')) return null;

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

function verifyWebhookSignature(secret: string, timestamp: string, rawBody: string, signature: string) {
  const parsedTimestamp = Number.isFinite(Number(timestamp)) ? Number(timestamp) : Date.parse(timestamp);
  if (!Number.isFinite(parsedTimestamp)) return false;

  const maxSkewMs = 5 * 60 * 1000;
  if (Math.abs(Date.now() - parsedTimestamp) > maxSkewMs) return false;

  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest();
  const normalizedSignature = signature.trim().replace(/^sha256=/i, '');

  let provided: Buffer;
  try {
    provided = Buffer.from(normalizedSignature, 'hex');
  } catch {
    return false;
  }

  if (provided.length !== expected.length) return false;
  return timingSafeEqual(expected, provided);
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Revalidation is not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  if (!rawBody.trim()) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const signature = request.headers.get('x-webhook-signature') || '';
  const timestamp = request.headers.get('x-webhook-timestamp') || '';

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const parsed = revalidationSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }

  const bodySecret = (payload as { secret?: string } | null)?.secret;
  const hasValidBodySecret = bodySecret ? bodySecret === secret : false;
  const hasValidSignature = signature && timestamp ? verifyWebhookSignature(secret, timestamp, rawBody, signature) : false;

  if (!hasValidBodySecret && !hasValidSignature) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requestedPaths = parsed.data.paths?.length
    ? parsed.data.paths
    : parsed.data.path
      ? [parsed.data.path]
      : [];

  const normalizedPaths = [...new Set(requestedPaths.map(normalizePath).filter((path): path is string => Boolean(path) && path.startsWith('/')))];

  if (normalizedPaths.length === 0) {
    return NextResponse.json({ error: 'No paths supplied' }, { status: 400 });
  }

  for (const path of normalizedPaths) {
    revalidatePath(path, parsed.data.type);
  }

  return NextResponse.json({
    ok: true,
    revalidated: normalizedPaths
  });
}
