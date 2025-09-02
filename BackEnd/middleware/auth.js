import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const JWT_SCERET = process.env.JWT_SCERET || 'your_jwt_secret_here';

export default async function  authMiddleware(req,res,next) {
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startWith('Bearer ')){
        return res.status(400).json({
            success:false,
            message:"Not authorized,token missing"
        })
    }
    const token=authHeader.split(' ')[1];

    try {
        const payload=jwt.verify(token,JWT_SCERET)
        const user=await user.findById(payload.id).select('-password')

        if(!user){
            return res.status(401).json({
            success:false,
            message:"User not found"
        })
        }

        req.user=user;
        next();

    } catch (err) {
        console.error('JWT verifaction failed error:',err);

        return res.status(401).json({
            success:false,
            message:"Token invalid or token expired"
        })
    }
}