const Lecture =require('../newmodels/lecture');
const uploadOnCloudinary = require('../cloudinary');

exports.createLecture =async(req,res)=>{

    const filePath = req.file.path
    // console.log("from 39", typeof filePath);
    const cloudinaryResult = await uploadOnCloudinary(filePath);

    if (!cloudinaryResult) {
        return res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
    }
const video = cloudinaryResult.secure_url;
    // console.log(typeof cloudinaryResult.secure_url, cloudinaryResult.secure_url)

    const {title} =req.body;
// console.log(title,req.params.id);
    const lecture = await new Lecture({title,video,course:req.params.id});
    await lecture.save();

    res.status(201).json({lecture});
}

exports.getLectures =async(req,res)=>{

    const course = req.query.courseId;

    console.log(course,"course");
    // console.log("from getLectures line 27",course);
    const response =await Lecture.find({course});
    console.log("response of lecture line 29",response)

    res.status(200).json(response);
    console.log("getting lectures")

}

// exports.getLecturesById =async(req,res)=>{

//     course = req.query.courseId;
//     console.log("courseid",course);
//     // console.log("from getLectures line 27",course);
//     // const response =await Lecture.find({course});
//     // console.log("response of lecture line 29",response)

//     // res.status(200).json(response);

// }