const { Schema, model} = require("mongoose")

const userSchema = new Schema(
    {
        username: String,
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String
        },
        createdTasks: [{
            type: Schema.Types.ObjectId,
            ref: "Task"
        }],
        doneTasks: [{
            type: Schema.Types.ObjectId,
            ref: "Task"
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model ("User", userSchema)