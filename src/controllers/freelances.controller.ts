import type { NextFunction, Request, Response } from "express";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto.js";
import {
	checkExistingFreelance,
	getFreelances,
	storeFreelance,
} from "../services/freelances.service.js";

export async function createFreelance(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const body: CreateFreelanceDtoInputs = req.body;

		const existingFreelance = await checkExistingFreelance(body.email);
		if (existingFreelance)
			return res.jsonError(
				`An account already exists with the email ${body.email}`,
				409
			);

		const freelance = await storeFreelance(body);

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
		const freelances = await getFreelances();
		if (!freelances) return res.jsonError("No freelances found", 404);

		return res.jsonSuccess(freelances, 200);
	} catch (error) {
		next(error);
	}
}
