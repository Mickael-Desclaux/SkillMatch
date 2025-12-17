import type { Company } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type { CreateCompanyDtoInputs } from "../types/company.dto";

export async function store(company: CreateCompanyDtoInputs): Promise<Company> {
	return await prisma.company.create({
		data: {
			...company,
			industry: company.industry.toLowerCase(),
		},
	});
}

export async function getAll(): Promise<Company[]> {
	return await prisma.company.findMany();
}

export async function getById(id: number): Promise<Company | null> {
	return await prisma.company.findUnique({
		where: { id },
	});
}
