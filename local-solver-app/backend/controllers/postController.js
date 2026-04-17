import crypto from 'crypto';
import { getDB, savePost, updatePostInDB, deletePostInDB, findUserById } from '../db.js';

export const getPosts = async (req, res) => {
  try {
    const { category, status } = req.query;
    const db = getDB();
    let posts = db.posts;

    if (category) posts = posts.filter(p => p.category === category);
    if (status) posts = posts.filter(p => p.status === status);

    const populatedPosts = posts.map(post => {
      const authorInfo = findUserById(post.author);
      return { ...post, author: authorInfo ? { _id: authorInfo._id, email: authorInfo.email } : null };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(populatedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const exportComplaintsCsv = async (req, res) => {
  try {
    const db = getDB();
    const complaints = db.posts.filter(post => post.category === 'Complaint');
    const rows = complaints.map(post => {
      const authorInfo = findUserById(post.author);
      const authorEmail = authorInfo ? authorInfo.email : '';
      const escapeCsv = (value) => {
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      };
      return [
        post._id,
        post.title,
        post.description,
        post.category,
        post.location,
        post.status,
        authorEmail,
        post.createdAt
      ].map(escapeCsv).join(',');
    });

    const csv = [
      'ID,Title,Description,Category,Location,Status,AuthorEmail,CreatedAt',
      ...rows
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="complaints.csv"');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, category, location, imageUrl } = req.body;
    const post = {
      _id: crypto.randomUUID(),
      title, description, category, location, imageUrl,
      status: 'Open',
      author: req.user.id,
      upvotes: [],
      createdAt: new Date().toISOString()
    };
    savePost(post);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { status, title, description, category } = req.body;
    const db = getDB();
    const post = db.posts.find(p => p._id === req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    if (status) post.status = status;
    if (title) post.title = title;
    if (description) post.description = description;
    if (category) post.category = category;

    updatePostInDB(post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const db = getDB();
    const post = db.posts.find(p => p._id === req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });

    deletePostInDB(post._id);
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleUpvote = async (req, res) => {
  try {
    const db = getDB();
    const post = db.posts.find(p => p._id === req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const upvoteIndex = post.upvotes.indexOf(req.user.id);
    if (upvoteIndex !== -1) {
      post.upvotes.splice(upvoteIndex, 1);
    } else {
      post.upvotes.push(req.user.id);
    }
    updatePostInDB(post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
