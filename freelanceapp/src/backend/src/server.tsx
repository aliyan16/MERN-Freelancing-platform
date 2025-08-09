import { createServer } from "http";
import { Server } from "socket.io";
import app from './app'
import {connectDB} from './config/db'
import { initChatSocket } from "./sockets/chat";


const PORT=process.env.PORT||5000
const server=createServer(app)
const io=new Server(server,{cors:{origin:'*'}})

initChatSocket(io)
connectDB()

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))