import { useState, useEffect, useRef } from "react"
import "./App.css"

console.log("APP VERSION 2.0 GELADEN")

const kategorien = [
  {
    id: 1,
    name: "ETF & Indexfonds",
    beschreibung: "Der einfachste Einstieg ins Investieren",
    icon: "📈",
    farbe: "#7C3AED",
    minLevel: 1,
    lektionenAnzahl: 12
  },
  {
    id: 2,
    name: "Aktien",
    beschreibung: "Einzelne Unternehmen analysieren und investieren",
    icon: "📊",
    farbe: "#9D174D",
    minLevel: 5,
    lektionenAnzahl: 10
  },
  {
    id: 3,
    name: "Krypto",
    beschreibung: "Bitcoin, Ethereum und digitale Assets verstehen",
    icon: "₿",
    farbe: "#7C3AED",
    minLevel: 10,
    lektionenAnzahl: 8
  },
  {
    id: 4,
    name: "Hebel & Optionen",
    beschreibung: "Fortgeschrittene Strategien für erfahrene Anleger",
    icon: "⚡",
    farbe: "#9D174D",
    minLevel: 15,
    lektionenAnzahl: 12
  },
  {
    id: 5,
    name: "Budgetierung & Sparen",
    beschreibung: "Geld verstehen, Geld behalten",
    icon: "💰",
    farbe: "#059669",
    minLevel: 1,
    lektionenAnzahl: 1
  },
  {
    id: 6,
    name: "Banking & Konten",
    beschreibung: "Tagesgeld, Broker & Notgroschen",
    icon: "🏦",
    farbe: "#0EA5E9",
    minLevel: 1,
    lektionenAnzahl: 3
  },
  {
    id: 7,
    name: "Steuern",
    beschreibung: "Steuern verstehen und legal sparen",
    icon: "📋",
    farbe: "#10B981",
    minLevel: 3,
    lektionenAnzahl: 3
  },
  {
    id: 8,
    name: "Immobilien",
    beschreibung: "Mieten, kaufen, finanzieren",
    icon: "🏠",
    farbe: "#F59E0B",
    minLevel: 8,
    lektionenAnzahl: 2
  },
  {
    id: 9,
    name: "Versicherungen",
    beschreibung: "Richtig absichern – ohne Abzocke",
    icon: "🛡️",
    farbe: "#8B5CF6",
    minLevel: 2,
    lektionenAnzahl: 2
  }
]

const hauptkategorien = [
  {
    id: "lernen",
    name: "Lernen",
    icon: "📚",
    beschreibung: "ETFs, Aktien, Krypto & mehr",
    gradient: "linear-gradient(135deg, #7C3AED, #9D174D)",
    verfuegbar: true
  },
  {
    id: "news",
    name: "News",
    icon: "📰",
    beschreibung: "Aktuelle Finanz-News",
    gradient: "linear-gradient(135deg, #4c1d95, #9D174D)",
    verfuegbar: true
  },
  {
    id: "rechner",
    name: "Rechner",
    icon: "🧮",
    beschreibung: "Zinseszins & Sparplan",
    gradient: "linear-gradient(135deg, #4a1d96, #6b21a8)",
    verfuegbar: true
  },
  {
    id: "challenges",
    name: "Challenges",
    icon: "🎯",
    beschreibung: "Wöchentliche Aufgaben",
    gradient: "linear-gradient(135deg, #831843, #9d174d)",
    verfuegbar: false
  }
]


