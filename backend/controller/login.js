const userModel = require("../model/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async (req, res)=>{
  const { email, password} = req.body
  try {
    const userExit = await userModel.findOne({email : email});
    if(!userExit){
        return res.status(201).json({message : 'User not exist'})
    }

    const valid = await bcrypt.compare(password, userExit.password);

    if(!valid){
        return res.status(201).json({message : 'Incorrect pasword'})
    }
    var userToken = await jwt.sign({email: userExit.email}, process.env.SECRET_KEY)

   return res.status(200).json({token : userToken , message : 'Logined successfuly', userDetail : userExit})

  } catch (error) {
    return res.status(201).json({message : 'Something went wrong, please try again later'})
  }
}