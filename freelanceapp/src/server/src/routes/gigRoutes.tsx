import express from "express"
import multer from "multer"
import { uploadToAzure } from "../../utilities/azureUploads"
import Gig from "../models/gig"

const upload=multer({storage:multer.memoryStorage()})
const router = express.Router()
router.post('/',upload.single('image'),async(req,res)=>{
    try{
        let imageUrl=''
        if(req.file){
            imageUrl=await uploadToAzure(req.file)
        }
        const newGig=new Gig({
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            deliveryTime:req.body.deliveryTime,
            image:imageUrl
        })
        await newGig.save();
        res.status(201).json(newGig)
    }catch(e){
        res.status(500).json({error:e})
    }
})

router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ createdAt: -1 });
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching gigs" });
  }
});
export default router