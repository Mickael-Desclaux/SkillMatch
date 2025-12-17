import type { Freelance } from "../generated/prisma/client";

export interface FreelanceWithMatchingScore extends Freelance {
	score: number;
	matchingScore: string;
}
