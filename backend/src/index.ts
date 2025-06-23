import express from "express";
import connectDb from "./db";
import rootRouter from  "./routes/indexRoute"
import cors from 'cors'

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // change to your frontend URL if needed
  credentials: true
}))
app.use(express.json())
app.use("/api/v1" , rootRouter)

const serverStart = async () => {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log("failed to start the server");
    process.exit(1);
  }
};

serverStart();
