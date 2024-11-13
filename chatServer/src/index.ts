import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {cors: {origin: '*'}});
let activeSockets: Record<any, string> = {};

app.get('/', (req, res) => {
    res.send('hello')
});

io.on('connection', (socket) => {


    
    socket.on('create-user-socket-pair', ({userId}) => {
        activeSockets[userId] = socket.id;
    })
    socket.on('ping-user', ({roomId, userId, pingedBy}) => {
     socket.to(activeSockets[userId]).emit('room-join-request', {roomId, pingedBy})
    })
    socket.on('join-room', ({roomId, username}) => {
        console.log(`${username} joined the room ${roomId}`)

        socket.join(roomId)
        socket.to(roomId).emit('message', `${username} joined the room.`)
    })
    socket.on('message', ({roomId, message, sender}) => {
        io.to(roomId).emit('message', {message, sender})
    } )
    


    console.log(activeSockets)

    socket.on('disconnect', () => {
        console.log('user disconnected' + socket.id);
   })
});


server.listen(3002, () => {
  console.log('server running at http://localhost:3002');
});