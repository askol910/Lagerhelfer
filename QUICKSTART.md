# Quick Start Guide

Schnellanleitung für die Lagerhelfer PWA.

## 🚀 In 5 Minuten starten

### 1. Repository klonen

```bash
git clone https://github.com/askol910/Lagerhelfer.git
cd Lagerhelfer/frontend
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Firebase-Projekt erstellen

Folgen Sie der Anleitung in [FIREBASE_SETUP.md](FIREBASE_SETUP.md) oder:

**Kurzversion:**
1. [Firebase Console](https://console.firebase.google.com/) öffnen
2. Neues Projekt erstellen
3. Web-App hinzufügen
4. Email/Password Auth aktivieren
5. Firestore Database erstellen (Testmodus)

### 4. Firebase-Konfiguration eintragen

**Empfohlene Methode: Environment Variables**

1. Kopieren Sie die Beispiel-Datei:
   ```bash
   cp .env.example .env
   ```

2. Öffnen Sie `.env` und ersetzen Sie die Platzhalter mit Ihren Firebase-Credentials

**Alternative: Direkt in config.js** (nur für Tests, nicht für Produktion empfohlen)

Öffnen Sie `frontend/src/firebase/config.js` und ersetzen Sie die Platzhalter.

### 5. App starten

```bash
npm start
```

Die App läuft auf [http://localhost:3000](http://localhost:3000)

## 📱 Erste Schritte in der App

1. **Registrieren**: Erstellen Sie einen Test-Account
2. **Lieferant wählen**: Klicken Sie auf einen der 4 Lieferanten
3. **Ersatzteil erfassen**: 
   - Manuelle Eingabe: Füllen Sie das Formular aus
   - Barcode: Klicken Sie auf 📷 (nur über HTTPS oder localhost)
4. **Excel exportieren**: Klicken Sie auf "Excel exportieren"

## 🔧 Entwicklung

### Verfügbare Commands

```bash
npm start          # Development Server
npm run build      # Production Build
npm test           # Tests ausführen
```

### Projekt-Struktur

```
frontend/
├── public/          # Statische Dateien (HTML, Icons, Manifest)
├── src/
│   ├── components/  # React-Komponenten
│   ├── firebase/    # Firebase-Konfiguration
│   ├── App.jsx      # Haupt-App-Komponente
│   └── index.js     # Entry Point
└── package.json     # Dependencies
```

### Hot Reload

Änderungen werden automatisch im Browser aktualisiert während `npm start` läuft.

## 📝 Testing

### Barcode-Scanner auf Mobile testen

1. Starten Sie die App: `npm start`
2. Finden Sie Ihre lokale IP: `ipconfig` (Windows) oder `ifconfig` (Mac/Linux)
3. Öffnen Sie auf Ihrem Phone: `http://YOUR_IP:3000`
4. **Wichtig**: Scanner benötigt HTTPS für Mobile-Geräte

### Lösung: ngrok verwenden

```bash
# ngrok installieren (https://ngrok.com/)
npm start
# In neuem Terminal:
ngrok http 3000
# Nutzen Sie die HTTPS-URL von ngrok
```

## 🏗️ Production Build

### Lokal testen

```bash
npm run build
npm install -g serve
serve -s build
```

### Deployment-Optionen

**Firebase Hosting** (empfohlen):
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

**Netlify** (einfachste Option):
1. Repository auf GitHub pushen
2. [Netlify](https://netlify.com) mit GitHub verbinden
3. Build Command: `npm run build`
4. Publish Directory: `build`

**Vercel**:
```bash
npm install -g vercel
npm run build
vercel --prod
```

## ⚠️ Troubleshooting

### "Module not found" Fehler
```bash
rm -rf node_modules package-lock.json
npm install
```

### Firebase-Fehler
- Überprüfen Sie `firebase/config.js`
- Stellen Sie sicher, dass Email/Password Auth aktiviert ist
- Checken Sie Firestore Database Status

### Kamera funktioniert nicht
- Nur HTTPS oder localhost
- Browser-Berechtigungen prüfen
- Anderen Browser testen (Chrome empfohlen)

### Port 3000 bereits in Verwendung
```bash
PORT=3001 npm start
```

## 📚 Weitere Dokumentation

- [README.md](README.md) - Vollständige Dokumentation
- [FEATURES.md](FEATURES.md) - Alle Features im Detail
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase-Einrichtung
- [SECURITY.md](SECURITY.md) - Sicherheitshinweise

## 💡 Tipps

1. **Browser DevTools**: F12 für Console und Network Tab
2. **React DevTools**: Chrome Extension für React-Debugging
3. **Firebase Console**: Überprüfen Sie Auth und Firestore in Echtzeit
4. **Lighthouse**: Audit in Chrome für PWA-Score

## 🤝 Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature-Branch
3. Committen Sie Ihre Änderungen
4. Pushen Sie zum Branch
5. Öffnen Sie einen Pull Request

## 📞 Hilfe

Bei Problemen:
- Überprüfen Sie die Console im Browser (F12)
- Lesen Sie die [Troubleshooting](#troubleshooting) Sektion
- Öffnen Sie ein Issue auf GitHub
- Konsultieren Sie [Firebase Docs](https://firebase.google.com/docs)
