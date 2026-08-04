const Disease = require('../models/Disease');

exports.list = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.q) filter.name = new RegExp(req.query.q, 'i');
        if (req.query.crop) filter.crop_name = new RegExp(req.query.crop, 'i');
        res.json(await Disease.find(filter).sort('crop_name'));
    } catch (e) {
        next(e);
    }
};