const dailyQuests = [
  {
    id: "dq1",
    titel: "Was ist Inflation?",
    beschreibung: "Lerne warum dein Geld auf dem Konto jedes Jahr weniger wert wird.",
    xp: 15,
    fragen: [
      {
        text: "Was bedeutet Inflation?",
        antworten: ["Preise sinken", "Preise steigen – Geld verliert an Kaufkraft", "Die Wirtschaft wächst", "Zinsen steigen"],
        richtig: 1
      },
      {
        text: "Was passiert mit 1.000€ auf dem Konto bei 3% Inflation nach 10 Jahren?",
        antworten: ["Es werden mehr", "Es bleiben exakt 1.000€", "Die Kaufkraft sinkt auf ca. 740€", "Das Geld verdoppelt sich"],
        richtig: 2
      },
      {
        text: "Was schützt langfristig am besten vor Inflation?",
        antworten: ["Bargeld zuhause", "Tagesgeldkonto", "Investitionen in Sachwerte wie Aktien und ETFs", "Sparbuch"],
        richtig: 2
      }
    ]
  },
  {
    id: "dq2",
    titel: "Der Zinseszins-Effekt",
    beschreibung: "Verstehe die mächtigste Kraft im Investieren.",
    xp: 15,
    fragen: [
      {
        text: "Was ist der Zinseszins-Effekt?",
        antworten: ["Du bekommst Zinsen nur auf dein Startkapital", "Zinsen werden reinvestiert und selbst verzinst", "Zinsen werden jährlich ausgezahlt", "Der Zinssatz steigt jedes Jahr"],
        richtig: 1
      },
      {
        text: "Wer hat den Zinseszins als 'achtes Weltwunder' bezeichnet?",
        antworten: ["Warren Buffett", "Albert Einstein", "Elon Musk", "John Maynard Keynes"],
        richtig: 1
      },
      {
        text: "100€ bei 7% Rendite pro Jahr – wie viel sind es nach 30 Jahren?",
        antworten: ["210€", "310€", "761€", "1.500€"],
        richtig: 2
      }
    ]
  },
  {
    id: "dq3",
    titel: "Risiko & Rendite",
    beschreibung: "Warum höhere Rendite immer mehr Risiko bedeutet.",
    xp: 15,
    fragen: [
      {
        text: "Was gilt grundsätzlich für Risiko und Rendite?",
        antworten: ["Mehr Rendite = weniger Risiko", "Mehr Rendite = mehr Risiko", "Kein Zusammenhang", "Risiko ist immer gleich"],
        richtig: 1
      },
      {
        text: "Was ist ein risikoarmes Investment?",
        antworten: ["Einzelaktie eines Startups", "Bitcoin", "Tagesgeldkonto oder Staatsanleihen", "Hebelprodukte"],
        richtig: 2
      },
      {
        text: "Wie reduziert man Risiko beim Investieren?",
        antworten: ["Alles in eine Aktie", "Diversifikation – auf viele Anlagen verteilen", "Nur in Gold investieren", "Häufig kaufen und verkaufen"],
        richtig: 1
      }
    ]
  },
  {
    id: "dq4",
    titel: "Diversifikation verstehen",
    beschreibung: "Warum du nie alles auf eine Karte setzen solltest.",
    xp: 15,
    fragen: [
      {
        text: "Was bedeutet Diversifikation beim Investieren?",
        antworten: ["Alles in eine Aktie stecken", "Kapital auf viele verschiedene Anlagen verteilen", "Nur in Deutschland investieren", "Täglich kaufen und verkaufen"],
        richtig: 1
      },
      {
        text: "Welches Risiko lässt sich durch Diversifikation NICHT eliminieren?",
        antworten: ["Unternehmensrisiko", "Marktrisiko (systematisches Risiko)", "Branchenrisiko", "Managementrisiko"],
        richtig: 1
      },
      {
        text: "Was ist die 'Korrelation' bei Anlagen?",
        antworten: ["Der Zinssatz zwischen Banken", "Wie stark sich Anlagen gemeinsam bewegen", "Die jährliche Rendite", "Der Spread beim Kauf"],
        richtig: 1
      }
    ]
  },
  {
    id: "dq5",
    titel: "Steuern und Freibetrag",
    beschreibung: "Spare legal Steuern – das Wichtigste auf einen Blick.",
    xp: 15,
    fragen: [
      {
        text: "Wie hoch ist der Sparerpauschbetrag für Einzelpersonen in Deutschland?",
        antworten: ["500€", "801€", "1.000€", "2.500€"],
        richtig: 2
      },
      {
        text: "Was ist ein Freistellungsauftrag?",
        antworten: ["Eine Befreiung von der Einkommensteuer", "Ein Auftrag an die Depotbank Erträge bis zum Freibetrag steuerfrei zu lassen", "Eine staatliche Förderung", "Eine Versicherung gegen Verluste"],
        richtig: 1
      },
      {
        text: "Wie hoch ist die Abgeltungssteuer auf Kapitalerträge in Deutschland?",
        antworten: ["15%", "19%", "25% + Soli (ca. 26,4%)", "42%"],
        richtig: 2
      }
    ]
  },
  {
    id: "dq6",
    titel: "Behavioral Finance",
    beschreibung: "Wie Psychologie deine Investmententscheidungen sabotiert.",
    xp: 15,
    fragen: [
      {
        text: "Was ist der 'Confirmation Bias' beim Investieren?",
        antworten: ["Man kauft nur bestätigte Aktien", "Man sucht nur Informationen die die eigene Meinung bestätigen", "Man verkauft nur bei Gewinn", "Man investiert nur in bekannte Marken"],
        richtig: 1
      },
      {
        text: "Was ist 'Loss Aversion'?",
        antworten: ["Man vermeidet Aktien mit Verlust", "Verluste schmerzen psychologisch stärker als gleichgroße Gewinne", "Man verkauft nur bei starken Verlusten", "Man hält Verlustpositionen ewig"],
        richtig: 1
      },
      {
        text: "Was ist der 'Herd Effect' (Herdenverhalten)?",
        antworten: ["Investieren in Lebensmittelaktien", "Blind das tun was die Masse macht", "Nur in DAX-Aktien investieren", "Langfristig investieren"],
        richtig: 1
      }
    ]
  },
  {
    id: "dq7",
    titel: "Marktpsychologie",
    beschreibung: "Angst und Gier – die zwei Triebkräfte der Börse.",
    xp: 15,
    fragen: [
      {
        text: "Wer soll laut Warren Buffett ängstlich sein, wenn alle gierig sind?",
        antworten: ["Alle Anfänger", "Der clevere Investor", "Die Regierung", "Die Banken"],
        richtig: 1
      },
      {
        text: "Was ist Market Timing?",
        antworten: ["Den besten Kauf- und Verkaufszeitpunkt vorherzusagen", "Täglich den Markt beobachten", "Automatisch monatlich investieren", "ETFs kaufen statt Aktien"],
        richtig: 0
      },
      {
        text: "Was zeigt Forschung über Market Timing?",
        antworten: ["Profis schaffen es zuverlässig", "Kaum jemand schafft es langfristig – Time in market schlägt Timing the market", "Es funktioniert bei ETFs nicht, aber bei Aktien", "Mit KI ist Market Timing heute einfach"],
        richtig: 1
      }
    ]
  }
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
        { text: "Was ist der Cost-Averaging-Effekt?", antworten: ["Du kaufst immer zum gleichen Preis", "Du kaufst automatisch mehr Anteile wenn es günstig ist", "Du sparst Steuern durch regelmäßiges Kaufen", "Du vermeidest Verluste"], richtig: 1 },
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

Praxis-Tipp: Nutze neue Einzahlungen zum Rebalancen. Statt zu verkaufen (was Steuern auslöst) kaufst du einfach mehr vom untergewichteten ETF. Effizienter und steuerschonender.`,
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
  ],
  2: [
    {
      id: 101,
      titel: "Was ist eine Aktie – und warum macht sie dich zum Miteigentümer?",
      inhalt: `Eine Aktie ist kein Lottoschein und kein Glücksspiel. Eine Aktie ist ein echter Eigentumsanteil an einem Unternehmen.

Wenn du eine Apple-Aktie kaufst, bist du buchstäblich Miteigentümer von Apple Inc. Du hast Anrecht auf einen anteiligen Gewinn (Dividende) und ein Stimmrecht bei der Hauptversammlung.

Warum geben Unternehmen Aktien aus? Weil sie Kapital brauchen. Statt einen Bankkredit aufzunehmen, verkaufen sie Eigentumsanteile an die Öffentlichkeit – das nennt man einen Börsengang (IPO, Initial Public Offering).

Wie entsteht der Aktienkurs? Durch Angebot und Nachfrage. Wenn mehr Menschen Apple kaufen wollen als verkaufen, steigt der Kurs. Wenn mehr verkaufen als kaufen, fällt er. Der Kurs spiegelt also wider, was Millionen Marktteilnehmer glauben was das Unternehmen wert ist.

Aktionäre profitieren auf zwei Wegen:
1. Kursgewinne: Der Wert der Aktie steigt weil das Unternehmen wächst.
2. Dividenden: Das Unternehmen teilt Gewinne direkt aus.

Wichtig: Aktien sind volatiler als ETFs. Eine einzelne Aktie kann in einem Jahr 50% steigen – oder 80% fallen. Das ist keine Seltenheit. Deshalb ist Wissen über das Unternehmen entscheidend.`,
      xp: 20,
      fragen: [
        { text: "Was ist eine Aktie?", antworten: ["Ein Kredit an ein Unternehmen", "Ein Eigentumsanteil an einem Unternehmen", "Ein staatliches Sparprogramm", "Ein Derivat"], richtig: 1 },
        { text: "Wie entsteht der Aktienkurs?", antworten: ["Die Regierung legt ihn fest", "Das Unternehmen bestimmt ihn", "Durch Angebot und Nachfrage an der Börse", "Er ist fix"], richtig: 2 },
        { text: "Auf welche zwei Arten profitieren Aktionäre?", antworten: ["Zinsen und Dividenden", "Kursgewinne und Dividenden", "Dividenden und Staatsförderung", "Kursgewinne und Zinsen"], richtig: 1 }
      ]
    },
    {
      id: 102,
      titel: "Wie die Börse funktioniert – Handel, Kurse und Marktkapitalisierung",
      inhalt: `Die Börse ist kein mystischer Ort. Sie ist ein organisierter Marktplatz auf dem Käufer und Verkäufer zusammenfinden.

In Deutschland ist die wichtigste Börse die Frankfurter Wertpapierbörse (XETRA). Weltweit ist die New York Stock Exchange (NYSE) die größte. Heute läuft fast alles digital – kein Schreien im Handelssaal mehr.

Wie funktioniert ein Kauf?
Du platzierst eine Order bei deinem Broker. Es gibt zwei Typen:
- Market Order: Du kaufst zum aktuellen Marktpreis – sofort ausgeführt.
- Limit Order: Du gibst einen maximalen Kaufpreis an. Wird nur ausgeführt wenn der Kurs erreicht wird.

Was ist Marktkapitalisierung? Die Marktkapitalisierung (kurz: Marktcap) ist der Gesamtwert aller Aktien eines Unternehmens.

Formel: Aktienkurs × Anzahl der Aktien = Marktcap

Beispiel: Apple hat rund 15 Milliarden Aktien. Bei einem Kurs von 190$ wäre die Marktcap 2.850 Milliarden Dollar – also ca. 2,85 Billionen Dollar. Das macht Apple zu einem der wertvollsten Unternehmen der Welt.

Marktcap-Kategorien:
- Large Caps (>10 Mrd.): Stabile Großkonzerne (Apple, BASF)
- Mid Caps (2–10 Mrd.): Mittelgroße Unternehmen
- Small Caps (<2 Mrd.): Kleine Unternehmen, höheres Risiko, höheres Potential

Börsenzeiten: XETRA handelt von 9:00–17:30 Uhr. Außerhalb dieser Zeiten gibt es den nachbörslichen Handel – aber mit weniger Liquidität und größeren Spreads.`,
      xp: 20,
      fragen: [
        { text: "Was ist eine Limit Order?", antworten: ["Kauf zum aktuellen Marktpreis", "Kauf nur wenn ein bestimmter Preis erreicht wird", "Ein Dauerauftrag", "Eine Order ohne Preisgrenze"], richtig: 1 },
        { text: "Wie berechnet man die Marktkapitalisierung?", antworten: ["Jahresgewinn × 10", "Aktienkurs × Anzahl der Aktien", "Umsatz × Marge", "Eigenkapital + Schulden"], richtig: 1 },
        { text: "Was sind Small Caps?", antworten: ["Unternehmen mit unter 2 Mrd. Marktcap", "Unternehmen mit über 10 Mrd. Marktcap", "Staatsunternehmen", "Ausländische Unternehmen"], richtig: 0 }
      ]
    },
    {
      id: 103,
      titel: "Das Geschäftsmodell verstehen – Was macht ein Unternehmen wertvoll?",
      inhalt: `Bevor du eine Aktie kaufst, solltest du eine einzige Frage beantworten können: Wie verdient dieses Unternehmen Geld – und warum wird das auch in 10 Jahren noch funktionieren?

Warren Buffett nennt diesen Schutzwall "Moat" – Burggraben. Ein Unternehmen mit breitem Burggraben hat einen nachhaltigen Wettbewerbsvorteil.

Typen von Burggräben:
1. Netzwerkeffekte: Je mehr Nutzer, desto wertvoller. Facebook, WhatsApp, LinkedIn – du nutzt sie weil alle anderen sie nutzen.
2. Kostenvorteile: Amazon kann günstiger anbieten als jeder andere weil sie die größte Logistikinfrastruktur der Welt haben.
3. Wechselkosten: Wie wahrscheinlich ist es dass du von iPhone zu Android wechselst? Apple hat riesige Wechselkosten.
4. Marke/Pricing Power: Warum zahlen Menschen 4€ für einen Starbucks-Kaffee? Wegen der Marke. Preismacht ist Gold wert.
5. Regulatorische Vorteile: Banken, Versicherungen, Versorger – Lizenzen und Regulierung schützen vor neuen Konkurrenten.

Was sind schlechte Zeichen?
- Sinkende Margen trotz steigendem Umsatz (Wettbewerbsdruck)
- Hohe Schulden bei gleichzeitig fallendem Gewinn
- CEO verkauft massenweise eigene Aktien
- Kein klares Alleinstellungsmerkmal

Der erste Schritt der Aktienanalyse: Lies den Jahresbericht und erkläre jemandem in 3 Sätzen wie das Unternehmen Geld verdient. Wenn du es nicht erklären kannst – kauf es nicht.`,
      xp: 20,
      fragen: [
        { text: "Was bedeutet 'Moat' (Burggraben) bei einem Unternehmen?", antworten: ["Hohe Schulden", "Nachhaltiger Wettbewerbsvorteil", "Niedriger Aktienkurs", "Staatliche Beteiligung"], richtig: 1 },
        { text: "Was ist ein Netzwerkeffekt?", antworten: ["Gute Internetverbindung", "Je mehr Nutzer, desto wertvoller das Produkt", "Globale Expansion", "Gutes Marketing"], richtig: 1 },
        { text: "Was ist ein schlechtes Zeichen bei einem Unternehmen?", antworten: ["Steigende Dividenden", "Massenhafte Aktienverkäufe durch den CEO", "Wachsender Marktanteil", "Neue Produkte"], richtig: 1 }
      ]
    },
    {
      id: 104,
      titel: "Das KGV – die wichtigste Bewertungskennzahl für Aktien",
      inhalt: `Du hast zwei Unternehmen gefunden die du interessant findest. Aber wie weißt du ob die Aktie gerade günstig oder teuer ist? Hier kommt das KGV ins Spiel.

KGV steht für Kurs-Gewinn-Verhältnis (englisch: P/E Ratio – Price-to-Earnings).

Formel: KGV = Aktienkurs / Gewinn je Aktie

Beispiel: Eine Aktie kostet 100€. Das Unternehmen verdient 5€ pro Aktie. KGV = 100 / 5 = 20.

Was sagt das aus? Du zahlst 20€ für jeden Euro Jahresgewinn des Unternehmens. Oder anders: Es würde 20 Jahre dauern bis du deinen Einsatz nur über Gewinne zurückbekommst (ohne Wachstum).

KGV-Interpretation:
- KGV unter 15: Günstig (möglicherweise – oder das Unternehmen hat Probleme)
- KGV 15–25: Faire Bewertung für solide Unternehmen
- KGV über 30: Teuer – der Markt erwartet starkes Wachstum
- KGV über 100: Spekulativ – kaum gerechtfertigt durch aktuelle Gewinne

Wichtig: Das KGV allein sagt wenig. Ein KGV von 30 ist für Apple mit 15% Gewinnwachstum fair. Für ein schrumpfendes Unternehmen ist KGV 10 schon zu teuer.

Vergleiche immer innerhalb derselben Branche. Tech-Aktien haben historisch höhere KGVs als Banken oder Versorger.

Weitere wichtige Kennzahlen:
- KBV (Kurs-Buchwert-Verhältnis): Preis relativ zum Eigenkapital
- KUV (Kurs-Umsatz-Verhältnis): Für Unternehmen ohne Gewinn (Wachstumsphase)
- EV/EBITDA: Berücksichtigt auch Schulden`,
      xp: 25,
      fragen: [
        { text: "Wie berechnet man das KGV?", antworten: ["Umsatz / Aktienkurs", "Aktienkurs / Gewinn je Aktie", "Gewinn / Eigenkapital", "Dividende / Aktienkurs"], richtig: 1 },
        { text: "Was bedeutet ein sehr hohes KGV (über 100)?", antworten: ["Das Unternehmen ist sehr günstig", "Es ist eine sichere Anlage", "Der Markt erwartet starkes Wachstum – es ist spekulativ", "Das Unternehmen macht hohe Gewinne"], richtig: 2 },
        { text: "Warum sollte man KGVs innerhalb derselben Branche vergleichen?", antworten: ["Weil Branchen unterschiedliche Wachstumsraten haben", "Weil das Gesetz es vorschreibt", "Weil es einfacher ist", "Weil internationale Vergleiche verboten sind"], richtig: 0 }
      ]
    },
    {
      id: 105,
      titel: "Dividendenstrategie – passives Einkommen aus Aktien",
      inhalt: `Stell dir vor, du bekommst jeden Quartal Geld auf dein Konto – einfach weil du Aktionär bist. Das ist die Dividendenstrategie.

Was ist eine Dividende? Eine Dividende ist eine Gewinnausschüttung an Aktionäre. Unternehmen die mehr Geld verdienen als sie sinnvoll reinvestieren können, zahlen Überschüsse an Aktionäre aus.

Dividendenrendite: Dividende pro Aktie / Aktienkurs × 100

Beispiel: Aktie kostet 50€, zahlt 2€ Dividende pro Jahr. Dividendenrendite = 4%.

Gute Dividendenaktien:
- Dividendenrendite 3–6% ist attraktiv
- Über 8%: Vorsicht – oft unsustainabel
- Dividendenwachstum wichtiger als hohe Ausschüttung

"Dividendenaristokraten" sind Unternehmen die ihre Dividende über 25+ Jahre erhöht haben. In den USA: Coca-Cola, Johnson & Johnson, Procter & Gamble. In Deutschland: Allianz, Munich Re.

Ex-Dividendentag: Du musst die Aktie VOR dem Ex-Dividendentag halten um die Dividende zu bekommen. Am Ex-Dividendentag wird der Kurs um die Dividendenhöhe bereinigt – du "kaufst" die Dividende also nicht einfach kurz vorher.

Steuern auf Dividenden: In Deutschland zahlst du 26,375% Abgeltungssteuer auf Dividenden – sofort bei Ausschüttung.

Dividenden vs. Wachstumsaktien: Unternehmen die alle Gewinne reinvestieren (Amazon früher, Tesla) zahlen keine Dividende aber können stärker wachsen. Dividendenaktien passen zu Anlegern die Cashflow wollen.`,
      xp: 25,
      fragen: [
        { text: "Wie berechnet man die Dividendenrendite?", antworten: ["Aktienkurs / Dividende", "Dividende / Aktienkurs × 100", "Gewinn / Dividende", "Dividende × KGV"], richtig: 1 },
        { text: "Was sind Dividendenaristokraten?", antworten: ["Aktien mit über 10% Rendite", "Unternehmen die 25+ Jahre ihre Dividende erhöht haben", "Staatliche Unternehmen mit hoher Ausschüttung", "ETFs auf Dividendenaktien"], richtig: 1 },
        { text: "Was passiert am Ex-Dividendentag mit dem Aktienkurs?", antworten: ["Er steigt um die Dividendenhöhe", "Er wird um die Dividendenhöhe bereinigt (fällt)", "Nichts", "Er verdoppelt sich"], richtig: 1 }
      ]
    },
    {
      id: 106,
      titel: "Fundamentalanalyse Teil 1 – Bilanz und Gewinn-und-Verlust-Rechnung",
      inhalt: `Um Aktien zu bewerten musst du Jahresberichte lesen. Das klingt einschüchternd – aber du brauchst nur drei Dokumente zu verstehen.

1. Bilanz (Balance Sheet)
Die Bilanz ist eine Momentaufnahme: Was besitzt das Unternehmen (Aktiva) und wie ist das finanziert (Passiva)?

Aktiva = Passiva (immer!)

Aktiva:
- Umlaufvermögen: Cash, Forderungen, Vorräte
- Anlagevermögen: Gebäude, Maschinen, Patente

Passiva:
- Eigenkapital: Was den Aktionären gehört
- Schulden: Verbindlichkeiten gegenüber Banken, Lieferanten

Wichtige Kennzahl: Eigenkapitalquote = Eigenkapital / Gesamtkapital. Über 30% ist solide.

2. Gewinn-und-Verlust-Rechnung (Income Statement)
Sie zeigt ob das Unternehmen in einem Zeitraum Geld verdient hat.

Struktur:
Umsatz (Revenue)
− Kosten der verkauften Waren (COGS)
= Bruttogewinn
− Betriebskosten (Marketing, Gehälter, Miete)
= EBIT (Betriebsgewinn)
− Zinsen, Steuern
= Nettogewinn

EBIT-Marge = EBIT / Umsatz. Über 15% ist attraktiv.

3. Kapitalflussrechnung (Cash Flow Statement)
Zeigt wie viel echtes Geld rein und raus geht – nicht buchhalterische Gewinne. Warren Buffett schaut hier zuerst hin.

Free Cash Flow = Cash aus Betrieb − Investitionsausgaben. Positiver FCF bedeutet das Unternehmen generiert echtes Geld.`,
      xp: 25,
      fragen: [
        { text: "Was zeigt die Bilanz?", antworten: ["Den Jahresgewinn", "Einnahmen und Ausgaben", "Aktiva und Passiva – eine Momentaufnahme des Vermögens", "Die Dividendenhistorie"], richtig: 2 },
        { text: "Was ist EBIT?", antworten: ["Einnahmen vor Investitionen und Tilgung", "Betriebsgewinn vor Zinsen und Steuern", "Gesamtumsatz abzüglich Personalkosten", "Eigenkapital vor Investitionen"], richtig: 1 },
        { text: "Warum ist der Free Cash Flow wichtig?", antworten: ["Er zeigt den Aktienkurs", "Er zeigt echtes Geld das das Unternehmen generiert", "Er ist gleich dem Nettogewinn", "Er zeigt die Dividendenhöhe"], richtig: 1 }
      ]
    },
    {
      id: 107,
      titel: "Fundamentalanalyse Teil 2 – DCF-Bewertung",
      inhalt: `Die Discounted-Cash-Flow-Analyse (DCF) ist die theoretisch solideste Methode um den fairen Wert einer Aktie zu berechnen. Warnung: Sie ist komplex, aber das Grundprinzip ist elegant.

Kernidee: 100€ heute sind mehr wert als 100€ in 10 Jahren (wegen Inflation und Opportunitätskosten). Zukünftige Gewinne müssen also auf den heutigen Wert "abdiskontiert" werden.

Formel vereinfacht:
Fairer Wert = Summe aller zukünftigen Free Cash Flows, diskontiert auf heute

Diskontierungssatz: Typisch 8–12% – das ist die Rendite die Anleger alternativ erwarten könnten.

Schritt-für-Schritt:
1. Schätze die Free Cash Flows der nächsten 5–10 Jahre (z.B. 15% Wachstum)
2. Schätze den "Terminal Value" – den Wert nach dem Betrachtungszeitraum
3. Diskontiere alles mit deinem Diskontierungssatz
4. Addiere alles → das ist der faire Unternehmenswert
5. Teile durch Aktienanzahl → fairer Aktienkurs

Problem: Garbage in, garbage out. Die Ergebnisse hängen stark von deinen Annahmen ab. Ändere die Wachstumsrate von 15% auf 10% – der faire Wert halbiert sich.

Praxis-Tipp: Verwende DCF um eine Größenordnung zu bekommen und mehrere Szenarien durchzurechnen. Kombiniere es mit KGV und Branchenvergleichen für ein vollständiges Bild.

DCF ist kein Orakel – es ist ein strukturierter Denkrahmen.`,
      xp: 25,
      fragen: [
        { text: "Was ist das Grundprinzip der DCF-Analyse?", antworten: ["Aktuelle Gewinne × 20", "Zukünftige Cash Flows auf den heutigen Wert abdiskontieren", "Dividenden der letzten 10 Jahre addieren", "Marktcap / Umsatz berechnen"], richtig: 1 },
        { text: "Was bedeutet 'Garbage in, garbage out' bei der DCF?", antworten: ["Die Software hat Fehler", "Das Ergebnis ist nur so gut wie die zugrunde liegenden Annahmen", "Man braucht viele Daten", "DCF funktioniert nicht"], richtig: 1 },
        { text: "Was ist der Diskontierungssatz typischerweise?", antworten: ["1–2%", "5–6%", "8–12%", "20–30%"], richtig: 2 }
      ]
    },
    {
      id: 108,
      titel: "Technische Analyse – Charts lesen und Trends erkennen",
      inhalt: `Die Fundamentalanalyse fragt: Was ist das Unternehmen wert? Die technische Analyse fragt: Was macht der Kurs gerade?

Technische Analysten glauben dass alle relevanten Informationen bereits im Kurs eingepreist sind und historische Kursmuster sich wiederholen.

Grundbegriffe:

Trend: Kurse bewegen sich in Trends.
- Aufwärtstrend: Höhere Hochs, höhere Tiefs
- Abwärtstrend: Niedrigere Hochs, niedrigere Tiefs
- Seitwärtstrend (Konsolidierung): Kurs bewegt sich in einer Range

Support & Resistance (Unterstützung & Widerstand):
- Support: Preislevel wo der Kurs oft "abprallt" und steigt
- Resistance: Preislevel wo der Kurs oft stoppt und fällt
- Wenn Resistance gebrochen wird, wird es oft zu Support

Gleitende Durchschnitte (Moving Averages):
- 50-Tage-MA: Kurzfristiger Trend
- 200-Tage-MA: Langfristiger Trend
- "Golden Cross": 50-MA kreuzt 200-MA von unten – bullisches Signal
- "Death Cross": 50-MA kreuzt 200-MA von oben – bärisches Signal

RSI (Relative Strength Index): Misst ob eine Aktie überkauft (>70) oder überverkauft (<30) ist.

MACD: Momentum-Indikator der Trendsignale gibt.

Ehrliche Einschätzung: Technische Analyse funktioniert manchmal, scheitert oft. Für langfristige Anleger ist sie weniger relevant als die Fundamentalanalyse. Sie ist nützlich um Einstiegszeitpunkte zu optimieren.`,
      xp: 20,
      fragen: [
        { text: "Was ist ein 'Golden Cross' in der technischen Analyse?", antworten: ["Der Kurs verdoppelt sich", "Der 50-Tage-MA kreuzt den 200-Tage-MA von unten", "Ein neues Allzeithoch", "Eine Dividendenerhöhung"], richtig: 1 },
        { text: "Was zeigt der RSI an?", antworten: ["Den Jahresgewinn", "Ob eine Aktie überkauft oder überverkauft ist", "Den Unterschied zum DAX", "Die Dividendenrendite"], richtig: 1 },
        { text: "Was ist ein Support-Level?", antworten: ["Ein Preis wo Aktien teuer sind", "Ein Preislevel wo der Kurs oft abprallt und steigt", "Der aktuelle Aktienkurs", "Das 52-Wochen-Hoch"], richtig: 1 }
      ]
    },
    {
      id: 109,
      titel: "Portfolio-Analyse – Diversifikation bei Einzelaktien",
      inhalt: `Wenn du Einzelaktien kaufst, ist Portfolio-Management entscheidend. Hier machen die meisten Anfänger den größten Fehler: zu viel Konzentration.

Wie viele Aktien braucht ein Portfolio?
Studien zeigen dass mit 20–30 verschiedenen Aktien aus verschiedenen Branchen das unsystematische Risiko (unternehmens-spezifische Risiken) fast vollständig eliminiert ist. Mit 50+ Aktien hast du de facto einen ETF.

Diversifikation nach Branchen:
- Technologie (wachstumsstark, aber volatil)
- Gesundheit (defensiv, krisenresistent)
- Finanzen (zinssensitiv)
- Konsum (stabil)
- Energie (zyklisch)
- Versorger (defensiv, dividendenstark)

Wichtige Konzepte:

Beta: Misst wie stark eine Aktie mit dem Markt schwankt.
- Beta 1: Schwankt wie der Markt
- Beta >1: Schwankt stärker als der Markt (volatiler)
- Beta <1: Schwankt weniger als der Markt (defensiver)

Korrelation: Gute Diversifikation bedeutet Aktien zu wählen die nicht alle gleichzeitig steigen und fallen. Öl-Aktien und Airline-Aktien korrelieren negativ – wenn Öl teuer wird, leiden Airlines.

Position Sizing:
- Maximal 5–10% in eine einzelne Aktie
- Hochrisiko-Positionen kleiner halten (2–3%)
- Mindestens in 3 verschiedene Branchen investieren

Stop-Loss: Automatische Verkaufsorder wenn der Kurs unter X% fällt. Schützt vor katastrophalen Verlusten.`,
      xp: 25,
      fragen: [
        { text: "Ab wie vielen Aktien ist das unternehmens-spezifische Risiko fast eliminiert?", antworten: ["5", "10", "20–30", "100"], richtig: 2 },
        { text: "Was bedeutet Beta > 1 bei einer Aktie?", antworten: ["Die Aktie ist günstig bewertet", "Die Aktie schwankt stärker als der Markt", "Die Aktie zahlt hohe Dividenden", "Die Aktie ist sehr groß"], richtig: 1 },
        { text: "Was ist ein sinnvoller maximaler Anteil für eine einzelne Aktie im Portfolio?", antworten: ["1–2%", "5–10%", "25%", "50%"], richtig: 1 }
      ]
    },
    {
      id: 110,
      titel: "Deine erste Aktie – von der Analyse zum Kauf",
      inhalt: `Du hast jetzt alle Werkzeuge. Es ist Zeit sie anzuwenden. Hier ist eine konkrete Schritt-für-Schritt-Anleitung zum ersten Aktienkauf.

Schritt 1: Unternehmen finden
Fang mit Unternehmen an die du kennst und nutzt. Nutzt du täglich Apple-Produkte? Kaufst du bei Amazon? Trinkst du Coca-Cola? Persönliche Erfahrung ist ein valider Startpunkt.

Schritt 2: Den Burggraben identifizieren
Schreib 3 Sätze warum dieses Unternehmen in 10 Jahren noch erfolgreich sein wird. Wenn du es nicht kannst – skipps es.

Schritt 3: Zahlen prüfen
- KGV im Branchenvergleich fair?
- Wächst der Gewinn die letzten 3 Jahre?
- Ist die Verschuldung kontrollierbar?
- Free Cash Flow positiv?

Schritt 4: Bewertung einschätzen
Vergleiche das aktuelle KGV mit dem historischen Durchschnitt. Ist es günstiger als üblich? Wenn nicht – warte oder kaufe einen kleinen Starter.

Schritt 5: Kaufen und dokumentieren
Kaufe und schreib sofort auf: Warum habe ich gekauft, bei welchem Kurs, was muss eintreten damit ich behalte, unter welchen Umständen verkaufe ich?

Schritt 6: Beobachten – aber nicht täglich schauen
Quartalsberichte lesen, Strategie überprüfen, aber nicht bei jedem -5% in Panik verfallen.

Denk dran: Du bist Miteigentümer – nicht Spekulant. Denk in Jahren, nicht in Tagen.`,
      xp: 30,
      fragen: [
        { text: "Mit welchen Unternehmen sollte man als Anfänger bei Aktien starten?", antworten: ["Den kleinsten, unbekanntesten", "Unternehmen die man kennt und nutzt", "Nur ausländischen Aktien", "Nur Technologiefirmen"], richtig: 1 },
        { text: "Was solltest du nach dem Kauf einer Aktie dokumentieren?", antworten: ["Nichts", "Nur den Kaufpreis", "Warum du gekauft hast, Kaufkurs und Verkaufsbedingungen", "Tägliche Kursschwankungen"], richtig: 2 },
        { text: "Wie sollte man als langfristiger Aktionär denken?", antworten: ["In Tagen und Wochen", "In Minuten (Day-Trading)", "In Jahren, als Miteigentümer", "In Quartalen für schnelle Gewinne"], richtig: 2 }
      ]
    }
  ],
  3: [
    {
      id: 201,
      titel: "Was ist Bitcoin – Geld ohne Bank?",
      inhalt: `2008 veröffentlichte eine Person (oder Gruppe) unter dem Pseudonym "Satoshi Nakamoto" ein Whitepaper mit dem Titel "Bitcoin: A Peer-to-Peer Electronic Cash System". Es veränderte die Finanzwelt für immer.

Bitcoin ist digitales Geld das ohne Banken, Regierungen oder andere Zwischenhändler funktioniert. Transaktionen werden direkt zwischen Nutzern abgewickelt – Peer-to-Peer.

Die Blockchain: Alle Bitcoin-Transaktionen werden in einer öffentlichen, unveränderlichen Datenbank gespeichert – der Blockchain. Sie wird von tausenden Computern weltweit (Nodes) gleichzeitig gespeichert. Niemand kann sie manipulieren, weil er alle Kopien gleichzeitig ändern müsste.

Mining: Neue Transaktionen werden in Blöcke gepackt und durch Computer-Rechenarbeit validiert ("Proof of Work"). Die Miner die das lösen, bekommen Bitcoin als Belohnung. Dieses System schützt das Netzwerk vor Betrug.

Wichtige Eigenschaften von Bitcoin:
- Maximale Menge: 21 Millionen Bitcoin werden jemals existieren. Nicht mehr.
- Dezentralisiert: Keine zentrale Kontrolle
- Pseudonym: Adressen sind öffentlich, Besitzer nicht direkt
- Teilbar: 1 Bitcoin = 100 Millionen Satoshi

Warum steigt der Preis? Weil das Angebot fix ist (21 Mio.) aber die Nachfrage steigt. Wenn mehr Menschen, Institutionen und Länder Bitcoin kaufen wollen, muss der Preis steigen.`,
      xp: 20,
      fragen: [
        { text: "Wie viele Bitcoin werden maximal jemals existieren?", antworten: ["100 Millionen", "21 Millionen", "1 Milliarde", "Unbegrenzt"], richtig: 1 },
        { text: "Was ist die Blockchain?", antworten: ["Eine zentrale Datenbank einer Bank", "Eine öffentliche, unveränderliche Datenbank aller Transaktionen", "Ein Krypto-Börsenprogramm", "Eine digitale Brieftasche"], richtig: 1 },
        { text: "Was ist Mining bei Bitcoin?", antworten: ["Bitcoin physisch abbauen", "Transaktionen durch Rechenarbeit validieren und dafür belohnt werden", "Bitcoin kaufen und verkaufen", "Neue Bitcoin erfinden"], richtig: 1 }
      ]
    },
    {
      id: 202,
      titel: "Was ist Ethereum – die Plattform für Smart Contracts",
      inhalt: `Bitcoin ist digitales Geld. Ethereum ist etwas anderes: eine programmierbare Blockchain – eine Art dezentraler Computer.

2015 von Vitalik Buterin ins Leben gerufen, ist Ethereum die zweitgrößte Kryptowährung. Aber seine Bedeutung geht weit über eine Währung hinaus.

Smart Contracts sind selbstausführende Programme die auf der Blockchain laufen. Sie funktionieren nach dem Prinzip: "Wenn Bedingung X erfüllt ist, führe Aktion Y aus" – automatisch, ohne Vermittler.

Beispiel: Du möchtest eine Wohnung mieten. Statt einem Makler schließt du einen Smart Contract ab: "Wenn X ETH gezahlt wird, wird der Schlüsselcode übertragen." Vollautomatisch, unveränderlich, kein Vertrauen in Dritte nötig.

Ether (ETH) ist die Währung des Ethereum-Netzwerks. Du brauchst ETH um Transaktionen durchzuführen – das nennt sich "Gas".

Was läuft auf Ethereum?
- DeFi-Protokolle (dezentrale Finanzanwendungen)
- NFT-Marktplätze
- DAOs (dezentrale autonome Organisationen)
- Stablecoins (USDC, DAI)

Ethereum 2.0 / The Merge: 2022 wechselte Ethereum von "Proof of Work" zu "Proof of Stake". Statt Energie zu verbrauchen, "staken" Validatoren ETH als Sicherheit. Energieverbrauch sank um 99,95%.

ETH als Investment: Ethereum hat einen Utility-Wert – man braucht es um das Netzwerk zu nutzen. Das unterscheidet es grundlegend von Bitcoin.`,
      xp: 20,
      fragen: [
        { text: "Was ist ein Smart Contract?", antworten: ["Ein digitaler Kaufvertrag der per E-Mail verschickt wird", "Ein selbstausführendes Programm auf der Blockchain", "Eine Art Krypto-Versicherung", "Ein Vertrag zwischen Minern"], richtig: 1 },
        { text: "Wofür braucht man ETH im Ethereum-Netzwerk?", antworten: ["Um neue Coins zu erstellen", "Als Gas – um Transaktionen durchzuführen", "Um Ethereum zu kaufen", "Um sich anzumelden"], richtig: 1 },
        { text: "Was war die Auswirkung des Wechsels zu Proof of Stake ('The Merge')?", antworten: ["Bitcoin wurde teurer", "Ethereum wurde schneller", "Energieverbrauch sank um 99,95%", "ETH wurde unbegrenzt"], richtig: 2 }
      ]
    },
    {
      id: 203,
      titel: "Wallets – wie du Krypto sicher aufbewahrst",
      inhalt: `"Not your keys, not your coins." Dieses Krypto-Sprichwort ist lebensnotwendig. Wer Krypto nicht selbst verwahrt, besitzt es nicht wirklich.

Was ist ein Wallet? Ein Wallet speichert keine Coins – die existieren auf der Blockchain. Ein Wallet speichert deinen privaten Schlüssel – den Beweis dass du Zugang zu diesen Coins hast.

Private Key: Eine 256-Bit-Zahl (usually 24 Wörter als "Seed Phrase"). Wer deinen Private Key kennt, hat Zugang zu all deinen Coins. Für immer. Unwiderruflich.

Typen von Wallets:

Hot Wallets (internetverbunden):
- Exchange-Wallet: Krypto liegt bei einer Börse (Binance, Coinbase). Bequem, aber riskant – Börsen können gehackt werden oder bankrottgehen (FTX!).
- Software Wallet: App auf dem Handy/PC (MetaMask, Trust Wallet). Du kontrollierst den Key – besser als Exchange.

Cold Wallets (offline):
- Hardware Wallet: Physisches Gerät (Ledger, Trezor). Private Key verlässt das Gerät nie. Sicherste Option.
- Paper Wallet: Key auf Papier ausgedruckt. Sicher vor Hackern, aber Feuer/Wasser gefährdet.

Seed Phrase: Die 12 oder 24 Wörter die dein Wallet wiederherstellen. Schreib sie auf Papier (nicht digital!), lagere sie sicher, teile sie mit NIEMANDEM.

Best Practices:
- Kleine Beträge auf Exchange für schnellen Zugang
- Große Beträge auf Hardware Wallet
- Seed Phrase sicher und mehrfach gespeichert`,
      xp: 25,
      fragen: [
        { text: "Was speichert ein Krypto-Wallet?", antworten: ["Die Coins direkt", "Den privaten Schlüssel für den Zugang zu Coins", "Eine Datenbank aller Transaktionen", "Den Wechselkurs"], richtig: 1 },
        { text: "Was ist die sicherste Aufbewahrungsmethode für große Krypto-Beträge?", antworten: ["Exchange-Wallet", "Software-Wallet", "Hardware-Wallet (Ledger/Trezor)", "Screenshot des Private Keys"], richtig: 2 },
        { text: "Was soll man mit der Seed Phrase tun?", antworten: ["In einer Cloud speichern", "Per E-Mail an sich selbst schicken", "Auf Papier schreiben und sicher lagern", "Einem Freund mitteilen"], richtig: 2 }
      ]
    },
    {
      id: 204,
      titel: "DeFi – Decentralized Finance erklärt",
      inhalt: `Was wenn du Zinsen verdienen, Kredite aufnehmen oder Währungen tauschen könntest – ohne Bank, ohne Genehmigung, rund um die Uhr?

Das ist DeFi: Decentralized Finance. Ein alternatives Finanzsystem das auf Blockchains (hauptsächlich Ethereum) läuft.

Kernkonzepte:

Liquidity Pools & Automated Market Makers (AMMs):
Statt eines traditionellen Orderbuchs nutzen DeFi-Börsen (DEXes wie Uniswap) Liquiditätspools. Nutzer stellen Kapitalpools zur Verfügung und verdienen Gebühren wenn andere tauschen. Keine Gegenpartei nötig – der Smart Contract macht alles.

Lending Protocols (Aave, Compound):
Du kannst Krypto hinterlegen und Zinsen verdienen. Oder du hinterlegst Krypto als Sicherheit und leihst dir andere Assets. Vollautomatisch, auf der Blockchain.

Yield Farming:
Du bewegst Kapital zwischen Protokollen um maximale Rendite zu erzielen. Hohe Chancen, aber auch hohe Risiken (Liquidation, Impermanent Loss, Smart Contract Bugs).

Stablecoins:
USDC und USDT sind zentrale Stablecoins (von Unternehmen ausgegeben). DAI ist ein dezentraler Stablecoin der durch Krypto überbesichert ist.

Risiken von DeFi:
- Smart Contract Risiko: Bugs in Code können Funds verlieren
- Liquidationsrisiko: Fällt deine Sicherheit unter Schwellenwert → automatische Liquidation
- Rug Pulls: Betrüger erstellen Protokolle, ziehen dann Liquidität ab
- Regulierung: Rechtlicher Status unklar in vielen Ländern

DeFi ist spannend aber fortgeschritten. Starte mit kleinen Beträgen und lerne die Mechaniken verstehen.`,
      xp: 25,
      fragen: [
        { text: "Was ist ein Liquidity Pool in DeFi?", antworten: ["Ein Bankkonto in Krypto", "Ein Kapitalpool von Nutzern der Tauschgeschäfte ermöglicht", "Eine Liste von Krypto-Preisen", "Ein Kreditrahmen von einer Bank"], richtig: 1 },
        { text: "Was ist ein Rug Pull?", antworten: ["Eine technische Sicherheitsfunktion", "Betrüger die ein Protokoll erstellen und dann Liquidität abziehen", "Eine Art Stablecoin", "Ein DeFi-Zinssatz"], richtig: 1 },
        { text: "Was ist DAI?", antworten: ["Eine Bitcoin-Variante", "Ein zentral ausgegebener Stablecoin", "Ein dezentraler Stablecoin der durch Krypto besichert ist", "Eine DeFi-Börse"], richtig: 2 }
      ]
    },
    {
      id: 205,
      titel: "NFTs – Was steckt wirklich dahinter?",
      inhalt: `2021 verkaufte der Künstler Beeple ein digitales Bild für 69 Millionen Dollar. Die Welt fragte: Was?

NFT steht für Non-Fungible Token – nicht-austauschbarer Token. Der Gegensatz zu fungiblen Assets: Ein Euro ist fungibel (austauschbar gegen jeden anderen Euro). Ein NFT ist einzigartig.

Wie funktionieren NFTs technisch? Ein NFT ist ein Smart Contract auf einer Blockchain (meist Ethereum) der ein einzigartiges Objekt repräsentiert und die Eigentumshistorie unveränderlich aufzeichnet.

Was kann ein NFT sein?
- Digitale Kunst (JPEG, Video, Musik)
- Gaming-Items
- Domain-Namen
- Event-Tickets
- Mitgliedschaften/Zugangsrechte

Wichtiger Punkt: Ein NFT beweist Eigentum am Token – nicht am Inhalt. Jeder kann das Bild von Beeple kopieren. Der NFT-Inhaber hat nur den Nachweis "dieses Token gehört mir" auf der Blockchain.

NFT-Hype und Absturz: 2021 explodierten Preise für Bored Ape Yacht Club, CryptoPunks und andere Collections. 2022 fielen 95%+ der NFT-Werte. Die meisten sind heute wertlos.

Legitime Anwendungsfälle:
- Gaming: In-Game-Items die man wirklich besitzt und verkaufen kann
- Ticketing: Fälschungssichere Konzerttickets
- Kunst: Neue Monetarisierungswege für digitale Künstler
- Credentials: Zertifikate und Abschlüsse auf der Blockchain

NFTs als Spekulation: Extrem riskant. Nur investieren was man komplett verlieren kann.`,
      xp: 20,
      fragen: [
        { text: "Was ist der Unterschied zwischen fungibel und non-fungibel?", antworten: ["Nichts", "Fungible Assets sind austauschbar (wie Euro), non-fungible sind einzigartig", "NFTs sind teurer", "Non-fungible Assets existieren nur digital"], richtig: 1 },
        { text: "Was beweist ein NFT?", antworten: ["Eigentum am digitalen Inhalt selbst", "Eigentum am Token auf der Blockchain", "Das Bild kann nicht kopiert werden", "Der NFT zahlt Dividenden"], richtig: 1 },
        { text: "Was passierte mit den meisten NFT-Preisen nach dem Hype 2021?", antworten: ["Sie stiegen weiter", "Sie blieben stabil", "Sie fielen um 95%+", "Sie wurden zu Aktien"], richtig: 2 }
      ]
    },
    {
      id: 206,
      titel: "Krypto-Steuern in Deutschland – was du wissen MUSST",
      inhalt: `In Deutschland ist Krypto steuerlich geregelt – und die Regeln sind strenger als viele denken. Unwissenheit schützt nicht vor Strafe.

Krypto gilt in Deutschland als "privates Veräußerungsgeschäft" (§23 EStG) – NICHT als Kapitalanlage wie Aktien.

Das bedeutet: Gewinne aus Krypto-Verkäufen unterliegen NICHT der Abgeltungssteuer (25%), sondern deinem persönlichen Einkommensteuersatz (bis zu 45%!).

Die wichtigste Regel: Haltefristen.

1-Jahres-Regel: Wenn du Krypto länger als 1 Jahr hältst und dann verkaufst – komplett steuerfrei. Egal wie hoch der Gewinn.

Unter 1 Jahr gehalten → volle Einkommensteuer auf Gewinn.
Ausnahme: Freigrenze von 1.000€ pro Jahr (ab 2024). Gewinne darunter → steuerfrei.

Steuerpflichtige Ereignisse:
- Verkauf von Krypto gegen Euro → steuerpflichtig (wenn Gewinn)
- Tausch Krypto gegen Krypto (z.B. BTC zu ETH) → steuerpflichtig!
- DeFi-Erträge, Mining, Staking → steuerpflichtig als Einkünfte

FIFO-Methode: Deutschland verwendet grundsätzlich FIFO (First In, First Out). Du hast 1 BTC im Jan 2023 gekauft und 1 BTC im Mai 2023. Wenn du im Feb 2025 1 BTC verkaufst, gilt der aus Jan 2023 als verkauft (über 1 Jahr → steuerfrei).

Tools: Koinly, CoinTracking oder Blockpit helfen bei der Steuererklärung.

Wichtig: Alle Transaktionen dokumentieren – Datum, Preis, Menge. Rückwirkend ist es oft schwer zu rekonstruieren.`,
      xp: 25,
      fragen: [
        { text: "Wie werden Krypto-Gewinne in Deutschland besteuert?", antworten: ["Mit 25% Abgeltungssteuer", "Mit dem persönlichen Einkommensteuersatz", "Komplett steuerfrei", "Mit 19% Mehrwertsteuer"], richtig: 1 },
        { text: "Was gilt für Krypto das länger als 1 Jahr gehalten wird?", antworten: ["Höhere Steuer", "Normale Abgeltungssteuer", "Komplett steuerfrei beim Verkauf", "Muss gemeldet werden aber nicht versteuert"], richtig: 2 },
        { text: "Ist der Tausch von BTC zu ETH ein steuerpflichtiges Ereignis?", antworten: ["Nein, nur Verkauf gegen Euro", "Ja, Tausch Krypto gegen Krypto ist steuerpflichtig", "Nur bei Beträgen über 10.000€", "Nur bei Gewinn über 1.000€"], richtig: 1 }
      ]
    },
    {
      id: 207,
      titel: "Krypto-Marktzyklen und Psychologie",
      inhalt: `Kryptomärkte sind extrem volatil. Bitcoin hat in seiner Geschichte mehrfach über 80% verloren – und sich jedes Mal erholt und neue Allzeithochs erreicht. Das Muster hinter diesen Bewegungen ist Psychologie.

Der Krypto-Zyklus:

1. Akkumulation: Nach dem Crash kaufen "Smart Money" (erfahrene Investoren) leise. Preise sind niedrig, Stimmung depressiv.

2. Early Bull: Frühe Mover merken die steigende Nachfrage. Preise beginnen zu steigen. Medien berichten.

3. FOMO-Phase: "Fear Of Missing Out" – Mainstream entdeckt Krypto. Alle wollen kaufen. Preise explodieren.

4. Euphorie: Taxi-Fahrer geben Krypto-Tipps. Influencer versprechen Lamborghini. Jeder ist ein Genie.

5. Distribution: Smart Money verkauft leise an FOMO-Käufer.

6. Crash: Liquidität fehlt. Preise kollabieren. Panikverkäufe.

7. Capitulation: Der letzte hoffnungsvolle Anleger gibt auf. Maximale Angst. Zurück zu Phase 1.

Fear & Greed Index: Ein täglicher Index der die Marktstimmung misst. Extreme Angst → oft guter Kaufzeitpunkt. Extreme Gier → Vorsicht.

Bitcoin Halving: Alle ~4 Jahre wird die Mining-Belohnung halbiert (Angebot sinkt). Historisch folgt innerhalb 12–18 Monate ein starker Bull Market.

Fazit: Kaufe wenn alle verkaufen. Verkaufe wenn alle kaufen. Einfach gesagt, unglaublich schwer umgesetzt – wegen Psychologie.`,
      xp: 25,
      fragen: [
        { text: "Was ist FOMO in Kryptomärkten?", antworten: ["Ein technisches Handelssignal", "Fear Of Missing Out – Angst etwas zu verpassen treibt irrationale Käufe", "Ein Krypto-Token", "Ein Typ Smart Contract"], richtig: 1 },
        { text: "Was ist das Bitcoin Halving?", antworten: ["Bitcoin wird in zwei Teile geteilt", "Die Mining-Belohnung halbiert sich alle ~4 Jahre", "Der Preis halbiert sich jährlich", "Die Transaktionsgeschwindigkeit verdoppelt sich"], richtig: 1 },
        { text: "Was zeigt ein sehr hoher Fear & Greed Index ('Extreme Greed')?", antworten: ["Guter Kaufzeitpunkt", "Markt ist überverkauft", "Vorsicht – oft Zeichen einer Übertreibung", "Bitcoin ist günstig"], richtig: 2 }
      ]
    },
    {
      id: 208,
      titel: "Krypto-Sicherheit und Risikomanagement",
      inhalt: `Krypto ist ein Paradies für Betrüger. Die Kombination aus Anonymität, Irreversibilität von Transaktionen und unerfahrenen Nutzern macht es zum perfekten Betrugsumfeld.

Häufige Betrugsmaschen:

Phishing: Du erhältst eine E-Mail oder Nachricht die so aussieht als käme sie von Coinbase oder MetaMask. Du klickst auf den Link, gibst deine Seed Phrase ein – und alles ist weg.

Scam-Token: Betrüger erstellen neue Tokens mit bekannten Namen. Du kaufst "APLE" statt "AAPL". Wertlos.

Fake Giveaways: "Schick 1 BTC, bekomme 2 zurück." Immer Betrug. Immer.

Romance Scams: Jemand baut über Monate Vertrauen auf, empfiehlt dann eine "super sichere" Krypto-Investment-Plattform – die eine Betrugsseite ist.

Rug Pulls: Entwickler verlassen ein Projekt und nehmen alle Gelder mit.

Schutzmaßnahmen:
- Prüfe URLs immer doppelt (metamask.io vs metamask-io.com)
- Gib niemals deine Seed Phrase ein – keine legitime Plattform fragt je danach
- Verwende unterschiedliche Passwörter + 2FA überall
- Hardware Wallet für große Beträge
- Vertraue niemandem der dir unaufgefordert Investmenttipps gibt

Risikomanagement:
- Nie mehr investieren als du bereit bist komplett zu verlieren
- Diversifikation: nicht alles in einen Coin
- Nicht auf Margin oder mit Kredit investieren
- FOMO als Warnsignal behandeln – wenn du aus Angst handelst, handle nicht

Krypto kann dein Leben verändern – in beide Richtungen. Wissen und Vorsicht sind dein größter Schutz.`,
      xp: 30,
      fragen: [
        { text: "Was ist Phishing im Krypto-Kontext?", antworten: ["Eine Mining-Methode", "Betrügerische Nachrichten die deine Seed Phrase stehlen wollen", "Eine Art DeFi-Protokoll", "Ein Krypto-Handelsbot"], richtig: 1 },
        { text: "Was solltest du tun wenn jemand nach deiner Seed Phrase fragt?", antworten: ["Sie nur an vertrauenswürdige Plattformen weitergeben", "Sie niemals weitergeben – keine legitime Plattform fragt je danach", "Sie verschlüsselt senden", "Nur bei Hardware Wallet-Support teilen"], richtig: 1 },
        { text: "Was ist ein wichtiges Risikomanagement-Prinzip bei Krypto?", antworten: ["Alles in einen Coin investieren für maximale Rendite", "Mit Kredit investieren für mehr Gewinn", "Nie mehr investieren als du bereit bist komplett zu verlieren", "Täglich handeln um Gewinne zu maximieren"], richtig: 2 }
      ]
    }
  ],
  5: [
    {
      id: 301,
      titel: "Warum du trotz Einkommen nie Geld hast",
      typ: "cards",
      xp: 30,
      fragen: [
        {
          text: "Was bedeutet 'Pay yourself first'?",
          antworten: [
            "Zuerst einkaufen, dann was übrig bleibt sparen",
            "Am Monatsanfang einen festen Betrag sofort sparen, bevor man anderes ausgibt",
            "Nur sparen wenn genug Geld da ist",
            "Gehalt erhöhen bevor man investiert"
          ],
          richtig: 1
        },
        {
          text: "Wie viel Prozent empfiehlt die 50/30/20 Regel zum Sparen?",
          antworten: ["10%", "15%", "20%", "30%"],
          richtig: 2
        },
        {
          text: "Was kostet ein täglicher 3,50€ Kaffee im Jahr?",
          antworten: ["ca. 200€", "ca. 640€", "ca. 1.277€", "ca. 2.500€"],
          richtig: 2
        }
      ]
    }
  ],
  6: [
    {
      id: 601,
      titel: "Dein Geld auf dem Girokonto verliert jeden Tag an Wert",
      typ: "cards",
      xp: 30,
      fragen: [
        {
          text: "Was ist der Hauptvorteil von Tagesgeld gegenüber dem Girokonto?",
          antworten: ["Höheres Risiko", "Es bringt Zinsen und schützt vor Inflation", "Das Geld ist gesperrt", "Es gibt staatliche Prämien"],
          richtig: 1
        },
        {
          text: "Was ist der Unterschied zwischen Tagesgeld und Festgeld?",
          antworten: ["Kein Unterschied", "Festgeld ist täglich kündbar, Tagesgeld nicht", "Tagesgeld ist täglich verfügbar, Festgeld hat feste Laufzeit", "Festgeld hat keine Zinsen"],
          richtig: 2
        },
        {
          text: "Warum ist es sinnvoll, den Notgroschen auf Tagesgeld zu parken?",
          antworten: ["Wegen hoher Aktienrenditen", "Er ist täglich verfügbar und bringt trotzdem Zinsen", "Festgeld ist sicherer", "Das Girokonto hat niedrigere Gebühren"],
          richtig: 1
        }
      ]
    },
    {
      id: 602,
      titel: "Welcher Broker passt zu dir?",
      typ: "cards",
      xp: 30,
      fragen: [
        {
          text: "Ab welchem Betrag kann man bei Trade Republic einen Sparplan starten?",
          antworten: ["5 €", "10 €", "1 €", "25 €"],
          richtig: 2
        },
        {
          text: "Was ist ein Freistellungsauftrag?",
          antworten: ["Eine Steuerbefreiung für alle Einkünfte", "Ein Auftrag an die Bank, Erträge bis 1.000 € steuerfrei zu halten", "Eine Gebührenbefreiung beim Broker", "Ein staatlicher Sparbonus"],
          richtig: 1
        },
        {
          text: "Was ist der Hauptunterschied zwischen Neobroker und klassischer Bank?",
          antworten: ["Neobroker sind unsicherer", "Neobroker sind deutlich günstiger und simpler", "Klassische Banken haben mehr ETFs", "Neobroker zahlen keine Zinsen"],
          richtig: 1
        }
      ]
    },
    {
      id: 603,
      titel: "Der Notgroschen – dein finanzielles Sicherheitsnetz",
      typ: "cards",
      xp: 25,
      fragen: [
        {
          text: "Wie viele Monatsausgaben sollte ein Notgroschen abdecken?",
          antworten: ["1 Monat", "2 Monate", "3–6 Monate", "12 Monate"],
          richtig: 2
        },
        {
          text: "Warum sollte der Notgroschen nicht in ETFs investiert sein?",
          antworten: ["ETFs sind zu teuer", "ETFs können kurzfristig stark fallen – das Geld muss jederzeit verfügbar sein", "ETFs haben zu hohe Steuern", "ETFs sind für Anfänger zu kompliziert"],
          richtig: 1
        },
        {
          text: "Wo ist der beste Ort für den Notgroschen?",
          antworten: ["Bargeld zuhause", "ETF-Sparplan", "Tagesgeldkonto – sicher und täglich verfügbar", "Festgeld mit 5 Jahren Laufzeit"],
          richtig: 2
        }
      ]
    }
  ],
  7: [
    {
      id: 701,
      titel: "Steuern – der größte Hebel den du ignorierst",
      typ: "cards",
      xp: 30,
      fragen: [
        {
          text: "Was ist der Grundfreibetrag in Deutschland (2024)?",
          antworten: ["8.000 €", "10.347 €", "11.604 €", "15.000 €"],
          richtig: 2
        },
        {
          text: "Was ist ELSTER?",
          antworten: ["Eine Steuerberatungsfirma", "Das kostenlose Online-Tool des Finanzamts für die Steuererklärung", "Eine App für Investments", "Ein staatlicher Sparplan"],
          richtig: 1
        },
        {
          text: "Warum lohnt sich die Steuererklärung fast immer?",
          antworten: ["Weil sie Pflicht ist", "Weil die meisten Deutsche zu viel Steuer zahlen und Geld zurückbekommen", "Weil Finanzämter es verlangen", "Nur bei Selbstständigen"],
          richtig: 1
        }
      ]
    },
    {
      id: 702,
      titel: "Werbungskosten – Geld zurück vom Finanzamt",
      typ: "cards",
      xp: 30,
      fragen: [
        {
          text: "Was ist der Arbeitnehmer-Pauschbetrag?",
          antworten: ["Ein staatlicher Bonus", "Ein automatischer Abzug von 1.230 € bei Arbeitnehmern", "Eine Sonderregelung für Selbstständige", "Der Grundfreibetrag"],
          richtig: 1
        },
        {
          text: "Wie viel kann man pro Homeoffice-Tag absetzen?",
          antworten: ["3 €", "6 €", "10 €", "15 €"],
          richtig: 1
        },
        {
          text: "Was sind Werbungskosten?",
          antworten: ["Kosten für Werbung", "Berufsbedingte Ausgaben die man von der Steuer absetzen kann", "Kosten für Investitionen", "Ausgaben für Konsumgüter"],
          richtig: 1
        }
      ]
    },
    {
      id: 703,
      titel: "Kapitalertragsteuer und wie du sie minimierst",
      typ: "cards",
      xp: 35,
      fragen: [
        {
          text: "Wie hoch ist die Abgeltungssteuer in Deutschland?",
          antworten: ["15 %", "19 %", "25 % + Solidaritätszuschlag ≈ 26,375 %", "42 %"],
          richtig: 2
        },
        {
          text: "Was ist der Sparerpauschbetrag für Singles?",
          antworten: ["500 €", "801 €", "1.000 €", "2.000 €"],
          richtig: 2
        },
        {
          text: "Was ist ein Freistellungsauftrag?",
          antworten: ["Eine Befreiung von der Einkommensteuer", "Ein Auftrag an die Depotbank, Erträge bis zum Freibetrag steuerfrei zu lassen", "Eine staatliche Förderung", "Eine Versicherung gegen Verluste"],
          richtig: 1
        }
      ]
    }
  ],
  8: [
    {
      id: 801,
      titel: "Mieten oder kaufen – die ehrliche Antwort",
      typ: "cards",
      xp: 35,
      fragen: [
        {
          text: "Was sind typische Kaufnebenkosten in Deutschland?",
          antworten: ["1–2 % des Kaufpreises", "5–15 % des Kaufpreises (Notar, Grunderwerbsteuer, Makler)", "Gar keine Nebenkosten", "Nur die Maklergebühr von 3 %"],
          richtig: 1
        },
        {
          text: "Was ist die 5%-Regel bei Immobilien?",
          antworten: ["Die Immobilie muss 5 % Rendite bringen", "Kaufpreis × 5 % / 12 = monatliche Opportunitätskosten des Eigenkapitals", "Man braucht 5 % Eigenkapital", "5 % Instandhaltungskosten pro Jahr"],
          richtig: 1
        },
        {
          text: "Was ist ein REIT?",
          antworten: ["Eine Art Hypothek", "Ein börsengehandelter Immobilienfonds", "Ein staatlicher Wohnkreditgeber", "Ein Bauträger"],
          richtig: 1
        }
      ]
    },
    {
      id: 802,
      titel: "Immobilienfinanzierung verstehen",
      typ: "cards",
      xp: 35,
      fragen: [
        {
          text: "Warum ist Eigenkapital bei der Immobilienfinanzierung wichtig?",
          antworten: ["Wegen staatlicher Pflicht", "Weniger Eigenkapital = niedrigere Zinsen", "Mehr Eigenkapital = niedrigere Zinsen und weniger Risiko", "Eigenkapital ist nicht wichtig"],
          richtig: 2
        },
        {
          text: "Was ist die Zinsbindung?",
          antworten: ["Der Tilgungssatz", "Der Zeitraum in dem der Zinssatz festgeschrieben ist", "Die monatliche Rate", "Der Gesamtkredit"],
          richtig: 1
        },
        {
          text: "Was ist der Unterschied zwischen Tilgung und Zinsen?",
          antworten: ["Kein Unterschied", "Tilgung ist der Gewinnanteil der Bank, Zinsen dein Rückzahlungsanteil", "Tilgung reduziert die Restschuld, Zinsen sind die Kosten des Kredits", "Zinsen sind staatlich gefördert, Tilgung nicht"],
          richtig: 2
        }
      ]
    }
  ],
  9: [
    {
      id: 901,
      titel: "Welche Versicherungen du wirklich brauchst",
      typ: "cards",
      xp: 25,
      fragen: [
        {
          text: "Warum ist die Haftpflichtversicherung so wichtig?",
          antworten: ["Weil sie gesetzlich Pflicht ist", "Weil sie Schäden abdeckt die du anderen zufügst – bis zu Millionenhöhe", "Wegen günstiger Prämien", "Nur für Autofahrer relevant"],
          richtig: 1
        },
        {
          text: "Was versichert die Berufsunfähigkeitsversicherung?",
          antworten: ["Arbeitslosigkeit", "Den Einkommensverlust wenn man nicht mehr arbeiten kann", "Krankheitskosten", "Sachschäden im Beruf"],
          richtig: 1
        },
        {
          text: "Welche Versicherung ist meistens Abzocke?",
          antworten: ["Haftpflichtversicherung", "Berufsunfähigkeitsversicherung", "Handyversicherung und Reiserücktrittsversicherung", "Hausratversicherung"],
          richtig: 2
        }
      ]
    },
    {
      id: 902,
      titel: "Berufsunfähigkeit – das Risiko das alle ignorieren",
      typ: "cards",
      xp: 30,
      fragen: [
        {
          text: "Wie viele Deutsche werden vor der Rente berufsunfähig?",
          antworten: ["1 von 20", "1 von 10", "1 von 4", "1 von 2"],
          richtig: 2
        },
        {
          text: "Warum sollte man eine BU früh abschließen?",
          antworten: ["Wegen staatlicher Förderung", "Je jünger man ist, desto günstiger sind die Prämien und besser die Gesundheitsfragen", "Ältere Menschen bekommen keine BU", "Weil die Prämien im Alter sinken"],
          richtig: 1
        },
        {
          text: "Was bedeutet 'abstrakte Verweisung' in einer BU-Police?",
          antworten: ["Der Versicherer zahlt immer", "Der Versicherer kann dich auf einen anderen Beruf verweisen – auch wenn du dort nicht arbeitest", "Eine Klausel gegen Berufsrisiken", "Eine Nachversicherungsgarantie"],
          richtig: 1
        }
      ]
    }
  ]
}

function berechneLevel(xp) {
  return Math.floor(xp / 100) + 1
}

function getHeute() {
  return new Date().toISOString().split("T")[0]
}

function OnboardingFlow({ onComplete }) {
  const [schritt, setSchritt]                     = useState(1)
  const [name, setName]                           = useState("")
  const [alter, setAlter]                         = useState(null)
  const [ziel, setZiel]                           = useState(null)
  const [lebenssituation, setLebenssituation]     = useState(null)
  const [finanzsituation, setFinanzsituation]     = useState(null)
  const [aktuelleSituation, setAktuelleSituation] = useState([])
  const [wissenslevel, setWissenslevel]           = useState(null)

  const alterOptionen = [
    { id: "unter18", label: "Unter 18", icon: "🌱" },
    { id: "18-24",   label: "18 – 24",  icon: "🎓" },
    { id: "25-34",   label: "25 – 34",  icon: "💼" },
    { id: "35plus",  label: "35+",       icon: "🏆" },
  ]

  const zielOptionen = [
    { id: "etf",    icon: "📈", titel: "ETF-Sparplan starten",   sub: "Der einfachste Einstieg" },
    { id: "krypto", icon: "₿",  titel: "Krypto verstehen",        sub: "Digital Assets durchblicken" },
    { id: "aktien", icon: "📊", titel: "Aktien analysieren",      sub: "Einzelne Unternehmen bewerten" },
    { id: "wissen", icon: "🧠", titel: "Finanzwissen aufbauen",   sub: "Solide Grundlagen legen" },
  ]

  const lebenssituationOptionen = [
    { id: "schueler",         icon: "🎓", titel: "Schüler / Student",  sub: "In Ausbildung oder Studium" },
    { id: "berufseinsteiger", icon: "💼", titel: "Berufseinstieg",      sub: "Frisch im Job" },
    { id: "berufstaetig",     icon: "👔", titel: "Berufstätig",         sub: "Regelmäßiges Einkommen" },
    { id: "selbststaendig",   icon: "🚀", titel: "Selbstständig",       sub: "Eigenes Business" },
  ]

  const finanzsituationOptionen = [
    { id: "nichts", icon: "💭", titel: "Noch gar nichts",      sub: "Ich fange bei null an" },
    { id: "wenig",  icon: "💰", titel: "10 – 50 € / Monat",    sub: "Kleiner Einstieg" },
    { id: "mittel", icon: "💰", titel: "50 – 200 € / Monat",   sub: "Solider Aufbau" },
    { id: "viel",   icon: "📈", titel: "200 €+ / Monat",       sub: "Ambitioniert investieren" },
  ]

  const situationsOptionen = [
    { id: "schulden",    icon: "📉", titel: "Schulden",            sub: "Kredite oder Dispo" },
    { id: "ersparnisse", icon: "🏦", titel: "Ersparnisse",         sub: "Geld auf dem Konto" },
    { id: "investiert",  icon: "📈", titel: "Bereits investiert",  sub: "ETFs, Aktien oder Krypto" },
    { id: "null",        icon: "🌱", titel: "Frischer Start",      sub: "Noch nichts davon" },
  ]

  const wissenslevels = [
    { stufe: 1, titel: "Kompletter Neuling",   sub: "Aktien? Was ist das?" },
    { stufe: 2, titel: "Einsteiger",           sub: "Ich kenne ein paar Begriffe" },
    { stufe: 3, titel: "Fortgeschritten",      sub: "Ich habe schon investiert" },
    { stufe: 4, titel: "Erfahren",             sub: "Ich optimiere regelmäßig" },
    { stufe: 5, titel: "Experte",              sub: "Ich kenne Tax-Loss-Harvesting" },
  ]

  const lernplanVorschlaege = {
    etf:    ["Was ist ein ETF? – und warum er dein bester Freund sein kann", "Sparplan einrichten: 25 €/Monat reichen zum Start", "MSCI World vs. ACWI – die wichtigste Entscheidung"],
    krypto: ["Bitcoin verstehen: Geld ohne Bank erklärt", "Krypto sicher verwahren: Wallets & Seed Phrases", "DeFi & Smart Contracts: die nächste Stufe"],
    aktien: ["Aktie = Miteigentümer: Was das wirklich bedeutet", "KGV & Fundamentalanalyse: Unternehmen bewerten", "Deine erste Aktie: von der Analyse zum Kauf"],
    wissen: ["Inflation bekämpfen: Warum Geld auf dem Konto schrumpft", "Zinseszins: die mächtigste Kraft im Investieren", "Risiko & Rendite: der wichtigste Trade-off"],
  }

  function toggleSituation(id) {
    setAktuelleSituation(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const startXP = wissenslevel ? (wissenslevel - 1) * 25 : 0

  function getPlanData() {
    const empfehlung = lernplanVorschlaege[ziel] || lernplanVorschlaege.wissen
    let motivation = "Jeder Experte hat mal bei null angefangen."
    if (aktuelleSituation.includes("schulden"))
      motivation = "Wissen ist der erste Schritt – du machst das richtig."
    else if (aktuelleSituation.includes("investiert"))
      motivation = "Noch mehr Wissen macht aus dir einen noch besseren Investor."
    else if (aktuelleSituation.includes("ersparnisse"))
      motivation = "Deine Ersparnisse können bald aktiv für dich arbeiten."
    return { empfehlung, motivation }
  }

  function abschliessen() {
    const finalName = name.trim() || "Investor"
    localStorage.setItem("onboardingComplete", "true")
    localStorage.setItem("userName", finalName)
    localStorage.setItem("userZiel", ziel || "wissen")
    localStorage.setItem("userAlter", alter || "")
    localStorage.setItem("userLebenssituation", lebenssituation || "")
    localStorage.setItem("userFinanzsituation", finanzsituation || "")
    localStorage.setItem("userAktuelleSituation", JSON.stringify(aktuelleSituation))
    localStorage.setItem("userWissenslevel", String(wissenslevel || 1))
    onComplete(startXP, finalName)
  }

  const kannWeiter =
    !(schritt === 3 && !alter) &&
    !(schritt === 4 && !ziel) &&
    !(schritt === 5 && !lebenssituation) &&
    !(schritt === 6 && !finanzsituation) &&
    !(schritt === 7 && aktuelleSituation.length === 0) &&
    !(schritt === 8 && !wissenslevel)

  // ── Schritt 1: Welcome Splash ──
  if (schritt === 1) {
    return (
      <div className="ob-welcome">
        <div className="ob-welcome-glow" />
        <div className="ob-welcome-content">
          <div className="ob-logo-ring">
            <span className="ob-logo-emoji">💡</span>
          </div>
          <h1 className="ob-app-name">Lumio</h1>
          <p className="ob-tagline">Dein Weg zur finanziellen Freiheit</p>
          <div className="ob-features">
            <div className="ob-feature-row"><span>📈</span><span>ETFs, Aktien &amp; Krypto verstehen</span></div>
            <div className="ob-feature-row"><span>🧠</span><span>Täglich 5 Minuten – echtes Wissen</span></div>
            <div className="ob-feature-row"><span>⚡</span><span>Level auf und sammle XP</span></div>
          </div>
        </div>
        <button className="ob-start-btn" onClick={() => setSchritt(2)}>
          Kostenlos starten →
        </button>
      </div>
    )
  }

  // ── Schritte 2–9 ──
  const fortschritt = ((schritt - 1) / 7) * 100
  const { empfehlung, motivation } = getPlanData()

  return (
    <div className="ob-screen">
      {schritt < 9 && (
        <div className="ob-topbar">
          <button className="ob-back" onClick={() => setSchritt(s => s - 1)}>←</button>
          <div className="ob-progress">
            <div className="ob-progress-fill" style={{ width: `${Math.min(fortschritt, 100)}%` }} />
          </div>
          <span className="ob-step-count">{schritt - 1} / 7</span>
        </div>
      )}

      <div className="ob-content" key={schritt}>

        {schritt === 2 && (
          <div className="ob-step">
            <span className="ob-step-icon">👋</span>
            <h2 className="ob-headline">Wie sollen wir<br/>dich nennen?</h2>
            <p className="ob-sub">Wir personalisieren dein Erlebnis.</p>
            <input
              className="ob-input"
              type="text"
              placeholder="Dein Vorname"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={30}
              autoFocus
            />
          </div>
        )}

        {schritt === 3 && (
          <div className="ob-step">
            <span className="ob-step-icon">🎂</span>
            <h2 className="ob-headline">Wie alt bist du?</h2>
            <p className="ob-sub">Wir passen deine Risikoempfehlung an.</p>
            <div className="ob-alter-grid">
              {alterOptionen.map(a => (
                <div
                  key={a.id}
                  className={`ob-alter-karte ${alter === a.id ? "ob-sel" : ""}`}
                  onClick={() => setAlter(a.id)}
                >
                  <span className="ob-alter-icon">{a.icon}</span>
                  <span className="ob-alter-label">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {schritt === 4 && (
          <div className="ob-step">
            <span className="ob-step-icon">🎯</span>
            <h2 className="ob-headline">Was ist dein<br/>wichtigstes Ziel?</h2>
            <p className="ob-sub">Du kannst später alles lernen.</p>
            <div className="ob-ziel-grid">
              {zielOptionen.map(z => (
                <div
                  key={z.id}
                  className={`ob-ziel-karte ${ziel === z.id ? "ob-sel" : ""}`}
                  onClick={() => setZiel(z.id)}
                >
                  <span className="ob-ziel-icon">{z.icon}</span>
                  <p className="ob-ziel-name">{z.titel}</p>
                  <p className="ob-ziel-sub">{z.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {schritt === 5 && (
          <div className="ob-step">
            <span className="ob-step-icon">🏠</span>
            <h2 className="ob-headline">Was beschreibt<br/>dich am besten?</h2>
            <p className="ob-sub">Für eine passende Empfehlung.</p>
            <div className="ob-ziel-grid">
              {lebenssituationOptionen.map(l => (
                <div
                  key={l.id}
                  className={`ob-ziel-karte ${lebenssituation === l.id ? "ob-sel" : ""}`}
                  onClick={() => setLebenssituation(l.id)}
                >
                  <span className="ob-ziel-icon">{l.icon}</span>
                  <p className="ob-ziel-name">{l.titel}</p>
                  <p className="ob-ziel-sub">{l.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {schritt === 6 && (
          <div className="ob-step">
            <span className="ob-step-icon">💰</span>
            <h2 className="ob-headline">Wie viel könntest du<br/>monatlich investieren?</h2>
            <p className="ob-sub">Kein Mindestbetrag – jeder fängt irgendwo an.</p>
            <div className="ob-erfahrung-liste">
              {finanzsituationOptionen.map(f => (
                <div
                  key={f.id}
                  className={`ob-erfahrung-karte ${finanzsituation === f.id ? "ob-sel" : ""}`}
                  onClick={() => setFinanzsituation(f.id)}
                >
                  <span className="ob-erf-icon">{f.icon}</span>
                  <div className="ob-erf-text">
                    <p className="ob-erf-name">{f.titel}</p>
                    <p className="ob-erf-sub">{f.sub}</p>
                  </div>
                  {finanzsituation === f.id && <span className="ob-erf-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {schritt === 7 && (
          <div className="ob-step">
            <span className="ob-step-icon">📊</span>
            <h2 className="ob-headline">Was trifft auf<br/>dich zu?</h2>
            <p className="ob-sub">Mehrere Antworten möglich.</p>
            <div className="ob-situation-grid">
              {situationsOptionen.map(s => (
                <div
                  key={s.id}
                  className={`ob-situation-karte ${aktuelleSituation.includes(s.id) ? "ob-sel" : ""}`}
                  onClick={() => toggleSituation(s.id)}
                >
                  <span className="ob-situation-icon">{s.icon}</span>
                  <p className="ob-situation-name">{s.titel}</p>
                  <p className="ob-situation-sub">{s.sub}</p>
                  {aktuelleSituation.includes(s.id) && <span className="ob-situation-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {schritt === 8 && (
          <div className="ob-step">
            <span className="ob-step-icon">🧠</span>
            <h2 className="ob-headline">Wie schätzt du<br/>dein Wissen ein?</h2>
            <p className="ob-sub">Ehrlichkeit hilft uns, dich besser zu begleiten.</p>
            <div className="ob-wissen-bar">
              {[1,2,3,4,5].map(stufe => (
                <div
                  key={stufe}
                  className={`ob-wissen-segment ${wissenslevel && wissenslevel >= stufe ? "ob-wissen-aktiv" : ""}`}
                  onClick={() => setWissenslevel(stufe)}
                />
              ))}
            </div>
            <div className="ob-wissen-liste">
              {wissenslevels.map(w => (
                <div
                  key={w.stufe}
                  className={`ob-wissen-karte ${wissenslevel === w.stufe ? "ob-sel" : ""}`}
                  onClick={() => setWissenslevel(w.stufe)}
                >
                  <span className="ob-wissen-stufe">{w.stufe}</span>
                  <div className="ob-wissen-text">
                    <p className="ob-wissen-name">{w.titel}</p>
                    <p className="ob-wissen-sub">{w.sub}</p>
                  </div>
                  {wissenslevel === w.stufe && <span className="ob-erf-check">✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {schritt === 9 && (
          <div className="ob-step ob-plan">
            <div className="ob-plan-hero">
              <span className="ob-plan-emoji">🎉</span>
              <h2 className="ob-plan-titel">
                Hey {name.trim() || "du"},<br/>dein persönlicher<br/>Lernplan ist bereit!
              </h2>
            </div>
            <p className="ob-plan-motivation">{motivation}</p>
            <div className="ob-plan-card">
              <p className="ob-plan-label">Deine ersten 3 Schritte</p>
              {empfehlung.map((item, i) => (
                <div key={i} className="ob-plan-row">
                  <span className="ob-plan-nr">{i + 1}</span>
                  <span className="ob-plan-text">{item}</span>
                </div>
              ))}
            </div>
            <div className="ob-plan-xp-badge">
              <span>⚡ Start mit {startXP} XP</span>
              {startXP > 0 && <span className="ob-plan-xp-sub"> · Dein Vorwissen zahlt sich aus</span>}
            </div>
          </div>
        )}

      </div>

      <div className="ob-btn-area">
        <button
          className="ob-btn"
          disabled={!kannWeiter}
          onClick={() => schritt < 9 ? setSchritt(s => s + 1) : abschliessen()}
        >
          {schritt < 8 ? "Weiter →" : schritt === 8 ? "Plan erstellen →" : "Jetzt loslegen 🚀"}
        </button>
      </div>
    </div>
  )
}

const TAGESSPRUECHE = [
  "Der beste Zeitpunkt zu investieren war gestern. Der zweitbeste ist heute.",
  "Kleine Schritte, konsequent durchgehalten, führen zu großen Ergebnissen.",
  "Finanzieller Erfolg beginnt mit dem ersten bewussten Euro.",
  "Wer spart, erschafft Möglichkeiten.",
  "Disziplin heute schafft Freiheit morgen.",
  "Jede Lektion bringt dich deinem Ziel näher.",
  "Das Wochenende ist perfekt, um Neues zu lernen.",
]

const HUB_SVGS = {
  lernen: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  news: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  rechner: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="7" x2="16" y2="7"/>
      <line x1="8" y1="12" x2="8.01" y2="12"/>
      <line x1="12" y1="12" x2="12.01" y2="12"/>
      <line x1="16" y1="12" x2="16.01" y2="12"/>
      <line x1="8" y1="16" x2="8.01" y2="16"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
      <line x1="16" y1="16" x2="16.01" y2="16"/>
    </svg>
  ),
  challenges: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
}

function Startscreen({ xp, streak, onHauptkategorieClick, userName, abgeschlosseneQuests }) {
  const level = berechneLevel(xp)
  const xpAktuell = xp - (level - 1) * 100
  const xpFortschritt = Math.min((xpAktuell / 100) * 100, 100)
  const spruch = TAGESSPRUECHE[new Date().getDay()]
  const heute = getHeute()
  const questHeute = !!(abgeschlosseneQuests && abgeschlosseneQuests[heute])

  return (
    <div className="screen">
      <div className="hero-card">
        <div className="hero-top">
          <div>
            <h1 className="hero-title">Lumio</h1>
            <p className="hero-sub">{userName ? `Hey ${userName} 👋` : "Willkommen zurück 👋"}</p>
          </div>
          <div className="hero-streak">
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        </div>
        <div className="hero-level-info">
          <span>Level {level}</span>
          <span>{xpAktuell} / 100 XP</span>
        </div>
        <div className="hero-xp-bar">
          <div className="hero-xp-fill" style={{ width: `${xpFortschritt}%` }} />
        </div>
        <p className="hero-quote">"{spruch}"</p>
      </div>

      <p className="hub-section-titel">Dein Fortschritt heute</p>
      <div className="fortschritt-heute">
        <div className={`fh-karte ${questHeute ? "done" : ""}`}>
          <span className="fh-icon">{questHeute ? "✅" : "⚔️"}</span>
          <div className="fh-text">
            <span className="fh-label">Daily Quest</span>
            <span className="fh-value">{questHeute ? "Erledigt!" : "Ausstehend"}</span>
          </div>
        </div>
        <div className="fh-karte">
          <span className="fh-icon">🔥</span>
          <div className="fh-text">
            <span className="fh-label">Streak</span>
            <span className="fh-value">{streak} {streak === 1 ? "Tag" : "Tage"}</span>
          </div>
        </div>
      </div>

      <p className="hub-section-titel">Was möchtest du tun?</p>

      <div className="hub-liste">
        {hauptkategorien.map((k) => (
          <div
            key={k.id}
            className={`hub-banner ${!k.verfuegbar ? "gesperrt" : ""}`}
            onClick={() => k.verfuegbar && onHauptkategorieClick(k.id)}
            style={{ background: k.verfuegbar ? k.gradient : "var(--card)" }}
          >
            <div className="hub-svg-icon">
              {HUB_SVGS[k.id] ?? <span style={{ fontSize: "1.75rem" }}>{k.icon}</span>}
            </div>
            <div className="hub-banner-text">
              <p className="hub-banner-name">{k.name}</p>
              <p className="hub-banner-beschreibung">{k.verfuegbar ? k.beschreibung : "Bald verfügbar"}</p>
            </div>
            {k.verfuegbar && <div className="hub-banner-arrow">→</div>}
            {!k.verfuegbar && <span className="hub-coming-soon">Coming Soon</span>}
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
                  <div className="fortschritt-fill" style={{ width: `${fortschritt}%` }} />
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
  const abgeschlossenAnzahl = lektionen.filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const fortschrittPct = lektionen.length > 0 ? Math.round((abgeschlossenAnzahl / lektionen.length) * 100) : 0

  return (
    <div className="screen">
      <button className="zurueck-btn" onClick={onZurueck}>← Zurück</button>

      <div className="kd-banner" style={{ background: `linear-gradient(135deg, ${kategorie.farbe}cc, ${kategorie.farbe}66)` }}>
        <div className="kd-banner-top">
          <div className="kd-banner-icon">{kategorie.icon}</div>
          <div className="kd-banner-info">
            <p className="kd-banner-name">{kategorie.name}</p>
            <p className="kd-banner-desc">{kategorie.beschreibung}</p>
          </div>
        </div>
        <div className="kd-banner-progress">
          <div className="kd-banner-bar-bg">
            <div className="kd-banner-bar-fill" style={{ width: `${fortschrittPct}%` }} />
          </div>
          <div className="kd-banner-meta">
            <span>{abgeschlossenAnzahl} von {lektionen.length} Lektionen</span>
            <span>{fortschrittPct}%</span>
          </div>
        </div>
      </div>

      <div className="lektionen-liste">
        {lektionen.map((l, index) => {
          const abgeschlossen = abgeschlosseneLektionen.includes(l.id)
          const gesperrt = index > 0 && !abgeschlosseneLektionen.includes(lektionen[index - 1].id)
          const isNext = !abgeschlossen && !gesperrt
          const numStr = String(index + 1).padStart(2, "0")
          let numClass = "default"
          if (abgeschlossen) numClass = "done"
          else if (gesperrt) numClass = "locked"
          else if (isNext) numClass = "next"
          return (
            <div
              key={l.id}
              className={`lektion-karte${gesperrt ? " gesperrt" : ""}${abgeschlossen ? " abgeschlossen" : ""}${isNext ? " aktiv-naechste" : ""}`}
              onClick={() => !gesperrt && onLektionClick(l)}
            >
              <div className={`lektion-nummer ${numClass}`}>
                {abgeschlossen ? "✓" : numStr}
              </div>
              <div className="lektion-info">
                <p className="lektion-titel">{l.titel}</p>
                <p className="lektion-xp">+{l.xp} XP · {l.typ === "cards" ? "Karten" : "Lektion"}</p>
              </div>
              {isNext && <span className="lektion-start-label">Jetzt starten</span>}
              {!isNext && <span className="lektion-arrow">›</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CardLektionScreen({ lektion, onZurueck, onAbgeschlossen }) {
  const props = { lektion, onZurueck, onAbgeschlossen }
  if (lektion.id === 601) return <L601Screen {...props} />
  if (lektion.id === 602) return <L602Screen {...props} />
  if (lektion.id === 603) return <L603Screen {...props} />
  if (lektion.id === 701) return <L701Screen {...props} />
  if (lektion.id === 702) return <L702Screen {...props} />
  if (lektion.id === 703) return <L703Screen {...props} />
  if (lektion.id === 801) return <L801Screen {...props} />
  if (lektion.id === 802) return <L802Screen {...props} />
  if (lektion.id === 901) return <L901Screen {...props} />
  if (lektion.id === 902) return <L902Screen {...props} />
  return <L301Screen {...props} />
}

function CardShell({ lektion, onZurueck, onAbgeschlossen, renderCard, TOTAL = 8 }) {
  const [cardIdx, setCardIdx]     = useState(0)
  const [phase, setPhase]         = useState("cards")
  const [fragenIdx, setFragenIdx] = useState(0)
  const [gewaehlt, setGewaehlt]   = useState(null)
  const [richtige, setRichtige]   = useState(0)
  const animDirRef                = useRef("from-right")
  const fragen = lektion.fragen

  function weiter() {
    animDirRef.current = "from-right"
    if (cardIdx < TOTAL - 1) setCardIdx(c => c + 1)
    else setPhase("quiz")
  }
  function zurueckCard() {
    if (cardIdx === 0) { onZurueck(); return }
    animDirRef.current = "from-left"
    setCardIdx(c => c - 1)
  }
  function antworten(idx) {
    if (gewaehlt !== null) return
    setGewaehlt(idx)
    if (idx === fragen[fragenIdx].richtig) setRichtige(r => r + 1)
  }
  function naechsteFrage() {
    if (fragenIdx + 1 >= fragen.length) setPhase("ergebnis")
    else { setFragenIdx(f => f + 1); setGewaehlt(null) }
  }

  if (phase === "quiz") {
    const frage = fragen[fragenIdx]
    const richtigGewaehlt = gewaehlt === frage.richtig
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={() => { setPhase("cards"); setCardIdx(TOTAL - 1) }}>← Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${((fragenIdx + 1) / fragen.length) * 100}%` }} />
          </div>
          <span className="lektion-progress-label">Quiz · {fragenIdx + 1} / {fragen.length}</span>
        </div>
        <p className="theorie-label">🧠 Verständnisquiz</p>
        <h2 className="frage">{frage.text}</h2>
        <div className="antworten">
          {frage.antworten.map((a, i) => (
            <button key={i}
              className={`antwort-btn ${gewaehlt !== null ? i === frage.richtig ? "richtig" : gewaehlt === i ? "falsch" : "" : ""}`}
              onClick={() => antworten(i)}>{a}</button>
          ))}
        </div>
        {gewaehlt !== null && (
          <div className={`feedback ${richtigGewaehlt ? "feedback-richtig" : "feedback-falsch"}`}>
            <p>{richtigGewaehlt ? "✅ Richtig!" : "❌ Falsch!"}</p>
            <button className="weiter-btn" onClick={naechsteFrage}>
              {fragenIdx + 1 >= fragen.length ? "Ergebnis →" : "Weiter →"}
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
      <div className="screen">
        <div className="ergebnis-screen">
          <div className="ergebnis-emoji">{perfekt ? "🎉" : "📚"}</div>
          <h1 className="ergebnis-titel">{perfekt ? "Perfekt!" : "Fast!"}</h1>
          <p className="ergebnis-sub">{richtige} von {fragen.length} Fragen richtig</p>
          {perfekt
            ? <p className="ergebnis-xp">+{verdientXP} XP</p>
            : <p className="ergebnis-sub" style={{ marginTop: "0.25rem" }}>Alle Fragen richtig für XP – versuch es nochmal</p>}
          {!perfekt && (
            <button className="weiter-btn" style={{ marginTop: "1.5rem", background: "#2a2040", color: "#fff" }}
              onClick={() => { setPhase("cards"); setCardIdx(0); setFragenIdx(0); setGewaehlt(null); setRichtige(0) }}>
              Nochmal lesen
            </button>
          )}
          <button className="weiter-btn" style={{ marginTop: "1rem" }} onClick={() => onAbgeschlossen(verdientXP)}>
            {perfekt ? "Weiter" : "Trotzdem weiter"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cl-screen">
      <div className="cl-topbar">
        <button className="cl-back-btn" onClick={zurueckCard}>←</button>
        <div className="cl-prog-wrap">
          <div className="cl-prog-fill" style={{ width: `${(cardIdx / TOTAL) * 100}%` }} />
        </div>
        <span className="cl-prog-label">{cardIdx + 1} / {TOTAL}</span>
      </div>
      <div key={cardIdx} className={`cl-card-anim ${animDirRef.current}`}>
        {renderCard(cardIdx)}
      </div>
      <div className="cl-bottom">
        <button className="cl-weiter-btn" onClick={weiter}>
          {cardIdx === TOTAL - 1 ? "Zum Quiz →" : "Weiter →"}
        </button>
      </div>
    </div>
  )
}

function L301Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [cardIdx, setCardIdx]           = useState(0)
  const [phase, setPhase]               = useState("cards")
  const [fragenIdx, setFragenIdx]       = useState(0)
  const [gewaehlt, setGewaehlt]         = useState(null)
  const [richtige, setRichtige]         = useState(0)
  const [kaffees, setKaffees]           = useState(3)
  const [einkommen, setEinkommen]       = useState(1400)
  const [situationWahl, setSituation]   = useState(null)
  const [barsShown, setBarsShown]       = useState(false)
  const [pieShown, setPieShown]         = useState(false)
  const animDirRef                      = useRef("from-right")

  const TOTAL  = 8
  const fragen = lektion.fragen

  const kaffeeMonat = Math.round(kaffees * 4 * 3.5)
  const kaffeeJahr  = Math.round(kaffees * 52 * 3.5)
  const kR = 0.07 / 12, kN = 120
  const kaffeeEtf = Math.round(kaffeeMonat * ((Math.pow(1 + kR, kN) - 1) / kR))

  const bed = Math.round(einkommen * 0.5)
  const wue = Math.round(einkommen * 0.3)
  const spa = Math.round(einkommen * 0.2)

  const pieR = 55
  const pieC = 2 * Math.PI * pieR
  const pieSeg = [
    { pct: 0.5, farbe: "#7C3AED", label: "Bedürfnisse" },
    { pct: 0.3, farbe: "#9D174D", label: "Wünsche" },
    { pct: 0.2, farbe: "#059669", label: "Sparen" },
  ]

  const ausgaben = [
    { name: "Miete",          betrag: 600, farbe: "#9D174D" },
    { name: "Handy",          betrag:  40, farbe: "#7C3AED" },
    { name: "Netflix/Spotify",betrag:  20, farbe: "#7C3AED" },
    { name: "Essen",          betrag: 300, farbe: "#9D174D" },
    { name: "Ausgehen",       betrag: 200, farbe: "#7C3AED" },
  ]

  const situationMsg = {
    schlecht: "Kein Problem – du hast gerade den ersten Schritt gemacht. Mit Pay Yourself First ändert sich das.",
    mittel:   "Du bist auf dem richtigen Weg! Kleine Anpassungen machen einen riesigen Unterschied.",
    gut:      "Stark! Du bist bereits besser als die meisten. Jetzt geht es darum dein System zu optimieren."
  }

  useEffect(() => {
    setBarsShown(false)
    setPieShown(false)
    const t = setTimeout(() => {
      if (cardIdx === 1) setBarsShown(true)
      if (cardIdx === 5) setPieShown(true)
    }, 150)
    return () => clearTimeout(t)
  }, [cardIdx])

  function weiter() {
    animDirRef.current = "from-right"
    if (cardIdx < TOTAL - 1) setCardIdx(c => c + 1)
    else setPhase("quiz")
  }

  function zurueckCard() {
    if (cardIdx === 0) { onZurueck(); return }
    animDirRef.current = "from-left"
    setCardIdx(c => c - 1)
  }

  function antworten(idx) {
    if (gewaehlt !== null) return
    setGewaehlt(idx)
    if (idx === fragen[fragenIdx].richtig) setRichtige(r => r + 1)
  }

  function naechsteFrage() {
    if (fragenIdx + 1 >= fragen.length) setPhase("ergebnis")
    else { setFragenIdx(f => f + 1); setGewaehlt(null) }
  }

  if (phase === "quiz") {
    const frage = fragen[fragenIdx]
    const richtigGewaehlt = gewaehlt === frage.richtig
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={() => { setPhase("cards"); setCardIdx(TOTAL - 1) }}>← Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${((fragenIdx + 1) / fragen.length) * 100}%` }} />
          </div>
          <span className="lektion-progress-label">Quiz · {fragenIdx + 1} / {fragen.length}</span>
        </div>
        <p className="theorie-label">🧠 Verständnisquiz</p>
        <h2 className="frage">{frage.text}</h2>
        <div className="antworten">
          {frage.antworten.map((a, i) => (
            <button key={i}
              className={`antwort-btn ${gewaehlt !== null ? i === frage.richtig ? "richtig" : gewaehlt === i ? "falsch" : "" : ""}`}
              onClick={() => antworten(i)}>{a}</button>
          ))}
        </div>
        {gewaehlt !== null && (
          <div className={`feedback ${richtigGewaehlt ? "feedback-richtig" : "feedback-falsch"}`}>
            <p>{richtigGewaehlt ? "✅ Richtig!" : "❌ Falsch!"}</p>
            <button className="weiter-btn" onClick={naechsteFrage}>
              {fragenIdx + 1 >= fragen.length ? "Ergebnis →" : "Weiter →"}
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
      <div className="screen">
        <div className="ergebnis-screen">
          <div className="ergebnis-emoji">{perfekt ? "🎉" : "📚"}</div>
          <h1 className="ergebnis-titel">{perfekt ? "Perfekt!" : "Fast!"}</h1>
          <p className="ergebnis-sub">{richtige} von {fragen.length} Fragen richtig</p>
          {perfekt
            ? <p className="ergebnis-xp">+{verdientXP} XP</p>
            : <p className="ergebnis-sub" style={{ marginTop: "0.25rem" }}>Alle Fragen richtig für XP – versuch es nochmal</p>}
          {!perfekt && (
            <button className="weiter-btn" style={{ marginTop: "1.5rem", background: "#2a2040", color: "#fff" }}
              onClick={() => { setPhase("cards"); setCardIdx(0); setFragenIdx(0); setGewaehlt(null); setRichtige(0) }}>
              Nochmal lesen
            </button>
          )}
          <button className="weiter-btn" style={{ marginTop: "1rem" }} onClick={() => onAbgeschlossen(verdientXP)}>
            {perfekt ? "Weiter" : "Trotzdem weiter"}
          </button>
        </div>
      </div>
    )
  }

  const renderCard = () => {
    switch (cardIdx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">
            "Max verdient 1.400€. Am 25. des Monats hat er 23€ auf dem Konto."
          </div>
          <p className="cl-hook-sub">Kein Einzelfall. Das ist Mathematik.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wohin fließt das Geld?</h2>
          <div className="cl-einkommen-row">
            <span className="cl-einkomm-label">Einkommen</span>
            <span className="cl-einkomm-wert">1.400 €</span>
          </div>
          <div className="cl-bars-wrap">
            {ausgaben.map((a, i) => (
              <div key={a.name} className="cl-bar-row">
                <div className="cl-bar-info">
                  <span className="cl-bar-name">{a.name}</span>
                  <span className="cl-bar-betrag">{a.betrag} €</span>
                </div>
                <div className="cl-bar-bg">
                  <div className="cl-bar-fill" style={{
                    width: barsShown ? `${(a.betrag / 1400) * 100}%` : "0%",
                    background: a.farbe,
                    transition: `width 0.55s ease ${i * 0.1}s`
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div className="cl-ubrig-row">
            <span className="cl-ubrig-label">Übrig: <strong>240 €</strong></span>
            <span className="cl-ubrig-sub"> — Aber wo sind die 240 €?</span>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der unsichtbare Feind</h2>
          <p className="cl-card-sub">Kleine Ausgaben die du vergisst</p>
          <div className="cl-invisible-liste">
            {[
              { icon: "☕", name: "Kaffee to-go täglich", rechnung: "3,50€ × 20", betrag: 70 },
              { icon: "🚗", name: "Uber / Taxi",          rechnung: "ca.",         betrag: 40 },
              { icon: "🛒", name: "Spontankäufe",         rechnung: "ca.",         betrag: 60 },
              { icon: "📱", name: "In-App Käufe",         rechnung: "ca.",         betrag: 20 },
            ].map(item => (
              <div key={item.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{item.icon}</span>
                <span className="cl-inv-name">{item.name}</span>
                <span className="cl-inv-rechnung">{item.rechnung}</span>
                <span className="cl-inv-betrag">−{item.betrag} €</span>
              </div>
            ))}
            <div className="cl-invisible-total">= 190 € unsichtbar weg</div>
          </div>
          <svg viewBox="0 0 200 130" className="cl-eisberg-svg">
            <defs>
              <linearGradient id="eisWasser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0f2540" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect x="0" y="60" width="200" height="70" fill="url(#eisWasser)" rx="4" />
            <line x1="0" y1="60" x2="200" y2="60" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
            <polygon points="100,8 138,60 62,60" fill="#7C3AED" opacity="0.95" />
            <text x="100" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">970 €</text>
            <text x="100" y="56" textAnchor="middle" fill="#ddd" fontSize="6.5">sichtbar</text>
            <polygon points="62,60 138,60 165,125 35,125" fill="#9D174D" opacity="0.8" />
            <text x="100" y="93" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">190 €</text>
            <text x="100" y="106" textAnchor="middle" fill="#eee" fontSize="6.5">unsichtbar</text>
          </svg>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was kostet dein Kaffee wirklich?</h2>
          <p className="cl-card-sub">Kaffees pro Woche: <strong>{kaffees}</strong></p>
          <input type="range" min={1} max={7} value={kaffees}
            onChange={e => setKaffees(Number(e.target.value))}
            className="rc-slider rc-slider-full"
            style={{ background: sliderBg(kaffees, 1, 7), marginBottom: "1.5rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile">
              <span>Pro Monat</span>
              <span className="cl-kaffee-wert">{kaffeeMonat} €</span>
            </div>
            <div className="cl-kaffee-zeile">
              <span>Pro Jahr</span>
              <span className="cl-kaffee-wert">{kaffeeJahr.toLocaleString("de-DE")} €</span>
            </div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight">
              <span>In 10 J. im ETF</span>
              <span className="cl-kaffee-wert cl-kaffee-big">{kaffeeEtf.toLocaleString("de-DE")} €</span>
            </div>
          </div>
          <p className="cl-kaffee-fazit">
            Diese Gewohnheit kostet dich <strong>{kaffeeEtf.toLocaleString("de-DE")} €</strong> Vermögensaufbau in 10 Jahren.
          </p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Eine Regel ändert alles</h2>
          <p className="cl-card-sub" style={{ marginBottom: "1.75rem" }}>Pay Yourself First</p>
          <div className="cl-flow-block cl-flow-falsch">
            <div className="cl-flow-tag cl-flow-tag-rot">❌ FALSCH</div>
            <div className="cl-flow-row">
              <div className="cl-flow-box">Einkommen</div>
              <span className="cl-flow-arrow">→</span>
              <div className="cl-flow-box">Ausgaben</div>
              <span className="cl-flow-arrow">→</span>
              <div className="cl-flow-box cl-flow-leer">Rest = 0 €</div>
            </div>
          </div>
          <div className="cl-flow-block cl-flow-richtig" style={{ marginTop: "1.25rem" }}>
            <div className="cl-flow-tag cl-flow-tag-gruen">✅ RICHTIG</div>
            <div className="cl-flow-row">
              <div className="cl-flow-box">Einkommen</div>
              <span className="cl-flow-arrow">→</span>
              <div className="cl-flow-box cl-flow-spar">Erst sparen</div>
              <span className="cl-flow-arrow">→</span>
              <div className="cl-flow-box">Ausgaben</div>
            </div>
          </div>
          <p className="cl-payfirst-tipp">
            Überweise dir selbst am 1. des Monats einen festen Betrag —<br/>
            <em>bevor</em> du irgendetwas anderes ausgibst.
          </p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die 50 / 30 / 20 Regel</h2>
          <div className="cl-pie-wrap">
            <svg viewBox="0 0 150 150" className="cl-pie-svg">
              {(() => {
                let offset = 0
                return pieSeg.map((seg, i) => {
                  const len = seg.pct * pieC
                  const dOffset = -offset
                  offset += len
                  return (
                    <circle key={i} cx="75" cy="75" r={pieR}
                      fill="none" stroke={seg.farbe} strokeWidth="24"
                      strokeDasharray={pieShown ? `${len} ${pieC}` : `0 ${pieC}`}
                      strokeDashoffset={dOffset}
                      transform="rotate(-90 75 75)"
                      style={{ transition: `stroke-dasharray 0.7s ease ${i * 0.22}s` }} />
                  )
                })
              })()}
              <text x="75" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">50/30</text>
              <text x="75" y="86" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">/20</text>
            </svg>
            <div className="cl-pie-legende">
              {pieSeg.map((seg, i) => (
                <div key={i} className="cl-pie-leg-row">
                  <span className="cl-pie-dot" style={{ background: seg.farbe }} />
                  <span className="cl-pie-leg-name">{seg.label}</span>
                  <span className="cl-pie-leg-pct">{Math.round(seg.pct * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cl-pie-slider-row">
            <span className="cl-pie-slider-label">Einkommen: <strong>{einkommen.toLocaleString("de-DE")} €</strong></span>
            <input type="range" min={500} max={5000} step={100} value={einkommen}
              onChange={e => setEinkommen(Number(e.target.value))}
              className="rc-slider rc-slider-full"
              style={{ background: sliderBg(einkommen, 500, 5000) }} />
          </div>
          <div className="cl-pie-betraege">
            {[
              { farbe: "#7C3AED", label: "Bedürfnisse", wert: bed },
              { farbe: "#9D174D", label: "Wünsche",     wert: wue },
              { farbe: "#059669", label: "Sparen",      wert: spa },
            ].map(r => (
              <div key={r.label} className="cl-pie-betrag-row">
                <span className="cl-pie-dot" style={{ background: r.farbe }} />
                <span>{r.label}</span>
                <strong>{r.wert.toLocaleString("de-DE")} €</strong>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wo stehst du gerade?</h2>
          <p className="cl-card-sub" style={{ marginBottom: "1.25rem" }}>Wähle das Zutreffende</p>
          <div className="cl-check-karten">
            {[
              { id: "schlecht", emoji: "😰", text: "Ich habe am Monatsende oft nichts übrig" },
              { id: "mittel",   emoji: "😐", text: "Ich spare manchmal, aber unregelmäßig" },
              { id: "gut",      emoji: "💪", text: "Ich spare bereits bewusst jeden Monat" },
            ].map(opt => (
              <div key={opt.id}
                className={`cl-check-karte ${situationWahl === opt.id ? "cl-check-sel" : ""}`}
                onClick={() => setSituation(opt.id)}>
                <span className="cl-check-emoji">{opt.emoji}</span>
                <p className="cl-check-text">{opt.text}</p>
              </div>
            ))}
          </div>
          {situationWahl && (
            <div className="cl-check-msg">{situationMsg[situationWahl]}</div>
          )}
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Du weißt jetzt warum Geld verschwindet</h2>
          <p className="cl-card-sub" style={{ marginBottom: "1.5rem" }}>Deine 3 Key-Takeaways</p>
          <div className="cl-takeaways">
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">🧮</span>
              <p>Kleine, unsichtbare Ausgaben fressen hunderte Euro pro Monat</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">💰</span>
              <p>Pay Yourself First: Erst sparen, dann ausgeben — nie umgekehrt</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">📊</span>
              <p>Die 50/30/20 Regel gibt deinem Geld eine klare Struktur</p>
            </div>
          </div>
          <p className="cl-quiz-cta">Jetzt teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return (
    <div className="cl-screen">
      <div className="cl-topbar">
        <button className="cl-back-btn" onClick={zurueckCard}>←</button>
        <div className="cl-prog-wrap">
          <div className="cl-prog-fill" style={{ width: `${(cardIdx / TOTAL) * 100}%` }} />
        </div>
        <span className="cl-prog-label">{cardIdx + 1} / {TOTAL}</span>
      </div>
      <div key={cardIdx} className={`cl-card-anim ${animDirRef.current}`}>
        {renderCard()}
      </div>
      <div className="cl-bottom">
        <button className="cl-weiter-btn" onClick={weiter}>
          {cardIdx === TOTAL - 1 ? "Zum Quiz →" : "Weiter →"}
        </button>
      </div>
    </div>
  )
}

function L601Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [betrag, setBetrag] = useState(5000)
  const [zins, setZins]     = useState(3.5)
  const jahresertrag = Math.round(betrag * zins / 100)

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"1.000€ auf dem Girokonto. In 10 Jahren noch 820€ wert. Niemand hat sie gestohlen – die Inflation war es."</div>
          <p className="cl-hook-sub">Dein Geld verliert täglich an Kaufkraft.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was Inflation mit deinem Geld macht</h2>
          <p className="cl-card-sub">Kaufkraft von 1.000 € bei 2% Inflation</p>
          <svg viewBox="0 0 240 160" style={{ width: "100%", marginTop: "1rem" }}>
            {[
              { jahr: "Heute", wert: 1000, x: 20 },
              { jahr: "5 J.",  wert: 906,  x: 75 },
              { jahr: "10 J.", wert: 820,  x: 130 },
              { jahr: "20 J.", wert: 673,  x: 185 },
            ].map((d, i) => (
              <g key={i}>
                <rect x={d.x} y={130 - (d.wert / 1000) * 110} width="38" height={(d.wert / 1000) * 110}
                  fill={i === 0 ? "#7C3AED" : `rgba(124,58,237,${0.7 - i * 0.15})`} rx="3"
                  style={{ transition: "all 0.6s ease" }} />
                <text x={d.x + 19} y={125 - (d.wert / 1000) * 110} textAnchor="middle" fill="white" fontSize="9" fontWeight="600">{d.wert}€</text>
                <text x={d.x + 19} y="148" textAnchor="middle" fill="#888" fontSize="8">{d.jahr}</text>
              </g>
            ))}
            <line x1="15" y1="130" x2="230" y2="130" stroke="#333" strokeWidth="1" />
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.82rem", marginTop: "0.75rem", textAlign: "center" }}>Ohne Gegenwehr verlierst du jedes Jahr Kaufkraft.</p>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Tagesgeld – die einfache Lösung</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "💰", name: "Was ist es?",         val: "Sparkonto mit variablem Zinssatz" },
              { icon: "⚡", name: "Zugriff",             val: "Täglich verfügbar" },
              { icon: "📈", name: "Aktuelle Zinsen",     val: "~3–4% p.a. (2024)" },
              { icon: "🛡️", name: "Einlagensicherung",  val: "100.000 € pro Bank gesetzlich gesichert" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#ccc", fontSize: "0.82rem", marginLeft: "auto", textAlign: "right", maxWidth: "55%" }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#0EA5E922", border: "1px solid #0EA5E944", borderRadius: "10px", padding: "0.75rem 1rem", marginTop: "1rem" }}>
            <p style={{ color: "#0EA5E9", fontSize: "0.85rem", margin: 0 }}>Tipp: Anbieter wie ING, DKB oder Trade Republic zahlen aktuell 3–4 % – einfach dort ein Tagesgeldkonto eröffnen.</p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was bringt dir Tagesgeld wirklich?</h2>
          <p className="cl-card-sub">Betrag: <strong>{betrag.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={500} max={50000} step={500} value={betrag}
            onChange={e => setBetrag(Number(e.target.value))}
            className="rc-slider rc-slider-full"
            style={{ background: sliderBg(betrag, 500, 50000), marginBottom: "1rem" }} />
          <p className="cl-card-sub">Zinssatz: <strong>{zins.toFixed(1)} % p.a.</strong></p>
          <input type="range" min={0.5} max={5} step={0.1} value={zins}
            onChange={e => setZins(Number(e.target.value))}
            className="rc-slider rc-slider-full"
            style={{ background: sliderBg(zins, 0.5, 5), marginBottom: "1.25rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile">
              <span>Zinsen pro Jahr</span>
              <span className="cl-kaffee-wert cl-kaffee-big">{jahresertrag.toLocaleString("de-DE")} €</span>
            </div>
            <div className="cl-kaffee-zeile">
              <span>Auf dem Girokonto</span>
              <span style={{ color: "#ef4444", fontWeight: 600 }}>0 €</span>
            </div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Festgeld – mehr Zins, weniger Flexibilität</h2>
          <div className="cl-flow-block" style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ color: "#0EA5E9", fontWeight: 700, marginBottom: "0.25rem" }}>Tagesgeld</p>
                <p style={{ color: "#aaa", fontSize: "0.8rem" }}>Täglich verfügbar</p>
                <p style={{ color: "#aaa", fontSize: "0.8rem" }}>Variabler Zins</p>
                <p style={{ color: "#10B981", fontSize: "0.85rem", fontWeight: 600 }}>~3–4 % p.a.</p>
              </div>
              <div style={{ width: "1px", background: "#333" }} />
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ color: "#F59E0B", fontWeight: 700, marginBottom: "0.25rem" }}>Festgeld</p>
                <p style={{ color: "#aaa", fontSize: "0.8rem" }}>Gesperrt (1–5 J.)</p>
                <p style={{ color: "#aaa", fontSize: "0.8rem" }}>Fester Zins</p>
                <p style={{ color: "#10B981", fontSize: "0.85rem", fontWeight: 600 }}>~3–4,5 % p.a.</p>
              </div>
            </div>
          </div>
          <p style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "1rem", lineHeight: 1.6 }}>
            Festgeld lohnt sich wenn du Geld <strong style={{ color: "#fff" }}>sicher</strong> anlegen willst und es für mindestens 1 Jahr nicht brauchst. Für den Notgroschen ist Tagesgeld besser.
          </p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">10 Jahre Vergleich: Was wäre aus 10.000 € geworden?</h2>
          <svg viewBox="0 0 260 160" style={{ width: "100%", marginTop: "0.75rem" }}>
            {[
              { label: "Girokonto", wert: 9048,  farbe: "#ef4444" },
              { label: "Tagesgeld", wert: 13440, farbe: "#0EA5E9" },
              { label: "ETF",       wert: 19672, farbe: "#10B981" },
            ].map((d, i) => {
              const h = (d.wert / 20000) * 120
              const x = 30 + i * 80
              return (
                <g key={i}>
                  <rect x={x} y={135 - h} width="55" height={h} fill={d.farbe} rx="4" opacity="0.85" />
                  <text x={x + 27} y={130 - h} textAnchor="middle" fill="white" fontSize="8" fontWeight="700">{(d.wert / 1000).toFixed(1)}k€</text>
                  <text x={x + 27} y="150" textAnchor="middle" fill="#888" fontSize="7.5">{d.label}</text>
                </g>
              )
            })}
            <line x1="20" y1="135" x2="245" y2="135" stroke="#333" strokeWidth="1" />
            <text x="20" y="12" fill="#666" fontSize="7">Start: 10.000 €</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center" }}>Girokonto verliert durch Inflation. Tagesgeld schlägt Inflation. ETF wächst langfristig am stärksten.</p>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die goldene Regel</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">🏦</span>
              <p><strong>Notgroschen (3–6 Monate)</strong> → Tagesgeldkonto – täglich verfügbar, Zinsen mitnehmen</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">⏰</span>
              <p><strong>Geld das du 1–5 Jahre nicht brauchst</strong> → Festgeld – etwas mehr Zins sichern</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">📈</span>
              <p><strong>Langfristiges Vermögen (5+ Jahre)</strong> → ETF – Inflation schlagen und wirklich Vermögen aufbauen</p>
            </div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Du weißt jetzt wie du dein Geld richtig parkst</h2>
          <p className="cl-card-sub" style={{ marginBottom: "1.5rem" }}>3 Key-Takeaways</p>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Geld auf dem Girokonto verliert durch Inflation jedes Jahr an Kaufkraft</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>Tagesgeld bringt 3–4 % und ist täglich verfügbar – perfekt für den Notgroschen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏆</span><p>Langfristig schlägt nur der ETF die Inflation deutlich</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L602Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [frage1, setFrage1] = useState(null)
  const [frage2, setFrage2] = useState(null)
  const [frage3, setFrage3] = useState(null)

  function getBrokerEmpfehlung() {
    if (!frage1 || !frage2 || !frage3) return null
    if (frage1 === "einsteiger" && frage2 === "wenig") return { name: "Trade Republic", grund: "1€ Sparplan, einfach zu bedienen, 4% auf Cash" }
    if (frage1 === "fortgeschritten" || frage2 === "viel") return { name: "Scalable Capital", grund: "Mehr ETF-Auswahl, Prime Abo für Flatrate-Handel" }
    if (frage3 === "girokonto") return { name: "DKB oder ING", grund: "Kostenloses Girokonto + Depot aus einer Hand" }
    return { name: "Trade Republic", grund: "Einfacher Einstieg mit niedrigen Kosten" }
  }

  const empfehlung = getBrokerEmpfehlung()

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Der falsche Broker kostet dich über 20 Jahre tausende Euro."</div>
          <p className="cl-hook-sub">Aber der Wechsel dauert nur 15 Minuten.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein Broker?</h2>
          <p className="cl-card-sub">Stell dir vor, du willst Äpfel kaufen.</p>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.9rem" }}>
              Ein Supermarkt kauft Äpfel von Bauern und verkauft sie an dich – du brauchst nicht selbst zum Bauern fahren.<br /><br />
              Ein <strong style={{ color: "#0EA5E9" }}>Broker</strong> ist der Supermarkt für Aktien und ETFs. Er kauft an der Börse und gibt sie an dich weiter. Ohne Broker kein Zugang zur Börse.
            </p>
          </div>
          <div className="cl-invisible-liste" style={{ marginTop: "1rem" }}>
            {[
              { icon: "🏪", name: "Neobroker",        val: "Trade Republic, Scalable – günstig, digital" },
              { icon: "🏦", name: "Direktbanken",     val: "DKB, ING, Comdirect – mehr Leistungen" },
              { icon: "🏢", name: "Filialbanken",     val: "Sparkasse, VR Bank – teuer, kein Sparplan ab 1€" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.8rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Broker im Vergleich</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", marginTop: "0.75rem" }}>
              <thead>
                <tr>
                  {["", "Trade R.", "Scalable", "DKB", "Comdirect"].map(h => (
                    <th key={h} style={{ padding: "6px 4px", color: "#888", fontWeight: 600, borderBottom: "1px solid #333", textAlign: "center" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Ordergebühr", vals: ["1 €", "0–0,99 €", "1,50 €", "12,90 €"] },
                  { label: "Sparplan ab", vals: ["1 €", "1 €", "25 €", "25 €"] },
                  { label: "ETF-Auswahl", vals: ["9.000+", "8.000+", "5.000+", "10.000+"] },
                  { label: "Anfänger?",   vals: ["✅", "✅", "⚠️", "❌"] },
                ].map(row => (
                  <tr key={row.label}>
                    <td style={{ padding: "7px 4px", color: "#bbb", fontWeight: 600 }}>{row.label}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} style={{ padding: "7px 4px", color: "#ddd", textAlign: "center", borderBottom: "1px solid #222" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Trade Republic – der Einsteiger-Broker</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "✅", name: "Sparplan ab 1 €",         val: "Jeder kann starten" },
              { icon: "✅", name: "4 % aufs Cash",            val: "Tagesgeld im Depot" },
              { icon: "✅", name: "Übersichtliche App",       val: "Ideal für Anfänger" },
              { icon: "✅", name: "Keine Depotgebühren",      val: "Komplett kostenlos" },
              { icon: "⚠️", name: "Nur App, kein Desktop",   val: "Eingeschränkt" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.8rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#0EA5E911", border: "1px solid #0EA5E933", borderRadius: "10px", padding: "0.75rem", marginTop: "1rem" }}>
            <p style={{ color: "#0EA5E9", fontSize: "0.83rem", margin: 0 }}>Für die meisten ist Trade Republic der perfekte Startpunkt.</p>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Depot eröffnen – das musst du wissen</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">📋</span>
              <p><strong>Freistellungsauftrag stellen:</strong> Bis 1.000 € Kapitalerträge steuerfrei. Direkt bei der Depot-Eröffnung eintragen.</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">🪪</span>
              <p><strong>Steuer-ID:</strong> Deine persönliche Steuernummer – liegt auf deinem letzten Steuerbescheid oder bei elster.de</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">🆔</span>
              <p><strong>Ausweispflicht:</strong> Video-Ident oder Post-Ident – dauert ~10 Minuten</p>
            </div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Welcher Broker passt zu dir?</h2>
          <p className="cl-card-sub" style={{ marginBottom: "1rem" }}>3 kurze Fragen → deine Empfehlung</p>
          {[
            {
              frage: "Deine Erfahrung?",
              opts: [{ id: "einsteiger", label: "Einsteiger" }, { id: "fortgeschritten", label: "Erfahren" }],
              wahl: frage1, setWahl: setFrage1
            },
            {
              frage: "Monatliche Sparrate?",
              opts: [{ id: "wenig", label: "< 100 €" }, { id: "viel", label: "> 100 €" }],
              wahl: frage2, setWahl: setFrage2
            },
            {
              frage: "Girokonto dabei?",
              opts: [{ id: "girokonto", label: "Ja, bitte" }, { id: "nurDepot", label: "Nur Depot" }],
              wahl: frage3, setWahl: setFrage3
            },
          ].map((q, qi) => (
            <div key={qi} style={{ marginBottom: "0.75rem" }}>
              <p style={{ color: "#aaa", fontSize: "0.82rem", marginBottom: "0.4rem" }}>{q.frage}</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {q.opts.map(o => (
                  <button key={o.id}
                    onClick={() => q.setWahl(o.id)}
                    style={{
                      flex: 1, padding: "0.5rem", borderRadius: "8px", border: "1px solid",
                      borderColor: q.wahl === o.id ? "#0EA5E9" : "#333",
                      background: q.wahl === o.id ? "#0EA5E922" : "#1a1a2e",
                      color: q.wahl === o.id ? "#0EA5E9" : "#aaa",
                      fontSize: "0.82rem", cursor: "pointer"
                    }}>{o.label}</button>
                ))}
              </div>
            </div>
          ))}
          {empfehlung && (
            <div style={{ background: "#0EA5E911", border: "1px solid #0EA5E944", borderRadius: "10px", padding: "0.75rem", marginTop: "0.5rem" }}>
              <p style={{ color: "#0EA5E9", fontWeight: 700, marginBottom: "0.25rem" }}>→ {empfehlung.name}</p>
              <p style={{ color: "#aaa", fontSize: "0.8rem", margin: 0 }}>{empfehlung.grund}</p>
            </div>
          )}
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Scalable Capital – für Fortgeschrittene</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "✅", name: "8.000+ ETFs & Aktien",   val: "Größtes Angebot" },
              { icon: "✅", name: "Prime Abo (2,99€/Mo)",   val: "Flatrate-Handel" },
              { icon: "✅", name: "Sparplan ab 1 €",        val: "Flexibel" },
              { icon: "⚠️", name: "Etwas komplexer",       val: "Mehr Optionen" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.8rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Du weißt jetzt wie du einen Broker wählst</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏪</span><p>Neobroker sind günstig und einfach – perfekt für den Start</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📋</span><p>Freistellungsauftrag sofort bei Eröffnung stellen – 1.000 € steuerfrei</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🚀</span><p>Sparplan ab 1 € – der beste Zeitpunkt zum Starten ist jetzt</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L603Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [monatsausgaben, setMonatsausgaben] = useState(1500)
  const notgroschenZiel = monatsausgaben * 3
  const notgroschenMax  = monatsausgaben * 6

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Das Auto springt nicht an. Reparatur: 800 €. Hast du sie?"</div>
          <p className="cl-hook-sub">Ohne Notgroschen wird jede Überraschung zur Katastrophe.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der Notgroschen – nicht optional</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Ein Notgroschen ist dein <strong style={{ color: "#fff" }}>finanzieller Airbag</strong>. Er schützt dich davor, bei unerwarteten Ausgaben Schulden zu machen oder Investments zu liquidieren.
          </p>
          <div className="cl-invisible-liste" style={{ marginTop: "1rem" }}>
            {[
              { icon: "🚗", name: "Autoreparatur",     val: "500–2.000 €" },
              { icon: "🏥", name: "Arzt / Zahn",       val: "200–3.000 €" },
              { icon: "📱", name: "Gerät kaputt",      val: "300–1.500 €" },
              { icon: "💼", name: "Jobverlust",        val: "Mehrere Monate" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span className="cl-inv-betrag">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wie viel brauchst du?</h2>
          <p className="cl-card-sub">Die Faustregel: 3–6 Monatsausgaben</p>
          <svg viewBox="0 0 260 100" style={{ width: "100%", marginTop: "1rem" }}>
            <rect x="10" y="35" width="240" height="30" rx="15" fill="#1a1a2e" />
            <rect x="10" y="35" width="120" height="30" rx="15" fill="#0EA5E966" />
            <rect x="10" y="35" width="240" height="30" rx="15" fill="none" stroke="#0EA5E9" strokeWidth="1.5" />
            <text x="70" y="56" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Minimum (3 Mo.)</text>
            <text x="190" y="56" textAnchor="middle" fill="#0EA5E9" fontSize="9" fontWeight="600">Ideal (6 Mo.)</text>
            <text x="70" y="28" textAnchor="middle" fill="#888" fontSize="8">Basis-Schutz</text>
            <text x="190" y="28" textAnchor="middle" fill="#888" fontSize="8">Vollständiger Schutz</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.6, marginTop: "0.75rem" }}>
            Angestellte: <strong style={{ color: "#fff" }}>3 Monate</strong> reichen oft. Selbstständige oder variable Einkommen: <strong style={{ color: "#fff" }}>6 Monate</strong> sind sicherer.
          </p>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Berechne deinen Notgroschen</h2>
          <p className="cl-card-sub">Monatliche Ausgaben: <strong>{monatsausgaben.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={500} max={5000} step={100} value={monatsausgaben}
            onChange={e => setMonatsausgaben(Number(e.target.value))}
            className="rc-slider rc-slider-full"
            style={{ background: sliderBg(monatsausgaben, 500, 5000), marginBottom: "1.25rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile">
              <span>Minimum (3 Mo.)</span>
              <span className="cl-kaffee-wert">{notgroschenZiel.toLocaleString("de-DE")} €</span>
            </div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight">
              <span>Ideal (6 Mo.)</span>
              <span className="cl-kaffee-wert cl-kaffee-big">{notgroschenMax.toLocaleString("de-DE")} €</span>
            </div>
          </div>
          <p style={{ color: "#aaa", fontSize: "0.82rem", marginTop: "0.75rem" }}>Das ist dein persönliches Sicherheitsziel.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wo soll der Notgroschen hin?</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">✅</span>
              <p><strong>Tagesgeldkonto</strong> – täglich verfügbar, 3–4 % Zinsen, getrennt vom Girokonto</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">❌</span>
              <p><strong>Nicht in ETFs</strong> – können 30–50 % fallen genau dann wenn du das Geld brauchst</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">❌</span>
              <p><strong>Nicht auf dem Girokonto</strong> – zu leicht zugänglich, keine Zinsen, wird "konsumiert"</p>
            </div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die häufigsten Fehler</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "⚠️", name: "Zu wenig angespart",         val: "\"500 € reichen auch\"" },
              { icon: "⚠️", name: "In ETFs investiert",         val: "Nicht sofort verfügbar" },
              { icon: "⚠️", name: "Für Urlaub genutzt",        val: "Kein Notfall!" },
              { icon: "⚠️", name: "Nie wieder aufgefüllt",     val: "Nach Nutzung auffüllen!" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#ef4444", fontSize: "0.8rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#ef444411", border: "1px solid #ef444433", borderRadius: "10px", padding: "0.75rem", marginTop: "1rem" }}>
            <p style={{ color: "#ef4444", fontSize: "0.83rem", margin: 0 }}>Ein Notgroschen ist kein Urlaubs- oder Konsumkonto. Er ist nur für echte Notfälle.</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Schritt für Schritt aufbauen</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">1️⃣</span>
              <p>Tagesgeldkonto eröffnen (ING, DKB, Trade Republic)</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">2️⃣</span>
              <p>Jeden Monat festen Betrag überweisen – vor anderen Ausgaben ("Pay yourself first")</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">3️⃣</span>
              <p>Ziel erreicht? Ab jetzt geht der Betrag in deinen ETF-Sparplan</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">4️⃣</span>
              <p>Notgroschen genutzt? Sofort wieder auffüllen</p>
            </div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein finanzieller Airbag ist das Fundament</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p>3–6 Monatsausgaben auf dem Tagesgeldkonto als eiserne Reserve</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚡</span><p>Täglich verfügbar – niemals in ETFs oder Festgeld</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🚀</span><p>Erst Notgroschen aufbauen, dann investieren</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L701Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [brutto, setBrutto] = useState(40000)
  const steuer  = brutto <= 11604 ? 0 : Math.round((brutto - 11604) * 0.14 + Math.max(0, brutto - 17005) * 0.08)
  const soli    = steuer > 972 ? Math.round(steuer * 0.055) : 0
  const netto   = brutto - steuer - soli
  const monatlich = Math.round(netto / 12)

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Der durchschnittliche Deutsche lässt 1.000 €+ pro Jahr an Steuererstattungen liegen."</div>
          <p className="cl-hook-sub">Das Finanzamt wartet nicht – du musst aktiv werden.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Einkommensteuer in Deutschland</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>
            Deutschland hat einen <strong style={{ color: "#fff" }}>progressiven Steuertarif</strong>: Je mehr du verdienst, desto höher der Steuersatz – aber nur auf den Teil über der Grenze.
          </p>
          <div className="cl-invisible-liste" style={{ marginTop: "0.75rem" }}>
            {[
              { icon: "0️⃣", name: "0 – 11.604 €",      val: "0 % (Grundfreibetrag)" },
              { icon: "📈", name: "11.605 – 17.005 €",  val: "14 – 24 %" },
              { icon: "📈", name: "17.006 – 66.760 €",  val: "24 – 42 %" },
              { icon: "📈", name: "66.761 – 277.825 €", val: "42 % (Spitzensteuersatz)" },
              { icon: "💎", name: "über 277.826 €",     val: "45 % (Reichensteuer)" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name" style={{ fontSize: "0.78rem" }}>{r.name}</span>
                <span style={{ color: "#10B981", fontSize: "0.78rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuerprogression – visuell</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { label: "11k€", h: 5,   x: 15 },
              { label: "20k€", h: 30,  x: 58 },
              { label: "30k€", h: 55,  x: 101 },
              { label: "50k€", h: 78,  x: 144 },
              { label: "70k€", h: 95,  x: 187 },
              { label: "100k€",h: 110, x: 230 },
            ].map((d, i) => (
              <g key={i}>
                <rect x={d.x} y={120 - d.h} width="30" height={d.h}
                  fill={`hsl(${260 - i * 20}, 70%, ${55 - i * 5}%)`} rx="3" />
                <text x={d.x + 15} y={115 - d.h} textAnchor="middle" fill="white" fontSize="7" fontWeight="600">{d.h}%</text>
                <text x={d.x + 15} y="132" textAnchor="middle" fill="#888" fontSize="7">{d.label}</text>
              </g>
            ))}
            <line x1="10" y1="120" x2="250" y2="120" stroke="#333" strokeWidth="1" />
            <text x="130" y="12" textAnchor="middle" fill="#666" fontSize="7.5">Effektiver Steuersatz nach Einkommen (vereinfacht)</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center" }}>Wichtig: Dies ist der <em>effektive</em> Steuersatz – nicht der Grenzsteuersatz.</p>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuererklärung – wer muss, wer kann?</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "⚠️", name: "Pflicht",             val: "Selbstständige, mehrere Arbeitgeber, Kapitalerträge über Freibetrag" },
              { icon: "✅", name: "Freiwillig (empfohlen)", val: "Fast alle Arbeitnehmer – und es lohnt sich fast immer" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.8rem", marginLeft: "auto", maxWidth: "55%", textAlign: "right" }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#10B98111", border: "1px solid #10B98133", borderRadius: "10px", padding: "0.75rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#10B981", fontSize: "0.83rem", margin: 0 }}>Frist: 31. Juli des Folgejahres (mit Steuerberater bis Februar übernächstes Jahr).</p>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">ELSTER – kostenlos Steuern machen</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">🖥️</span>
              <p><strong>elster.de</strong> – das offizielle, kostenlose Online-Portal des Finanzamts</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">📱</span>
              <p>Alternativen: Wundertax, Taxfix, WISO Steuer – einfacher, aber kostenpflichtig (~30–50 €)</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">💡</span>
              <p>Wenn du mehr zurückbekommst als die Software kostet – lohnt sich der Kauf!</p>
            </div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein Brutto-Netto Rechner</h2>
          <p className="cl-card-sub">Jahresbrutto: <strong>{brutto.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={12000} max={100000} step={1000} value={brutto}
            onChange={e => setBrutto(Number(e.target.value))}
            className="rc-slider rc-slider-full"
            style={{ background: sliderBg(brutto, 12000, 100000), marginBottom: "1.25rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>Einkommensteuer</span><span style={{ color: "#ef4444", fontWeight: 600 }}>−{steuer.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Solidaritätszuschlag</span><span style={{ color: "#ef4444", fontWeight: 600 }}>−{soli.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight"><span>Jahresnetto</span><span className="cl-kaffee-wert cl-kaffee-big">{netto.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>≈ pro Monat</span><span className="cl-kaffee-wert">{monatlich.toLocaleString("de-DE")} €</span></div>
          </div>
          <p style={{ color: "#666", fontSize: "0.75rem", marginTop: "0.5rem" }}>Vereinfacht – ohne Sozialabgaben, Kirchensteuer und individuelle Abzüge.</p>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wann lohnt sich die Steuererklärung?</h2>
          <p style={{ color: "#10B981", fontSize: "1.1rem", fontWeight: 700, marginTop: "0.5rem", marginBottom: "1rem" }}>Fast immer!</p>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>Durchschnittliche Erstattung: <strong>~1.095 €</strong> pro Jahr</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⏱️</span><p>Zeitaufwand: 2–4 Stunden mit einer App wie Wundertax</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📅</span><p>Du hast bis zu 4 Jahre rückwirkend Zeit – also jetzt alle nacholen!</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuern sind keine Blackbox mehr</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>Progressiver Steuertarif – höhere Einkommen zahlen mehr</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💸</span><p>Ø 1.095 € Erstattung pro Jahr – die Steuererklärung lohnt sich fast immer</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🖥️</span><p>ELSTER kostenlos oder Taxfix/Wundertax für ~35 € – in 2 Stunden fertig</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L702Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [fahrtkm, setFahrtkm]   = useState(20)
  const [hoDays, setHoDays]     = useState(50)
  const [fortbild, setFortbild] = useState(0)

  const fahrtkosten = fahrtkm * 230 * 0.30
  const hoKosten    = Math.min(hoDays * 6, 1260)
  const gesamt      = fahrtkosten + hoKosten + fortbild
  const pauschbetrag = 1230
  const mehrWert    = Math.max(0, gesamt - pauschbetrag)
  const erstattungEst = Math.round(mehrWert * 0.30)

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Dein Arbeitsweg, dein Laptop, deine Fortbildung – das Finanzamt zahlt mit."</div>
          <p className="cl-hook-sub">Viele Ausgaben mindern deine Steuerlast – du musst sie nur eintragen.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was sind Werbungskosten?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>
            Werbungskosten sind <strong style={{ color: "#fff" }}>berufsbedingte Ausgaben</strong>, die du von deinem Einkommen abziehen kannst – bevor die Steuer berechnet wird. Sie „mindern die Steuerlast".
          </p>
          <div style={{ background: "#10B98111", border: "1px solid #10B98133", borderRadius: "10px", padding: "0.75rem 1rem", marginTop: "1rem" }}>
            <p style={{ color: "#10B981", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.25rem" }}>Einfache Formel:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", margin: 0 }}>Brutto − Werbungskosten = zu versteuerndes Einkommen</p>
            <p style={{ color: "#aaa", fontSize: "0.8rem", marginTop: "0.25rem" }}>Weniger zu versteuerndes Einkommen = weniger Steuern.</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was kannst du absetzen?</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "🚗", name: "Fahrtkosten",        val: "0,30 € pro km (einfache Strecke)" },
              { icon: "🏠", name: "Homeoffice",         val: "6 € pro Tag, max. 1.260 € / Jahr" },
              { icon: "💻", name: "Arbeitsmittel",      val: "Laptop, Schreibtisch, Stuhl" },
              { icon: "📚", name: "Fortbildungen",      val: "Kurse, Bücher, Fachzeitschriften" },
              { icon: "👔", name: "Berufskleidung",     val: "Arbeitskleidung (nicht Anzug!)" },
              { icon: "🤝", name: "Gewerkschaft",       val: "Mitgliedsbeitrag voll absetzbar" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.78rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der Arbeitnehmer-Pauschbetrag</h2>
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "#10B981" }}>1.230 €</p>
            <p style={{ color: "#aaa", fontSize: "0.85rem" }}>Automatisch vom Finanzamt abgezogen – ohne Belege!</p>
          </div>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>
            Das Finanzamt zieht jedem Arbeitnehmer automatisch 1.230 € von den Einnahmen ab. Du musst nichts tun.<br /><br />
            <strong style={{ color: "#fff" }}>Aber:</strong> Wenn deine tatsächlichen Werbungskosten höher sind, lohnt sich die Steuererklärung – du bekommst mehr zurück!
          </p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Homeoffice-Pauschale</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", margin: "0.75rem 0" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#10B981" }}>6 €</p>
              <p style={{ color: "#888", fontSize: "0.8rem" }}>pro Tag</p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.6 }}>Kein separates Arbeitszimmer nötig – auch Küchentisch oder Sofa zählt!</p>
            </div>
          </div>
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>100 Tage Homeoffice</span><span className="cl-kaffee-wert">600 €</span></div>
            <div className="cl-kaffee-zeile"><span>200 Tage Homeoffice</span><span className="cl-kaffee-wert">1.200 €</span></div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight"><span>Maximum</span><span className="cl-kaffee-wert cl-kaffee-big">1.260 €</span></div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein persönlicher Werbungskosten-Rechner</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
            <div>
              <p style={{ color: "#aaa", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Weg zur Arbeit: <strong style={{ color: "#fff" }}>{fahrtkm} km</strong> × 230 Tage</p>
              <input type="range" min={1} max={80} value={fahrtkm} onChange={e => setFahrtkm(Number(e.target.value))}
                className="rc-slider rc-slider-full" style={{ background: sliderBg(fahrtkm, 1, 80) }} />
            </div>
            <div>
              <p style={{ color: "#aaa", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Homeoffice-Tage: <strong style={{ color: "#fff" }}>{hoDays}</strong></p>
              <input type="range" min={0} max={210} value={hoDays} onChange={e => setHoDays(Number(e.target.value))}
                className="rc-slider rc-slider-full" style={{ background: sliderBg(hoDays, 0, 210) }} />
            </div>
            <div>
              <p style={{ color: "#aaa", fontSize: "0.8rem", marginBottom: "0.3rem" }}>Fortbildungen & Arbeitsmittel: <strong style={{ color: "#fff" }}>{fortbild} €</strong></p>
              <input type="range" min={0} max={2000} step={50} value={fortbild} onChange={e => setFortbild(Number(e.target.value))}
                className="rc-slider rc-slider-full" style={{ background: sliderBg(fortbild, 0, 2000) }} />
            </div>
          </div>
          <div className="cl-kaffee-ergebnis" style={{ marginTop: "0.75rem" }}>
            <div className="cl-kaffee-zeile"><span>Deine Werbungskosten</span><span className="cl-kaffee-wert">{Math.round(gesamt).toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Über Pauschbetrag (1.230 €)</span><span className="cl-kaffee-wert">{mehrWert.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight"><span>Geschätzte Ersparnis (~30 %)</span><span className="cl-kaffee-wert cl-kaffee-big">{erstattungEst.toLocaleString("de-DE")} €</span></div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Weitere absetzbare Kosten</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🤝</span><p><strong>Gewerkschaftsbeiträge:</strong> 100 % der Kosten absetzbar</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💊</span><p><strong>Spenden:</strong> Bis 20 % des Einkommens absetzbar (Sonderausgaben)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎓</span><p><strong>Zweitstudium / Berufsausbildung:</strong> Alle Kosten als Werbungskosten</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏠</span><p><strong>Doppelte Haushaltsführung:</strong> Wenn du berufsbedingt zwei Wohnungen hast</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Finanzamt zahlt mit – wenn du es weißt</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🚗</span><p>Fahrtkosten, Homeoffice, Arbeitsmittel – alles absetzbar</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📋</span><p>Über 1.230 € Pauschbetrag lohnt sich die Steuererklärung immer</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🧾</span><p>Belege sammeln – digital geht auch (Foto vom Kassenbon)</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L703Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [gewinn, setGewinn]     = useState(2000)
  const freibetrag              = 1000
  const steuerpflichtig         = Math.max(0, gewinn - freibetrag)
  const steuer                  = Math.round(steuerpflichtig * 0.26375)
  const netto                   = gewinn - steuer

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Du hast 1.000 € mit ETFs verdient. Das Finanzamt will 263 €. Legal vermeiden? Ja."</div>
          <p className="cl-hook-sub">Der Freistellungsauftrag ist das mächtigste legale Steuertool für Anleger.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Abgeltungssteuer – so funktioniert sie</h2>
          <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
            <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ef4444" }}>26,375 %</p>
            <p style={{ color: "#888", fontSize: "0.85rem" }}>25 % Abgeltungssteuer + 5,5 % Solidaritätszuschlag</p>
          </div>
          <div className="cl-invisible-liste">
            {[
              { icon: "📈", name: "Kursgewinne",      val: "Beim Verkauf fällig" },
              { icon: "💵", name: "Dividenden",        val: "Bei Ausschüttung fällig" },
              { icon: "💰", name: "Zinsen",            val: "Tagesgeld, Festgeld, Anleihen" },
              { icon: "🤖", name: "Automatisch",       val: "Bank führt Steuer ab – kein Aufwand" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.8rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Sparerpauschbetrag – 1.000 € steuerfrei</h2>
          <div style={{ textAlign: "center", padding: "0.75rem 0" }}>
            <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "#10B981" }}>1.000 €</p>
            <p style={{ color: "#888", fontSize: "0.85rem" }}>Singles · 2.000 € bei Ehepaaren (zusammen veranlagt)</p>
          </div>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>
            Die ersten 1.000 € Kapitalerträge pro Jahr sind komplett steuerfrei. Um das zu nutzen, musst du bei deiner Bank einen <strong style={{ color: "#fff" }}>Freistellungsauftrag</strong> einrichten.
          </p>
          <div style={{ background: "#10B98111", border: "1px solid #10B98133", borderRadius: "10px", padding: "0.65rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#10B981", fontSize: "0.82rem", margin: 0 }}>Hast du mehrere Depots? Dann den Freibetrag aufteilen – max. gesamt 1.000 €.</p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Freistellungsauftrag bei mehreren Banken</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { name: "Trade Republic", betrag: 600, x: 15 },
              { name: "DKB Depot",      betrag: 250, x: 103 },
              { name: "ING Tagesgeld", betrag: 150, x: 191 },
            ].map((b, i) => (
              <g key={i}>
                <rect x={b.x} y="20" width="72" height="75" rx="8" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
                <text x={b.x + 36} y="38" textAnchor="middle" fill="#888" fontSize="7">{b.name}</text>
                <text x={b.x + 36} y="62" textAnchor="middle" fill="#10B981" fontSize="15" fontWeight="800">{b.betrag}</text>
                <text x={b.x + 36} y="76" textAnchor="middle" fill="#10B981" fontSize="8">€</text>
                <text x={b.x + 36} y="90" textAnchor="middle" fill="#666" fontSize="7">Freistellung</text>
              </g>
            ))}
            <text x="130" y="118" textAnchor="middle" fill="#aaa" fontSize="8">Gesamt: 1.000 € = 1 Sparerpauschbetrag ✅</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.8rem", lineHeight: 1.6, marginTop: "0.5rem" }}>Wichtig: Die Summe aller Freistellungsaufträge darf 1.000 € nicht überschreiten.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuer-Rechner</h2>
          <p className="cl-card-sub">Kapitalerträge: <strong>{gewinn.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={0} max={10000} step={100} value={gewinn}
            onChange={e => setGewinn(Number(e.target.value))}
            className="rc-slider rc-slider-full"
            style={{ background: sliderBg(gewinn, 0, 10000), marginBottom: "1.25rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>Freibetrag</span><span style={{ color: "#10B981", fontWeight: 600 }}>−{Math.min(gewinn, freibetrag).toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Steuerpflichtig</span><span className="cl-kaffee-wert">{steuerpflichtig.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Abgeltungssteuer (26,375 %)</span><span style={{ color: "#ef4444", fontWeight: 600 }}>−{steuer.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight"><span>Netto für dich</span><span className="cl-kaffee-wert cl-kaffee-big">{netto.toLocaleString("de-DE")} €</span></div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Verlustverrechnung – Verluste sind nicht verloren</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">📉</span>
              <p>Verluste aus Aktienverkäufen können mit Gewinnen aus Aktien verrechnet werden – weniger Steuer!</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">🔄</span>
              <p><strong>Tax-Loss-Harvesting:</strong> Aktien mit Verlust bewusst verkaufen, um Gewinne steuerlich auszugleichen</p>
            </div>
            <div className="cl-takeaway">
              <span className="cl-takeaway-icon">⚠️</span>
              <p>Verluste aus Aktien können nur mit Aktiengewinnen verrechnet werden – nicht mit ETF-Gewinnen</p>
            </div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuer-optimierte Strategien</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔄</span><p><strong>Thesaurierende ETFs:</strong> Keine Ausschüttungen → keine Steuer auf Dividenden während der Ansparphase</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📅</span><p><strong>Freistellungsauftrag ausschöpfen:</strong> Gewinne bis 1.000 € jährlich realisieren ohne Steuer</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">👶</span><p><strong>Früh anfangen:</strong> Je länger du nicht verkaufst, desto länger wächst Kapital ohne Steuerabzug</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuern legaal minimieren</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p>Freistellungsauftrag stellen – 1.000 € Kapitalerträge steuerfrei</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔄</span><p>Thesaurierende ETFs: Steuern erst beim Verkauf fällig</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Verluste können mit Gewinnen verrechnet werden</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L801Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [kaufpreis, setKaufpreis] = useState(350000)
  const [miete, setMiete]         = useState(1100)
  const nebenkosten = Math.round(kaufpreis * 0.12)
  const eigenkapital = Math.round(kaufpreis * 0.20)
  const kredit = kaufpreis - eigenkapital
  const rate   = Math.round(kredit * (0.04 / 12) / (1 - Math.pow(1 + 0.04 / 12, -300)))
  const differenz = rate - miete

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Mieten ist rausgeworfenes Geld." – Oder doch nicht?</div>
          <p className="cl-hook-sub">Die ehrlichste Antwort auf die meist diskutierte Finanzfrage.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der Mythos des Eigenheims</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>
            "Miete ist rausgeworfenes Geld" ist einer der teuersten Mythen der deutschen Finanzwelt. Denn Mieter zahlen für <strong style={{ color: "#fff" }}>Wohnraum</strong> – Käufer zahlen auch für Zinsen, Instandhaltung, Steuern.
          </p>
          <div style={{ background: "#ef444411", border: "1px solid #ef444433", borderRadius: "10px", padding: "0.75rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ef4444", fontSize: "0.83rem", fontWeight: 600, marginBottom: "0.25rem" }}>Was Käufer oft vergessen:</p>
            <p style={{ color: "#aaa", fontSize: "0.8rem", margin: 0 }}>Zinsen · Grunderwerbsteuer · Notar · Makler · Instandhaltung · Grundsteuer · keine Flexibilität</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Versteckte Kaufkosten</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { label: "Kaufpreis",          pct: 0.77, farbe: "#7C3AED" },
              { label: "Grunderwerbsteuer",  pct: 0.06, farbe: "#ef4444" },
              { label: "Notar & Grundbuch",  pct: 0.02, farbe: "#F59E0B" },
              { label: "Makler",             pct: 0.035, farbe: "#9D174D" },
              { label: "Reserve",            pct: 0.115, farbe: "#333" },
            ].reduce((acc, seg, i, arr) => {
              const prev = acc.offset
              acc.items.push(
                <g key={i}>
                  <rect x={10 + prev * 240} y="40" width={seg.pct * 240} height="40" fill={seg.farbe} rx={i === 0 ? "8 0 0 8" : i === arr.length-1 ? "0 8 8 0" : "0"} />
                  {seg.pct > 0.05 && <text x={10 + prev * 240 + seg.pct * 120} y="65" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="600">{Math.round(seg.pct * 100)}%</text>}
                  <text x={10 + prev * 240 + seg.pct * 120} y="98" textAnchor="middle" fill="#888" fontSize="6.5">{seg.label}</text>
                </g>
              )
              acc.offset += seg.pct
              return acc
            }, { items: [], offset: 0 }).items}
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }}>Bei 350.000 € Kaufpreis: ~42.000 € Nebenkosten on top!</p>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Mieten vs. Kaufen – dein Rechner</h2>
          <p className="cl-card-sub">Kaufpreis: <strong>{kaufpreis.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={100000} max={800000} step={10000} value={kaufpreis}
            onChange={e => setKaufpreis(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBg(kaufpreis, 100000, 800000), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Vergleichsmiete: <strong>{miete.toLocaleString("de-DE")} €/Monat</strong></p>
          <input type="range" min={400} max={3000} step={50} value={miete}
            onChange={e => setMiete(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBg(miete, 400, 3000), marginBottom: "1rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>Nebenkosten (12 %)</span><span style={{ color: "#ef4444", fontWeight: 600 }}>{nebenkosten.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Monatliche Rate (4 %, 25 J.)</span><span className="cl-kaffee-wert">{rate.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Rate vs. Miete</span>
              <span style={{ color: differenz > 0 ? "#ef4444" : "#10B981", fontWeight: 600 }}>{differenz > 0 ? "+" : ""}{differenz.toLocaleString("de-DE")} €</span>
            </div>
          </div>
          <p style={{ color: "#666", fontSize: "0.72rem", marginTop: "0.5rem" }}>Vereinfacht – ohne Instandhaltung, Grundsteuer und Opportunitätskosten.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wann kaufen wirklich Sinn ergibt</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📅</span><p><strong>Lange Haltedauer:</strong> Mindestens 10, besser 15–20 Jahre – sonst fressen Nebenkosten den Gewinn</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p><strong>Eigenkapital:</strong> Mindestens 20 % – sonst zu hohe Zinsen und PMI-Kosten</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💼</span><p><strong>Stabiles Einkommen:</strong> Variable Einkommen machen lange Kredite riskant</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">❤️</span><p><strong>Lebensstil:</strong> Du willst sesshaft sein und selbst gestalten können</p></div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die 5%-Regel</h2>
          <div style={{ background: "#F59E0B11", border: "1px solid #F59E0B44", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Formel:</p>
            <p style={{ color: "#fff", fontSize: "0.9rem", fontFamily: "monospace" }}>Kaufpreis × 5 % ÷ 12 = monatliche Opportunitätskosten</p>
          </div>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem", marginTop: "0.75rem" }}>
            Diese 5 % setzen sich zusammen aus: ~1 % Grundsteuer/Versicherung, ~1 % Instandhaltung, ~3 % Opportunitätskosten des Eigenkapitals (was du stattdessen im ETF verdienen könntest).<br /><br />
            Ist die <strong style={{ color: "#fff" }}>Miete günstiger</strong> als dieser Wert? Dann ist Mieten finanziell sinnvoller.
          </p>
          <div className="cl-kaffee-ergebnis" style={{ marginTop: "0.75rem" }}>
            <div className="cl-kaffee-zeile"><span>Bei 400.000 € Kaufpreis</span><span className="cl-kaffee-wert">1.667 €/Monat</span></div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">REITs – Immobilien ohne Immobilie</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏢</span><p><strong>REIT</strong> = Real Estate Investment Trust – börsengehandelte Immobilienfonds</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💵</span><p>REITs müssen 90 % der Erträge ausschütten – hohe Dividendenrenditen (4–6 %)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✅</span><p>Ab 1 € investieren, sofort liquide, weltweite Diversifikation – ohne Kredit und Instandhaltung</p></div>
          </div>
          <div style={{ background: "#F59E0B11", border: "1px solid #F59E0B33", borderRadius: "10px", padding: "0.65rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#F59E0B", fontSize: "0.82rem", margin: 0 }}>ETF-Tipp: iShares Developed Markets Property Yield ETF (WKN: A0LEW8)</p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Mieten vs. Kaufen – kein Richtig oder Falsch</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🧮</span><p>Kaufnebenkosten: 10–15 % on top – das ist echtes Geld das weg ist</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📅</span><p>Kaufen lohnt sich erst bei 10+ Jahren – erst dann amortisieren die Nebenkosten</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏢</span><p>REITs: Immobilien-Rendite ohne Kredit und Instandhaltung – ab 1 €</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L802Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [darlehensbetrag, setDarlehensbetrag] = useState(280000)
  const [zinssatz, setZinssatz]               = useState(3.5)
  const [laufzeit, setLaufzeit]               = useState(25)
  const r = zinssatz / 100 / 12
  const n = laufzeit * 12
  const rate = r > 0 ? Math.round(darlehensbetrag * r / (1 - Math.pow(1 + r, -n))) : Math.round(darlehensbetrag / n)
  const gesamtzahlung = rate * n
  const zinsenGesamt  = gesamtzahlung - darlehensbetrag

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Eine falsche Entscheidung bei der Finanzierung kostet dich 50.000 €+"</div>
          <p className="cl-hook-sub">Zinssatz, Zinsbindung, Eigenkapital – drei Stellschrauben die zählen.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die wichtigsten Begriffe</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "📊", name: "Annuität",    val: "Gleichbleibende monatliche Rate aus Zins + Tilgung" },
              { icon: "📉", name: "Tilgung",     val: "Dein Anteil der die Schulden wirklich reduziert" },
              { icon: "💸", name: "Zinsen",      val: "Was die Bank für den Kredit verlangt" },
              { icon: "💰", name: "Restschuld",  val: "Was nach X Jahren noch zurückzuzahlen ist" },
              { icon: "🔒", name: "Zinsbindung", val: "Zeitraum mit festem Zinssatz (10/15/20 Jahre)" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.78rem", marginLeft: "auto", maxWidth: "55%", textAlign: "right" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Tilgungsplan – wie ein Darlehen funktioniert</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.75rem" }}>
            {[1, 5, 10, 15, 20, 25].map((jahr, i) => {
              const remaining = darlehensbetrag * Math.pow(1 + 3.5/100/12, jahr * 12) - rate * (Math.pow(1 + 3.5/100/12, jahr * 12) - 1) / (3.5/100/12)
              const restPct = Math.max(0, Math.min(1, remaining / darlehensbetrag))
              const h = restPct * 90
              const x = 15 + i * 40
              return (
                <g key={i}>
                  <rect x={x} y={20} width="28" height="90" fill="#1a1a2e" rx="4" />
                  <rect x={x} y={20 + 90 - h} width="28" height={h} fill={restPct > 0.5 ? "#ef4444" : restPct > 0.2 ? "#F59E0B" : "#10B981"} rx="4"
                    style={{ transition: "all 0.5s ease" }} />
                  <text x={x + 14} y={115 + 6} textAnchor="middle" fill="#888" fontSize="7">J.{jahr}</text>
                  <text x={x + 14} y={16} textAnchor="middle" fill="#ccc" fontSize="6">{Math.round(restPct * 100)}%</text>
                </g>
              )
            })}
            <text x="130" y="125" textAnchor="middle" fill="#666" fontSize="7">Restschuld in % über 25 Jahre (4%, vereinfacht)</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center" }}>Am Anfang zahlt man vor allem Zinsen – die Tilgung steigt mit der Zeit.</p>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein Kreditrechner</h2>
          <p className="cl-card-sub">Darlehen: <strong>{darlehensbetrag.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={50000} max={800000} step={10000} value={darlehensbetrag}
            onChange={e => setDarlehensbetrag(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBg(darlehensbetrag, 50000, 800000), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Zinssatz: <strong>{zinssatz.toFixed(1)} %</strong></p>
          <input type="range" min={1} max={7} step={0.1} value={zinssatz}
            onChange={e => setZinssatz(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBg(zinssatz, 1, 7), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Laufzeit: <strong>{laufzeit} Jahre</strong></p>
          <input type="range" min={5} max={35} value={laufzeit}
            onChange={e => setLaufzeit(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBg(laufzeit, 5, 35), marginBottom: "1rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>Monatliche Rate</span><span className="cl-kaffee-wert cl-kaffee-big">{rate.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Gesamtzinsen</span><span style={{ color: "#ef4444", fontWeight: 600 }}>{zinsenGesamt.toLocaleString("de-DE")} €</span></div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Eigenkapital – warum 20 % entscheidend sind</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Weniger Kredit → weniger Zinsen → günstigere monatliche Rate</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>Banken geben bessere Zinssätze bei hohem Eigenkapital (Beleihungsauslauf unter 80 %)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p>Sicherheitspolster: Sinkt der Immobilienwert, bist du nicht sofort "underwater"</p></div>
          </div>
          <div style={{ background: "#F59E0B11", border: "1px solid #F59E0B44", borderRadius: "10px", padding: "0.65rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#F59E0B", fontSize: "0.82rem", margin: 0 }}>Faustregel: Eigenkapital ≥ Nebenkosten (12 %) + 20 % des Kaufpreises.</p>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Zinsbindung – 10, 15 oder 20 Jahre?</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            {[
              { jahre: "10 J.", farbe: "#10B981", vor: "Günstigster Zins", nach: "Zinsrisiko nach 10 J." },
              { jahre: "15 J.", farbe: "#F59E0B", vor: "Balance",          nach: "Mittleres Risiko" },
              { jahre: "20 J.", farbe: "#7C3AED", vor: "Maximale Sicherheit", nach: "Höchster Zins" },
            ].map(z => (
              <div key={z.jahre} style={{ flex: 1, background: "#1a1a2e", borderRadius: "10px", padding: "0.75rem", border: `1px solid ${z.farbe}44` }}>
                <p style={{ color: z.farbe, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>{z.jahre}</p>
                <p style={{ color: "#10B981", fontSize: "0.75rem", marginBottom: "0.25rem" }}>✅ {z.vor}</p>
                <p style={{ color: "#ef4444", fontSize: "0.75rem" }}>⚠️ {z.nach}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#aaa", fontSize: "0.82rem", lineHeight: 1.6, marginTop: "0.75rem" }}>In Niedrigzinsphasen: lange Zinsbindung. In Hochzinsphasen: kürzer binden und später umschulden.</p>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die häufigsten Fehler bei der Finanzierung</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "⚠️", name: "Zu wenig Tilgung (unter 2 %)",  val: "Kredit läuft ewig" },
              { icon: "⚠️", name: "Zu kurze Zinsbindung",          val: "Zinsschock bei Anschluss" },
              { icon: "⚠️", name: "Kein Eigenkapital-Puffer",      val: "Nebenkosten unterschätzt" },
              { icon: "⚠️", name: "Nur eine Bank gefragt",         val: "Kein Zinsvergleich gemacht" },
              { icon: "⚠️", name: "Instandhaltung vergessen",      val: "1 % vom Kaufpreis / Jahr einplanen" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name" style={{ fontSize: "0.8rem" }}>{r.name}</span>
                <span style={{ color: "#ef4444", fontSize: "0.78rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Immobilienfinanzierung richtig gemacht</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏦</span><p>Mindestens 20 % Eigenkapital + Nebenkosten (12 %) aus eigener Tasche</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔒</span><p>Zinsbindung dem Markt anpassen – in Hochzinsphasen kürzer, in Niedrigzinsphasen länger</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔄</span><p>Mindestens 2 % Tilgung – sonst läuft der Kredit noch nach 40 Jahren</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L901Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Deutsche haben durchschnittlich 7 Versicherungen. 3 davon sind Abzocke."</div>
          <p className="cl-hook-sub">Das Prinzip: Nur versichern was du nicht selbst tragen kannst.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das goldene Prinzip</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", margin: "0.75rem 0" }}>
            <p style={{ color: "#fff", fontWeight: 700, marginBottom: "0.5rem" }}>Versicherung = Schutz vor Risiken die dich finanziell ruinieren</p>
            <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.6 }}>
              Handyversicherung: 15 €/Monat für ein 800 € Gerät – du könntest es selbst zahlen.<br />
              Haftpflicht: 7 €/Monat für bis zu 50 Mio. € Schaden – das kannst du NICHT selbst zahlen.
            </p>
          </div>
          <p style={{ color: "#aaa", fontSize: "0.88rem", lineHeight: 1.6 }}>
            <strong style={{ color: "#fff" }}>Regel:</strong> Versichern nur wenn ein Schaden dich existenziell treffen würde. Für alles andere: selbst sparen.
          </p>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Versicherungs-Pyramide</h2>
          <svg viewBox="0 0 260 180" style={{ width: "100%", marginTop: "0.5rem" }}>
            <polygon points="130,10 200,70 60,70" fill="#ef444488" stroke="#ef4444" strokeWidth="1.5" />
            <text x="130" y="32" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">🔒 PFLICHT</text>
            <text x="130" y="48" textAnchor="middle" fill="#fca5a5" fontSize="7">Haftpflicht · BU</text>
            <polygon points="60,75 200,75 220,130 40,130" fill="#F59E0B88" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="130" y="98" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">⚠️ SINNVOLL</text>
            <text x="130" y="114" textAnchor="middle" fill="#fde68a" fontSize="7">Hausrat · Rechtsschutz · KFZ-Kasko</text>
            <polygon points="40,135 220,135 250,175 10,175" fill="#33333388" stroke="#555" strokeWidth="1.5" />
            <text x="130" y="155" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">❌ ABZOCKE</text>
            <text x="130" y="169" textAnchor="middle" fill="#9ca3af" fontSize="7">Handy · Reiserücktritt · Restschuld</text>
          </svg>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Must-have #1: Haftpflichtversicherung</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0.75rem 0" }}>
            <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "#10B981" }}>7 €</p>
            <p style={{ color: "#aaa", fontSize: "0.85rem" }}>pro Monat – die wichtigste Versicherung überhaupt</p>
          </div>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🚴</span><p>Du fährst mit dem Fahrrad jemanden um → Krankenhauskosten + Verdienstausfall: schnell 100.000 €+</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💧</span><p>Du überschwemmst die Nachbarswohnung → Renovierungskosten: 30.000–80.000 €</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✅</span><p>Ab ~5–8 €/Monat bist du für Schäden bis 50 Mio. € abgesichert. Unersetzlich.</p></div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Must-have #2: Berufsunfähigkeitsversicherung</h2>
          <div style={{ background: "#ef444411", border: "1px solid #ef444433", borderRadius: "12px", padding: "0.75rem 1rem", margin: "0.75rem 0" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, marginBottom: "0.25rem" }}>Das ignorierte Risiko:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem" }}>Jeder 4. Deutsche wird vor Rentenalter berufsunfähig. Die staatliche Absicherung: kaum ausreichend (oft unter 800 €/Monat).</p>
          </div>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏥</span><p>Häufigste Ursachen: Psychische Erkrankungen (30 %), Krebs, Rücken – nicht nur Unfälle</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>BU-Rente sollte ~70–80 % deines Nettoeinkommens abdecken</p></div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Nice-to-have – wann sinnvoll?</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "🏠", name: "Hausratversicherung",    val: "Wenn du wertvollen Hausrat hast – ab ~5 €/Mo" },
              { icon: "⚖️", name: "Rechtsschutzversicherung", val: "Bei Mietstreit, Arbeitsrecht – ab ~15 €/Mo" },
              { icon: "🚗", name: "KFZ-Kasko",              val: "Bei neuem Fahrzeug sinnvoll" },
              { icon: "✈️", name: "Reisekrankenversicherung", val: "Bei Reisen außerhalb der EU – wichtig!" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.78rem", marginLeft: "auto", maxWidth: "50%", textAlign: "right" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Finger weg – meistens Abzocke</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "❌", name: "Handyversicherung",         val: "Selbst ansparen ist günstiger" },
              { icon: "❌", name: "Reiserücktrittsversicherung", val: "Ausnahme: teure Reisen + Vorerkrankungen" },
              { icon: "❌", name: "Restschuldversicherung",     val: "Extrem teuer, schlechte Konditionen" },
              { icon: "❌", name: "Garantieverlängerungen",    val: "Versteckte Abzocke am Kassensystem" },
              { icon: "❌", name: "Sterbegeldversicherung",    val: "Schlechtes Preis-Leistungs-Verhältnis" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#ef4444", fontSize: "0.78rem", marginLeft: "auto" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Richtig absichern – ohne Abzocke</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p>Haftpflicht (7 €/Mo) und BU sind absolute Pflicht – alles andere prüfen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🧮</span><p>Nur versichern was dich existenziell treffen würde – kein Handy, kein Toaster</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>Gesparte Versicherungsprämien in ETF → baue eigenen Selbstbehalt-Puffer auf</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
}

function L902Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [alter, setAlter]       = useState(28)
  const [netto, setNetto]       = useState(2500)
  const buRente                 = Math.round(netto * 0.75)
  const monatsBeitrag           = Math.round((buRente / 1000) * (alter < 30 ? 35 : alter < 40 ? 55 : 85))

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Jeder 4. Deutsche wird vor der Rente berufsunfähig. Die gesetzliche Absicherung: fast nichts."</div>
          <p className="cl-hook-sub">Das größte Risiko das niemand im Kopf hat.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist Berufsunfähigkeit?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>
            Berufsunfähig ist, wer seinen zuletzt ausgeübten Beruf dauerhaft zu <strong style={{ color: "#fff" }}>mindestens 50 %</strong> nicht mehr ausüben kann.
          </p>
          <div className="cl-invisible-liste" style={{ marginTop: "0.75rem" }}>
            <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Häufigste Ursachen:</p>
            {[
              { icon: "🧠", name: "Psychische Erkrankungen",  val: "~30 %" },
              { icon: "💀", name: "Krebs & schwere Krankh.",  val: "~18 %" },
              { icon: "🦴", name: "Skelett & Muskel",         val: "~21 %" },
              { icon: "❤️", name: "Herzerkrankungen",         val: "~10 %" },
              { icon: "🚗", name: "Unfälle",                  val: "~8 %" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile">
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span className="cl-inv-betrag">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Staatliche BU-Rente vs. Bedarf</h2>
          <svg viewBox="0 0 260 150" style={{ width: "100%", marginTop: "0.5rem" }}>
            <rect x="20" y="30" width="90" height="100" rx="6" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
            <rect x="20" y={130 - 35} width="90" height="35" rx="6" fill="#ef4444" opacity="0.8" />
            <text x="65" y="55" textAnchor="middle" fill="#888" fontSize="8">Staatliche</text>
            <text x="65" y="67" textAnchor="middle" fill="#888" fontSize="8">BU-Rente</text>
            <text x="65" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">~800 €</text>
            <text x="65" y="120" textAnchor="middle" fill="#fca5a5" fontSize="7">pro Monat</text>
            <rect x="150" y="30" width="90" height="100" rx="6" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
            <rect x="150" y={130 - 80} width="90" height="80" rx="6" fill="#10B981" opacity="0.8" />
            <text x="195" y="55" textAnchor="middle" fill="#888" fontSize="8">Was du</text>
            <text x="195" y="67" textAnchor="middle" fill="#888" fontSize="8">wirklich brauchst</text>
            <text x="195" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">~2.500 €</text>
            <text x="195" y="115" textAnchor="middle" fill="#6ee7b7" fontSize="7">pro Monat</text>
            <text x="130" y="145" textAnchor="middle" fill="#888" fontSize="7.5">Lücke: ~1.700 € / Monat</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center" }}>Die staatliche BU-Rente reicht bei weitem nicht zum Leben.</p>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wie funktioniert eine BU-Versicherung?</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📋</span><p>Du schließt eine Versicherung ab – mit einer <strong>monatlichen BU-Rente</strong> die dir ausgezahlt wird, wenn du berufsunfähig wirst</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>Du zahlst monatlich einen Beitrag – je jünger und gesünder, desto günstiger</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏥</span><p>Der Versicherer zahlt wenn ein Arzt bescheinigt dass du deinen Beruf zu min. 50 % nicht mehr ausüben kannst</p></div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein BU-Rechner</h2>
          <p className="cl-card-sub">Dein Alter: <strong>{alter} Jahre</strong></p>
          <input type="range" min={18} max={55} value={alter}
            onChange={e => setAlter(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBg(alter, 18, 55), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Nettoeinkommen: <strong>{netto.toLocaleString("de-DE")} €/Monat</strong></p>
          <input type="range" min={1000} max={8000} step={100} value={netto}
            onChange={e => setNetto(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBg(netto, 1000, 8000), marginBottom: "1rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>Empfohlene BU-Rente (75 %)</span><span className="cl-kaffee-wert">{buRente.toLocaleString("de-DE")} €/Mo</span></div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight"><span>Geschätzter Monatsbeitrag</span><span className="cl-kaffee-wert cl-kaffee-big">~{monatsBeitrag.toLocaleString("de-DE")} €</span></div>
          </div>
          <p style={{ color: "#666", fontSize: "0.72rem", marginTop: "0.5rem" }}>Grobe Schätzung – je nach Gesundheit, Beruf und Anbieter variiert der Beitrag stark.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Worauf beim Abschluss achten</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "✅", name: "Keine abstrakte Verweisung", val: "Versicherer kann dich nicht auf anderen Beruf verweisen" },
              { icon: "✅", name: "Nachversicherungsgarantie",  val: "Rente erhöhen ohne neue Gesundheitsfragen" },
              { icon: "✅", name: "Leistung ab 50 % BU",        val: "Nicht erst ab 100 % Berufsunfähigkeit" },
              { icon: "✅", name: "Weltweite Gültigkeit",       val: "Auch bei Auslandsaufenthalt" },
              { icon: "⚠️", name: "Gesundheitsfragen",          val: "Vollständig und ehrlich beantworten!" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <span className="cl-inv-name">{r.name}</span>
                <span style={{ color: "#aaa", fontSize: "0.78rem", marginLeft: "auto", maxWidth: "50%", textAlign: "right" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wann abschließen? Jetzt!</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { alter: "25", beitrag: 40, farbe: "#10B981" },
              { alter: "30", beitrag: 60, farbe: "#0EA5E9" },
              { alter: "35", beitrag: 95, farbe: "#F59E0B" },
              { alter: "40", beitrag: 145, farbe: "#ef4444" },
              { alter: "45", beitrag: 220, farbe: "#9D174D" },
            ].map((d, i) => {
              const h = (d.beitrag / 220) * 90
              const x = 20 + i * 46
              return (
                <g key={i}>
                  <rect x={x} y={100 - h} width="34" height={h} fill={d.farbe} rx="3" opacity="0.85" />
                  <text x={x + 17} y={95 - h} textAnchor="middle" fill="white" fontSize="8" fontWeight="700">~{d.beitrag}€</text>
                  <text x={x + 17} y="115" textAnchor="middle" fill="#888" fontSize="7.5">{d.alter} J.</text>
                </g>
              )
            })}
            <line x1="15" y1="100" x2="250" y2="100" stroke="#333" strokeWidth="1" />
            <text x="130" y="128" textAnchor="middle" fill="#666" fontSize="7">Monatsbeitrag für 2.000 € BU-Rente je nach Einstiegsalter</text>
          </svg>
          <p style={{ color: "#10B981", fontSize: "0.85rem", textAlign: "center", marginTop: "0.25rem" }}>Je früher, desto günstiger – und keine Vorerkrankungen ausschließen.</p>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">BU – die wichtigste Versicherung neben Haftpflicht</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>Jeder 4. Deutsche wird vor der Rente berufsunfähig – kein seltenes Risiko</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>BU-Rente = 70–80 % des Nettos · je jünger, desto günstiger</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔍</span><p>Auf "keine abstrakte Verweisung" und Nachversicherungsgarantie achten</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} />
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
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: "40%" }} />
          </div>
          <span className="lektion-progress-label">Lesen · ~5 Min</span>
        </div>
        <p className="theorie-label">📖 Lerneinheit</p>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>{lektion.titel}</h2>
        {lektion.inhalt.split("\n\n").map((absatz, i) => (
          <p key={i} style={{ color: "#ccc", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "0.95rem" }}>{absatz}</p>
        ))}
        <button className="weiter-btn" onClick={() => setPhase("quiz")}>Zum Verständnisquiz →</button>
      </div>
    )
  }

  if (phase === "quiz") {
    const richtigGewaehlt = gewaehlt === aktuelleFrage.richtig
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={() => setPhase("lesen")}>← Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${60 + ((aktualeFrage + 1) / fragen.length) * 40}%` }} />
          </div>
          <span className="lektion-progress-label">Quiz · {aktualeFrage + 1} / {fragen.length}</span>
        </div>
        <p className="theorie-label">🧠 Verständnisquiz</p>
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
          <div className={`feedback ${richtigGewaehlt ? "feedback-richtig" : "feedback-falsch"}`}>
            <p>{richtigGewaehlt ? "✅ Richtig!" : "❌ Falsch!"}</p>
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
      <div className="screen">
        <div className="ergebnis-screen">
          <div className="ergebnis-emoji">{perfekt ? "🎉" : "📚"}</div>
          <h1 className="ergebnis-titel">{perfekt ? "Perfekt!" : "Fast!"}</h1>
          <p className="ergebnis-sub">{richtige} von {fragen.length} Fragen richtig</p>
          {perfekt
            ? <p className="ergebnis-xp">+{verdientXP} XP</p>
            : <p className="ergebnis-sub" style={{ marginTop: "0.25rem" }}>Alle Fragen richtig für XP – versuch es nochmal</p>}
          {!perfekt && (
            <button className="weiter-btn" style={{ marginTop: "1.5rem", background: "#2a2040", color: "#fff" }}
              onClick={() => { setPhase("lesen"); setAktualeFrage(0); setGewaehlt(null); setRichtige(0) }}>
              Nochmal lesen
            </button>
          )}
          <button className="weiter-btn" style={{ marginTop: "1rem" }} onClick={() => onAbgeschlossen(verdientXP)}>
            {perfekt ? "Weiter" : "Trotzdem weiter"}
          </button>
        </div>
      </div>
    )
  }
}

