import {Request,Response,NextFunction} from 'express'
import  jwt from 'jsonwebtoken'
import redisClient from '../../utilities/redisClient.js'

// interface JWTPayload{ id:string }

const protect=async (req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'No token provided'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const storedToken = await redisClient.get(`jwt_${decoded.id}`);
        if (!storedToken || storedToken !== token) {
            return res.status(401).json({ message: "Session expired or invalid" });
        }
        req.userId=decoded.id
        next()
    }catch(e){
        return res.status(401).json({message:'Invalid token'})
    }
}