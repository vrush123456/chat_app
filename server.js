const express = require('express');
const { socket } = require('socket.io');

const app = express();

const http = require('http').createServer(app);



const PORT =process.env.PORT||3300



http.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})

app.use(express.static(__dirname+ '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+ '/public/index.html')
    // res.send("hello world");
})


// socket

const io =require('socket.io')(http)

io.on('connection',(socket)=>
{
    console.log('connected...')
    socket.on('message',(msg)=>{
        // console.log(msg)
       socket.broadcast.emit('message',msg)
    })
})