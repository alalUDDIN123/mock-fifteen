const mongoose = require("mongoose")

const SubtaskSchema = mongoose.Schema({
    title: String,
    isCompleted: Boolean
}, {
    versionKey: false
})

const SubTaskModal = mongoose.model("Subtask", SubtaskSchema)

module.exports = SubTaskModal

