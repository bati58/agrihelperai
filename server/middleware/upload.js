const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

module.exports = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (_req, file, cb) =>
            cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) =>
        /jpeg|jpg|png|webp/.test(file.mimetype) ? cb(null, true) : cb(new Error('Only JPG, PNG, WEBP allowed')),
});