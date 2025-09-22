import React from 'react';
import { Button } from '../ui/button';
import { Calendar, Users, MapPin } from 'lucide-react';
import casaImage from '../../assets/casa_vacanze_piscina_1.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${casaImage})` }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-shadow animate-fade-in-up">
          Casa Magafral Tindaya
        </h1>
        <p className="font-open-sans text-lg md:text-xl lg:text-2xl mb-8 text-shadow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          La tua villa di lusso con piscina riscaldata nel cuore di Fuerteventura
        </p>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Users className="w-5 h-5" />
            <span className="font-open-sans">8 Ospiti</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Calendar className="w-5 h-5" />
            <span className="font-open-sans">4 Camere</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <MapPin className="w-5 h-5" />
            <span className="font-open-sans">Tindaya</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-montserrat font-semibold px-8 py-3 text-lg"
          >
            Prenota Subito
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-primary font-montserrat font-semibold px-8 py-3 text-lg"
          >
            Scopri la Casa
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

