//we just have to verify the token {making sure it exists + is not expired}.
//Then check if user exists and pass the deocded id so we can use
// req.user._id e.g within our backend without having to face any errors.
//Don't need to check for role based access for now

import { NextFunction, Request, Response } from "express";
import CustomError from "./error-handler.middleware";
import { verifyAccessToken } from "../utils/jwt.utils";
import User from "../models/user.model";

export const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //getting token:
      const KTMVTour_token = req.cookies.KTMVTour_token;

      if (!KTMVTour_token) {
        throw new CustomError(`Unauthorised.`, 401);
      }

      // verifying token:
      const decodedData = verifyAccessToken(KTMVTour_token)

      if (Date.now() > decodedData.exp * 1000) {
        res.clearCookie("KTMVTour_token", {
          secure: process.env.NODE_ENV === "development" ? false : true,
          httpOnly: true,
          sameSite: "none",
        });
        throw new CustomError(`Unauthorised.`, 401);
      }

      //checking user exists.
      const user = await User.findById(decodedData._id);

      if (!user) {
        throw new CustomError(`Unauthorised`, 401);
      }

      req.user = {
        _id:decodedData._id,
        username:decodedData.username,
        email:decodedData.email,
        profilePicture:decodedData.profilePicture
      }

      next()
    } catch (err) {
      next(err);
    }
  };
};
