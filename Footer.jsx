import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrizione */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-montserrat font-bold text-2xl mb-4">Casa Magafral Tindaya</h3>
            <p className="font-open-sans text-primary-foreground/80 mb-4">
              La tua villa di lusso nel tranquillo villaggio di Tindaya, Fuerteventura. 
              Scopri la bellezza intatta del nord delle Canarie con una piscina riscaldata 
              e tutti i comfort per una vacanza indimenticabile.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">Contatti</h4>
            <div className="space-y-3 font-open-sans text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+34 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@casamagafral.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Tindaya, Fuerteventura</span>
              </div>
            </div>
          </div>

          {/* Link utili */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">Link Utili</h4>
            <div className="space-y-2 font-open-sans text-primary-foreground/80">
              <a href="#casa" className="block hover:text-accent transition-colors">La Casa</a>
              <a href="#zona" className="block hover:text-accent transition-colors">La Zona</a>
              <a href="#prezzi" className="block hover:text-accent transition-colors">Prezzi</a>
              <a href="#recensioni" className="block hover:text-accent transition-colors">Recensioni</a>
              <a href="#" className="block hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-accent transition-colors">Termini di Servizio</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center font-open-sans text-primary-foreground/60">
          <p>&copy; 2024 Casa Magafral Tindaya. Tutti i diritti riservati.</p>
          <p className="mt-2">Codice Identificativo Turistico: in tramite</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

