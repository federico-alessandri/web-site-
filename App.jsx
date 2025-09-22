import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import HighlightsSection from './components/sections/HighlightsSection';
import GallerySection from './components/sections/GallerySection';
import CasaSection from './components/sections/CasaSection';
import ZonaSection from './components/sections/ZonaSection';
import PrezziSection from './components/sections/PrezziSection';
import RecensioniSection from './components/sections/RecensioniSection';
import ContattiSection from './components/sections/ContattiSection';
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HighlightsSection />
        <GallerySection />
        <CasaSection />
        <ZonaSection />
        <PrezziSection />
        <RecensioniSection />
        <ContattiSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default App;

