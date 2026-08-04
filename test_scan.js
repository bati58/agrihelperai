require('dotenv').config({ path: require('path').resolve(__dirname, 'server/.env') });
const aiService = require('./server/services/aiService.js');

async function test() {
    try {
        console.log("Using API Key:", process.env.GEMINI_API_KEY);
        // Use an unsplash photo URL that is guaranteed to work
        const res = await aiService('https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=80&h=80&fit=crop&auto=format');
        console.log("Success:", res);
    } catch (e) {
        console.error("Error:", e.message);
        if (e.response) console.error(e.response);
    }
}
test();
