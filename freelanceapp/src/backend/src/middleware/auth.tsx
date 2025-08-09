import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'

export interface AuthRequest extends Request{
    user?:any;
}

export const authenticate=(req:AuthRequest,res:Response,next:NextFunction)=>{
    const token=req.header('Authorization')?.replace('Bearer','')
    if(!token){
        return res.status(401).json({message:'No token'})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_KEY as string)
        req.user=decoded
        next()
    }catch(e){
        res.status(401).json({message:'Invalid token'})
    }
}