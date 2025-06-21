import express, { Application, Request, Response } from "express";
import cors from "cors";
import { model, Schema } from "mongoose";
import { Note } from "./app/models/notes.model";
import { notesRoutes } from "./app/controllers/notes.controller";

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

// redirecting routes
app.use("/notes",notesRoutes);



app.get("/", (req: Request, res: Response) => {
  res.send("Note app is running on port 5000");
});

export default app;
