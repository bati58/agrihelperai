const r = require('express').Router();
const c = require('../controllers/predictionController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

r.post('/', auth, upload.single('image'), c.create);
r.get('/', auth, c.list);
r.get('/:id', auth, c.get);
r.delete('/:id', auth, c.remove);

module.exports = r;