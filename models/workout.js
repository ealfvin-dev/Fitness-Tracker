const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    _id: Schema.Types.ObjectId,
    
    day: Date,

    exercises: [{
        //"type": String,
        "name": String,
        "duration": Number,
        "distance": Number,
        "weight": Number,
        "reps": Number,
        "sets": Number
    }],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;