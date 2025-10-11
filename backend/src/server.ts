//imports:
import express, {Request,Response} from 'express';
import 'dotenv/config'
import { connectDB } from './config/db.config';
import { errorHandler } from './middlewares/error-handler.middleware';

// initialisations:
const app = express()
const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

connectDB(DB_URI!)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing routes:
import authRoutes from './routes/auth.routes'


// using routes:
app.use('/api/auth',authRoutes)

app.get("/",(req:Request,res:Response) => {
  res.status(200).json({
   message: `Backend live` 
  })
})

app.get('/{*all}',(req:Request,res:Response)=>{
  res.status(404).json({
    message : `Cannot ${req.method} @ ${req.url}`
  })
})

app.listen(PORT,()=>{
  console.log(`Server: http://localhost:${PORT}`)
})

// using error handler:
app.use(errorHandler)


