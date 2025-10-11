import { Request, Response, NextFunction } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import User from "../models/user.model";
import { HashPassword } from "../utils/bcrypt.utils";
//register function:
export const register = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const { email, password, username, profilePicture } = req.body;

    if(!email){
      throw new CustomError(`Email required`,400)
    }
    if(!password){
      throw new CustomError(`Password required`,400)
    }
    if(password.length < 8){
      throw new CustomError(`Password must be greater than 8 characters`,400)
    }
    if(!username){
      throw new CustomError(`Username required`,400)
    }
    if(username.length < 3 || username.length > 16){
      throw new CustomError(`Username must be between 3-16 characters`,400)
    }

    const hashedPass = await HashPassword(password)
    
    const user = await User.create({email,password:hashedPass,username,profilePicture})

    const userObject = user.toObject()
    const {password:pass,...userWithoutPass} = userObject

    res.status(201).json({
      message: `User registered`,
      data:userWithoutPass
    })
  } catch (err) {
    next(err);
  }
};

// login function:

// logout function:

// profile function
