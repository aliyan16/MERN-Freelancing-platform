import {Request,Response,NextFunction} from 'express'
import  jwt from 'jsonwebtoken'

interface JWTPayload{ id:string }

const protect=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'No token provided'})
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET as string) as JWTPayload
        (req as any).userId=decode.id
        next()
    }catch(e){
        return res.status(401).json({message:'Invalid token'})
    }
}