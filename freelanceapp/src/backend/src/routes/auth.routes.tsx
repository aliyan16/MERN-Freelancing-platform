const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
import { Request,Response } from "express"

const router=express.Router()

router.post('/register', async (req:Request, res:Response) =>{
    const {name,email,password,role}=req.body
    try{
        const hashed=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashed,role})
        res.json(user)
    }catch(e){
        console.error('Error registering user: ',e)
        res.status(500).json({message:'Server error '})
    }
})


router.post('signin',async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body
        const user=User.findOne({email})
        if(!user){
            return res.status(404).json({message:'Invalid User'})
        }
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).json({message:'Invaid credentials'})
        }
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_KEY as string,{expiresIn:'7d'})
        res.json({token,user})
    }catch(e){
        console.error('Error sigining in user: ',e)
        res.status(500).json({error:'Server error'})
    }
})

export default router
