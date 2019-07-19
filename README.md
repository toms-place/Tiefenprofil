# Tool zum Errechnen der Dichte von Wasser und Erstellung des Tiefenprofiles

## Verwendung

1. CSV Datei einlesen (Import)
    - folgende spalten müssen in der CSV Datei enthalten sein:
    - p[kPa], T[°C], C[mg/l], Tiefe[m]

2. gegebenfalls Felder löschen oder hinzufügen
3. CSV Datei herunterladen (Export)
    - folgende Informationen erhalten Sie dann:
    - Druck (p[kPa]), Temperatur (°C), Salinität (C[mg/l]), Dichte (ρf[kg/m³]), Tiefe (m)

## Entwicklung

Die tiefenprofil-dichterechner.html Datei enthält das komprimierte Javascript um alle Berechnungen durchzuführen. Um dieses package zu erstellen wird eine bundle Software benötigt. Für diese gibt es wieder spezielle Voraussetzungen.

### Voraussetzungen

- NodeJs: (<https://nodejs.org/en/>)

### Installation und Bundeling

1. Nach der Installation von NodeJs mit der Konsole in den Ordner navigieren
2. Folgenden Befehl eingeben um dependencies zu installieren:
    - npm install
3. Anschließend kann mit folgendem Befehl das Package gebundelt werden:
    - npx webpack
        - Dieser Behefel muss nach jeder Änderung des scr Ordners ausgeführt werden, um Änderungen zu sehen.
4. Danach befindet sich das neue Javascript im dist Ordner und kann in das tiefenprofil-dichterechner.html eingefügt werden.
