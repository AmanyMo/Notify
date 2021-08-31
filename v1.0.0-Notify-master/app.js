//requiring all necessary packages.
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport=require('passport')
app.use(passport.initialize())
app.use(passport.session())
const PORT = process.env.PORT || 80; //CHANGE PORT PLZ
let usercount = 0;
let server = app.listen(PORT, () => {
  console.log(`Server Started on port 80...`);
});
const io = require("socket.io")(server);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.error(err);
    console.log(`MongoDB connected...`);
  }
);

let loggedInUsers = [];
io.on("connection", (socket) => {
  socket.emit('socketid',{socketid:socket.id});
  usercount++;
  socket.on("admin", (data) => {
    loggedInUsers.push({ socketid: socket.id, email: data.email });
    socket.emit("usercount", { usercount });
    
    socket.on("messageAdmin", (ms) => {
      let chatter = loggedInUsers.find((user) => user.email == ms.email);
      if (chatter) {
        io.sockets.connected[chatter.socketid].emit("message", ms);
      } else {
        socket.emit("failed");
      }
    });
    socket.on("typing", (e) => {
      let typingTo = loggedInUsers.find((user) => user.email == e.email);
      if (typingTo) {
        
        io.sockets.connected[typingTo.socketid].emit("AdminTyping");
      }
    });
    socket.on("adminlogout", () => {
      
      socket.removeListener('messageAdmin');
   
      loggedInUsers = loggedInUsers.filter((user) => user.socketid != socket.id);
    });
  });
  socket.on("email", (data) => {
   
    loggedInUsers.push({ socketid: socket.id, email: data.email });
  });
  socket.on("logout", () => {
    
    loggedInUsers = loggedInUsers.filter((user) => user.socketid != socket.id);
  });

  socket.on("chat-message", (data) => {
    
      
      let adminsocket = loggedInUsers.find((u) => u.email == "admin@admin.com");
      if(adminsocket)
      io.sockets.connected[adminsocket.socketid].emit("chatadmin", data);
     else {
      socket.emit("failed");
    }
  });

  socket.on("getusers", () => {
    socket.emit("usercount", { usercount });
  });
  socket.on("global", (data) => {
    socket.broadcast.emit("global", data);
  });
  io.emit("usercount", { usercount });
  socket.on("disconnect", () => {
    usercount--;

    loggedInUsers = loggedInUsers.filter((user) => user.socketid != socket.id);

    io.emit("usercount", { usercount });
  });
});

app.use(
  cors({ credentials: true, origin: ["http://notifyapp.tk"], maxAge: 86400 })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.json());
app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use(cookieparser());
app.use("/account", require("./routes/account"));
app.use("/find", require("./routes/scrape"));
app.use("/home/find", require("./routes/scrape"));
app.use("/home/account", require("./routes/account"));
app.use(
  "/home/user_images",
  express.static(path.resolve(__dirname, "user_images"))
);
app.use("/administrator", require("./routes/admin"));
app.use("/user_images", express.static(path.resolve(__dirname, "user_images")));
app.get("/check-token", async (req, res) => {
  const token = req.cookies.Authorization;
  if (!token) return res.status(400).send("Token not found!");
  try {
    const validate = jwt.verify(token, process.env.TOKEN_SECRET);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send("token unvalid");
  }
});
app.get("/home/check-token", async (req, res) => {
  const token = req.cookies.Authorization;
  if (!token) return res.status(400).send("Token not found!");
  try {
    const validate = jwt.verify(token, process.env.TOKEN_SECRET);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send("token unvalid");
  }
});

app.get("/home/delete-token", async (req, res) => {
  // if(!req.cookies.Authorization) return res.sendStatus(400)
  res.clearCookie("Authorization").sendStatus(200);
});

app.get("/delete-token", async (req, res) => {
  // if(!req.cookies.Authorization) return res.sendStatus(400)
  res.clearCookie("Authorization").sendStatus(200);
});
if (process.env.NODE_ENV == "production") {
  app.use(express.static(__dirname + "/public"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}
