const db = require("../models");

module.exports = {
   findAll: (req, res) => {
    db.Task
        .find(req.query)
        .sort({ points: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
   }, 

   findById: (req, res) => {
    db.Task
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
   },

   create: (req, res) => {
    db.Task
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
   },

   remove: (req, res) => {
    db.Task
        .findById({_id: req.params.id})
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
   }
}