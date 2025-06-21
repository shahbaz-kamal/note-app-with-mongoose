import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, minlength: [5,'Name must be at least 5 characters, got {VALUE}'], maxlength: 20 },
  lastName: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    min: [18, "Must be at least 18"],
    max: 60,
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    uppercase: true,
  },
});

export const User = model("USER", userSchema);
