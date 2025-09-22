import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '../ui/button';

const RecensioniSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const recensioni = [
    {
      nome: "Marco e Giulia",
      paese: "Italia",
      data: "Agosto 2024",
      stelle: 5,
      titolo: "Vacanza perfetta!",
      testo: "Casa Magafral ha superato tutte le nostre aspettative. La villa è ancora più bella delle foto, la piscina riscaldata è stata un vero lusso e la posizione è perfetta per esplorare Fuerteventura. I proprietari sono stati disponibilissimi e ci hanno dato ottimi consigli. Torneremo sicuramente!",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      nome: "Hans e Ingrid",
      paese: "Germania",
      data: "Marzo 2024",
      stelle: 5,
      titolo: "Wunderbar!",
      testo: "Eine fantastische Villa in perfekter Lage! Wir haben unseren Aufenthalt sehr genossen. Das Haus ist modern und komfortabel, der Pool war jeden Tag ein Highlight. Die Strände von El Cotillo sind nur wenige Minuten entfernt. Sehr empfehlenswert!",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      nome: "Sophie et Pierre",
      paese: "Francia",
      data: "Gennaio 2024",
      stelle: 5,
      titolo: "Magnifique séjour",
      testo: "Nous avons passé deux semaines merveilleuses à Casa Magafral. La maison est spacieuse, très bien équipée et la piscine chauffée était parfaite même en hiver. L'emplacement est idéal pour découvrir les plus belles plages de Fuerteventura. Service client excellent!",
      foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      nome: "James and Sarah",
      paese: "Regno Unito",
      data: "Novembre 2023",
      stelle: 5,
      titolo: "Outstanding villa",
      testo: "This villa exceeded all our expectations. The location in Tindaya is peaceful yet convenient, the house is beautifully designed and the heated pool was a real treat. The owners were incredibly helpful and responsive. We're already planning our return visit!",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      nome: "Anna e Roberto",
      paese: "Italia",
      data: "Settembre 2023",
      stelle: 5,
      titolo: "Esperienza indimenticabile",
      testo: "Abbiamo trascorso una settimana fantastica a Casa Magafral. La casa è perfetta per famiglie, molto spaziosa e con tutti i comfort. I bambini hanno adorato la piscina e noi adulti abbiamo apprezzato la tranquillità del posto. Consigliatissima!",
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % recensioni.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + recensioni.length) % recensioni.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const mediaVoto = recensioni.reduce((acc, rec) => acc + rec.stelle, 0) / recensioni.length;

  return (
    <section id="recensioni" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
            Recensioni dei Nostri Ospiti
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Scopri cosa dicono i nostri ospiti della loro esperienza a Casa Magafral
          </p>
          
          {/* Rating summary */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(Math.round(mediaVoto))}
              </div>
              <p className="font-montserrat font-bold text-2xl text-primary">
                {mediaVoto.toFixed(1)}
              </p>
              <p className="font-open-sans text-sm text-muted-foreground">
                su {recensioni.length} recensioni
              </p>
            </div>
          </div>
        </div>

        {/* Slider recensioni */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="text-center mb-6">
              <Quote className="w-12 h-12 text-primary/20 mx-auto mb-4" />
              <div className="flex items-center justify-center space-x-1 mb-4">
                {renderStars(recensioni[currentReview].stelle)}
              </div>
              <h3 className="font-montserrat font-bold text-xl text-primary mb-2">
                {recensioni[currentReview].titolo}
              </h3>
            </div>

            <blockquote className="font-open-sans text-muted-foreground text-lg leading-relaxed text-center mb-8">
              "{recensioni[currentReview].testo}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <img
                src={recensioni[currentReview].foto}
                alt={recensioni[currentReview].nome}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-center">
                <p className="font-montserrat font-semibold text-primary">
                  {recensioni[currentReview].nome}
                </p>
                <p className="font-open-sans text-sm text-muted-foreground">
                  {recensioni[currentReview].paese} • {recensioni[currentReview].data}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {recensioni.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentReview ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl text-primary mb-2">98%</div>
            <div className="font-open-sans text-sm text-muted-foreground">Ospiti Soddisfatti</div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl text-primary mb-2">4.9</div>
            <div className="font-open-sans text-sm text-muted-foreground">Valutazione Media</div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl text-primary mb-2">85%</div>
            <div className="font-open-sans text-sm text-muted-foreground">Ospiti di Ritorno</div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl text-primary mb-2">150+</div>
            <div className="font-open-sans text-sm text-muted-foreground">Recensioni Positive</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-accent hover:bg-accent/90 font-montserrat font-semibold">
            Lascia una Recensione
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecensioniSection;

