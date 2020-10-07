// dependencies
var express = require("express");
var path = require("path");

// express
var app = express();

// initial port
var PORT = process.env.PORT || 8080;

// express app set up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));    
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

// listener
app.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
})