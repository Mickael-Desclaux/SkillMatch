import type { Project } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type { FreelanceWithMatchingScore } from "../types/freelance";

export async function getOpenProjects(): Promise<Project[]> {
	return await prisma.project.findMany({
		where: {
			freelanceId: null,
		},
	});
}

export async function getProjectById(id: number): Promise<Project | null> {
	return prisma.project.findUnique({ where: { id } });
}

export async function getCandidates(
	project: Project
): Promise<FreelanceWithMatchingScore[]> {
	const candidates = await prisma.freelance.findMany();
	const candidatesWithScore: FreelanceWithMatchingScore[] = candidates.map(
		(candidate) => {
			const score = getMatchingScore(candidate.skills, project.requestedSkills);
			return {
				...candidate,
				score,
				matchingScore: `${score}%`,
			};
		}
	);
	return candidatesWithScore.sort((a, b) => b.score - a.score);
}

export function getMatchingScore(
	skills: string[],
	requestedSkills: string[]
): number {
	if (requestedSkills.length === 0) return 0;

	const matchingSkills = requestedSkills.filter((requestedSkill) =>
		skills.some((skill) => skill.toLowerCase() === requestedSkill.toLowerCase())
	);

	const score = (matchingSkills.length / requestedSkills.length) * 100;
	return Math.round(score);
}
