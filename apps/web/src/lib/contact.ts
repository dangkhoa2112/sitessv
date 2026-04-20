import { z } from 'zod';

export const contactSubmissionSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(4000),
  companyWebsite: z.string().trim().optional().default(''),
  locale: z.enum(['vi', 'en'])
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
