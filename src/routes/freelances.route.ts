import { Router } from "express";
import {
	createFreelance,
	getAllFreelances,
} from "../controllers/freelances.controller.js";

const router = Router();

router.get("/", getAllFreelances);
router.post("/create", createFreelance);

export { router as FreelanceRoute };
