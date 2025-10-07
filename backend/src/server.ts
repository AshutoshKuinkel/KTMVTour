// Server.ts file
import express, {Request,Response} from 'express';

const app = express()
const PORT = 8080


app.get("/",(req:Request,res:Response) => {
  res.status(200).json({
   message: `Backend live` 
  })
})

app.listen(PORT,()=>{
  console.log(`Server: http://localhost:${PORT}`)
})

