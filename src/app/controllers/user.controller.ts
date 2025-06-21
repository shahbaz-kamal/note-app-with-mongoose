import express, { Request, Response } from "express";
import { User } from "../models/user.model";
export const userRoutes = express.Router();

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  // Assuming you have a User model imported
  const user = await User.create(body);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: user,
  });
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
});

userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;
  const note = await User.findByIdAndUpdate(userId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "User updated successfully",
    note,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
