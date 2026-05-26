export const kategorien = [
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
    lektionenAnzahl: 10
  },
  {
    id: 5,
    name: "Budgetierung & Sparen",
    beschreibung: "Geld verstehen, Geld behalten",
    icon: "💰",
    farbe: "#059669",
    minLevel: 1,
    lektionenAnzahl: 8
  },
  {
    id: 6,
    name: "Banking & Konten",
    beschreibung: "Tagesgeld, Broker & Notgroschen",
    icon: "🏦",
    farbe: "#0EA5E9",
    minLevel: 1,
    lektionenAnzahl: 8
  },
  {
    id: 7,
    name: "Steuern",
    beschreibung: "Steuern verstehen und legal sparen",
    icon: "📋",
    farbe: "#10B981",
    minLevel: 3,
    lektionenAnzahl: 8
  },
  {
    id: 8,
    name: "Immobilien",
    beschreibung: "Mieten, kaufen, finanzieren",
    icon: "🏠",
    farbe: "#F59E0B",
    minLevel: 8,
    lektionenAnzahl: 6
  },
  {
    id: 9,
    name: "Versicherungen",
    beschreibung: "Richtig absichern – ohne Abzocke",
    icon: "🛡️",
    farbe: "#8B5CF6",
    minLevel: 2,
    lektionenAnzahl: 6
  }
]

export const hauptkategorien = [
  {
    id: "lernen",
    name: "Lernen",
    icon: "📚",
    beschreibung: "ETFs, Aktien, Krypto & mehr",
    farbe: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #9D174D)",
    verfuegbar: true
  },
  {
    id: "news",
    name: "News",
    icon: "📰",
    beschreibung: "Aktuelle Finanz-News",
    farbe: "#4c1d95",
    gradient: "linear-gradient(135deg, #4c1d95, #9D174D)",
    verfuegbar: true
  },
  {
    id: "rechner",
    name: "Rechner",
    icon: "🧮",
    beschreibung: "Zinseszins & Sparplan",
    farbe: "#6b21a8",
    gradient: "linear-gradient(135deg, #4a1d96, #6b21a8)",
    verfuegbar: true
  },
  {
    id: "challenges",
    name: "Challenges",
    icon: "🎯",
    beschreibung: "Wöchentliche Aufgaben",
    farbe: "#9D174D",
    gradient: "linear-gradient(135deg, #831843, #9d174d)",
    verfuegbar: true
  }
]

export const LERNPLAN_ZIELE = {
  etf:    [
    { titel: "Was ist ein ETF?",                  dauer: "5 Min", xp: 20 },
    { titel: "Wie ein Index funktioniert",         dauer: "5 Min", xp: 20 },
    { titel: "Deinen ersten Sparplan einrichten", dauer: "7 Min", xp: 25 }
  ],
  krypto: [
    { titel: "Was ist Kryptowährung?",            dauer: "5 Min", xp: 20 },
    { titel: "Bitcoin vs. Altcoins",              dauer: "5 Min", xp: 20 },
    { titel: "Krypto sicher verwahren",           dauer: "7 Min", xp: 25 }
  ],
  aktien: [
    { titel: "Was ist eine Aktie?",               dauer: "5 Min", xp: 20 },
    { titel: "Wie man Aktien analysiert",         dauer: "6 Min", xp: 20 },
    { titel: "Dein erstes Portfolio aufbauen",    dauer: "7 Min", xp: 25 }
  ],
  wissen: [
    { titel: "Finanzielle Grundlagen",            dauer: "5 Min", xp: 20 },
    { titel: "Das Zinseszins-Prinzip",            dauer: "5 Min", xp: 20 },
    { titel: "Deinen Finanzplan erstellen",       dauer: "7 Min", xp: 25 }
  ]
}

export const AKTIONSPLAN_DATEN = {
  etf: {
    id: "etf",
    name: "ETF Basics",
    titel: "Du bist bereit. Starte heute.",
    subtitel: "3 Schritte die du jetzt tun kannst – kostenlos, in unter 30 Minuten",
    headerIcon: "🚀",
    bonusXP: 50,
    abschlussText: "🎉 Du bist jetzt Investor!",
    schritte: [
      {
        titel: "Depot eröffnen",
        iconKatId: 6,
        dauer: "~10 Minuten",
        beschreibung: "Wähle einen kostenlosen Neobroker. Alle drei sind kostenlos und für Einsteiger geeignet.",
        broker: ["Trade Republic", "Scalable Capital", "DKB"],
        infoBox: "Du brauchst: Personalausweis, Steuer-ID (auf deinem letzten Steuerbescheid), Bankverbindung"
      },
      {
        titel: "Freistellungsauftrag einrichten",
        iconKatId: 7,
        dauer: "~2 Minuten",
        beschreibung: "Direkt nach der Depot-Eröffnung: Freistellungsauftrag für 1.000€ einrichten. Sonst zahlt die Bank automatisch Steuern auf deine ersten Gewinne.",
        infoBox: "Ohne Freistellungsauftrag verlierst du sofort 26,375% auf jeden Gewinn – auch unter dem Freibetrag"
      },
      {
        titel: "Ersten ETF-Sparplan einrichten",
        iconKatId: 1,
        dauer: "~5 Minuten",
        beschreibung: "MSCI World ETF wählen (z.B. iShares Core MSCI World, ISIN: IE00B4L5Y983). Betrag festlegen – auch 25€/Monat sind ein guter Start. Datum: 1. des Monats.",
        sparplanRechner: true,
        infoBox: "Du kannst den Sparplan jederzeit pausieren oder anpassen"
      }
    ]
  },
  budget: {
    id: "budget",
    name: "Budgetierung",
    titel: "Dein Finanzfundament legen",
    subtitel: "4 Schritte für finanzielle Stabilität",
    headerIcon: "📊",
    bonusXP: 50,
    abschlussText: "🎉 Dein Fundament steht!",
    schritte: [
      {
        titel: "Notgroschen-Ziel berechnen",
        iconKatId: 5,
        dauer: "~5 Minuten",
        beschreibung: "Monatsausgaben × 3 = dein Notgroschen-Ziel. Richte ein separates Tagesgeldkonto dafür ein.",
        infoBox: null,
        rechner: true
      },
      {
        titel: "Dauerauftrag einrichten",
        iconKatId: 6,
        dauer: "~3 Minuten",
        beschreibung: "Am 1. des Monats automatisch X€ auf Notgroschen-Konto überweisen. Pay yourself first.",
        infoBox: null
      },
      {
        titel: "Ausgaben tracken starten",
        iconKatId: 5,
        dauer: "~15 Minuten",
        beschreibung: "Heute deine letzten 3 Monatsauszüge anschauen und Ausgaben in Kategorien einteilen. Wo geht das meiste hin?",
        infoBox: null
      },
      {
        titel: "Budget festlegen",
        iconKatId: 5,
        dauer: "~10 Minuten",
        beschreibung: "50/30/20 Regel anwenden. Schreib deine drei Budgets auf: Bedürfnisse / Wünsche / Sparen.",
        infoBox: null
      }
    ]
  },
  steuern: {
    id: "steuern",
    name: "Steuern",
    titel: "Deine Steuer-Checkliste",
    subtitel: "Diese Dinge kannst du sofort erledigen",
    headerIcon: "📋",
    bonusXP: 50,
    abschlussText: "🎉 Steuer-Checkliste abgehakt!",
    schritte: [
      {
        titel: "Steuer-ID suchen",
        iconKatId: 7,
        dauer: "~5 Minuten",
        beschreibung: "Deine Steuer-ID steht auf deinem letzten Steuerbescheid oder du kannst sie beim Bundeszentralamt für Steuern anfragen. Du brauchst sie für dein Depot.",
        infoBox: null
      },
      {
        titel: "Freistellungsauftrag prüfen",
        iconKatId: 7,
        dauer: "~2 Minuten",
        beschreibung: "Hast du ein Depot? Prüfe ob ein Freistellungsauftrag für 1.000€ eingerichtet ist.",
        infoBox: null
      },
      {
        titel: "ELSTER-Konto anlegen",
        iconKatId: 7,
        dauer: "~10 Minuten",
        beschreibung: "Kostenlos auf elster.de registrieren. Damit kannst du deine Steuererklärung selbst machen und im Schnitt 1.072€ zurückbekommen.",
        infoBox: null
      }
    ]
  }
}

export const AKTIONSPLAN_TRIGGER = {
  12:  "etf",
  602: "etf",
  608: "etf",
  308: "budget",
  701: "steuern"
}

