
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './db/mongoose';
import logger from './middleware/bunyan';
import apiRouter from './routes/api';

const port = process.env.PORT || 3031;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};


app.use(cors(corsOptions));

app.use(session({
  secret: 'klominkaa',
  saveUninitialized: true,
  cookie: { maxAge: 3600000, secure: false },
  resave: false
}));

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', apiRouter);


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({ err }, 'Error handling request');
  res.status(500).send('Internal Server Error');
});


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


app.listen(port, () => {
  logger.info('Server is running');
});