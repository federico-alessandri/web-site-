# Casa Magafral Tindaya - Sito Web Casa Vacanze

Un sito web moderno e responsive per una casa vacanze di lusso alle Isole Canarie, sviluppato con React, Tailwind CSS e Supabase.

## 🏖️ Panoramica del Progetto

Casa Magafral Tindaya è un sito web elegante e funzionale progettato per promuovere e gestire le prenotazioni di una villa di lusso con piscina riscaldata situata nel tranquillo villaggio di Tindaya, Fuerteventura. Il sito è ottimizzato per la conversione e offre un'esperienza utente eccellente su tutti i dispositivi.

## ✨ Caratteristiche Principali

### Design e UX
- **Design Mobile-First**: Layout completamente responsivo ottimizzato per tutti i dispositivi
- **Palette Colori Elegante**: Bianco, sabbia, azzurro oceano e corallo per i CTA
- **Tipografia Professionale**: Montserrat per i titoli, Open Sans per i testi
- **Animazioni Fluide**: Transizioni e animazioni leggere con Framer Motion
- **Interfaccia Intuitiva**: Navigazione semplice e call-to-action ben posizionati

### Funzionalità
- **Hero Section Impattante**: Immagine a schermo intero con informazioni chiave
- **Galleria Fotografica**: Lightbox interattivo per visualizzare le immagini
- **Calcolatore Prezzi**: Sistema dinamico per calcolare i costi del soggiorno
- **Form di Contatto**: Modulo completo con validazione e feedback
- **Sistema Recensioni**: Slider con testimonianze autentiche degli ospiti
- **Widget WhatsApp**: Chat diretta per assistenza immediata
- **Multilingua**: Supporto per IT, EN, ES, DE (base implementata)

### Sezioni del Sito
1. **Homepage**: Hero, highlights, galleria introduttiva
2. **La Casa**: Dettagli della villa, servizi inclusi, galleria completa
3. **La Zona**: Attrazioni locali, consigli, mappa interattiva
4. **Prezzi & Disponibilità**: Tariffe stagionali, calendario, calcolatore
5. **Recensioni**: Testimonianze clienti con rating e statistiche
6. **Contatti**: Form di contatto, informazioni, FAQ

## 🛠️ Stack Tecnologico

