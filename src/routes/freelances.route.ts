import { Router } from "express";
import {
	createFreelance,
	getAllFreelances,
	getFreelanceById,
} from "../controllers/freelances.controller.js";

const router = Router();

router.get("/", getAllFreelances);
router.get("/:id", getFreelanceById);
router.post("/", createFreelance);

export { router as FreelanceRoute };
