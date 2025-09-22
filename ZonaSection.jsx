import React from 'react';
import { MapPin, Utensils, Camera, Waves, Mountain, Car } from 'lucide-react';
import { Button } from '../ui/button';
import spiaggia1 from '../../assets/spiaggia_fuerteventura_1.jpg';
import spiaggia2 from '../../assets/spiaggia_fuerteventura_2.jpg';

const ZonaSection = () => {
  const attrazioni = [
    {
      icon: Waves,
      name: "Spiaggia di El Cotillo",
      distanza: "15 min",
      descrizione: "Spiaggia di sabbia bianca con acque cristalline, perfetta per il relax e gli sport acquatici."
    },
    {
      icon: Waves,
      name: "Spiaggia di Jarugo",
      distanza: "10 min",
      descrizione: "Spiaggia selvaggia e incontaminata, ideale per chi cerca tranquillità."
    },
    {
      icon: Mountain,
      name: "Montagna Sacra di Tindaya",
      distanza: "5 min",
      descrizione: "Montagna vulcanica sacra ai Guanci, con vista panoramica sull'isola."
    },
    {
      icon: Utensils,
      name: "Ristoranti Locali",
      distanza: "2 min",
      descrizione: "Autentici ristoranti canari dove gustare specialità locali e pesce fresco."
    },
    {
      icon: Camera,
      name: "Mirador de Vallebrón",
      distanza: "20 min",
      descrizione: "Punto panoramico con vista mozzafiato sulla costa nord dell'isola."
    },
    {
      icon: Car,
      name: "Centro di La Oliva",
      distanza: "10 min",
      descrizione: "Centro storico con negozi, mercati locali e servizi essenziali."
    }
  ];

  const consigli = [
    {
      categoria: "Spiagge",
      items: ["El Cotillo - Perfetta per famiglie", "Cofete - Spiaggia selvaggia", "Corralejo - Dune di sabbia"]
    },
    {
      categoria: "Ristoranti",
      items: ["Restaurante El Horno - Cucina locale", "La Vaca Azul - Pesce fresco", "Casa Marcos - Tapas tradizionali"]
    },
    {
      categoria: "Attività",
      items: ["Surf a El Cotillo", "Escursioni vulcaniche", "Osservazione stelle"]
    }
  ];

  return (
    <section id="zona" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
            La Zona
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri le meraviglie di Fuerteventura: spiagge paradisiache, 
            paesaggi vulcanici e autentiche tradizioni canarie
          </p>
        </div>

        {/* Immagini della zona */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src={spiaggia1} 
              alt="Spiagge di Fuerteventura"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-montserrat font-bold text-xl">Spiagge Paradisiache</h3>
              <p className="font-open-sans">Acque cristalline e sabbia dorata</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src={spiaggia2} 
              alt="Paesaggi di Fuerteventura"
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-montserrat font-bold text-xl">Paesaggi Vulcanici</h3>
              <p className="font-open-sans">Natura incontaminata e panorami unici</p>
            </div>
          </div>
        </div>

        {/* Attrazioni principali */}
        <div className="mb-12">
          <h3 className="font-montserrat font-bold text-2xl text-primary mb-8 text-center">
            Attrazioni Principali
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attrazioni.map((attrazione, index) => {
              const IconComponent = attrazione.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm card-hover"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-montserrat font-semibold text-primary">
                          {attrazione.name}
                        </h4>
                        <span className="text-sm text-accent font-medium">
                          {attrazione.distanza}
                        </span>
                      </div>
                      <p className="font-open-sans text-sm text-muted-foreground">
                        {attrazione.descrizione}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consigli locali */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h3 className="font-montserrat font-bold text-2xl text-primary mb-8 text-center">
            I Nostri Consigli
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consigli.map((consiglio, index) => (
              <div key={index}>
                <h4 className="font-montserrat font-semibold text-lg text-primary mb-4">
                  {consiglio.categoria}
                </h4>
                <ul className="space-y-2">
                  {consiglio.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="font-open-sans text-muted-foreground flex items-center space-x-2"
                    >
                      <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="font-montserrat font-semibold">
              Scarica Guida Completa
            </Button>
          </div>
        </div>

        {/* Mappa placeholder */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm text-center">
          <h3 className="font-montserrat font-bold text-2xl text-primary mb-4">
            Mappa Interattiva
          </h3>
          <div className="bg-secondary/20 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="font-open-sans text-muted-foreground">
                Mappa interattiva con tutte le attrazioni principali
              </p>
              <Button className="mt-4 bg-accent hover:bg-accent/90">
                Visualizza Mappa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZonaSection;

