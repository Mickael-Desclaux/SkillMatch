import type { NextFunction, Request, Response } from "express";
import { getOpenProjects } from "../services/projects.service";

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
