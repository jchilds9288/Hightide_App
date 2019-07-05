const mongoose = require("mongoose");
const db = require("../server/db/models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/hightidedb"
);

const taskSeed = [
    {
    title: "Do Push Ups, Sit Ups, and Pull Ups",
    points: 3,
    proofRequired: false
    },
    {
    title: "Reach out to a Friend",
    points: 5,
    proofRequired: false
    },
    {
    title: "Go out to lunch with a biz Contact",
    points: 3,
    proofRequired: false
    },
    {
    title: "Play Fetch with hatch",
    points: 1,
    proofRequired: false
    },
    {
    title: "Eat a Vegetable",
    points: 1,
    proofRequired: false
    },
    {
    title: "Cook Dinner",
    points: 5,
    proofRequired: false
    },
    {
    title: "Go see a Movie",
    points: 1,
    proofRequired: false
    },
];

const userSeed = [
    {
    email: "ches@gmail.com",
    googleProvider: "ya29.QQIBibTwvKkE39hY8mdkT_mXZoRh7Ub9cK9hNsqrxem4QJ6sQa36VHfyuBe"
    },
];

db.Task.remove({})
    .then(() => db.Task.collection.insertMany(taskSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        const User = mongoose.model("user", db.User);

        User.remove({})
            .then(() => User.collection.insertMany(userSeed))
            .then(data => {
                console.log(data.result.n + " records inserted!");
                process.exit(0);
            })
            .catch(err => {
                console.log(err);
                process.exit(1);
            });
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
