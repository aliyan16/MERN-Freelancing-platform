import express from 'express';
import Order from '../models/order';
import { containerClient,sharedKeyCredentials, uploadToAzure } from '../../utilities/azureUploads';
import { generateBlobSASQueryParameters,BlobSASPermissions } from '@azure/storage-blob';




const router=express.Router()


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


router.post('/',async(req,res)=>{
    try{
        let blobName=''
        if(req.body.reqImg){
            blobName=await uploadToAzure(req.body.reqImg)
        }
        const newOrder=new Order({buyer:req.body.buyerId,seller:req.body.sellerId,gig:req.body.gigId,requirements:req.body.orderReq,image:blobName,price:req.body.price})
        await newOrder.save()
        res.status(201).json({
            ...newOrder,
            imageUrl:blobName?generateSASUrl(blobName):null
        })

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