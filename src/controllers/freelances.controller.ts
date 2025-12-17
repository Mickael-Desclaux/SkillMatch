import { type NextFunction, type Request, type Response } from "express";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto.js";
import {
	apply,
	checkExisting,
	checkMatchingProject,
	getAll,
	getAllFilteredBySkill,
	getById,
	getMatchingProjects,
	getProjectById,
	store,
} from "../services/freelances.service.js";

export async function createFreelance(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const body: CreateFreelanceDtoInputs = req.body;

		const existingFreelance = await checkExisting(body.email);
		if (existingFreelance)
			return res.jsonError(
				`An account already exists with the email ${body.email}`,
				409
			);

		const freelance = await store(body);

		return res.jsonSuccess(freelance, 201);
	} catch (error) {
		next(error);
	}
}

export async function getAllFreelances(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const skill = req.query.skill;

		if (skill && typeof skill === "string") {
			const freelances = await getAllFilteredBySkill(skill.toLowerCase());
			if (!freelances.length)
				return res.jsonError("No freelances found with this skill", 404);
			return res.jsonSuccess(freelances, 200);
		}

		const freelances = await getAll();
		if (!freelances.length) return res.jsonError("No freelances found", 404);

		return res.jsonSuccess(freelances, 200);
	} catch (error) {
		next(error);
	}
}

export async function getFreelanceById(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const id = req.params.id;
		if (!id) return res.jsonError("You must enter a valid id", 404);

		const freelance = await getById(+id);
		if (!freelance) return res.jsonError("No freelance found", 404);

		return res.jsonSuccess(freelance, 200);
	} catch (error) {
		next(error);
	}
}

export async function getAllMatchingProjects(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const id = req.params.id;
		if (!id) return res.jsonError("Please enter a valid freelance id", 404);

		const freelance = await getById(+id);
		if (!freelance) return res.jsonError("No freelance found", 404);

		const matchingProjects = await getMatchingProjects(freelance);
		if (!matchingProjects.length)
			return res.jsonError("No matching projects found", 404);

		return res.jsonSuccess(matchingProjects, 200);
	} catch (error) {
		next(error);
	}
}

export async function applyToProject(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const freelanceId = req.params.id;
		if (!freelanceId)
			return res.jsonError("Please enter a valid freelance id", 404);

		const projectId = req.params.projectId;
		if (!projectId)
			return res.jsonError("Please enter a valid project id", 404);

		const freelance = await getById(+freelanceId);
		if (!freelance) return res.jsonError("Freelance not found", 404);

		const project = await getProjectById(+projectId);
		if (!project) return res.jsonError("Project not found", 404);

		if (project.freelanceId === +freelanceId)
			return res.jsonError("You are already assigned to this project!", 409);

		const alreadyAssigned = project.freelanceId ? true : false;
		if (alreadyAssigned)
			return res.jsonError("This project is already assigned", 409);

		const matchingProject = await checkMatchingProject(freelance, project);
		if (!matchingProject)
			return res.jsonError("This project doesn't match with your profile", 401);

		await apply(+freelanceId, +projectId);

		return res.jsonSuccess(
			"Congratulations! You are no assigned to this project!",
			201
		);
	} catch (error) {
		next(error);
	}
}
