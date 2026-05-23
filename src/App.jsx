import { useState } from "react"
import "./App.css"

const kategorien = [
  {
    id: 1,
    name: "ETF & Indexfonds",
    beschreibung: "Der einfachste Einstieg ins Investieren",
    icon: "📈",
    farbe: "#00ff88",
    minLevel: 1,
    lektionenAnzahl: 8
  },
  {
    id: 2,
    name: "Aktien",
    beschreibung: "Einzelne Unternehmen analysieren und investieren",
    icon: "📊",
    farbe: "#4f9eff",
    minLevel: 5,
    lektionenAnzahl: 10
  },
  {
    id: 3,
    name: "Krypto",
    beschreibung: "Bitcoin, Ethereum und digitale Assets verstehen",
    icon: "₿",
    farbe: "#f7931a",
    minLevel: 10,
    lektionenAnzahl: 8
  },
  {
    id: 4,
    name: "Hebel & Optionen",
    beschreibung: "Fortgeschrittene Strategien für erfahrene Anleger",
    icon: "⚡",
    farbe: "#ff4444",
    minLevel: 15,
    lektionenAnzahl: 12
  }
]

const hauptkategorien = [
  { id: "lernen", name: "Lernen", icon: "📚", beschreibung: "Lernpfade & Quize", farbe: "#00ff88", verfuegbar: true },
  { id: "news", name: "News", icon: "📰", beschreibung: "Aktuelle Finanz-News", farbe: "#4f9eff", verfuegbar: false },
  { id: "rechner", name: "Rechner", icon: "🧮", beschreibung: "Zinseszins & Sparplan", farbe: "#f7931a", verfuegbar: false },
  { id: "challenges", name: "Challenges", icon: "🎯", beschreibung: "Wöchentliche Aufgaben", farbe: "#ff4444", verfuegbar: false }
]

