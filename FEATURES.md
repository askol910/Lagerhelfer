# Lagerhelfer PWA - Features & Nutzung

## Übersicht

Die Lagerhelfer PWA ist eine moderne Webanwendung zur Unterstützung der Inventurdurchführung mit folgenden Hauptfunktionen:

## ✨ Hauptfunktionen

### 1. Authentifizierung 🔐

#### Login
- Anmeldung mit E-Mail und Passwort
- Automatische Session-Verwaltung
- Fehlerbehandlung mit verständlichen deutschen Fehlermeldungen

#### Registrierung
- Neues Benutzerkonto erstellen
- Passwortvalidierung (mindestens 6 Zeichen)
- Namensfeld für Personalisierung

### 2. Dashboard 📊

Nach dem Login gelangen Sie zum Dashboard mit:
- Benutzerinfo in der Kopfzeile
- Abmelden-Button
- Lieferanten-Auswahlbereich

### 3. Lieferanten-Auswahl 🏢

- Übersichtliche Karten-Darstellung
- Vier vorkonfigurierte Lieferanten (L1-L4)
- Einfache Erweiterung um weitere Lieferanten möglich
- Responsive Grid-Layout

### 4. Inventur-Erfassung 📝

#### Barcode-Scanner 📷
- **Kamera-basierter Scanner**: Nutzt die Gerätekamera zum Scannen von Barcodes
- **Unterstützte Formate**: QR-Codes, EAN, Code 128, und weitere
- **Echtzeit-Erkennung**: Automatische Dekodierung beim Scannen
- **Kamera-Berechtigungen**: Fordert Zugriff auf die Kamera an
- **Visuelle Hilfe**: Markierter Scanbereich für präzises Ausrichten

#### Manuelle Eingabe ⌨️
- Alternative zur Barcode-Erfassung
- Eingabe von Ersatzteilnummer
- Eingabe von Bezeichnung
- Optional: Bestand erfassen

#### Auto-Fill-Funktion
- Nach dem Scannen wird die Ersatzteilnummer automatisch eingetragen
- Bezeichnung wird automatisch vorausgefüllt (kann angepasst werden)

### 5. Inventar-Tabelle 📋

#### Übersicht
- Alle erfassten Ersatzteile in tabellarischer Form
- Nummerierung der Einträge
- Zeitstempel für jede Erfassung
- Bestandsanzeige

#### Funktionen
- **Löschen**: Einzelne Einträge entfernen
- **Sortierung**: Nach Erfassungszeitpunkt
- **Responsive Design**: Optimiert für Mobile und Desktop

### 6. Excel-Export 📊

- **Ein-Klick-Export**: Alle erfassten Daten als Excel-Datei
- **Dateiformat**: .xlsx (Microsoft Excel)
- **Automatische Benennung**: `Inventur_[Lieferant]_[Datum].xlsx`
- **Enthaltene Daten**:
  - Laufende Nummer
  - Ersatzteilnummer
  - Bezeichnung
  - Bestand
  - Lieferant
  - Zeitstempel (deutsche Formatierung)
- **Spaltenbreiten**: Automatisch angepasst für bessere Lesbarkeit

### 7. PWA-Funktionen 📱

#### Installierbarkeit
- **Zum Homescreen hinzufügen**: 
  - iOS: Safari → Teilen → Zum Home-Bildschirm
  - Android: Chrome → Menü → Zum Startbildschirm hinzufügen
- **App-ähnliches Erlebnis**: Vollbild-Modus ohne Browser-UI
- **App-Icon**: Erscheint wie eine native App auf dem Gerät

#### Offline-Unterstützung
- **Service Worker**: Cached wichtige Ressourcen
- **Offline-Zugriff**: Grundfunktionen auch ohne Internet nutzbar
- **Cache-Strategie**: Network-first mit Fallback auf Cache

