const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://user:user@cluster0.ofdo7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.Promise = Promise;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define a Message Model for MongoDB
let Message = mongoose.model("Message", {
  name: String,
  message: String,
});

app.get("/messages", (req, res) => {
  //read all messages from mongo db
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", async (req, res) => {
  try {
    var message = new Message(req.body);

    var savedMessage = await message.save();

    console.log("saved");

    var censored = await Message.findOne({ message: "badword" });

    if (censored) await Message.deleteOne({ _id: censored.id });
    else io.emit("message", req.body);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.error(error);
  }

  // .catch((err) => {

  // })
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

mongoose.connect(dbUrl, (err) => {
  console.log("mongo db connection", err);
});
const server = http.listen(3000, () => {
  console.log(`Server listening on ${server.address().port}`);
});
