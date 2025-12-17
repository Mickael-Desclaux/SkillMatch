import { Router } from "express";
import {
	getAllCandidates,
	getAllOpenProjects,
} from "../controllers/projects.controller";

const router = Router();

router.get("/open", getAllOpenProjects);
router.get("/:id/candidatesWithScore", getAllCandidates);

export { router as ProjectRouter };
