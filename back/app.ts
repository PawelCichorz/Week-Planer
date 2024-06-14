
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config';
import './db/mongoose';
import { Request } from 'express';
import { SessionData, Session } from 'express-session';

interface NoteRequest extends Request {
    session: Session & Partial<SessionData> & { user?: string };
}


const app = express();

app.use(session({
  secret: 'klominkaa',
  saveUninitialized: true,
  cookie: {  maxAge: 3600000, secure:false },
  resave: false
}));

app.use(cors({
  origin: true,
  credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());






// Import API router
import apiRouter from './routes/api';
app.use('/', apiRouter);



app.listen(config.port, () => {
  console.log('Serwer Chodzi');
});