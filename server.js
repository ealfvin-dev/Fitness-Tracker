const express = require("express");
var path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.listen(PORT, function() {
    console.log("App running at localhost:3000");
});