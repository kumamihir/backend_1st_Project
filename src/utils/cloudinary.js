import {v2} from "cloudinary"
import fs from "fs"


    cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadoncloudinary = async (LocalFilePath) => {
  try {
    if(!LocalFilePath){
      return null;
    }
    //uplad the file
    const response = await cloudinary.v2.uploader.upload(LocalFilePath,{
      resource_type : "auto"
    })
    //file has been uplaoded succesfully
    console.log("file is uploaded",response.url)
    return response;
  } catch (error) {
    fs.unlinkSync(LocalFilePath) // remove the locally saved temp files as the upload opr got failed
    return null;
  }
}


export {uploadoncloudinary}


// cloudinary.v2.uploader.upload("",{
//   public_id:"oly_flag"
// },
//   function(error,result) {console.log(result)}
// )
