# Allgemeine Beschreibung

!!! info "Info"
    **Die Dokumentation entspricht dem Versionsstand NestCut 1.5**

Das Programm dient der Erstellung von NC-Daten für die Aufteilung sowie
dem Anbringen von Fasen auf PKD-Ronden mittels Lasermaschinen. Als
Grundlage für die Erstellung der NC-Daten werden DXF-Geometrie-Dateien
verwendet, in welchen die Geometriedaten der aufzuteilenden Ronden mit
den auszuschneidenden Teilen enthalten sind. Die auszuschneidenden Teile
müssen hierbei um den Laserspotradius größer gezeichnet sein als die
benötigten Teile, so dass die Umrisskontur die Lasermittelpunktsbahn
beim Ausschneiden der Teile darstellt. Die Kanten von direkt aneinander
liegenden Teilen liegen somit direkt übereinander. Die Anordnung der
Teile auf der Ronde kann entweder manuell in einem geeigneten
CAD-Programm oder mit einem geeigneten Schachtelprogramm automatisch
erfolgen.

Das Programm unterstützt folgende Arbeitsschritte:

-   Einlesen der DXF-Dateien

-   Optimieren von Konturzügen zur schnelleren Bearbeitung

-   Automatisches Generieren der Verfahrwege zum Auftrennen von Ronden
    und zum Anbringen von Fasen auf der Rondenrückseite

-   Verwalten der Lasertechnologien

-   Verwaltung mehrerer Spannpositionen

