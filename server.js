// dependencies
var express = require("express");
var path = require("path");
var fs = require('fs');
var util = require('util');

// express
var app = express();

// initial port
var PORT = process.env.PORT || 8080;

// express app set up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));    
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//api route
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

// new note
app.post("/api/notes", function (req, res) {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;
    var noteID = (savedNotes.length).toString();
    newNote.id = noteID;
    savedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log(`${noteID} is saved.`)
    res.json(savedNotes);
});

// delete note
app.delete("/api/notes/:id", function(req, res){
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var noteID = req.params.id;
    console.log(`${noteID} is deleted.`);
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteID;
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

// listener
app.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
})