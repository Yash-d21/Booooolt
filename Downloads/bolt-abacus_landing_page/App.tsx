import React from 'react';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Problem } from './components/sections/Problem';
import { Solution } from './components/sections/Solution';
import { Features } from './components/sections/Features';
import { HowItWorks } from './components/sections/HowItWorks';
import { Competitions } from './components/sections/Competitions';
import { Credibility } from './components/sections/Credibility';
import { CTA } from './components/sections/CTA';
import { CurvedMarqueeCTA } from './components/sections/CurvedMarqueeCTA';
import { Footer } from './components/sections/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold-500 selection:text-black">
      <Navbar />
      <main>
        <div className="snap-start snap-always w-full"><Hero /></div>
        <div className="snap-start snap-always w-full"><Problem /></div>
        <div className="snap-start snap-always w-full"><Solution /></div>
        <div className="snap-start snap-always w-full"><Features /></div>
        <div className="snap-start snap-always w-full"><HowItWorks /></div>
        <div className="snap-start snap-always w-full"><Competitions /></div>
        <div className="snap-start snap-always w-full"><Credibility /></div>
        <div className="snap-start snap-always w-full"><CTA /></div>
        <div className="snap-start snap-always w-full"><CurvedMarqueeCTA /></div>
      </main>
      <div className="snap-end snap-always w-full"><Footer /></div>
    </div>
  );
};

export default App;