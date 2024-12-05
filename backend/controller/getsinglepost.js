const userModel = require("../model/user");

exports.getsinglepost = async (req, res) => {
  const { id, userId } = req.query; 
   

  try {
    const user = await userModel.findById(userId);
    if(!user) return res.status(404).json({message : 'User not found'})

    const post = await user.posts.id(id)
    
   
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({message : 'success', data : post});
    
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: err.message })
  }
 
};
