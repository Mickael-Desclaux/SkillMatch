import type { NextFunction, Request, Response } from "express";
import {
	addProject,
	getAll,
	getById,
	store,
} from "../services/companies.service.js";
import type {
	CreateCompanyDtoInputs,
	CreateProjectDtoInputs,
} from "../types/company.dto.js";

export async function createCompany(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const body: CreateCompanyDtoInputs = req.body;

		const company = await store(body);

		return res.jsonSuccess(company, 201);
	} catch (error) {
		next(error);
	}
}

export async function getAllCompanies(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const companies = await getAll();
		if (!companies) return res.jsonError("No companies found", 404);

		return res.jsonSuccess(companies, 200);
	} catch (error) {
		next(error);
	}
}

export async function getCompanyById(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const id = req.params.id;
		if (!id) return res.jsonError("You must enter a valid id", 404);

		const company = await getById(+id);
		if (!company) return res.jsonError("No company found", 404);

		return res.jsonSuccess(company, 200);
	} catch (error) {
		next(error);
	}
}

export async function createProject(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const body: CreateProjectDtoInputs = req.body;
		const id = req.params.id;
		if (!id) return res.jsonError("You must enter a valid id", 404);

		const company = await getById(+id);
		if (!company) return res.jsonError("No company found", 404);

		const project = await addProject(body, +id);

		return res.jsonSuccess(project, 201);
	} catch (error) {
		next(error);
	}
}
