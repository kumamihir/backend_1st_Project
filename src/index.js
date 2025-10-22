import dotenv from "dotenv"
import mongoose from "mongoose"
import { DB_name } from "./constants.js";
import express from "express"

const app = express();
dotenv.config({
    path:'./env'
})


// this is firse approach function approach
// function connectDB(){

// }

// connectDB()

//2nd approach which is "IIFE"
//immediate invoke func

;( async ()=>{
    try{
       await mongoose.connect(`${process.env.MongoDB_Url}/${DB_name}`)
       app.on("error",(error)=>{
        console.log("Error while talking to database")
        throw error
       })
       console.log(`MongoDB is connected !! ${process.env.MongoDB_Url}`)
        app.listen(process.env.PORT,()=>{
        console.log(`app is listening on PORT ${process.env.PORT}`)
    })
    }
   
    catch(error){
        console.log("error :",error);
        throw error
    }
})()