const lernpfad = {
  1: [
    {
      id: 1,
      titel: "Was ist ein ETF – und warum sollte dich das interessieren?",
      inhalt: `Stell dir vor, du hast 100€ und willst investieren. Du könntest Apple-Aktien kaufen – aber was wenn Apple nächstes Jahr abstürzt? Oder du kaufst Volkswagen – und dann kommt ein Dieselskandal.

Das Problem mit Einzelaktien: du setzt alles auf eine Karte. Und selbst die klügsten Investoren der Welt liegen regelmäßig falsch.

Ein ETF löst dieses Problem elegant. ETF steht für Exchange Traded Fund – ein Fonds, der an der Börse gehandelt wird wie eine normale Aktie. Statt in ein Unternehmen investierst du in hunderte gleichzeitig.

Beispiel: Der MSCI World ETF enthält über 1.500 Unternehmen aus 23 Ländern. Mit 100€ bist du anteilig Miteigentümer von Apple, Microsoft, Samsung, Nestlé und tausend anderen. Geht eines pleite – kaum spürbar. Wächst die Weltwirtschaft – du wächst mit.

Das ist keine Magie. Das ist Mathematik: Risiko verteilen nennt man Diversifikation, und ETFs machen das automatisch für dich.`,
      xp: 20,
      fragen: [
        { text: "Warum sind Einzelaktien riskanter als ETFs?", antworten: ["Sie sind teurer", "Du setzt alles auf ein Unternehmen", "Sie haben schlechtere Rendite", "Sie sind schwerer zu kaufen"], richtig: 1 },
        { text: "Wie viele Unternehmen enthält der MSCI World ETF ungefähr?", antworten: ["50", "250", "1.500", "10.000"], richtig: 2 },
        { text: "Was passiert wenn ein Unternehmen in deinem ETF pleite geht?", antworten: ["Du verlierst alles", "Du verlierst deinen gesamten Einsatz", "Es ist kaum spürbar weil hunderte andere noch laufen", "Der ETF wird aufgelöst"], richtig: 2 }
      ]
    },
    {
      id: 2,
      titel: "Wie ein ETF funktioniert – unter der Haube",
      inhalt: `Du weißt jetzt was ein ETF ist. Aber wie funktioniert das eigentlich technisch – und warum ist es so günstig?

Ein ETF bildet einen Index nach. Ein Index ist einfach eine Liste von Unternehmen nach festen Regeln. Der DAX zum Beispiel: die 40 größten börsennotierten deutschen Unternehmen nach Marktkapitalisierung. Punkt. Keine menschliche Entscheidung, keine Meinung – nur Regeln.

Ein ETF auf den DAX kauft automatisch alle 40 Unternehmen im richtigen Verhältnis. Ändert sich der Index – zum Beispiel weil ein Unternehmen zu klein wird und rausfällt – passt sich der ETF automatisch an.

Hier liegt der entscheidende Vorteil: kein teurer Fondsmanager der täglich Entscheidungen trifft. ETFs werden passiv verwaltet. Das macht sie extrem günstig.

Zum Vergleich: Ein aktiv verwalteter Fonds kostet oft 1,5–2% pro Jahr. Ein ETF auf den MSCI World kostet 0,1–0,2% pro Jahr. Klingt klein – aber über 30 Jahre macht das einen riesigen Unterschied.

Beispiel mit Zahlen: Du investierst 10.000€. Nach 30 Jahren bei 7% Rendite:
- Mit 2% Kosten: ~57.000€
- Mit 0,2% Kosten: ~74.000€

Der Unterschied? 17.000€ – nur wegen der Kosten.`,
      xp: 20,
      fragen: [
        { text: "Was ist ein Index?", antworten: ["Ein teurer Investmentfonds", "Eine Liste von Unternehmen nach festen Regeln", "Ein staatliches Sparprogramm", "Eine Kryptowährung"], richtig: 1 },
        { text: "Warum sind ETFs so günstig?", antworten: ["Sie investieren nur in kleine Unternehmen", "Sie werden passiv verwaltet – kein teurer Fondsmanager", "Sie haben staatliche Förderung", "Sie kaufen nur eine Aktie"], richtig: 1 },
        { text: "Was kostet ein typischer ETF auf den MSCI World pro Jahr?", antworten: ["0–0,05%", "0,1–0,2%", "1–2%", "5%"], richtig: 1 }
      ]
    },
    {
      id: 3,
      titel: "Der MSCI World – der ETF den jeder kennen sollte",
      inhalt: `Wenn Menschen von ETFs reden, meinen sie oft den MSCI World. Er ist der bekannteste, meist diskutierte und meistgekaufte Index weltweit. Aber was steckt wirklich drin?

Der MSCI World enthält aktuell über 1.500 Unternehmen aus 23 entwickelten Ländern. Entwickelt bedeutet: reiche, stabile Volkswirtschaften – USA, Deutschland, Japan, UK, Frankreich und viele mehr.

Die größten Positionen: Apple, Microsoft, NVIDIA, Amazon, Meta. Klingt bekannt? Richtig – die größten Tech-Konzerne der Welt dominieren den Index.

Wichtig zu wissen: Etwa 70% des MSCI World sind US-Unternehmen. Das ist viel. Wenn Amerika hustet, bekommt dein ETF Schnupfen. Das ist eine echte Konzentration, die du kennen solltest.

Trotzdem: Historisch hat der MSCI World etwa 7–9% Rendite pro Jahr gebracht. 10.000€ investiert vor 30 Jahren wären heute über 70.000€.

Aber der MSCI World hat eine Lücke: Er enthält keine Schwellenländer. China, Indien, Brasilien, Südkorea – alles fehlt. Wer breiter diversifizieren will, nimmt den MSCI All World (auch ACWI genannt) – der enthält zusätzlich ~2.000 Unternehmen aus Schwellenländern.

Für den Einstieg gilt: MSCI World oder ACWI sind beide solide. Du kannst nicht viel falsch machen.`,
      xp: 20,
      fragen: [
        { text: "Wie hoch ist der US-Anteil im MSCI World ungefähr?", antworten: ["30%", "50%", "70%", "90%"], richtig: 2 },
        { text: "Was fehlt im MSCI World?", antworten: ["Europäische Unternehmen", "US-Technologiefirmen", "Schwellenländer wie China und Indien", "Finanzunternehmen"], richtig: 2 },
        { text: "Was ist der Unterschied zwischen MSCI World und MSCI ACWI?", antworten: ["Kein Unterschied", "ACWI enthält zusätzlich Schwellenländer", "ACWI ist teurer", "ACWI enthält nur europäische Firmen"], richtig: 1 }
      ]
    },
    {
      id: 4,
      titel: "Thesaurierend vs. ausschüttend – was ist besser?",
      inhalt: `Wenn Unternehmen Gewinne machen, können sie diese als Dividende auszahlen – ein Anteil des Gewinns geht direkt an die Aktionäre. Bei ETFs funktioniert das genauso. Und hier hast du eine Wahl.

Ausschüttender ETF: Die Dividenden werden regelmäßig (quartalsweise oder jährlich) auf dein Konto ausgezahlt. Du siehst echtes Geld fließen. Das fühlt sich gut an – aber ist es auch smart?

Thesaurierender ETF: Die Dividenden werden nicht ausgezahlt, sondern automatisch reinvestiert. Dein ETF kauft mit den Dividenden weitere Anteile – ohne dass du etwas tun musst.

Warum ist thesaurierend meist besser für langfristige Anleger?

Zinseszins-Effekt. Wenn Dividenden reinvestiert werden, wächst dein Kapital schneller. Beispiel: Du hast 10.000€ im ETF. Der ETF schüttet 2% Dividende aus – 200€. 

Ausschüttend: 200€ kommen auf dein Konto. Du musst aktiv entscheiden was du damit machst.
Thesaurierend: 200€ werden sofort reinvestiert und wachsen weiter mit.

Über 30 Jahre macht dieser Unterschied tausende Euro aus.

Steuerlich gibt es Nuancen (dazu kommt eine eigene Lektion), aber für den Einstieg gilt: Wenn du langfristig aufbauen willst und das Geld nicht brauchst – thesaurierend ist dein Freund.`,
      xp: 20,
      fragen: [
        { text: "Was macht ein thesaurierender ETF mit Dividenden?", antworten: ["Er zahlt sie aus", "Er reinvestiert sie automatisch", "Er spart sie für 5 Jahre", "Er löscht sie"], richtig: 1 },
        { text: "Warum ist thesaurierend für Langfristanleger oft besser?", antworten: ["Es ist steuerfreier", "Der Zinseszinseffekt wirkt stärker", "Es gibt mehr Dividenden", "Es ist einfacher zu verkaufen"], richtig: 1 },
        { text: "Was passiert bei einem ausschüttenden ETF mit den Dividenden?", antworten: ["Sie werden reinvestiert", "Sie verfallen", "Sie werden auf dein Konto ausgezahlt", "Sie gehen an den Staat"], richtig: 2 }
      ]
    },
    {
      id: 5,
      titel: "TER – was ein ETF wirklich kostet",
      inhalt: `Jeder ETF hat Kosten. Diese heißen TER – Total Expense Ratio, auf Deutsch: Gesamtkostenquote. Sie wird in Prozent pro Jahr angegeben und automatisch aus dem ETF abgezogen – du bezahlst sie nicht aktiv, sie reduzieren einfach die Rendite.

Ein ETF mit TER 0,2% kostet dich 2€ pro 1.000€ investiertem Kapital pro Jahr. Klingt wenig – und ist es auch.

Aber Vorsicht: Es gibt versteckte Kosten die nicht in der TER stecken.

Spread: Der Unterschied zwischen Kauf- und Verkaufspreis. Günstige ETFs auf liquide Indizes haben minimale Spreads (0,01–0,05%). Exotische ETFs können 0,5%+ haben.

Steuern: In Deutschland zahlst du 25% Abgeltungssteuer + Solidaritätszuschlag auf Gewinne und Dividenden. Das ist fix und gilt für alle ETFs.

Tracking Difference vs. TER: Die TER ist nicht die einzige Kennzahl. Die Tracking Difference (TD) zeigt wie gut der ETF seinen Index wirklich abbildet – manche ETFs haben sogar negative TD, weil sie durch Wertpapierleihe Extraeinnahmen erzielen.

Fazit: Für 90% der Anleger sind günstige, große ETFs auf bekannte Indizes die beste Wahl. MSCI World ETFs von Xtrackers, iShares oder Vanguard liegen alle unter 0,25% TER – das ist fair.`,
      xp: 20,
      fragen: [
        { text: "Was bedeutet TER?", antworten: ["Trade Execution Rate", "Total Expense Ratio", "Tax Exemption Rule", "Transfer Equity Ratio"], richtig: 1 },
        { text: "Wie werden ETF-Kosten abgezogen?", antworten: ["Als jährliche Rechnung", "Automatisch aus dem ETF-Wert", "Beim Kauf einmalig", "Beim Verkauf"], richtig: 1 },
        { text: "Was ist die Tracking Difference?", antworten: ["Die Transaktionskosten", "Wie gut der ETF seinen Index wirklich abbildet", "Der Spread beim Kauf", "Die jährliche Steuer"], richtig: 1 }
      ]
    },
    {
      id: 6,
      titel: "Physisch oder synthetisch – wie ETFs ihren Index nachbilden",
      inhalt: `Du weißt jetzt dass ETFs einen Index nachbilden. Aber wie genau passiert das technisch? Es gibt zwei Hauptmethoden – und beide haben Vor- und Nachteile.

Physische Replikation: Der ETF kauft alle Aktien des Index direkt. Ein ETF auf den S&P 500 kauft buchstäblich alle 500 Aktien im richtigen Verhältnis. Transparent, verständlich, sicher.

Vollständige Replikation: Alle Aktien werden gekauft. Perfekt für Indizes mit wenigen, liquiden Wertpapieren wie dem DAX oder S&P 500.

Sampling: Nur die wichtigsten Aktien werden gekauft. Sinnvoll bei Indizes mit tausenden Positionen – nicht jede winzige Aktie zu kaufen spart Kosten.

Synthetische Replikation: Der ETF kauft keine Aktien des Index direkt. Stattdessen schließt er einen Swap-Vertrag mit einer Bank ab – die Bank garantiert die Index-Rendite, der ETF hält andere Wertpapiere als Sicherheit.

Klingt kompliziert – und birgt tatsächlich ein kleines Zusatzrisiko: Kontrahentenrisiko. Wenn die Bank pleite geht, könnte es Probleme geben. In der Praxis ist dieses Risiko durch Regulierung stark begrenzt.

Für wen ist was sinnvoll? Als Einsteiger: physisch replizierende ETFs auf bekannte Indizes. Einfach, transparent, sicher. Synthetische ETFs können in bestimmten Situationen Vorteile haben (z.B. bei US-Dividendenbesteuerung), aber das ist fortgeschrittenes Terrain.`,
      xp: 20,
      fragen: [
        { text: "Was macht ein physisch replizierender ETF?", antworten: ["Er kauft Derivate", "Er kauft die Aktien des Index direkt", "Er leiht sich Aktien", "Er kopiert andere ETFs"], richtig: 1 },
        { text: "Was ist Kontrahentenrisiko bei synthetischen ETFs?", antworten: ["Der Index fällt", "Die Bank die den Swap garantiert könnte pleite gehen", "Die TER steigt", "Der ETF wird geschlossen"], richtig: 1 },
        { text: "Was ist Sampling bei physischer Replikation?", antworten: ["Nur die wichtigsten Aktien des Index werden gekauft", "Alle Aktien werden gekauft", "Aktien werden verliehen", "Der Index wird monatlich gewechselt"], richtig: 0 }
      ]
    },
    {
      id: 7,
      titel: "Wertpapierleihe – wie ETFs Geld verdienen",
      inhalt: `Hier wird es interessant. Viele ETFs haben eine Tracking Difference die negativ ist – das heißt, sie performen besser als ihr eigener Index. Wie ist das möglich?

Wertpapierleihe. ETFs können ihre Aktien vorübergehend an andere Marktteilnehmer verleihen – zum Beispiel an Hedgefonds die auf fallende Kurse wetten (Leerverkäufe). Dafür kassiert der ETF eine Leihgebühr.

Diese Extraeinnahmen werden an die ETF-Inhaber weitergegeben – in Form von besserer Performance. Ein ETF mit TER 0,2% kann durch Wertpapierleihe effektiv 0,0% oder sogar negative Kosten haben.

Aber ist das riskant? Ja, es gibt ein Risiko: Wenn der Entleiher pleite geht, könnte der ETF seine Aktien nicht zurückbekommen. Deshalb verlangen Regulatoren Sicherheiten – meist 102–105% des Wertes der geliehenen Aktien in Form anderer Wertpapiere.

In der Praxis ist dieses Risiko bei großen ETFs von namhaften Anbietern sehr gering. iShares und Xtrackers zum Beispiel leihen nur einen Teil ihrer Positionen aus und halten hohe Sicherheiten.

Für dich als Anleger: Du musst das nicht aktiv managen. Aber es erklärt warum manche ETFs so günstig oder sogar "gratis" erscheinen – sie verdienen durch Wertpapierleihe.`,
      xp: 25,
      fragen: [
        { text: "Warum haben manche ETFs eine negative Tracking Difference?", antworten: ["Sie haben Fehler im System", "Sie verdienen durch Wertpapierleihe Extraeinnahmen", "Sie betrügen Anleger", "Der Index wird falsch berechnet"], richtig: 1 },
        { text: "An wen verleihen ETFs ihre Aktien?", antworten: ["An andere Privatanleger", "An die Regierung", "An Marktteilnehmer wie Hedgefonds", "An andere ETFs"], richtig: 2 },
        { text: "Wie wird das Risiko der Wertpapierleihe begrenzt?", antworten: ["Gar nicht", "Durch Sicherheiten die der Entleiher stellen muss", "Durch staatliche Garantien", "Durch Versicherungen"], richtig: 1 }
      ]
    },
    {
      id: 8,
      titel: "Steuern auf ETFs in Deutschland – das musst du wissen",
      inhalt: `Steuern sind unbeliebt aber unvermeidbar. In Deutschland gibt es drei Steuerereignisse die ETF-Anleger kennen müssen.

1. Abgeltungssteuer auf Gewinne beim Verkauf
Wenn du ETF-Anteile verkaufst und dabei Gewinn gemacht hast, zahlst du 25% Abgeltungssteuer + 5,5% Solidaritätszuschlag darauf = effektiv 26,375%. Kirchensteuer kommt ggf. noch dazu.

Beispiel: Du kaufst für 10.000€ und verkaufst für 15.000€. Gewinn: 5.000€. Steuer: 5.000 × 26,375% = 1.318,75€.

2. Steuer auf Dividenden (bei ausschüttenden ETFs)
Jede Ausschüttung wird sofort besteuert – ebenfalls mit 26,375%.

3. Vorabpauschale (bei thesaurierenden ETFs)
Das ist komplizierter. Der Staat will nicht warten bis du verkaufst – er besteuert einen fiktiven Mindestgewinn jedes Jahr. Die Vorabpauschale wird automatisch von deinem Verrechnungskonto abgezogen.

Die gute Nachricht: Sparerpauschbetrag. Jeder Deutsche hat 1.000€ (Singles) bzw. 2.000€ (Verheiratete) steuerfrei pro Jahr. Alles darunter – keine Steuer.

Praxis-Tipp: Stell einen Freistellungsauftrag bei deiner Depotbank. Sonst zahlt die Bank automatisch Steuern, auch wenn deine Gewinne unter dem Freibetrag liegen.`,
      xp: 25,
      fragen: [
        { text: "Wie hoch ist die Abgeltungssteuer in Deutschland?", antworten: ["15%", "19%", "25% + Soli = 26,375%", "30%"], richtig: 2 },
        { text: "Was ist der Sparerpauschbetrag für Singles?", antworten: ["500€", "801€", "1.000€", "2.000€"], richtig: 2 },
        { text: "Was ist ein Freistellungsauftrag?", antworten: ["Ein Antrag auf Steuerfreiheit für alle Gewinne", "Ein Auftrag der die Bank anweist Gewinne bis zum Freibetrag steuerfrei zu lassen", "Eine Versicherung gegen Verluste", "Ein staatlicher Sparbonus"], richtig: 1 }
      ]
    },
    {
      id: 9,
      titel: "Sparplan – der mächtigste Weg für Einsteiger",
      inhalt: `Du musst nicht 10.000€ auf einmal haben um in ETFs zu investieren. Der Sparplan ist der Einstieg für alle die regelmäßig kleine Beträge anlegen wollen – und er ist in vielen Punkten sogar besser als eine Einmalanlage.

Was ist ein Sparplan? Du legst fest: jeden Monat werden automatisch X Euro in deinen ETF investiert. 25€, 50€, 100€ – du entscheidest. Die meisten Broker bieten Sparpläne ab 1€ an.

Der entscheidende Vorteil: Cost Averaging, auf Deutsch Durchschnittskosteneffekt.

Stell dir vor: ETF-Kurs im Januar: 100€. Du kaufst 1 Anteil.
ETF-Kurs im Februar: 80€. Du kaufst 1,25 Anteile.
ETF-Kurs im März: 120€. Du kaufst 0,83 Anteile.

Du kaufst automatisch mehr Anteile wenn es günstig ist, weniger wenn es teuer ist. Dein durchschnittlicher Einkaufspreis sinkt – ohne dass du etwas tun musst.

Psychologischer Vorteil: Du musst nie fragen "ist jetzt der richtige Zeitpunkt?". Es gibt keinen richtigen Zeitpunkt – du kaufst immer. Das eliminiert einen der größten Fehler von Anfängern: Market Timing.

Zinseszins über Zeit: 100€/Monat, 8% Rendite, 30 Jahre → über 140.000€. Du hast 36.000€ eingezahlt. Die restlichen 104.000€? Reiner Zinseszins.`,
      xp: 25,
      fragen: [
        { text: "Was ist der Cost-Averaging-Effekt?", antworten: ["Du kaufst immer zum gleichen Preis", "Du kaufst mehr Anteile wenn es günstig ist automatisch mehr", "Du sparst Steuern durch regelmäßiges Kaufen", "Du vermeidest Verluste"], richtig: 1 },
        { text: "Was ist ein großer psychologischer Vorteil des Sparplans?", antworten: ["Du siehst täglich deinen Gewinn", "Du musst nie den richtigen Kaufzeitpunkt finden", "Du bekommst staatliche Förderung", "Du kannst jederzeit kostenlos verkaufen"], richtig: 1 },
        { text: "Ab wie viel Euro bieten viele Broker Sparpläne an?", antworten: ["10€", "25€", "50€", "1€"], richtig: 3 }
      ]
    },
    {
      id: 10,
      titel: "Welcher ETF passt zu mir? – Die richtige Auswahl",
      inhalt: `Es gibt tausende ETFs. Welchen nimmst du? Hier ist ein systematischer Ansatz der für 90% der Anleger funktioniert.

Schritt 1: Index wählen
Für Einsteiger: MSCI World oder MSCI ACWI. Breit, günstig, bewährt. Der ACWI ist breiter (inkl. Schwellenländer), der World etwas stabiler.

Willst du mehr Gewichtung auf bestimmte Regionen? Dann kombiniere: 70% MSCI World + 30% Emerging Markets ETF. Das ist die klassische "70/30-Strategie".

Schritt 2: Anbieter wählen
Die drei größten und günstigsten: iShares (BlackRock), Xtrackers (DWS), Vanguard. Alle solide, alle reguliert, alle mit TER unter 0,25%.

Schritt 3: Thesaurierend oder ausschüttend?
Langfristiger Vermögensaufbau → thesaurierend.
Du möchtest passives Einkommen sehen → ausschüttend.

Schritt 4: Größe des ETFs prüfen
Ein ETF sollte mindestens 100 Millionen Euro Fondsvolumen haben. Kleinere ETFs werden manchmal geschlossen – kein Drama, aber nervig.

Schritt 5: Handelbarkeit prüfen
Kaufe ETFs die an deutschen Börsen (XETRA) gut handelbar sind. Großes Volumen = kleiner Spread = du verlierst weniger beim Kaufen.

Konkrete Empfehlung für den Start: iShares Core MSCI World UCITS ETF (ISIN: IE00B4L5Y983) oder Xtrackers MSCI World Swap UCITS ETF. Beide unter 0,2% TER, milliardenschwer, bewährt.`,
      xp: 25,
      fragen: [
        { text: "Was ist die klassische '70/30-Strategie'?", antworten: ["70% Aktien, 30% Anleihen", "70% MSCI World, 30% Emerging Markets", "70% thesaurierend, 30% ausschüttend", "70% ETF, 30% Einzelaktien"], richtig: 1 },
        { text: "Wie groß sollte ein ETF mindestens sein?", antworten: ["1 Million Euro", "10 Millionen Euro", "100 Millionen Euro", "1 Milliarde Euro"], richtig: 2 },
        { text: "Was sind die drei größten ETF-Anbieter?", antworten: ["Deutsche Bank, Commerzbank, DKB", "iShares, Xtrackers, Vanguard", "Trade Republic, Scalable, Comdirect", "Apple, Google, Microsoft"], richtig: 1 }
      ]
    },
    {
      id: 11,
      titel: "Rebalancing – dein Portfolio in Balance halten",
      inhalt: `Du hast deinen ETF gekauft. Jetzt lehnst du dich zurück und wartest. Klingt gut – aber eine Sache solltest du einmal im Jahr tun: Rebalancing.

Was ist Rebalancing? Stell dir vor, du hast 70% MSCI World und 30% Emerging Markets gewählt. Nach einem Jahr hat der MSCI World stark zugelegt – plötzlich ist es 80% zu 20%. Dein ursprüngliches Verhältnis stimmt nicht mehr.

Rebalancing bedeutet: du stellst das ursprüngliche Verhältnis wieder her. Entweder indem du den übergewichteten Teil verkaufst, oder indem du neue Einzahlungen in den untergewichteten Teil steckst.

Warum ist das wichtig? Weil du sonst unbewusst mehr Risiko eingehst als geplant. Wenn ein Bereich sehr stark gewachsen ist, ist er auch teurer und möglicherweise risikoreicher.

Wie oft rebalancieren? Einmal pro Jahr reicht. Manche machen es wenn die Abweichung mehr als 5% beträgt. Häufigeres Rebalancing verursacht mehr Kosten (Steuern, Spreads).

Praxis-Tipp: Nutze neue Einzahlungen zum Rebalancen. Statt zu verkaufen (was Steuern auslöst) kaufst du einfach mehr vom untergewichteten ETF. Effizienter und steuerschonender.

Beispiel: Du hast 7.000€ im MSCI World und 2.500€ im EM ETF – eigentlich sollte das Verhältnis 70/30 sein, aber es ist 74/26. Deine nächsten 500€ gehen komplett in den EM ETF. Problem gelöst, keine Steuer ausgelöst.`,
      xp: 25,
      fragen: [
        { text: "Was ist Rebalancing?", antworten: ["Einen neuen ETF kaufen", "Das ursprüngliche Portfolio-Verhältnis wiederherstellen", "Alle ETFs verkaufen und neu kaufen", "Den ETF-Anbieter wechseln"], richtig: 1 },
        { text: "Wie oft sollte man typischerweise rebalancen?", antworten: ["Täglich", "Monatlich", "Einmal pro Jahr", "Alle 10 Jahre"], richtig: 2 },
        { text: "Was ist der steuerschonendste Weg zum Rebalancen?", antworten: ["Alles verkaufen und neu kaufen", "Neue Einzahlungen in den untergewichteten Teil stecken", "Dividenden zum Rebalancen nutzen", "Nichts tun"], richtig: 1 }
      ]
    },
    {
      id: 12,
      titel: "Deine ETF-Strategie – von Theorie zur Praxis",
      inhalt: `Du hast jetzt alles Wichtige über ETFs gelernt. Es ist Zeit, das in eine konkrete Strategie zu verwandeln. Denn Wissen ohne Handeln bringt nichts.

Schritt 1: Depot eröffnen
In Deutschland sind die besten Broker für ETF-Sparpläne: Trade Republic (sehr einfach, 1% p.a. auf Cash), Scalable Capital (große Auswahl, gutes Interface), Comdirect oder DKB für klassische Bankerfahrung.

Schritt 2: Freistellungsauftrag einrichten
Direkt nach der Depoteröffnung: Freistellungsauftrag für 1.000€ einrichten. So bleiben erste Gewinne steuerfrei.

Schritt 3: ETF auswählen
Für 90% der Einsteiger: iShares Core MSCI World oder Xtrackers MSCI World. Fertig.

Schritt 4: Sparplan einrichten
Entscheide wie viel du monatlich investieren kannst. 25€? Super. 100€? Noch besser. Stell den Sparplan ein und vergiss ihn.

Schritt 5: Nicht täglich schauen
Das ist der schwierigste Schritt. Märkte schwanken. Dein ETF wird manchmal -10%, -20%, sogar -30% stehen. Das ist normal. Wer in der Finanzkrise 2008 durchgehalten hat, hat danach die stärkste Dekade der Börsengeschichte erlebt.

Die einzige schlechte Entscheidung ist verkaufen wenn es unten ist.

Schritt 6: Jährlich prüfen
Einmal pro Jahr: Rebalancing prüfen, Sparrate anpassen wenn sich Einkommen geändert hat. Das war's.

Glückwunsch – du weißt jetzt mehr über ETFs als 90% der deutschen Bevölkerung.`,
      xp: 30,
      fragen: [
        { text: "Was ist einer der besten Broker für ETF-Sparpläne in Deutschland?", antworten: ["PayPal", "Trade Republic oder Scalable Capital", "Amazon", "Ebay"], richtig: 1 },
        { text: "Was ist die einzige wirklich schlechte Entscheidung beim ETF-Investieren?", antworten: ["Zu früh anfangen", "Zu kleine Beträge investieren", "Verkaufen wenn es unten ist", "Thesaurierend statt ausschüttend wählen"], richtig: 2 },
        { text: "Wie oft sollte man sein ETF-Portfolio aktiv überprüfen?", antworten: ["Täglich", "Wöchentlich", "Monatlich", "Einmal pro Jahr"], richtig: 3 }
      ]
    }
  ]
}

