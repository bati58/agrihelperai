const r = require('express').Router();
const c = require('../controllers/paymentController');

r.post('/initiate', c.initiatePayment);
r.get('/verify', c.verifyPayment);

module.exports = r;
