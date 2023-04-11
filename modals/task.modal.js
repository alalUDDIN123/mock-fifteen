const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['Todo', 'Doing', 'Done'],
        default: 'Todo'
    },
    subtask: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Subtask'
        }
    ]
}, {
    versionKey: false
})

const TaskModal = mongoose.model("Task", TaskSchema)

module.exports = TaskModal

