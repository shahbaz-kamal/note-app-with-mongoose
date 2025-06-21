import express, { Application, Request, Response } from "express";
import cors from "cors";
import { notesRoutes } from "./app/controllers/notes.controller";
import { userRoutes } from "./app/controllers/user.controller";

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

// redirecting routes 
app.use("/notes", notesRoutes);
app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Note app is running on port 5000");
});

export default app;
