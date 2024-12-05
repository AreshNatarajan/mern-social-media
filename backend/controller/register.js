const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

exports.register = async (req, res) => {
    console.log(req.body);
    
    const { username, email, password } = req.body;

    // Check if any field is missing
    if (!username || !email || !password) {
        return res.status(201).json({ message: 'All fields (username, email, password) are required' });
    }

    try {
        // Check if username or email already exists
        const usernameExists = await userModel.findOne({ username: username });
        const emailExists = await userModel.findOne({ email: email });

        if (usernameExists || emailExists) {
            return res.status(201).json({ message: 'User already exists' });  // Use 409 Conflict
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await userModel.create({ username, email, password: hashedPassword });

        // Respond with a success message and 201 status code (Created)
        return res.status(200).json({ message: 'User added successfully', user: { username: newUser.username, email: newUser.email } });
    } catch (error) {
        // Log the error for debugging (only in dev mode) and return a generic message
        console.error(error);  // In production, consider using a logging library

        return res.status(201).json({ message: 'Something went wrong, please try again later' }); // Use 500 for server errors
    }
};
