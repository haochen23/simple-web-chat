const express = require("express");
const app = express();

app.use(express.static(__dirname))

let messages = [
    {name: "Tim", message: "Hi"},
    {name: "Jane", message: "Hello"}
]

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.post('/messages', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})
const server = app.listen(3000, () => {
    console.log(`Server listening on ${server.address().port}`)
});