function LevelUpModal({ levelUpInfo, onClose }) {
  if (!levelUpInfo) return null
  return (
    <div className="level-up-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={e => e.stopPropagation()}>
        <div className="level-up-emoji">🎉</div>
        <h2 className="level-up-titel">Level Up!</h2>
        <div className="level-up-zahl">{levelUpInfo.newLevel}</div>
        <p className="level-up-sub">Du bist jetzt Level {levelUpInfo.newLevel}!</p>
        <button className="weiter-btn" onClick={onClose}>Weiter →</button>
      </div>
    </div>
  )
}

function DailyQuestScreen({ abgeschlosseneQuests, onQuestAbgeschlossen }) {
  const [aktiverQuest, setAktiverQuest] = useState(null)
  const [phase, setPhase] = useState("quiz")
  const [aktualeFrage, setAktualeFrage] = useState(0)
  const [gewaehlt, setGewaehlt] = useState(null)
  const [richtige, setRichtige] = useState(0)

  const heuteKey = getHeute()
  const heuteAbgeschlossen = abgeschlosseneQuests[heuteKey]
  const wochentag = new Date().getDay()
  const heutigerQuest = dailyQuests[wochentag] || dailyQuests[0]

  function questStarten(quest) {
    setAktiverQuest(quest)
    setPhase("quiz")
    setAktualeFrage(0)
    setGewaehlt(null)
    setRichtige(0)
  }

  function antworten(index) {
    if (gewaehlt !== null) return
    setGewaehlt(index)
    if (index === aktiverQuest.fragen[aktualeFrage].richtig) setRichtige(r => r + 1)
  }

  function naechsteFrage() {
    if (aktualeFrage + 1 >= aktiverQuest.fragen.length) {
      setPhase("ergebnis")
    } else {
      setAktualeFrage(aktualeFrage + 1)
      setGewaehlt(null)
    }
  }

  if (aktiverQuest && phase === "quiz") {
    const frage = aktiverQuest.fragen[aktualeFrage]
    const richtigGewaehlt = gewaehlt === frage.richtig
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={() => setAktiverQuest(null)}>← Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${((aktualeFrage + 1) / aktiverQuest.fragen.length) * 100}%` }} />
          </div>
          <span className="lektion-progress-label">Quest · {aktualeFrage + 1} / {aktiverQuest.fragen.length}</span>
        </div>
        <p className="theorie-label">⚔️ Daily Quest</p>
        <h2 className="frage">{frage.text}</h2>
        <div className="antworten">
          {frage.antworten.map((a, i) => (
            <button
              key={i}
              className={`antwort-btn ${gewaehlt !== null ? i === frage.richtig ? "richtig" : gewaehlt === i ? "falsch" : "" : ""}`}
              onClick={() => antworten(i)}
            >
              {a}
            </button>
          ))}
        </div>
        {gewaehlt !== null && (
          <div className={`feedback ${richtigGewaehlt ? "feedback-richtig" : "feedback-falsch"}`}>
            <p>{richtigGewaehlt ? "✅ Richtig!" : "❌ Falsch!"}</p>
            <button className="weiter-btn" onClick={naechsteFrage}>
              {aktualeFrage + 1 >= aktiverQuest.fragen.length ? "Ergebnis →" : "Weiter →"}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (aktiverQuest && phase === "ergebnis") {
    const perfekt = richtige === aktiverQuest.fragen.length
    const fast = richtige === aktiverQuest.fragen.length - 1
    const verdientXP = perfekt ? aktiverQuest.xp : fast ? 7 : 0
    return (
      <div className="screen">
        <div className="ergebnis-screen">
          <div className="ergebnis-emoji">{perfekt ? "⚔️" : "🛡️"}</div>
          <h1 className="ergebnis-titel">{perfekt ? "Quest geschafft!" : "Gut gekämpft!"}</h1>
          <p className="ergebnis-sub">{richtige} von {aktiverQuest.fragen.length} richtig</p>
          <p className="ergebnis-xp">+{verdientXP} XP</p>
          <button className="weiter-btn" style={{ marginTop: "1.5rem" }} onClick={() => {
            onQuestAbgeschlossen(aktiverQuest.id, verdientXP)
            setAktiverQuest(null)
          }}>
            Fertig
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Daily Quest</h1>
        <p className="xp-info">Jeden Tag ein neues Wissens-Quest</p>
      </div>

      {heuteAbgeschlossen ? (
        <div className="quest-heute-fertig">
          <div style={{ fontSize: "3rem", textAlign: "center", marginBottom: "1rem" }}>✅</div>
          <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Heute erledigt!</h2>
          <p style={{ textAlign: "center", color: "#888", fontSize: "0.9rem" }}>Komm morgen für ein neues Quest wieder.</p>
        </div>
      ) : (
        <div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: "1rem" }}>
            Dein heutiges Quest – komm morgen für ein neues wieder.
          </p>
          <div className="lektionen-liste" style={{ marginTop: 0 }}>
            <div
              className="lektion-karte"
              onClick={() => questStarten(heutigerQuest)}
              style={{ border: "1px solid #7C3AED55", boxShadow: "0 0 20px #7C3AED22" }}
            >
              <div className="lektion-status">⚔️</div>
              <div className="lektion-info">
                <p className="lektion-titel">{heutigerQuest.titel}</p>
                <p className="lektion-xp">{heutigerQuest.beschreibung}</p>
                <p className="lektion-xp">+{heutigerQuest.xp} XP bei 3/3 · +7 XP bei 2/3</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProfilScreen({ xp, streak, abgeschlosseneLektionen, userName, userZiel, userAlter, userLebenssituation, userFinanzsituation, userWissenslevel }) {
  const level = berechneLevel(xp)
  const xpAktuell = xp - (level - 1) * 100
  const xpFortschritt = Math.min((xpAktuell / 100) * 100, 100)
  const circumference = 2 * Math.PI * 44
  const dashOffset = circumference - (xpFortschritt / 100) * circumference

  const etfGesamt = lernpfad[1].length
  const etfAbgeschlossen = lernpfad[1].filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const aktienGesamt = lernpfad[2].length
  const aktienAbgeschlossen = lernpfad[2].filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const kryptoGesamt = lernpfad[3].length
  const kryptoAbgeschlossen = lernpfad[3].filter(l => abgeschlosseneLektionen.includes(l.id)).length

  const badges = [
    { id: "erste_lektion", name: "Erster Schritt", icon: "🎯", beschreibung: "Erste Lektion", erreicht: abgeschlosseneLektionen.length >= 1 },
    { id: "etf_komplett", name: "ETF Experte", icon: "📈", beschreibung: "Alle ETF-Lektionen", erreicht: etfAbgeschlossen === etfGesamt && etfGesamt > 0 },
    { id: "aktien_start", name: "Aktien Profi", icon: "📊", beschreibung: "5 Aktien-Lektionen", erreicht: aktienAbgeschlossen >= 5 },
    { id: "aktien_komplett", name: "Wall Street", icon: "💼", beschreibung: "Alle Aktien", erreicht: aktienAbgeschlossen === aktienGesamt && aktienGesamt > 0 },
    { id: "krypto_start", name: "Krypto Einsteiger", icon: "₿", beschreibung: "1 Krypto-Lektion", erreicht: kryptoAbgeschlossen >= 1 },
    { id: "krypto_komplett", name: "Blockchain Master", icon: "⛓️", beschreibung: "Alle Krypto", erreicht: kryptoAbgeschlossen === kryptoGesamt && kryptoGesamt > 0 },
    { id: "streak_7", name: "Feuer-Streak", icon: "🔥", beschreibung: "7 Tage am Stück", erreicht: streak >= 7 },
    { id: "level_5", name: "Aufsteiger", icon: "⭐", beschreibung: "Level 5 erreicht", erreicht: level >= 5 },
    { id: "level_10", name: "Veteran", icon: "🏆", beschreibung: "Level 10 erreicht", erreicht: level >= 10 }
  ]

  const stats = [
    { label: "Lektionen", wert: abgeschlosseneLektionen.length, icon: "📖" },
    { label: "Streak", wert: `${streak} Tage`, icon: "🔥" },
    { label: "XP Gesamt", wert: xp, icon: "⚡" },
    { label: "ETF", wert: `${etfAbgeschlossen}/${etfGesamt}`, icon: "📈" },
    { label: "Aktien", wert: `${aktienAbgeschlossen}/${aktienGesamt}`, icon: "📊" },
    { label: "Krypto", wert: `${kryptoAbgeschlossen}/${kryptoGesamt}`, icon: "₿" },
  ]

  const lernpfadItems = kategorien.map(k => {
    const gesamt = (lernpfad[k.id] || []).length
    const abg = (lernpfad[k.id] || []).filter(l => abgeschlosseneLektionen.includes(l.id)).length
    const pct = gesamt > 0 ? Math.round((abg / gesamt) * 100) : 0
    return { ...k, gesamt, abg, pct }
  })

  const initials = userName
    ? userName.trim().split(/\s+/).map(w => w[0]).join("").substring(0, 2).toUpperCase()
    : "??"

  return (
    <div className="screen">
      <div className="profil-avatar-wrap">
        <div className="profil-avatar-ring">
          <svg className="profil-avatar-svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="lvlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="#9D174D"/>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="none" stroke="#2a2040" strokeWidth="7"/>
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="url(#lvlGrad)"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="profil-avatar-circle">{initials}</div>
        </div>
        <p className="profil-avatar-name">{userName || "Unbekannt"}</p>
        <p className="profil-avatar-level">Level {level} · {xpAktuell}/100 XP</p>
      </div>

      <div className="profil-xp-section">
        <div className="profil-xp-row">
          <span><strong>XP zum nächsten Level</strong></span>
          <span>{xpAktuell} / 100</span>
        </div>
        <div className="profil-xp-bar">
          <div className="profil-xp-fill" style={{ width: `${xpFortschritt}%` }} />
        </div>
      </div>

      <div className="profil-streak-card">
        <span className={`streak-flame${streak > 0 ? " active" : ""}`}>🔥</span>
        <div>
          <p style={{ fontWeight: 700, fontSize: "1rem" }}>{streak} Tage Streak</p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
            {streak > 0 ? "Weiter so! Komm morgen wieder." : "Starte deinen Streak heute."}
          </p>
        </div>
      </div>

      <h3 className="profil-section-titel">Statistiken</h3>
      <div className="profil-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="profil-stat-karte">
            <span className="profil-stat-icon">{s.icon}</span>
            <div className="profil-stat-text">
              <p className="profil-stat-wert">{s.wert}</p>
              <p className="profil-stat-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

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

      <h3 className="profil-section-titel">Dein Lernpfad</h3>
      <div className="profil-lernpfad">
        {lernpfadItems.map(k => (
          <div key={k.id} className="profil-lernpfad-item">
            <div className="plp-icon" style={{ background: k.farbe + "22", color: k.farbe }}>{k.icon}</div>
            <div className="plp-info">
              <p className="plp-name">{k.name}</p>
              <div className="plp-bar-bg">
                <div className="plp-bar-fill" style={{ width: `${k.pct}%`, background: k.farbe }} />
              </div>
            </div>
            <span className="plp-pct">{k.abg}/{k.gesamt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const NEWS_FILTER = [
  { id: "alle",   label: "Alle",    keywords: null },
  { id: "etf",    label: "ETF",     keywords: ["etf", "indexfonds", "fonds", "sparplan", "msci", "vanguard", "ishares", "xtrackers"] },
  { id: "aktien", label: "Aktien",  keywords: ["aktie", "aktien", "dax", "nasdaq", "s&p", "dividende", "kgv", "börsengang", "depot"] },
  { id: "krypto", label: "Krypto",  keywords: ["krypto", "bitcoin", "ethereum", "blockchain", "btc", "eth", "defi", "altcoin"] },
  { id: "boerse", label: "Märkte",  keywords: ["börse", "markt", "rendite", "zinsen", "inflation", "rezession", "konjunktur", "leitzins"] },
]

const RELEVANZ_KEYWORDS = [
  "etf", "aktie", "aktien", "krypto", "bitcoin", "ethereum", "börse", "investier",
  "depot", "dax", "nasdaq", "fonds", "dividende", "sparplan", "rendite", "msci",
  "zinsen", "inflation", "portfolio", "trading", "anleihe", "immobilien", "zins",
]

const FALLBACK_NEWS = [
  {
    title: "MSCI World ETF: Warum 70 % aller Privatanleger auf diesen Index setzen",
    description: "Der MSCI World ist der meistgekaufte ETF in Deutschland. Wie er aufgebaut ist, was er kostet und ob er 2025 noch die richtige Wahl ist – ein umfassender Überblick.",
    link: "https://www.justetf.com/de/news/",
    quelle: "justETF",
    pubDate: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
  },
  {
    title: "Bitcoin über 100.000 Dollar: Trendwende oder kurzfristiges Hoch?",
    description: "Erstmals überschritt Bitcoin die psychologisch wichtige 100.000-Dollar-Marke. Analysten sind gespalten, ob dies der Beginn eines neuen Bull-Runs oder eine Übertreibung ist.",
    link: "https://www.boerse.de/nachrichten/kryptowaehrungen/",
    quelle: "Börse.de",
    pubDate: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    title: "DAX auf Rekordjagd: Welche Aktien profitieren am meisten?",
    description: "Der DAX klettert auf ein neues Allzeithoch. Besonders Technologie- und Industriewerte zeigen starke Performance. Ein Blick auf die größten Gewinner der Rally.",
    link: "https://www.finanznachrichten.de/nachrichten/dax/",
    quelle: "Finanznachrichten",
    pubDate: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  },
  {
    title: "EZB senkt Leitzins erneut – was das für Sparer und Anleger bedeutet",
    description: "Die Europäische Zentralbank hat die Zinsen weiter gesenkt. Für Tagesgeld-Sparer schlechte Nachrichten – für Aktien- und ETF-Anleger könnte es Rückenwind bedeuten.",
    link: "https://www.boerse-online.de/nachrichten/",
    quelle: "Börse Online",
    pubDate: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
  },
  {
    title: "Dividendenstrategie 2025: Diese 5 Aktien zahlen zwischen 4 und 7 Prozent",
    description: "Dividendeninvestoren aufgepasst: Fünf deutsche und europäische Unternehmen mit stabiler Ausschüttungshistorie und attraktiver Rendite im direkten Vergleich.",
    link: "https://www.onvista.de/news/",
    quelle: "onvista",
    pubDate: new Date(Date.now() - 15 * 3600 * 1000).toISOString(),
  },
  {
    title: "Sparplan vs. Einmalanlage: Welche Strategie langfristig mehr Rendite bringt",
    description: "Der Cost-Averaging-Effekt klingt überzeugend – aber rechnet er sich wirklich? Eine aktuelle Auswertung über 10 und 20 Jahre zeigt klare Ergebnisse.",
    link: "https://www.extraetf.com/de/news/",
    quelle: "extraETF",
    pubDate: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
  },
]

function NewsScreen({ onZurueck }) {
  const [news, setNews] = useState([])
  const [laden, setLaden] = useState(true)
  const [istFallback, setIstFallback] = useState(false)
  const [aktiverFilter, setAktiverFilter] = useState("alle")

  async function ladeNews() {
    setLaden(true)
    setIstFallback(false)

    const feeds = [
      { url: "https://www.finanznachrichten.de/rss/aktuell",                         name: "Finanznachrichten" },
      { url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GDAXI&region=de&lang=de-DE", name: "Yahoo Finance" },
      { url: "https://www.boerse.de/rss/nachrichten",                                name: "Börse.de" },
    ]

    try {
      const antworten = await Promise.all(
        feeds.map(feed =>
          fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=25`)
            .then(r => { if (!r.ok) throw new Error(); return r.json() })
            .then(d => d.status === "ok" ? d.items.map(item => ({ ...item, quelle: feed.name })) : [])
            .catch(() => [])
        )
      )

      const alleItems = antworten.flat()

      const relevante = alleItems
        .filter(item => {
          const text = (item.title + " " + item.description).toLowerCase()
          return RELEVANZ_KEYWORDS.some(kw => text.includes(kw))
        })
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 60)

      if (relevante.length > 0) {
        setNews(relevante)
      } else {
        setNews(FALLBACK_NEWS)
        setIstFallback(true)
      }
    } catch {
      setNews(FALLBACK_NEWS)
      setIstFallback(true)
    } finally {
      setLaden(false)
    }
  }

  useEffect(() => { ladeNews() }, [])

  function kuerze(html, max = 130) {
    if (!html) return ""
    const text = html.replace(/<[^>]*>/g, "").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim()
    return text.length > max ? text.slice(0, max) + "…" : text
  }

  function formatDatum(str) {
    if (!str) return ""
    const d = new Date(str.includes("T") ? str : str.replace(" ", "T"))
    if (isNaN(d.getTime())) return ""
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" }) +
      " · " + d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
  }

  const sichtbareNews = aktiverFilter === "alle"
    ? news
    : news.filter(item => {
        const kws = NEWS_FILTER.find(f => f.id === aktiverFilter)?.keywords || []
        const text = (item.title + " " + item.description).toLowerCase()
        return kws.some(k => text.includes(k))
      })

  if (laden) {
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={onZurueck}>← Zurück</button>
        <div className="news-laden">
          <div className="news-spinner" />
          <p className="news-laden-text">Lade aktuelle Finanz-News…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <button className="zurueck-btn" onClick={onZurueck}>← Zurück</button>
      <div className="screen-header" style={{ marginTop: "1rem" }}>
        <h1>News</h1>
        <p className="xp-info">📰 Aktuelle Finanz-News</p>
      </div>

      {istFallback && (
        <p className="news-fallback-hinweis">
          📶 Live-Feeds werden auf lumio.app geladen
        </p>
      )}

      <div className="news-filter-leiste">
        {NEWS_FILTER.map(f => (
          <button
            key={f.id}
            className={`news-filter-btn ${aktiverFilter === f.id ? "aktiv" : ""}`}
            onClick={() => setAktiverFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {sichtbareNews.length === 0 ? (
        <div className="news-leer">
          <p>Keine News für diesen Filter.</p>
        </div>
      ) : (
        <div className="news-liste">
          {sichtbareNews.map((item, i) => (
            <div
              key={i}
              className="news-karte"
              onClick={() => item.link && window.open(item.link, "_blank", "noopener,noreferrer")}
            >
              <div className="news-karte-inhalt">
                <p className="news-titel">{item.title}</p>
                {item.description && (
                  <p className="news-beschreibung">{kuerze(item.description)}</p>
                )}
                <div className="news-meta">
                  <span className="news-quelle">{item.quelle}</span>
                  <span className="news-datum">{formatDatum(item.pubDate)}</span>
                </div>
              </div>
              <span className="news-arrow">›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function berechneZinseszins(sparrate, startkapital, laufzeit, renditeP) {
  if (laufzeit <= 0) return Math.round(startkapital)
  const r = renditeP / 100 / 12
  const n = laufzeit * 12
  if (r === 0) return Math.round(startkapital + sparrate * n)
  const fv = startkapital * Math.pow(1 + r, n) + sparrate * ((Math.pow(1 + r, n) - 1) / r)
  return Math.round(fv)
}

function formatEuro(wert) {
  if (wert >= 1000000)
    return (wert / 1000000).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " Mio. €"
  return Math.round(wert).toLocaleString("de-DE") + " €"
}

function sliderBg(val, min, max) {
  const pct = ((val - min) / (max - min)) * 100
  return `linear-gradient(to right, #7C3AED ${pct.toFixed(1)}%, #2A2040 ${pct.toFixed(1)}%)`
}

function RechnerScreen({ onZurueck }) {
  const [sparrate, setSparrate]         = useState(100)
  const [startkapital, setStartkapital] = useState(0)
  const [laufzeit, setLaufzeit]         = useState(20)
  const [renditeTyp, setRenditeTyp]     = useState("realistisch")
  const [animWert, setAnimWert]         = useState(0)
  const [kopiert, setKopiert]           = useState(false)
  const [inflationAn, setInflationAn]   = useState(true)
  const [steuerAn, setSteuerAn]         = useState(false)
  const [monatsbedarf, setMonatsbedarf] = useState(2000)
  const animRef = useRef(null)
  const prevRef = useRef(0)

  const renditeOptionen = [
    { id: "konservativ",  label: "Konservativ",  prozent: 5 },
    { id: "realistisch",  label: "Realistisch",  prozent: 7 },
    { id: "optimistisch", label: "Optimistisch", prozent: 9 },
  ]

  const aktuelleProzent = renditeOptionen.find(r => r.id === renditeTyp).prozent
  const ergebnis   = berechneZinseszins(sparrate, startkapital, laufzeit, aktuelleProzent)
  const eingezahlt = Math.round(startkapital + sparrate * laufzeit * 12)
  const gewinn     = ergebnis - eingezahlt
  const gewinnPct  = ergebnis > 0 ? Math.round((gewinn / ergebnis) * 100) : 0

  // 1. Inflation (2 % p.a.)
  const realerWert = Math.round(ergebnis / Math.pow(1.02, laufzeit))

  // 2. Steuer (Abgeltungssteuer 26,375 %, Sparerpauschbetrag 1.000 €)
  const steuerpflichtiger = Math.max(0, gewinn - 1000)
  const steuer            = Math.round(steuerpflichtiger * 0.26375)
  const nettoEndwert      = ergebnis - steuer

  // 3. Freiheitszahl (4 %-Regel)
  const freiheitskapital = Math.round(monatsbedarf * 12 / 0.04)
  let freiheitsJahre = null
  for (let j = 1; j <= 50; j++) {
    if (berechneZinseszins(sparrate, startkapital, j, aktuelleProzent) >= freiheitskapital) {
      freiheitsJahre = j
      break
    }
  }
  const freiheitsfortschritt = Math.min(100, Math.round((ergebnis / freiheitskapital) * 100))

  // 4. Vergleich
  const tagesgeldWert = berechneZinseszins(sparrate, startkapital, laufzeit, 2)
  const girokontoReal = Math.round(eingezahlt / Math.pow(1.02, laufzeit))
  const vergleichMax  = Math.max(ergebnis, 1)

  // 5. ETF-Empfehlung
  const empfehlung = sparrate < 50
    ? { icon: "🌱", name: "Trade Republic Sparplan", sub: "Ab 1 € / Monat, null Gebühren – perfekt für den Einstieg" }
    : sparrate <= 200
    ? { icon: "📊", name: "Scalable Capital oder Trade Republic", sub: "MSCI World ETF – breit diversifiziert, günstig, bewährt" }
    : { icon: "🚀", name: "MSCI World (70 %) + Emerging Markets (30 %)", sub: "Bewährte Core-Satellite-Strategie für ambitionierte Sparraten" }

  useEffect(() => {
    const von = prevRef.current
    const zu  = ergebnis
    prevRef.current = ergebnis
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const dauer = 500
    const start = performance.now()
    function frame(jetzt) {
      const t    = Math.min((jetzt - start) / dauer, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setAnimWert(Math.round(von + (zu - von) * ease))
      if (t < 1) animRef.current = requestAnimationFrame(frame)
    }
    animRef.current = requestAnimationFrame(frame)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [ergebnis])

  // Chart data points
  const chartPunkte = []
  for (let j = 0; j <= laufzeit; j++) {
    chartPunkte.push({
      wert: berechneZinseszins(sparrate, startkapital, j, aktuelleProzent),
      einz: Math.round(startkapital + sparrate * j * 12),
    })
  }

  function zuPfad(key) {
    const maxWert = Math.max(chartPunkte[chartPunkte.length - 1]?.wert || 1, 1)
    const pL = 10, pR = 10, pT = 8, pB = 20
    const w = 300 - pL - pR, h = 120 - pT - pB
    return chartPunkte.map((p, i) => {
      const x = (pL + (i / Math.max(laufzeit, 1)) * w).toFixed(1)
      const y = (pT + h - (p[key] / maxWert) * h).toFixed(1)
      return `${i === 0 ? "M" : "L"}${x},${y}`
    }).join(" ")
  }

  const growthPath = zuPfad("wert")
  const einzPath   = zuPfad("einz")
  const fillPath   = growthPath + " L290,100 L10,100 Z"

  const xTicks = []
  const tickStep = laufzeit <= 10 ? 2 : laufzeit <= 20 ? 5 : 10
  for (let j = 0; j <= laufzeit; j += tickStep) {
    xTicks.push({ x: (10 + (j / Math.max(laufzeit, 1)) * 280).toFixed(1), label: `${j}J` })
  }

  const szen1 = ergebnis
  const szen2 = berechneZinseszins(sparrate + 50, startkapital, laufzeit, aktuelleProzent)
  const szen3 = berechneZinseszins(sparrate, startkapital, laufzeit + 5, aktuelleProzent)

  const entnahme        = Math.round(ergebnis * 0.04 / 12)
  const monatsgehaelter = (eingezahlt / 2000).toFixed(1)
  const insights = [
    `Du hast ${formatEuro(eingezahlt)} eingezahlt – der Rest ist purer Zinseszins.`,
    `Das entspricht ${monatsgehaelter} Monatsgehältern bei 2.000 € Netto.`,
    `Bei 4 % Entnahmerate: ${formatEuro(entnahme)} / Monat ohne das Kapital anzutasten.`,
  ]
  if (laufzeit > 30)
    insights.push("Du profitierst vom vollen Zinseszins-Effekt – Zeit ist dein größter Vorteil.")
  if (sparrate < 50) {
    const mehr = berechneZinseszins(sparrate + 20, startkapital, laufzeit, aktuelleProzent) - ergebnis
    insights.push(`Erhöhe um 20 € und du hast ${formatEuro(mehr)} mehr.`)
  }

  function teilen() {
    const steuerZeile = steuerAn ? `\n💼 Nach Steuern: ${formatEuro(nettoEndwert)}` : ""
    const text = [
      `💡 Mein Sparplan auf Lumio:`,
      `📊 ${sparrate} €/Monat × ${laufzeit} Jahre bei ${aktuelleProzent} % p.a.`,
      `💰 Endwert: ${formatEuro(ergebnis)}${steuerZeile}`,
      `📈 Davon Zinseszins: ${formatEuro(gewinn)} (${gewinnPct} %)`,
      `🚀 Berechne deinen Plan auf lumio.app`,
    ].join("\n")
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setKopiert(true)
        setTimeout(() => setKopiert(false), 2500)
      })
    }
  }

  return (
    <div className="screen">
      <button className="zurueck-btn" onClick={onZurueck}>← Zurück</button>
      <div className="screen-header" style={{ marginTop: "1rem" }}>
        <h1>Rechner</h1>
        <p className="xp-info">🧮 Zinseszins-Rechner</p>
      </div>

      {/* ── Ergebnis ── */}
      <div className="rc-ergebnis-card">
        <p className="rc-ergebnis-label">In {laufzeit} Jahren hast du</p>
        <p className="rc-ergebnis-zahl">{formatEuro(animWert)}</p>
        {inflationAn && (
          <p className="rc-ergebnis-real">≈ {formatEuro(realerWert)} in heutiger Kaufkraft</p>
        )}
        <div className="rc-balken-wrap">
          <div className="rc-balken-row">
            <div className="rc-balken rc-balken-lila"    style={{ width: `${100 - gewinnPct}%` }} />
            <div className="rc-balken rc-balken-weinrot" style={{ width: `${gewinnPct}%` }} />
          </div>
          <div className="rc-balken-legende">
            <span><span className="rc-legend-dot rc-dot-lila" />Eingezahlt: {formatEuro(eingezahlt)}</span>
            <span><span className="rc-legend-dot rc-dot-weinrot" />Gewinn: {formatEuro(gewinn)} ({gewinnPct} %)</span>
          </div>
        </div>
      </div>

      {/* ── Eingaben ── */}
      <div className="rc-eingaben">
        <div className="rc-zeile">
          <label className="rc-label">Monatliche Sparrate</label>
          <div className="rc-slider-row">
            <input type="range" min={10} max={1000} step={10}
              value={sparrate}
              onChange={e => setSparrate(Number(e.target.value))}
              className="rc-slider"
              style={{ background: sliderBg(sparrate, 10, 1000) }}
            />
            <input type="number" min={10} max={1000}
              value={sparrate}
              onChange={e => setSparrate(Math.max(10, Math.min(1000, Number(e.target.value) || 10)))}
              className="rc-zahl-input"
            />
            <span className="rc-unit">€</span>
          </div>
        </div>

        <div className="rc-zeile">
          <label className="rc-label">Startkapital</label>
          <div className="rc-slider-row">
            <input type="range" min={0} max={10000} step={100}
              value={startkapital}
              onChange={e => setStartkapital(Number(e.target.value))}
              className="rc-slider"
              style={{ background: sliderBg(startkapital, 0, 10000) }}
            />
            <input type="number" min={0} max={10000}
              value={startkapital}
              onChange={e => setStartkapital(Math.max(0, Math.min(10000, Number(e.target.value) || 0)))}
              className="rc-zahl-input"
            />
            <span className="rc-unit">€</span>
          </div>
        </div>

        <div className="rc-zeile">
          <label className="rc-label">Anlagedauer: <strong>{laufzeit} Jahre</strong></label>
          <input type="range" min={1} max={40} step={1}
            value={laufzeit}
            onChange={e => setLaufzeit(Number(e.target.value))}
            className="rc-slider rc-slider-full"
            style={{ background: sliderBg(laufzeit, 1, 40) }}
          />
        </div>

        <div className="rc-zeile">
          <label className="rc-label">Rendite</label>
          <div className="rc-rendite-buttons">
            {renditeOptionen.map(ro => (
              <button
                key={ro.id}
                className={`rc-rendite-btn ${renditeTyp === ro.id ? "aktiv" : ""}`}
                onClick={() => setRenditeTyp(ro.id)}
              >
                <span>{ro.label}</span>
                <span className="rc-rendite-prozent">{ro.prozent} %</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="rc-chart-card">
        <p className="rc-chart-titel">Wachstum über die Zeit</p>
        <svg viewBox="0 0 300 120" className="rc-svg">
          <defs>
            <linearGradient id="rcGradFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rcLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#9D174D" />
            </linearGradient>
          </defs>
          <path d={fillPath}   fill="url(#rcGradFill)" />
          <path d={einzPath}   fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
          <path d={growthPath} fill="none" stroke="url(#rcLineGrad)" strokeWidth="2.5" strokeLinecap="round" />
          {xTicks.map((t, i) => (
            <text key={i} x={t.x} y={118} textAnchor="middle" fontSize="7" fill="#555">{t.label}</text>
          ))}
        </svg>
        <div className="rc-chart-legende">
          <span><span className="rc-chart-dot rc-dot-lila-dash" /> Eingezahlt</span>
          <span><span className="rc-chart-dot rc-dot-grad" /> Wachstum</span>
        </div>
      </div>

      {/* ── 1. Inflation ── */}
      <div className="rc-card">
        <div className="rc-card-header">
          <p className="rc-section-titel rc-no-margin">🌡️ Inflation (2 % p.a.)</p>
          <button className={`rc-toggle ${inflationAn ? "rc-toggle-an" : ""}`} onClick={() => setInflationAn(v => !v)}>
            <span className="rc-toggle-knob" />
          </button>
        </div>
        {inflationAn && (
          <div className="rc-inflat-inhalt">
            <div className="rc-zwei-werte">
              <div className="rc-wert-block">
                <p className="rc-wert-label">Nominaler Wert</p>
                <p className="rc-wert-zahl rc-wert-nominal">{formatEuro(ergebnis)}</p>
              </div>
              <div className="rc-wert-trennlinie" />
              <div className="rc-wert-block">
                <p className="rc-wert-label">Reale Kaufkraft</p>
                <p className="rc-wert-zahl rc-wert-real">{formatEuro(realerWert)}</p>
              </div>
            </div>
            <p className="rc-card-hinweis">In heutiger Kaufkraft wären das {formatEuro(realerWert)} – Inflation frisst {formatEuro(ergebnis - realerWert)}.</p>
          </div>
        )}
      </div>

      {/* ── 2. Steuer ── */}
      <div className="rc-card">
        <div className="rc-card-header">
          <p className="rc-section-titel rc-no-margin">🏛️ Abgeltungssteuer (26,375 %)</p>
          <button className={`rc-toggle ${steuerAn ? "rc-toggle-an" : ""}`} onClick={() => setSteuerAn(v => !v)}>
            <span className="rc-toggle-knob" />
          </button>
        </div>
        {steuerAn && (
          <div className="rc-steuer-inhalt">
            <div className="rc-steuer-zeile">
              <span>Brutto-Endwert</span>
              <span className="rc-steuer-wert">{formatEuro(ergebnis)}</span>
            </div>
            <div className="rc-steuer-zeile">
              <span>Abgeltungssteuer</span>
              <span className="rc-steuer-minus">−{formatEuro(steuer)}</span>
            </div>
            <div className="rc-steuer-trennlinie" />
            <div className="rc-steuer-zeile rc-steuer-netto-zeile">
              <span>Netto-Endwert</span>
              <span className="rc-steuer-netto-wert">{formatEuro(nettoEndwert)}</span>
            </div>
            <p className="rc-card-hinweis" style={{ marginTop: "0.6rem" }}>Sparerpauschbetrag 1.000 € bereits berücksichtigt.</p>
          </div>
        )}
      </div>

      {/* ── 3. Freiheitszahl ── */}
      <div className="rc-card">
        <p className="rc-section-titel">🗽 Finanzielle Freiheit (4 %-Regel)</p>
        <div className="rc-freiheit-input">
          <span className="rc-label rc-no-margin" style={{ flexShrink: 0 }}>Monatsbedarf:</span>
          <input type="range" min={500} max={5000} step={100}
            value={monatsbedarf}
            onChange={e => setMonatsbedarf(Number(e.target.value))}
            className="rc-slider"
            style={{ background: sliderBg(monatsbedarf, 500, 5000) }}
          />
          <input type="number" min={500} max={5000}
            value={monatsbedarf}
            onChange={e => setMonatsbedarf(Math.max(500, Math.min(5000, Number(e.target.value) || 2000)))}
            className="rc-zahl-input"
          />
          <span className="rc-unit">€</span>
        </div>
        <div className="rc-freiheit-result">
          <p className="rc-freiheit-kapital">Freiheitskapital: <strong>{formatEuro(freiheitskapital)}</strong></p>
          {freiheitsJahre !== null ? (
            <p className="rc-freiheit-jahre">
              Mit deinem Plan erreichst du das in <strong>{freiheitsJahre} Jahren</strong>{freiheitsJahre <= laufzeit ? " ✓" : ""}
            </p>
          ) : (
            <p className="rc-freiheit-jahre rc-freiheit-nein">Ziel in 50 Jahren nicht erreicht – Sparrate erhöhen!</p>
          )}
        </div>
        <div className="rc-fortschritt-bg">
          <div className="rc-fortschritt-fill" style={{ width: `${freiheitsfortschritt}%` }} />
        </div>
        <div className="rc-fortschritt-labels">
          <span>0 €</span>
          <span className="rc-fortschritt-pct">{freiheitsfortschritt} % erreicht</span>
          <span>{formatEuro(freiheitskapital)}</span>
        </div>
      </div>

      {/* ── 4. Vergleich ── */}
      <div className="rc-card">
        <p className="rc-section-titel">📊 Girokonto vs. Tagesgeld vs. ETF</p>
        <div className="rc-vergleich">
          <div className="rc-vgl-zeile">
            <span className="rc-vgl-icon">💸</span>
            <div className="rc-vgl-info">
              <div className="rc-vgl-kopf">
                <span className="rc-vgl-name">Girokonto (0 %)</span>
                <span className="rc-vgl-wert rc-vgl-rot">{formatEuro(eingezahlt)}</span>
              </div>
              <div className="rc-vgl-bar-bg">
                <div className="rc-vgl-bar-fill rc-vgl-fill-rot" style={{ width: `${(eingezahlt / vergleichMax * 100).toFixed(1)}%` }} />
              </div>
              <span className="rc-vgl-sub">Kaufkraft real: {formatEuro(girokontoReal)}</span>
            </div>
          </div>
          <div className="rc-vgl-zeile">
            <span className="rc-vgl-icon">🏦</span>
            <div className="rc-vgl-info">
              <div className="rc-vgl-kopf">
                <span className="rc-vgl-name">Tagesgeld (2 %)</span>
                <span className="rc-vgl-wert rc-vgl-gelb">{formatEuro(tagesgeldWert)}</span>
              </div>
              <div className="rc-vgl-bar-bg">
                <div className="rc-vgl-bar-fill rc-vgl-fill-gelb" style={{ width: `${(tagesgeldWert / vergleichMax * 100).toFixed(1)}%` }} />
              </div>
            </div>
          </div>
          <div className="rc-vgl-zeile">
            <span className="rc-vgl-icon">📈</span>
            <div className="rc-vgl-info">
              <div className="rc-vgl-kopf">
                <span className="rc-vgl-name">ETF ({aktuelleProzent} %)</span>
                <span className="rc-vgl-wert rc-vgl-lila">{formatEuro(ergebnis)}</span>
              </div>
              <div className="rc-vgl-bar-bg">
                <div className="rc-vgl-bar-fill rc-vgl-fill-lila" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Szenarien ── */}
      <p className="rc-section-titel">Szenarien im Vergleich</p>
      <div className="rc-szenarien">
        <div className="rc-szenario rc-szen-aktiv">
          <p className="rc-sz-label">Dein Plan</p>
          <p className="rc-sz-wert">{formatEuro(szen1)}</p>
          <p className="rc-sz-sub">{sparrate} €/Mo · {laufzeit}J</p>
        </div>
        <div className="rc-szenario">
          <p className="rc-sz-label">+50 €/Mo</p>
          <p className="rc-sz-wert">{formatEuro(szen2)}</p>
          <p className="rc-sz-diff rc-diff-plus">+{formatEuro(szen2 - szen1)}</p>
        </div>
        <div className="rc-szenario">
          <p className="rc-sz-label">+5 Jahre</p>
          <p className="rc-sz-wert">{formatEuro(szen3)}</p>
          <p className="rc-sz-diff rc-diff-plus">+{formatEuro(szen3 - szen1)}</p>
        </div>
      </div>

      {/* ── Insights ── */}
      <p className="rc-section-titel">Deine Insights</p>
      <div className="rc-insights">
        {insights.map((text, i) => (
          <div key={i} className="rc-insight-zeile">
            <span className="rc-insight-dot">💡</span>
            <p className="rc-insight-text">{text}</p>
          </div>
        ))}
      </div>

      {/* ── 5. ETF-Empfehlung ── */}
      <div className="rc-empfehlung-card">
        <p className="rc-section-titel">🎯 Deine ETF-Empfehlung</p>
        <div className="rc-empfehlung-inhalt">
          <span className="rc-empfehlung-icon">{empfehlung.icon}</span>
          <div className="rc-empfehlung-text">
            <p className="rc-empfehlung-name">{empfehlung.name}</p>
            <p className="rc-empfehlung-sub">{empfehlung.sub}</p>
          </div>
        </div>
        <button className="rc-empfehlung-link-btn" onClick={() => {}}>
          🔗 Mehr erfahren (Link folgt)
        </button>
      </div>

      {/* ── Teilen ── */}
      <button className="rc-teilen-btn" onClick={teilen}>
        {kopiert ? "✓ In Zwischenablage kopiert!" : "📤 Ergebnis teilen"}
      </button>
    </div>
  )
}

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => !!localStorage.getItem("onboardingComplete"))
  const [userName, setUserName]                       = useState(() => localStorage.getItem("userName") || "")
  const [userZiel, setUserZiel]                       = useState(() => localStorage.getItem("userZiel") || "")
  const [userAlter, setUserAlter]                     = useState(() => localStorage.getItem("userAlter") || "")
  const [userLebenssituation, setUserLebenssituation] = useState(() => localStorage.getItem("userLebenssituation") || "")
  const [userFinanzsituation, setUserFinanzsituation] = useState(() => localStorage.getItem("userFinanzsituation") || "")
  const [userWissenslevel, setUserWissenslevel]       = useState(() => Number(localStorage.getItem("userWissenslevel")) || 0)
  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0)
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 0)
  const [letzterTag, setLetzterTag] = useState(() => localStorage.getItem("letzterTag") || "")
  const [aktiverTab, setAktiverTab] = useState("home")
  const [aktiveHauptkategorie, setAktiveHauptkategorie] = useState(null)
  const [aktiveKategorie, setAktiveKategorie] = useState(null)
  const [aktiveLektion, setAktiveLektion] = useState(null)
  const [abgeschlosseneLektionen, setAbgeschlosseneLektionen] = useState(() => JSON.parse(localStorage.getItem("abgeschlosseneLektionen") || "[]"))
  const [abgeschlosseneQuests, setAbgeschlosseneQuests] = useState(() => JSON.parse(localStorage.getItem("abgeschlosseneQuests") || "{}"))
  const [levelUpInfo, setLevelUpInfo] = useState(null)

  useEffect(() => {
    const heute = getHeute()
    const gestern = new Date(Date.now() - 86400000).toISOString().split("T")[0]
    if (letzterTag && letzterTag !== heute && letzterTag !== gestern) {
      setStreak(0)
      localStorage.setItem("streak", 0)
    }
  }, [])

  function updateStreak() {
    const heute = getHeute()
    const gestern = new Date(Date.now() - 86400000).toISOString().split("T")[0]
    if (letzterTag === heute) return
    const neuerStreak = letzterTag === gestern ? streak + 1 : 1
    setStreak(neuerStreak)
    setLetzterTag(heute)
    localStorage.setItem("streak", neuerStreak)
    localStorage.setItem("letzterTag", heute)
  }

  function addXP(menge) {
    if (menge <= 0) return
    setXp(prev => {
      const altesLevel = berechneLevel(prev)
      const neueXP = prev + menge
      const neuesLevel = berechneLevel(neueXP)
      localStorage.setItem("xp", neueXP)
      if (neuesLevel > altesLevel) {
        setLevelUpInfo({ newLevel: neuesLevel })
      }
      return neueXP
    })
  }

  function lektionAbschliessen(verdientXP) {
    if (!abgeschlosseneLektionen.includes(aktiveLektion.id)) {
      const neue = [...abgeschlosseneLektionen, aktiveLektion.id]
      setAbgeschlosseneLektionen(neue)
      localStorage.setItem("abgeschlosseneLektionen", JSON.stringify(neue))
    }
    if (verdientXP > 0) updateStreak()
    addXP(verdientXP)
    setAktiveLektion(null)
  }

  function questAbschliessen(questId, verdientXP) {
    const heute = getHeute()
    const neue = { ...abgeschlosseneQuests, [heute]: questId }
    setAbgeschlosseneQuests(neue)
    localStorage.setItem("abgeschlosseneQuests", JSON.stringify(neue))
    updateStreak()
    addXP(verdientXP)
  }

  function resetNav() {
    setAktiveHauptkategorie(null)
    setAktiveKategorie(null)
    setAktiveLektion(null)
  }

  function onboardingAbschliessen(startXP, name) {
    setUserName(name)
    setUserZiel(localStorage.getItem("userZiel") || "wissen")
    setUserAlter(localStorage.getItem("userAlter") || "")
    setUserLebenssituation(localStorage.getItem("userLebenssituation") || "")
    setUserFinanzsituation(localStorage.getItem("userFinanzsituation") || "")
    setUserWissenslevel(Number(localStorage.getItem("userWissenslevel")) || 1)
    setXp(startXP)
    localStorage.setItem("xp", startXP)
    setOnboardingComplete(true)
  }

  if (!onboardingComplete) {
    return (
      <div className="app">
        <OnboardingFlow onComplete={onboardingAbschliessen} />
      </div>
    )
  }

  return (
    <div className="app">
      <div className="content">
        {aktiverTab === "home" && !aktiveHauptkategorie && (
          <Startscreen xp={xp} streak={streak} onHauptkategorieClick={(id) => setAktiveHauptkategorie(id)} userName={userName} abgeschlosseneQuests={abgeschlosseneQuests} />
        )}
        {aktiverTab === "home" && aktiveHauptkategorie === "lernen" && !aktiveKategorie && (
          <LernpfadeScreen xp={xp} abgeschlosseneLektionen={abgeschlosseneLektionen} onKategorieClick={(k) => setAktiveKategorie(k)} onZurueck={() => setAktiveHauptkategorie(null)} />
        )}
        {aktiverTab === "home" && aktiveHauptkategorie === "news" && (
          <NewsScreen onZurueck={() => setAktiveHauptkategorie(null)} />
        )}
        {aktiverTab === "home" && aktiveHauptkategorie === "rechner" && (
          <RechnerScreen onZurueck={() => setAktiveHauptkategorie(null)} />
        )}
        {aktiverTab === "home" && aktiveKategorie && !aktiveLektion && (
          <KategorieDetail kategorie={aktiveKategorie} abgeschlosseneLektionen={abgeschlosseneLektionen} onZurueck={() => setAktiveKategorie(null)} onLektionClick={(l) => setAktiveLektion(l)} />
        )}
        {aktiverTab === "home" && aktiveLektion && aktiveLektion.typ === "cards" && (
          <CardLektionScreen lektion={aktiveLektion} onZurueck={() => setAktiveLektion(null)} onAbgeschlossen={lektionAbschliessen} />
        )}
        {aktiverTab === "home" && aktiveLektion && aktiveLektion.typ !== "cards" && (
          <LektionScreen lektion={aktiveLektion} kategorie={aktiveKategorie} onZurueck={() => setAktiveLektion(null)} onAbgeschlossen={lektionAbschliessen} />
        )}
        {aktiverTab === "quest" && (
          <DailyQuestScreen abgeschlosseneQuests={abgeschlosseneQuests} onQuestAbgeschlossen={questAbschliessen} />
        )}
        {aktiverTab === "profil" && (
          <ProfilScreen xp={xp} streak={streak} abgeschlosseneLektionen={abgeschlosseneLektionen} userName={userName} userZiel={userZiel} userAlter={userAlter} userLebenssituation={userLebenssituation} userFinanzsituation={userFinanzsituation} userWissenslevel={userWissenslevel} />
        )}
        {aktiverTab === "rangliste" && <div className="screen"><h1>Rangliste</h1><p style={{color:"#888"}}>Kommt bald.</p></div>}
      </div>
      <LevelUpModal levelUpInfo={levelUpInfo} onClose={() => setLevelUpInfo(null)} />
      <nav className="bottom-nav">
        {[
          {
            id: "home", label: "Home",
            svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          },
          {
            id: "quest", label: "Quest",
            svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          },
          {
            id: "profil", label: "Profil",
            svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          },
          {
            id: "rangliste", label: "Rangliste",
            svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M17 5H7l2 7a3 3 0 0 0 6 0l2-7z"/><path d="M17 5c.4 0 5 0 5 3s-3 3-5 3"/><path d="M7 5c-.4 0-5 0-5 3s3 3 5 3"/></svg>
          }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`nav-btn ${aktiverTab === tab.id ? "aktiv" : ""}`}
            onClick={() => { setAktiverTab(tab.id); resetNav() }}
          >
            <div className="nav-icon-pill">{tab.svg}</div>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App