const db = require("../models");

module.exports = {
   findAll: (req, res) => {
    db.Task
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
   }, 

   create: (req, res) => {
    db.Task
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
   }
}