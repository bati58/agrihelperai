const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sign = (u) =>
    jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });

exports.register = async (req, res, next) => {
    try {
        const { email, password, full_name } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
        if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
        const user = await User.create({ email, password, full_name });
        res.json({ token: sign(user), user });
    } catch (e) {
        next(e);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.password || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.json({ token: sign(user), user });
    } catch (e) {
        next(e);
    }
};

exports.me = (req, res) => res.json(req.user);

exports.updateMe = async (req, res, next) => {
    try {
        const { full_name, phone, country } = req.body;
        const updated = await User.findByIdAndUpdate(
            req.user._id,
            { full_name, phone, country },
            { new: true, runValidators: true }
        );
        res.json(updated);
    } catch (e) {
        next(e);
    }
};