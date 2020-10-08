const { Schema, model } = require("mongoose")

const taskSchema = new Schema(
  {
    description: String
  },
  {
    timestamps: true
  }
)

module.exports = model ("Task", taskSchema)