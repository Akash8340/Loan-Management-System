import mongoose, { Schema, Document } from "mongoose";

export enum LoanStatus {
    PENDING = "PENDING",
    APPLIED = "APPLIED",
    SANCTIONED = "SANCTIONED",
    REJECTED = "REJECTED",
    DISBURSED = "DISBURSED",
    CLOSED = "CLOSED"
}

export interface ILoan extends Document {
    borrower: mongoose.Types.ObjectId;
    fullName: string;
    pan: string;
    dob: Date;
    monthlySalary: number;
    employmentMode: string;

    loanAmount: number;
    tenure: number;

    interest: number;
    totalRepayment: number;
    outstandingAmount: number;

    status: LoanStatus;

    salarySlip?: string;

    rejectionReason?: string;
}

const loanSchema = new Schema<ILoan>(
    {
        borrower: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        fullName: String,

        pan: String,

        dob: Date,

        monthlySalary: Number,

        employmentMode: String,

        loanAmount: Number,

        tenure: Number,

        interest: Number,

        totalRepayment: Number,

        outstandingAmount: Number,

        status: {
            type: String,
            enum: Object.values(LoanStatus),
            default: LoanStatus.APPLIED
        },

        salarySlip: String,

        rejectionReason: String
    },
    { timestamps: true }
);

export default mongoose.model<ILoan>("Loan", loanSchema);