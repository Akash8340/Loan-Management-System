import express from "express";

import {registerUser,loginUser} from "../controllers/authControllers";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me",authMiddleware,(req, res) => {
        res.status(200).json({
            message: "Protected Route Accessed"
        });
    }
);

export default router;