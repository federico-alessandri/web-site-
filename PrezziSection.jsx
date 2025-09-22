import React, { useState } from 'react';
import { Calendar, Users, Euro, Check, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useBooking } from '../../hooks/useBooking';

const PrezziSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('standard');
  const [bookingForm, setBookingForm] = useState({
    checkin: '',
    checkout: '',
    guests: '2'
  });
  const [priceCalculation, setPriceCalculation] = useState(null);

  const { loading, error, calculatePrice } = useBooking();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculatePrice = async () => {
    if (!bookingForm.checkin || !bookingForm.checkout) {
      alert('Seleziona le date di check-in e check-out');
      return;
    }

    try {
      const result = await calculatePrice(
        bookingForm.checkin,
        bookingForm.checkout,
        parseInt(bookingForm.guests)
      );
      setPriceCalculation(result);
    } catch (err) {
      console.error('Errore nel calcolo del prezzo:', err);
    }
  };

  const periodi = [
    {
      id: 'standard',
      nome: 'Stagione Standard',
      periodo: '01 Set 2025 - 19 Dic 2025',
      prezzoGiorno: 264.28,
      prezzoSettimana: 1850,
      colore: 'bg-primary'
    },
    {
      id: 'natale',
      nome: 'Periodo Natalizio',
      periodo: '20 Dic 2025 - 06 Gen 2026',
      prezzoGiorno: 315,
      prezzoSettimana: 2200,
      colore: 'bg-accent'
    },
    {
      id: 'primavera',
      nome: 'Primavera 2026',
      periodo: '07 Gen 2026 - 30 Giu 2026',
      prezzoGiorno: 264.28,
      prezzoSettimana: 1850,
      colore: 'bg-primary'
    }
  ];

  const incluso = [
    "Piscina riscaldata privata",
    "Wi-Fi gratuito ad alta velocità",
    "Aria condizionata in tutte le stanze",
    "Posto auto privato",
    "Cucina completamente attrezzata",
    "Smart TV e streaming",
    "Biancheria e asciugamani",
    "Pulizia finale"
  ];

  const nonIncluso = [
    "Voli",
    "Trasferimenti aeroporto",
    "Assicurazione viaggio",
    "Pasti",
    "Attività extra",
    "Cauzione (€500 rimborsabile)"
  ];

  const offerte = [
    {
      titolo: "Soggiorno Lungo",
      descrizione: "Sconto 10% per soggiorni superiori a 14 giorni",
      sconto: "10%"
    },
    {
      titolo: "Prenotazione Anticipata",
      descrizione: "Sconto 5% per prenotazioni con 60 giorni di anticipo",
      sconto: "5%"
    },
    {
      titolo: "Last Minute",
      descrizione: "Offerte speciali per prenotazioni dell'ultimo momento",
      sconto: "Variabile"
    }
  ];

  return (
    <section id="prezzi" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
            Prezzi & Disponibilità
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Tariffe trasparenti e competitive per la tua vacanza da sogno alle Canarie. 
            Minimo 5 notti di soggiorno.
          </p>
        </div>

        {/* Calendario e prezzi */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Calendario placeholder */}
          <div className="lg:col-span-2 bg-secondary/20 rounded-lg p-8">
            <h3 className="font-montserrat font-bold text-xl text-primary mb-6">
              Calendario Disponibilità
            </h3>
            <div className="bg-white rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-open-sans text-muted-foreground mb-4">
                  Calendario interattivo con disponibilità in tempo reale
                </p>
                <Button className="bg-accent hover:bg-accent/90">
                  Visualizza Calendario
                </Button>
              </div>
            </div>
          </div>

          {/* Form prenotazione */}
          <div className="bg-primary text-primary-foreground rounded-lg p-6">
            <h3 className="font-montserrat font-bold text-xl mb-6">
              Richiedi Preventivo
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-open-sans text-sm mb-2">Check-in</label>
                <input 
                  type="date" 
                  name="checkin"
                  value={bookingForm.checkin}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block font-open-sans text-sm mb-2">Check-out</label>
                <input 
                  type="date" 
                  name="checkout"
                  value={bookingForm.checkout}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg text-foreground"
                />
              </div>
              <div>
                <label className="block font-open-sans text-sm mb-2">Ospiti</label>
                <select 
                  name="guests"
                  value={bookingForm.guests}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg text-foreground"
                >
                  <option value="1">1 Ospite</option>
                  <option value="2">2 Ospiti</option>
                  <option value="3">3 Ospiti</option>
                  <option value="4">4 Ospiti</option>
                  <option value="5">5 Ospiti</option>
                  <option value="6">6 Ospiti</option>
                  <option value="7">7 Ospiti</option>
                  <option value="8">8 Ospiti</option>
                </select>
              </div>
              <Button 
                onClick={handleCalculatePrice}
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Calcolando...
                  </>
                ) : (
                  'Calcola Prezzo'
                )}
              </Button>
              
              {error && (
                <div className="text-red-300 text-sm">
                  Errore: {error}
                </div>
              )}
              
              <div className="text-center pt-4 border-t border-primary-foreground/20">
                <p className="font-open-sans text-sm mb-2">Prezzo stimato</p>
                {priceCalculation ? (
                  <>
                    <p className="font-montserrat font-bold text-2xl">
                      €{priceCalculation.total}
                    </p>
                    <p className="font-open-sans text-xs">
                      per {priceCalculation.nights} notti
                    </p>
                    <div className="text-xs mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span>€{priceCalculation.price_per_night} x {priceCalculation.nights} notti</span>
                        <span>€{priceCalculation.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pulizia finale</span>
                        <span>€{priceCalculation.cleaning_fee}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-montserrat font-bold text-2xl">€1.850</p>
                    <p className="font-open-sans text-xs">per settimana</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabelle prezzi */}
        <div className="mb-12">
          <h3 className="font-montserrat font-bold text-2xl text-primary mb-8 text-center">
            Tariffe Stagionali
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {periodi.map((periodo) => (
              <div 
                key={periodo.id}
                className={`rounded-lg p-6 text-white ${periodo.colore} ${
                  selectedPeriod === periodo.id ? 'ring-4 ring-white' : ''
                }`}
                onClick={() => setSelectedPeriod(periodo.id)}
              >
                <h4 className="font-montserrat font-bold text-lg mb-2">
                  {periodo.nome}
                </h4>
                <p className="font-open-sans text-sm mb-4 opacity-90">
                  {periodo.periodo}
                </p>
                <div className="text-center">
                  <div className="mb-2">
                    <span className="font-montserrat font-bold text-3xl">
                      €{periodo.prezzoGiorno}
                    </span>
                    <span className="font-open-sans text-sm">/notte</span>
                  </div>
                  <div>
                    <span className="font-montserrat font-bold text-xl">
                      €{periodo.prezzoSettimana}
                    </span>
                    <span className="font-open-sans text-sm">/settimana</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cosa è incluso */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 rounded-lg p-6">
            <h4 className="font-montserrat font-bold text-lg text-green-800 mb-4 flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Incluso nel Prezzo
            </h4>
            <ul className="space-y-2">
              {incluso.map((item, index) => (
                <li key={index} className="font-open-sans text-green-700 flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 rounded-lg p-6">
            <h4 className="font-montserrat font-bold text-lg text-red-800 mb-4 flex items-center">
              <X className="w-5 h-5 mr-2" />
              Non Incluso
            </h4>
            <ul className="space-y-2">
              {nonIncluso.map((item, index) => (
                <li key={index} className="font-open-sans text-red-700 flex items-center">
                  <X className="w-4 h-4 mr-2 text-red-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Offerte speciali */}
        <div className="bg-secondary/20 rounded-lg p-8">
          <h3 className="font-montserrat font-bold text-2xl text-primary mb-8 text-center">
            Offerte Speciali
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offerte.map((offerta, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center card-hover">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-montserrat font-bold text-accent text-lg">
                    {offerta.sconto}
                  </span>
                </div>
                <h4 className="font-montserrat font-bold text-lg text-primary mb-2">
                  {offerta.titolo}
                </h4>
                <p className="font-open-sans text-muted-foreground">
                  {offerta.descrizione}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA finale */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-accent hover:bg-accent/90 font-montserrat font-semibold px-8">
            Prenota Ora
          </Button>
          <p className="font-open-sans text-sm text-muted-foreground mt-4">
            Prenotazione sicura • Cancellazione gratuita fino a 30 giorni prima
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrezziSection;