export const dailyQuests = [
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

export const lernpfad = {
  1: [
    {
      id: 1,
      typ: "cards",
      titel: "Was ist ein ETF – und warum sollte dich das interessieren?",
      inhalt: `Stell dir vor, du hast 100€ und willst investieren. Du könntest Apple-Aktien kaufen – aber was wenn Apple nächstes Jahr abstürzt? Oder du kaufst Volkswagen – und dann kommt ein Dieselskandal.

Das Problem mit Einzelaktien: du setzt alles auf eine Karte. Und selbst die klügsten Investoren der Welt liegen regelmäßig falsch.

Ein ETF löst dieses Problem elegant. ETF steht für Exchange Traded Fund – ein Fonds, der an der Börse gehandelt wird wie eine normale Aktie. Statt in ein Unternehmen investierst du in hunderte gleichzeitig.

Beispiel: Der MSCI World ETF enthält über 1.500 Unternehmen aus 23 Ländern. Mit 100€ bist du anteilig Miteigentümer von Apple, Microsoft, Samsung, Nestlé und tausend anderen. Geht eines pleite – kaum spürbar. Wächst die Weltwirtschaft – du wächst mit.

Das ist keine Magie. Das ist Mathematik: Risiko verteilen nennt man Diversifikation, und ETFs machen das automatisch für dich.`,
      xp: 20,
      fragen: [
        {
          text: "Was ist ein ETF?",
          antworten: ["Eine einzelne Aktie", "Ein Fonds der viele Aktien bündelt und an der Börse handelbar ist", "Ein Sparkonto mit fester Rendite", "Eine Kryptowährung"],
          richtig: 1,
          erklaerung: "ETF steht für Exchange Traded Fund – ein Fonds der an der Börse gehandelt wird. Er enthält viele Aktien gleichzeitig und kann wie eine normale Aktie ge- und verkauft werden."
        },
        {
          text: "Anna investiert 100€/Monat für 25 Jahre bei 7% Rendite. Was hat sie am Ende ungefähr?",
          antworten: ["30.000€", "45.000€", "81.000€", "120.000€"],
          richtig: 2,
          erklaerung: "Bei 7% Rendite und Cost-Averaging über 25 Jahre ergibt sich ca. 81.000€. Du hast 30.000€ eingezahlt – die restlichen 51.000€ sind reiner Zinseszins."
        },
        {
          text: "Was ist TER und warum ist sie wichtig?",
          antworten: ["Eine Steuer auf ETF-Gewinne", "Die jährliche Kostenquote – sie reduziert deine Rendite direkt", "Die Mindestinvestitionssumme", "Der Name des Index"],
          richtig: 1,
          erklaerung: "TER (Total Expense Ratio) ist die jährliche Kostenquote. Sie wird automatisch aus dem ETF-Wert abgezogen. Für 10.000€ investiert kostet ein ETF mit 0,2% TER nur 20€ pro Jahr."
        }
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
        { text: "Was ist ein Index?", antworten: ["Ein teurer Investmentfonds", "Eine Liste von Unternehmen nach festen Regeln", "Ein staatliches Sparprogramm", "Eine Kryptowährung"], richtig: 1, erklaerung: "Ein Index ist eine Liste von Unternehmen nach festen Regeln – z.B. die 40 größten deutschen Unternehmen im DAX. Keine menschliche Entscheidung, nur klare Regeln." },
        { text: "Warum sind ETFs so günstig?", antworten: ["Sie investieren nur in kleine Unternehmen", "Sie werden passiv verwaltet – kein teurer Fondsmanager", "Sie haben staatliche Förderung", "Sie kaufen nur eine Aktie"], richtig: 1, erklaerung: "ETFs werden passiv verwaltet – sie folgen einfach dem Index. Das spart teure Fondsmanager. Ergebnis: ETFs kosten 0,1–0,2% TER, aktive Fonds 1,5–2% – ein riesiger Unterschied über Zeit." },
        { text: "Was kostet ein typischer ETF auf den MSCI World pro Jahr?", antworten: ["0–0,05%", "0,1–0,2%", "1–2%", "5%"], richtig: 1, erklaerung: "MSCI World ETFs von iShares oder Xtrackers kosten 0,1–0,2% TER pro Jahr. Bei 0,2% verlierst du nur 20€ pro 10.000€ – verglichen mit 150–200€ bei aktiven Fonds." }
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
        { text: "Wie hoch ist der US-Anteil im MSCI World ungefähr?", antworten: ["30%", "50%", "70%", "90%"], richtig: 2, erklaerung: "Etwa 70% des MSCI World sind US-Unternehmen – dominiert von Apple, Microsoft, NVIDIA & Co. Das bedeutet: wenn die US-Wirtschaft schwächelt, spürt dein ETF das besonders." },
        { text: "Was fehlt im MSCI World?", antworten: ["Europäische Unternehmen", "US-Technologiefirmen", "Schwellenländer wie China und Indien", "Finanzunternehmen"], richtig: 2, erklaerung: "Schwellenländer wie China, Indien und Brasilien sind im MSCI World nicht enthalten. Zusammen machen sie ca. 12% der Weltmarktkapitalisierung aus. Der MSCI ACWI schließt diese Lücke." },
        { text: "Was ist der Unterschied zwischen MSCI World und MSCI ACWI?", antworten: ["Kein Unterschied", "ACWI enthält zusätzlich Schwellenländer", "ACWI ist teurer", "ACWI enthält nur europäische Firmen"], richtig: 1, erklaerung: "ACWI steht für All Country World Index. Er enthält zusätzlich rund 2.000 Unternehmen aus 24 Schwellenländern. Wer maximal global diversifizieren will, wählt den ACWI." }
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
        { text: "Was macht ein thesaurierender ETF mit Dividenden?", antworten: ["Er zahlt sie aus", "Er reinvestiert sie automatisch", "Er spart sie für 5 Jahre", "Er löscht sie"], richtig: 1, erklaerung: "Thesaurierend kommt von lateinisch 'thesaurus' (Schatz). Der ETF kauft mit Dividenden automatisch weitere Anteile – du bekommst mehr Stücke statt Geld auf dein Konto." },
        { text: "Warum ist thesaurierend für Langfristanleger oft besser?", antworten: ["Es ist steuerfreier", "Der Zinseszinseffekt wirkt stärker", "Es gibt mehr Dividenden", "Es ist einfacher zu verkaufen"], richtig: 1, erklaerung: "Reinvestierte Dividenden verdienen selbst wieder Zinsen – das ist der Zinseszins-Effekt. 200€ Dividende sofort reinvestiert wachsen über 30 Jahre auf über 1.500€ bei 7% Rendite." },
        { text: "Was passiert bei einem ausschüttenden ETF mit den Dividenden?", antworten: ["Sie werden reinvestiert", "Sie verfallen", "Sie werden auf dein Konto ausgezahlt", "Sie gehen an den Staat"], richtig: 2, erklaerung: "Bei ausschüttenden ETFs werden Dividenden auf dein Verrechnungskonto ausgezahlt. Du musst aktiv entscheiden ob du reinvestierst – und zahlst sofort 26,375% Abgeltungssteuer." }
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
        { text: "Was bedeutet TER?", antworten: ["Trade Execution Rate", "Total Expense Ratio", "Tax Exemption Rule", "Transfer Equity Ratio"], richtig: 1, erklaerung: "TER steht für Total Expense Ratio – die Gesamtkostenquote. Sie beinhaltet Verwaltungsgebühren und alle Betriebskosten des ETF. Sie wird täglich anteilig aus dem Kurswert abgezogen." },
        { text: "Wie werden ETF-Kosten abgezogen?", antworten: ["Als jährliche Rechnung", "Automatisch aus dem ETF-Wert", "Beim Kauf einmalig", "Beim Verkauf"], richtig: 1, erklaerung: "Die TER ist bereits im täglichen Kurswert eingepreist – du siehst keine separate Rechnung. Der NAV des ETF steigt einfach langsamer als der Index, um die Kosten zu reflektieren." },
        { text: "Was ist die Tracking Difference?", antworten: ["Die Transaktionskosten", "Wie gut der ETF seinen Index wirklich abbildet", "Der Spread beim Kauf", "Die jährliche Steuer"], richtig: 1, erklaerung: "Die TD zeigt die echte Performance-Differenz zwischen ETF und Index – inklusive aller Kosten und Erträge aus Wertpapierleihe. Manche ETFs haben negative TD und performen sogar besser als ihr Index." }
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
        { text: "Was macht ein physisch replizierender ETF?", antworten: ["Er kauft Derivate", "Er kauft die Aktien des Index direkt", "Er leiht sich Aktien", "Er kopiert andere ETFs"], richtig: 1, erklaerung: "Ein physisch replizierender ETF kauft buchstäblich alle Aktien des Index. Beim S&P 500 bedeutet das: 500 Aktien im richtigen Verhältnis. Transparent, verständlich und empfohlen für Einsteiger." },
        { text: "Was ist Kontrahentenrisiko bei synthetischen ETFs?", antworten: ["Der Index fällt", "Die Bank die den Swap garantiert könnte pleite gehen", "Die TER steigt", "Der ETF wird geschlossen"], richtig: 1, erklaerung: "Bei synthetischen ETFs gibt es einen Swap-Partner (meist eine große Bank). Geht diese Bank pleite, könnte der Swap wertlos werden. Regulatoren begrenzen das Risiko durch 102-105% Sicherheitenanforderungen." },
        { text: "Was ist Sampling bei physischer Replikation?", antworten: ["Nur die wichtigsten Aktien des Index werden gekauft", "Alle Aktien werden gekauft", "Aktien werden verliehen", "Der Index wird monatlich gewechselt"], richtig: 0, erklaerung: "Beim optimierten Sampling kauft der ETF nur die wichtigsten Aktien – nicht jede winzige Position. Das spart Transaktionskosten bei Indizes mit tausenden Titeln wie dem MSCI World." }
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
        { text: "Warum haben manche ETFs eine negative Tracking Difference?", antworten: ["Sie haben Fehler im System", "Sie verdienen durch Wertpapierleihe Extraeinnahmen", "Sie betrügen Anleger", "Der Index wird falsch berechnet"], richtig: 1, erklaerung: "Wenn Wertpapierleihe-Einnahmen die TER übersteigen, performt der ETF besser als sein Index. Das klingt nach einem Fehler, ist aber real – und gut für dich als Anleger." },
        { text: "An wen verleihen ETFs ihre Aktien?", antworten: ["An andere Privatanleger", "An die Regierung", "An Marktteilnehmer wie Hedgefonds", "An andere ETFs"], richtig: 2, erklaerung: "Hauptsächlich an Hedgefonds für Leerverkäufe. Sie leihen sich Aktien, verkaufen sie sofort, kaufen später günstiger zurück und geben sie zurück. Der ETF kassiert dafür eine Leihgebühr." },
        { text: "Wie wird das Risiko der Wertpapierleihe begrenzt?", antworten: ["Gar nicht", "Durch Sicherheiten die der Entleiher stellen muss", "Durch staatliche Garantien", "Durch Versicherungen"], richtig: 1, erklaerung: "Entleiher müssen Sicherheiten von 102–105% des geliehenen Wertes stellen. Fällt der Entleiher aus, verkauft der ETF die Sicherheiten. Bei großen Anbietern wie iShares ist das Risiko sehr gering." }
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
        { text: "Wie hoch ist die Abgeltungssteuer in Deutschland?", antworten: ["15%", "19%", "25% + Soli = 26,375%", "30%"], richtig: 2, erklaerung: "25% Abgeltungssteuer + 5,5% Solidaritätszuschlag = 26,375%. Ggf. plus Kirchensteuer. Diese Steuer gilt für alle Kapitalerträge – Dividenden, realisierte Kursgewinne, Vorabpauschale." },
        { text: "Was ist der Sparerpauschbetrag für Singles?", antworten: ["500€", "801€", "1.000€", "2.000€"], richtig: 2, erklaerung: "Seit 2023 gilt ein Sparerpauschbetrag von 1.000€ für Einzelpersonen (2.000€ für Verheiratete). Innerhalb dieses Betrags sind alle Kapitalerträge steuerfrei – nutze ihn mit einem Freistellungsauftrag." },
        { text: "Was ist ein Freistellungsauftrag?", antworten: ["Ein Antrag auf Steuerfreiheit für alle Gewinne", "Ein Auftrag der die Bank anweist Gewinne bis zum Freibetrag steuerfrei zu lassen", "Eine Versicherung gegen Verluste", "Ein staatlicher Sparbonus"], richtig: 1, erklaerung: "Der Freistellungsauftrag weist die Depotbank an, Erträge bis zum Freibetrag nicht zu versteuern. Ohne ihn zieht die Bank automatisch Steuern ab – auch wenn deine Gewinne unter 1.000€ liegen." }
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
        { text: "Was ist der Cost-Averaging-Effekt?", antworten: ["Du kaufst immer zum gleichen Preis", "Du kaufst automatisch mehr Anteile wenn es günstig ist", "Du sparst Steuern durch regelmäßiges Kaufen", "Du vermeidest Verluste"], richtig: 1, erklaerung: "Durch regelmäßiges Kaufen erwirbt man bei niedrigen Kursen automatisch mehr Anteile und bei hohen weniger. Über Zeit sinkt der durchschnittliche Einkaufspreis – ohne dass man etwas tun muss." },
        { text: "Was ist ein großer psychologischer Vorteil des Sparplans?", antworten: ["Du siehst täglich deinen Gewinn", "Du musst nie den richtigen Kaufzeitpunkt finden", "Du bekommst staatliche Förderung", "Du kannst jederzeit kostenlos verkaufen"], richtig: 1, erklaerung: "Market Timing ist einer der häufigsten Anfängerfehler. Ein Sparplan eliminiert die Frage nach dem 'richtigen Zeitpunkt' – du investierst automatisch, egal ob Krise oder Boom." },
        { text: "Ab wie viel Euro bieten viele Broker Sparpläne an?", antworten: ["10€", "25€", "50€", "1€"], richtig: 3, erklaerung: "Neobroker wie Trade Republic oder Scalable Capital bieten Sparpläne ab 1€ an. Das bedeutet: Jeder kann heute anfangen, unabhängig vom Einkommen." }
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
        { text: "Was ist die klassische '70/30-Strategie'?", antworten: ["70% Aktien, 30% Anleihen", "70% MSCI World, 30% Emerging Markets", "70% thesaurierend, 30% ausschüttend", "70% ETF, 30% Einzelaktien"], richtig: 1, erklaerung: "70% MSCI World (entwickelte Länder) + 30% Emerging Markets ETF (China, Indien, Brasilien...). Diese Kombination gilt als optimales Gleichgewicht zwischen Stabilität und Wachstumspotenzial." },
        { text: "Wie groß sollte ein ETF mindestens sein?", antworten: ["1 Million Euro", "10 Millionen Euro", "100 Millionen Euro", "1 Milliarde Euro"], richtig: 2, erklaerung: "ETFs unter 50 Mio. Fondsvolumen laufen Gefahr geschlossen zu werden. Über 100 Mio. ist das Risiko sehr gering. Große MSCI World ETFs haben mehrere Milliarden – kein Problem." },
        { text: "Was sind die drei größten ETF-Anbieter?", antworten: ["Deutsche Bank, Commerzbank, DKB", "iShares, Xtrackers, Vanguard", "Trade Republic, Scalable, Comdirect", "Apple, Google, Microsoft"], richtig: 1, erklaerung: "iShares (BlackRock), Xtrackers (DWS/Deutsche Bank) und Vanguard sind die drei Marktführer. Alle bieten günstige ETFs mit TER unter 0,25% an – solide, reguliert, milliardenschwer." }
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
        { text: "Was ist Rebalancing?", antworten: ["Einen neuen ETF kaufen", "Das ursprüngliche Portfolio-Verhältnis wiederherstellen", "Alle ETFs verkaufen und neu kaufen", "Den ETF-Anbieter wechseln"], richtig: 1, erklaerung: "Durch unterschiedliche Wertentwicklung weicht dein Portfolio von der Zielgewichtung ab. Rebalancing stellt das ursprüngliche Verhältnis wieder her – und verhindert unbewusstes Eingehen von mehr Risiko." },
        { text: "Wie oft sollte man typischerweise rebalancen?", antworten: ["Täglich", "Monatlich", "Einmal pro Jahr", "Alle 10 Jahre"], richtig: 2, erklaerung: "Einmal jährlich reicht vollkommen aus. Häufigeres Rebalancing verursacht unnötige Steuern und Transaktionskosten. Alternativ: Rebalancen wenn die Abweichung mehr als 5% beträgt." },
        { text: "Was ist der steuerschonendste Weg zum Rebalancen?", antworten: ["Alles verkaufen und neu kaufen", "Neue Einzahlungen in den untergewichteten Teil stecken", "Dividenden zum Rebalancen nutzen", "Nichts tun"], richtig: 1, erklaerung: "Neue Einzahlungen in den untergewichteten ETF zu lenken statt etwas zu verkaufen vermeidet Steuerereignisse komplett. Du nutzt frisches Kapital statt bereits investiertes zu verschieben." }
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
        { text: "Was ist einer der besten Broker für ETF-Sparpläne in Deutschland?", antworten: ["PayPal", "Trade Republic oder Scalable Capital", "Amazon", "Ebay"], richtig: 1, erklaerung: "Trade Republic und Scalable Capital sind die beliebtesten Neobroker in Deutschland. Beide bieten kostenlose Sparpläne ab 1€, benutzerfreundliche Apps und BaFin-regulierten Schutz." },
        { text: "Was ist die einzige wirklich schlechte Entscheidung beim ETF-Investieren?", antworten: ["Zu früh anfangen", "Zu kleine Beträge investieren", "Verkaufen wenn es unten ist", "Thesaurierend statt ausschüttend wählen"], richtig: 2, erklaerung: "Panikverkäufe in Krisen sind der teuerste Fehler. Wer 2008 durchgehalten hat, erlebte danach die stärkste Dekade der Börsengeschichte. Die einzige schlechte Entscheidung ist das Aussteigen bei -30%." },
        { text: "Wie oft sollte man sein ETF-Portfolio aktiv überprüfen?", antworten: ["Täglich", "Wöchentlich", "Monatlich", "Einmal pro Jahr"], richtig: 3, erklaerung: "Tägliches Schauen erhöht Stress und führt zu Überreaktionen. Eine jährliche Überprüfung genügt: Rebalancing prüfen, Sparrate anpassen wenn nötig. Dann wieder loslassen." }
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
  4: [
    {
      id: 401,
      typ: "cards",
      titel: "Was sind Hebelprodukte – und warum sind sie gefährlich?",
      xp: 35,
      fragen: [
        {
          text: "Was bedeutet ein 10x Hebel bei einem Investment von 1.000 €?",
          antworten: ["Du investierst 10.000 €", "Du kontrollierst eine 10.000 €-Position mit nur 1.000 € Einsatz", "Du bekommst 10× Dividenden", "Der Gewinn ist garantiert 10× höher"],
          richtig: 1,
          erklaerung: "Mit 10× Hebel kontrollierst du eine 10.000 €-Position mit 1.000 € Eigenkapital. +10% Marktbewegung → +100% auf deinen Einsatz. Aber auch −10% → −100% – Totalverlust."
        },
        {
          text: "Was ist Margin?",
          antworten: ["Der Gewinn aus dem Hebelprodukt", "Die Sicherheitsleistung die du hinterlegst um eine gehebelte Position zu eröffnen", "Die jährliche Gebühr", "Der maximale Verlust"],
          richtig: 1,
          erklaerung: "Margin ist die Sicherheitsleistung – der Geldbetrag den du hinterlegen musst. Fällt der Wert unter die Maintenance Margin, erfolgt ein Margin Call oder automatische Liquidation."
        },
        {
          text: "Was passiert bei einer Liquidation?",
          antworten: ["Die Position wird gewinnbringend geschlossen", "Die Position wird automatisch geschlossen – der Einsatz kann vollständig verloren sein", "Du bekommst Kapital von der Plattform", "Verluste werden auf nächste Woche übertragen"],
          richtig: 1,
          erklaerung: "Bei Liquidation schließt die Plattform deine Position zwangsweise wenn dein Kapital nicht mehr ausreicht. Beim 10× Hebel passiert das schon bei −10% Marktbewegung – der gesamte Einsatz ist weg."
        }
      ]
    },
    {
      id: 402,
      typ: "cards",
      titel: "CFDs verstehen – warum 74 % der Anleger verlieren",
      xp: 35,
      fragen: [
        {
          text: "Was ist ein CFD (Contract for Difference)?",
          antworten: ["Eine Aktie mit fester Rendite", "Ein Vertrag auf die Kursdifferenz – du besitzt das Underlying nicht", "Ein ETF auf Rohstoffe", "Ein Staatsfonds für Privatanleger"],
          richtig: 1,
          erklaerung: "CFD steht für Contract for Difference. Du wettest auf die Kursbewegung ohne das Asset je zu besitzen. Bei Schließung wird nur die Differenz zwischen Eröffnungs- und Schlusskurs ausgezahlt."
        },
        {
          text: "Warum müssen EU-regulierte CFD-Anbieter eine Verlustwarnung anzeigen?",
          antworten: ["Wegen der hohen Gewinne für Profis", "Weil 74 % der Privatanleger Geld verlieren – gesetzliche Transparenzpflicht", "Weil CFDs in der EU verboten sind", "Nur bei Hebeln über 50×"],
          richtig: 1,
          erklaerung: "EU-Regulierung (ESMA) schreibt vor, dass Anbieter die prozentuale Verlustquote ihrer Kunden offenlegen. Bei manchen Anbietern verlieren 80–85 % der Retail-Trader."
        },
        {
          text: "Was sind Overnight-Gebühren bei CFDs?",
          antworten: ["Gebühren für den ersten Kauf", "Tägliche Finanzierungskosten für Positionen die über Nacht gehalten werden", "Steuern auf CFD-Gewinne", "Gebühren für automatische Stop-Loss"],
          richtig: 1,
          erklaerung: "Overnight-Gebühren (Swap/Rollover) fallen täglich an wenn du eine CFD-Position über Nacht hältst. Sie basieren auf Interbanken-Zinssatz + Aufschlag. Bei längerem Halten summieren sie sich erheblich."
        }
      ]
    },
    {
      id: 403,
      typ: "cards",
      titel: "Optionen Grundlagen: Calls und Puts",
      xp: 40,
      fragen: [
        {
          text: "Was ist eine Call-Option?",
          antworten: ["Das Recht eine Aktie zu einem Preis zu VERKAUFEN", "Das Recht eine Aktie zu einem festgelegten Preis zu KAUFEN", "Eine Pflicht zum Kauf bei Fälligkeit", "Eine Aktie mit hoher Dividende"],
          richtig: 1,
          erklaerung: "Eine Call-Option gibt das RECHT (nicht die Pflicht), eine Aktie bis zum Verfallsdatum zum Strike Price zu kaufen. Du profitierst wenn der Kurs steigt. Maximalverlust: die bezahlte Prämie."
        },
        {
          text: "Was ist der Strike Price?",
          antworten: ["Der aktuelle Marktpreis", "Der festgelegte Preis zu dem die Option ausgeübt werden kann", "Der maximale Verlust", "Der Preis der Prämie"],
          richtig: 1,
          erklaerung: "Der Strike Price (Ausübungspreis) ist der vereinbarte Preis zu dem du kaufen (Call) oder verkaufen (Put) kannst. Liegt der Marktpreis über dem Strike, ist ein Call 'in the money'."
        },
        {
          text: "Was ist die maximale Verlustmöglichkeit beim KAUF einer Option?",
          antworten: ["Unbegrenzte Verluste", "Die bezahlte Prämie – nicht mehr", "50 % des investierten Betrags", "Der Wert des Underlyings"],
          richtig: 1,
          erklaerung: "Als Käufer einer Option riskierst du maximal die bezahlte Prämie. Verfällt die Option wertlos, verlierst du 100 % der Prämie. Anders als beim Verkäufer – der hat unbegrenzte Verlustmöglichkeiten."
        }
      ]
    },
    {
      id: 404,
      typ: "cards",
      titel: "Optionen Strategien für Einsteiger",
      xp: 40,
      fragen: [
        {
          text: "Was ist ein Covered Call?",
          antworten: ["Eine Call-Option kaufen als Absicherung", "Call-Optionen auf Aktien die man bereits besitzt verkaufen um Prämien einzunehmen", "Eine Option mit unlimitiertem Gewinnpotenzial", "Ein ETF mit integrierter Optionsstrategie"],
          richtig: 1,
          erklaerung: "Beim Covered Call verkaufst du Call-Optionen auf Aktien die du bereits besitzt. Du kassierst die Prämie, begrenzt aber deinen maximalen Gewinn. Geeignet für stagnierende Märkte – kein Einsteiger-Instrument."
        },
        {
          text: "Wofür wird ein Protective Put genutzt?",
          antworten: ["Um von fallenden Kursen zu profitieren", "Als Versicherung – Put-Option kaufen um bestehende Aktien gegen Kursverluste abzusichern", "Um Dividenden zu maximieren", "Um Steuern zu sparen"],
          richtig: 1,
          erklaerung: "Ein Protective Put ist wie eine Portfolio-Versicherung: Du kaufst eine Put-Option auf Aktien die du besitzt. Fällt der Kurs stark, schützt die Put-Option. Kostet Prämie, schützt Kapital."
        },
        {
          text: "Für wen sind fortgeschrittene Optionsstrategien geeignet?",
          antworten: ["Für alle Anleger ab Level 1", "Für erfahrene Anleger mit tiefem Verständnis von Optionsmechanik und Risiken", "Für alle die den Strike Price kennen", "Nur für institutionelle Anleger"],
          richtig: 1,
          erklaerung: "Optionsstrategien erfordern Verständnis von Greeks (Delta, Gamma, Theta, Vega), Risikomanagement und Marktdynamik. Einsteiger verlieren häufig die gesamte Prämie. Erst nach intensivem Studium empfohlen."
        }
      ]
    },
    {
      id: 405,
      typ: "cards",
      titel: "Futures – was sie von Optionen unterscheidet",
      xp: 35,
      fragen: [
        {
          text: "Was ist der wichtigste Unterschied zwischen Futures und Optionen?",
          antworten: ["Futures sind teurer", "Futures sind PFLICHT zum Kauf/Verkauf – Optionen geben nur ein RECHT", "Futures gibt es nur für Rohstoffe", "Optionen werden täglich abgerechnet"],
          richtig: 1,
          erklaerung: "Bei einem Future haben BEIDE Seiten eine Pflicht: Käufer muss kaufen, Verkäufer muss liefern – zum vereinbarten Preis. Bei Optionen hat nur der Verkäufer eine Pflicht; der Käufer hat das Recht aber nicht die Pflicht."
        },
        {
          text: "Wer nutzt Futures hauptsächlich zur Absicherung?",
          antworten: ["Privatanleger für schnelle Gewinne", "Unternehmen wie Landwirte und Airlines zur Preissicherung", "Nationalbanken für Währungspolitik", "Neobroker für Kundendepots"],
          richtig: 1,
          erklaerung: "Airlines kaufen Kerosin-Futures um sich gegen steigende Ölpreise abzusichern. Landwirte sichern Erntepreise ab. Das ist der legitime Kernzweck: Preis-Unsicherheit eliminieren."
        },
        {
          text: "Was ist ein Rollover bei Futures?",
          antworten: ["Ein automatischer Gewinn nach Ablauf", "Eine Gebühr über Nacht", "Das Wechseln in den nächsten Kontrakt vor dem Verfallsdatum", "Die Steuer auf ausgelaufene Futures"],
          richtig: 2,
          erklaerung: "Futures haben ein festes Verfallsdatum. Wer die Position länger halten will, muss vor Verfall in den nächsten Kontrakt 'rollen'. Dabei entstehen Rollkosten oder -gewinne je nach Marktstruktur."
        }
      ]
    },
    {
      id: 406,
      typ: "cards",
      titel: "Krypto-Derivate: Bitcoin Futures und Perpetuals",
      xp: 40,
      fragen: [
        {
          text: "Was sind Perpetual Swaps?",
          antworten: ["Bitcoin Futures ohne Verfallsdatum mit Funding Rate statt Rollover", "Physische Bitcoin-Lieferung nach 30 Tagen", "Staatlich regulierte Krypto-Sparpläne", "DeFi-Protokolle für Staking"],
          richtig: 0,
          erklaerung: "Perpetual Swaps sind Futures ohne Verfallsdatum. Statt 'rollen' bezahlen/empfangen Longs und Shorts eine Funding Rate alle 8 Stunden – sie hält den Futures-Preis nahe am Spot-Kurs. Extrem beliebt und extrem riskant."
        },
        {
          text: "Was bedeutet Funding Rate bei Perpetual Swaps?",
          antworten: ["Die tägliche Krypto-Inflation", "Eine regelmäßige Zahlung zwischen Longs und Shorts die den Futures-Preis am Spot-Kurs hält", "Die Steuern auf Krypto-Derivate", "Die Transaktionsgebühr der Plattform"],
          richtig: 1,
          erklaerung: "Ist die Funding Rate positiv zahlen Longs an Shorts (mehr Käufer als Verkäufer). Ist sie negativ zahlen Shorts an Longs. Bei 0,1% Funding alle 8h zahlst du schon ~10,9% pro Monat allein an Haltekosten."
        },
        {
          text: "Wie hoch kann der Hebel bei manchen Krypto-Börsen maximal sein?",
          antworten: ["5×", "20×", "50×", "125×"],
          richtig: 3,
          erklaerung: "Plattformen wie Bybit bieten bis zu 125× Hebel auf Bitcoin. Das bedeutet: Bitcoin fällt 0,8% → Totalverlust. EU-regulierte Plattformen begrenzen Krypto-Hebel auf 2× – aus gutem Grund."
        }
      ]
    },
    {
      id: 407,
      typ: "cards",
      titel: "Knock-Out Zertifikate und Turbos erklärt",
      xp: 35,
      fragen: [
        {
          text: "Was ist ein Knock-Out Zertifikat?",
          antworten: ["Eine Aktie die nach Verlust aus der Börse fällt", "Ein Hebelprodukt das sofort wertlos wird wenn der Kurs die Barrier berührt", "Ein gesichertes Tagesgeldkonto", "Ein Fonds mit Kapitalgarantie"],
          richtig: 1,
          erklaerung: "Knock-Out Zertifikate sind Hebelprodukte mit einer Barrier (Schwelle). Berührt der Kurs des Basiswerts diese Schwelle – auch nur kurz – wird das Zertifikat sofort wertlos. Dieses Ereignis heißt Knock-Out."
        },
        {
          text: "Was unterscheidet Knock-Outs von klassischen Optionen?",
          antworten: ["Kein wesentlicher Unterschied", "Knock-Outs reagieren fast 1:1 auf den Basiswert (wenig Zeitwertverlust) aber enden sofort beim Berühren der Barrier", "Knock-Outs sind durch Staatsfonds besichert", "Optionen verfallen nach 1 Tag, Knock-Outs nicht"],
          richtig: 1,
          erklaerung: "Knock-Outs bilden den Basiswert nahezu 1:1 ab (Delta ≈ 1) und haben kaum Zeitwertverlust – ein Vorteil. Nachteil: ein Moment wo der Kurs die Barrier berührt und das gesamte Investment ist wertlos."
        },
        {
          text: "Was passiert wenn ein Knock-Out 'ausgeknockt' wird?",
          antworten: ["Du bekommst den vollen Einsatz zurück", "Das Zertifikat verfällt wertlos oder mit minimalem Restwert", "Du kannst zu einem Discount nachkaufen", "Die Position wird in eine Put-Option umgewandelt"],
          richtig: 1,
          erklaerung: "Beim Knock-Out verfällt das Zertifikat sofort. Je nach Produkttyp gibt es einen kleinen Restwert oder es ist vollständig wertlos. Der Knock-Out kann in Sekunden passieren – auch wenn der Kurs danach sofort wieder steigt."
        }
      ]
    },
    {
      id: 408,
      typ: "cards",
      titel: "Risikomanagement bei Hebelprodukten",
      xp: 40,
      fragen: [
        {
          text: "Wie viel Prozent des Kapitals sollte man maximal in einem einzigen Trade riskieren?",
          antworten: ["10–20 % – für maximalen Gewinn", "5–10 % – branchenüblich", "1–2 % – Standardregel des professionellen Trading", "50 % wenn man sehr sicher ist"],
          richtig: 2,
          erklaerung: "Die '1–2%-Regel' ist der goldene Standard: Pro Trade nie mehr als 1–2% des Gesamtkapitals riskieren. Bei 10.000 € sind das 100–200 € maximaler Verlust – klingt wenig, schützt aber vor dem katastrophalen Totalverlust."
        },
        {
          text: "Was ist Position Sizing?",
          antworten: ["Die Gesamtgröße des Portfolios", "Das bewusste Berechnen wie viel in eine Position investiert wird – basierend auf dem maximalen Risiko", "Die Anzahl offener Positionen", "Der Hebel einer Position"],
          richtig: 1,
          erklaerung: "Position Sizing berechnet wie viel Kapital in eine Position fließen soll. Formel: Positionsgröße = (Kapital × Risikoanteil) / (Einstiegspreis − Stop-Loss-Preis). Das kontrolliert den maximalen Verlust unabhängig vom Hebel."
        },
        {
          text: "Was ist der maximale Drawdown?",
          antworten: ["Der höchste Einzel-Tagesverlust", "Der größte prozentuale Rückgang vom Höchststand zum Tiefststand des Portfolios", "Die durchschnittliche Verlustrate", "Der Totalverlust aller Positionen"],
          richtig: 1,
          erklaerung: "Maximaler Drawdown (Max DD) misst den größten Verlust vom Peak zum Trough. Bei 50% Drawdown braucht man 100% Rendite um auf null zu kommen. Professionelle Trader halten den Max DD unter 20–25%."
        }
      ]
    },
    {
      id: 409,
      typ: "cards",
      titel: "Steuerliche Behandlung von Derivaten in Deutschland",
      xp: 40,
      fragen: [
        {
          text: "Können Verluste aus Termingeschäften (Optionen, Futures) mit ETF-Gewinnen verrechnet werden?",
          antworten: ["Ja, vollständig", "Ja, aber nur bis 20.000 €", "Nein – separater Verlustverrechnungstopf der nur mit Termingeschäfts-Gewinnen verrechnet werden kann", "Ja, aber nur im gleichen Steuerjahr"],
          richtig: 2,
          erklaerung: "Seit 2021 gibt es in Deutschland einen separaten Verlustverrechnungstopf für Termingeschäfte (§20 Abs. 6 Satz 5 EStG). Verluste aus Optionen, Futures und CFDs können NUR mit Gewinnen aus Termingeschäften verrechnet werden – nicht mit ETF-Gewinnen."
        },
        {
          text: "Was bedeutet der 20.000 €-Cap bei Termingeschäftsverlusten?",
          antworten: ["Man kann maximal 20.000 € in Derivate investieren", "Verluste aus Termingeschäften können pro Jahr maximal 20.000 € mit Gewinnen verrechnet werden – der Rest wird vorgetragen", "Gewinne bis 20.000 € sind steuerfrei", "Der Sparerpauschbetrag gilt auch für Derivate"],
          richtig: 1,
          erklaerung: "Seit Jahressteuergesetz 2020: Verlustverrechnung aus Termingeschäften ist auf 20.000 € pro Jahr begrenzt. Wer 100.000 € verliert, kann nur 20.000 € sofort verrechnen – ein massiver Nachteil für aktive Derivatehändler."
        },
        {
          text: "Wie werden CFD-Gewinne in Deutschland besteuert?",
          antworten: ["Mit 19 % Mehrwertsteuer", "Mit Abgeltungssteuer 25 % + Soli = 26,375 %", "Mit dem 1-Jahres-Steuerfreiheits-Prinzip wie Krypto", "Mit dem persönlichen Einkommensteuersatz"],
          richtig: 1,
          erklaerung: "CFD-Gewinne unterliegen der Abgeltungssteuer (25% + Soli = 26,375%). Verluste kommen in den separaten Termingeschäfts-Verlustverrechnungstopf (max. 20.000 €/Jahr). Diese Asymmetrie benachteiligt Trader erheblich."
        }
      ]
    },
    {
      id: 410,
      typ: "cards",
      titel: "Wann Hebelprodukte sinnvoll sind – und für wen",
      xp: 45,
      fragen: [
        {
          text: "Was ist die legitime Nutzung von Optionen für langfristige Anleger?",
          antworten: ["Für tägliche Gewinne durch Optionshandel", "Als Versicherung (Protective Put) um ein bestehendes Portfolio gegen starke Rückschläge abzusichern", "Um den MSCI World zu hebeln für mehr Rendite", "Für wöchentliche Einnahmen durch Optionsverkäufe"],
          richtig: 1,
          erklaerung: "Hedging ist der einzige Grund für die meisten langfristigen Anleger Optionen zu verwenden: eine Put-Option schützt dein Portfolio wie eine Versicherung. Du zahlst eine Prämie und bist gegen starke Kurseinbrüche geschützt."
        },
        {
          text: "Was zeigt der Vergleich zwischen aktivem Trading und Buy-and-Hold ETF über 10+ Jahre?",
          antworten: ["Aktive Trader erzielen im Schnitt höhere Renditen", "Der ETF-Sparplan schlägt die meisten aktiven Trader nach Kosten und Steuern langfristig", "Beide Strategien sind langfristig gleich gut", "Hebelprodukte sind nach Steuer immer effizienter"],
          richtig: 1,
          erklaerung: "Studien (DALBAR, SPIVA) zeigen: 85–90% der aktiven Trader underperformen den Marktindex langfristig. Ein simpler ETF-Sparplan mit MSCI World schlägt die meisten Privattrader nach Kosten, Steuern und psychologischen Fehlern."
        },
        {
          text: "Für welche Anlegergruppe sind Hebelprodukte möglicherweise geeignet?",
          antworten: ["Alle die höhere Rendite wollen", "Erfahrene Anleger mit klarer Strategie, Risikokapital und tiefem technischen Verständnis", "Einsteiger mit großem Kapital", "ETF-Anleger ab Level 10 in Lumio"],
          richtig: 1,
          erklaerung: "Hebelprodukte sind für erfahrene Anleger die: tiefes technisches Verständnis haben, nur Risikokapital einsetzen das sie komplett verlieren können, klare Strategien befolgen und Steuerregeln kennen. Das trifft auf sehr wenige Privatanleger zu."
        }
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
    },
    {
      id: 302,
      titel: "Der Notgroschen – dein finanzielles Fundament",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Wie viele Monatsausgaben sollte ein Notgroschen mindestens abdecken?", antworten: ["1 Monat – für den Anfang reicht das", "3 Monate – Mindeststandard", "6 Monate – für alle Situationen", "12 Monate – maximale Sicherheit"], richtig: 1 },
        { text: "Lena hat 1.800 € Monatsausgaben. Wie hoch sollte ihr Notgroschen mindestens sein?", antworten: ["900 € (0,5 Monate)", "1.800 € (1 Monat)", "5.400 € (3 Monate)", "10.000 € (Pauschal)"], richtig: 2 },
        { text: "Warum sollte der Notgroschen NICHT in ETFs investiert sein?", antworten: ["ETFs sind zu teuer für kleine Beträge", "ETFs können kurzfristig stark fallen – genau wenn man das Geld braucht", "ETFs sind nur für Anlagehorizonte über 10 Jahre geeignet", "B und C sind beide richtig"], richtig: 3 }
      ]
    },
    {
      id: 303,
      titel: "Die 50/30/20 Regel wirklich umsetzen",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Wie viel Prozent des Nettoeinkommens empfiehlt die 50/30/20 Regel für Ersparnisse/Investitionen?", antworten: ["10 %", "20 %", "30 %", "50 %"], richtig: 1 },
        { text: "Max verdient 1.800 € netto. Wie viel darf er laut 50/30/20 maximal für Wünsche ausgeben?", antworten: ["180 € (10 %)", "360 € (20 %)", "540 € (30 %)", "900 € (50 %)"], richtig: 2 },
        { text: "Was ist 'Pay yourself first'?", antworten: ["Sich selbst ein Gehalt zahlen als Selbstständiger", "Ersparnisse am Monatsanfang automatisch überweisen – bevor man ausgibt", "Nur für sich selbst sparen, nicht für Familie", "Erst Schulden zahlen, dann sparen"], richtig: 1 }
      ]
    },
    {
      id: 304,
      titel: "Ausgaben tracken – die Wahrheit über dein Geld",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Um wie viel unterschätzen Menschen ihre monatlichen Ausgaben durchschnittlich?", antworten: ["10 %", "20 %", "40 %", "Menschen sind ziemlich genau"], richtig: 2 },
        { text: "Was ist die 'Envelope-Methode'?", antworten: ["Rechnungen per Brief bezahlen", "Bargeld in beschriftete Umschläge für verschiedene Kategorien aufteilen", "Alle Ausgaben in einem Sammelumschlag aufheben", "Eine digitale Budgetierungsapp"], richtig: 1 },
        { text: "Anna gibt unbemerkt 180 €/Monat für Kleinigkeiten aus. Im ETF bei 7 % über 20 Jahre wäre das ca.:", antworten: ["43.200 € (nur Einzahlungen)", "~92.000 € (mit Zinseszins)", "~45.000 € (mit 3 % Tagesgeld)", "~180.000 € (unrealistisch)"], richtig: 1 }
      ]
    },
    {
      id: 305,
      titel: "Schulden strategisch abbauen",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Was versteht man unter 'guten Schulden'?", antworten: ["Schulden mit besonders niedrigem Zinssatz", "Schulden die in wertvermehrende Assets investiert werden (z.B. Bildung, Immobilie)", "Schulden bei Familie und Freunden", "Kleine Schulden unter 500 €"], richtig: 1 },
        { text: "Was ist das Prinzip der Avalanche-Methode beim Schuldenabbau?", antworten: ["Die kleinste Schuld zuerst abzahlen für schnelle Erfolgserlebnisse", "Die Schuld mit dem höchsten Zinssatz zuerst tilgen – spart am meisten Geld", "Alle Schulden gleichmäßig und parallel abzahlen", "Schulden warten lassen und erst investieren"], richtig: 1 },
        { text: "Max: 500 € Schulden bei 20 % Zinsen, 2.000 € bei 5 % Zinsen. Welche zuerst abzahlen?", antworten: ["2.000 € – weil der Betrag größer ist", "500 € – weil der Betrag kleiner und schneller erledigt ist", "500 € – weil 20 % Zinsen absolut mehr kosten als 5 % auf 2.000 €", "Beide gleichzeitig in gleichen Teilen"], richtig: 2 }
      ]
    },
    {
      id: 306,
      titel: "Sparziele SMART setzen und erreichen",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Was steht das Akronym SMART bei Finanzzielen?", antworten: ["Schnell – Mutig – Aktiv – Realistisch – Treu", "Spezifisch – Messbar – Attraktiv – Realistisch – Terminiert", "Sicher – Monatlich – Automatisch – Rendite – Transparent", "Keine dieser Definitionen"], richtig: 1 },
        { text: "Sofia möchte in 18 Monaten 3.600 € für einen Urlaub sparen. Wie viel muss sie monatlich zurücklegen?", antworten: ["100 €/Monat", "150 €/Monat", "200 €/Monat", "300 €/Monat"], richtig: 2 },
        { text: "Warum ist automatisches Sparen per Dauerauftrag effektiver als manuelles Sparen?", antworten: ["Man erhält automatisch mehr Zinsen", "Man umgeht den psychologischen Drang das Geld auszugeben – es ist weg bevor man es sieht", "Es ist gesetzlich für Arbeitnehmer vorgeschrieben", "Banken vergeben Rabatte für automatische Sparer"], richtig: 1 }
      ]
    },
    {
      id: 307,
      titel: "Inflation – warum Sparen allein nicht reicht",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Was bedeutet eine Inflationsrate von 3 %?", antworten: ["Gehälter steigen im Schnitt um 3 %", "Preise steigen um 3 % – die Kaufkraft des Geldes sinkt", "Zinsen steigen automatisch um 3 %", "Steuern erhöhen sich um 3 %"], richtig: 1 },
        { text: "10.000 € bei 2 % Inflation – was sind sie in 10 Jahren noch wert?", antworten: ["12.190 € (mit Wertzuwachs)", "10.000 € (keine Änderung)", "~8.200 € (Kaufkraftverlust)", "~6.000 € (zu stark gefallen)"], richtig: 2 },
        { text: "Was besagt die 'Rule of 70' bei Inflation?", antworten: ["Man braucht 70 % seines Einkommens zum Leben", "70 geteilt durch die Inflationsrate ergibt die Jahre bis zur Halbierung der Kaufkraft", "70 % des Vermögens sollten investiert sein", "Inflationsraten über 70 % sind hyperinflationär"], richtig: 1 }
      ]
    },
    {
      id: 308,
      titel: "Dein persönlicher Finanzplan",
      typ: "cards",
      xp: 35,
      fragen: [
        { text: "Was ist die erste Priorität beim Aufbau eines Finanzplans?", antworten: ["Sofort in ETFs investieren für maximale Rendite", "Langfristige Sparziele formulieren", "Notgroschen aufbauen – das finanzielle Sicherheitsnetz zuerst", "Hochzinsschulden abzahlen"], richtig: 2 },
        { text: "In welcher Reihenfolge sollte man finanziell vorgehen?", antworten: ["Investieren → Notgroschen → Schulden", "Notgroschen → Hochzinsschulden abbauen → Langfristig investieren", "Schulden → Sparen → Viel später investieren", "Reihenfolge ist egal – Hauptsache anfangen"], richtig: 1 },
        { text: "Lisa: 300 €/Monat frei, 2.000 € Schulden bei 15 %, noch kein Notgroschen. Optimale Strategie?", antworten: ["Alle 300 € sofort in ETF investieren", "Alle 300 € auf die Schulden, Notgroschen danach", "100 € Notgroschen + 200 € Schulden bis 3 Monate abgedeckt – dann alles auf Schulden", "Schulden ignorieren und langfristig denken"], richtig: 2 }
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
    },
    {
      id: 604,
      titel: "Girokonto optimieren – bis zu 150 € im Jahr sparen",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Was kostet ein typisches kostenpflichtiges Girokonto einer Filialbank pro Jahr?", antworten: ["10–20 € (kaum relevant)", "60–120 € (Standardbereich)", "200–400 € (sehr teuer)", "Girokonten sind immer kostenlos"], richtig: 1 },
        { text: "Was ist bei 'kostenlosen' Konten oft zu beachten?", antworten: ["Es gibt keine Leistungen", "Oft ist monatlicher Geldeingang oder Aktivnutzung Voraussetzung", "Sie sind unsicherer als kostenpflichtige", "Zinsen werden grundsätzlich nicht gezahlt"], richtig: 1 },
        { text: "Max zahlt 7,90 €/Monat für sein Girokonto. Wie viel spart er über 10 Jahre durch Wechsel zu kostenlosem Konto?", antworten: ["ca. 240 €", "ca. 948 €", "ca. 1.500 €", "Keine Ersparnis – Leistungen fehlen"], richtig: 1 }
      ]
    },
    {
      id: 605,
      titel: "Kreditkarten: Fluch oder Segen?",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Was ist das Kernproblem der Kreditkarten-Zinsfalle?", antworten: ["Kreditkarten haben zu hohe Jahresgebühren", "Wer nur die Mindestrate zahlt, trägt die Schulden jahrelang – mit bis zu 20 % Zinsen", "Kreditkarten werden regelmäßig gesperrt", "Zinsen fallen erst nach einem Monat an"], richtig: 1 },
        { text: "Wann sind Kreditkarten wirklich sinnvoll?", antworten: ["Immer – für alle Alltagskäufe", "Für Ausland, Reiseversicherungen und Cashback – wenn der Saldo monatlich vollständig beglichen wird", "Nur für sehr große Anschaffungen", "Kreditkarten sind grundsätzlich nie sinnvoll"], richtig: 1 },
        { text: "Schuld: 2.000 € bei 20 % Zinsen, nur Mindestrate 2 %. Wie lange bis vollständig abbezahlt?", antworten: ["~2 Jahre (schnell erledigt)", "~8 Jahre (mittlerer Zeitraum)", "~16 Jahre (erschreckend lang)", "~25 Jahre (fast nie abbezahlt)"], richtig: 2 }
      ]
    },
    {
      id: 606,
      titel: "SCHUFA verstehen und deinen Score schützen",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Was ist die SCHUFA?", antworten: ["Eine staatliche Behörde die Kreditvergabe regelt", "Eine private Auskunftei die Kreditwürdigkeitsdaten von Verbrauchern speichert", "Eine Versicherung für Kreditausfälle", "Ein Inkassounternehmen"], richtig: 1 },
        { text: "Was schadet dem SCHUFA-Score am stärksten?", antworten: ["Viele verschiedene Bankkonten haben", "Viele Kreditanfragen in kurzer Zeit und Zahlungsausfälle", "Regelmäßige hohe Gehaltseingänge", "Lange bestehende Kontohistorie"], richtig: 1 },
        { text: "Wie oft kann man die kostenlose SCHUFA-Selbstauskunft (§34 BDSG) beantragen?", antworten: ["Einmalig im Leben kostenlos", "Einmal pro Jahr kostenlos (Datenkopie nach Art. 15 DSGVO)", "Unbegrenzt kostenlos und sofort", "Nur über die eigene Hausbank"], richtig: 1 }
      ]
    },
    {
      id: 607,
      titel: "Zinsen verstehen – wie Banken Geld verdienen",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Was ist der effektive Jahreszins?", antworten: ["Der monatliche Zinssatz einfach mal 12 gerechnet", "Der tatsächliche Jahreszins inklusive aller Kosten und Zinseszins-Effekte", "Der Zinssatz ohne Nebenkosten (Nominalzins)", "Der staatlich vorgeschriebene Basiszinssatz"], richtig: 1 },
        { text: "Was bedeutet Zinseszins beim Kredit?", antworten: ["Man zahlt Zinsen zweimal", "Auf die aufgelaufenen (nicht gezahlten) Zinsen werden weitere Zinsen berechnet – exponentielle Last", "Zwei verschiedene Zinssätze gleichzeitig aktiv", "Zinsen nur einmal zu Beginn"], richtig: 1 },
        { text: "Kredit: 10.000 € bei 8 % p.a. über 5 Jahre (Annuität). Gesamtkosten ca.:", antworten: ["10.800 € (1 Jahr Zinsen)", "11.600 € (mittlere Schätzung)", "12.160 € (korrekter Annuitätswert)", "14.000 € (zu hoch geschätzt)"], richtig: 2 }
      ]
    },
    {
      id: 608,
      titel: "ETF-Depot eröffnen: Schritt für Schritt",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Was ist der allererste Schritt beim Depot eröffnen?", antworten: ["Sofort ETFs kaufen – danach eröffnen", "Broker vergleichen und dann Konto mit Freistellungsauftrag eröffnen", "Finanzberater beauftragen", "Mindestens 10.000 € ansparen"], richtig: 1 },
        { text: "Was ist ein Freistellungsauftrag beim Depot?", antworten: ["Eine Steuererklärung die jährlich eingereicht wird", "Ein Auftrag an die Depotbank, Kapitalerträge bis 1.000 € automatisch steuerfrei zu stellen", "Eine Gebührenbefreiung für Neukunden", "Ein staatlich gewährter Förderauftrag für Sparer"], richtig: 1 },
        { text: "Welches Dokument braucht man für die Depot-Eröffnung NICHT?", antworten: ["Personalausweis für Video- oder Post-Ident", "Steuerliche Identifikationsnummer", "Einkommensnachweis / Gehaltsabrechnung", "Bankverbindung (IBAN) für Einzahlungen"], richtig: 2 }
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
    },
    {
      id: 704,
      titel: "Steuererklärung selbst machen – 1.000 € zurückholen",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Was ist die durchschnittliche Steuererstattung in Deutschland?", antworten: ["ca. 230 € (kaum der Aufwand)", "ca. 540 € (mittlerer Betrag)", "ca. 1.072 € (tatsächlicher Durchschnitt)", "ca. 2.500 € (übertrieben hoch)"], richtig: 2 },
        { text: "Wie lange kann man die freiwillige Steuererklärung rückwirkend abgeben?", antworten: ["Nur für das laufende Jahr", "1 Jahr rückwirkend", "4 Jahre rückwirkend (Verjährungsfrist)", "Unbegrenzt rückwirkend"], richtig: 2 },
        { text: "Was ist ELSTER?", antworten: ["Eine Steuersoftware-Firma die Beratung anbietet", "Das kostenlose Online-Portal des Finanzamts für digitale Steuererklärungen", "Ein Steuerberater-Netzwerk für Arbeitnehmer", "Eine Versicherung gegen Steuernachzahlungen"], richtig: 1 }
      ]
    },
    {
      id: 705,
      titel: "Riester & Rürup – lohnt es sich wirklich?",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Für wen lohnt sich Riester am meisten?", antworten: ["Gutverdiener ohne Kinder (hohe Steuerersparnis)", "Geringverdiener mit mehreren Kindern (maximale staatliche Zulagen)", "Selbstständige die kein Angestelltenverhältnis haben", "Alle profitieren gleich viel"], richtig: 1 },
        { text: "Was ist der Hauptunterschied zwischen Riester und Rürup?", antworten: ["Rürup ist für Angestellte, Riester für Selbstständige gedacht", "Riester ist für sozialversicherungspflichtige Arbeitnehmer mit Zulagen; Rürup primär für Selbstständige mit Steuerabzug", "Es gibt keinen relevanten Unterschied", "Rürup hat deutlich höhere staatliche Zulagen"], richtig: 1 },
        { text: "Über 30 Jahre: Riester vs. ETF-Sparplan mit gleichem Beitrag. Was ist richtig?", antworten: ["Riester ist immer besser wegen staatlicher Garantien", "ETF-Sparplan schlägt Riester meist – trotz Förderung – wegen deutlich niedrigerer Kosten und höherer Rendite", "Beide sind über 30 Jahre absolut gleich gut", "Das hängt ausschließlich von den Zulagen ab"], richtig: 1 }
      ]
    },
    {
      id: 706,
      titel: "Betriebliche Altersvorsorge (bAV) nutzen",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Wie viel Zuschuss muss dein Arbeitgeber zur bAV seit 2019 mindestens zahlen?", antworten: ["5 % des umgewandelten Betrags", "10 % des umgewandelten Betrags", "15 % des umgewandelten Betrags", "20 % des umgewandelten Betrags"], richtig: 2 },
        { text: "Was ist der steuerliche Hauptvorteil der bAV für Arbeitnehmer?", antworten: ["Leistungen im Rentenalter sind steuerfrei", "Beiträge kommen aus dem Bruttogehalt – weniger Steuern und Sozialabgaben heute", "Nur der Arbeitgeber profitiert von Steuervorteilen", "Es gibt keine Steuervorteile bei der bAV"], richtig: 1 },
        { text: "Was ist der wichtigste Nachteil der bAV?", antworten: ["Das Kapital ist nicht gesetzlich geschützt", "Im Rentenalter sind Leistungen voll steuerpflichtig und es fallen GKV-Beiträge auf die Auszahlung an", "Der Arbeitgeber muss keinen Zuschuss zahlen", "Beiträge können nicht monatlich angepasst werden"], richtig: 1 }
      ]
    },
    {
      id: 707,
      titel: "Nebeneinkünfte und Steuern – was du melden musst",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Ab wann sind Einkünfte aus Gelegenheitsjobs steuerpflichtig?", antworten: ["Immer ab dem ersten Euro", "Ab 410 €/Jahr (Freigrenze für sonstige Einkünfte nach §23 EStG)", "Erst ab 5.000 €/Jahr", "Gelegenheitsjobs sind immer steuerfrei"], richtig: 1 },
        { text: "Was regelt die Kleinunternehmerregelung (§19 UStG)?", antworten: ["Bis 100.000 € Jahresumsatz keine Umsatzsteuer", "Bis 22.000 € Jahresumsatz muss keine Umsatzsteuer ausgewiesen werden", "Nur für Handwerks- und Gewerbebetriebe gültig", "Komplett keine Steuern unter dieser Grenze"], richtig: 1 },
        { text: "Welche eBay-Verkäufe sind steuerlich relevant?", antworten: ["Alle Verkäufe ab dem ersten Euro sind zu melden", "Privater Verkauf eigener gebrauchter Gegenstände meist steuerfrei; gewerblicher Handel ist steuerpflichtig", "Alle eBay-Verkäufe werden automatisch mit 19 % Umsatzsteuer belastet", "Nur Verkäufe über 500 € müssen gemeldet werden"], richtig: 1 }
      ]
    },
    {
      id: 708,
      titel: "Steueroptimierung für Investoren",
      typ: "cards",
      xp: 35,
      fragen: [
        { text: "Was ist Tax-Loss-Harvesting?", antworten: ["Verluste vor dem Finanzamt verbergen", "Verluste im Depot bewusst realisieren um sie mit Gewinnen zu verrechnen und Steuern zu sparen", "Gewinne in Buchverluste umwandeln", "Sondersteuer auf realisierte Verluste"], richtig: 1 },
        { text: "Wie verteilt man den Freistellungsauftrag (1.000 €) optimal?", antworten: ["Immer den vollen Betrag bei einer einzigen Bank", "Auf verschiedene Depots und Konten aufteilen – je nach erwartetem jährlichem Ertrag", "Nur beim Girokonto stellen, nicht beim Depot", "Nie stellen – die Bank macht das automatisch"], richtig: 1 },
        { text: "Was ist die Günstigerprüfung bei der Steuererklärung?", antworten: ["Günstigsten ETF im Depot finden und halten", "Das Finanzamt prüft ob der persönliche Steuersatz unter 25 % liegt – dann gilt dieser statt Abgeltungssteuer", "Günstigsten Broker für das nächste Jahr wählen", "Günstigste Versicherungsprodukte vergleichen"], richtig: 1 }
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
    },
    {
      id: 803,
      titel: "REITs – in Immobilien investieren ohne eigene Wohnung",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Was ist ein REIT (Real Estate Investment Trust)?", antworten: ["Eine Immobilienverwaltungsfirma die Wohnungen kauft", "Ein börsengehandelter Fonds der Immobilien hält und 90 %+ der Gewinne ausschüttet", "Ein Hypothekenvertrag mit Immobilienbesicherung", "Eine staatliche Wohnbaugesellschaft"], richtig: 1 },
        { text: "Was ist der entscheidende Vorteil von REITs gegenüber direkten Immobilien?", antworten: ["REITs zahlen keine Steuern auf Gewinne", "Liquidität – man kann börsentäglich kaufen und verkaufen, ab wenigen Euro", "REITs erzielen immer höhere Renditen als direkte Immobilien", "REITs tragen kein Marktrisiko"], richtig: 1 },
        { text: "Wie werden REIT-Ausschüttungen in Deutschland steuerlich behandelt?", antworten: ["Vollständig steuerfrei als Immobilienerträge", "Mit Abgeltungssteuer (26,375 %) wie normale Dividenden", "Mit einem speziellen REIT-Steuersatz von 15 %", "REITs fallen nicht unter das deutsche Steuerrecht"], richtig: 1 }
      ]
    },
    {
      id: 804,
      titel: "Eigenkapital für den Immobilienkauf aufbauen",
      typ: "cards",
      xp: 35,
      fragen: [
        { text: "Wie viel Eigenkapital sollte man für einen Immobilienkauf mindestens ansparen?", antworten: ["5 % des Kaufpreises reichen aus", "20 % Kaufpreis + Kaufnebenkosten (~10 %) = mind. 30 % gesamt", "50 % des Kaufpreises für gute Konditionen", "Eigenkapital ist bei guter Bonität nicht notwendig"], richtig: 1 },
        { text: "Was gehört zu den typischen Kaufnebenkosten in Deutschland?", antworten: ["Nur die Maklergebühr (ca. 3 %)", "Grunderwerbsteuer + Notar + Makler = 5–15 % je nach Bundesland", "Keine Nebenkosten bei Neubauten direkt vom Bauträger", "Nur die Notargebühr (ca. 1 %)"], richtig: 1 },
        { text: "Familie will 300.000 € Wohnung kaufen, braucht 30 % EK (90.000 €), spart 800 €/Monat. Wie viele Jahre?", antworten: ["ca. 5,6 Jahre", "ca. 7,8 Jahre", "ca. 9,4 Jahre", "ca. 12 Jahre"], richtig: 2 }
      ]
    },
    {
      id: 805,
      titel: "Vermietung als Einkommensquelle verstehen",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Wie berechnet man die Bruttomietrendite?", antworten: ["Nettomiete minus alle Kosten durch Kaufpreis", "(Jahres-Kaltmiete / Kaufpreis) × 100", "Gewinn nach Steuern und Finanzierungskosten", "Mieteinnahmen minus Hypothekenzahlung"], richtig: 1 },
        { text: "Was gilt als akzeptable Nettomietrendite bei Vermietungsobjekten?", antworten: ["Unter 2 % – da Immobilien wertstabil sind", "3–5 % nach allen laufenden Kosten und Rücklagen", "10–15 % in guten Lagen normal", "Mietrendite ist irrelevant – nur Wertsteigerung zählt"], richtig: 1 },
        { text: "Was ist das oft unterschätzte Hauptrisiko bei Vermietung?", antworten: ["Zu hohe Mietpreise gefährden das Objekt", "Kombination aus Mietausfall, unerwarteten Instandhaltungskosten und längeren Leerstandsphasen", "Behördliche Registrierungspflichten", "Zu niedrige steuerliche Abschreibung"], richtig: 1 }
      ]
    },
    {
      id: 806,
      titel: "Immobilien-ETFs und Crowdinvesting",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Was ist ein REIT-ETF?", antworten: ["Ein einzelner REIT mit breiter Diversifikation", "Ein ETF der viele REITs bündelt – diversifiziert über Länder und Immobiliensektoren", "Ein Hypothekenfonds der Staatsanleihen hält", "Ein Fonds speziell für Neubauten"], richtig: 1 },
        { text: "Was ist Immobilien-Crowdinvesting?", antworten: ["Viele Leute kaufen gemeinsam eine Wohnung zu gleichen Teilen", "Viele Kleinanleger finanzieren gemeinsam ein Immobilienprojekt gegen feste Zinsen", "Ein staatliches Förderprogramm für Wohnungsbau", "Immobilien werden über Social Media gehandelt"], richtig: 1 },
        { text: "Was eignet sich für einen Einsteiger mit 100 €/Monat für Immobilien-Exposure am besten?", antworten: ["Direktkauf einer Wohnung auf Kredit", "REIT-ETF Sparplan – diversifiziert, täglich handelbar, ab 1 €", "Crowdinvesting wegen garantiert höherer Rendite", "Festgeld mit Immobilien-Bezug"], richtig: 1 }
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
    },
    {
      id: 903,
      titel: "GKV vs. PKV – die richtige Krankenversicherung",
      typ: "cards",
      xp: 30,
      fragen: [
        { text: "Ab wann kann man als Angestellter in die PKV wechseln?", antworten: ["Immer wenn man es möchte", "Ab einem Jahresbruttoeinkommen über der Versicherungspflichtgrenze (2024: ~69.300 €)", "Ab dem 40. Lebensjahr", "Nur Selbstständige und Beamte dürfen PKV wählen"], richtig: 1 },
        { text: "Was ist das zentrale langfristige Risiko der PKV?", antworten: ["Schlechtere medizinische Leistungen im Alter", "Steigende Beiträge bei sinkenden Einkünften – besonders in Rente ohne Arbeitgeberzuschuss", "PKV wird im Alter günstiger als GKV", "Kein langfristiges Risiko bei guter Gesundheit"], richtig: 1 },
        { text: "Was haben GKV und PKV im direkten Vergleich gemeinsam?", antworten: ["Exakt gleiche monatliche Beiträge", "Beide gewähren gesetzlich gesicherte medizinische Mindestversorgung in Deutschland", "Identische Leistungspakete für alle Versicherten", "Gleiches Beitragsmodell unabhängig von Einkommen"], richtig: 1 }
      ]
    },
    {
      id: 904,
      titel: "Die Rentenlücke – was wirklich auf dich zukommt",
      typ: "cards",
      xp: 35,
      fragen: [
        { text: "Wie hoch ist das gesetzliche Rentenniveau in Deutschland (2024)?", antworten: ["70 % des letzten Bruttogehalts – ausreichend", "48 % des Bruttogehalts – vor Steuern und Krankenversicherung", "60 % des Nettogehalts – nach Abzügen", "Volle Absicherung des gewohnten Lebensstandards"], richtig: 1 },
        { text: "Was versteht man unter der 'Rentenlücke'?", antworten: ["Die Summe aller fehlenden Rentenbeitragsjahre", "Die monatliche Differenz zwischen dem benötigten Lebensstandard und der tatsächlich erwarteten Rente", "Die steuerliche Behandlung von Renteneinkünften", "Rente minus Krankenversicherungsbeiträge"], richtig: 1 },
        { text: "Max, 30 J., 3.000 € netto. Erwartet 1.200 € Rente. 1.800 € Lücke/Monat. Benötigtes Kapital über 20 Rentenjahre?", antworten: ["216.000 € (10 J. Lücke)", "320.000 € (Schätzwert)", "432.000 € (20 J. × 12 × 1.800 €)", "650.000 € (zu hoch)"], richtig: 2 }
      ]
    },
    {
      id: 905,
      titel: "Versicherungen kündigen und sinnvoll wechseln",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Wie viel überzahlen Deutsche Versicherungen jährlich im Durchschnitt?", antworten: ["ca. 50 € – kaum relevant", "ca. 150 € – leichte Überzahlung", "ca. 400 € – signifikante Summe", "ca. 1.000 € – dramatische Überzahlung"], richtig: 2 },
        { text: "In welchen Situationen hat man ein Sonderkündigungsrecht?", antworten: ["Jederzeit ohne Angabe von Gründen", "Bei Beitragserhöhung durch den Versicherer oder nach einem regulierten Schadenfall", "Nur zum regulären Jahresende zum 31.12.", "Ein Sonderkündigungsrecht existiert rechtlich nicht"], richtig: 1 },
        { text: "Was ist beim Versicherungsvergleich am wichtigsten?", antworten: ["Immer den absolut günstigsten Preis wählen", "Zuerst Leistungsumfang und Ausschlüsse prüfen – dann Preis vergleichen", "Nur den Markennamen des Anbieters berücksichtigen", "Der Werbung vertrauen und empfohlene Produkte nehmen"], richtig: 1 }
      ]
    },
    {
      id: 906,
      titel: "5 Versicherungen die du jetzt kündigen kannst",
      typ: "cards",
      xp: 25,
      fragen: [
        { text: "Welche Versicherung ist in fast allen Fällen überflüssig und teuer?", antworten: ["Private Haftpflichtversicherung", "Handyversicherung (Selbst ansparen ist günstiger)", "Berufsunfähigkeitsversicherung", "Hausratversicherung"], richtig: 1 },
        { text: "Warum ist die Restschuldversicherung oft eine schlechte Wahl?", antworten: ["Sie ist zu günstig und deckt zu wenig", "Extrem hohe Kosten, schlechte Bedingungen – eine Risikolebensversicherung ist fast immer die bessere Alternative", "Sie zahlt immer zuverlässig", "Nur für sehr ältere Kreditnehmer relevant"], richtig: 1 },
        { text: "Wann kann eine Reiserücktrittsversicherung ausnahmsweise sinnvoll sein?", antworten: ["Sie ist grundsätzlich nie sinnvoll", "Bei teuren, nicht stornierbaren Reisen ab ~1.000 € mit relevanten Vorerkrankungen oder besonders flexibler Buchung", "Immer bei jeder Auslandsreise", "Ausschließlich bei Kreuzfahrten und Langstreckenflügen"], richtig: 1 }
      ]
    }
  ]
}
