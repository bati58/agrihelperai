require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '15mb' }));
app.use(session({ secret: process.env.JWT_SECRET || 'session_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/predictions', require('./routes/predictionRoutes'));
app.use('/api/crops', require('./routes/cropRoutes'));
app.use('/api/diseases', require('./routes/diseaseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

app.use(require('./middleware/error'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CropDoctor API running on port ${PORT}`));