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
