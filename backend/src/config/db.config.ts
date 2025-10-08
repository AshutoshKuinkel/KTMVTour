import mongoose from 'mongoose';

export const connectDB = (DB_URI:string)=>{
  mongoose.connect(DB_URI,{})
  .then(()=>{
    console.log(`Connected to MongoDB`)
  })
  .catch((err)=>{
    console.log(`MongoDB Connection Error:`,err)
  })
}

