const mongoose = require("mongoose")

const boardSchema = mongoose.Schema({
    name: String,
    tasks: [
        {
            type:mongoose.Schema.ObjectId,
            ref: 'Task'
        }]
}, {
    versionKey: false
})

const boardModal = mongoose.model("board", boardSchema)

module.exports = boardModal

