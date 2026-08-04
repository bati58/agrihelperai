const r = require('express').Router();
const c = require('../controllers/cropController');
r.get('/', c.list);
module.exports = r;