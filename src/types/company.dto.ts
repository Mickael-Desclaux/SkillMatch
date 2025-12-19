import { z } from 'zod';

export const CreateCompanyDtoSchema = z.object({
	name: z.string().min(1, 'Company name is required'),
	industry: z.string().min(1, 'Industry is required'),
});

export type CreateCompanyDtoInputs = z.infer<typeof CreateCompanyDtoSchema>;

export const CreateProjectDtoSchema = z.object({
	title: z.string().min(1, 'Project title is required'),
	description: z.string().min(1, 'Project description is required'),
	requestedSkills: z.array(z.string()).min(1, 'At least one skill is required'),
	maxDailyRate: z.number().positive('Daily rate must be positive'),
});

export type CreateProjectDtoInputs = z.infer<typeof CreateProjectDtoSchema>;
