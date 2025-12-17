import type { NextFunction, Request, Response } from "express";
import { prisma } from "../orm/client.js";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto.js";

export async function createFreelance(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const body: CreateFreelanceDtoInputs = req.body;

		const existingFreelance = await prisma.freelance.findUnique({
			where: { email: body.email },
		});
		if (existingFreelance)
			return res.jsonError(
				`An account already exists with the email ${body.email}`,
				409
			);

		const freelance = await prisma.freelance.create({
			data: { ...body },
		});

		return res.jsonSuccess(freelance, 201);
	} catch (error) {
		next(error);
	}
}
