import express from "express"
import multer from "multer"
import { uploadToAzure,containerClient,sharedKeyCredentials } from "../../utilities/azureUploads"
import Gig from "../models/gig"
import {  generateBlobSASQueryParameters,BlobSASPermissions } from "@azure/storage-blob"
const upload=multer({storage:multer.memoryStorage()})
const router = express.Router()



function generateSASUrl(blobName: string): string {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const now = new Date();
  const startsOn = new Date(now.valueOf() - 20 * 60 * 1000); // 20 mins earlier
  const expiresOn = new Date(now.valueOf() + 60 * 60 * 1000); // +1 hour

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      blobName,
      permissions: BlobSASPermissions.parse("r"),
      startsOn,
      expiresOn,
    },
    sharedKeyCredentials
  ).toString();

  return `${blockBlobClient.url}?${sasToken}`;
}


router.post('/',upload.single('image'),async(req,res)=>{
  try{
    let blobName=''
    if(req.file){
      blobName=await uploadToAzure(req.file)
    }
    const newGig=new Gig({
      sellerId:req.body.sellerId,
      title:req.body.title,
      description:req.body.description,
      price:req.body.price,
      category:req.body.category,
      deliveryTime:req.body.deliveryTime,
      image:blobName
    })
    await newGig.save()
    res.status(201).json({
      ...newGig.toObject(),
      imageUrl:blobName?generateSASUrl(blobName):null
    })
  }catch(e){
    console.error(e)
    res.status(500).json({error:e})
  }

})

router.get('/',async(req,res)=>{
  try{
    const gigs=await Gig.find().sort({createdAt:-1})
    console.log("Number of gigs in DB:", gigs.length);
    const gigsWithUrls=gigs.map((gig)=>{
      let imageUrl:string|null=null
      if(gig.image){
        imageUrl=generateSASUrl(gig.image)
        // console.log('Generated imageUrl before return :',imageUrl)
      }
      return{
        ...gig.toObject(),
        imageUrl
      }

    })
    res.json(gigsWithUrls)
  }catch(e){
    console.error(e)
    res.status(500).json({error:e})
  }
})

router.get('/:id',async(req,res)=>{
  try{
    const gig=await Gig.findById(req.params.id)
    if(!gig){
      return res.status(404).json({error:'Gig not found'})
    }
    let imageUrl:string|null=null
    if(gig.image){
      imageUrl=generateSASUrl(gig.image)
    }
    res.json({...gig.toObject(),imageUrl})
  }catch(e){
    console.error(e)
    res.status(500).json({error:e})
  }
})



// router.post('/',upload.single('image'),async(req,res)=>{
//   try{
//     let blobName=''
//     if(req.file){
//       blobName=await uploadToAzure(req.file)
//     }
//     const newGig=new Gig({
//       title:req.body.title,
//       description:req.body.description,
//       price:req.body.price,
//       category:req.body.category,
//       deliveryTime:req.body.deliveryTime,
//       image:blobName
//     })
//     await newGig.save()
//     res.status(201).json(newGig)
//   }catch(e){
//     res.status(500).json({error:e})
//   }
// })

// router.get('/',async(req,res)=>{
//   try{
//     const gigs=await Gig.find().sort({createdAt:-1})
//     const gigsWithUrls=gigs.map((gig)=>{
//       let imageUrl=null
//       if(gig.image){
//         const blockBlobClient=containerClient.getBlockBlobClient(gig.image)
//         const expireOn=new Date(new Date().valueOf()+60*60*1000)
//         const sasToken=generateBlobSASQueryParameters(
//           {
//             containerName:containerClient.containerName,
//             blobName:gig.image,
//             permissions:BlobSASPermissions.parse('r'),
//             startsOn:new Date(),
//             expiresOn:expireOn
//           },
//           sharedKeyCredentials
//         ).toString()
//         imageUrl=`${blockBlobClient.url}?${sasToken}`
//       }
//       return{
//         ...gig.toObject(),
//         imageUrl,
//       }
//     })
//     res.json(gigsWithUrls)
//   }catch(e){
//     console.error(e)
//     res.status(500).json({message:'Error fetching gigs'})
//   }
// })



// router.post('/',upload.single('image'),async(req,res)=>{
//     try{
//         let imageUrl=''
//         if(req.file){
//             imageUrl=await uploadToAzure(req.file)
//         }
//         const newGig=new Gig({
//             title:req.body.title,
//             description:req.body.description,
//             price:req.body.price,
//             category:req.body.category,
//             deliveryTime:req.body.deliveryTime,
//             image:imageUrl
//         })
//         await newGig.save();
//         res.status(201).json(newGig)
//     }catch(e){
//         res.status(500).json({error:e})
//     }
// })

// router.get("/", async (req, res) => {
//   try {
//     const gigs = await Gig.find().sort({ createdAt: -1 });
//     res.json(gigs);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching gigs" });
//   }
// });


export default router