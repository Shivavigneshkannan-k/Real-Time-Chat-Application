import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.DB_URI)
        console.log("db connection established!!!")
        return connection;
    }
    catch(err){
        console.log("db connection failed!!!")
    }
}
export default dbConnection;

