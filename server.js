const express = require('express');
const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || 8081;

//serve up static content
app.use(express.static(__dirname + '/public'));

//serve up a default page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, function () {
    console.log(`Listening on ${server.address().port}`);
});