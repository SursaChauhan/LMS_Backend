const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
 
  destination: function (req, file, cb) {
    console.log("multer file 7",file);
    cb(null, './uploads'); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    console.log("multer applied line 11")
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});


const fileFilter = (req, file, cb) => {
  console.log("multer applied line 18")
  const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
  }
};

const upload = multer({ storage,
  fileFilter: fileFilter,
 });
module.exports = upload;
