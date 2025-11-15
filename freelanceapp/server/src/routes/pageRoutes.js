import { Router } from "express";
import User from "../models/user.js";
import Gig from "../models/gig.js";



const router = Router();

router.get('/gigs',async(req,res)=>{
    const gigs=await Gig.find().populate('sellerId','firstName lastName')
    res.json(gigs)
})

router.get('users/:id',async(req,res)=>{
    const user=await User.findById(req.params.id)
    const gigs=await Gig.find({sellerId:req.params.id})
    res.json({...user?.toObject(),gigs})
    
})