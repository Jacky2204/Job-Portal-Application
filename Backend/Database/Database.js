import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()


const Database = async () => {
    try {
        const DB=await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is Connected Successfully")
    } catch (error) {
        console.error("Database connection error:", error);
    }
    
};

export default Database;
