import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';


let server:Server
const port=5000

async function main() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        server=app.listen(port,()=>{
            console.log(`🔥 Note server is running on port ${port}`);
        });
    }
    catch(error){
        console.log(error)
    }
}

main()