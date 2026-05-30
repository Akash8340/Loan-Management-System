import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";


// REGISTER
export const registerUser = async (
    req: Request,
    res: Response
) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // generea token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({message: "User registered successfully", token, user});

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};




// LOGIN
export const loginUser = async (
    req: Request,
    res: Response
) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d"
            }
        );


        res.status(200).json({
            message: "Login Successful",
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};