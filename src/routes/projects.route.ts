import { Router } from "express";
import { getAllOpenProjects } from "../controllers/projects.controller";

const router = Router();

router.get("/open", getAllOpenProjects);

export { router as ProjectRouter };
