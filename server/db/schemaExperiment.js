User: {
  _id: ObjectID,
  email: String,
  password: String,
  created: Date,
  teams: [ObjectID],
  pools: [String],
  role: String,
  createdTasks: [{
    _id: ObjectID,
    created: Date,
    points: Number,
    category: String,
    createdBy: (admin or student)
  }]

}


Team: {
  _id: ObjectID,
  name: String,
  created: Date,
  admins: [ObjectId],
  rounds: [
    { _id: ObjectID,
      started: Date,
      goal: Number,
      dailyMax: Number,
      status: [
        {
          userID: ObjectID,
          partnerID: ObjectID,
          points: Number,
          tasks: [Tasks],
          category: String
        }
      ]
  ]

}

Tasks: {
  _id: ObjectID
  created: Date,
  userID: UserID,
  title: String,
  points: Number
}
