const mongoose = require('mongoose')

const NotePi = mongoose.model('NotePi', {
    title:String,
    body:String
})



module.exports = NotePi