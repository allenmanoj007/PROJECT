import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { getDB, saveUser, findUserByEmail } from '../db.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'super-secret-jwt-key', { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (findUserByEmail(email)) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      _id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      role: role || 'user',
      createdAt: new Date().toISOString()
    };
    
    saveUser(user);

    res.status(201).json({ _id: user._id, email: user.email, role: user.role, token: generateToken(user._id, user.role) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ _id: user._id, email: user.email, role: user.role, token: generateToken(user._id, user.role) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
