import express,{Application, Request, Response} from 'express';


const app:Application= express();


app.get("/",(req:Request,res:Response)=>{
    res.send("Note app is running on port 5000")
})

export default app;