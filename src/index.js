import dotenv from "dotenv"
import mongoose from "mongoose"
import { DB_name } from "./constants.js";
import express from "express"
import connectDB from "./db/index.js";

const app = express();
dotenv.config({
    path:'./env'
})

//as connectb is a async func so when its got done it return promise so we can do .then and.catch
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000,()=>{
        console.log("Server is running kid at : ",PORT)
    })
    app.on("error",(error)=>{
        console.log("error:",error);
        throw error
    })
}).catch((error) => {
    console.log("MONGODB Connection Failed !!",error)
});


