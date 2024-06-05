const mongoose = require('mongoose')

const NoteW = mongoose.model('NoteW', {
    title:String,
    body:String
})



module.exports = NoteW