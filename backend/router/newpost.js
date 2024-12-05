
const { newpost } = require("../controller/newpost");
const multer = require('multer')
const path  = require('path')
const router = require("express").Router();

const storage = multer.diskStorage({destination : (req, res, cb) => {
      cb(null, 'uploads/');
}, filname : (req, res, cb)=>{
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
}})


const upload = multer({storage : storage})


router.route('/newpost').post(upload.single('image'),newpost)

module.exports = router;