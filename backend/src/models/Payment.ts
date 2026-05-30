import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
    amount: number;
    paymentDate: Date;
}

const paymentSchema = new Schema<IPayment>(
    {
        loan: {
            type: Schema.Types.ObjectId,
            ref: "Loan"
        },

        utrNumber: {
            type: String,
            unique: true
        },

        amount: Number,

        paymentDate: Date
    },
    { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", paymentSchema);