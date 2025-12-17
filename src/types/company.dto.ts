export interface CreateCompanyDtoInputs {
	name: string;
	industry: string;
}

export interface CreateProjectDtoInputs {
	title: string;
	description: string;
	requestedSkills: string[];
	maxDailyRate: number;
}
