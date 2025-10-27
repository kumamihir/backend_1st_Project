import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadoncloudinary = async (LocalFilePath) => {
  try {
    if (!LocalFilePath) {
      return null;
    }

    // upload the file
    const response = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto"
    });

    // file has been uploaded successfully
    console.log("file is uploaded", response.url);
    fs.unlinkSync(LocalFilePath)
    return response;

  } catch (error) {
    // remove the locally saved temp file if upload failed
    fs.unlinkSync(LocalFilePath);
    return null;
  }
};

export { uploadoncloudinary };