const net = require("net");
const {buildResponse} = require("./httpResponseBuilder");

const server = net.createServer((socket) => {
    console.log("client connected");

    socket.on('end', () => {
        console.log('client disconnected');
    });

    socket.on('data', (data) => {
        
        socket.write(buildResponse(data), () => {
            socket.end();    
        });
    })
})

server.listen(7777, () => {
    console.log("listening...");
})