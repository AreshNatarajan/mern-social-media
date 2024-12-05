const userModel = require("../model/user");

exports.getallpost = async(req, res)=>{
   try {
      const users = await userModel.find()
      const posts = await userModel.aggregate([{$unwind : "$posts"}, {$sample : {size : 20}}])
      const allposts = await posts.map((user)=> user.posts);
      return res.status(200).json({Message : 'Success', data : allposts, users : users})
   } catch (error) { 
      return res.status(404).json({message : error.message})
   }
}   