const userModel = require('../model/user');

exports.profile = async (req, res) => {
  const filename = req.file.filename;
  const userId = req.body.id;
  const bio = req.body.bio
  const username = req.body.username

  if(!filename || !bio || !username) return rs.status(201).json({message : 'All data requierd'})
  
  let imgPath = `http://localhost:5000/uploads/${filename}`;
 

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(201).json({ message: 'User not found' });
    }

    user.profilePhoto = imgPath;
    user.bio = bio
    user.username = username;
    
    await user.save(); 
    return res.status(200).json({ message: 'Profile photo updated successfully' , user : user });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(201).json({ message: 'Failed to update profile photo', error: error.message });
  }
};
