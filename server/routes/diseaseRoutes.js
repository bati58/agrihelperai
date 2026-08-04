const r = require('express').Router();
const c = require('../controllers/diseaseController');
r.get('/', c.list);
module.exports = r;