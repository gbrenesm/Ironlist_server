const { Schema, model } = require("mongoose")

const taskSchema = new Schema(
  {
    description: String,
    completed: {
      type: Boolean,
      default: false
    },
    completedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

module.exports = model ("Task", taskSchema)