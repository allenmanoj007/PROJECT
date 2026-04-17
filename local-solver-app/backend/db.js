import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('./database.json');

export const getDB = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [], posts: [], comments: [] }));
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export const saveUser = (user) => {
  const db = getDB();
  db.users.push(user);
  writeDB(db);
};

export const findUserByEmail = (email) => {
  const db = getDB();
  return db.users.find(u => u.email === email);
};

export const findUserById = (id) => {
  const db = getDB();
  return db.users.find(u => u._id === id);
};

export const savePost = (post) => {
  const db = getDB();
  db.posts.push(post);
  writeDB(db);
};

export const updatePostInDB = (updatedPost) => {
  const db = getDB();
  const index = db.posts.findIndex(p => p._id === updatedPost._id);
  if(index !== -1) {
    db.posts[index] = updatedPost;
    writeDB(db);
  }
};

export const deletePostInDB = (id) => {
  const db = getDB();
  db.posts = db.posts.filter(p => p._id !== id);
  writeDB(db);
};

export const saveComment = (comment) => {
  const db = getDB();
  db.comments.push(comment);
  writeDB(db);
};
