const cloudinary = require('cloudinary').v2;

// Replace with your Cloudinary credentials
cloudinary.config({
  cloud_name: 'diwua1n2o', 
  api_key: '947741733778485',
  api_secret: 'e_ljHDRC4U7Ltudy8SSdaFHkYlY',
});

module.exports = cloudinary;
