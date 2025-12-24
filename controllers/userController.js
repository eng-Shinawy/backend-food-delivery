import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//create and assign a token
const createdToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
    }
//login user
const registerUser = async (req, res) => {
    const { name,email, password } = req.body;
    try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({success:false, message: "User already exists " });
    }
    //validate email format& strong password
    if (!validator.isEmail(email)) {
      return res.json({success:false, message: "Please enter a valid email" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({success:false, message: "Please enter a strong password" });
    }
    
    

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createdToken(user._id);
    res.json({success:true, token });
} catch (error) {
  console.error("REGISTER ERROR:", error);

    console.error(error);
    return res.json({success:false, message: "Server error" });

  }
    res.json({success:true, message: "User registered successfully" });


    
};

//register user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({success:false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({success:false, message: "Invalid credentials" });
    }
    const token = createdToken(user._id);
    res.json({success:true, token });
} catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.json({success:false, message: "Server error" });
  }
  
};

export { loginUser, registerUser };