const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end("Server is working, Open Client : http://localhost:3000");
    }
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('send-message', (message) => {
        socket.broadcast.emit('recieve-message', message);
    })

    socket.on('disconnect', () => {
      console.log('User Disconnected');
    });
  });

server.listen(8299, () => {
    console.log('Server Running')
})