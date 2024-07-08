const multer = require('multer');
const path = require('path');
// Multer setup for file uploads

// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret
//   });

  // const storage = new CloudinaryStorage({
  //   cloudinary: cloudinary,
  //   params: {
  //     folder: 'uploads', // Optional: specify a folder in Cloudinary
  //     format: async (req, file) => 'jpg', // supports promises as well
  //     public_id: (req, file) => file.originalname.split('.')[0], // Optional: specify the public ID
  //   },
  // });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("multer file",file);
    cb(null, './uploads'); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });
module.exports = upload;
