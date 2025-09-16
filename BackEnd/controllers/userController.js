import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const JWT_SCERET = process.env.JWT_SCERET || 'your_jwt_secret_here';
const TOKEN_EXPIRES='24h';

//TOKEN
const createToken=(userId)=>
    jwt.sign({id:userId},JWT_SCERET,{expiresIn:TOKEN_EXPIRES});


//registration function

export async function registerUser(req,res) {
    let { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({success:false,message:"All fields are required.."})
    }

    email = email.trim().toLowerCase();
    username = username.trim();

    if(!validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:'Invalid email'
        })
    }

    if(password.length < 8){
        return res.status(400).json({
            success:false,
            message:'Password must be atleast 8 characters'
        })
    }

    try {
        const userExists = await userModel.findOne({ email });
        if(userExists){
            return res.status(409).json({
                success:false,
                message:'User Already Exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name: username,
            email,
            password: hashedPassword
        });

        const token = createToken(user._id);
        res.status(201).json({
            success:true,
            message:'Account created successfully.',
            token,
            user:{
                id:user._id,
                username:user.name,
                email:user.email,
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}


//login function

export async function loginUser(req, res) {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All Fields are required.."  
        });
    }

    email = email.trim().toLowerCase(); // 🔑 normalize

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
         
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user._id,
                username: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
