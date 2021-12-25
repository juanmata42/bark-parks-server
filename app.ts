import express from 'express';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes';
import passportMiddleware from './middleware/passport';
import authUserRoutes from './routes/authUser.routes';
import genericRoutes from './routes/generic.routes';

// initialization
dotenv.config()
const app = express();

// settings
app.set('port', process.env.PORT || 3500);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get('/', (req, res) =>
  res.send(`The API is at http://localhost:${app.get('port')}`)
);

app.use(authRoutes);
app.use(authUserRoutes);
app.use(genericRoutes);

export default app;
