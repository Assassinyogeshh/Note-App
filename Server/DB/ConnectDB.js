import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path:"./.env"});

const uri=process.env.DATABASE_URL

const ConnectMongo= async()=>{
    try {
        
     if (!uri) {
        throw new Error("DataBase error");
     }    
       
     await mongoose.connect(uri)

      console.log("Connected To The Mongoose");

    } catch (error) {
        console.log("Unable to Connect to the DB:", error);
    }
}

export default ConnectMongo;
