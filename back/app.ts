
import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './db/mongoose';
import fs from 'fs';
import crypto from 'crypto';




const port = process.env.PORT 




const app = express();





app.use(session({
  secret: 'klominkaa',
  saveUninitialized: true,
  cookie: {  maxAge: 3600000, secure:false },
  resave: false
}));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));

// Obsługa nagłówków CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


import apiRouter from './routes/api';
app.use('/', apiRouter);



app.listen(port, () => {
  console.log('Serwer Chodzi');
});