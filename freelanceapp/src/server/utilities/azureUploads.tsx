import {BlobServiceClient,generateBlobSASQueryParameters,BlobSASPermissions,StorageSharedKeyCredential} from '@azure/storage-blob'
import dotenv from 'dotenv'
dotenv.config()

const accountName=process.env.AZURE_STORAGE_ACCOUNT_NAME!
const accountKey=process.env.AZURE_STORAGE_ACCOUNT_KEY!
const containerName='gig-images'

const sharedKeyCredentials=new StorageSharedKeyCredential(accountName!,accountKey!)
const blobServiceClient=new BlobServiceClient(`https://${accountName}.blob.core.windows.net`,sharedKeyCredentials)
const containerClient=blobServiceClient.getContainerClient(containerName)

export const uploadToAzure=async(file:Express.Multer.File): Promise<string>=>{
    const blobName=`${Date.now()}-${file.originalname}`
    const blockBlobClient=containerClient.getBlockBlobClient(blobName)
    await blockBlobClient.uploadData(file.buffer,{
        blobHTTPHeaders:{blobContentType:file.mimetype}
    }) 
    const expireOn=new Date(new Date().valueOf()+3600*1000)
    const sasToken=generateBlobSASQueryParameters(
        {
            containerName,
            blobName,
            permissions:BlobSASPermissions.parse("r"),
            startsOn:new Date(),
            expiresOn:expireOn
        },
        sharedKeyCredentials
    ).toString()
    return `${blockBlobClient.url}?${sasToken}`

}
