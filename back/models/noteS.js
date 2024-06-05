const mongoose = require('mongoose')

const NoteS = mongoose.model('NoteS', {
    title:String,
    body:String
})



module.exports = NoteS