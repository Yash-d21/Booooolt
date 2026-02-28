<div align="center">
  <img alt="Bolt Abacus Logo" src="/public/logo.png" width="200" style="margin-bottom: 20px;" />

  <h1>Bolt Abacus — Modern Practice Revolution</h1>
  <p>Engineered for students. Built for teachers.</p>
</div>

---

## ⚡ Overview

Bolt Abacus is a premium, high-performance structured practice platform built specifically for abacus teachers and their students. Moving away from traditional pen-and-paper tracking, Bolt delivers an engaging, gamified, and highly competitive environment to dramatically increase practice volume and speed. 

It handles global tournament routing, live leaderboards, class management, and automated score-tracking, equipping educators with a **free management dashboard** while students subscribe for premium access to the world-record holding practice arena. 

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [Magic UI](https://magicui.design/)
- **Icons**: [Lucide React](https://lucide.dev/icons/)
- **Deployment**: [Vercel](https://vercel.com/) 

## 📦 Local Development

To run the Bolt Abacus landing page locally on your machine, follow these steps:

**Prerequisites:** Ensure you have Node.js (v18+) installed.

1. **Clone & install dependencies:**
   ```bash
   # Install using npm, yarn, or pnpm
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **View the application:**
   Open your browser and navigate to `http://localhost:3000`.

## 🌐 Deploying to Vercel

This application is fully optimized to be deployed instantly on Vercel. 

### Method 1: Vercel Dashboard (Recommended)

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. 
4. Vercel will auto-detect the Next.js framework. Leave the default build settings (`npm run build`).
5. Click **"Deploy"**.

### Method 2: Vercel CLI

If you prefer using the command line:

1. Install the Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command from the project root:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to link your project and deploy. For a production deployment, use `vercel --prod`.

## 🎨 Design System

The landing page relies on a custom dark mode glassmorphism UI utilizing primarily:
- `bg-black` and extreme dark neutrils (`#0a0a0a`)
- `text-gold-500` gradients and accents ranging from amber to gold-300.
- Emerald (`#34D399`) and Amber hues for competitive game/tournament indicators.

### Key Components
- **HeroAbacusVisual**: Animated CSS-rendered abacus simulation comparing calculation speed.
- **BouncyCardsFeatures**: Framer-motion driven staggered layout detailing core capabilities. 
- **CurvedMarqueeCTA**: Infinite looping radial wheel constructed with strict mathematical anchor points to prevent overflow clipping.
