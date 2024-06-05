const express = require('express')
const config = require('./config')

const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express()

//baza dantch
require('./db/mongoose')

app.use(session({secret:'klominka',saveUninitialized:true,cookie:{maxAge: 1000 * 60 * 60 * 24},resave:false
}
    
))
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(bodyParser.json())
// app.use(express.json())
//parser dla formularzy
app.use(bodyParser.urlencoded({extended:true}))

//parser cookie do logowania
app.use(cookieParser())
//midlleware

app.use('/', function(req,res,next){
    res.locals.user=req.session.user
    next()
})
//api router
const apiRouter = require('./routes/api')




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Ustawienie domeny frontendowej
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Ustawienie dozwolonych metod HTTP
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Ustawienie dozwolonych nagłówków
    next();
});

app.use('/',apiRouter)

//parser


app.listen(config.port, function(){
    console.log('Serwer Chodzi Ziom')
})