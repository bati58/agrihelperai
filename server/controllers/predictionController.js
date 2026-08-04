const Prediction = require('../models/Prediction');
const aiService = require('../services/aiService');

const publicUrl = (req, filename) =>
    `${process.env.CLIENT_URL || 'http://localhost:5173'}`.replace('5173', process.env.PORT || '5000') +
    '/uploads/' +
    filename;

exports.create = async (req, res, next) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

        const imageUrl = publicUrl(req, req.file.filename);
        const result = await aiService(imageUrl);

        const pred = await Prediction.create({
            ...result,
            image_url: imageUrl,
            user_id: req.user._id,
            scan_date: new Date(),
        });
        res.json(pred);
    } catch (e) {
        next(e);
    }
};

exports.list = async (req, res, next) => {
    try {
        const q = req.user.role === 'admin' ? {} : { user_id: req.user._id };
        res.json(await Prediction.find(q).sort('-createdAt'));
    } catch (e) {
        next(e);
    }
};

exports.get = async (req, res, next) => {
    try {
        const pred = await Prediction.findById(req.params.id);
        if (!pred) return res.status(404).json({ message: 'Prediction not found' });
        res.json(pred);
    } catch (e) {
        next(e);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const pred = await Prediction.findById(req.params.id);
        if (!pred) return res.status(404).json({ message: 'Prediction not found' });
        if (pred.user_id?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not allowed' });
        }
        await pred.deleteOne();
        res.json({ ok: true });
    } catch (e) {
        next(e);
    }
};