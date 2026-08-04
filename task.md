# Phase 2 — Task Tracker

## Priority 0: Switch AI to Gemini (Free)
- [ ] Install `@google/generative-ai` package
- [ ] Rewrite `aiService.js` for Gemini 2.0 Flash
- [ ] Update `.env` with `GEMINI_API_KEY` placeholder
- [ ] Test scan works

## Feature 1: Multi-Language (EN / Afaan Oromoo / Amharic)
- [ ] Create translation JSON files (en.json, om.json, am.json)
- [ ] Create `LanguageContext.jsx` with `t()` function
- [ ] Add language selector to Navbar
- [ ] Add Amharic font (Noto Sans Ethiopic)
- [ ] Update all pages to use `t()` keys

## Feature 2: Google OAuth
- [ ] Install passport + passport-google-oauth20
- [ ] Create `config/passport.js`
- [ ] Add Google OAuth routes to authRoutes
- [ ] Add "Sign in with Google" button to Login/Register pages
- [ ] Update `.env` with Google OAuth placeholders

## Feature 3: Chapa Donations
- [ ] Create `Support.jsx` page
- [ ] Create payment routes + controller
- [ ] Add `/support` route to App.jsx
- [ ] Add "Support Us" link to Navbar/Footer
