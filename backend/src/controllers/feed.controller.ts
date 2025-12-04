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

    // Read version from Redis
    let versionStr = await redisClient.get("feed:version");
    console.log(versionStr)

    // If key doesn’t exist, initialise it
    if (!versionStr) {
      await redisClient.set("feed:version", 1);
      versionStr = "1";
    }

    // Convert string to number
    const version: number = Number(versionStr);

    const cachedKey = `feed:v${version}:page:${page}:limit:${limit}`;

    try {
      const cached = await redisClient.get(cachedKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        return res.status(200).json({
          message: `Feed fetched from redis`,
          data: cachedData.data,
          pagination: cachedData.pagination,
        });
      }
    } catch (err: any) {
      console.error("Redis get error:", err);
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
