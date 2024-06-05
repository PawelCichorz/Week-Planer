const mongoose = require('mongoose')

const NoteN = mongoose.model('NoteN', {
    title:String,
    body:String
})



module.exports = NoteN