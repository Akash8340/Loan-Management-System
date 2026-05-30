import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import roleMiddleware from "../middleware/roleMiddleware";

import {addPayment} from "../controllers/paymentControllers";

const router = express.Router();

router.post("/:loanId", authMiddleware, roleMiddleware("COLLECTION","ADMIN"), addPayment);

export default router;