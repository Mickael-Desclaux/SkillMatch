import type { Freelance, Project } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto";

export async function checkExisting(email: string): Promise<boolean> {
	const freelance = await prisma.freelance.findUnique({
		where: { email },
	});

	return freelance ? true : false;
}

export async function store(
	freelance: CreateFreelanceDtoInputs
): Promise<Freelance> {
	return await prisma.freelance.create({
		data: {
			...freelance,
			skills: freelance.skills.map((skill) => skill.toLowerCase()),
		},
	});
}

export async function getAll(): Promise<Freelance[]> {
	return await prisma.freelance.findMany();
}

export async function getById(id: number): Promise<Freelance | null> {
	return await prisma.freelance.findUnique({
		where: { id },
	});
}

export async function getMatchingProjects(
	freelance: Freelance
): Promise<Project[]> {
	const allProjects = await prisma.project.findMany({
		where: {
			maxDailyRate: {
				gte: freelance.dailyRate,
			},
		},
	});

	const freelanceSkills = freelance.skills.map((skill) => skill.toLowerCase());
	return allProjects.filter((project) =>
		project.requestedSkills.every((skill) =>
			freelanceSkills.includes(skill.toLowerCase())
		)
	);
}

export async function getProjectById(id: number): Promise<Project | null> {
	return await prisma.project.findUnique({ where: { id } });
}

export async function checkMatchingProject(
	freelance: Freelance,
	project: Project
): Promise<boolean> {
	const matchingDailyRate = freelance.dailyRate <= project.maxDailyRate;

	const freelanceSkills = freelance.skills.map((s) => s.toLowerCase());
	const matchingSkills = project.requestedSkills.every((skill) =>
		freelanceSkills.includes(skill.toLowerCase())
	);

	return matchingDailyRate && matchingSkills;
}

export async function apply(
	freelanceId: number,
	projectId: number
): Promise<void> {
	await prisma.project.update({
		where: { id: projectId },
		data: {
			freelanceId,
		},
	});
}
