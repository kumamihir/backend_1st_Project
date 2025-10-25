import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express();

app.use(cors())

app.use(express.json({"limit":"20kb"}))
app.use(express.urlencoded({extended:true,"limit":"16kb"}))

app.use(express.static("Public"))

app.use(cookieparser())

//Routes
 
import userRoute from './routes/user.routes.js'
//routes declaration
app.use("/api/v1/users",userRoute)


export  { app }