const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require("path");

const port = process.env.PORT || 8081;

const apiRoutes = require("./api");

//serve up static content
// if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
// }
app.use(express.static(path.join(__dirname, 'public'), {
    dotfiles: 'ignore',
    index: false
}));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);

//route everything else to the React client app
app.get("*", (req, res) => {
    console.log('Request: [GET]', req.originalUrl);
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(port, () => {
    console.log(`Listening on ${server.address().port}`);
});
