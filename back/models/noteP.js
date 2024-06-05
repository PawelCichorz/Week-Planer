const mongoose = require('mongoose')

const NoteP = mongoose.model('NoteP', {
    title:String,
    body:String
})



module.exports = NoteP