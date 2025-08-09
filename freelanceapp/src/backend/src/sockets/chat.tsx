import { Server } from "socket.io";

export const initChatSocket=(io:Server)=>{
    io.on('connection',(socket)=>{
        console.log('User connected ',socket.id)
        socket.on('joinRoom',(roomId)=>socket.join(roomId))
        socket.on('sendMessage',({roomId,message})=>{
            io.to(roomId).emit('newMessage',message)
        })
    })

    
}