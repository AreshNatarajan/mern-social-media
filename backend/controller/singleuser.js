const userModel = require("../model/user");


exports.singleuser = async(req, res)=>{
     const {id} = req.query
     
    try {
     const user  = await userModel.findById(id);
     
     
     if(!user){
          res.status(404).json({message: 'User not found'})
     }

     res.status(404).json({message: 'success', data : user})
    } catch (error) {
     return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
    
}