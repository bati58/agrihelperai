/**
 * CropDoctor AI — Comprehensive Database Seed Script
 * Run with: npm run seed  (from the /server directory)
 * Or: node utils/seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Crop = require('../models/Crop');
const Disease = require('../models/Disease');

const crops = [
    { name: 'Banana', scientific_name: 'Musa spp.', description: 'Tropical fruit and income source for smallholders.', disease_count: 3 },
    { name: 'Barley', scientific_name: 'Hordeum vulgare', description: 'Highland cereal for food, feed and brewing.', disease_count: 2 },
    { name: 'Cassava', scientific_name: 'Manihot esculenta', description: 'Drought-tolerant root crop for sub-Saharan Africa.', disease_count: 3 },
    { name: 'Coffee', scientific_name: 'Coffea arabica', description: "Ethiopia's most important export crop.", disease_count: 2 },
    { name: 'Maize', scientific_name: 'Zea mays', description: 'Staple cereal across Africa, vital for food security.', disease_count: 4 },
    { name: 'Mango', scientific_name: 'Mangifera indica', description: 'Tropical fruit tree vulnerable to fungi.', disease_count: 2 },
    { name: 'Onion', scientific_name: 'Allium cepa', description: 'Bulb vegetable with specific fungal risks.', disease_count: 2 },
    { name: 'Pepper', scientific_name: 'Capsicum annuum', description: 'Spice/vegetable with high market value.', disease_count: 2 },
    { name: 'Potato', scientific_name: 'Solanum tuberosum', description: 'Critical food crop susceptible to devastating blights.', disease_count: 3 },
    { name: 'Rice', scientific_name: 'Oryza sativa', description: 'Staple cereal grown in paddies and uplands.', disease_count: 3 },
    { name: 'Sorghum', scientific_name: 'Sorghum bicolor', description: 'Drought-resistant cereal for dry regions.', disease_count: 2 },
    { name: 'Soybean', scientific_name: 'Glycine max', description: 'High-protein legume with nitrogen-fixing benefits.', disease_count: 2 },
    { name: 'Tomato', scientific_name: 'Solanum lycopersicum', description: 'Widely consumed vegetable with many disease threats.', disease_count: 4 },
    { name: 'Wheat', scientific_name: 'Triticum aestivum', description: 'Major cereal for bread and food security.', disease_count: 3 },
];

const diseases = [
    // === BANANA ===
    {
        crop_name: 'Banana', name: 'Black Sigatoka', severity_typical: 'High',
        symptoms: ['Dark brown to black streaks on leaves', 'Yellow halos around lesions', 'Premature leaf death'],
        cause: 'Fungus: Mycosphaerella fijiensis',
        treatment_organic: 'Apply neem oil spray (5ml/L) weekly. Remove and destroy infected leaves immediately.',
        treatment_chemical: 'Propiconazole 25EC at 1ml/L every 14 days during wet season.',
        prevention: ['Plant resistant varieties', 'Maintain spacing for airflow', 'Remove dead leaves regularly'],
    },
    {
        crop_name: 'Banana', name: 'Banana Xanthomonas Wilt', severity_typical: 'High',
        symptoms: ['Yellow wilting of leaves', 'Premature ripening', 'Brown rot inside fruit'],
        cause: 'Bacteria: Xanthomonas vasicola pv. musacearum',
        treatment_organic: 'No chemical cure. Remove infected plants, sterilize tools with 10% bleach.',
        treatment_chemical: 'No registered chemical treatment. Focus on prevention and containment.',
        prevention: ['Use clean planting material', 'Disinfect cutting tools', 'Remove male flower bud using a clean forked stick'],
    },
    {
        crop_name: 'Banana', name: 'Panama Wilt (Fusarium Wilt)', severity_typical: 'High',
        symptoms: ['Yellowing and wilting of older leaves', 'Brown discoloration inside the stem', 'Plant collapse'],
        cause: 'Fungus: Fusarium oxysporum f. sp. cubense',
        treatment_organic: 'Apply Trichoderma harzianum to soil. No curative treatment — focus on prevention.',
        treatment_chemical: 'Soil fumigation with metam sodium before planting in infected fields.',
        prevention: ['Plant Fusarium-resistant varieties like FHIA hybrids', 'Avoid waterlogging', 'Quarantine infected areas'],
    },

    // === BARLEY ===
    {
        crop_name: 'Barley', name: 'Barley Net Blotch', severity_typical: 'Medium',
        symptoms: ['Brown net-like patterns on leaves', 'Lesions with yellow halos', 'Reduced grain fill'],
        cause: 'Fungus: Pyrenophora teres',
        treatment_organic: 'Crop rotation with non-grass crops for 2+ years. Apply Trichoderma-based biofungicides.',
        treatment_chemical: 'Tebuconazole 25WG at 0.75kg/ha at boot stage.',
        prevention: ['Use certified disease-free seed', 'Rotate crops', 'Avoid excessive nitrogen'],
    },
    {
        crop_name: 'Barley', name: 'Barley Yellow Dwarf', severity_typical: 'High',
        symptoms: ['Yellowing of leaf tips', 'Stunted growth', 'Erect, stiff leaves'],
        cause: 'Virus: Barley yellow dwarf virus (BYDV) transmitted by aphids',
        treatment_organic: 'Control aphid vectors with neem-based sprays. Remove infected plants early.',
        treatment_chemical: 'Imidacloprid seed treatment to reduce aphid transmission.',
        prevention: ['Plant early to avoid aphid peak season', 'Use virus-tolerant varieties', 'Monitor aphid populations'],
    },

    // === CASSAVA ===
    {
        crop_name: 'Cassava', name: 'Cassava Mosaic Disease', severity_typical: 'High',
        symptoms: ['Mosaic yellow-green leaf patterns', 'Leaf distortion and stunting', 'Reduced root yield'],
        cause: 'Virus: Cassava mosaic virus (CMV) spread by whiteflies',
        treatment_organic: 'No cure. Rogue out infected plants. Use yellow sticky traps for whiteflies.',
        treatment_chemical: 'Imidacloprid 70WS stem treatment to reduce whitefly spread.',
        prevention: ['Use virus-free certified stems', 'Plant resistant varieties (TME 419)', 'Control whitefly populations'],
    },
    {
        crop_name: 'Cassava', name: 'Cassava Brown Streak Disease', severity_typical: 'High',
        symptoms: ['Yellow streaks on leaves', 'Brown discoloration of roots', 'Watery rot in tubers'],
        cause: 'Virus: Cassava brown streak virus (CBSV) spread by whiteflies',
        treatment_organic: 'Remove and destroy infected plants. Use healthy planting material.',
        treatment_chemical: 'Mineral oil spray to reduce whitefly feeding and virus transmission.',
        prevention: ['Use certified disease-free stem cuttings', 'Plant resistant varieties', 'Inspect fields regularly'],
    },
    {
        crop_name: 'Cassava', name: 'Cassava Bacterial Blight', severity_typical: 'Medium',
        symptoms: ['Angular water-soaked leaf spots', 'Leaf blight and wilting', 'Stem dieback'],
        cause: 'Bacteria: Xanthomonas axonopodis pv. manihotis',
        treatment_organic: 'Copper-based sprays (Bordeaux mixture) at 5g/L. Remove infected plant parts.',
        treatment_chemical: 'Copper oxychloride 50WP at 2kg/ha at first sign of symptoms.',
        prevention: ['Use disease-free planting material', 'Avoid working in fields when wet', 'Rotate crops'],
    },

    // === COFFEE ===
    {
        crop_name: 'Coffee', name: 'Coffee Leaf Rust', severity_typical: 'High',
        symptoms: ['Pale yellow spots on upper leaf surface', 'Orange powdery spores on leaf underside', 'Premature leaf drop'],
        cause: 'Fungus: Hemileia vastatrix',
        treatment_organic: 'Copper hydroxide (Kocide) spray at 3g/L every 21 days during rainy season.',
        treatment_chemical: 'Triadimefon 25WP at 0.5g/L or propiconazole 0.1% solution.',
        prevention: ['Plant resistant varieties (Ruiru 11, Batian)', 'Prune for airflow', 'Avoid waterlogging'],
    },
    {
        crop_name: 'Coffee', name: 'Coffee Berry Borer', severity_typical: 'High',
        symptoms: ['Small round holes in coffee berries', 'Premature fruit drop', 'Infested berries with insect larvae inside'],
        cause: 'Insect: Hypothenemus hampei',
        treatment_organic: 'Beauveria bassiana (entomopathogenic fungus) spray. Strip all remaining berries after harvest.',
        treatment_chemical: 'Chlorpyrifos 48EC alternatives. Check local regulations for approved products.',
        prevention: ['Harvest all ripe berries promptly', 'Sanitation of fallen berries', 'Use pheromone traps for monitoring'],
    },

    // === MAIZE ===
    {
        crop_name: 'Maize', name: 'Maize Lethal Necrosis', severity_typical: 'High',
        symptoms: ['Yellowing and necrosis from leaf tips', 'Dead plants before tasseling', 'Premature cob death'],
        cause: 'Co-infection: Maize chlorotic mottle virus + Sugarcane mosaic virus',
        treatment_organic: 'No cure. Remove infected plants. Control thrips and aphids with neem spray.',
        treatment_chemical: 'Imidacloprid seed treatment to reduce vector insects.',
        prevention: ['Use certified virus-free seed', 'Control vector insects early', 'Remove volunteer maize plants'],
    },
    {
        crop_name: 'Maize', name: 'Gray Leaf Spot', severity_typical: 'Medium',
        symptoms: ['Long, rectangular tan/gray lesions on leaves', 'Lesions parallel to leaf veins', 'Premature death of lower leaves'],
        cause: 'Fungus: Cercospora zeae-maydis',
        treatment_organic: 'Apply Trichoderma harzianum biofungicide. Ensure good field drainage.',
        treatment_chemical: 'Azoxystrobin + propiconazole (Quilt Xcel) at 1L/ha at VT/R1 stage.',
        prevention: ['Plant resistant hybrids', 'Crop rotation', 'Minimize surface residue through tillage'],
    },
    {
        crop_name: 'Maize', name: 'Northern Corn Leaf Blight', severity_typical: 'Medium',
        symptoms: ['Long cigar-shaped tan lesions', 'Greenish-gray lesions in severe cases', 'Leaf death in severe infections'],
        cause: 'Fungus: Exserohilum turcicum',
        treatment_organic: 'Copper-based fungicide spray. Improve field air circulation through spacing.',
        treatment_chemical: 'Mancozeb 80WP at 2kg/ha or Propiconazole 25EC at 0.5L/ha.',
        prevention: ['Plant resistant varieties', 'Rotate with non-grass crops', 'Avoid over-irrigation'],
    },
    {
        crop_name: 'Maize', name: 'Fall Armyworm', severity_typical: 'High',
        symptoms: ['Ragged leaf feeding damage', 'Window-paning on young leaves', 'Frass (excrement) in leaf whorls'],
        cause: 'Insect: Spodoptera frugiperda',
        treatment_organic: 'Apply Bt (Bacillus thuringiensis) spray at first larval instar. Use sand+lime mixture in whorls.',
        treatment_chemical: 'Emamectin benzoate 1.9EC at 0.4L/ha or Chlorpyrifos 48EC at 1L/ha.',
        prevention: ['Early planting to escape peak infestation', 'Intercrop with legumes', 'Scout weekly from seedling stage'],
    },

    // === MANGO ===
    {
        crop_name: 'Mango', name: 'Mango Anthracnose', severity_typical: 'High',
        symptoms: ['Dark sunken lesions on fruit', 'Black spots on flowers', 'Leaf tip dieback'],
        cause: 'Fungus: Colletotrichum gloeosporioides',
        treatment_organic: 'Apply Bordeaux mixture (1%) at flowering. Collect and destroy fallen infected fruit.',
        treatment_chemical: 'Carbendazim 50WP at 1g/L or Mancozeb 75WP at 2.5g/L pre-harvest.',
        prevention: ['Prune trees for air circulation', 'Avoid overhead irrigation', 'Harvest at correct maturity'],
    },
    {
        crop_name: 'Mango', name: 'Powdery Mildew', severity_typical: 'Medium',
        symptoms: ['White powdery growth on young leaves and flowers', 'Flower drop', 'Stunted fruit development'],
        cause: 'Fungus: Oidium mangiferae',
        treatment_organic: 'Spray 0.5% baking soda solution or neem oil (5ml/L) at weekly intervals.',
        treatment_chemical: 'Dinocap 48EC at 0.5ml/L or Sulfur 80WP at 3g/L at flowering initiation.',
        prevention: ['Plant in well-drained sites', 'Avoid dense planting', 'Apply preventive sulfur during dry season'],
    },

    // === ONION ===
    {
        crop_name: 'Onion', name: 'Purple Blotch', severity_typical: 'Medium',
        symptoms: ['Small white sunken lesions', 'Purple center with yellow margins on leaves', 'Tip dieback'],
        cause: 'Fungus: Alternaria porri',
        treatment_organic: 'Copper oxychloride 0.3% spray. Remove and destroy infected plant material.',
        treatment_chemical: 'Iprodione 50WP at 1.5g/L or Propiconazole 25EC at 0.5ml/L.',
        prevention: ['Avoid overhead irrigation', 'Use certified seed', 'Rotate with non-Allium crops for 3+ years'],
    },
    {
        crop_name: 'Onion', name: 'Downy Mildew', severity_typical: 'High',
        symptoms: ['Pale green-yellow lesions on older leaves', 'Grayish-purple fuzzy growth', 'Leaf collapse'],
        cause: 'Oomycete: Peronospora destructor',
        treatment_organic: 'Apply copper-based fungicides (Bordeaux mixture) preventively.',
        treatment_chemical: 'Metalaxyl + Mancozeb (Ridomil Gold) at 2.5g/L every 14 days.',
        prevention: ['Proper drainage', 'Avoid dense plantings', 'Use disease-free seed'],
    },

    // === PEPPER ===
    {
        crop_name: 'Pepper', name: 'Pepper Anthracnose', severity_typical: 'High',
        symptoms: ['Sunken circular lesions on fruit', 'Salmon-colored spore masses', 'Fruit rot and shriveling'],
        cause: 'Fungus: Colletotrichum capsici',
        treatment_organic: 'Copper hydroxide spray (2g/L) every 10 days. Remove diseased fruit.',
        treatment_chemical: 'Azoxystrobin 23SC at 1ml/L or Mancozeb 75WP at 2g/L.',
        prevention: ['Use disease-free seed', 'Avoid wetting foliage', 'Harvest regularly'],
    },
    {
        crop_name: 'Pepper', name: 'Phytophthora Blight', severity_typical: 'High',
        symptoms: ['Water-soaked lesions on stem at soil line', 'Wilting and sudden plant collapse', 'Dark brown crown rot'],
        cause: 'Oomycete: Phytophthora capsici',
        treatment_organic: 'Apply Bacillus subtilis-based biofungicide to soil. Improve drainage.',
        treatment_chemical: 'Metalaxyl 35WS at 3g/L soil drench. Fosetyl-Al 80WP at 3g/L.',
        prevention: ['Avoid waterlogged soils', 'Use raised beds', 'Rotate with cereals'],
    },

    // === POTATO ===
    {
        crop_name: 'Potato', name: 'Late Blight', severity_typical: 'High',
        symptoms: ['Water-soaked dark lesions on leaves', 'White fuzzy mold on leaf underside', 'Rapid plant collapse in wet weather'],
        cause: 'Oomycete: Phytophthora infestans',
        treatment_organic: 'Apply Bordeaux mixture (1%) preventively every 7-10 days in wet season.',
        treatment_chemical: 'Metalaxyl + Mancozeb (Ridomil) at 2.5g/L. Chlorothalonil 75WP at 2g/L.',
        prevention: ['Use certified disease-free seed tubers', 'Hilling', 'Avoid overhead irrigation in evenings'],
    },
    {
        crop_name: 'Potato', name: 'Early Blight', severity_typical: 'Medium',
        symptoms: ['Dark brown circular spots with concentric rings', 'Yellow halos around spots', 'Lower leaf defoliation'],
        cause: 'Fungus: Alternaria solani',
        treatment_organic: 'Neem oil (5ml/L) spray. Remove infected lower leaves.',
        treatment_chemical: 'Mancozeb 75WP at 2g/L or Iprodione 50WP at 1.5g/L every 14 days.',
        prevention: ['Crop rotation (3 years)', 'Adequate potassium fertilization', 'Avoid overhead watering'],
    },
    {
        crop_name: 'Potato', name: 'Bacterial Wilt', severity_typical: 'High',
        symptoms: ['Sudden wilting without yellowing', 'Brown vascular discoloration inside stems', 'Slime ooze from cut stems'],
        cause: 'Bacteria: Ralstonia solanacearum',
        treatment_organic: 'No chemical cure. Rogue infected plants immediately. Apply lime to soil (pH >7).',
        treatment_chemical: 'No effective chemical control. Soil fumigation as last resort.',
        prevention: ['Use certified clean seed tubers', 'Avoid contaminated water', 'Long crop rotation (4+ years)'],
    },

    // === RICE ===
    {
        crop_name: 'Rice', name: 'Rice Blast', severity_typical: 'High',
        symptoms: ['Diamond-shaped gray lesions with brown borders', 'Neck rot at panicle base', 'White empty spikelets'],
        cause: 'Fungus: Magnaporthe oryzae',
        treatment_organic: 'Silicon fertilizer increases resistance. Apply Trichoderma biofungicide.',
        treatment_chemical: 'Tricyclazole 75WP at 0.6g/L or Azoxystrobin 23SC at 1ml/L at booting stage.',
        prevention: ['Plant resistant varieties', 'Balanced nitrogen management', 'Avoid late-season nitrogen applications'],
    },
    {
        crop_name: 'Rice', name: 'Bacterial Leaf Blight', severity_typical: 'High',
        symptoms: ['Water-soaked margins that turn yellow then white', 'Wilting of seedlings (kresek)', 'Milky bacterial ooze on cut stems'],
        cause: 'Bacteria: Xanthomonas oryzae pv. oryzae',
        treatment_organic: 'Copper oxychloride spray (3g/L). Remove and destroy infected plant debris.',
        treatment_chemical: 'Bismerthiazol 20WP at 1.5g/L or Streptomycin + Copper oxychloride.',
        prevention: ['Use resistant varieties', 'Avoid excessive nitrogen', 'Drain fields during kresek phase'],
    },
    {
        crop_name: 'Rice', name: 'Brown Spot', severity_typical: 'Medium',
        symptoms: ['Oval brown lesions with gray centers', 'Lesions on grain (pecky rice)', 'Seedling blight'],
        cause: 'Fungus: Helminthosporium oryzae',
        treatment_organic: 'Hot water seed treatment (52°C for 10 minutes). Potassium fertilization.',
        treatment_chemical: 'Mancozeb 75WP at 2g/L or Propiconazole 25EC at 0.5ml/L.',
        prevention: ['Balanced fertilization (avoid potassium deficiency)', 'Use certified seed', 'Drain fields properly'],
    },

    // === SORGHUM ===
    {
        crop_name: 'Sorghum', name: 'Sorghum Grain Mold', severity_typical: 'High',
        symptoms: ['Pink, red or gray mold on grain', 'Shrunken, discolored kernels', 'Premature grain death'],
        cause: 'Fungal complex: Fusarium spp., Curvularia spp., Alternaria spp.',
        treatment_organic: 'Harvest at correct maturity. Apply wood ash extract spray at flowering.',
        treatment_chemical: 'Mancozeb 80WP at 2.5g/L or Thiram 75DS seed treatment.',
        prevention: ['Plant tight-glume varieties', 'Harvest promptly when mature', 'Avoid lodging'],
    },
    {
        crop_name: 'Sorghum', name: 'Covered Kernel Smut', severity_typical: 'Medium',
        symptoms: ['Grain replaced by a bag of black spores', 'Smut sori covered with thin membrane', 'Reduced yield'],
        cause: 'Fungus: Sporisorium sorghi',
        treatment_organic: 'Hot water seed treatment (54°C for 10 minutes).',
        treatment_chemical: 'Carboxin + Thiram seed treatment (Vitavax 200) at 3g/kg seed.',
        prevention: ['Use certified treated seed', 'Destroy stubble after harvest', 'Plant resistant varieties'],
    },

    // === SOYBEAN ===
    {
        crop_name: 'Soybean', name: 'Soybean Rust', severity_typical: 'High',
        symptoms: ['Tan to reddish-brown pustules on leaf underside', 'Premature defoliation', 'Yield loss up to 80%'],
        cause: 'Fungus: Phakopsora pachyrhizi',
        treatment_organic: 'Apply neem oil (5ml/L) as preventive spray. Rotate with non-host crops.',
        treatment_chemical: 'Tebuconazole 25EW at 1L/ha or Azoxystrobin + Propiconazole at 0.8L/ha.',
        prevention: ['Early planting to avoid peak sporulation', 'Monitor sentinel plots', 'Plant resistant varieties'],
    },
    {
        crop_name: 'Soybean', name: 'Frogeye Leaf Spot', severity_typical: 'Medium',
        symptoms: ['Circular gray spots with reddish-brown borders', 'Spots coalesce to kill large areas', 'Reduced photosynthesis'],
        cause: 'Fungus: Cercospora sojina',
        treatment_organic: 'Crop rotation with cereals. Copper-based sprays preventively.',
        treatment_chemical: 'Carbendazim 50WP at 1g/L or Thiophanate-methyl 70WP at 1.5g/L.',
        prevention: ['Resistant varieties', 'Avoid overhead irrigation', 'Tillage to bury residue'],
    },

    // === TOMATO ===
    {
        crop_name: 'Tomato', name: 'Tomato Late Blight', severity_typical: 'High',
        symptoms: ['Dark water-soaked lesions on leaves', 'White mold growth on leaf underside', 'Brown lesions on fruit'],
        cause: 'Oomycete: Phytophthora infestans',
        treatment_organic: 'Bordeaux mixture (1%) spray every 7 days. Remove infected plant material.',
        treatment_chemical: 'Metalaxyl-M + Mancozeb (Ridomil Gold) at 2.5g/L or Chlorothalonil 72SC.',
        prevention: ['Space plants for airflow', 'Avoid wetting foliage', 'Use certified disease-free transplants'],
    },
    {
        crop_name: 'Tomato', name: 'Tomato Early Blight', severity_typical: 'Medium',
        symptoms: ['Concentric ring "target" spots on older leaves', 'Yellow halos around lesions', 'Stem cankers at soil line'],
        cause: 'Fungus: Alternaria solani',
        treatment_organic: 'Neem oil spray (5ml/L) every 7-10 days. Mulch to prevent soil splash.',
        treatment_chemical: 'Mancozeb 75WP at 2g/L or Chlorothalonil 75WP at 2g/L on 7-day schedule.',
        prevention: ['Remove lower leaves regularly', 'Mulch soil surface', 'Drip irrigation instead of overhead'],
    },
    {
        crop_name: 'Tomato', name: 'Tomato Bacterial Wilt', severity_typical: 'High',
        symptoms: ['Sudden complete wilting of plant', 'Brown vascular tissue inside stems', 'Bacterial slime from cut stems in water'],
        cause: 'Bacteria: Ralstonia solanacearum',
        treatment_organic: 'Soil solarization. Apply Bacillus subtilis to soil. Adjust soil pH to 7+.',
        treatment_chemical: 'No effective chemical cure. Streptomycin as early preventive only.',
        prevention: ['Grafting on resistant rootstock', 'Long rotation with cereals', 'Avoid contaminated irrigation water'],
    },
    {
        crop_name: 'Tomato', name: 'Tomato Yellow Leaf Curl Virus', severity_typical: 'High',
        symptoms: ['Upward and inward leaf curling', 'Yellowing of leaf margins', 'Stunted plants and reduced fruiting'],
        cause: 'Virus: Tomato yellow leaf curl virus (TYLCV) spread by whiteflies',
        treatment_organic: 'No cure. Remove infected plants. Control whiteflies with neem oil + soap spray.',
        treatment_chemical: 'Imidacloprid 70WS seed treatment or foliar spray at 0.5ml/L for whitefly control.',
        prevention: ['Use reflective mulches', 'Yellow sticky traps', 'Plant TYLCV-resistant varieties'],
    },

    // === WHEAT ===
    {
        crop_name: 'Wheat', name: 'Wheat Yellow Rust (Stripe Rust)', severity_typical: 'High',
        symptoms: ['Yellow-orange stripe-like pustules on leaves', 'Stripes parallel to leaf veins', 'Shriveled grain'],
        cause: 'Fungus: Puccinia striiformis f. sp. tritici',
        treatment_organic: 'Plant resistant varieties. Apply neem-based biofungicide preventively.',
        treatment_chemical: "Propiconazole 25EC at 0.5L/ha or Tebuconazole 25EW at 1L/ha at flag leaf stage.",
        prevention: ["Plant resistant varieties (Kakaba, Danda'a)", 'Early sowing', 'Avoid late heavy nitrogen applications'],
    },
    {
        crop_name: 'Wheat', name: 'Septoria Leaf Blotch', severity_typical: 'Medium',
        symptoms: ['Tan lesions with yellow halos on leaves', 'Small black pycnidia (dots) in lesions', 'Lower leaf blight'],
        cause: 'Fungus: Mycosphaerella graminicola',
        treatment_organic: 'Trichoderma biofungicide. Remove infected crop debris after harvest.',
        treatment_chemical: 'Epoxiconazole + Pyraclostrobin (Opera) at 1L/ha or Mancozeb at booting.',
        prevention: ['Plant resistant varieties', 'Crop rotation', 'Avoid excessive leaf wetness'],
    },
    {
        crop_name: 'Wheat', name: 'Fusarium Head Blight (Scab)', severity_typical: 'High',
        symptoms: ['Bleached spikelets in otherwise green heads', 'Pink/salmon mold at spikelet base', 'Shriveled tombstone kernels'],
        cause: 'Fungus: Fusarium graminearum',
        treatment_organic: 'Biocontrol with Bacillus subtilis QST713. Rotate with non-cereal crops.',
        treatment_chemical: 'Metconazole 90WG at 1kg/ha or Tebuconazole at early heading stage.',
        prevention: ['Plant resistant varieties', 'Rotate with soybeans or legumes', 'Avoid corn-wheat rotations'],
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await Crop.deleteMany({});
        await Disease.deleteMany({});
        console.log('🗑️  Cleared existing crops and diseases');

        const insertedCrops = await Crop.insertMany(crops);
        console.log(`🌱 Inserted ${insertedCrops.length} crops`);

        const insertedDiseases = await Disease.insertMany(diseases);
        console.log(`🦠 Inserted ${insertedDiseases.length} diseases`);

        console.log('\n🎉 Seed complete! CropDoctor AI database is ready.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
}

seed();