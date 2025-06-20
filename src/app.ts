import express, { Application, Request, Response } from "express";
import cors from "cors";
import { model, Schema } from "mongoose";

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

const noteSchema = new Schema({ title: String, content: String });
// Define the Note model
const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "learning mongoose",
    content: "I am learning mongoose",
  });

  await myNote.save();
  
  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Note app is running on port 5000");
});

export default app;
