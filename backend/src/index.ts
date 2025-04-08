import express,{Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoute';
import urlRoutes from './routes/urlRoute'
import redirectRoutes from './routes/redirectRoute';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app:Express  = express();
const port = process.env.PORT || '3001';
const mongoUri = process.env.MONGO_URI!;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/auth', urlRoutes);
app.use('/', redirectRoutes)

app.get('/', (req:Request, res:Response)=>{
  res.send('<h1>This is backend</h1>')
})

mongoose
    .connect(mongoUri)
    .then(()=> {
        console.log('Connected to mongodb')
    })
    .catch((error)=>{
        console.error('Failed to connect : ', error)
    })

app.listen({port}, () => {
  console.log(`Server is running on port ${port}`);
});