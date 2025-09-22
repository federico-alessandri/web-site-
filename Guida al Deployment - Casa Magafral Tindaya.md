# Guida al Deployment - Casa Magafral Tindaya

Questa guida fornisce istruzioni dettagliate per il deployment del sito web Casa Magafral Tindaya su Vercel e la configurazione di Supabase per un backend completo.

## 🚀 Deployment su Vercel

### Metodo 1: Deployment Automatico (Raccomandato)

#### Prerequisiti
- Account GitHub/GitLab con il codice del progetto
- Account Vercel (gratuito)

#### Passaggi

1. **Prepara il Repository**
   ```bash
   # Assicurati che tutti i file siano committati
   git add .
   git commit -m "Preparazione per deployment"
   git push origin main
   ```

2. **Connetti a Vercel**
   - Vai su [vercel.com](https://vercel.com) e accedi
   - Clicca "New Project"
   - Importa il repository da GitHub/GitLab
   - Vercel rileverà automaticamente che è un progetto Vite

3. **Configurazione Automatica**
   Vercel configurerà automaticamente:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Framework**: Vite

4. **Variabili d'Ambiente**
   Nel dashboard Vercel:
   - Vai su Settings > Environment Variables
   - Aggiungi le seguenti variabili:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_CONTACT_EMAIL=info@casamagafral.com
   VITE_CONTACT_PHONE=+34123456789
   VITE_WHATSAPP_NUMBER=34123456789
   VITE_SITE_URL=https://your-domain.vercel.app
   ```

5. **Deploy**
   - Clicca "Deploy"
   - Il sito sarà disponibile in pochi minuti
   - URL automatico: `https://casa-vacanze-canarie.vercel.app`

### Metodo 2: Deployment via CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (dalla directory del progetto)
vercel

# Per deployment di produzione
vercel --prod
```

### Configurazione Dominio Personalizzato

1. **Nel Dashboard Vercel**
   - Vai su Settings > Domains
   - Aggiungi il tuo dominio (es. `casamagafral.com`)

2. **Configurazione DNS**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.61
   ```

## 🗄️ Configurazione Supabase

### Setup Iniziale

1. **Crea Progetto Supabase**
   - Vai su [supabase.com](https://supabase.com)
   - Clicca "New Project"
   - Scegli organizzazione e nome progetto
   - Seleziona regione (Europa per performance migliori)
   - Imposta password database

2. **Ottieni Credenziali**
   - Vai su Settings > API
   - Copia `Project URL` e `anon public key`
   - Aggiorna le variabili d'ambiente su Vercel

### Schema Database

Esegui questi comandi nel SQL Editor di Supabase:

```sql
-- Abilita estensioni necessarie
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabella per le prenotazioni
CREATE TABLE public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL CHECK (guests > 0 AND guests <= 8),
    total_price DECIMAL(10,2),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per i messaggi di contatto
CREATE TABLE public.contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    check_in DATE,
    check_out DATE,
    guests INTEGER,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'received' CHECK (status IN ('received', 'replied', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per la disponibilità
CREATE TABLE public.availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    available BOOLEAN DEFAULT true,
    price DECIMAL(8,2) DEFAULT 264.28,
    min_nights INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per le recensioni (opzionale)
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    guest_name TEXT NOT NULL,
    guest_country TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    stay_date DATE,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indici per performance
CREATE INDEX idx_bookings_dates ON public.bookings(check_in, check_out);
CREATE INDEX idx_availability_date ON public.availability(date);
CREATE INDEX idx_contact_messages_created ON public.contact_messages(created_at);
CREATE INDEX idx_reviews_approved ON public.reviews(approved);

-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_availability_updated_at BEFORE UPDATE ON public.availability
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Configurazione RLS (Row Level Security)

```sql
-- Abilita RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policy per inserimento pubblico (form del sito)
CREATE POLICY "Allow public insert" ON public.bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- Policy per lettura pubblica della disponibilità
CREATE POLICY "Allow public read" ON public.availability
    FOR SELECT USING (true);

-- Policy per lettura pubblica delle recensioni approvate
CREATE POLICY "Allow public read approved reviews" ON public.reviews
    FOR SELECT USING (approved = true);
```

### Popolamento Dati Iniziali

```sql
-- Inserisci disponibilità per i prossimi 12 mesi
INSERT INTO public.availability (date, available, price)
SELECT 
    date_series,
    CASE 
        WHEN EXTRACT(month FROM date_series) IN (12, 1) THEN 315.00  -- Periodo natalizio
        ELSE 264.28  -- Prezzo standard
    END as price,
    true as available
FROM generate_series(
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '12 months',
    INTERVAL '1 day'
) AS date_series;

-- Inserisci alcune recensioni di esempio
INSERT INTO public.reviews (guest_name, guest_country, rating, title, content, stay_date, approved)
VALUES 
    ('Marco e Giulia', 'Italia', 5, 'Vacanza perfetta!', 'Casa Magafral ha superato tutte le nostre aspettative. La villa è ancora più bella delle foto, la piscina riscaldata è stata un vero lusso e la posizione è perfetta per esplorare Fuerteventura.', '2024-08-15', true),
    ('Hans e Ingrid', 'Germania', 5, 'Wunderbar!', 'Eine fantastische Villa in perfekter Lage! Wir haben unseren Aufenthalt sehr genossen. Das Haus ist modern und komfortabel, der Pool war jeden Tag ein Highlight.', '2024-03-20', true),
    ('Sophie et Pierre', 'Francia', 5, 'Magnifique séjour', 'Nous avons passé deux semaines merveilleuses à Casa Magafral. La maison est spacieuse, très bien équipée et la piscine chauffée était parfaite même en hiver.', '2024-01-10', true);
```

## 🔧 Aggiornamento Codice per Backend Reale

### 1. Aggiorna src/lib/supabase.js

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funzioni per le prenotazioni
export const bookingService = {
  async submitBookingRequest(bookingData) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select();
    
    return { data: data?.[0], error };
  },

  async checkAvailability(startDate, endDate) {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .eq('available', true);
    
    return { data, error };
  },

  async calculatePrice(startDate, endDate, guests) {
    const { data, error } = await supabase
      .from('availability')
      .select('price')
      .gte('date', startDate)
      .lt('date', endDate);
    
    if (error) return { data: null, error };
    
    const nights = data.length;
    const totalPrice = data.reduce((sum, day) => sum + parseFloat(day.price), 0);
    const cleaningFee = 150;
    
    return {
      data: {
        nights,
        subtotal: totalPrice,
        cleaning_fee: cleaningFee,
        total: totalPrice + cleaningFee,
        price_per_night: totalPrice / nights
      },
      error: null
    };
  }
};

// Funzioni per i contatti
export const contactService = {
  async submitContactMessage(messageData) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageData])
      .select();
    
    return { data: data?.[0], error };
  }
};
```

### 2. Aggiorna gli Hooks

Sostituisci `mockSupabase` con i servizi reali negli hooks `useBooking.js` e `useContact.js`.

## 📧 Configurazione Email (Opzionale)

### Integrazione con Resend

1. **Crea account Resend**
   - Vai su [resend.com](https://resend.com)
   - Ottieni API key

2. **Aggiungi variabile d'ambiente**
   ```
   RESEND_API_KEY=your-resend-api-key
   ```

3. **Crea API route per email**
   ```javascript
   // api/send-email.js
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export default async function handler(req, res) {
     if (req.method === 'POST') {
       const { name, email, message } = req.body;
       
       try {
         await resend.emails.send({
           from: 'noreply@casamagafral.com',
           to: 'info@casamagafral.com',
           subject: `Nuovo messaggio da ${name}`,
           html: `
             <h2>Nuovo messaggio dal sito web</h2>
             <p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Messaggio:</strong></p>
             <p>${message}</p>
           `
         });
         
         res.status(200).json({ success: true });
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     }
   }
   ```

## 📊 Analytics e Monitoraggio

### Google Analytics 4

1. **Crea proprietà GA4**
   - Vai su [analytics.google.com](https://analytics.google.com)
   - Crea nuova proprietà
   - Ottieni Measurement ID

2. **Aggiungi a Vercel**
   ```
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

3. **Implementa tracking**
   ```javascript
   // src/lib/analytics.js
   import { gtag } from 'ga-gtag';

   export const trackEvent = (action, category, label, value) => {
     gtag('event', action, {
       event_category: category,
       event_label: label,
       value: value
     });
   };

   // Esempi di utilizzo
   trackEvent('click', 'CTA', 'Prenota Ora');
   trackEvent('submit', 'Form', 'Contatto');
   ```

### Vercel Analytics

1. **Abilita nel dashboard Vercel**
   - Vai su Analytics tab
   - Abilita Web Analytics

2. **Aggiungi script**
   ```javascript
   // src/main.jsx
   import { inject } from '@vercel/analytics';
   
   inject();
   ```

## 🔒 Sicurezza e Performance

### Headers di Sicurezza

Il file `vercel.json` include già:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### Cache Optimization

```json
// vercel.json - sezione headers
{
  "source": "/assets/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```

### Performance Monitoring

1. **Lighthouse CI**
   ```yaml
   # .github/workflows/lighthouse.yml
   name: Lighthouse CI
   on: [push]
   jobs:
     lighthouse:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Audit URLs using Lighthouse CI
           uses: treosh/lighthouse-ci-action@v9
           with:
             urls: |
               https://your-domain.vercel.app
   ```

2. **Web Vitals**
   ```javascript
   // src/lib/vitals.js
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   function sendToAnalytics(metric) {
     gtag('event', metric.name, {
       value: Math.round(metric.value),
       event_category: 'Web Vitals',
       non_interaction: true,
     });
   }

   getCLS(sendToAnalytics);
   getFID(sendToAnalytics);
   getFCP(sendToAnalytics);
   getLCP(sendToAnalytics);
   getTTFB(sendToAnalytics);
   ```

## 🚨 Troubleshooting

### Problemi Comuni

**Build fallisce su Vercel**
```bash
# Verifica build locale
npm run build

# Controlla log Vercel per errori specifici
# Spesso causato da:
# - Variabili d'ambiente mancanti
# - Import path case-sensitive
# - Dipendenze mancanti
```

**Supabase connection error**
```javascript
// Verifica configurazione
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Testa connessione
const { data, error } = await supabase.from('availability').select('count');
console.log('Connection test:', { data, error });
```

**Immagini non si caricano**
```javascript
// Usa import per immagini statiche
import heroImage from '../assets/hero-image.jpg';

// O usa URL pubblici per immagini dinamiche
const imageUrl = 'https://images.unsplash.com/photo-...';
```

### Log e Debug

1. **Vercel Function Logs**
   ```bash
   vercel logs [deployment-url]
   ```

2. **Supabase Logs**
   - Dashboard > Logs
   - Filtra per errori e warning

3. **Browser DevTools**
   - Network tab per API calls
   - Console per errori JavaScript
   - Application tab per localStorage/cookies

## 📞 Supporto Post-Deployment

### Monitoraggio Continuo

1. **Uptime Monitoring**
   - Usa servizi come UptimeRobot
   - Configura alert per downtime

2. **Error Tracking**
   - Integra Sentry per error tracking
   - Monitora errori JavaScript e API

3. **Performance Monitoring**
   - Google PageSpeed Insights
   - Vercel Analytics
   - Core Web Vitals

### Backup e Sicurezza

1. **Database Backup**
   - Supabase fa backup automatici
   - Configura backup aggiuntivi se necessario

2. **Code Backup**
   - Repository Git sempre aggiornato
   - Tag per versioni stabili

3. **Monitoring Sicurezza**
   - Dependabot per vulnerabilità dipendenze
   - Audit regolari con `npm audit`

---

**Deployment completato con successo! 🎉**

Il tuo sito Casa Magafral Tindaya è ora live e pronto per accogliere i tuoi ospiti.

