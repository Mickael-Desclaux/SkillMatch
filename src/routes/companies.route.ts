import { Router } from "express";
import {
	createCompany,
	getAllCompanies,
	getCompanyById,
} from "../controllers/companies.controller.js";

const router = Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany);

export { router as CompanyRoute };
