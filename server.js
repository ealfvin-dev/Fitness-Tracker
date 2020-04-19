const express = require("express");
var path = require("path");

const mongoose = require("mongoose");
const db = require("./models/workout");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", { useNewUrlParser: true });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", function(req, res) {
    db.find({}, (err, results) => {
        //console.log(JSON.stringify(results));
        res.json(results);
    });
});

app.get("/api/workouts/range", function(req, res) {
    db.find({}, (err, results) => {res.json(results)});
});

app.post("/api/workouts", function(req, res) {
    db.collection.insertOne({day: Date.now(), exercises: []})
    .then(data => {res.json(data)})
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
});

app.put("/api/workouts/:id", function(req, res) {
    console.log(req.body);
    db.findOne({_id: req.params.id}, (err, results) => {console.log(results)})
    db.updateOne({_id: req.params.id}, { $push: {exercises: req.body} }, (err, result) => {res.json(result)});
});

app.listen(PORT, function() {
    console.log("App running at localhost:" + PORT);
});