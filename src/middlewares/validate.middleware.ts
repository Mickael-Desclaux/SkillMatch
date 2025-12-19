import type { NextFunction, Request, Response } from "express";
import { type ZodType, ZodError } from "zod";
import "../middlewares/json-api-response.middleware.js";

export function validateBody(schema: ZodType) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return res.jsonError(
					{
						message: "Validation error",
						errors: error.issues.map((err) => ({
							path: err.path.join("."),
							message: err.message,
						})),
					},
					400
				);
			}
			next(error);
		}
	};
}
