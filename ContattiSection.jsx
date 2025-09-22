import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useContact } from '../../hooks/useContact';

const ContattiSection = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    checkin: '',
    checkout: '',
    ospiti: '2',
    messaggio: ''
  });

  const { loading, error, success, submitContactMessage, resetStatus } = useContact();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset status when user starts typing
    if (error || success) {
      resetStatus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email) {
      alert('Nome e email sono obbligatori');
      return;
    }

    try {
      await submitContactMessage(formData);
      // Reset form on success
      setFormData({
        nome: '',
        email: '',
        telefono: '',
        checkin: '',
        checkout: '',
        ospiti: '2',
        messaggio: ''
      });
    } catch (err) {
      console.error('Errore nell\'invio del messaggio:', err);
    }
  };

  const contatti = [
    {
      icon: Phone,
      titolo: "Telefono",
      valore: "+34 123 456 789",
      descrizione: "Disponibili 9:00 - 20:00",
      link: "tel:+34123456789"
    },
    {
      icon: Mail,
      titolo: "Email",
      valore: "info@casamagafral.com",
      descrizione: "Risposta entro 24h",
      link: "mailto:info@casamagafral.com"
    },
    {
      icon: MessageCircle,
      titolo: "WhatsApp",
      valore: "+34 123 456 789",
      descrizione: "Chat diretta",
      link: "https://wa.me/34123456789"
    },
    {
      icon: MapPin,
      titolo: "Indirizzo",
      valore: "Tindaya, Fuerteventura",
      descrizione: "Isole Canarie, Spagna",
      link: "#"
    }
  ];

  const faq = [
    {
      domanda: "Qual è il check-in e check-out?",
      risposta: "Check-in dalle 16:00, check-out entro le 11:00. Orari flessibili su richiesta."
    },
    {
      domanda: "È richiesta una cauzione?",
      risposta: "Sì, richiediamo una cauzione di €500 rimborsabile al check-out se non ci sono danni."
    },
    {
      domanda: "Gli animali sono ammessi?",
      risposta: "Ci dispiace, ma non accettiamo animali domestici per mantenere la casa in condizioni ottimali."
    },
    {
      domanda: "C'è un numero minimo di notti?",
      risposta: "Sì, richiediamo un soggiorno minimo di 5 notti per tutti i periodi."
    }
  ];

  return (
    <section id="contatti" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-primary mb-4">
            Contattaci
          </h2>
          <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Siamo qui per aiutarti a pianificare la tua vacanza perfetta. 
            Contattaci per qualsiasi domanda o per prenotare Casa Magafral.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form di contatto */}
          <div>
            <h3 className="font-montserrat font-bold text-2xl text-primary mb-6">
              Richiedi Informazioni
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-open-sans text-sm font-medium text-foreground mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label className="block font-open-sans text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="la-tua-email@esempio.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-open-sans text-sm font-medium text-foreground mb-2">
                  Telefono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+39 123 456 7890"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-open-sans text-sm font-medium text-foreground mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    name="checkin"
                    value={formData.checkin}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block font-open-sans text-sm font-medium text-foreground mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    name="checkout"
                    value={formData.checkout}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block font-open-sans text-sm font-medium text-foreground mb-2">
                    Ospiti
                  </label>
                  <select
                    name="ospiti"
                    value={formData.ospiti}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
              </div>

              <div>
                <label className="block font-open-sans text-sm font-medium text-foreground mb-2">
                  Messaggio
                </label>
                <textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Raccontaci di più sui tuoi piani di viaggio..."
                />
              </div>

              {/* Status messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-open-sans text-sm">
                    Errore: {error}
                  </p>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <p className="text-green-800 font-open-sans text-sm">
                      Messaggio inviato con successo! Ti contatteremo presto.
                    </p>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                size="lg" 
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 font-montserrat font-semibold disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Invia Richiesta
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Informazioni di contatto */}
          <div>
            <h3 className="font-montserrat font-bold text-2xl text-primary mb-6">
              Informazioni di Contatto
            </h3>
            
            <div className="space-y-6 mb-8">
              {contatti.map((contatto, index) => {
                const IconComponent = contatto.icon;
                return (
                  <a
                    key={index}
                    href={contatto.link}
                    className="flex items-start space-x-4 p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors duration-200"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-primary mb-1">
                        {contatto.titolo}
                      </h4>
                      <p className="font-open-sans text-foreground font-medium">
                        {contatto.valore}
                      </p>
                      <p className="font-open-sans text-sm text-muted-foreground">
                        {contatto.descrizione}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Orari di contatto */}
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <h4 className="font-montserrat font-semibold text-primary mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Orari di Contatto
              </h4>
              <div className="space-y-2 font-open-sans text-sm">
                <div className="flex justify-between">
                  <span>Lunedì - Venerdì:</span>
                  <span>9:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabato:</span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domenica:</span>
                  <span>10:00 - 16:00</span>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h4 className="font-montserrat font-semibold text-lg text-primary mb-4">
                Domande Frequenti
              </h4>
              <div className="space-y-4">
                {faq.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4">
                    <h5 className="font-montserrat font-medium text-foreground mb-2">
                      {item.domanda}
                    </h5>
                    <p className="font-open-sans text-sm text-muted-foreground">
                      {item.risposta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Risposta rapida */}
        <div className="mt-12 text-center bg-primary/5 rounded-lg p-8">
          <h3 className="font-montserrat font-bold text-xl text-primary mb-4">
            Risposta Garantita in 24 Ore
          </h3>
          <p className="font-open-sans text-muted-foreground mb-6">
            Il nostro team risponde a tutte le richieste entro 24 ore. 
            Per urgenze, contattaci direttamente via WhatsApp.
          </p>
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white font-montserrat font-semibold"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contatta via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContattiSection;

