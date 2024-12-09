const { newpost } = require("../controller/newpost");
const multer = require('multer');
const path = require('path');
const router = require("express").Router();

// Define multer storage for temporary file handling
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');  // Images are temporarily stored locally before being uploaded to Cloudinary
    },
    filename: (req, res, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'image-' + uniqueSuffix + path.extname(req.file.originalname));
    }
});

const upload = multer({ storage: storage });

router.route('/newpost').post(upload.single('image'), newpost);  // Uploads the file, then handles the post creation

module.exports = router;
