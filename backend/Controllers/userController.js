const User = require('../Models/userModel');
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc: register a user
// @route: POST /api/auth/signup
// @access public

const registerUser = asyncHandler( async(req,res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields not present !!!");
    }
    
    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(`Hashed Password: ${hashedPassword}`);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if(newUser){
        res.status(201).json({_id: newUser._id, email: newUser.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }

    console.log(`User created: ${newUser}`);

});

// @desc: Login a user
// @route Post /api/auth/login
// @access public

const loginUser = asyncHandler( async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All field mandatory");
    }
    const user = await User.findOne({email});

    // comparing sent password with hashed password
    if(user && (bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        // {expiresIn:"15m"}
        );

        res.status(200).json(accessToken);
    }else{
        res.status(400);
        throw new Error("Email or password not valid");
    }
})

module.exports = { loginUser, registerUser };