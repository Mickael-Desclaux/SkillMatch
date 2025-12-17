import { Router } from "express";
import { createFreelance } from "../controllers/freelances.controller.js";

const router = Router();

router.post("/create", createFreelance);

export { router as FreelanceRoute };
