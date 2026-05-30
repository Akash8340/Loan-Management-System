import bcrypt from "bcryptjs";
import User, { UserRole } from "../models/User";

const users = [
{
    name: "Admin",
    email: "admin@lms.com",
    role: UserRole.ADMIN
},
{
    name: "Sales",
    email: "sales@lms.com",
    role: UserRole.SALES
},
{
    name: "Sanction",
    email: "sanction@lms.com",
    role: UserRole.SANCTION
},
{
    name: "Disbursement",
    email: "disbursement@lms.com",
    role: UserRole.DISBURSEMENT
},
{
    name: "Collection",
    email: "collection@lms.com",
    role: UserRole.COLLECTION
}
];

export const seedUsers =
async () => {

    const password =
        await bcrypt.hash(
            "123456",
            10
        );

    for (
        const user of users
    ) {

        const exists =
            await User.findOne({
                email:
                user.email
            });

        if (!exists) {

            await User.create({...user, password});

        }
    }
};