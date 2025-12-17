import { Router } from "express";
import {
	createCompany,
	createProject,
	getAllCompanies,
	getCompanyById,
} from "../controllers/companies.controller.js";

const router = Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.post("/:id/projects", createProject);

export { router as CompanyRoute };
