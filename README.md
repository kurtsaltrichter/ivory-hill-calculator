# Ivory Hill — True Cost of Hire Calculator

A branded, interactive employer cost calculator built with Next.js.

---

## Deploy to Vercel in ~5 Minutes

### Step 1 — Prerequisites
- A free account at [github.com](https://github.com)
- A free account at [vercel.com](https://vercel.com) (sign up with your GitHub account)
- [Node.js](https://nodejs.org) installed on your computer (v18 or later)

---

### Step 2 — Set up the project locally

Open Terminal (Mac) or Command Prompt (Windows), then run:

```bash
# Navigate to where you want the project to live
cd ~/Desktop

# Move into the project folder (wherever you unzipped this)
cd ivory-hill-calculator

# Install dependencies
npm install
```

---

### Step 3 — Test it locally (optional but recommended)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the calculator running. Press `Ctrl+C` to stop.

---

### Step 4 — Push to GitHub

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit — Ivory Hill calculator"
```

Then:
1. Go to [github.com/new](https://github.com/new)
2. Name the repo `ivory-hill-calculator`
3. Leave it **Private** if you prefer
4. Click **Create repository**
5. Copy the commands GitHub shows you under "push an existing repository" and run them in Terminal

---

### Step 5 — Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `ivory-hill-calculator`
4. Leave all settings as default — Vercel auto-detects Next.js
5. Click **Deploy**

Vercel will build and deploy in ~60 seconds. You'll get a live URL like:
```
https://ivory-hill-calculator.vercel.app
```

---

### Step 6 — Custom domain (optional)

If you want it on `tools.ivoryhill.com` or similar:
1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Add your domain
3. Vercel walks you through the DNS records to add at your registrar

---

## Project Structure

```
ivory-hill-calculator/
├── app/
│   ├── layout.js        # Font loading, metadata, SEO
│   ├── page.js          # Entry point
│   ├── Calculator.js    # Main calculator component
│   └── globals.css      # CSS reset
├── package.json
├── next.config.js
└── README.md
```

---

## Making Updates

Edit `app/Calculator.js` to:
- Change any default slider values
- Update health cost estimates
- Adjust the 25% labor ratio threshold
- Add your phone number or other contact info to the footer

After editing, just commit and push to GitHub — Vercel auto-redeploys.

---

## Contact

Kurt S. Altrichter, CRPS® | kurt@ivoryhill.com | 952.828.5336 | ivoryhill.com
