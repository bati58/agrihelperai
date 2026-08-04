const Crop = require('../models/Crop');

exports.list = async (req, res, next) => {
    try {
        const q = req.query.q ? { name: new RegExp(req.query.q, 'i') } : {};
        res.json(await Crop.find(q).sort('name'));
    } catch (e) {
        next(e);
    }
};