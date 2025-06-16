import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); 


const connectDB = async ()=>{
    try {
        const connect=await mongoose.connect(process.env.mongodburl || "")
        console.log(`connected to DB ${connect.connection.host}`);
        
      } catch (error: any) {
        console.error((error as Error).message);
        process.exit(1);
    }
}

export default connectDB