# Firebase Setup Guide

Diese Anleitung führt Sie durch die Einrichtung von Firebase für die Lagerhelfer PWA.

## Schritt 1: Firebase-Projekt erstellen

1. Besuchen Sie [Firebase Console](https://console.firebase.google.com/)
2. Klicken Sie auf "Projekt hinzufügen" (Add project)
3. Geben Sie einen Projektnamen ein (z.B. "Lagerhelfer")
4. Folgen Sie den Anweisungen (Google Analytics ist optional)

## Schritt 2: Web-App registrieren

1. Klicken Sie im Projekt-Dashboard auf das Web-Symbol (`</>`)
2. Geben Sie einen App-Spitznamen ein (z.B. "Lagerhelfer PWA")
3. Firebase Hosting ist optional (nicht erforderlich)
4. Klicken Sie auf "App registrieren"

## Schritt 3: Firebase-Konfiguration kopieren

Nach der Registrierung sehen Sie die Firebase-Konfiguration:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "ihr-projekt.firebaseapp.com",
  projectId: "ihr-projekt",
  storageBucket: "ihr-projekt.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

Kopieren Sie diese Werte und ersetzen Sie die Platzhalter in `frontend/src/firebase/config.js`.

## Schritt 4: Authentication aktivieren

1. Gehen Sie in der linken Navigation zu "Build" → "Authentication"
2. Klicken Sie auf "Get started"
3. Wählen Sie "Email/Password" unter "Native providers"
4. Aktivieren Sie "Email/Password" (lassen Sie "Email link" deaktiviert)
5. Klicken Sie auf "Save"

## Schritt 5: Firestore Database erstellen

1. Gehen Sie in der linken Navigation zu "Build" → "Firestore Database"
2. Klicken Sie auf "Create database"
3. Wählen Sie einen Standort (z.B. "eur3 (europe-west)")
4. Wählen Sie "Start in test mode" für Entwicklung
5. Klicken Sie auf "Enable"

### Wichtig: Firestore Security Rules für Produktion

Im Testmodus kann jeder auf Ihre Datenbank zugreifen! Für die Produktion sollten Sie die Sicherheitsregeln anpassen:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Nur authentifizierte Benutzer können lesen/schreiben
    match /inventory/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Benutzer können nur ihre eigenen Daten lesen/schreiben
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Schritt 6: Konfiguration testen

1. Starten Sie die App: `npm start`
2. Registrieren Sie einen Test-Benutzer
3. Überprüfen Sie in der Firebase Console unter "Authentication" → "Users", ob der Benutzer erstellt wurde

## Optionale Schritte

### Firestore-Datenstruktur (für zukünftige Entwicklung)

Falls Sie die Inventurdaten in Firestore speichern möchten, könnte die Struktur so aussehen:

```
/inventory
  /{inventoryId}
    - userId: string
    - supplierName: string
    - items: array
      - partNumber: string
      - description: string
      - quantity: number
      - timestamp: timestamp
    - createdAt: timestamp
    - updatedAt: timestamp
```

### Firebase Hosting (optional)

Wenn Sie Firebase Hosting nutzen möchten:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Fehlerbehebung

### "Firebase: Error (auth/invalid-api-key)"
- Überprüfen Sie, ob der `apiKey` korrekt kopiert wurde
- Stellen Sie sicher, dass keine Leerzeichen am Anfang/Ende sind

### "Firebase: Error (auth/operation-not-allowed)"
- Email/Password Authentication muss in der Firebase Console aktiviert sein

### "Missing or insufficient permissions"
- Überprüfen Sie die Firestore Security Rules
- Im Testmodus sollten alle Operationen erlaubt sein

## Sicherheitshinweise

1. **Niemals** Firebase-Konfiguration in einem öffentlichen Repository veröffentlichen, wenn Sie die App in Produktion nutzen
2. Verwenden Sie `.env` Dateien für sensible Daten
3. Aktivieren Sie App Check für zusätzliche Sicherheit
4. Setzen Sie strikte Firestore Security Rules für Produktion
5. Aktivieren Sie Firebase Authentication Security Features (z.B. Email-Verifizierung)

## Support

Bei Problemen:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)