### Frontend
- **React 18**: Framework JavaScript moderno
- **Vite**: Build tool veloce e ottimizzato
- **Tailwind CSS**: Framework CSS utility-first
- **Shadcn/UI**: Componenti UI eleganti e accessibili
- **Lucide React**: Icone moderne e scalabili
- **Framer Motion**: Animazioni fluide (pronto per l'implementazione)

### Backend (Mock)
- **Supabase**: Database e autenticazione (configurazione mock)
- **Custom Hooks**: Gestione stato e API calls
- **Form Validation**: Validazione lato client

### Deployment
- **Vercel**: Hosting ottimizzato per React
- **CDN**: Distribuzione globale delle risorse
- **SSL**: Certificato HTTPS automatico

## 🚀 Installazione e Setup

### Prerequisiti
- Node.js 18+ 
- npm o pnpm
- Git

### Installazione Locale

1. **Clona il repository**
```bash
git clone <repository-url>
cd casa-vacanze-canarie
```

2. **Installa le dipendenze**
```bash
npm install
# oppure
pnpm install
```

3. **Configura le variabili d'ambiente**
```bash
cp .env.example .env.local
```
Modifica il file `.env.local` con le tue configurazioni:
- URL e chiavi Supabase
- Informazioni di contatto
- ID Google Analytics (opzionale)

4. **Avvia il server di sviluppo**
```bash
npm run dev
# oppure
pnpm dev
```

Il sito sarà disponibile su `http://localhost:5173`

### Build per Produzione

```bash
npm run build
# oppure
pnpm build
```

I file ottimizzati saranno generati nella cartella `dist/`

## 📁 Struttura del Progetto

```
casa-vacanze-canarie/
├── public/                 # File statici
├── src/
│   ├── assets/            # Immagini e media
│   ├── components/
│   │   ├── layout/        # Header, Footer
│   │   ├── sections/      # Sezioni principali
│   │   └── ui/           # Componenti UI riutilizzabili
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilità e configurazioni
│   ├── App.jsx           # Componente principale
│   ├── App.css           # Stili globali
│   └── main.jsx          # Entry point
├── .env.example          # Template variabili d'ambiente
├── vercel.json           # Configurazione Vercel
├── package.json          # Dipendenze e scripts
└── README.md            # Documentazione
```

## 🎨 Personalizzazione

### Colori e Temi
I colori sono definiti in `src/App.css` utilizzando le variabili CSS di Tailwind:
- `--primary`: Azzurro oceano (#0ea5e9)
- `--secondary`: Sabbia (#fef3c7)
- `--accent`: Corallo (#f97316)
- `--background`: Bianco (#ffffff)

### Contenuti
Per modificare i contenuti del sito:
1. **Testi**: Modifica direttamente nei componenti in `src/components/sections/`
2. **Immagini**: Sostituisci i file in `src/assets/`
3. **Informazioni di contatto**: Aggiorna in `src/components/layout/Footer.jsx` e `src/components/sections/ContattiSection.jsx`

### Funzionalità Backend
Il progetto include un sistema mock per simulare le funzionalità backend. Per integrare un backend reale:
1. Configura un progetto Supabase
2. Aggiorna `src/lib/supabase.js` con le credenziali reali
3. Modifica gli hooks in `src/hooks/` per utilizzare le API reali

## 🚀 Deployment su Vercel

### Deployment Automatico

1. **Connetti il repository a Vercel**
   - Vai su [vercel.com](https://vercel.com)
   - Importa il progetto da GitHub/GitLab
   - Vercel rileverà automaticamente la configurazione Vite

2. **Configura le variabili d'ambiente**
   - Nel dashboard Vercel, vai su Settings > Environment Variables
   - Aggiungi tutte le variabili dal file `.env.example`

3. **Deploy**
   - Il deploy avviene automaticamente ad ogni push su main
   - URL di produzione disponibile immediatamente

### Deployment Manuale

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📱 Ottimizzazione Mobile

Il sito è progettato con approccio mobile-first:
- **Breakpoint**: 768px (tablet), 1024px (desktop)
- **Touch-friendly**: Bottoni e link ottimizzati per touch
- **Performance**: Immagini ottimizzate e lazy loading
- **Accessibilità**: Contrasti e dimensioni conformi alle linee guida

## 🔧 Configurazione Supabase (Opzionale)

Per implementare un backend completo:

1. **Crea un progetto Supabase**
   - Vai su [supabase.com](https://supabase.com)
   - Crea un nuovo progetto

2. **Configura il database**
   ```sql
   -- Tabella prenotazioni
   CREATE TABLE bookings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     guest_name TEXT NOT NULL,
     guest_email TEXT NOT NULL,
     guest_phone TEXT,
     check_in DATE NOT NULL,
     check_out DATE NOT NULL,
     guests INTEGER NOT NULL,
     total_price DECIMAL(10,2),
     status TEXT DEFAULT 'pending',
     special_requests TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Tabella messaggi di contatto
   CREATE TABLE contact_messages (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     message TEXT NOT NULL,
     status TEXT DEFAULT 'received',
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Tabella disponibilità
   CREATE TABLE availability (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     date DATE NOT NULL UNIQUE,
     available BOOLEAN DEFAULT true,
     price DECIMAL(8,2) DEFAULT 264.28,
     min_nights INTEGER DEFAULT 5
   );
   ```

3. **Aggiorna la configurazione**
   - Sostituisci le credenziali mock in `src/lib/supabase.js`
   - Rimuovi le funzioni mock e utilizza le API Supabase reali

## 📊 Analytics e Monitoraggio

### Google Analytics (Opzionale)
1. Crea una proprietà GA4
2. Aggiungi l'ID in `.env.local`
3. Il tracking è configurato automaticamente

### Metriche Consigliate
- **Conversioni**: Click sui CTA "Prenota Ora"
- **Engagement**: Tempo sulla pagina, scroll depth
- **Form**: Completamento form di contatto
- **Mobile**: Percentuale traffico mobile

## 🔒 Sicurezza

### Implementate
- **Headers di sicurezza**: Configurati in `vercel.json`
- **Validazione form**: Lato client con feedback
- **Sanitizzazione input**: Prevenzione XSS
- **HTTPS**: Automatico su Vercel

### Raccomandazioni
- Implementa rate limiting per i form
- Aggiungi CAPTCHA per prevenire spam
- Monitora i log per attività sospette

## 🐛 Troubleshooting

### Problemi Comuni

**Build fallisce**
```bash
# Pulisci cache e reinstalla
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Immagini non si caricano**
- Verifica che le immagini siano in `src/assets/`
- Controlla i path di import nei componenti

**Stili non applicati**
- Verifica che `import './App.css'` sia presente in `App.jsx`
- Controlla la configurazione Tailwind

**Errori Supabase**
- Verifica le credenziali in `.env.local`
- Controlla la configurazione RLS (Row Level Security)

## 🤝 Contributi

Per contribuire al progetto:
1. Fork del repository
2. Crea un branch per la feature (`git checkout -b feature/nuova-funzionalita`)
3. Commit delle modifiche (`git commit -m 'Aggiunge nuova funzionalità'`)
4. Push del branch (`git push origin feature/nuova-funzionalita`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 📞 Supporto

Per supporto tecnico o domande:
- **Email**: info@casamagafral.com
- **WhatsApp**: +34 123 456 789
- **Issues**: Apri un issue su GitHub

---

**Sviluppato con ❤️ per Casa Magafral Tindaya**

