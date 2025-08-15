import {BlobServiceClient} from "@azure/storage-blob"
import dotenv from "dotenv"
dotenv.config()


const blobService=BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_KEY as string)
const containerClient=blobService.getContainerClient('gig-images')

export const uploadToAzure=async(file:Express.Multer.File)=>{
    const blobName=`${Date.now()}-${file.originalname}`
    const blockBlobClient=containerClient.getBlockBlobClient(blobName)
    await blockBlobClient.uploadData(file.buffer,{
        blobHTTPHeaders:{blobContentType:file.mimetype}
    })
    return blockBlobClient.url
}