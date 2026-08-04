const User = require('../models/User');

/**
 * POST /api/payment/initiate
 * Initiates a Chapa payment session.
 */
exports.initiatePayment = async (req, res, next) => {
    try {
        const { amount, currency = 'ETB', email, first_name, last_name, callback_url, return_url } = req.body;

        if (!amount || !email) {
            return res.status(400).json({ message: 'amount and email are required' });
        }

        const tx_ref = `cropdoctor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const payload = {
            amount: String(amount),
            currency,
            email,
            first_name: first_name || 'Supporter',
            last_name: last_name || '',
            tx_ref,
            callback_url: callback_url || `${process.env.SERVER_URL || 'http://localhost:5000'}/api/payment/verify`,
            return_url: return_url || `${process.env.CLIENT_URL || 'http://localhost:5173'}/support?success=true`,
            customization: {
                title: 'CropDoctor AI Support',
                description: 'Help keep crop disease detection free for farmers',
            },
        };

        const chapaRes = await fetch('https://api.chapa.co/v1/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await chapaRes.json();

        if (!chapaRes.ok || data.status !== 'success') {
            return res.status(400).json({ message: data.message || 'Payment initialization failed', data });
        }

        res.json({ checkout_url: data.data.checkout_url, tx_ref });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/payment/verify?tx_ref=...
 * Verifies a Chapa payment transaction.
 */
exports.verifyPayment = async (req, res, next) => {
    try {
        const { tx_ref } = req.query;
        if (!tx_ref) return res.status(400).json({ message: 'tx_ref required' });

        const chapaRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
            headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
        });

        const data = await chapaRes.json();
        res.json(data);
    } catch (err) {
        next(err);
    }
};
