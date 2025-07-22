const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify token for protected routes
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: "A token is required for authentication" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
};

// --- PUBLIC ROUTES ---

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found." });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

// --- AUTH ROUTES ---

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        if (await User.findOne({ username })) {
            return res.status(409).json({ message: "Username already exists." });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword, ...req.body });
        res.status(201).json({ message: "User registered successfully! Please log in." });
    } catch (error) {
        res.status(500).json({ message: "An internal server error occurred." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return res.json({ token });
        }
        return res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ message: "An internal server error occurred." });
    }
});

// --- PROTECTED ROUTE ---

router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found." });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your data' });
    }
});

module.exports = router;