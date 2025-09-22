import React, { useState } from 'react';
import { Wifi, Car, Waves, Thermometer, Tv, Coffee, Users, Bed } from 'lucide-react';
import { Button } from '../ui/button';
import casaImage1 from '../../assets/casa_vacanze_piscina_1.jpg';
import casaImage2 from '../../assets/casa_vacanze_piscina_2.jpg';

const CasaSection = () => {
  const [activeTab, setActiveTab] = useState('interni');

  const servizi = [
    { icon: Wifi, name: "Wi-Fi Gratuito", description: "Connessione internet ad alta velocità" },
    { icon: Car, name: "Parcheggio", description: "Posto auto privato incluso" },
    { icon: Waves, name: "Piscina Riscaldata", description: "Piscina privata con riscaldamento" },
    { icon: Thermometer, name: "Aria Condizionata", description: "Climatizzazione in tutte le stanze" },
    { icon: Tv, name: "Smart TV", description: "TV satellitare e streaming" },
    { icon: Coffee, name: "Cucina Completa", description: "Cucina moderna completamente attrezzata" },
    { icon: Users, name: "8 Ospiti", description: "Spazio per fino a 8 persone" },
    { icon: Bed, name: "4 Camere", description: "Quattro camere con bagno privato" }
  ];

  const tabs = [
    { id: 'interni', name: 'Interni', content: 'La villa dispone di un ampio soggiorno open space con cucina moderna completamente attrezzata, perfetta per preparare deliziosi pasti con ingredienti locali. Le quattro camere da letto, ognuna con bagno privato, offrono comfort e privacy per tutti gli ospiti. Gli spazi sono arredati con gusto moderno e materiali di qualità.' },
    { id: 'esterni', name: 'Esterni', content: 'Il giardino privato con piscina riscaldata è il cuore della villa. La terrazza offre spazi per rilassarsi e cenare all\'aperto, godendo del clima perfetto delle Canarie. L\'area piscina è dotata di lettini e ombrelloni per il massimo comfort durante le giornate di sole.' },
    { id: 'posizione', name: 'Posizione', content: 'Situata nel tranquillo villaggio di Tindaya, la villa offre la perfetta combinazione di pace e accessibilità. A pochi minuti di auto dalle spiagge più belle di Fuerteventura come El Cotillo, Jarugo e Tebeto. Il villaggio offre servizi essenziali e autentici ristoranti locali.' }
  ];

  return (
    <section id="casa" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
            La Casa
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri tutti i dettagli della nostra villa di lusso, progettata per offrirti 
            il massimo comfort durante la tua vacanza alle Canarie
          </p>
        </div>

        {/* Galleria principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <img 
              src={casaImage1} 
              alt="Casa Magafral - Vista esterna"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
            <img 
              src={casaImage2} 
              alt="Casa Magafral - Villa moderna"
              className="w-full h-48 md:h-60 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-montserrat font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-primary'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="min-h-[120px]">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`font-open-sans text-muted-foreground leading-relaxed ${
                    activeTab === tab.id ? 'block animate-fade-in-up' : 'hidden'
                  }`}
                >
                  {tab.content}
                </div>
              ))}
            </div>

            <Button className="bg-accent hover:bg-accent/90" size="lg">
              Richiedi Preventivo
            </Button>
          </div>
        </div>

        {/* Servizi inclusi */}
        <div>
          <h3 className="font-montserrat font-bold text-2xl text-primary mb-8 text-center">
            Servizi Inclusi
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {servizi.map((servizio, index) => {
              const IconComponent = servizio.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-4 bg-secondary/20 rounded-lg card-hover"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-montserrat font-semibold text-sm text-primary mb-1">
                    {servizio.name}
                  </h4>
                  <p className="font-open-sans text-xs text-muted-foreground">
                    {servizio.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasaSection;

