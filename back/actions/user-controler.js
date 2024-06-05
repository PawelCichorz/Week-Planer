const mongoose = require('mongoose')
const User = require('../models/user')

const NoteP = require('../models/noteP')
module.exports = {
   
    async register(req,res) {
        const email = req.body.email
        const password = req.body.password
        const newUser = new User({
            email,
            password
        })
        await newUser.save()
        res.send('zarejestrowano pomyślnie')

        
    },

    async login(req,res){
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw new Error ('Nie ma takiego emaila')
        }
        const isValidPassword= user.comparePassword(req.body.password)

        if(!isValidPassword){
            throw new Error ('Nieprawidłowe hasło')
        }
        console.log(isValidPassword)
        req.session.user = {
            _id:user._id,
            email:user.email
        }
        res.send('')
        
    }
    



}
