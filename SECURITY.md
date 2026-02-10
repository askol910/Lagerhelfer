# Security Considerations

## Dependency Vulnerabilities

### Current Status

Nach dem Audit wurden folgende Schwachstellen identifiziert:

#### Development Dependencies
- **react-scripts**: Enthält veraltete Abhängigkeiten (svgo, postcss)
- **Status**: Betrifft nur Entwicklungsumgebung, nicht die Production-Build
- **Risiko**: Niedrig für Production-Deployment

#### Production Dependencies
- **ExcelJS**: Modern, secure Excel library
- **Status**: Actively maintained, no known vulnerabilities
- **Replaced**: xlsx (which had ReDoS and Prototype Pollution vulnerabilities)
- **Risiko**: Low - secure alternative chosen

### Empfohlene Maßnahmen

1. **Regelmäßige Updates**: Dependencies regelmäßig aktualisieren
2. **Alternative Bibliotheken**: In Zukunft modernere Alternativen zu xlsx evaluieren
3. **CSP Headers**: Content Security Policy implementieren
4. **HTTPS**: Immer über HTTPS bereitstellen

## Firebase Security

### Implementierte Sicherheit

1. **Authentication**: Firebase Authentication für Benutzerverwaltung
2. **Client-seitige Validierung**: Alle Eingaben werden validiert
3. **HTTPS-Anforderung**: Scanner funktioniert nur über HTTPS

### Produktions-Sicherheit

Für die Produktion **MÜSSEN** folgende Schritte durchgeführt werden:

#### 1. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Nur authentifizierte Benutzer
    match /inventory/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Benutzer-spezifische Daten
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### 2. Environment Variables

**WICHTIG**: Niemals Firebase-Credentials in Git committen!

Erstellen Sie `.env` Datei:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Und aktualisieren Sie `firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

#### 3. App Check aktivieren

Schützt Ihre Firebase-Ressourcen vor Missbrauch:

```bash
firebase apps:create web --app-check
```

#### 4. Email-Verifizierung

In Firebase Console → Authentication → Settings:
- "Email enumeration protection" aktivieren
- "Email verification" für neue Benutzer erzwingen

#### 5. Rate Limiting

Firebase automatisches Rate Limiting ist aktiviert, aber überwachen Sie:
- Authentication → "Quota" Tab
- Firestore → "Usage" Tab

## Client-Seitige Sicherheit

### Input Validierung

Alle Benutzereingaben werden validiert:
- Email-Format prüfen
- Passwort-Mindestlänge (6 Zeichen)
- Sanitizing von Ersatzteilnummern und Beschreibungen

### XSS-Schutz

React bietet automatischen XSS-Schutz:
- Alle Outputs werden escaped
- Keine Verwendung von `dangerouslySetInnerHTML`

### CSRF-Schutz

Firebase Authentication verwendet:
- Token-basierte Authentifizierung
- Automatischer CSRF-Schutz

## Barcode-Scanner Sicherheit

### Kamera-Berechtigung

- Explizite Benutzer-Erlaubnis erforderlich
- Nur über HTTPS oder localhost
- Kamera-Zugriff nur während aktivem Scan

### Verarbeitung von Scan-Daten

- Keine automatische Ausführung von Code
- Validierung aller gescannten Daten
- Keine externe API-Aufrufe ohne Validierung

## Deployment-Sicherheit

### HTTPS

**ZWINGEND ERFORDERLICH**:
- Barcode-Scanner funktioniert nur über HTTPS
- Service Worker benötigt HTTPS
- Firebase Authentication benötigt HTTPS

### Security Headers

Empfohlene HTTP-Header (z.B. in `netlify.toml` oder `.htaccess`):

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com; font-src 'self' data:
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(self)
```

## Daten-Schutz (DSGVO)

### Gespeicherte Daten

Aktuell werden folgende Daten gespeichert:
- Email-Adresse (Firebase Auth)
- Name (Firebase Auth)
- Inventur-Daten (lokal im Browser)

### Empfehlungen

1. **Datenschutzerklärung** erstellen
2. **Cookie-Banner** implementieren (falls Tracking verwendet wird)
3. **Datenexport-Funktion** für Benutzer
4. **Löschfunktion** für Benutzerdaten

## Incident Response

Bei Sicherheitsvorfällen:

1. Firebase-Projekt in der Console sperren
2. Betroffene Benutzer informieren
3. Logs überprüfen (Firebase Console → Analytics)
4. Credentials rotieren
5. Security Audit durchführen

## Security Checklist für Produktion

- [ ] Firestore Security Rules implementiert
- [ ] Firebase Credentials in Environment Variables
- [ ] `.env` in `.gitignore` eingetragen
- [ ] HTTPS für Deployment konfiguriert
- [ ] Security Headers gesetzt
- [ ] Email-Verifizierung aktiviert
- [ ] App Check aktiviert
- [ ] Rate Limiting überwacht
- [ ] Datenschutzerklärung erstellt
- [ ] Regelmäßige Dependency-Updates geplant

## Reporting von Sicherheitslücken

Falls Sie eine Sicherheitslücke finden:
1. **NICHT** öffentlich in Issues posten
2. Kontakt per Email an den Repository-Owner
3. Details und Reproduktionsschritte bereitstellen
4. 90 Tage für Response/Fix einplanen

## Updates

Letzte Überprüfung: 2026-02-10
Nächste Überprüfung: 2026-05-10 (alle 3 Monate)
