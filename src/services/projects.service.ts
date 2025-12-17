import type { Project } from "../generated/prisma/client";
import { prisma } from "../orm/client";

export async function getOpenProjects(): Promise<Project[]> {
	return await prisma.project.findMany({
		where: {
			freelanceId: null,
		},
	});
}
