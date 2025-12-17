import type { Company, Project } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type {
	CreateCompanyDtoInputs,
	CreateProjectDtoInputs,
} from "../types/company.dto";

export async function store(company: CreateCompanyDtoInputs): Promise<Company> {
	return await prisma.company.create({
		data: {
			...company,
			industry: company.industry.toLowerCase(),
		},
	});
}

export async function getAll(): Promise<Company[]> {
	return await prisma.company.findMany();
}

export async function getById(id: number): Promise<Company | null> {
	return await prisma.company.findUnique({
		where: { id },
	});
}

export async function addProject(
	project: CreateProjectDtoInputs,
	companyId: number
): Promise<Project> {
	return await prisma.project.create({
		data: {
			...project,
			requestedSkills: project.requestedSkills.map((skill) =>
				skill.toLowerCase()
			),
			companyId,
		},
	});
}
