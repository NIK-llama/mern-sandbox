import { WebSocketServer } from 'ws'; 

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function(socket) {
    console.log("User Connected");
    setInterval(() => {
        socket.send("Hello from Server")
    }, 5000);

    socket.on("message", (e) => {
        console.log(e.toString());
    })
})


