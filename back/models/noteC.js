const mongoose = require('mongoose')

const NoteC = mongoose.model('NoteC', {
    title:String,
    body:String
})



module.exports = NoteC