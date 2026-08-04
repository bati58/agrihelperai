# CropDoctor AI — MERN Scaffold

This folder contains starter code to rebuild CropDoctor AI as a self-hosted MERN stack in VS Code. The Base44 app's React pages can be copied across almost as-is; only the data/auth calls change (see `MIGRATION.md`).

## Structure
```
mern-scaffold/
├── server/          # Express + MongoDB + Multer + AI vision
└── client/          # Vite React frontend (glue files + reused Base44 pages)
```

## Quick start
1. Copy this `mern-scaffold/` folder somewhere on your machine.
2. Start MongoDB (local `mongod` or Atlas).
3. Backend:
   ```
   cd server
   npm install
   cp .env.example .env   # fill in MONGO_URI + OPENAI_API_KEY
   npm run seed
   npm run dev
   ```
4. Frontend:
   ```
   cd client
   npm install
   npm run dev
   ```
5. Open http://localhost:5173, register, then promote yourself to admin:
   ```
   mongosh "mongodb://127.0.0.1:27017/cropdoctor"
   db.users.updateOne({email:"you@example.com"}, {$set:{role:"admin"}})
   ```

## What you must supply
- `OPENAI_API_KEY` (or `GEMINI_API_KEY` + swap `services/aiService.js`)