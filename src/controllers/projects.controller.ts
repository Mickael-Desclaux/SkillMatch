import type { NextFunction, Request, Response } from "express";
import {
	getCandidates,
	getOpenProjects,
	getProjectById,
} from "../services/projects.service";

export async function getAllOpenProjects(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const projects = await getOpenProjects();
		if (!projects.length)
			return res.jsonError("No available projects found", 404);

		return res.jsonSuccess(projects, 200);
	} catch (error) {
		next(error);
	}
}

export async function getAllCandidates(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const projectId = req.params.id;
		if (!projectId) return res.jsonError("Project not found", 404);

		const project = await getProjectById(+projectId);
		if (!project) return res.jsonError("Project not found", 404);

		const allCandidates = await getCandidates(project);
		if (!allCandidates) return res.jsonError("No candidates found", 404);

		const candidatesWithoutScore = allCandidates.map(({ score, ...candidate }) => candidate);

		return res.jsonSuccess(candidatesWithoutScore, 200);
	} catch (error) {
		next(error);
	}
}
