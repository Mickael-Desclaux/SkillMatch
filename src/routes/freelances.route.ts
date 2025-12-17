import { Router } from "express";
import {
	applyToProject,
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
router.post("/:id/apply/:projectId", applyToProject);

export { router as FreelanceRoute };
