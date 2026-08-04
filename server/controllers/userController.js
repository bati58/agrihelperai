const User = require('../models/User');

exports.list = async (_req, res, next) => {
    try {
        res.json(await User.find().select('-password').sort('-createdAt'));
    } catch (e) {
        next(e);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (e) {
        next(e);
    }
};