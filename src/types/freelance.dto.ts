import { z } from 'zod';

export const CreateFreelanceDtoSchema = z.object({
	name: z.string().min(1, 'Freelance name is required'),
	email: z.string().email('Invalid email address'),
	skills: z.array(z.string()).min(1, 'At least one skill is required'),
	dailyRate: z.number().positive('Daily rate must be positive'),
});

export type CreateFreelanceDtoInputs = z.infer<typeof CreateFreelanceDtoSchema>;
