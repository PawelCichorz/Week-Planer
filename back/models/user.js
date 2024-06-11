const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email :{
        type:String,
        require:true,
        lowercase:true,
        trim:true,
        unique:[true, 'Ten adres email już istnieje']
    },
    password: {
        type:String,
        require:true,
        trim:true,
        minLength:[4, 'hasło powinno zawierac 4 znaki']
    }
})


// userSchema.pre('save', function(next){
//     const user = this
//     // const salt =  bcrypt.genSaltSync(5)
// const hash =  bcrypt.hashSync(user.password,salt)
// user.password = hash
// next()
// })

userSchema.methods = {
    comparePassword(password){
        const user = this
        return password === this.password;
    }
}


const User = mongoose.model('User',userSchema)



module.exports = User