import {asynchandler} from "../utils/asynchandler.js"
import { Apierror } from "../utils/apierror.js"
import { use } from "react"
import { user } from "../models/user.model.js"
import { uploadoncloudinary } from "../utils/cloudinary.js"
import { upload } from "../middlewares/multer.js"
import { Apiresponse } from "../utils/apiresponse.js"
const registeruser = asynchandler(async (req,res)=>{
    //get user details from frontend
    //validation like formating or blank name/email
    //check if user already exist {unique email or username}
    //check for images , check for avatar
    //upload them to cloudinary
    //create user objects - creations call{create entry is db}
    //remove password and refresh token field from response
    //check for user creation
    //return response 


    //1.
    const {username,fullname,email,password} = req.body
    // console.log("email : ",email);


    //2.

   if (
    [fullname,username,email,password].some((field)=>field?.trime==="")
   ){
        throw new Apierror(400,"All fields are Required !!")
   }

   //3.
   //for this we import user from usermodel.js coz our user have direct connection with mongodb 

  const existeduser =  user.findOne({

    $or : [{username} , {email} ]
   })

   if(existeduser){
    throw new Apierror(409,"User Already Exist")
   }


   //4.

  const avatarlocalpath =  req.files?.avatar[0]?.path
  const coverImagelocalpath = req.files?.coverimage[0]?.path

  //check for avatar first befor upload

  if(!avatarlocalpath){
    throw new Apierror(400,"Avatar is required!")
  }

  //5.upload on cloudinary

  const avatar = await uploadoncloudinary(avatarlocalpath)
  const coverimage = await uploadoncloudinary(coverImagelocalpath)

  if(!avatar){
    throw new Apierror(400,"Avatar is required")
  }

  //6. create obj user

  const user = await user.create({
    fullname,
    avatar : avatar.url,
    coverimage:coverimage?.url || "",
    password,
    email,
    username : username.toLowerCase()
  })

  const createduser = await user.findById(user._id).select(
    "-password -refreshtokens"
  )

  if(!createduser){
    throw new Apierror(400,"Something went wrong on registring a user")

  }


  //return response
  return res.status(201).json(
    new Apiresponse(200,createduser,"user register succesfully")

  )
    




})

export {registeruser}

