import { Request, Response, NextFunction } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import User from "../models/user.model";
//register/signup function:
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username, profilePicture } = req.body;

    if(!email){
      throw new CustomError(`Email required`,400)
    }
    if(!password){
      throw new CustomError(`Password required`,400)
    }
    if(!username){
      throw new CustomError(`Username required`,400)
    }
    
    const user = await User.create({email,password,username,profilePicture})

    res.status(201).json({
      message: `User registered`,
      data:user
    })
  } catch (err) {
    next(err);
  }
};

// login function:

// logout function:

// profile function
