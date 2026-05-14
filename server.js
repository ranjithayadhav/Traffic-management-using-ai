const express = require("express");

const http = require("http");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

    console.log("Client Connected");

    socket.on("ambulanceLocation", (data) => {

        console.log("Ambulance Location:", data);

        io.emit("trafficUpdate", data);
    });

    socket.on("disconnect", () => {

        console.log("Client Disconnected");
    });
});

server.listen(3000, () => {

    console.log("Server Running On Port 3000");
});