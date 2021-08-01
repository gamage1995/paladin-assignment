import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectToDb } from './utilities/dbConnection';
import { authRouter } from './routes/authRoutes'
import {movieRouter} from './routes/movieRoutes'

dotenv.config()
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.listen(process.env.PORT, async () => {
  console.log(`server started on port ${process.env.PORT}`);
  await connectToDb(process.env.DBURI);
})

app.use('/auth', authRouter)
app.use('/movie', movieRouter)