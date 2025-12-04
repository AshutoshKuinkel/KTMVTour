import { NextFunction, Request, Response } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import { uploadFile } from "../utils/cloudinary-service.utils";
import { uploadPhotos, uploadPost } from "../models/post.model";
import redisClient from "../config/redisClient.config";

const folder = "posts";
// create posts function
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    const { caption, location } = req.body;

    if (!id) {
      throw new CustomError(`Unauthorised`, 401);
    }

    const photos = req.files as Express.Multer.File[];

    if (!photos || photos.length === 0) {
      throw new CustomError(`At least one photo is required`, 400);
    }

    if (photos.length > 10) {
      throw new CustomError(`Maximum 10 photos allowed`, 400);
    }

    const post = await uploadPost(caption, id.toString(), location);

    // we store the photos.path in the db after saving it to cloudinary first. To make this process faster, we use promise.all which is used in ts/js (read defintion);
    // a method used for handling multiple asynchronous operations concurrently.
    // It takes an iterable (typically an array) of Promises as input and returns a single Promise.

    const uploadPhotosToCloudinary = photos.map(async (photo, index) => {
      const { path, public_id } = await uploadFile(photo.path, folder);
      return {
        url: path,
        order: index + 1,
      };
    });

    const allPhotoUrls = await Promise.all(uploadPhotosToCloudinary);

    await uploadPhotos(post.id, allPhotoUrls);

    // clear/invalidate cache after upload so new post appears
    // if we didn't do this, then redis would just show only the old feed before we posted our new post.
    // and then we would have to wait until the redis is expired (so 30 mins because I set it to 30 mins)
    // and only after the 30 mins would user's see new post.

    // Invalidate cache safely using version bump
    //{better than deleteing cache which is O(n) and could cause issues if we have many users within our app}
    try {
      const versionAfter = await redisClient.incr("feed:version");
      console.log("Redis version after new post:", versionAfter);
    } catch (err) {
      console.error("Redis version increment error:", err);
    }

    res.status(201).json({
      message: `Post successfully created`,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};
