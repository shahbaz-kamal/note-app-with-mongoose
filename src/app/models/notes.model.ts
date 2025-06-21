import { model, Schema } from "mongoose";
import { INote } from "../interfaces/notes.interface";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["personal", "work", "study", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "gray" },
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
  },
  { versionKey: false, timestamps: true }
);
// Define the Note model
export const Note = model("Note", noteSchema);
