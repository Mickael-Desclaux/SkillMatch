import type { Freelance, Project } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto";
import {
	checkMatchingProject as checkMatch,
	getMatchingProjectsForFreelance,
} from "./matching.service";

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
	return getMatchingProjectsForFreelance(freelance);
}

export async function getProjectById(id: number): Promise<Project | null> {
	return await prisma.project.findUnique({ where: { id } });
}

export async function checkMatchingProject(
	freelance: Freelance,
	project: Project
): Promise<boolean> {
	return checkMatch(freelance, project);
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
