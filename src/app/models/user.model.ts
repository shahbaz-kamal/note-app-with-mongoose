import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser,Model<IUser>,UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, "First Name keno daw nai"],
      minlength: [5, "Name must be at least 5 characters, got {VALUE}"],
      maxlength: 20,
    },
    lastName: { type: String, required: true },
    age: {
      type: Number,
      required: true,
      min: [18, "Must be at least 18"],
      max: 60,
    },
    email: {
      type: String,
      required: [true, "Ei email exist kore"],
      unique: true,
      lowercase: true,
      // validate:{
      //     validator: function(v){
      //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      //     },
      //     message: props => `${props.value} is not a valid email!`
      // }
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Role must be either admin or user",
      },
      default: "user",
    },
    address: {
      type: addressSchema,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.method("hashPasswords",async function(plainPassword:string){
    const password=await bcrypt.hash(plainPassword, 10);
//   this.password = password;
return password
})

export const User = model("User", userSchema);
