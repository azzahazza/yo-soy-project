# Face Origin Quiz

A research quiz application testing participants' ability to identify East Asian nationalities from photographs.

## Quick Start (Local Development)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## Deploy to Vercel (Recommended - Free)

### Option 1: Via GitHub
1. Push this folder to a GitHub repository
2. Go to https://vercel.com and sign up/login with GitHub
3. Click "New Project" → Import your repository
4. Click "Deploy" - done!

### Option 2: Via Vercel CLI
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in this directory
3. Follow the prompts

## Deploy to Netlify (Alternative - Free)

1. Push to GitHub
2. Go to https://netlify.com and sign up/login
3. Click "Add new site" → "Import an existing project"
4. Select your repository and deploy

## Project Structure

```
face-quiz-app/
├── public/
│   ├── index.html
│   └── images/          # All 50 face images
├── src/
│   ├── index.js
│   └── App.js           # Main quiz component
├── package.json
└── README.md
```

## Features

- Demographics collection (gender, ethnicity, East Asian exposure)
- 10 random images per quiz attempt (from pool of 50)
- No 4-in-a-row same nationality (prevents pattern guessing)
- Results breakdown by nationality
- Mobile responsive design
