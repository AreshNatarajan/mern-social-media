const cloudinary = require('../config/cloudinaryConfig');  // Import the cloudinary configuration
const userModel = require("../model/user");


exports.newpost = async (req, res) => {
    const { id, content } = req.body;

    try {
        // Check if image exists in the request
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: 'social-media-app/posts', // Optional: you can specify a folder in Cloudinary
            use_filename: true,
            unique_filename: true
        });

        // Get the image URL from Cloudinary
        const imgPath = uploadedImage.secure_url;

        // Find the user in the database
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Push the new post to the user's posts array
        user.posts.push({
            image: imgPath,
            content: content,
            userID: user._id,
            username: user.username,
            userprofile: user.userprofile,
        });

        // Save the user document with the new post
        const response = await user.save();
        return res.status(200).json({ message: 'Post added successfully', data: response });
        
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};
