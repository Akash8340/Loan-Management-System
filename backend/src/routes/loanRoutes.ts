import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
import { applyLoan, getMyLoans, getAppliedLoans, sanctionLoan, rejectLoan, disburseLoan, getSanctionedLoans, getAllLoans, getLoanById, uploadSalarySlip, getDisbursedLoans } from "../controllers/loanControllers";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

router.post("/apply", authMiddleware, applyLoan);
router.get("/my-loans",authMiddleware,getMyLoans);
router.get("/applied",authMiddleware,roleMiddleware("SANCTION","ADMIN"),getAppliedLoans);
router.get("/sanctioned",authMiddleware,roleMiddleware("SANCTION", "ADMIN"),getSanctionedLoans);
router.get("/",authMiddleware,roleMiddleware("ADMIN"),getAllLoans);
router.get("/:id",authMiddleware,getLoanById);
router.get("/disbursed",authMiddleware,roleMiddleware("COLLECTION","ADMIN"),getDisbursedLoans);

router.patch("/:id/sanction",authMiddleware,roleMiddleware("SANCTION","ADMIN"),sanctionLoan);
router.patch("/:id/reject",authMiddleware,roleMiddleware("SANCTION","ADMIN"),rejectLoan);
router.patch("/:id/disburse",authMiddleware,roleMiddleware("DISBURSEMENT","ADMIN"),disburseLoan);

router.post("/:id/upload-slip",authMiddleware,upload.single("salarySlip"),uploadSalarySlip);


export default router;