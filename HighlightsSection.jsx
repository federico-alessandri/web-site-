import React from 'react';
import { Waves, Sun, Home } from 'lucide-react';

const HighlightsSection = () => {
  const highlights = [
    {
      icon: Waves,
      title: "Vicino al Mare",
      description: "A pochi minuti dalle spiagge più belle di Fuerteventura: Jarugo, Tebeto, Ezquinzo e El Cotillo."
    },
    {
      icon: Sun,
      title: "Clima Perfetto",
      description: "Goditi il clima subtropicale delle Canarie con oltre 300 giorni di sole all'anno."
    },
    {
      icon: Home,
      title: "Casa Completa",
      description: "Villa di lusso con piscina riscaldata, 4 camere con bagno privato e tutti i comfort moderni."
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
            Perché Scegliere Casa Magafral
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri tutti i vantaggi di soggiornare nella nostra villa di lusso nel cuore di Fuerteventura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-primary mb-3">
                  {highlight.title}
                </h3>
                <p className="font-open-sans text-muted-foreground">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;

