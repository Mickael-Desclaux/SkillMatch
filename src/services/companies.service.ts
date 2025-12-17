import type { Company, Freelance, Project } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type {
	CreateCompanyDtoInputs,
	CreateProjectDtoInputs,
} from "../types/company.dto";
import { getMatchingCandidatesForProject } from "./matching.service";

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

export async function getProjects(id: number): Promise<Project[]> {
	return await prisma.project.findMany({
		where: { companyId: id },
	});
}

export async function getProjectById(
	companyId: number,
	projectId: number
): Promise<Project | null> {
	return await prisma.project.findUnique({
		where: {
			companyId,
			id: projectId,
		},
	});
}

export async function getMatchingCandidates(
	requestedSkills: string[],
	maxDailyRate: number
): Promise<Freelance[]> {
	return getMatchingCandidatesForProject(requestedSkills, maxDailyRate);
}
