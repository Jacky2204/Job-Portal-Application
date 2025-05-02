import { v2 as cloudinary } from "cloudinary";
import fs, { chownSync } from "fs"; // file system (read write remote karyala madat karte)

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloudinary = async (localfilepath) => {
  //locafilepath image chi url link
  try {
    if (!localfilepath) {
      console.log("could not file path");
    }
    const uploadData = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto", // file cha type konta ahe (img,video,pdf) check karte, ithe auto kele ahe
    });
    console.log(uploadData.secure_url, " file has been upload succefully");
    return uploadData.secure_url;
  } catch (e) {
    fs.unlinkSync(localfilepath); // he local la saved keleli file delete kart
    console.log(e);
  }
};

export default UploadOnCloudinary;
