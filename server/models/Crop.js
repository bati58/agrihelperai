const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Crop',
    new mongoose.Schema({
        name: { type: String, required: true },
        scientific_name: String,
        description: String,
        image_url: String,
        optimal_temperature: String,
        water_requirements: String,
        soil_type: String,
        disease_count: { type: Number, default: 0 },
    })
);