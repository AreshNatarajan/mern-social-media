const express = require('express');
const multer = require('multer');
const path = require('path');
const { profile } = require('../controller/profile');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


const router = express.Router();


router.route('/profile').post( upload.single('image'), profile);

module.exports = router;
