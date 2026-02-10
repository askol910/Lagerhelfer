# Lagerhelfer - Progressive Web App (PWA)

Eine Progressive Web App für die Inventurdurchführung mit Barcode-Scanner und Excel-Export.

## Features

- 🔐 **Authentifizierung**: Login/Register mit Firebase Auth
- 📦 **Lieferanten-Verwaltung**: Auswahl verschiedener Lieferanten für die Inventur
- 📷 **Barcode-Scanner**: Kamera-basierter Scanner für Ersatzteilnummern
- ⌨️ **Manuelle Eingabe**: Alternative zur Barcode-Erfassung
- 📊 **Excel-Export**: Inventurdaten als Excel-Datei exportieren
- 📱 **PWA-Funktionalität**: 
  - Im Browser lauffähig
  - Zum Home-Bildschirm hinzufügbar
  - Offline-Unterstützung
- 🌐 **Responsive Design**: Optimiert für Mobile und Desktop

## Tech Stack

- **Frontend**: React 18
- **Backend**: Firebase (Authentication, Firestore)
- **Scanner**: html5-qrcode für Barcode-Scanning
- **Export**: xlsx für Excel-Generierung
- **PWA**: Service Worker für Offline-Funktionalität

## Projekt-Struktur

```
Lagerhelfer/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── service-worker.js
│   │   └── icons/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SupplierSelection.jsx
│   │   │   ├── InventoryForm.jsx
│   │   │   ├── BarcodeScanner.jsx
│   │   │   └── InventoryTable.jsx
│   │   ├── firebase/
│   │   │   └── config.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Installation

### 1. Repository klonen

```bash
git clone https://github.com/askol910/Lagerhelfer.git
cd Lagerhelfer/frontend
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Firebase-Projekt einrichten

1. Gehen Sie zu [Firebase Console](https://console.firebase.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie ein bestehendes aus
3. Aktivieren Sie **Authentication** → **Email/Password**
4. Erstellen Sie eine **Firestore Database** (Testmodus für Entwicklung)
5. Gehen Sie zu **Project Settings** (⚙️) → **General**
6. Scrollen Sie zu "Your apps" und klicken Sie auf das Web-Symbol (`</>`)
7. Registrieren Sie Ihre App und kopieren Sie die Firebase-Konfiguration

### 4. Firebase-Konfiguration eintragen

**Option A: Direkt in der config.js (nur für Entwicklung)**

Öffnen Sie `frontend/src/firebase/config.js` und ersetzen Sie die Platzhalter mit Ihren Firebase-Credentials.

**Option B: Mit Environment Variables (empfohlen für Produktion)**

1. Kopieren Sie `.env.example` zu `.env`:
   ```bash
   cp .env.example .env
   ```

2. Öffnen Sie `.env` und tragen Sie Ihre Firebase-Credentials ein:
   ```bash
   REACT_APP_FIREBASE_API_KEY=AIza...
   REACT_APP_FIREBASE_AUTH_DOMAIN=ihr-projekt.firebaseapp.com
   # etc.
   ```

3. Die `.env` Datei wird **nicht** in Git committed (bereits in .gitignore)

### 5. App starten

```bash
npm start
```

Die App läuft nun auf [http://localhost:3000](http://localhost:3000)

### 6. Production Build erstellen

```bash
npm run build
```

Der optimierte Build befindet sich im `build/` Ordner.

## Firebase Security Rules (Optional)

Für die Produktion sollten Sie Firestore Security Rules konfigurieren:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Nur authentifizierte Benutzer können lesen/schreiben
    match /inventory/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Deployment

### Option 1: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Option 2: Netlify

1. Erstellen Sie ein Konto auf [Netlify](https://www.netlify.com/)
2. Verbinden Sie Ihr GitHub-Repository
3. Build-Einstellungen:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

### Option 3: Vercel

```bash
npm install -g vercel
vercel
```

## PWA Icons generieren

Die App enthält Platzhalter-Icons. Für eine produktive App sollten Sie eigene Icons erstellen:

1. Erstellen Sie ein 512x512 PNG-Icon
2. Verwenden Sie einen [PWA Icon Generator](https://www.pwabuilder.com/imageGenerator)
3. Ersetzen Sie die Icons im `public/icons/` Ordner

## Entwicklung

### Verfügbare Scripts

- `npm start` - Entwicklungsserver starten
- `npm run build` - Production Build erstellen
- `npm test` - Tests ausführen
- `npm run eject` - React-Konfiguration entfernen (nicht rückgängig machbar!)

### Barcode-Scanner testen

Der Barcode-Scanner benötigt HTTPS oder localhost. In der Entwicklung funktioniert er auf `localhost:3000`.

Für Tests auf einem mobilen Gerät im gleichen Netzwerk:
1. Finden Sie Ihre lokale IP-Adresse
2. Öffnen Sie `https://YOUR_IP:3000` auf dem mobilen Gerät
3. Akzeptieren Sie das selbst-signierte Zertifikat

## Troubleshooting

### Kamera-Zugriff funktioniert nicht
- Stellen Sie sicher, dass die App über HTTPS läuft (außer localhost)
- Überprüfen Sie Browser-Berechtigungen für Kamera-Zugriff
- Testen Sie in einem anderen Browser (Chrome/Safari empfohlen)

### Firebase-Fehler
- Überprüfen Sie die Firebase-Konfiguration in `config.js`
- Stellen Sie sicher, dass Email/Password Auth aktiviert ist
- Überprüfen Sie die Firestore Database-Regeln

### PWA wird nicht installiert
- Stellen Sie sicher, dass die App über HTTPS läuft
- Überprüfen Sie `manifest.json` und Service Worker
- Chrome DevTools → Application → Manifest prüfen

## Lizenz

MIT License

## Kontakt

Bei Fragen oder Problemen öffnen Sie bitte ein Issue im GitHub-Repository.
