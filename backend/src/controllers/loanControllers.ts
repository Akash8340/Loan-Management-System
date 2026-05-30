import { Request, Response } from "express";

import Loan, { LoanStatus } from "../models/Loan";
import { AuthRequest } from "../middleware/authMiddleware";

import { runBRE } from "../services/breService";

// applyLoan controller
export const applyLoan = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const {fullName,pan,dob,monthlySalary,employmentMode,loanAmount,tenure} = req.body;

        const bre = runBRE(
            dob,
            monthlySalary,
            employmentMode,
            pan
        );

        if (!bre.success) {
            return res.status(400).json(bre);
        }

        const interest =
            (loanAmount * 12 * tenure) /
            (365 * 100);

        const totalRepayment =
            loanAmount + interest;

        const loan = await Loan.create({

            borrower: req.user.id,

            fullName,
            pan,
            dob,

            monthlySalary,
            employmentMode,

            loanAmount,
            tenure,

            interest,

            totalRepayment,

            outstandingAmount:
                totalRepayment,

            status: LoanStatus.APPLIED
        });

        return res.status(201).json({
            success: true,
            loan
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};

// getMyLoans controller
export const getMyLoans = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const loans = await Loan.find({
            borrower: req.user.id
        });

        res.status(200).json(loans);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// getAppliedLoans controller
export const getAppliedLoans = async (
    req: Request,
    res: Response
) => {

    try {

        const loans = await Loan.find({
            status: LoanStatus.APPLIED
        }).populate(
            "borrower",
            "name email"
        );

        res.json(loans);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// sanctionLoan controller
export const sanctionLoan = async (
    req: Request,
    res: Response
) => {

    try {

        const { id } = req.params;

        const loan =
            await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found"
            });
        }

        loan.status =
            LoanStatus.SANCTIONED;

        await loan.save();

        res.json({
            message:
                "Loan sanctioned"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// rejectLoan controller
export const rejectLoan = async (
    req: Request,
    res: Response
) => {

    try {

        const { id } = req.params;
        const { reason } = req.body;

        const loan =
            await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found"
            });
        }

        loan.status =
            LoanStatus.REJECTED;

        loan.rejectionReason =
            reason;

        await loan.save();

        res.json({
            message:
                "Loan rejected"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// getSanctionedLoans controller
export const getSanctionedLoans = async (
    req: Request,
    res: Response
) => {
    try {

        const loans = await Loan.find({
            status: LoanStatus.SANCTIONED
        }).populate("borrower", "name email");

        return res.status(200).json({
            success: true,
            count: loans.length,
            loans
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server Error"
        });

    }
};

// disburseLoan controller
export const disburseLoan = async (
    req: Request,
    res: Response
) => {

    try {

        const loan =
            await Loan.findById(
                req.params.id
            );

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found"
            });
        }

        loan.status =
            LoanStatus.DISBURSED;

        await loan.save();

        res.json({
            message:
                "Loan disbursed"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// getAllLoans controller
export const getAllLoans = async (
    req: Request,
    res: Response
) => {

    const loans =
        await Loan.find()
        .populate(
            "borrower",
            "name email"
        );

    res.json(loans);
};

// getLoanById controller
export const getLoanById = async (
    req: Request,
    res: Response
) => {
    try {

        const loan = await Loan.findById(
            req.params.id
        ).populate(
            "borrower",
            "name email"
        );

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found"
            });
        }

        return res.status(200).json(loan);

    } catch (error) {

        return res.status(500).json({
            message: "Server Error"
        });
    }
};


// uploadSalarySlip controller
export const uploadSalarySlip =
async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const { id } =
            req.params;

        const loan =
            await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({
                message:
                    "Loan not found"
            });
        }

        loan.salarySlip =
            req.file?.path || "";

        await loan.save();

        return res.status(200).json({
            message:
                "Salary slip uploaded",
            file:
                loan.salarySlip
        });

    } catch (error) {

        return res.status(500).json({
            message:
                "Server Error"
        });

    }
};

// getDisbursedLoans controller
export const getDisbursedLoans = async (
    req: Request,
    res: Response
) => {
    try {

        const loans = await Loan.find({
            status: LoanStatus.DISBURSED
        }).populate(
            "borrower",
            "name email"
        );

        return res.status(200).json({
            success: true,
            loans
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server Error"
        });
    }
};