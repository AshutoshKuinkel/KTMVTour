import { NextFunction, Request, Response } from "express";
import { getFeed } from "../models/feed.model";
import { getPagination } from "../utils/pagination.utils";
import { postgresPool } from "../config/db.config";
import redisClient from "../config/redisClient.config";

export const fetchFeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage } = req.query;
    // pagination params over here
    const page = Number(currentPage) || 1;
    // Fetch 5 posts at once, client shows them one by one
    const limit = 5;

    const cachedKey = `feed:all:page:${page}:limit:${limit}`;
    let cachedFeed = null;
    try {
      cachedFeed = await redisClient.get(cachedKey);
    } catch (redisErr) {
      console.error("Redis get error:", redisErr);
      // Continue without cache - will fetch from DB
    }

    if (cachedFeed) {
      const cachedData = JSON.parse(cachedFeed)
      return res.status(200).json({
        message: `Feed fetched from redis`,
        data: cachedData.data,
        pagination: cachedData.pagination
      });
    }

    // total count of posts:
    const totalQuery = await postgresPool.query(`SELECT COUNT(*) FROM posts`);
    const total = Number(totalQuery.rows[0].count);

    // fetching feed
    const feed = await getFeed(page, limit);

    const pagination = getPagination(page, limit, total);

    const responseData = {
      data: feed,
      pagination,
    };

    // Try to set cache, but don't fail if Redis is down
    try {
      await redisClient.set(cachedKey, JSON.stringify(responseData), {
        EX: 1800,
      });
    } catch (redisErr) {
      console.error("Redis set error:", redisErr);
    }

    // response:
    res.status(200).json({
      message: `Feed successfully fetched`,
      ...responseData,
    });
  } catch (err) {
    next(err);
  }
};
