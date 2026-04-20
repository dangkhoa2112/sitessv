import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { contactSubmissionSchema } from '@/lib/contact';

export const runtime = 'nodejs';

const DEFAULT_RECIPIENT = 'support@fintrust.vn';
const DEFAULT_TIMEOUT_MS = 5000;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid payload',
        issues: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const requestId = randomUUID();
  const recipient = process.env.CONTACT_FORM_RECIPIENT || DEFAULT_RECIPIENT;
  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
  const timeoutCandidate = Number(process.env.CONTACT_FORM_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);
  const timeoutMs = Number.isFinite(timeoutCandidate) && timeoutCandidate > 0 ? timeoutCandidate : DEFAULT_TIMEOUT_MS;
  const headers = {
    'Content-Type': 'application/json',
    ...(process.env.CONTACT_FORM_WEBHOOK_SECRET ? { 'X-Webhook-Secret': process.env.CONTACT_FORM_WEBHOOK_SECRET } : {})
  };

  if (!webhookUrl) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          error: 'Contact channel is not configured',
          message: 'Contact channel is not configured',
          requestId
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Submitted successfully',
        requestId,
        recipient,
        strategy: 'Development fallback. Configure CONTACT_FORM_WEBHOOK_URL for production delivery.'
      },
      { status: 200 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        ...parsed.data,
        requestId,
        receivedAt: new Date().toISOString(),
        source: 'web-contact-form',
        userAgent: request.headers.get('user-agent') || undefined,
        referrer: request.headers.get('referer') || undefined
      })
    });

    if (!response.ok) {
      const upstreamMessage = await response.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'Failed to forward contact submission',
          requestId,
          status: response.status,
          detail: upstreamMessage.slice(0, 500)
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Submitted successfully',
        requestId,
        recipient,
        strategy: 'Forwarded to configured contact webhook'
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Contact submission failed',
        requestId,
        detail: message
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
