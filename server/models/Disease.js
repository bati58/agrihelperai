const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Disease',
    new mongoose.Schema({
        crop_name: { type: String, required: true },
        name: { type: String, required: true },
        symptoms: [String],
        cause: String,
        treatment_organic: String,
        treatment_chemical: String,
        prevention: [String],
        image_url: String,
        severity_typical: { type: String, enum: ['Low', 'Medium', 'High'] },
    })
);