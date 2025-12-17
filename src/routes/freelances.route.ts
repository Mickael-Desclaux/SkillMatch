import { Router } from "express";
import {
	createFreelance,
	getAllFreelances,
	getAllMatchingProjects,
	getFreelanceById,
} from "../controllers/freelances.controller.js";

const router = Router();

router.get("/", getAllFreelances);
router.get("/:id", getFreelanceById);
router.get("/:id/matchingProjects", getAllMatchingProjects);
router.post("/", createFreelance);

export { router as FreelanceRoute };
