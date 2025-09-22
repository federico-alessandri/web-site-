import { createClient } from '@supabase/supabase-js';

// Configurazione Supabase (in un progetto reale, queste andrebbero nelle variabili d'ambiente)
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// Per questo demo, creiamo un client mock
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funzioni mock per simulare le operazioni del database
export const mockSupabase = {
  // Simula l'invio di una richiesta di prenotazione
  async submitBookingRequest(bookingData) {
    console.log('Booking request submitted:', bookingData);
    
    // Simula un delay di rete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simula una risposta di successo
    return {
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...bookingData,
        status: 'pending',
        created_at: new Date().toISOString()
      },
      error: null
    };
  },

  // Simula l'invio di un messaggio di contatto
  async submitContactMessage(messageData) {
    console.log('Contact message submitted:', messageData);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...messageData,
        status: 'received',
        created_at: new Date().toISOString()
      },
      error: null
    };
  },

  // Simula il recupero della disponibilità
  async getAvailability(startDate, endDate) {
    console.log('Checking availability:', { startDate, endDate });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simula alcune date non disponibili
    const unavailableDates = [
      '2024-12-25',
      '2024-12-26',
      '2024-12-31',
      '2025-01-01'
    ];
    
    return {
      data: {
        available: true,
        unavailable_dates: unavailableDates,
        price_per_night: 264.28
      },
      error: null
    };
  },

  // Simula il calcolo del prezzo
  async calculatePrice(startDate, endDate, guests) {
    console.log('Calculating price:', { startDate, endDate, guests });
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    let pricePerNight = 264.28;
    
    // Prezzi stagionali
    const month = start.getMonth();
    if (month === 11 || month === 0) { // Dicembre e Gennaio
      pricePerNight = 315;
    }
    
    const subtotal = nights * pricePerNight;
    const cleaningFee = 150;
    const total = subtotal + cleaningFee;
    
    return {
      data: {
        nights,
        price_per_night: pricePerNight,
        subtotal,
        cleaning_fee: cleaningFee,
        total,
        currency: 'EUR'
      },
      error: null
    };
  }
};

// Schema del database (per riferimento)
export const databaseSchema = {
  bookings: {
    id: 'uuid',
    guest_name: 'text',
    guest_email: 'text',
    guest_phone: 'text',
    check_in: 'date',
    check_out: 'date',
    guests: 'integer',
    total_price: 'decimal',
    status: 'text', // pending, confirmed, cancelled
    special_requests: 'text',
    created_at: 'timestamp'
  },
  
  contact_messages: {
    id: 'uuid',
    name: 'text',
    email: 'text',
    phone: 'text',
    message: 'text',
    status: 'text', // received, replied, closed
    created_at: 'timestamp'
  },
  
  availability: {
    id: 'uuid',
    date: 'date',
    available: 'boolean',
    price: 'decimal',
    min_nights: 'integer'
  }
};

