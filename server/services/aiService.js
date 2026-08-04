const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const PROMPT = `You are an expert plant pathologist AI. Analyze this crop leaf image.
Return ONLY a valid JSON object with these exact fields:
{
  "crop": "crop name (e.g. Maize/Tomato/Potato/Coffee/Wheat/Banana/Pepper/Mango/Onion/Barley/Cassava/Rice/Sorghum/Soybean/Unknown)",
  "disease": "specific disease name, or 'Healthy'",
  "is_healthy": boolean,
  "confidence": number 0-100,
  "severity": "Low" | "Medium" | "High" (null if healthy),
  "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "cause": "pathogen/fungus/bacteria/virus etc.",
  "treatment_organic": "specific organic treatment with dosage and method",
  "treatment_chemical": "specific chemical product name, dosage and frequency",
  "prevention": ["tip 1", "tip 2", "tip 3"]
}
If the image is not a plant leaf, set crop to "Unknown" and explain in the disease field.
Return ONLY the JSON object, no markdown, no backticks, no extra text.`;

let genAI = null;
function getClient() {
    if (!genAI) genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return genAI;
}

/**
 * Analyze a leaf image using Google Gemini 2.0 Flash (free tier).
 * @param {string} imageSource - Either a URL (http/https), a data URI (data:image/...), or a local file path
 */
module.exports = async (imageSource) => {
    if (!process.env.GEMINI_API_KEY) {
        throw Object.assign(new Error('GEMINI_API_KEY not set in server/.env — get one free at https://aistudio.google.com/apikey'), { status: 500 });
    }

    const model = getClient().getGenerativeModel({ model: 'gemini-1.5-flash' });

    let imagePart;

    if (imageSource.startsWith('data:')) {
        // Data URI — extract mime type and base64 data
        const match = imageSource.match(/^data:(image\/\w+);base64,(.+)$/);
        if (!match) throw Object.assign(new Error('Invalid data URI format'), { status: 400 });
        imagePart = {
            inlineData: {
                mimeType: match[1],
                data: match[2],
            },
        };
    } else if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
        // URL — fetch the image and convert to base64
        const response = await fetch(imageSource);
        if (!response.ok) throw Object.assign(new Error('Failed to fetch image from URL'), { status: 400 });
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        imagePart = {
            inlineData: {
                mimeType: contentType,
                data: buffer.toString('base64'),
            },
        };
    } else {
        // Local file path
        const absPath = path.resolve(imageSource);
        if (!fs.existsSync(absPath)) throw Object.assign(new Error('Image file not found'), { status: 400 });
        const buffer = fs.readFileSync(absPath);
        const ext = path.extname(absPath).toLowerCase();
        const mimeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };
        imagePart = {
            inlineData: {
                mimeType: mimeMap[ext] || 'image/jpeg',
                data: buffer.toString('base64'),
            },
        };
    }

    const result = await model.generateContent([PROMPT, imagePart]);
    const text = result.response.text();

    // Clean any markdown backticks the model might wrap the JSON in
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    const parsed = JSON.parse(cleaned);

    // Normalize confidence to 0-1 range
    if (parsed.confidence && parsed.confidence > 1) parsed.confidence = parsed.confidence / 100;

    return parsed;
};