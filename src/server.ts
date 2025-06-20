import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let server: Server;
const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xnok4yx.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("✅ Connected to MongoDB using mongoose");
    server = app.listen(port, () => {
      console.log(`🔥 Note server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
