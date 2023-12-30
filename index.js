const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const User = require("./model/user");
const Message = require("./model/message");

require("./mongooConnect")

const port = 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).send({ "hi": "done" })
})

app.use("/user", require("./routes/user"))
app.use("/chatroom", require("./routes/chatroom"))

const server = app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log(`server started at port`, port);
    }
})
const io = require('socket.io')(server, {
    cors: {
        origin: "https://free-chat-five.vercel.app/chatroom",
        methods: ["GET", "POST"]
    }
});

io.use(async (socket, next) => {
    const token = socket.handshake.query.token
    const user=socket.handshake.query.user
    console.log(user);
    const data = await User.findOne({ _id: token });
    console.log("connection started");
    if (data) {
        socket.UserId = token;
        socket.User = user;
        next();
    }
    else {
        console.log("error occured");
    }
})

io.on('connection', (socket) => {
    console.log("connected: " + socket.UserId);
    socket.on("disconnect", () => {
        console.log("disconnected: " + socket.UserId);
    })
    socket.on("joinRoom", ({ id }) => {
        socket.join(id)
        console.log("a user joined chatroom: " + id);
    })
    socket.on("leaveRoom", ({ id }) => {
        socket.leave(id)
        console.log("a user left chatroom: " + id);
    })
    socket.on("sendMessage", async({ id, message }) => {
        const newMessage= await new Message({
            user:socket.User,
            message:message,
            chatroom:id
        })
        if (message.trim().length > 0) {
            // console.log("new user: ",socket.user);
            io.to(id).emit("newMessage", {
                user: socket.User,
                message: message
            })
            await newMessage.save();
        }
        
    })
})
