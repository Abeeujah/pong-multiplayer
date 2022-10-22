// Create a HTTP Server and attach Socket to it..
const http = require('http');
const io = require('socket.io');
const apiServer = require('./api');
const { socketJob } = require('./sockets');

const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);

// Define a port..
const PORT = 3000;

// Listen on PORT..
httpServer.listen(PORT);
console.log(`Connected on port ${PORT}`);
socketJob(socketServer)