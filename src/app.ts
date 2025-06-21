import express, { Application, Request, Response } from "express";
import cors from "cors";
import { model, Schema } from "mongoose";

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

const noteSchema = new Schema(
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
  },
  { versionKey: false, timestamps: true }
);
// Define the Note model
const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  //approach 1: using mongoose model
  //   const myNote = new Note({
  //     title: "learning mongoose",
  //     tags: {
  //       label: "mongoose",
  //     },
  //   });

  //   await myNote.save();

  //approach 2: using mongoose model with request body
  const note = await Note.create(body);
  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    notes,
  });
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    note,
  });
});

app.patch("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "Notes updated successfully",
    note,
  });
});

app.delete("/notes/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  await Note.findByIdAndDelete(noteId);
  res.status(201).json({
    success: true,
    message: "Notes deleted successfully",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Note app is running on port 5000");
});

export default app;
