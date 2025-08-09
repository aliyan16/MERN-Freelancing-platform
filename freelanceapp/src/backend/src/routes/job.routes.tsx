import express from "express";
import Job from "../models/job";
import { authenticate,AuthRequest } from "../middleware/auth";

const router=express.Router()

router.post('/',authenticate,async(req:AuthRequest,res)=>{
    if(req.user.role!=='client'){
        return res.status(403).json({message:'Only clients can post jobs'})
    }
    const job=await Job.create({...req.body,clientId:req.user.id})
    res.json(job)
})

router.get('/',async(req,res)=>{
    const jobs=await Job.find()
    res.json(jobs)
})


export default router