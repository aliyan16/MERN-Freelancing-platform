import {BlobServiceClient,generateBlobSASQueryParameters,BlobSASPermissions,StorageSharedKeyCredential} from '@azure/storage-blob'
import dotenv from 'dotenv'
dotenv.config()

const accountName=process.env.AZURE_STORAGE_ACCOUNT_NAME!
const accountKey=process.env.AZURE_STORAGE_ACCOUNT_KEY!
const containerName='gig-images'

export const sharedKeyCredentials=new StorageSharedKeyCredential(accountName!,accountKey!)
export const blobServiceClient=new BlobServiceClient(`https://${accountName}.blob.core.windows.net`,sharedKeyCredentials)
export const containerClient=blobServiceClient.getContainerClient(containerName)

export const uploadToAzure=async(file:Express.Multer.File): Promise<string>=>{
    const blobName=`${Date.now()}-${file.originalname}`
    const blockBlobClient=containerClient.getBlockBlobClient(blobName)
    await blockBlobClient.uploadData(file.buffer,{
        blobHTTPHeaders:{blobContentType:file.mimetype}
    }) 
    return blobName

}
