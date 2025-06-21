import  express, { Request, Response }  from 'express';
import { Note } from '../models/notes.model';


export const notesRoutes=express.Router();

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
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
  
  notesRoutes.get("/", async (req: Request, res: Response) => {
    const notes = await Note.find();
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      notes,
    });
  });
  
  notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);
    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      note,
    });
  });
  
  notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
    res.status(201).json({
      success: true,
      message: "Notes updated successfully",
      note,
    });
  });
  
  notesRoutes.delete("/:noteId", async (req, res) => {
    const noteId = req.params.noteId;
    await Note.findByIdAndDelete(noteId);
    res.status(201).json({
      success: true,
      message: "Notes deleted successfully",
    });
  });