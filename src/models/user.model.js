import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userschema = new Schema(
    {   
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
         fullname:{
            type:String,
            required:true,
            // unique:true,
            // lowercase:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudnary url
            required:true,
        },
        coverimg:{
            type:String,
        },

         password:{
            type:string,
            required:[true,"Password is required nigga"],
            unique:true,
            // lowercase:true,
            trim:true,
            index:true
        },
           watchhistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
         ],

         refreshtokens:{
            type:string
         }



    },
    {timestamps:true}    
)

userschema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,12)
    next()
}) // imp - in this we dont wrtie arrow func bcose arrow func ke pass this ka refernce nhi hota so we write normak fucntion


userschema.methods.ispasswordcorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

userschema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email:this.email,
            username : this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userschema.methods.generatRefreshTokens = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const user = mongoose.model("User",userschema)
