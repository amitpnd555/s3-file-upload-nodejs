require("dotenv").config();
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()
const multer = require('multer')
const uuid = require("uuid").v4
const s3Uploadv2 = require("./s3Service")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file,cb) => {
//         const { originalname } = file;
//         cb(null, `${uuid()}-${originalname}`);
//     },
// })

const storage = multer.memoryStorage()

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.split("/")[0] == "image/jpeg") {
//         cb(null, true);
//     }else {
//         cb(new Error("file is not of the correct type"), false);
//     }
// };
const upload = multer({
    storage,
   // fileFilter,
});
app.post('/upload', upload.array('file'), async(req, res) => {
    const file = req.files[0];
    const result = await s3Uploadv2.s3Uploadv2(file);
    res.json({status:"Uploaded", result})
})


app.listen(PORT, () => console.log(`Server started at ${PORT}`));
