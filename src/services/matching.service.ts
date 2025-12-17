import type { Freelance, Project } from "../generated/prisma/client";
import { prisma } from "../orm/client";

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

export async function getMatchingProjectsForFreelance(
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

export async function getMatchingCandidatesForProject(
	requestedSkills: string[],
	maxDailyRate: number
): Promise<Freelance[]> {
	return prisma.freelance.findMany({
		where: {
			AND: [
				{
					skills: {
						hasEvery: requestedSkills.map((skill) => skill.toLowerCase()),
					},
				},
				{
					dailyRate: {
						lte: maxDailyRate,
					},
				},
			],
		},
	});
}
