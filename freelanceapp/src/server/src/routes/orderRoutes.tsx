import express from 'express';
import Order from '../models/order';




const router=express.Router()



router.post('/',async(req,res)=>{
    try{
        const newOrder=new Order({buyer:req.body.buyerId,seller:req.body.sellerId,gig:req.body.gigId,price:req.body.price})
        await newOrder.save()
        res.status(201).json(newOrder)

    }catch(e){
        console.error(e)
        res.status(500).json({error:e})
    }
})


router.get('/buyer/:buyerId',async(req,res)=>{
    try{
        const orders=await Order.find({buyer:req.params.buyerId}).populate('seller').populate('gig')
        res.status(200).json(orders)
    }catch(e){
        console.error(e)
        res.status(500).json({error:e})
    }
})
router.get('/seller/:sellerId',async(req,res)=>{
    try{
        const orders=await Order.find({seller:req.params.sellerId}).populate('buyer').populate('gig')
        res.status(200).json(orders)
    }catch(e){
        console.error(e)
        res.status(500).json({error:e})
    }
})

export default router;