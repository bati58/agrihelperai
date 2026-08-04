const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Prediction',
    new mongoose.Schema(
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            image_url: String,
            crop: { type: String, required: true },
            disease: { type: String, required: true },
            confidence: Number,
            severity: { type: String, enum: ['Low', 'Medium', 'High'] },
            symptoms: [String],
            cause: String,
            treatment_organic: String,
            treatment_chemical: String,
            prevention: [String],
            is_healthy: { type: Boolean, default: false },
            scan_date: { type: Date, default: Date.now },
        },
        { timestamps: true }
    )
);