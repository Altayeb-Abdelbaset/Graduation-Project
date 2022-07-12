const moment = require("moment");
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const connection = require("./dbconnections");
const Msg = require("./moules/messages/modal/message.modal");

const app = express();
connection();

const server = http.createServer(app);
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'Grad Project')));

const io = socketio(server, {
    cors: "*"
});

let username = 'User'

io.on("connection", (socket) => {
    Msg.find().then(result => {
        
        socket.emit('outputMessages', result)
    })
    // socket.broadcast.emit("message", formatMsg(username, "user is connected"));

    // socket.on("disconnect", () => {
    //     io.emit("message", formatMsg(username, "user is left"));
    // })

    socket.on("chatMsg", (res) => {
        const message = new Msg({ username: res.username, msg: res.msg, time: moment().format('h:mm a') });
        message.save().then(() => {
            io.emit("message", formatMsg(res.username, res.msg));
        })
    })
})




server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

function formatMsg(username, msg) {
    return {
        username,
        msg,
        time: moment().format('h:mm a')
    }
}



