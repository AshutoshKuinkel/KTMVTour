import { limiter } from './../middlewares/rate-limit.middleware';
import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { commentOnPost, getAllComments } from '../controllers/comments.controller';

const router = express.Router()

router.post('/comment/:postId',authenticate(),limiter,commentOnPost)
router.get('/allComments/:postId',getAllComments)

export default router