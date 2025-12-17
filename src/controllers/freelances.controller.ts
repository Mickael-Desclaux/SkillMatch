import type { NextFunction, Request, Response } from "express";
import { prisma } from "../orm/client.js";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto.js";
import {
	checkExistingFreelance,
	storeFreelance,
} from "../services/freelances.service.js";
import type { JsonApiResponse } from "../middlewares/json-api-response.middleware.js";

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
