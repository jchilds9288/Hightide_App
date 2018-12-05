const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/hightidedb"
);

const taskSeed = [
    {
    title: "Do Push Ups, Sit Ups, and Pull Ups"
    },
    {
    title: "Reach out to a Friend"
    },
    {
    title: "Go out to lunch with a biz Contact"
    },
    {
    title: "Play Fetch with hatch"
    },
    {
    title: "Eat a Vegetable"
    },
    {
    title: "Cook Dinner"
    },
    {
    title: "Go see a Movie"
    },
];

db.Task
    .remove({})
    .then(() => db.Task.collection.insertMany(taskSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });