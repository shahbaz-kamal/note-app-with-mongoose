import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

 

 const userSchema=new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},   
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user'], default: 'user'}
 })

 export const User=model("USER", userSchema);