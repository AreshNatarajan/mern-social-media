const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

exports.getAll = async (req, res) => {
  try {
    
    const token = req.header("auth");
    
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.email;  
    console.log("Authenticated user ID:", userId);
    const users = await userModel.find(); 
    return res.status(200).json(users);
  } catch (err) {
    
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
  
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
