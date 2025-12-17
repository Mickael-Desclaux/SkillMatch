import type { NextFunction, Request, Response } from "express";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto.js";
import {
	checkExisting,
	getAll,
	getById,
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
