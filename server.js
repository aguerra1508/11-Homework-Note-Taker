// dependencies
var express = require("express");
var path = require("path");
var fs = require('fs');
var util = require('util');
var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);

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

// api routes
app.get("/api/notes", function(req, res) {
  return readFileAsync("Develop/db/db.json", "utf8")
  .then(function (result, error){
      if (error) console.log(error);
      return res.json(JSON.parse(result));
  });
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
});


// listener
app.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
})