function berechneLevel(xp) {
  return Math.floor(xp / 100) + 1
}

function Startscreen({ xp, onHauptkategorieClick }) {
  const level = berechneLevel(xp)
  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Lumio </h1>
        <p className="xp-info">⚡ {xp} XP · Level {level}</p>
      </div>
      <div className="hub-grid">
        {hauptkategorien.map((k) => (
          <div
            key={k.id}
            className={`hub-karte ${!k.verfuegbar ? "gesperrt" : ""}`}
            onClick={() => k.verfuegbar && onHauptkategorieClick(k.id)}
            style={{ borderColor: k.verfuegbar ? k.farbe + "44" : "#2a2a2a" }}
          >
            <div className="hub-icon" style={{ color: k.verfuegbar ? k.farbe : "#444" }}>{k.icon}</div>
            <p className="hub-name" style={{ color: k.verfuegbar ? "#fff" : "#555" }}>{k.name}</p>
            <p className="hub-beschreibung">{k.verfuegbar ? k.beschreibung : "Bald verfügbar"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LernpfadeScreen({ xp, onKategorieClick, onZurueck, abgeschlosseneLektionen }) {
  const level = berechneLevel(xp)
  return (
    <div className="screen">
      <button className="zurueck-btn" onClick={onZurueck}>← Zurück</button>
      <div className="screen-header" style={{ marginTop: "1rem" }}>
        <h1>Lernpfade</h1>
        <p className="xp-info">⚡ {xp} XP · Level {level}</p>
      </div>
      <div className="kategorien-liste">
        {kategorien.map((k) => {
          const gesperrt = level < k.minLevel
          const abgeschlossen = (lernpfad[k.id] || []).filter(l => abgeschlosseneLektionen.includes(l.id)).length
          const gesamt = (lernpfad[k.id] || []).length
          const fortschritt = gesamt > 0 ? Math.round((abgeschlossen / gesamt) * 100) : 0
          return (
            <div
              key={k.id}
              className={`kategorie-karte ${gesperrt ? "gesperrt" : ""}`}
              onClick={() => !gesperrt && onKategorieClick(k)}
            >
              <div className="kategorie-icon" style={{ background: gesperrt ? "#222" : k.farbe + "22", color: gesperrt ? "#444" : k.farbe }}>
                {gesperrt ? "🔒" : k.icon}
              </div>
              <div className="kategorie-info">
                <div className="kategorie-top">
                  <h2>{k.name}</h2>
                  {gesperrt && <span className="lock-label">ab Level {k.minLevel}</span>}
                </div>
                <p className="kategorie-beschreibung">{k.beschreibung}</p>
                <div className="fortschritt-bar">
                  <div className="fortschritt-fill" style={{ width: `${fortschritt}%`, background: gesperrt ? "#333" : k.farbe }} />
                </div>
                <p className="kategorie-meta">{fortschritt}% · {k.lektionenAnzahl} Lektionen</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function KategorieDetail({ kategorie, abgeschlosseneLektionen, onZurueck, onLektionClick }) {
  const lektionen = lernpfad[kategorie.id] || []
  return (
    <div className="screen">
      <button className="zurueck-btn" onClick={onZurueck}>← Zurück</button>
      <div className="screen-header" style={{ marginTop: "1rem" }}>
        <div className="kategorie-icon-gross" style={{ background: kategorie.farbe + "22", color: kategorie.farbe }}>
          {kategorie.icon}
        </div>
        <h1>{kategorie.name}</h1>
        <p className="xp-info">{kategorie.beschreibung}</p>
      </div>
      <div className="lektionen-liste">
        {lektionen.map((l, index) => {
          const abgeschlossen = abgeschlosseneLektionen.includes(l.id)
          const gesperrt = index > 0 && !abgeschlosseneLektionen.includes(lektionen[index - 1].id)
          return (
            <div
              key={l.id}
              className={`lektion-karte ${gesperrt ? "gesperrt" : ""} ${abgeschlossen ? "abgeschlossen" : ""}`}
              onClick={() => !gesperrt && onLektionClick(l)}
            >
              <div className="lektion-status">
                {abgeschlossen ? "✅" : gesperrt ? "🔒" : "▶️"}
              </div>
              <div className="lektion-info">
                <p className="lektion-titel">{l.titel}</p>
                <p className="lektion-xp">Lesen → Quiz → +{l.xp} XP</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LektionScreen({ lektion, kategorie, onZurueck, onAbgeschlossen }) {
  const [phase, setPhase] = useState("lesen")
  const [aktualeFrage, setAktualeFrage] = useState(0)
  const [gewaehlt, setGewaehlt] = useState(null)
  const [richtige, setRichtige] = useState(0)

  const fragen = lektion.fragen
  const aktuelleFrage = fragen[aktualeFrage]

  function antworten(index) {
    if (gewaehlt !== null) return
    setGewaehlt(index)
    if (index === aktuelleFrage.richtig) setRichtige(r => r + 1)
  }

  function naechsteFrage() {
    if (aktualeFrage + 1 >= fragen.length) {
      setPhase("ergebnis")
    } else {
      setAktualeFrage(aktualeFrage + 1)
      setGewaehlt(null)
    }
  }

  if (phase === "lesen") {
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={onZurueck}>← Zurück</button>
        <div className="lektion-progress">
          <div className="lektion-progress-fill" style={{ width: "33%", background: kategorie.farbe }} />
        </div>
        <p className="theorie-label">📖 Lerneinheit</p>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>{lektion.titel}</h2>
        {lektion.inhalt.split("\n\n").map((absatz, i) => (
          <p key={i} style={{ color: "#ccc", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.95rem" }}>{absatz}</p>
        ))}
        <button className="weiter-btn" onClick={() => setPhase("quiz")}>Zum Verständnisquiz →</button>
      </div>
    )
  }

  if (phase === "quiz") {
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={() => setPhase("lesen")}>← Zurück</button>
        <div className="lektion-progress">
          <div className="lektion-progress-fill" style={{ width: `${33 + (aktualeFrage / fragen.length) * 33}%`, background: kategorie.farbe }} />
        </div>
        <p className="theorie-label">🧠 Verständnisquiz · Frage {aktualeFrage + 1} / {fragen.length}</p>
        <h2 className="frage">{aktuelleFrage.text}</h2>
        <div className="antworten">
          {aktuelleFrage.antworten.map((a, i) => (
            <button
              key={i}
              className={`antwort-btn ${gewaehlt !== null ? i === aktuelleFrage.richtig ? "richtig" : gewaehlt === i ? "falsch" : "" : ""}`}
              onClick={() => antworten(i)}
            >
              {a}
            </button>
          ))}
        </div>
        {gewaehlt !== null && (
          <div className="feedback">
            <p>{gewaehlt === aktuelleFrage.richtig ? "✅ Richtig!" : "❌ Falsch!"}</p>
            <button className="weiter-btn" onClick={naechsteFrage}>
              {aktualeFrage + 1 >= fragen.length ? "Ergebnis →" : "Weiter →"}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (phase === "ergebnis") {
    const perfekt = richtige === fragen.length
    const verdientXP = perfekt ? lektion.xp : 0
    return (
      <div className="screen" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginTop: "3rem" }}>{perfekt ? "🎉" : "📚"}</div>
        <h1 style={{ color: perfekt ? kategorie.farbe : "#888", marginTop: "1rem" }}>
          {perfekt ? "Perfekt!" : "Fast!"}
        </h1>
        <p style={{ color: "#888", marginTop: "0.5rem" }}>{richtige} von {fragen.length} Fragen richtig</p>
        {perfekt
          ? <p style={{ fontSize: "1.5rem", color: kategorie.farbe, marginTop: "0.5rem" }}>+{verdientXP} XP</p>
          : <p style={{ color: "#888", marginTop: "0.5rem" }}>Alle Fragen richtig für XP – versuch es nochmal</p>
        }
        {!perfekt && (
          <button className="weiter-btn" style={{ marginTop: "1.5rem", background: "#333", color: "#fff" }}
            onClick={() => { setPhase("lesen"); setAktualeFrage(0); setGewaehlt(null); setRichtige(0) }}>
            Nochmal lesen
          </button>
        )}
        <button className="weiter-btn" style={{ marginTop: "1rem" }} onClick={() => onAbgeschlossen(verdientXP)}>
          {perfekt ? "Weiter" : "Trotzdem weiter"}
        </button>
      </div>
    )
  }
}


function ProfilScreen({ xp, streak, abgeschlosseneLektionen }) {
  const level = berechneLevel(xp)
  const xpFuerNaechstesLevel = level * 100
  const xpAktuell = xp - (level - 1) * 100
  const xpFortschritt = (xpAktuell / 100) * 100

  const etfLektionenGesamt = lernpfad[1].length
  const etfAbgeschlossen = lernpfad[1].filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const alleETFAbgeschlossen = etfAbgeschlossen === etfLektionenGesamt

  const badges = [
    {
      id: "erste_lektion",
      name: "Erster Schritt",
      icon: "🎯",
      beschreibung: "Erste Lektion abgeschlossen",
      erreicht: abgeschlosseneLektionen.length >= 1
    },
    {
      id: "etf_komplett",
      name: "ETF Experte",
      icon: "📈",
      beschreibung: "Alle ETF Lektionen abgeschlossen",
      erreicht: alleETFAbgeschlossen
    },
    {
      id: "streak_7",
      name: "7-Tage Streak",
      icon: "🔥",
      beschreibung: "7 Tage in Folge gelernt",
      erreicht: streak >= 7
    },
    {
      id: "level_5",
      name: "Aufsteiger",
      icon: "⭐",
      beschreibung: "Level 5 erreicht",
      erreicht: level >= 5
    }
  ]

  const stats = [
    { label: "Abgeschlossene Lektionen", wert: abgeschlosseneLektionen.length },
    { label: "Aktueller Streak", wert: `${streak} Tage` },
    { label: "Gesamt XP", wert: xp },
    { label: "ETF Fortschritt", wert: `${etfAbgeschlossen}/${etfLektionenGesamt}` }
  ]

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Profil</h1>
      </div>

      {/* Level & XP */}
      <div className="profil-level-card">
        <div className="profil-level-kreis">
          <span className="profil-level-zahl">{level}</span>
          <span className="profil-level-label">LVL</span>
        </div>
        <div className="profil-level-info">
          <p className="profil-level-titel">Level {level}</p>
          <p className="profil-xp-text">{xpAktuell} / 100 XP zum nächsten Level</p>
          <div className="profil-xp-bar">
            <div className="profil-xp-fill" style={{ width: `${xpFortschritt}%` }} />
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="profil-streak">
        <span style={{ fontSize: "1.5rem" }}>🔥</span>
        <div>
          <p style={{ fontWeight: 600 }}>{streak} Tage Streak</p>
          <p style={{ fontSize: "0.8rem", color: "#888" }}>Komm täglich zurück um deinen Streak zu halten</p>
        </div>
      </div>

      {/* Statistiken */}
      <h3 className="profil-section-titel">Statistiken</h3>
      <div className="profil-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="profil-stat-karte">
            <p className="profil-stat-wert">{s.wert}</p>
            <p className="profil-stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <h3 className="profil-section-titel">Abzeichen</h3>
      <div className="profil-badges">
        {badges.map((b) => (
          <div key={b.id} className={`profil-badge ${b.erreicht ? "erreicht" : "gesperrt"}`}>
            <span className="badge-icon">{b.icon}</span>
            <p className="badge-name">{b.name}</p>
            <p className="badge-beschreibung">{b.beschreibung}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


function App() {
  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0)
  const [aktiverTab, setAktiverTab] = useState("home")
  const [aktiveHauptkategorie, setAktiveHauptkategorie] = useState(null)
  const [aktiveKategorie, setAktiveKategorie] = useState(null)
  const [aktiveLektion, setAktiveLektion] = useState(null)
  const [abgeschlosseneLektionen, setAbgeschlosseneLektionen] = useState(() => JSON.parse(localStorage.getItem("abgeschlosseneLektionen") || "[]"))
const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 0)

  function lektionAbschliessen(verdientXP) {
    if (!abgeschlosseneLektionen.includes(aktiveLektion.id)) {
      const neue = [...abgeschlosseneLektionen, aktiveLektion.id]
      setAbgeschlosseneLektionen(neue)
      localStorage.setItem("abgeschlosseneLektionen", JSON.stringify(neue))
    }
    const neueXP = xp + verdientXP
    setXp(neueXP)
    localStorage.setItem("xp", neueXP)
    setAktiveLektion(null)
  }

  function resetNav() {
    setAktiveHauptkategorie(null)
    setAktiveKategorie(null)
    setAktiveLektion(null)
  }

  return (
    <div className="app">
      <div className="content">
        {aktiverTab === "home" && !aktiveHauptkategorie && (
          <Startscreen xp={xp} onHauptkategorieClick={(id) => setAktiveHauptkategorie(id)} />
        )}
        {aktiverTab === "home" && aktiveHauptkategorie === "lernen" && !aktiveKategorie && (
          <LernpfadeScreen
            xp={xp}
            abgeschlosseneLektionen={abgeschlosseneLektionen}
            onKategorieClick={(k) => setAktiveKategorie(k)}
            onZurueck={() => setAktiveHauptkategorie(null)}
          />
        )}
        {aktiverTab === "home" && aktiveKategorie && !aktiveLektion && (
          <KategorieDetail
            kategorie={aktiveKategorie}
            abgeschlosseneLektionen={abgeschlosseneLektionen}
            onZurueck={() => setAktiveKategorie(null)}
            onLektionClick={(l) => setAktiveLektion(l)}
          />
        )}
        {aktiverTab === "home" && aktiveLektion && (
          <LektionScreen
            lektion={aktiveLektion}
            kategorie={aktiveKategorie}
            onZurueck={() => setAktiveLektion(null)}
            onAbgeschlossen={lektionAbschliessen}
          />
        )}
        {aktiverTab === "quest" && <div className="screen"><h1>Daily Quest</h1><p>Kommt bald.</p></div>}
        {aktiverTab === "profil" && (
  <ProfilScreen
    xp={xp}
    streak={streak}
    abgeschlosseneLektionen={abgeschlosseneLektionen}
  />
)}
        {aktiverTab === "rangliste" && <div className="screen"><h1>Rangliste</h1><p>Kommt bald.</p></div>}
      </div>
      <nav className="bottom-nav">
        {[
          { id: "home", icon: "🏠", label: "Home" },
          { id: "quest", icon: "⚔️", label: "Quest" },
          { id: "profil", icon: "👤", label: "Profil" },
          { id: "rangliste", icon: "🏆", label: "Rangliste" }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`nav-btn ${aktiverTab === tab.id ? "aktiv" : ""}`}
            onClick={() => { setAktiverTab(tab.id); resetNav() }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App