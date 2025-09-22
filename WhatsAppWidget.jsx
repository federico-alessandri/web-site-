import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './button';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "+34123456789";
  const defaultMessage = "Ciao! Sono interessato a Casa Magafral Tindaya. Potreste darmi maggiori informazioni?";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4 max-w-sm animate-fade-in-up">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-montserrat font-semibold text-sm">Casa Magafral</h4>
                <p className="text-xs text-muted-foreground">Online ora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="font-open-sans text-sm text-muted-foreground mb-3">
            Hai domande sulla casa o vuoi prenotare? Scrivici su WhatsApp!
          </p>
          <Button
            onClick={openWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            Inizia Chat
          </Button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;

