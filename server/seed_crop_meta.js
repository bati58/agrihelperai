require('dotenv').config();
const mongoose = require('mongoose');
const Crop = require('./models/Crop');

const cropData = {
    'Maize': {
        optimal_temperature: '18-27°C',
        water_requirements: '500-800 mm',
        soil_type: 'Well-drained loam'
    },
    'Tomato': {
        optimal_temperature: '21-27°C',
        water_requirements: '400-600 mm',
        soil_type: 'Sandy loam'
    },
    'Potato': {
        optimal_temperature: '15-20°C',
        water_requirements: '500-700 mm',
        soil_type: 'Loose, well-drained'
    },
    'Coffee': {
        optimal_temperature: '15-24°C',
        water_requirements: '1500-2000 mm',
        soil_type: 'Volcanic, slightly acidic'
    },
    'Wheat': {
        optimal_temperature: '15-25°C',
        water_requirements: '450-650 mm',
        soil_type: 'Clay loam'
    },
    'Banana': {
        optimal_temperature: '26-30°C',
        water_requirements: '2000-2500 mm',
        soil_type: 'Deep, rich loam'
    },
    'Pepper': {
        optimal_temperature: '21-29°C',
        water_requirements: '600-800 mm',
        soil_type: 'Well-drained sandy loam'
    },
    'Mango': {
        optimal_temperature: '24-30°C',
        water_requirements: '700-2500 mm',
        soil_type: 'Deep, well-drained'
    },
    'Onion': {
        optimal_temperature: '13-24°C',
        water_requirements: '350-550 mm',
        soil_type: 'Fertile, well-drained'
    },
    'Barley': {
        optimal_temperature: '12-25°C',
        water_requirements: '390-430 mm',
        soil_type: 'Well-drained loam'
    },
    'Cassava': {
        optimal_temperature: '25-29°C',
        water_requirements: '1000-1500 mm',
        soil_type: 'Light sandy loams'
    },
    'Rice': {
        optimal_temperature: '20-27°C',
        water_requirements: '1000-1500 mm',
        soil_type: 'Heavy clay'
    },
    'Sorghum': {
        optimal_temperature: '26-34°C',
        water_requirements: '400-600 mm',
        soil_type: 'Clay to sandy soils'
    },
    'Soybean': {
        optimal_temperature: '20-30°C',
        water_requirements: '450-700 mm',
        soil_type: 'Well-drained loam'
    }
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        for (const [name, data] of Object.entries(cropData)) {
            const result = await Crop.updateOne(
                { name: name },
                { $set: data }
            );
            console.log(`Updated ${name}:`, result.modifiedCount);
        }

        console.log('Done!');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seed();
