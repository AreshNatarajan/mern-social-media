exports.updateUserProfile = async (req, res) => {
    try {
      const { userId } = req.params; // Assuming the user ID is passed in the URL
      console.log(req);
      
      const { profilePhoto, followers, following, saved, username, email,  } = req.body;

      // if(!profilePhoto || !username ) 
  
      // Find user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(201).json({ message: 'User not found' });
      }
  
      // Update user fields (make sure to only update the fields that are being passed in the request)
      user.profilePhoto = profilePhoto || user.profilePhoto;
      user.username = username || user.username;

      user.email = email || user.email;
      user.followers = followers || user.followers;
      user.following = following || user.following;
      user.saved = saved || user.saved;
  
      await user.save();
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(201).json({ message: 'Server error' });
    }
  };