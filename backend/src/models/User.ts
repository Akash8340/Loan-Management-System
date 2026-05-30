import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    SALES = "SALES",
    SANCTION = "SANCTION",
    DISBURSEMENT = "DISBURSEMENT",
    COLLECTION = "COLLECTION",
    BORROWER = "BORROWER"
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.BORROWER
        }
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);