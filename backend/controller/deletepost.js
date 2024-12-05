const userModel = require("../model/user");

exports.deletepost = async (req, res) =>{
   const {id , userId}  = req.query;
   console.log(req.query);
   
   try {
    const user = await userModel.findById(userId)
    if(!user){
      return res.status(404).json({ massage: 'User not exist'})
    }
    const postIndex  = await user.posts.findIndex((post)=> post._id.toString() === id)

    console.log(postIndex);
    
    if(postIndex === -1) return res.status(404).json({message : 'Post not found'});

    user.posts.pull({_id : id})
    await user.save()
    res.status(200).json({message : 'Deleted succesfully', data : user})
   
   } catch (error) {
      return res.status(404).json({message : error.message})
   }

}