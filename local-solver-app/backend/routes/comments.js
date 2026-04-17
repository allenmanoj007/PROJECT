import express from 'express';
import { getComments, createComment } from '../controllers/commentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:postId', getComments);
router.post('/', requireAuth, createComment);

export default router;
