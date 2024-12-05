const userModel = require("../model/user");
const mongoose = require("mongoose");



exports.newpost = async (req, res) =>{
   
    
    const filename  = req.file.filename;
    const userId = req.body.id;
    const content = req.body.content;
    
   
    

    let imgPath = `http://localhost:5000/uploads/${filename}`;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(201).json({ message: 'User not found' });
        }

       user.posts.push({image : imgPath, content : content, userID : user._id, username : user.username, userprofile : user.userprofile});
       const responce =   await user.save();
       return res.status(200).json({message : 'Added successfuly', data : responce}) 
       
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(201).json({ message: 'Failed to update profile photo', error: error.message });
    }
}