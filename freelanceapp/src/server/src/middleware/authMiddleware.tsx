import {Request,Response,NextFunction} from 'express'
import  jwt from 'jsonwebtoken'
import redisClient from '../../utilities/redisClient'

interface JWTPayload{ id:string }

const protect=async (req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'No token provided'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as JWTPayload
        const storedToken = await redisClient.get(`jwt_${decoded.id}`);
        if (!storedToken || storedToken !== token) {
            return res.status(401).json({ message: "Session expired or invalid" });
        }
        (req as any).userId=decoded.id
        next()
    }catch(e){
        return res.status(401).json({message:'Invalid token'})
    }
}