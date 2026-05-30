import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

const roleMiddleware = (...roles: string[]) => {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {

        console.log("User Role:", req.user.role);
        console.log("Allowed Roles:", roles);

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        next();
    };
};

export default roleMiddleware;