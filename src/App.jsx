import { useState, useEffect } from "react"
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
    verfuegbar: false
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
  ]
}

function berechneLevel(xp) {
  return Math.floor(xp / 100) + 1
}

function getHeute() {
  return new Date().toISOString().split("T")[0]
}

function OnboardingFlow({ onComplete }) {
  const [schritt, setSchritt] = useState(1)
  const [name, setName] = useState("")
  const [ziel, setZiel] = useState(null)
  const [antworten, setAntworten] = useState([null, null, null])

  const ziele = [
    { id: "etf",     icon: "📈", titel: "Ersten ETF-Sparplan starten" },
    { id: "krypto",  icon: "₿",  titel: "Krypto verstehen und einsteigen" },
    { id: "aktien",  icon: "📊", titel: "Aktien analysieren lernen" },
    { id: "wissen",  icon: "🧠", titel: "Generelles Finanzwissen aufbauen" },
  ]

  const wissensFragen = [
    "Weißt du was ein ETF ist?",
    "Hast du bereits investiert?",
    "Kennst du den Unterschied zwischen thesaurierend und ausschüttend?",
  ]

  function berechneStartXP() {
    const ja = antworten.filter(a => a === true).length
    if (ja === 3) return 100
    if (ja === 2) return 50
    if (ja === 1) return 25
    return 0
  }

  function antwortSetzen(i, wert) {
    const neu = [...antworten]
    neu[i] = wert
    setAntworten(neu)
  }

  function abschliessen() {
    const startXP = berechneStartXP()
    const finalName = name.trim() || "Investor"
    localStorage.setItem("onboardingComplete", "true")
    localStorage.setItem("userName", finalName)
    localStorage.setItem("userZiel", ziel || "wissen")
    onComplete(startXP, finalName)
  }

  const alleBeantwortet = antworten.every(a => a !== null)

  return (
    <div className="onboarding-screen">
      <div className="onboarding-progress-header">
        <div className="onboarding-dots">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`onboarding-dot ${schritt === s ? "aktuell" : schritt > s ? "fertig" : ""}`}
            />
          ))}
        </div>
        <span className="onboarding-schritt-label">{schritt} / 3</span>
      </div>

      {schritt === 1 && (
        <div className="onboarding-schritt">
          <div className="onboarding-logo-bereich">
            <div className="onboarding-glow-ring">
              <span className="onboarding-logo-emoji">💡</span>
            </div>
            <h1 className="onboarding-app-titel">Lumio</h1>
            <p className="onboarding-tagline">Dein persönlicher Finanz-Coach</p>
          </div>
          <p className="onboarding-beschreibung">
            Lerne investieren in wenigen Minuten täglich. Von ETFs über Aktien bis Krypto – Schritt für Schritt zum Experten.
          </p>
          <div className="onboarding-input-gruppe">
            <label className="onboarding-label">Wie heißt du?</label>
            <input
              className="onboarding-input"
              type="text"
              placeholder="Dein Name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={30}
            />
          </div>
          <button className="weiter-btn" onClick={() => setSchritt(2)}>
            Loslegen →
          </button>
        </div>
      )}

      {schritt === 2 && (
        <div className="onboarding-schritt">
          <h2 className="onboarding-frage-titel">Was ist dein Ziel?</h2>
          <p className="onboarding-sub">Wähle dein wichtigstes Ziel – du kannst alles lernen.</p>
          <div className="onboarding-ziele-grid">
            {ziele.map(z => (
              <div
                key={z.id}
                className={`onboarding-ziel-karte ${ziel === z.id ? "ausgewaehlt" : ""}`}
                onClick={() => setZiel(z.id)}
              >
                <span className="onboarding-ziel-icon">{z.icon}</span>
                <p className="onboarding-ziel-text">{z.titel}</p>
              </div>
            ))}
          </div>
          <button
            className="weiter-btn"
            style={!ziel ? { opacity: 0.4, cursor: "not-allowed" } : {}}
            onClick={() => ziel && setSchritt(3)}
          >
            Weiter →
          </button>
        </div>
      )}

      {schritt === 3 && (
        <div className="onboarding-schritt">
          <h2 className="onboarding-frage-titel">Wie gut kennst du dich aus?</h2>
          <p className="onboarding-sub">Wir passen dein Erlebnis an dein Wissen an.</p>
          <div className="onboarding-fragen-liste">
            {wissensFragen.map((frage, i) => (
              <div key={i} className="onboarding-frage-block">
                <p className="onboarding-frage-text">{frage}</p>
                <div className="onboarding-ja-nein">
                  <button
                    className={`onboarding-ja-nein-btn ${antworten[i] === true ? "gewaehlt ja" : ""}`}
                    onClick={() => antwortSetzen(i, true)}
                  >
                    Ja
                  </button>
                  <button
                    className={`onboarding-ja-nein-btn ${antworten[i] === false ? "gewaehlt nein" : ""}`}
                    onClick={() => antwortSetzen(i, false)}
                  >
                    Nein
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="weiter-btn"
            style={!alleBeantwortet ? { opacity: 0.4, cursor: "not-allowed" } : {}}
            onClick={() => alleBeantwortet && abschliessen()}
          >
            Fertig & loslegen 🚀
          </button>
        </div>
      )}
    </div>
  )
}

function Startscreen({ xp, streak, onHauptkategorieClick, userName }) {
  const level = berechneLevel(xp)
  const xpAktuell = xp - (level - 1) * 100
  const xpFortschritt = Math.min((xpAktuell / 100) * 100, 100)

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
            <div className="hub-banner-icon">{k.icon}</div>
            <div className="hub-banner-text">
              <p className="hub-banner-name">{k.name}</p>
              <p className="hub-banner-beschreibung">{k.verfuegbar ? k.beschreibung : "Bald verfügbar"}</p>
            </div>
            {k.verfuegbar && <div className="hub-banner-arrow">→</div>}
            {!k.verfuegbar && <div className="hub-banner-lock">🔒</div>}
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
          <div className="lektion-progress-fill" style={{ width: "33%" }} />
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
          <div className="lektion-progress-fill" style={{ width: `${33 + (aktualeFrage / fragen.length) * 33}%` }} />
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
        <h1 style={{ marginTop: "1rem" }}>
          {perfekt ? "Perfekt!" : "Fast!"}
        </h1>
        <p style={{ color: "#888", marginTop: "0.5rem" }}>{richtige} von {fragen.length} Fragen richtig</p>
        {perfekt
          ? <p style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>+{verdientXP} XP</p>
          : <p style={{ color: "#888", marginTop: "0.5rem" }}>Alle Fragen richtig für XP – versuch es nochmal</p>
        }
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
    return (
      <div className="screen">
        <button className="zurueck-btn" onClick={() => setAktiverQuest(null)}>← Zurück</button>
        <div className="lektion-progress">
          <div className="lektion-progress-fill" style={{ width: `${(aktualeFrage / aktiverQuest.fragen.length) * 100}%` }} />
        </div>
        <p className="theorie-label">⚔️ Daily Quest · Frage {aktualeFrage + 1} / {aktiverQuest.fragen.length}</p>
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
          <div className="feedback">
            <p>{gewaehlt === frage.richtig ? "✅ Richtig!" : "❌ Falsch!"}</p>
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
      <div className="screen" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginTop: "3rem" }}>⚔️</div>
        <h1 style={{ marginTop: "1rem" }}>{perfekt ? "Quest abgeschlossen!" : "Gut gekämpft!"}</h1>
        <p style={{ color: "#888", marginTop: "0.5rem" }}>{richtige} von {aktiverQuest.fragen.length} richtig</p>
        <p style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>+{verdientXP} XP</p>
        <button className="weiter-btn" style={{ marginTop: "2rem" }} onClick={() => {
          onQuestAbgeschlossen(aktiverQuest.id, verdientXP)
          setAktiverQuest(null)
        }}>
          Fertig
        </button>
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

function ProfilScreen({ xp, streak, abgeschlosseneLektionen, userName, userZiel }) {
  const level = berechneLevel(xp)
  const xpAktuell = xp - (level - 1) * 100
  const xpFortschritt = Math.min((xpAktuell / 100) * 100, 100)

  const etfGesamt = lernpfad[1].length
  const etfAbgeschlossen = lernpfad[1].filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const aktienGesamt = lernpfad[2].length
  const aktienAbgeschlossen = lernpfad[2].filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const kryptoGesamt = lernpfad[3].length
  const kryptoAbgeschlossen = lernpfad[3].filter(l => abgeschlosseneLektionen.includes(l.id)).length

  const zielLabels = { etf: "Ersten ETF-Sparplan starten", krypto: "Krypto verstehen", aktien: "Aktien analysieren lernen", wissen: "Finanzwissen aufbauen" }

  const badges = [
    { id: "erste_lektion", name: "Erster Schritt", icon: "🎯", beschreibung: "Erste Lektion abgeschlossen", erreicht: abgeschlosseneLektionen.length >= 1 },
    { id: "etf_komplett", name: "ETF Experte", icon: "📈", beschreibung: "Alle ETF Lektionen abgeschlossen", erreicht: etfAbgeschlossen === etfGesamt },
    { id: "aktien_start", name: "Aktien Einsteiger", icon: "📊", beschreibung: "5 Aktien-Lektionen abgeschlossen", erreicht: aktienAbgeschlossen >= 5 },
    { id: "aktien_komplett", name: "Aktien Profi", icon: "💼", beschreibung: "Alle Aktien-Lektionen abgeschlossen", erreicht: aktienAbgeschlossen === aktienGesamt },
    { id: "krypto_start", name: "Krypto Einsteiger", icon: "₿", beschreibung: "Erste Krypto-Lektion abgeschlossen", erreicht: kryptoAbgeschlossen >= 1 },
    { id: "krypto_komplett", name: "Blockchain Master", icon: "⛓️", beschreibung: "Alle Krypto-Lektionen abgeschlossen", erreicht: kryptoAbgeschlossen === kryptoGesamt },
    { id: "streak_7", name: "7-Tage Streak", icon: "🔥", beschreibung: "7 Tage in Folge gelernt", erreicht: streak >= 7 },
    { id: "level_5", name: "Aufsteiger", icon: "⭐", beschreibung: "Level 5 erreicht", erreicht: level >= 5 }
  ]

  const stats = [
    { label: "Gesamt Lektionen", wert: abgeschlosseneLektionen.length },
    { label: "Aktueller Streak", wert: `${streak} Tage` },
    { label: "Gesamt XP", wert: xp },
    { label: "ETF", wert: `${etfAbgeschlossen}/${etfGesamt}` },
    { label: "Aktien", wert: `${aktienAbgeschlossen}/${aktienGesamt}` },
    { label: "Krypto", wert: `${kryptoAbgeschlossen}/${kryptoGesamt}` }
  ]

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Profil</h1>
        {userName && <p className="xp-info">👤 {userName}</p>}
        {userZiel && <p className="xp-info" style={{ marginTop: "0.2rem" }}>🎯 Ziel: {zielLabels[userZiel] || userZiel}</p>}
      </div>
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
      <div className="profil-streak">
        <span style={{ fontSize: "1.5rem" }}>🔥</span>
        <div>
          <p style={{ fontWeight: 600 }}>{streak} Tage Streak</p>
          <p style={{ fontSize: "0.8rem", color: "#888" }}>Komm täglich zurück um deinen Streak zu halten</p>
        </div>
      </div>
      <h3 className="profil-section-titel">Statistiken</h3>
      <div className="profil-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="profil-stat-karte">
            <p className="profil-stat-wert">{s.wert}</p>
            <p className="profil-stat-label">{s.label}</p>
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

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => !!localStorage.getItem("onboardingComplete"))
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "")
  const [userZiel, setUserZiel] = useState(() => localStorage.getItem("userZiel") || "")
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
          <Startscreen xp={xp} streak={streak} onHauptkategorieClick={(id) => setAktiveHauptkategorie(id)} userName={userName} />
        )}
        {aktiverTab === "home" && aktiveHauptkategorie === "lernen" && !aktiveKategorie && (
          <LernpfadeScreen xp={xp} abgeschlosseneLektionen={abgeschlosseneLektionen} onKategorieClick={(k) => setAktiveKategorie(k)} onZurueck={() => setAktiveHauptkategorie(null)} />
        )}
        {aktiverTab === "home" && aktiveHauptkategorie === "news" && (
          <NewsScreen onZurueck={() => setAktiveHauptkategorie(null)} />
        )}
        {aktiverTab === "home" && aktiveKategorie && !aktiveLektion && (
          <KategorieDetail kategorie={aktiveKategorie} abgeschlosseneLektionen={abgeschlosseneLektionen} onZurueck={() => setAktiveKategorie(null)} onLektionClick={(l) => setAktiveLektion(l)} />
        )}
        {aktiverTab === "home" && aktiveLektion && (
          <LektionScreen lektion={aktiveLektion} kategorie={aktiveKategorie} onZurueck={() => setAktiveLektion(null)} onAbgeschlossen={lektionAbschliessen} />
        )}
        {aktiverTab === "quest" && (
          <DailyQuestScreen abgeschlosseneQuests={abgeschlosseneQuests} onQuestAbgeschlossen={questAbschliessen} />
        )}
        {aktiverTab === "profil" && (
          <ProfilScreen xp={xp} streak={streak} abgeschlosseneLektionen={abgeschlosseneLektionen} userName={userName} userZiel={userZiel} />
        )}
        {aktiverTab === "rangliste" && <div className="screen"><h1>Rangliste</h1><p style={{color:"#888"}}>Kommt bald.</p></div>}
      </div>
      <LevelUpModal levelUpInfo={levelUpInfo} onClose={() => setLevelUpInfo(null)} />
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