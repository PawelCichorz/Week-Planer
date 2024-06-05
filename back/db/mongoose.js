const mongoose = require('mongoose')
const {database} = require('../config')

try{
mongoose.connect(database,{useNewUrlParser:true,useUnifiedTopology:true})
console.log('ok')}
catch(err){
    console.log(err)
}

