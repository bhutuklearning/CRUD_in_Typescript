import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import type { AuthRequest } from "../middleware/auth.js";


// GET ALL USERS
export const getAllUsers = async (
    _req: Request,
    res: Response
): Promise<void> => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            createdAt: true,
        },
    });
    res.json(users);
};


// GET USER BY ID
export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {

    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            createdAt: true,
        },
    });
    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    res.json(user);
};


// GET CURRENT LOGGED-IN USER
export const getMe = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },

        select: {
            id: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) {
        res.status(404).json({
            message: "User not found",
        });

        return;
    }

    res.json(user);
};