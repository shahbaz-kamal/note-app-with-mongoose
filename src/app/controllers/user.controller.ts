import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { User } from "../models/user.model";

export const userRoutes = express.Router();

// const CreateUserZodSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   age: z.number().min(18).max(60),
//   email: z.string(),
//   password: z.string(),
//   role: z.string().optional(),
// });

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log(body);

    // const body = await CreateUserZodSchema.parseAsync(req.body);
    // console.log(body);
    // Assuming you have a User model imported
    // 
 // Built in and custom instance method
    // const user = new User(body);
    // const password = await user.hashPasswords(body.password);
    // user.password = password;
    // await user.save();

//built in and custom static method

// const password=await User.hashPasswords(body.password);
// body.password= password;
const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
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
//   await User.findByIdAndDelete(userId);
const user=await User.findOneAndDelete({ _id: userId });
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
