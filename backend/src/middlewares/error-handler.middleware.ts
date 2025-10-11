import { Request,Response,NextFunction, } from "express";

class CustomError extends Error{

  statusCode:number

  constructor(message:string,statusCode:number){
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this,CustomError)
  }
}

export const errorHandler = async(err:any,req:Request,res:Response,next:NextFunction)=>{
  
  const message = err?.message || 'Internal Server Error'
  const statusCode = err?.statusCode || 500

  res.status(statusCode).json({
    message:message,
    data:null
  })

  console.error(`Error handler caught:`,err)
}

export default CustomError