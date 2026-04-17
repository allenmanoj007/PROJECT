import express from 'express';
import { getPosts, createPost, updatePost, deletePost, toggleUpvote, exportComplaintsCsv } from '../controllers/postController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route to get posts
router.get('/', getPosts);

// Admin export route
router.get('/export', requireAuth, requireAdmin, exportComplaintsCsv);

// Protected routes
router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);
router.post('/:id/upvote', requireAuth, toggleUpvote);

export default router;
