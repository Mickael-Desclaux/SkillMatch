import type { Freelance } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto";

export async function checkExisting(email: string): Promise<boolean> {
	const freelance = await prisma.freelance.findUnique({
		where: { email },
	});

	return freelance ? true : false;
}

export async function store(
	freelance: CreateFreelanceDtoInputs
): Promise<Freelance> {
	return await prisma.freelance.create({
		data: {
			...freelance,
			skills: freelance.skills.map((skill) => skill.toLowerCase()),
		},
	});
}

export async function getAll(): Promise<Freelance[]> {
	return prisma.freelance.findMany();
}

export async function getById(id: number): Promise<Freelance | null> {
	const freelance = prisma.freelance.findUnique({
		where: { id },
	});

	return freelance;
}
