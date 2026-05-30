import { Request, Response } from "express";
import Payment from "../models/Payment";
import Loan, { LoanStatus } from "../models/Loan";
import mongoose from "mongoose";

export const addPayment = async (
    req: Request,
    res: Response
) => {
    try {

        const loanId = String(req.params.loanId);

        if (!mongoose.Types.ObjectId.isValid(loanId)) {
            return res.status(400).json({
                message: "Invalid loan id"
            });
        }

        const {
            utrNumber,
            amount,
            paymentDate
        } = req.body;

        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found"
            });
        }

        const existingUTR = await Payment.findOne({
            utrNumber
        });

        if (existingUTR) {
            return res.status(400).json({
                message: "UTR already exists"
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        if (amount > loan.outstandingAmount) {
            return res.status(400).json({
                message: "Payment exceeds outstanding amount"
            });
        }

        const payment = await Payment.create({
            loan: loan._id,
            utrNumber,
            amount,
            paymentDate
        });

        loan.outstandingAmount -= amount;

        if (loan.outstandingAmount <= 0) {
            loan.status = LoanStatus.CLOSED;
            loan.outstandingAmount = 0;
        }

        await loan.save();

        return res.status(201).json({
            success: true,
            message: "Payment recorded successfully",
            payment,
            outstandingAmount: loan.outstandingAmount,
            loanStatus: loan.status
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};