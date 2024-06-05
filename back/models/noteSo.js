const mongoose = require('mongoose')

const NoteSo = mongoose.model('NoteSo', {
    title:String,
    body:String
})



module.exports = NoteSo