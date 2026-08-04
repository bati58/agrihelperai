const r = require('express').Router();
const c = require('../controllers/userController');
const auth = require('../middleware/auth');

r.get('/', auth, auth.admin, c.list);
r.delete('/:id', auth, auth.admin, c.remove);

module.exports = r;