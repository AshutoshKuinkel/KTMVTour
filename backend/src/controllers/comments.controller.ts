import { NextFunction, Request, Response } from "express";
import CustomError from "../middlewares/error-handler.middleware";
import { getCommentModel, postCommentModel } from "../models/comments.model";
import { postgresPool } from "../config/db.config";
import { getPagination } from "../utils/pagination.utils";
import redisClient from "../config/redisClient.config";

export const commentOnPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const { content } = req.body;

    if (!req.user) {
      throw new CustomError(`Unauthorised`, 403);
    }

    if (!content || content.trim().length === 0) {
      throw new CustomError(`Comment can't be empty`, 400);
    }

    const comment = await postCommentModel(
      userId.toString(),
      postId,
      content.trim()
    );

    try {
      const keys = await redisClient.keys(`comments:post:${postId}:page:*`);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    } catch (err: any) {
      console.error(`Redis delete err:`, err);
    }

    res.status(201).json({
      message: `Successfully commented`,
      data: comment,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { currentPage } = req.query;
    const page = Number(currentPage) || 1;
    const limit = 20;
    const cachedKey = `comments:post:${postId}:page:${page}`;
    let cachedComments;
    try {
      cachedComments = await redisClient.get(cachedKey);
    } catch (err: any) {
      console.error(`Redis get err:`, err);
    }

    if (cachedComments) {
      return res.status(200).json({
        message: `Comments fetched from redis`,
        data: JSON.parse(cachedComments).data,
        pagination: JSON.parse(cachedComments).pagination,
      });
    }

    // total count of comments:
    const totalQuery = await postgresPool.query(
      `SELECT COUNT(*) FROM comments WHERE post_id = $1`,
      [postId]
    );
    const total = Number(totalQuery.rows[0].count);

    const comments = await getCommentModel(page, limit, postId);

    const pagination = getPagination(page, limit, total);

    const responseData = {
      data: comments,
      pagination,
    };

    try {
      await redisClient.set(cachedKey, JSON.stringify(responseData), {
        EX: 1800,
      });
    } catch (err: any) {
      console.error(`Redis set err:`, err);
    }

    // response:
    res.status(200).json({
      message: `Comments fetched for post: ${postId}`,
      ...responseData,
    });
  } catch (err: any) {
    next(err);
  }
};
