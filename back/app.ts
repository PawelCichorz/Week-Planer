import 'ts-node/register'
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config';
import './db/mongoose';

interface UserSession {
    user?: any;
}


declare module 'express-session' {
    interface Session {
        user?: any;
    }
}

const app = express();

app.use(session({
  secret: 'klominkaa',
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', (req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Import API router
import apiRouter from './routes/api';
app.use('/', apiRouter);



app.listen(config.port, () => {
  console.log('Serwer Chodzi');
});