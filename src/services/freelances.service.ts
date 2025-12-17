import type { Freelance } from "../generated/prisma/client";
import { prisma } from "../orm/client";
import type { CreateFreelanceDtoInputs } from "../types/freelance.dto";

export async function checkExistingFreelance(email: string): Promise<boolean> {
	const freelance = await prisma.freelance.findUnique({
		where: { email },
	});

	return freelance ? true : false;
}

export async function storeFreelance(
	freelance: CreateFreelanceDtoInputs
): Promise<Freelance> {
	return await prisma.freelance.create({
		data: { ...freelance },
	});
}