#### PWA-Optimierungen
- **Schnelle Ladezeiten**: Durch Caching und Optimierungen
- **App-Manifest**: Definiert Aussehen und Verhalten der PWA
- **Theme-Color**: Einheitliches Design (#2196f3 - Blau)

## 🎨 Benutzeroberfläche

### Design-Prinzipien
- **Material Design**: Moderne, intuitive Benutzeroberfläche
- **Responsive Layout**: Automatische Anpassung an Bildschirmgröße
- **Touch-optimiert**: Große Buttons für mobile Nutzung
- **Farbschema**: Professionelles Blau (#2196f3) als Hauptfarbe

### Responsive Breakpoints
- **Desktop**: Volle Funktionalität, Grid-Layouts
- **Tablet**: Angepasste Spalten und Abstände
- **Mobile**: Single-Column-Layout, optimierte Buttons

## 🔒 Sicherheit

### Implementierte Sicherheitsmaßnahmen
- **Firebase Authentication**: Sichere Benutzerverwaltung
- **HTTPS-Anforderung**: Scanner funktioniert nur über HTTPS (außer localhost)
- **Input-Validierung**: Client-seitige Überprüfung aller Eingaben
- **Session-Management**: Automatische Abmeldung bei Inaktivität

### Empfohlene Produktions-Einstellungen
- Firestore Security Rules aktivieren
- Email-Verifizierung aktivieren
- App Check für zusätzlichen Schutz
- Environment Variables für sensible Daten

## 📱 Browser-Kompatibilität

### Vollständig unterstützt
- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Safari 14+ (Desktop & iOS)
- ✅ Edge 90+
- ✅ Firefox 88+

### Eingeschränkte Unterstützung
- ⚠️ Ältere Browser: Barcode-Scanner benötigt moderne Browser

## 🚀 Nutzung

### Typischer Workflow

1. **Anmelden/Registrieren**
   - Öffnen Sie die App
   - Melden Sie sich an oder registrieren Sie sich

2. **Lieferant auswählen**
   - Wählen Sie den Lieferanten für die Inventur
   - Klicken Sie auf die entsprechende Karte

3. **Ersatzteile erfassen**
   - **Option A - Scannen**:
     - Klicken Sie auf das Kamera-Symbol 📷
     - Erlauben Sie Kamera-Zugriff
     - Klicken Sie "Scanner starten"
     - Richten Sie den Barcode im Rahmen aus
     - Scanergebnis wird automatisch eingetragen
   - **Option B - Manuelle Eingabe**:
     - Geben Sie Ersatzteilnummer ein
     - Geben Sie Bezeichnung ein
     - Optional: Bestand eingeben
   - Klicken Sie "Hinzufügen"

4. **Inventur verwalten**
   - Sehen Sie alle erfassten Teile in der Tabelle
   - Löschen Sie fehlerhafte Einträge
   - Überprüfen Sie die Vollständigkeit

5. **Exportieren**
   - Klicken Sie "Excel exportieren"
   - Excel-Datei wird heruntergeladen
   - Datei kann in Excel/LibreOffice geöffnet werden

6. **Zurück oder Abmelden**
   - "Zurück" → Neuen Lieferanten wählen
   - "Abmelden" → Session beenden

## 🔧 Konfiguration

### Lieferanten anpassen

In `frontend/src/components/SupplierSelection.jsx`:

```javascript
const suppliers = [
  { id: 'lieferant1', name: 'Ihr Lieferant 1', code: 'L1' },
  { id: 'lieferant2', name: 'Ihr Lieferant 2', code: 'L2' },
  // Weitere Lieferanten hinzufügen
];
```

### Theme-Farben ändern

In `frontend/public/manifest.json`:

```json
{
  "theme_color": "#2196f3",  // Hauptfarbe ändern
  "background_color": "#ffffff"
}
```

### Auto-Fill-Logik anpassen

In `frontend/src/components/InventoryForm.jsx`:

```javascript
const handleScan = (scannedCode) => {
  setPartNumber(scannedCode);
  // Hier können Sie Ihre eigene Logik implementieren
  // z.B. Datenbank-Abfrage für Bezeichnung
  setDescription(`Ersatzteil ${scannedCode}`);
};
```

## 🐛 Bekannte Einschränkungen

1. **Barcode-Scanner**: Funktioniert nur über HTTPS oder localhost
2. **iOS Kamera**: Benötigt explizite Berechtigung bei jedem Start
3. **Offline-Modus**: Excel-Export benötigt die xlsx-Bibliothek (gecached)
4. **Firestore**: Aktuell nur lokale Datenhaltung, keine Cloud-Synchronisation

## 🔮 Zukünftige Erweiterungen

- [ ] Cloud-Synchronisation der Inventurdaten
- [ ] Mehrere Inventuren gleichzeitig verwalten
- [ ] Erweiterte Suchfunktion
- [ ] Foto-Upload für Ersatzteile
- [ ] Bulk-Import von Ersatzteilen
- [ ] Inventur-Historie und Berichte
- [ ] Multi-Sprachen-Unterstützung
- [ ] Dark Mode

## 📞 Support

Bei Fragen oder Problemen:
- Öffnen Sie ein Issue auf GitHub
- Konsultieren Sie die [Firebase Documentation](https://firebase.google.com/docs)
- Überprüfen Sie die Browser-Konsole für Fehler
