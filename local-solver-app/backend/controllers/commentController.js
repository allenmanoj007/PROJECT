import crypto from 'crypto';
import { getDB, saveComment, findUserById } from '../db.js';

export const getComments = async (req, res) => {
  try {
    const db = getDB();
    const comments = db.comments.filter(c => c.post === req.params.postId);
    const populated = comments.map(c => {
      const authorInfo = findUserById(c.author);
      return { ...c, author: authorInfo ? { _id: authorInfo._id, email: authorInfo.email } : null };
    }).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const comment = {
      _id: crypto.randomUUID(),
      text,
      post: postId,
      author: req.user.id,
      createdAt: new Date().toISOString()
    };
    saveComment(comment);
    
    const authorInfo = findUserById(req.user.id);
    res.status(201).json({ ...comment, author: { _id: authorInfo._id, email: authorInfo.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
