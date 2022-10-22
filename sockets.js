// Ready Player Count..
let readyPlayerCount = 0;

// Socket emit..
function socketJob(sungba) {
    const pongNameSpace = sungba.of('/pong');
    let room;
    pongNameSpace.on('connection', (socket) => {
        console.log(`A User Connected as ${socket.id}`);
        room = 'room' + Math.abs(readyPlayerCount / 2);

        // Check ready state..
        socket.on('ready', () => {
            console.log(`${socket.id} is ready`);
            socket.join(room);

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                pongNameSpace/to(room).emit('startGame', socket.id);
            }
        });

        // Get and Broadcast Paddle State..
        socket.on('paddleMove', (paddleData) => {
            socket.to(room).broadcast.emit('paddleMove', paddleData.xPosition);
        });

        // Get and Broadcast Ball moves..
        socket.on('ballMove', (ballData) => {
            socket.to(room).broadcast.emit('ballMove', ballData);
        });

        socket.on('disconnect', (reason) => {
            console.log(`${socket.id} disconnected because of ${reason}`);
            socket.to(room).emit('disconnected', `${socket.id} Disconnected`);
        });
    });
}

// Export SocketJob..
module.exports = {
    socketJob,
}