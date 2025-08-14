import { Router } from "express";
import User from "../models/user";



const router = Router();

router.get('/gigs',async(req,res)=>{

})

router.get('users/:id',async(req,res)=>{
    const user=await User.findById(req.params.id)
    
})