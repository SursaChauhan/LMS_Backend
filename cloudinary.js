const cloudinary = require('cloudinary').v2;
const fs =require('fs')
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });


  const uploadOnCloudinary = async (filePath)=>{
 console.log(typeof filePath,filePath);
    try{
//upload the file on cloudinary
const res = await cloudinary.uploader.upload(filePath,{
    resource_type:"auto" 
});
console.log("file is uploaded on cloudianry",res);
fs.unlinkSync(filePath);
return res;

    }catch(error){
        console.log(error)
        if (filePath && typeof filePath === 'string' && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
return null ;
    }
  }
module.exports =uploadOnCloudinary;