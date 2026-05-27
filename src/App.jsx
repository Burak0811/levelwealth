import { useState, useEffect, useRef, Component } from "react"
import "./App.css"
import EmailSubscribe from "./EmailSubscribe.jsx"
import {
  HomeIcon, QuestIcon, ProfilIcon, RanglisteIcon,
  ETFIcon, AktienIcon, KryptoIcon, BudgetIcon, BankingIcon, SteuernIcon, ImmobilienIcon, VersicherungIcon,
  LernenIcon, NewsIcon, RechnerIcon, ChallengesIcon,
  CheckIcon, XCircleIcon, LockIcon, ArrowRightIcon, ArrowLeftIcon,
  FlameIcon, StarIcon, BoltIcon, TrophyIcon, KatIcon,
} from "./icons.jsx"

import { kategorien, hauptkategorien, LERNPLAN_ZIELE, AKTIONSPLAN_DATEN, AKTIONSPLAN_TRIGGER, dailyQuests, lernpfad } from "./lernpfadData.js"
import FinanzAssistent from "./FinanzAssistent.jsx"

// ─── Sound System ────────────────────────────────────────────────────────────

function playSound(type) {
  if (localStorage.getItem("soundEnabled") !== "true") return
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    if (type === "richtig") {
      const freqs = [523, 659, 784]
      freqs.forEach((f, i) => {
        const o = ctx.createOscillator(); const g = ctx.createGain()
        o.connect(g); g.connect(ctx.destination)
        o.frequency.value = f
        g.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.35)
        o.start(ctx.currentTime + i * 0.1); o.stop(ctx.currentTime + i * 0.1 + 0.35)
      })
    } else if (type === "falsch") {
      const o = ctx.createOscillator()
      o.connect(gain); o.frequency.value = 196
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
      o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.35)
    } else if (type === "xp") {
      const o = ctx.createOscillator()
      o.connect(gain); o.frequency.value = 880
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
      o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.18)
    } else if (type === "levelup") {
      [523, 659, 784, 1047].forEach((f, i) => {
        const o = ctx.createOscillator(); const g = ctx.createGain()
        o.connect(g); g.connect(ctx.destination)
        o.frequency.value = f; o.type = "sine"
        g.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.45)
        o.start(ctx.currentTime + i * 0.1); o.stop(ctx.currentTime + i * 0.1 + 0.45)
      })
    }
  } catch {}
}

// Pre-computed confetti positions for LevelUpModal (deterministic)
const CONFETTI = Array.from({ length: 20 }, (_, i) => ({
  cx: `${((i * 53 + 11) % 280) - 140}px`,
  cc: ["#7C3AED","#9D174D","#EAB308","#10B981","#3B82F6"][i % 5],
  cd: `${0.7 + (i % 4) * 0.12}s`,
  cdelay: `${i * 0.04}s`,
}))

// ─── XP & Level System ───────────────────────────────────────────────────────

const LEVEL_XP = [0, 100, 250, 450, 700, 1000, 1350, 1700, 2050, 2400, 2750, 3250, 3750, 4250, 4750, 5250, 6000, 6750, 7500, 8250, 9000]

const LEVEL_NAMEN = [
  "", "Finanz-Neuling", "Sparfuchs", "ETF-Entdecker", "Markt-Beobachter",
  "Aktien-Kenner", "Dividenden-Sammler", "Portfolio-Builder", "Krypto-Neugieriger",
  "Steuer-Optimierer", "Vermögens-Planer", "Investment-Stratege", "Markt-Analyst",
  "Finanz-Architekt", "Alpha-Sucher", "Risk-Manager", "Portfolio-Profi",
  "Wealth-Builder", "Finanz-Mentor", "Investment-Experte", "Lumio Master",
]

const LEVEL_ICONS = [
  "", "🌱", "🦊", "🔭", "👀", "📊", "💰", "🏗️", "₿", "📋", "🎯",
  "⚡", "🔬", "🏛️", "🚀", "🛡️", "💼", "🏆", "🎓", "💎", "👑",
]

const TIPPS = {
  einsteiger: [
    "Selbst 50 €/Monat werden in 20 Jahren zu über 26.000 € – Zinseszins macht's möglich.",
    "Ein ETF-Sparplan ab 1 € ist bereits bei Trade Republic möglich – einfach anfangen.",
    "Das größte Investitionsrisiko ist, gar nicht zu investieren. Inflation frisst dein Geld.",
    "Diversifikation = nicht alles auf eine Karte. ETFs machen das automatisch für dich.",
    "Der Cost-Averaging-Effekt: Regelmäßig sparen schlägt fast immer den 'perfekten Einstieg'.",
    "Freistellungsauftrag vergessen? Dann verschenkst du 1.000 € Steuerfreibetrag pro Jahr.",
    "Tagesgeld schlägt Girokonto – 3 % Zinsen sind besser als 0 %. Kleines Upgrade, großer Effekt.",
  ],
  mittel: [
    "Der MSCI World hat seit 1970 keine einzige 15-Jahres-Periode mit Verlust beendet.",
    "Thesaurierend vs. ausschüttend: Über 30 Jahre kann der Unterschied 40.000 €+ ausmachen.",
    "Rebalancing einmal pro Jahr reicht – häufiger kostet durch Steuern und Transaktionskosten.",
    "70/30-Portfolio: 70 % MSCI World + 30 % Emerging Markets – bewährt seit Jahrzehnten.",
    "Tracking Difference statt TER: Manche ETFs performen besser als ihr eigener Index.",
    "Sparerpauschbetrag 2024: 1.000 € (Single) – stelle den Freistellungsauftrag und nutze ihn.",
    "Wertpapierleihe erklärt, warum manche ETFs 'negative Kosten' haben – kein Fehler, ein Feature.",
  ],
  profi: [
    "Factor Investing: Value-Aktien haben historisch Large Caps um 3–4 % p.a. übertroffen.",
    "Tax-Loss-Harvesting: Verluste realisieren um Gewinne steuerlich zu verrechnen – legal & wirksam.",
    "Momentum-Faktor: Aktien die 12 Monate outperformt haben, tendieren zur weiteren Outperformance.",
    "Small Cap Value hat historisch die stärkste risikoadjustierte Rendite aller Faktor-Prämien.",
    "CAPE-Ratio (Shiller-KGV): Bei Werten über 30 war die folgende 10-Jahres-Rendite oft enttäuschend.",
    "Barbell-Strategie: 90 % sichere Assets + 10 % hochspekulative – risikobegrenztes Upside.",
    "Core-Satellite: 80 % passive Index-ETFs + 20 % aktive Einzelaktien – das Beste beider Welten.",
  ],
}

const ACHIEVEMENTS_DEF = [
  { id: "erster_tag",       name: "Erster Tag",       icon: "🌅", beschreibung: "App zum ersten Mal geöffnet" },
  { id: "schnellstarter",   name: "Schnellstarter",   icon: "⚡", beschreibung: "3 Lektionen an einem Tag" },
  { id: "nachteuler",       name: "Nachteuler",       icon: "🦉", beschreibung: "Lektion nach 22 Uhr abgeschlossen" },
  { id: "fruehaufsteher",   name: "Frühaufsteher",    icon: "☀️", beschreibung: "Lektion vor 7 Uhr abgeschlossen" },
  { id: "perfektionist",    name: "Perfektionist",    icon: "🎯", beschreibung: "10 Quizze in Folge perfekt" },
  { id: "wissens_marathon", name: "Wissens-Marathon", icon: "🏃", beschreibung: "5 Lektionen an einem Tag" },
  { id: "comeback_kid",     name: "Comeback Kid",     icon: "💪", beschreibung: "Nach 3+ Tagen Pause zurück" },
  { id: "zahlen_nerd",      name: "Zahlen-Nerd",      icon: "🔢", beschreibung: "Rechner 10× benutzt" },
  { id: "news_junkie",      name: "News-Junkie",      icon: "📰", beschreibung: "News 7× geöffnet" },
]

function berechneLevel(xp) {
  let level = 1
  for (let i = 1; i < LEVEL_XP.length; i++) {
    if (xp >= LEVEL_XP[i]) level = i + 1
    else break
  }
  return Math.min(level, 20)
}

function getLevelInfo(xp) {
  const level       = berechneLevel(xp)
  const xpDieses    = LEVEL_XP[level - 1] ?? 0
  const xpNaechstes = LEVEL_XP[level]    ?? LEVEL_XP[LEVEL_XP.length - 1]
  const xpAktuell   = xp - xpDieses
  const xpBenoetigt = xpNaechstes - xpDieses
  const fortschritt = level >= 20 ? 100 : Math.min(Math.round((xpAktuell / xpBenoetigt) * 100), 100)
  return { level, name: LEVEL_NAMEN[level], icon: LEVEL_ICONS[level], xpAktuell, xpBenoetigt, fortschritt }
}

function getStreakDisplay(streak) {
  if (streak <= 0)  return { flammen: "",    label: "Kein Streak", klasse: "" }
  if (streak <= 2)  return { flammen: "🔥",  label: `${streak} ${streak === 1 ? "Tag" : "Tage"}`, klasse: "active" }
  if (streak <= 6)  return { flammen: "🔥🔥", label: `${streak} Tage`, klasse: "active" }
  if (streak <= 13) return { flammen: "🔥🔥🔥", label: `${streak} Tage · Woche erreicht!`, klasse: "active" }
  if (streak <= 29) return { flammen: "⚡", label: `${streak} Tage · ${Math.floor(streak / 7)} Wochen!`, klasse: "active" }
  return { flammen: "💎", label: `${streak} Tage · Monats-Streak!`, klasse: "active" }
}

function getGruss(userName) {
  const h = new Date().getHours()
  const n = userName || "Investor"
  if (h >= 6  && h < 12) return `Guten Morgen, ${n} ☀️`
  if (h >= 12 && h < 18) return `Hey ${n} 👋`
  if (h >= 18 && h < 24) return `Guten Abend, ${n} 🌙`
  return `Du bist spät dran, ${n} 🦉`
}

function getGrussTeile(userName) {
  const h = new Date().getHours()
  const n = userName || "Investor"
  if (h >= 6  && h < 12) return { prefix: "Guten Morgen,", name: `${n} ☀️` }
  if (h >= 12 && h < 18) return { prefix: "Hey,",          name: `${n} 👋` }
  if (h >= 18 && h < 24) return { prefix: "Guten Abend,",  name: `${n} 🌙` }
  return { prefix: "Nacht-Investor,", name: `${n} 🦉` }
}

function getTagestipp(wissenslevel) {
  const tag = new Date().getDay()
  if (wissenslevel >= 4) return TIPPS.profi[tag]
  if (wissenslevel >= 3) return TIPPS.mittel[tag]
  return TIPPS.einsteiger[tag]
}

function getNextStep(abgeschlosseneLektionen, userWissenslevel) {
  if (abgeschlosseneLektionen.length === 0) {
    return { text: "Starte mit ETF Basics", sub: "Deine erste Lektion · ca. 5 Min" }
  }
  const etfLektionen = lernpfad[1] || []
  const etfDone = etfLektionen.filter(l => abgeschlosseneLektionen.includes(l.id))
  if (etfDone.length < etfLektionen.length) {
    const naechste = etfLektionen.find(l => !abgeschlosseneLektionen.includes(l.id))
    return { text: naechste?.titel || "ETF fortsetzen", sub: `ETF · Lektion ${etfDone.length + 1} / ${etfLektionen.length}` }
  }
  if (userWissenslevel >= 4) {
    return { text: "Steuern oder Krypto erkunden", sub: "Fortgeschrittene Themen für dich" }
  }
  return { text: "Aktien oder Budgetierung?", sub: "Wähle deinen nächsten Pfad" }
}

function getBudgetDefault(userFinanzsituation) {
  if (userFinanzsituation === "nichts") return 25
  if (userFinanzsituation === "wenig")  return 30
  if (userFinanzsituation === "mittel") return 100
  if (userFinanzsituation === "viel")   return 250
  return 100
}

function getEmpfohleneKatId(userWissenslevel) {
  if (userWissenslevel >= 4) return 7
  if (userWissenslevel >= 3) return 2
  return 1
}

function getEmpfehlung(abgeschlosseneLektionen, userWissenslevel, userAktuelleSituation) {
  const hatSchulden = (userAktuelleSituation || []).includes("schulden")
  const etfLektionen = lernpfad[1] || []
  const aktienLektionen = lernpfad[2] || []
  const budgetLektionen = lernpfad[5] || []
  const bankingLektionen = lernpfad[6] || []
  const steuernLektionen = lernpfad[7] || []

  const etfKomplett = etfLektionen.length > 0 && etfLektionen.every(l => abgeschlosseneLektionen.includes(l.id))
  const budgetKomplett = budgetLektionen.length > 0 && budgetLektionen.every(l => abgeschlosseneLektionen.includes(l.id))
  const bankingKomplett = bankingLektionen.length > 0 && bankingLektionen.every(l => abgeschlosseneLektionen.includes(l.id))

  if (hatSchulden && !budgetKomplett) {
    return { katId: 5, grund: "Weil du Schulden angegeben hast – Budgetierung hilft dir zuerst" }
  }
  if (etfKomplett && !aktienLektionen.every(l => abgeschlosseneLektionen.includes(l.id))) {
    return { katId: 2, grund: "Weil du ETF Basics abgeschlossen hast" }
  }
  if (budgetKomplett && !bankingKomplett) {
    return { katId: 6, grund: "Weil du Budgetierung abgeschlossen hast" }
  }
  if (bankingKomplett && !steuernLektionen.every(l => abgeschlosseneLektionen.includes(l.id))) {
    return { katId: 7, grund: "Weil du Banking abgeschlossen hast" }
  }
  if ((userWissenslevel || 1) >= 4) {
    return { katId: 4, grund: "Für dein Wissenslevel geeignet" }
  }
  if (etfKomplett) {
    return { katId: 5, grund: "Weil du ETF Basics abgeschlossen hast" }
  }
  return { katId: 1, grund: "Der beste Einstieg ins Investieren" }
}

function getZielText(userZiel) {
  if (userZiel === "etf")    return "Dein Ziel: Ersten ETF-Sparplan starten 📈"
  if (userZiel === "krypto") return "Dein Ziel: Krypto verstehen ₿"
  if (userZiel === "aktien") return "Dein Ziel: Aktien analysieren 📊"
  return "Dein Ziel: Finanzwissen aufbauen 🧠"
}

function getPersonalizedGreeting(userName, onboardingDate, abgeschlosseneLektionen) {
  const name  = userName || "Investor"
  const heute = getHeute()
  const diffDays = onboardingDate
    ? Math.floor((new Date(heute) - new Date(onboardingDate)) / 86400000)
    : 0
  if (abgeschlosseneLektionen.length > 0) {
    const firstId = abgeschlosseneLektionen[0]
    const firstKat = kategorien.find(k => (lernpfad[k.id] || []).some(l => l.id === firstId))
    if (firstKat) return `Gut gemacht ${name}, du hast ${firstKat.name} begonnen`
  }
  if (diffDays < 4) return `Willkommen bei Lumio, ${name}!`
  return `${name}, du bist seit ${diffDays} Tagen dabei`
}

function getHeute() {
  return new Date().toISOString().split("T")[0]
}

function safeLocalStorage(key, value) {
  try {
    if (value !== undefined) { localStorage.setItem(key, value); return value }
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function Skeleton({ width = "100%", height = 18, borderRadius = 10, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, flexShrink: 0, ...style }}
    />
  )
}

class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <p>😕 Etwas ist schiefgelaufen.</p>
          <button onClick={() => window.location.reload()}>Neu laden</button>
        </div>
      )
    }
    return this.props.children
  }
}

async function navigatorTeilen(text) {
  if (navigator.share) {
    try { await navigator.share({ text }); return true } catch {}
  }
  if (navigator.clipboard) {
    try { await navigator.clipboard.writeText(text); return true } catch {}
  }
  return false
}

function OnboardingFlow({ onComplete }) {
  const [screen, setScreen]                       = useState(0)
  const [name, setName]                           = useState("")
  const [alter, setAlter]                         = useState(null)
  const [lebenssituation, setLebenssituation]     = useState(null)
  const [finanzsituationToggle, setFinSitToggle]  = useState([])
  const [budget, setBudget]                       = useState(50)
  const [wissenslevel, setWissenslevel]           = useState(null)
  const [splashDone, setSplashDone]               = useState(false)
  const [planCount, setPlanCount]                 = useState(0)
  const slideRef                                  = useRef(null)

  const TOTAL_SCREENS = 8

  const r20 = 0.07 / 12
  const n20 = 20 * 12
  const projection = Math.round(budget * ((Math.pow(1 + r20, n20) - 1) / r20))
  const eingezahlt20 = budget * n20
  const eingezahltPct20 = projection > 0 ? Math.min(98, Math.round((eingezahlt20 / projection) * 100)) : 50
  const multiplier20 = projection > 0 && eingezahlt20 > 0 ? (projection / eingezahlt20).toFixed(1) : "?"

  function getBudgetKontext(bud) {
    if (bud <= 25)  return "💡 Entspricht einem Kaffee pro Tag"
    if (bud <= 50)  return "📱 Weniger als ein Handyvertrag pro Monat"
    if (bud <= 100) return "🎬 Ein Streaming-Abo im Monat"
    if (bud <= 150) return "🍕 Zwei Restaurantbesuche weniger"
    if (bud <= 200) return "🚇 Dein Nahverkehrsticket im Monat"
    return "🚀 Starkes Fundament für deine Zukunft"
  }

  const lernplanSchritte = {
    1: ["Was ist ein ETF? – und warum er dein bester Freund ist", "Zinseszins: Die mächtigste Kraft beim Investieren", "Deinen ersten Sparplan einrichten – Schritt für Schritt"],
    2: ["Inflation bekämpfen – warum Geld auf dem Konto schrumpft", "ETF Basics – ohne Vorkenntnisse loslegen", "Budgetierung: Dein Finanzfundament legen"],
    3: ["ETF vs. Aktien – was passt zu dir?", "Portfolio-Aufbau: Diversifikation verstehen", "Steuern auf Kapitalerträge legal minimieren"],
    4: ["Tax-Loss-Harvesting optimieren", "Faktoren-ETFs & Smart Beta erklärt", "Portfoliooptimierung mit modernem Ansatz"],
    5: ["Erweiterte Steuerstrategien für Profis", "Hebel & Optionen verstehen", "Vollständige Portfolioanalyse & Rebalancing"],
  }

  useEffect(() => {
    if (screen !== 7) return
    setPlanCount(0)
    let current = 0
    const steps = 60
    const increment = projection / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= projection) { setPlanCount(projection); clearInterval(timer) }
      else setPlanCount(Math.round(current))
    }, 1600 / steps)
    return () => clearInterval(timer)
  }, [screen, projection])

  useEffect(() => {
    if (screen !== 0) return
    const t = setTimeout(() => { setSplashDone(true); setScreen(1) }, 2200)
    return () => clearTimeout(t)
  }, [screen])

  function goTo(s) {
    setScreen(s)
  }

  function toggleFinSit(id) {
    setFinSitToggle(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function deriveFinanzsituation(bud) {
    if (bud <= 25) return "nichts"
    if (bud <= 80) return "wenig"
    if (bud <= 200) return "mittel"
    return "viel"
  }

  function abschliessen() {
    const finalName = name.trim() || "Investor"
    const finalWissen = wissenslevel || 1
    const startXP = (finalWissen - 1) * 25
    const finanzsituation = deriveFinanzsituation(budget)
    if (!localStorage.getItem("onboardingDate")) {
      localStorage.setItem("onboardingDate", getHeute())
    }
    localStorage.setItem("onboardingComplete", "true")
    localStorage.setItem("userName", finalName)
    localStorage.setItem("userZiel", "etf")
    localStorage.setItem("userAlter", alter || "")
    localStorage.setItem("userLebenssituation", lebenssituation || "")
    localStorage.setItem("userFinanzsituation", finanzsituation)
    localStorage.setItem("userAktuelleSituation", JSON.stringify(finanzsituationToggle))
    localStorage.setItem("userWissenslevel", String(finalWissen))
    onComplete(startXP, finalName)
  }

  const alterOptionen = [
    { id: "unter18", label: "Unter 18",  icon: "🌱" },
    { id: "18-24",   label: "18 – 24",   icon: "⚡" },
    { id: "25-34",   label: "25 – 34",   icon: "🚀" },
    { id: "35plus",  label: "35+",        icon: "💎" },
  ]

  const lebensOptionen = [
    { id: "schueler",         icon: "🎓", titel: "Schüler / Student",  sub: "In Ausbildung oder Studium" },
    { id: "berufseinsteiger", icon: "💼", titel: "Berufseinstieg",      sub: "Frisch im Job" },
    { id: "berufstaetig",     icon: "🏢", titel: "Berufstätig",         sub: "Regelmäßiges Einkommen" },
    { id: "selbststaendig",   icon: "🚀", titel: "Selbstständig",       sub: "Eigenes Business" },
  ]

  const finSitOptionen = [
    { id: "schulden",    icon: "💳", label: "Schulden" },
    { id: "ersparnisse", icon: "🏦", label: "Geld auf Konto" },
    { id: "investiert",  icon: "📊", label: "Bereits investiert" },
    { id: "null",        icon: "🎯", label: "Fange bei null an" },
  ]

  const wissensLabels = ["Keine Ahnung", "Basics", "Etwas", "Gut", "Experte"]
  const schritte = lernplanSchritte[wissenslevel || 1] || lernplanSchritte[1]

  const sliderBgOb = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100
    return `linear-gradient(to right, #7C3AED ${pct}%, #2a2040 ${pct}%)`
  }

  return (
    <div className="ob-new-wrap">
      <div
        className="ob-slides"
        ref={slideRef}
        style={{ transform: `translateX(-${screen * 100}%)` }}
      >

        {/* ── Screen 0: Splash ── */}
        <div className="ob-slide ob-slide-splash">
          <div className={`ob-splash-logo ${splashDone ? "ob-splash-logo-done" : ""}`}>
            <span className="ob-splash-emoji">💡</span>
            <span className="ob-splash-brand">LUMIO</span>
          </div>
          <p className="ob-splash-tagline">Dein Weg zur finanziellen Freiheit.</p>
        </div>

        {/* ── Screen 1: Name ── */}
        <div className="ob-slide ob-slide-inner">
          <div className="ob-slide-top">
            <div className="ob-new-progress">
              <div className="ob-new-progress-fill" style={{ width: `${(1 / 7) * 100}%` }} />
            </div>
          </div>
          <div className="ob-name-content">
            <h1 className="ob-name-headline">Wie heißt du?</h1>
            <p className="ob-name-sub">Wir personalisieren dein Erlebnis.</p>
            <input
              className="ob-name-input"
              type="text"
              placeholder="Dein Vorname..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={30}
              autoFocus
            />
            <button
              className={`ob-name-btn ${name.length >= 2 ? "ob-name-btn-visible" : ""}`}
              disabled={name.length < 2}
              onClick={() => goTo(2)}
            >
              Weiter →
            </button>
          </div>
        </div>

        {/* ── Screen 2: Alter ── */}
        <div className="ob-slide ob-slide-inner">
          <div className="ob-slide-top">
            <button className="ob-new-back" onClick={() => goTo(1)}>←</button>
            <div className="ob-new-progress">
              <div className="ob-new-progress-fill" style={{ width: `${(2 / 7) * 100}%` }} />
            </div>
          </div>
          <h2 className="ob-new-headline">Wie alt bist du?</h2>
          <p className="ob-new-sub">Wir passen deine Risikoempfehlung an.</p>
          <div className="ob-alter-cards">
            {alterOptionen.map(a => (
              <div
                key={a.id}
                className={`ob-alter-card ${alter === a.id ? "ob-sel-new" : ""}`}
                onClick={() => setAlter(a.id)}
              >
                <span className="ob-alter-card-icon">{a.icon}</span>
                <span className="ob-alter-card-label">{a.label}</span>
              </div>
            ))}
          </div>
          <button className="ob-new-btn" disabled={!alter} onClick={() => goTo(3)}>Weiter →</button>
        </div>

        {/* ── Screen 3: Lebenssituation ── */}
        <div className="ob-slide ob-slide-inner">
          <div className="ob-slide-top">
            <button className="ob-new-back" onClick={() => goTo(2)}>←</button>
            <div className="ob-new-progress">
              <div className="ob-new-progress-fill" style={{ width: `${(3 / 7) * 100}%` }} />
            </div>
          </div>
          <h2 className="ob-new-headline">Was beschreibt dich?</h2>
          <p className="ob-new-sub">Für eine passende Empfehlung.</p>
          <div className="ob-leben-cards">
            {lebensOptionen.map(l => (
              <div
                key={l.id}
                className={`ob-leben-card ${lebenssituation === l.id ? "ob-sel-new" : ""}`}
                onClick={() => setLebenssituation(l.id)}
              >
                <span className="ob-leben-icon">{l.icon}</span>
                <div className="ob-leben-text">
                  <span className="ob-leben-titel">{l.titel}</span>
                  <span className="ob-leben-sub">{l.sub}</span>
                </div>
                {lebenssituation === l.id && <span className="ob-new-check">✓</span>}
              </div>
            ))}
          </div>
          <button className="ob-new-btn" disabled={!lebenssituation} onClick={() => goTo(4)}>Weiter →</button>
        </div>

        {/* ── Screen 4: Finanzsituation (multi-select) ── */}
        <div className="ob-slide ob-slide-inner">
          <div className="ob-slide-top">
            <button className="ob-new-back" onClick={() => goTo(3)}>←</button>
            <div className="ob-new-progress">
              <div className="ob-new-progress-fill" style={{ width: `${(4 / 7) * 100}%` }} />
            </div>
          </div>
          <h2 className="ob-new-headline">Was trifft auf dich zu?</h2>
          <p className="ob-new-sub">Mehrere Antworten möglich.</p>
          <div className="ob-finanztoggles">
            {finSitOptionen.map(f => (
              <div
                key={f.id}
                className={`ob-finanz-toggle ${finanzsituationToggle.includes(f.id) ? "ob-toggle-aktiv" : ""}`}
                onClick={() => toggleFinSit(f.id)}
              >
                <span className="ob-toggle-icon">{f.icon}</span>
                <span className="ob-toggle-label">{f.label}</span>
              </div>
            ))}
          </div>
          <button className="ob-new-btn" onClick={() => goTo(5)}>Weiter →</button>
        </div>

        {/* ── Screen 5: Budget ── */}
        <div className="ob-slide ob-slide-inner">
          <div className="ob-slide-top">
            <button className="ob-new-back" onClick={() => goTo(4)}>←</button>
            <div className="ob-new-progress">
              <div className="ob-new-progress-fill" style={{ width: `${(5 / 7) * 100}%` }} />
            </div>
          </div>
          <h2 className="ob-new-headline">Wie viel pro Monat?</h2>
          <p className="ob-new-sub">Kein Mindestbetrag – jeder fängt irgendwo an.</p>
          <p className="ob-budget-context">{getBudgetKontext(budget)}</p>
          <div className="ob-budget-giant">{budget} €</div>
          <input
            type="range"
            min={10} max={500} step={5}
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
            className="ob-budget-slider"
            style={{ background: sliderBgOb(budget, 10, 500) }}
          />
          <div className="ob-budget-bars">
            <div className="ob-bb-row">
              <span className="ob-bb-label">Eingezahlt</span>
              <div className="ob-bb-track"><div className="ob-bb-fill ob-bb-eingezahlt" style={{ width: `${eingezahltPct20}%` }} /></div>
              <span className="ob-bb-val">{eingezahlt20.toLocaleString("de-DE")} €</span>
            </div>
            <div className="ob-bb-row">
              <span className="ob-bb-label">Mit Zinseszins</span>
              <div className="ob-bb-track"><div className="ob-bb-fill ob-bb-zinseszins" style={{ width: "100%" }} /></div>
              <span className="ob-bb-val ob-bb-val-hl">{projection.toLocaleString("de-DE")} €</span>
            </div>
          </div>
          <p className="ob-budget-multiplier">Das ist <strong>{multiplier20}×</strong> dein Einsatz · bei 7% p.a.</p>
          <button className="ob-new-btn" onClick={() => goTo(6)}>Weiter →</button>
        </div>

        {/* ── Screen 6: Wissenslevel ── */}
        <div className="ob-slide ob-slide-inner">
          <div className="ob-slide-top">
            <button className="ob-new-back" onClick={() => goTo(5)}>←</button>
            <div className="ob-new-progress">
              <div className="ob-new-progress-fill" style={{ width: `${(6 / 7) * 100}%` }} />
            </div>
          </div>
          <h2 className="ob-new-headline">Dein Wissenslevel</h2>
          <p className="ob-new-sub">Ehrlichkeit hilft uns, dich besser zu begleiten.</p>
          <div className="ob-wissen-circles">
            {[1, 2, 3, 4, 5].map(stufe => (
              <div
                key={stufe}
                className={`ob-wissen-circle ${wissenslevel && wissenslevel >= stufe ? "ob-wc-aktiv" : ""}`}
                onClick={() => setWissenslevel(stufe)}
              >
                {stufe}
              </div>
            ))}
          </div>
          <div className="ob-wissen-labels">
            {wissensLabels.map((l, i) => (
              <span key={i} className={`ob-wc-label ${wissenslevel === i + 1 ? "ob-wc-label-aktiv" : ""}`}>{l}</span>
            ))}
          </div>
          <button
            className="ob-new-btn"
            disabled={!wissenslevel}
            onClick={() => goTo(7)}
          >
            Weiter →
          </button>
        </div>

        {/* ── Screen 7: Personalized Plan ── */}
        <div className="ob-slide ob-slide-inner ob-plan-slide">
          <div className="ob-slide-top">
            <button className="ob-new-back" onClick={() => goTo(6)}>←</button>
          </div>
          <div className="ob-plan-emoji-big">🎉</div>
          <h2 className="ob-plan-name-titel">
            {name.trim() || "Hey du"},<br/>dein Plan ist bereit!
          </h2>
          <div className="ob-plan-count-wrap">
            <p className="ob-plan-count-label">Mit {budget}€/Monat → in 20 Jahren</p>
            <div className="ob-plan-count-zahl">{planCount.toLocaleString("de-DE")} €</div>
          </div>
          <p className="ob-plan-xp-hint">⚡ Du startest mit {((wissenslevel || 1) - 1) * 25} XP</p>
          <div className="ob-plan-new-card">
            <p className="ob-plan-new-label">Deine ersten 3 Schritte</p>
            {schritte.map((s, i) => (
              <div key={i} className="ob-plan-new-row">
                <span className="ob-plan-new-nr">{i + 1}</span>
                <span className="ob-plan-new-text">{s}</span>
              </div>
            ))}
          </div>
          <button className="ob-plan-start-btn" onClick={abschliessen}>
            Jetzt starten 🚀
          </button>
        </div>

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
  lernen:     <LernenIcon    size={28} color="white" strokeWidth={1.5}/>,
  news:       <NewsIcon      size={28} color="white" strokeWidth={1.5}/>,
  rechner:    <RechnerIcon   size={28} color="white" strokeWidth={1.5}/>,
  challenges: <ChallengesIcon size={28} color="white" strokeWidth={1.5}/>,
}

// ─── Challenges System ────────────────────────────────────────────────────────

const WEEKLY_CHALLENGES = [
  { id: "w1", icon: "📚", titel: "Wissensdurst",      beschreibung: "Schließe 3 Lektionen diese Woche ab",        xp: 75,  typ: "lektionen",      ziel: 3 },
  { id: "w2", icon: "⚡", titel: "Quiz-Perfektionist", beschreibung: "Schließe 2 Quizze ohne Fehler ab",           xp: 60,  typ: "perfekt_quizze",  ziel: 2 },
  { id: "w3", icon: "🔥", titel: "Streak-Hüter",       beschreibung: "Lerne 5 Tage in Folge",                     xp: 80,  typ: "streak",           ziel: 5 },
  { id: "w4", icon: "🧮", titel: "Rechner-Profi",       beschreibung: "Öffne den Zinseszinsrechner 3 Mal",         xp: 50,  typ: "rechner",          ziel: 3 },
  { id: "w5", icon: "📰", titel: "News-Kenner",         beschreibung: "Öffne News 5 Mal diese Woche",              xp: 55,  typ: "news",             ziel: 5 },
  { id: "w6", icon: "💰", titel: "XP-Jäger",            beschreibung: "Sammle 200 XP diese Woche",                 xp: 90,  typ: "xp",               ziel: 200 },
  { id: "w7", icon: "🗺️", titel: "Lernpfad-Explorer",  beschreibung: "Schließe 5 Lektionen diese Woche ab",       xp: 100, typ: "lektionen",        ziel: 5 },
]

const MONTHLY_CHALLENGES = [
  { id: "m1", icon: "⚔️", titel: "Monats-Krieger",     beschreibung: "Schließe 20 Lektionen diesen Monat ab",     xp: 250, typ: "lektionen",        ziel: 20 },
  { id: "m2", icon: "🏗️", titel: "Portfolio-Aufbauer", beschreibung: "Lerne in 3 verschiedenen Kategorien",       xp: 200, typ: "kategorien",       ziel: 3 },
  { id: "m3", icon: "🎯", titel: "Konsistenz-König",    beschreibung: "Erreiche einen 15-Tage Streak",             xp: 300, typ: "streak_gesamt",    ziel: 15 },
]

const PERMANENT_CHALLENGES = [
  { id: "p1",  icon: "🌱", titel: "Erster Schritt",      beschreibung: "Schließe deine erste Lektion ab",          xp: 50,  typ: "lektionen_gesamt", ziel: 1 },
  { id: "p2",  icon: "📖", titel: "Anfänger",             beschreibung: "Schließe 5 Lektionen ab",                  xp: 75,  typ: "lektionen_gesamt", ziel: 5 },
  { id: "p3",  icon: "🎓", titel: "Lernender",            beschreibung: "Schließe 10 Lektionen ab",                 xp: 100, typ: "lektionen_gesamt", ziel: 10 },
  { id: "p4",  icon: "📊", titel: "Fortgeschritten",      beschreibung: "Schließe 25 Lektionen ab",                 xp: 150, typ: "lektionen_gesamt", ziel: 25 },
  { id: "p5",  icon: "🏆", titel: "Lektion-Meister",      beschreibung: "Schließe 50 Lektionen ab",                 xp: 250, typ: "lektionen_gesamt", ziel: 50 },
  { id: "p6",  icon: "🔥", titel: "Streak-Starter",       beschreibung: "Erreiche einen 3-Tage Streak",             xp: 50,  typ: "streak_gesamt",    ziel: 3 },
  { id: "p7",  icon: "🔥", titel: "Streak-Veteran",       beschreibung: "Erreiche einen 7-Tage Streak",             xp: 100, typ: "streak_gesamt",    ziel: 7 },
  { id: "p8",  icon: "🔥", titel: "Streak-Legende",       beschreibung: "Erreiche einen 30-Tage Streak",            xp: 300, typ: "streak_gesamt",    ziel: 30 },
  { id: "p9",  icon: "⚡", titel: "Quiz-Spezialist",      beschreibung: "Schließe 5 Quizze perfekt ab",             xp: 75,  typ: "perfekt_gesamt",   ziel: 5 },
  { id: "p10", icon: "🧮", titel: "Zahlen-Fan",            beschreibung: "Öffne den Rechner 5 Mal",                  xp: 60,  typ: "rechner_gesamt",   ziel: 5 },
  { id: "p11", icon: "📰", titel: "News-Follower",         beschreibung: "Öffne News 3 Mal",                         xp: 50,  typ: "news_gesamt",      ziel: 3 },
  { id: "p12", icon: "✅", titel: "Kategorie-Bezwinger",   beschreibung: "Schließe eine Kategorie zu 100% ab",       xp: 200, typ: "kat_komplett",     ziel: 1 },
  { id: "p13", icon: "🌟", titel: "Doppelt gut",           beschreibung: "Schließe 2 Kategorien zu 100% ab",         xp: 300, typ: "kat_komplett",     ziel: 2 },
  { id: "p14", icon: "⬆️", titel: "Level 5",              beschreibung: "Erreiche Level 5",                         xp: 150, typ: "level",            ziel: 5 },
  { id: "p15", icon: "🚀", titel: "Level 10",              beschreibung: "Erreiche Level 10",                        xp: 300, typ: "level",            ziel: 10 },
]

function getWeekKey(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const weekNum = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`
}

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

function getAktuelleWochenchallenge() {
  const weekNum = parseInt(getWeekKey().split("-W")[1], 10)
  return WEEKLY_CHALLENGES[weekNum % WEEKLY_CHALLENGES.length]
}

function getAktuelleMonatschallenge() {
  const monthNum = new Date().getMonth()
  return MONTHLY_CHALLENGES[monthNum % MONTHLY_CHALLENGES.length]
}

function getTageRestlicheWoche() {
  const heute = new Date()
  const tag = heute.getDay() || 7
  return 7 - tag + 1
}

function WelcomeScreen({ userFinanzsituation, userZiel, userName, onDone }) {
  const [count, setCount]         = useState(0)
  const [factsVisible, setFacts]  = useState([false, false, false])
  const [barsVisible, setBars]    = useState(false)

  const budget     = getBudgetDefault(userFinanzsituation)
  const r          = 0.07 / 12
  const n          = 20 * 12
  const endwert    = Math.round(budget * ((Math.pow(1 + r, n) - 1) / r))
  const eingezahlt = budget * n
  const zinseszins = endwert - eingezahlt
  const eingezahltPct = Math.round((eingezahlt / endwert) * 100)

  const FACTS = [
    { icon: "⚡", text: `Der MSCI World hat seit 1970 jede 15-Jahres-Periode mit Gewinn beendet.` },
    { icon: "⚡", text: `Warren Buffett hat 99% seines Vermögens nach seinem 52. Geburtstag gemacht.` },
    { icon: "⚡", text: `Zeit ist dein größter Vorteil – du hast ihn noch.` },
  ]

  useEffect(() => {
    setCount(0)
    let current = 0
    const steps = 80
    const increment = endwert / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= endwert) { setCount(endwert); clearInterval(timer) }
      else setCount(Math.round(current))
    }, 1800 / steps)
    return () => clearInterval(timer)
  }, [endwert])

  useEffect(() => {
    const t1 = setTimeout(() => setBars(true), 600)
    const t2 = setTimeout(() => setFacts([true, false, false]), 1000)
    const t3 = setTimeout(() => setFacts([true, true, false]), 1600)
    const t4 = setTimeout(() => setFacts([true, true, true]), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  function handleDone() {
    localStorage.setItem("welcomeScreenSeen", "true")
    onDone()
  }

  return (
    <div className="screen ws2-screen">
      {/* floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="ws2-particle" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${(i * 0.3) % 3}s`,
          animationDuration: `${3 + (i % 4)}s`,
          width: `${4 + (i % 5)}px`,
          height: `${4 + (i % 5)}px`,
          background: i % 2 === 0 ? "#7C3AED" : "#9D174D",
        }} />
      ))}

      <div className="ws2-skip-row">
        <button className="ws2-skip-btn" onClick={handleDone}>Überspringen</button>
      </div>

      <div className="ws2-wusstest">
        Wusstest du{userName ? `, ${userName}` : ""}...
      </div>

      <div className="ws2-hero">
        <p className="ws2-sub">{budget} €/Monat werden in 20 Jahren</p>
        <div className="ws2-count">{count.toLocaleString("de-DE")} €</div>
        <p className="ws2-count-label">auf deinem Konto liegen</p>
      </div>

      <div className="ws2-bars">
        <div className="ws2-bar-row">
          <span className="ws2-bar-label">Eingezahlt</span>
          <div className="ws2-bar-track">
            <div
              className="ws2-bar-fill ws2-bar-eingezahlt"
              style={{ width: barsVisible ? `${eingezahltPct}%` : "0%" }}
            />
          </div>
          <span className="ws2-bar-val">{eingezahlt.toLocaleString("de-DE")} €</span>
        </div>
        <div className="ws2-bar-row">
          <span className="ws2-bar-label">Mit Zinseszins</span>
          <div className="ws2-bar-track">
            <div
              className="ws2-bar-fill ws2-bar-zinseszins"
              style={{ width: barsVisible ? "100%" : "0%" }}
            />
          </div>
          <span className="ws2-bar-val ws2-bar-val-highlight">{endwert.toLocaleString("de-DE")} €</span>
        </div>
        <p className="ws2-diff-text">
          Der Unterschied von <strong>{zinseszins.toLocaleString("de-DE")} €</strong> ist purer Zinseszins.
        </p>
      </div>

      <div className="ws2-facts">
        {FACTS.map((f, i) => (
          <div key={i} className={`ws2-fact ${factsVisible[i] ? "ws2-fact-visible" : ""}`}>
            <span className="ws2-fact-icon">{f.icon}</span>
            <span className="ws2-fact-text">{f.text}</span>
          </div>
        ))}
      </div>

      <button className="ws2-btn" onClick={handleDone}>
        Ich will das verstehen →
      </button>
    </div>
  )
}

function Startscreen({ xp, streak, onHauptkategorieClick, userName, abgeschlosseneQuests, xpTaeglich, abgeschlosseneLektionen, userWissenslevel, userZiel, userFinanzsituation, onboardingDate, onLektionClick, userAktuelleSituation }) {
  const [expandedKatId, setExpandedKatId] = useState(null)

  const lvl        = getLevelInfo(xp)
  const heute      = getHeute()
  const questHeute = !!(abgeschlosseneQuests && abgeschlosseneQuests[heute])
  const xpHeute    = xpTaeglich[heute] || 0
  const xpZielPct  = Math.min(Math.round((xpHeute / 30) * 100), 100)
  const tipp       = getTagestipp(userWissenslevel || 1)
  const nextStep   = getNextStep(abgeschlosseneLektionen, userWissenslevel || 1)
  const zielText   = getZielText(userZiel)
  const greeting   = getPersonalizedGreeting(userName, onboardingDate, abgeschlosseneLektionen)
  const empKatId   = getEmpfohleneKatId(userWissenslevel || 1)
  const level      = berechneLevel(xp)
  const hatKeineLektionen = abgeschlosseneLektionen.length === 0
  const empfehlung = abgeschlosseneLektionen.length > 0 ? getEmpfehlung(abgeschlosseneLektionen, userWissenslevel, userAktuelleSituation) : null
  const empKat     = empfehlung ? kategorien.find(k => k.id === empfehlung.katId) : null

  const donutR    = 14
  const donutCirc = 2 * Math.PI * donutR
  const donutDash = donutCirc - (xpZielPct / 100) * donutCirc

  const sortiertKategorien = [...kategorien].sort((a, b) => {
    if (a.id === empKatId) return -1
    if (b.id === empKatId) return 1
    return a.id - b.id
  })

  const hubKategorien = hauptkategorien.filter(k => k.id !== "lernen")

  function toggleKat(katId) {
    setExpandedKatId(prev => prev === katId ? null : katId)
  }

  return (
    <div className="screen home-screen">

      {/* ── HERO CARD ── */}
      <div className="hero-card">
        <div className="hero-top">
          <span className="hero-brand">LUMIO</span>
          <div className={`hero-streak-pill${streak > 0 ? " aktiv" : ""}`}>
            <FlameIcon size={14} color={streak > 0 ? "#f97316" : "#888"}/>
            <span>{streak} {streak === 1 ? "Tag" : "Tage"}</span>
          </div>
        </div>
        <p className="hero-personal-greeting">{greeting}</p>
        {userZiel && (
          <div className="hero-goal-badge">
            <span>{zielText}</span>
          </div>
        )}
        <div className="hero-level-row">
          <span className="hero-level-name" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><StarIcon size={12} color="#EAB308"/> {lvl.name}</span>
          <span className="hero-xp-count">{lvl.xpAktuell} / {lvl.xpBenoetigt} XP</span>
        </div>
        <div className="hero-xp-bar">
          <div className="hero-xp-fill" style={{ width: `${lvl.fortschritt}%` }} />
        </div>
        <div className="hero-tagesziel-row">
          <span className="hero-tagesziel-label">Tagesziel</span>
          <span className="hero-tagesziel-xp">{xpHeute} / 30 XP heute</span>
        </div>
        <div className="hero-tagesziel-bar">
          <div className="hero-tagesziel-fill" style={{ width: `${xpZielPct}%` }} />
        </div>
      </div>

      {/* ── FORTSCHRITT HEUTE ── */}
      <div className="fortschritt-heute">
        <div className={`fh-karte ${questHeute ? "done" : ""}`}>
          <span className="fh-icon">{questHeute ? <CheckIcon size={20} color="#10B981"/> : <QuestIcon size={20} color="#7C3AED"/>}</span>
          <div className="fh-text">
            <span className="fh-label">Daily Quest</span>
            <span className="fh-value">{questHeute ? "Erledigt ✓" : "Ausstehend"}</span>
          </div>
        </div>
        <div className={`fh-karte ${xpHeute >= 30 ? "done" : ""}`}>
          <div className="fh-donut">
            <svg width="36" height="36" viewBox="0 0 36 36" style={{ display: "block" }}>
              <defs>
                <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#9D174D"/>
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r={donutR} fill="none" stroke="#ffffff11" strokeWidth="3"/>
              <circle cx="18" cy="18" r={donutR} fill="none" stroke="url(#dg)" strokeWidth="3"
                strokeDasharray={donutCirc} strokeDashoffset={donutDash}
                strokeLinecap="round" transform="rotate(-90 18 18)"/>
            </svg>
          </div>
          <div className="fh-text">
            <span className="fh-label">Tages-XP</span>
            <span className="fh-value">{xpHeute} / 30 XP</span>
          </div>
        </div>
      </div>

      {/* ── NÄCHSTER SCHRITT ── */}
      <div className="ns-card" onClick={() => {
        setExpandedKatId(empKatId)
        setTimeout(() => document.getElementById("lernpfade-section")?.scrollIntoView({ behavior: "smooth" }), 100)
      }}>
        <div className="ns-play-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div className="ns-text">
          <span className="ns-label">WEITER LERNEN</span>
          <p className="ns-titel">{nextStep.text}</p>
          <p className="ns-sub">{nextStep.sub}</p>
        </div>
        <div className="ns-arrow-circle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>

      {/* ── EMPFEHLUNG ── */}
      {empKat && (
        <div className="emp-card" onClick={() => { setExpandedKatId(empKat.id); setTimeout(() => document.getElementById("lernpfade-section")?.scrollIntoView({ behavior: "smooth" }), 100) }}>
          <div className="emp-icon">{empKat.icon}</div>
          <div className="emp-text">
            <span className="emp-label">Empfohlen für dich</span>
            <p className="emp-name">{empKat.name}</p>
            <p className="emp-grund">{empfehlung.grund}</p>
          </div>
          <div className="emp-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>
      )}

      {/* ── TIPP DES TAGES ── */}
      <div className="tipp-karte">
        <div className="tipp-accent" />
        <div className="tipp-content">
          <span className="tipp-label">WUSSTEN SIE</span>
          <p className="tipp-text">{tipp}</p>
        </div>
      </div>

      {/* ── HUB (News, Rechner, Challenges) ── */}
      <p className="section-label">ENTDECKEN</p>
      <div className="hub-liste">
        {hubKategorien.map((k) => (
          <div
            key={k.id}
            className={`hub-row ${!k.verfuegbar ? "gesperrt" : ""}`}
            onClick={() => k.verfuegbar && onHauptkategorieClick(k.id)}
            style={k.verfuegbar ? { "--hub-farbe": k.farbe } : {}}
          >
            <div className="hub-row-icon" style={{ background: k.verfuegbar ? k.farbe + "22" : "#ffffff0d" }}>
              {HUB_SVGS[k.id] ?? <span style={{ fontSize: "1.4rem" }}>{k.icon}</span>}
            </div>
            <div className="hub-row-text">
              <p className="hub-row-name">{k.name}</p>
              <p className="hub-row-sub">{k.verfuegbar ? k.beschreibung : "Bald verfügbar"}</p>
            </div>
            {k.verfuegbar
              ? <div className="hub-row-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              : <span className="hub-coming-soon">Soon</span>
            }
          </div>
        ))}
      </div>

      {/* ── LERNPFADE INLINE ── */}
      <p className="section-label" id="lernpfade-section" style={{ marginTop: "1.5rem" }}>── LERNPFADE ──</p>
      <div className="acc-kategorien">
        {sortiertKategorien.map((k) => {
          const gesperrt   = level < k.minLevel
          const abgeschl   = (lernpfad[k.id] || []).filter(l => abgeschlosseneLektionen.includes(l.id)).length
          const gesamt     = (lernpfad[k.id] || []).length
          const fortschritt = gesamt > 0 ? Math.round((abgeschl / gesamt) * 100) : 0
          const expanded   = expandedKatId === k.id
          const isEmp      = k.id === empKatId
          const lektionen  = lernpfad[k.id] || []
          return (
            <div key={k.id} className={`acc-kat-wrap ${isEmp && !gesperrt ? "emp" : ""}`}>
              <div
                className={`acc-kat-header ${gesperrt ? "gesperrt" : ""} ${expanded ? "expanded" : ""}`}
                onClick={() => !gesperrt && toggleKat(k.id)}
              >
                <div className="acc-kat-icon" style={{ background: gesperrt ? "#1a1525" : k.farbe + "22", color: gesperrt ? "#444" : k.farbe }}>
                  {gesperrt ? <LockIcon size={18} color="#444"/> : <KatIcon id={k.id} size={18} color={k.farbe}/>}
                </div>
                <div className="acc-kat-info">
                  <div className="acc-kat-name-row">
                    <span className="acc-kat-name">{k.name}</span>
                    {isEmp && !gesperrt && <span className="acc-empfohlen-badge">⭐ Empfohlen</span>}
                    {gesperrt && <span className="acc-lock-label">ab Level {k.minLevel}</span>}
                  </div>
                  <div className="acc-kat-bar-row">
                    <div className="acc-kat-bar-bg">
                      <div className="acc-kat-bar-fill" style={{ width: `${fortschritt}%`, background: k.farbe }} />
                    </div>
                    <span className="acc-kat-pct">{fortschritt}%</span>
                  </div>
                </div>
                <div className={`acc-kat-chevron ${expanded ? "open" : ""}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              {expanded && (
                <div className="acc-lektionen">
                  {lektionen.map((l, index) => {
                    const done   = abgeschlosseneLektionen.includes(l.id)
                    const locked = index > 0 && !abgeschlosseneLektionen.includes(lektionen[index - 1].id)
                    const isNext = !done && !locked
                    return (
                      <div
                        key={l.id}
                        className={`acc-lek-row ${done ? "done" : ""} ${locked ? "locked" : ""} ${isNext ? "next" : ""}`}
                        onClick={() => !locked && onLektionClick(l, k)}
                      >
                        <div className={`acc-lek-num ${done ? "done" : locked ? "locked" : isNext ? "next" : ""}`}>
                          {done
                            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7"/></svg>
                            : locked ? <LockIcon size={10} color="#444"/> : String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="acc-lek-info">
                          <p className="acc-lek-titel">{l.titel}</p>
                          <p className="acc-lek-meta" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><BoltIcon size={10}/> +{l.xp} XP · {l.typ === "cards" ? "Karten" : "Lektion"}</p>
                        </div>
                        {isNext && <span className="acc-lek-start">Starten →</span>}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── FLOATING QUICK-START ── */}
      {hatKeineLektionen && (
        <button className="fab-start" onClick={() => {
          const empKat = kategorien.find(k => k.id === empKatId)
          const empLek = (lernpfad[empKatId] || [])[0]
          if (empKat && empLek) onLektionClick(empLek, empKat)
        }}>
          ▶ Erste Lektion starten
        </button>
      )}

    </div>
  )
}

const ueberkategorien = [
  { id: "grundlagen", name: "Grundlagen", icon: "🏗️", beschreibung: "Das Fundament deiner Finanzen", farbe: "#10B981", minLevel: 1, kategorieIds: [5, 6, 9] },
  { id: "anlageklassen", name: "Anlageklassen", icon: "📊", beschreibung: "Wo und wie du investierst", farbe: "#7C3AED", minLevel: 2, kategorieIds: [1, 2, 10, 11, 12, 3, 8] },
  { id: "fortgeschritten", name: "Fortgeschritten", icon: "🚀", beschreibung: "Für erfahrene Anleger", farbe: "#9D174D", minLevel: 8, kategorieIds: [7, 4] },
  { id: "extras", name: "Extras", icon: "⭐", beschreibung: "Ergänzendes Wissen", farbe: "#F59E0B", minLevel: 1, kategorieIds: [] }
]

function LernpfadeScreen({ xp, onKategorieClick, onZurueck, abgeschlosseneLektionen }) {
  const level = berechneLevel(xp)
  const [offene, setOffene] = useState(new Set(["grundlagen"]))

  function toggleUeberkategorie(id) {
    setOffene(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="screen">
      <button className="zurueck-btn" onClick={onZurueck}>
        <ArrowLeftIcon size={16}/> Zurück
      </button>
      <div className="screen-header" style={{ marginTop: "1rem" }}>
        <h1>Lernpfade</h1>
        <p className="xp-info" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <BoltIcon size={14}/> {xp} XP · Level {level}
        </p>
      </div>
      <div className="ueberkategorien-liste">
        {ueberkategorien.map((uk) => {
          const gesperrt = level < uk.minLevel
          const istOffen = !gesperrt && offene.has(uk.id)
          const pfade = uk.kategorieIds.map(kid => kategorien.find(k => k.id === kid)).filter(Boolean)
          return (
            <div key={uk.id} className={`uk-karte${gesperrt ? " uk-gesperrt" : ""}${istOffen ? " uk-offen" : ""}`}>
              <div
                className="uk-header"
                style={{ borderBottomColor: istOffen ? uk.farbe + "33" : "transparent" }}
                onClick={() => !gesperrt && toggleUeberkategorie(uk.id)}
              >
                <div className="uk-header-left">
                  <div className="uk-icon" style={{ background: gesperrt ? "#1a1525" : uk.farbe + "22", color: gesperrt ? "#444" : uk.farbe }}>
                    {gesperrt ? <LockIcon size={20} color="#444"/> : <span>{uk.icon}</span>}
                  </div>
                  <div>
                    <h2 className="uk-name">{uk.name}</h2>
                    <p className="uk-beschreibung">{gesperrt ? `Ab Level ${uk.minLevel}` : uk.beschreibung}</p>
                  </div>
                </div>
                <div className="uk-chevron" style={{ color: gesperrt ? "#444" : uk.farbe }}>
                  {gesperrt
                    ? <span className="uk-lock-badge">ab Level {uk.minLevel}</span>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: istOffen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
                  }
                </div>
              </div>
              {istOffen && (
                <div className="uk-inhalt">
                  {pfade.length === 0 ? (
                    <p className="uk-leer">Bald verfügbar</p>
                  ) : pfade.map((k) => {
                    const katGesperrt = level < k.minLevel
                    const abgeschlossen = (lernpfad[k.id] || []).filter(l => abgeschlosseneLektionen.includes(l.id)).length
                    const gesamt = (lernpfad[k.id] || []).length
                    const fortschritt = gesamt > 0 ? Math.round((abgeschlossen / gesamt) * 100) : 0
                    return (
                      <div
                        key={k.id}
                        className={`uk-pfad-zeile${katGesperrt ? " uk-pfad-gesperrt" : ""}`}
                        onClick={() => !katGesperrt && onKategorieClick(k)}
                      >
                        <div className="uk-pfad-icon" style={{ background: katGesperrt ? "#1a1525" : k.farbe + "22", color: katGesperrt ? "#444" : k.farbe }}>
                          {katGesperrt ? <LockIcon size={14} color="#444"/> : <KatIcon id={k.id} size={14} color={k.farbe}/>}
                        </div>
                        <div className="uk-pfad-info">
                          <span className="uk-pfad-name">{k.name}</span>
                          <div className="uk-pfad-bar">
                            <div className="uk-pfad-fill" style={{ width: `${fortschritt}%`, background: k.farbe }}/>
                          </div>
                        </div>
                        <span className="uk-pfad-meta">{katGesperrt ? `Lvl ${k.minLevel}` : `${fortschritt}%`}</span>
                      </div>
                    )
                  })}
                </div>
              )}
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
      <button className="zurueck-btn" onClick={onZurueck}>
        <ArrowLeftIcon size={16}/> Zurück
      </button>

      <div className="kd-banner" style={{ background: `linear-gradient(135deg, ${kategorie.farbe}cc, ${kategorie.farbe}66)` }}>
        <div className="kd-banner-top">
          <div className="kd-banner-icon">
            <KatIcon id={kategorie.id} size={28} color="white"/>
          </div>
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
                {abgeschlossen
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7"/></svg>
                  : numStr}
              </div>
              <div className="lektion-info">
                <p className="lektion-titel">{l.titel}</p>
                <p className="lektion-xp" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <BoltIcon size={11}/> +{l.xp} XP · {l.typ === "cards" ? "Karten" : "Lektion"}
                </p>
              </div>
              {isNext && <span className="lektion-start-label">Jetzt starten</span>}
              {!isNext && (
                <span className="lektion-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const GLOSSAR_BEGRIFFE = [
  { term: "Abgeltungssteuer", def: "Steuer von 25% auf Kapitalerträge wie Dividenden und Kursgewinne in Deutschland. Ab 1.000€ (Single) greift der Sparerpauschbetrag.", kat: 7 },
  { term: "Aktie", def: "Anteil an einem Unternehmen. Als Aktionär bist du Miteigentümer und hast Anspruch auf Dividenden und Stimmrecht.", kat: 2 },
  { term: "Anleihe", def: "Schuldverschreibung: Du leihst einem Staat oder Unternehmen Geld und bekommst Zinsen zurück. Gilt als sicherer als Aktien.", kat: 1 },
  { term: "Asset Allocation", def: "Aufteilung des Portfolios auf verschiedene Anlageklassen (Aktien, Anleihen, Immobilien). Beeinflusst Risiko und Rendite maßgeblich.", kat: 1 },
  { term: "Ausschüttend", def: "ETF oder Fonds, der Dividenden und Zinsen regelmäßig an Anleger auszahlt. Gegenteil: thesaurierend.", kat: 1 },
  { term: "Benchmark", def: "Vergleichsindex für Fonds und ETFs, z.B. DAX oder MSCI World. Zeigt, ob ein Fonds besser oder schlechter als der Markt abschneidet.", kat: 1 },
  { term: "Beta", def: "Maß für die Volatilität einer Aktie im Vergleich zum Markt. Beta > 1 = volatiler, Beta < 1 = stabiler als der Markt.", kat: 2 },
  { term: "Blue Chip", def: "Aktien großer, etablierter Unternehmen mit stabiler Dividendenhistorie. Beispiele: Apple, Microsoft, Nestlé.", kat: 2 },
  { term: "Broker", def: "Finanzdienstleister, über den du Wertpapiere kaufen und verkaufen kannst. Beispiele: Trade Republic, Scalable Capital.", kat: 6 },
  { term: "Budget", def: "Finanzplan, der Einnahmen und Ausgaben gegenüberstellt. Grundlage für erfolgreiches Sparen und Investieren.", kat: 5 },
  { term: "Bull/Bear Market", def: "Bullenmarkt = steigende Kurse (optimistisch). Bärenmarkt = fallende Kurse (pessimistisch). Oft definiert als 20% Anstieg/Fall.", kat: 2 },
  { term: "Call Option", def: "Recht, ein Wertpapier zu einem festgelegten Preis zu kaufen. Profitiert von steigenden Kursen. Zeitwert verfällt.", kat: 4 },
  { term: "Cash Flow", def: "Geldfluss: Einnahmen minus Ausgaben in einem Zeitraum. Positiver Cash Flow = mehr rein als raus.", kat: 5 },
  { term: "CFD", def: "Contract for Difference – spekulatives Instrument ohne Eigentum am Basiswert. Hoher Verlustrisiken durch Hebel. Nicht für Einsteiger.", kat: 4 },
  { term: "Cost Averaging", def: "Regelmäßiges Investieren gleicher Beträge. Kaufst du bei hohen und niedrigen Kursen – resultiert in günstigem Durchschnittspreis.", kat: 1 },
  { term: "DAX", def: "Deutscher Aktienindex mit den 40 größten börsennotierten Unternehmen Deutschlands. Berechnet als Performance-Index.", kat: 2 },
  { term: "Depot", def: "Wertpapierkonto bei einer Bank oder einem Broker, auf dem deine Aktien, ETFs und andere Wertpapiere verwahrt werden.", kat: 6 },
  { term: "Derivat", def: "Finanzinstrument, dessen Wert von einem Basiswert (Aktie, Index, Rohstoff) abhängt. Beispiele: Optionen, Futures, CFDs.", kat: 4 },
  { term: "Diversifikation", def: "Risikostreuung durch Investition in verschiedene Anlagen. 'Lege nicht alle Eier in einen Korb.' ETFs sind automatisch diversifiziert.", kat: 1 },
  { term: "Dividende", def: "Gewinnbeteiligung, die ein Unternehmen an seine Aktionäre ausschüttet. Meist quartalsmäßig oder jährlich.", kat: 2 },
  { term: "DCA", def: "Dollar Cost Averaging – Strategie des regelmäßigen Investierens fixer Beträge, unabhängig vom aktuellen Kurs.", kat: 1 },
  { term: "ETF", def: "Exchange Traded Fund – börsengehandelter Fonds, der einen Index wie den MSCI World abbildet. Günstig, breit diversifiziert.", kat: 1 },
  { term: "Eigenkapital", def: "Eigene finanzielle Mittel, die du in eine Investition einbringst. Bei Immobilien: typisch 20% des Kaufpreises.", kat: 8 },
  { term: "Emerging Markets", def: "Schwellenländer wie China, Indien, Brasilien. Höheres Wachstumspotenzial aber auch höheres Risiko als Industrienationen.", kat: 1 },
  { term: "FIRE Movement", def: "Financial Independence, Retire Early – Bewegung mit dem Ziel, durch hohes Sparen früh finanziell unabhängig zu werden.", kat: 5 },
  { term: "Fondssparplan", def: "Automatischer Kauf von Fondsanteilen in regelmäßigen Abständen. Ideal für langfristigen Vermögensaufbau.", kat: 1 },
  { term: "Freistellungsauftrag", def: "Antrag bei der Bank, der sicherstellt, dass Erträge bis zum Sparerpauschbetrag (1.000€) steuerfrei bleiben.", kat: 7 },
  { term: "Futures", def: "Terminkontrakte zum Kauf/Verkauf eines Basiswerts zu einem festgelegten Preis in der Zukunft. Wird für Absicherung und Spekulation genutzt.", kat: 4 },
  { term: "Hedge", def: "Absicherungsstrategie gegen Verluste. Z.B. Put-Option kaufen, um Aktienposition gegen Kursverluste abzusichern.", kat: 4 },
  { term: "Index", def: "Statistische Kennzahl, die die Performance einer Gruppe von Wertpapieren abbildet. Beispiele: MSCI World, DAX, S&P 500.", kat: 1 },
  { term: "Inflation", def: "Anstieg des allgemeinen Preisniveaus. Entwertet Geld auf dem Konto. Historisch ~2% p.a. – Investieren schützt dagegen.", kat: 1 },
  { term: "ISIN", def: "International Securities Identification Number – eindeutige 12-stellige Kennung für jedes Wertpapier weltweit.", kat: 6 },
  { term: "KGV", def: "Kurs-Gewinn-Verhältnis: Aktienkurs geteilt durch Gewinn je Aktie. Niedrig = potenziell günstig. Basis für Bewertungsanalysen.", kat: 2 },
  { term: "Leverage", def: "Hebelwirkung – Einsatz von Fremdkapital zum Verstärken von Gewinnen (und Verlusten). Erhöht Risiko erheblich.", kat: 4 },
  { term: "Liquidität", def: "Wie schnell ein Vermögenswert in Bargeld umgewandelt werden kann. Aktien: hoch. Immobilien: niedrig.", kat: 5 },
  { term: "MSCI World", def: "Index der ca. 1.500 größten Unternehmen aus 23 Industrienationen. Beliebtester ETF-Index für langfristige Anleger.", kat: 1 },
  { term: "Marktkapitalisierung", def: "Gesamtwert aller ausstehenden Aktien eines Unternehmens. Kurs × Aktienanzahl = Marktkapitalisierung.", kat: 2 },
  { term: "Option", def: "Recht (keine Pflicht), einen Basiswert zu kaufen (Call) oder zu verkaufen (Put) zu einem festgelegten Preis.", kat: 4 },
  { term: "Portfolio", def: "Gesamtheit aller Finanzanlagen einer Person: Aktien, ETFs, Anleihen, Immobilien etc. Sollte diversifiziert sein.", kat: 1 },
  { term: "Put Option", def: "Recht, ein Wertpapier zu einem festgelegten Preis zu verkaufen. Profitiert von fallenden Kursen.", kat: 4 },
  { term: "Rebalancing", def: "Wiederherstellung der Zielgewichtung im Portfolio. Einmal jährlich reicht – Steuern und Kosten beachten.", kat: 1 },
  { term: "REIT", def: "Real Estate Investment Trust – börsengehandelter Immobilienfonds. Ermöglicht Immobilien-Investitionen ohne direkten Kauf.", kat: 8 },
  { term: "Rendite", def: "Gewinn einer Investition in Prozent, bezogen auf das eingesetzte Kapital. Historische ETF-Rendite: ca. 7-8% p.a.", kat: 1 },
  { term: "S&P 500", def: "Index der 500 größten US-Unternehmen. Einer der wichtigsten Börsenindizes der Welt. Enthält Apple, Microsoft, Amazon.", kat: 2 },
  { term: "Sparerpauschbetrag", def: "1.000€ jährliche Steuerfreigrenze für Kapitalerträge (Einzelperson). Wird über Freistellungsauftrag aktiviert.", kat: 7 },
  { term: "Sparplan", def: "Automatisches, regelmäßiges Investieren eines Fixbetrags. Bereits ab 1€/Monat möglich. Ideal für Einsteiger.", kat: 1 },
  { term: "TER", def: "Total Expense Ratio – jährliche Gesamtkostenquote eines ETFs. Gute ETFs: unter 0,25%. Aktive Fonds: oft 1,5%+.", kat: 1 },
  { term: "Thesaurierend", def: "ETF, der Dividenden automatisch reinvestiert statt auszuschütten. Maximiert den Zinseszins-Effekt.", kat: 1 },
  { term: "Tracking Error", def: "Abweichung der ETF-Rendite vom abgebildeten Index. Gute ETFs haben einen niedrigen Tracking Error.", kat: 1 },
  { term: "Value Investing", def: "Strategie, unterbewertete Aktien zu kaufen. Geprägt von Benjamin Graham, bekannt durch Warren Buffett.", kat: 2 },
  { term: "Volatilität", def: "Schwankungsbreite eines Wertpapiers. Hohe Volatilität = hohes Risiko und hohe Chance. Messzahl: Standardabweichung.", kat: 1 },
  { term: "Yield", def: "Rendite oder Ertrag einer Anlage, meist in Prozent. Dividend Yield = Dividende geteilt durch Aktienkurs.", kat: 2 },
  { term: "Zinseszins", def: "Zinsen auf bereits erhaltene Zinsen. Führt zu exponentiellem Wachstum. Albert Einstein soll es 'achtes Weltwunder' genannt haben.", kat: 1 },
]

function GlossarScreen() {
  const [suche, setSuche]       = useState("")
  const [aktivBuchstabe, setAktivBuchstabe] = useState(null)

  const buchstaben = [...new Set(GLOSSAR_BEGRIFFE.map(b => b.term[0].toUpperCase()))].sort()

  const gefiltert = GLOSSAR_BEGRIFFE.filter(b => {
    const matchSuche = !suche || b.term.toLowerCase().includes(suche.toLowerCase()) || b.def.toLowerCase().includes(suche.toLowerCase())
    const matchAlpha = !aktivBuchstabe || b.term.toUpperCase().startsWith(aktivBuchstabe)
    return matchSuche && matchAlpha
  }).sort((a, b) => a.term.localeCompare(b.term, "de"))

  return (
    <div className="gl-wrap">
      <div className="gl-search-row">
        <input
          className="gl-search"
          placeholder="Begriff suchen..."
          value={suche}
          onChange={e => { setSuche(e.target.value); setAktivBuchstabe(null) }}
        />
      </div>
      <div className="gl-alpha-tabs">
        {buchstaben.map(b => (
          <button
            key={b}
            className={`gl-alpha-btn ${aktivBuchstabe === b ? "aktiv" : ""}`}
            onClick={() => { setAktivBuchstabe(prev => prev === b ? null : b); setSuche("") }}
          >{b}</button>
        ))}
      </div>
      <div className="gl-liste">
        {gefiltert.length === 0 && <p className="gl-leer">Kein Begriff gefunden.</p>}
        {gefiltert.map(b => (
          <div key={b.term} className="gl-karte">
            <div className="gl-karte-top">
              <span className="gl-term">{b.term}</span>
              {b.kat && (
                <span className="gl-lern-link">→ Mehr lernen</span>
              )}
            </div>
            <p className="gl-def">{b.def}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function EntdeckenScreen({ userFinanzsituation, onRechnerOeffnung, onNewsOeffnen, xp, xpTaeglich, userName, onRanglisteOeffnen }) {
  const [tab, setTab] = useState("rangliste")
  const tipp = getTippDerWoche()
  const weeklyXP = getWeeklyXP(xpTaeglich)
  const rangListe = buildRangliste(xp, weeklyXP, userName)
  const top5 = rangListe.slice(0, 5)
  const userIdx = rangListe.findIndex(u => u.istUser)
  const userRang = userIdx + 1

  return (
    <div className="entdecken-screen">
      <div className="entd-tab-bar">
        <button className={`entd-tab-btn ${tab === "rangliste" ? "aktiv" : ""}`} onClick={() => setTab("rangliste")}>🏆 Rangliste</button>
        <button className={`entd-tab-btn ${tab === "news" ? "aktiv" : ""}`} onClick={() => setTab("news")}>📰 News</button>
        <button className={`entd-tab-btn ${tab === "rechner" ? "aktiv" : ""}`} onClick={() => setTab("rechner")}>🧮 Rechner</button>
        <button className={`entd-tab-btn ${tab === "glossar" ? "aktiv" : ""}`} onClick={() => setTab("glossar")}>📚 Glossar</button>
      </div>

      {tab === "rangliste" && (
        <div className="entd-content">
          <div className="entd-rang-header">
            <div className="entd-rang-dein">
              <span className="entd-rang-label">Dein Rang</span>
              <span className="entd-rang-zahl">#{userRang}</span>
            </div>
            <button className="entd-alle-btn" onClick={onRanglisteOeffnen}>Alle sehen →</button>
          </div>
          <div className="entd-mini-rl">
            {top5.map((u, i) => (
              <div key={u.name} className={`entd-rl-row ${u.istUser ? "eigener" : ""}`}>
                <span className="entd-rl-rang">#{i + 1}</span>
                <div className="entd-rl-avatar">{u.initials}</div>
                <span className="entd-rl-name">{u.istUser ? "Du" : u.name}</span>
                <span className="entd-rl-xp">{u.xp.toLocaleString("de-DE")} XP</span>
              </div>
            ))}
            {userIdx >= 5 && (
              <>
                <div className="entd-rl-dots">···</div>
                <div className="entd-rl-row eigener">
                  <span className="entd-rl-rang">#{userRang}</span>
                  <div className="entd-rl-avatar">{rangListe[userIdx].initials}</div>
                  <span className="entd-rl-name">Du</span>
                  <span className="entd-rl-xp">{xp.toLocaleString("de-DE")} XP</span>
                </div>
              </>
            )}
          </div>

          <div className="entd-tipp-card">
            <div className="entd-tipp-header">
              <span className="entd-tipp-icon">💡</span>
              <span className="entd-tipp-label">Tipp der Woche</span>
            </div>
            <h3 className="entd-tipp-titel">{tipp.titel}</h3>
            <p className="entd-tipp-text">{tipp.text}</p>
          </div>
        </div>
      )}

      {tab === "news" && <NewsScreen onZurueck={null} onOeffnen={onNewsOeffnen} />}
      {tab === "rechner" && <RechnerScreen onZurueck={null} userFinanzsituation={userFinanzsituation} onRechnerOeffnung={onRechnerOeffnung} />}
      {tab === "glossar" && <GlossarScreen />}
    </div>
  )
}

function L1Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [sparrate, setSparrate] = useState(100)
  const [jahre, setJahre]       = useState(20)

  const r = 0.07 / 12
  const n = jahre * 12
  const endwert    = Math.round(sparrate * ((Math.pow(1 + r, n) - 1) / r))
  const eingezahlt = sparrate * n
  const gewinn     = endwert - eingezahlt

  const sliderBgL1 = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100
    return `linear-gradient(to right, #7C3AED ${pct}%, #2a2040 ${pct}%)`
  }

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook l1-hook-card">
          <p className="l1-hook-line l1-anim-1">Stell dir vor...</p>
          <p className="l1-hook-line l1-anim-2">Du investierst jeden Monat <strong>100€.</strong></p>
          <p className="l1-hook-line l1-anim-3"><strong>20 Jahre</strong> lang.</p>
          <p className="l1-hook-line l1-anim-4">Ergebnis: <span className="l1-gewinn">52.000€.</span></p>
          <p className="l1-hook-line l1-anim-5">Eingezahlt hast du: <span className="l1-eingezahlt">24.000€.</span></p>
          <p className="l1-hook-line l1-anim-6 l1-big-reveal">+28.000€ reiner Gewinn.</p>
          <p className="l1-hook-sub">Das ist Zinseszins. Das ist ein ETF.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein ETF?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1rem" }}>
            ETF = Exchange Traded Fund. Ein Korb, der viele Aktien gleichzeitig enthält.
          </p>
          <div className="l1-analogy">
            <div className="l1-analogy-col l1-bad">
              <span className="l1-analogy-icon">🍎</span>
              <span className="l1-analogy-label">Eine Aktie</span>
              <span className="l1-analogy-sub">Fällt Apple, verlierst du viel.</span>
              <span className="l1-analogy-verdict l1-verdict-bad">❌ Riskant</span>
            </div>
            <div className="l1-analogy-vs">VS</div>
            <div className="l1-analogy-col l1-good">
              <span className="l1-analogy-icon">🧺</span>
              <span className="l1-analogy-label">ETF = Korb</span>
              <span className="l1-analogy-sub">1.500+ Aktien gebündelt. Eine fällt – kaum spürbar.</span>
              <span className="l1-analogy-verdict l1-verdict-good">✅ Diversifiziert</span>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">MSCI World: Was steckt drin?</h2>
          <p style={{ color: "#aaa", fontSize: "0.82rem", marginBottom: "0.75rem" }}>Top-5 im MSCI World (ca. 1.500 Unternehmen aus 23 Ländern)</p>
          {[
            { name: "Apple",     pct: 4.8, color: "#7C3AED" },
            { name: "Microsoft", pct: 4.2, color: "#8B5CF6" },
            { name: "NVIDIA",    pct: 3.9, color: "#A78BFA" },
            { name: "Amazon",    pct: 2.3, color: "#C4B5FD" },
            { name: "Meta",      pct: 1.8, color: "#DDD6FE" },
          ].map(c => (
            <div key={c.name} className="l1-bar-row">
              <span className="l1-bar-name">{c.name}</span>
              <div className="l1-bar-track">
                <div className="l1-bar-fill" style={{ width: `${c.pct * 12}%`, background: c.color }} />
              </div>
              <span className="l1-bar-pct">{c.pct}%</span>
            </div>
          ))}
          <p style={{ color: "#666", fontSize: "0.75rem", marginTop: "0.75rem" }}>Kein Einzeltitel macht mehr als 5% aus – automatische Risikostreuung.</p>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kosten: ETF vs. aktiver Fonds</h2>
          <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "0.75rem" }}>10.000 € investiert, 7% Rendite – nach 30 Jahren:</p>
          <svg viewBox="0 0 260 160" style={{ width: "100%" }}>
            <defs>
              <linearGradient id="lineGreen" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
              <linearGradient id="lineRed" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#fca5a5" />
              </linearGradient>
            </defs>
            <line x1="30" y1="140" x2="250" y2="140" stroke="#333" strokeWidth="1"/>
            <line x1="30" y1="20" x2="30" y2="140" stroke="#333" strokeWidth="1"/>
            {/* ETF (0.2%) line - ends at ~74k */}
            <path d="M30,135 Q100,100 180,60 T250,20" stroke="url(#lineGreen)" strokeWidth="2.5" fill="none"/>
            {/* Fonds (2%) line - ends at ~57k */}
            <path d="M30,135 Q100,110 180,85 T250,50" stroke="url(#lineRed)" strokeWidth="2.5" fill="none" strokeDasharray="5,3"/>
            <text x="255" y="23" fill="#10B981" fontSize="8">74.000€</text>
            <text x="255" y="53" fill="#ef4444" fontSize="8">57.000€</text>
            <text x="30" y="155" fill="#666" fontSize="7">0</text>
            <text x="240" y="155" fill="#666" fontSize="7">30 Jahre</text>
          </svg>
          <div className="l1-cost-legend">
            <span className="l1-legend-green">━ ETF (TER 0,2%)</span>
            <span className="l1-legend-red">╌ Fonds (TER 2%)</span>
          </div>
          <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }}>Kostenunterschied: <strong style={{ color: "#10B981" }}>17.000€ mehr</strong> beim ETF</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein ETF-Rechner</h2>
          <p className="cl-card-sub">Sparrate: <strong>{sparrate} €/Monat</strong></p>
          <input type="range" min={10} max={1000} step={10} value={sparrate}
            onChange={e => setSparrate(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBgL1(sparrate, 10, 1000) }} />
          <p className="cl-card-sub" style={{ marginTop: "0.75rem" }}>Laufzeit: <strong>{jahre} Jahre</strong></p>
          <input type="range" min={1} max={40} step={1} value={jahre}
            onChange={e => setJahre(Number(e.target.value))}
            className="rc-slider rc-slider-full" style={{ background: sliderBgL1(jahre, 1, 40) }} />
          <div className="cl-kaffee-ergebnis" style={{ marginTop: "1rem" }}>
            <div className="cl-kaffee-zeile"><span>Eingezahlt</span><span className="cl-kaffee-wert">{eingezahlt.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile cl-kaffee-highlight"><span>Endwert bei 7%</span><span className="cl-kaffee-wert cl-kaffee-big">{endwert.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span style={{ color: "#10B981" }}>Zinseszins-Gewinn</span><span className="cl-kaffee-wert" style={{ color: "#10B981" }}>+{gewinn.toLocaleString("de-DE")} €</span></div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Thesaurierend vs. Ausschüttend</h2>
          <div className="l1-tree-compare">
            <div className="l1-tree-col">
              <span className="l1-tree-icon">🌱</span>
              <span className="l1-tree-name">Thesaurierend</span>
              <span className="l1-tree-sub">Dividenden werden automatisch reinvestiert – maximaler Zinseszins-Effekt.</span>
              <span className="l1-tree-tag l1-tag-green">Für Sparpläne ideal</span>
            </div>
            <div className="l1-tree-divider" />
            <div className="l1-tree-col">
              <span className="l1-tree-icon">🌳</span>
              <span className="l1-tree-name">Ausschüttend</span>
              <span className="l1-tree-sub">Dividenden werden ausgezahlt – du bekommst regelmäßig Geld überwiesen.</span>
              <span className="l1-tree-tag l1-tag-blue">Für passives Einkommen</span>
            </div>
          </div>
          <div style={{ background: "#7C3AED11", border: "1px solid #7C3AED33", borderRadius: "8px", padding: "0.65rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#a78bfa", fontSize: "0.82rem", margin: 0 }}>Empfehlung für Einsteiger: <strong>Thesaurierend</strong> – Steuern werden erst beim Verkauf fällig.</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Welcher ETF für den Start?</h2>
          {[
            { name: "MSCI World", beschreibung: "1.500 Unternehmen, 23 Länder. Keine Schwellenländer.", tag: "Klassiker", color: "#7C3AED" },
            { name: "MSCI ACWI", beschreibung: "3.000+ Unternehmen inkl. Schwellenländer (China, Indien…)", tag: "Breiter", color: "#8B5CF6" },
            { name: "FTSE All-World", beschreibung: "Ähnlich wie ACWI, leicht andere Gewichtung.", tag: "Alternative", color: "#6D28D9" },
          ].map(e => (
            <div key={e.name} className="l1-etf-karte" style={{ borderColor: e.color + "44" }}>
              <div className="l1-etf-top">
                <span className="l1-etf-name">{e.name}</span>
                <span className="l1-etf-tag" style={{ background: e.color + "22", color: e.color }}>{e.tag}</span>
              </div>
              <p className="l1-etf-beschreibung">{e.beschreibung}</p>
            </div>
          ))}
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} TOTAL={7} onAskAssistant={onAskAssistant} />
}

function CardLektionScreen({ lektion, onZurueck, onAbgeschlossen, onAskAssistant }) {
  const props = { lektion, onZurueck, onAbgeschlossen, onAskAssistant }
  if (lektion.id === 1)   return <L1Screen   {...props} />
  if (lektion.id === 302) return <L302Screen {...props} />
  if (lektion.id === 303) return <L303Screen {...props} />
  if (lektion.id === 304) return <L304Screen {...props} />
  if (lektion.id === 305) return <L305Screen {...props} />
  if (lektion.id === 306) return <L306Screen {...props} />
  if (lektion.id === 307) return <L307Screen {...props} />
  if (lektion.id === 308) return <L308Screen {...props} />
  if (lektion.id === 601) return <L601Screen {...props} />
  if (lektion.id === 602) return <L602Screen {...props} />
  if (lektion.id === 603) return <L603Screen {...props} />
  if (lektion.id === 604) return <L604Screen {...props} />
  if (lektion.id === 605) return <L605Screen {...props} />
  if (lektion.id === 606) return <L606Screen {...props} />
  if (lektion.id === 607) return <L607Screen {...props} />
  if (lektion.id === 608) return <L608Screen {...props} />
  if (lektion.id === 701) return <L701Screen {...props} />
  if (lektion.id === 702) return <L702Screen {...props} />
  if (lektion.id === 703) return <L703Screen {...props} />
  if (lektion.id === 704) return <L704Screen {...props} />
  if (lektion.id === 705) return <L705Screen {...props} />
  if (lektion.id === 706) return <L706Screen {...props} />
  if (lektion.id === 707) return <L707Screen {...props} />
  if (lektion.id === 708) return <L708Screen {...props} />
  if (lektion.id === 401) return <L401Screen {...props} />
  if (lektion.id === 402) return <L402Screen {...props} />
  if (lektion.id === 403) return <L403Screen {...props} />
  if (lektion.id === 404) return <L404Screen {...props} />
  if (lektion.id === 405) return <L405Screen {...props} />
  if (lektion.id === 406) return <L406Screen {...props} />
  if (lektion.id === 407) return <L407Screen {...props} />
  if (lektion.id === 408) return <L408Screen {...props} />
  if (lektion.id === 409) return <L409Screen {...props} />
  if (lektion.id === 410) return <L410Screen {...props} />
  if (lektion.id === 801) return <L801Screen {...props} />
  if (lektion.id === 802) return <L802Screen {...props} />
  if (lektion.id === 803) return <L803Screen {...props} />
  if (lektion.id === 804) return <L804Screen {...props} />
  if (lektion.id === 805) return <L805Screen {...props} />
  if (lektion.id === 806) return <L806Screen {...props} />
  if (lektion.id === 901) return <L901Screen {...props} />
  if (lektion.id === 902) return <L902Screen {...props} />
  if (lektion.id === 903) return <L903Screen {...props} />
  if (lektion.id === 904) return <L904Screen {...props} />
  if (lektion.id === 905) return <L905Screen {...props} />
  if (lektion.id === 906) return <L906Screen {...props} />
  return <L301Screen {...props} />
}

function CardShell({ lektion, onZurueck, onAbgeschlossen, renderCard, TOTAL = 8, onAskAssistant }) {
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
    if (idx === fragen[fragenIdx].richtig) {
      setRichtige(r => r + 1)
      playSound("richtig")
    } else {
      playSound("falsch")
    }
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
        <button className="zurueck-btn" onClick={() => { setPhase("cards"); setCardIdx(TOTAL - 1) }}><ArrowLeftIcon size={16}/> Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${((fragenIdx + 1) / fragen.length) * 100}%` }} />
          </div>
          <span className="lektion-progress-label">Quiz · {fragenIdx + 1} / {fragen.length}</span>
        </div>
        <p className="theorie-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><StarIcon size={14} color="#7C3AED"/> Verständnisquiz</p>
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
            <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}>
              {richtigGewaehlt ? <><CheckIcon size={16} color="#10B981"/> Richtig!</> : <><XCircleIcon size={16} color="#EF4444"/> Falsch</>}
            </p>
            {frage.erklaerung && <p className="quiz-erklaerung">{frage.erklaerung}</p>}
            <button className="weiter-btn" onClick={naechsteFrage}>
              {fragenIdx + 1 >= fragen.length ? "Ergebnis →" : "Weiter →"}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (phase === "ergebnis") {
    const alleRichtig = richtige === fragen.length
    const fastRichtig = richtige === fragen.length - 1
    const verdientXP = alleRichtig ? lektion.xp : fastRichtig ? Math.round(lektion.xp / 2) : 0
    const perfekt = alleRichtig
    return (
      <div className="screen">
        <div className="ergebnis-screen">
          <div className="ergebnis-emoji">
            {alleRichtig ? <TrophyIcon size={52} color="#EAB308"/> : <LernenIcon size={52} color="#7C3AED"/>}
          </div>
          <h1 className="ergebnis-titel">
            {alleRichtig ? "Perfekt! 🎉" : fastRichtig ? "Fast perfekt!" : "Noch einmal!"}
          </h1>
          <p className="ergebnis-sub">{richtige} von {fragen.length} Fragen richtig</p>
          {verdientXP > 0
            ? <p className="ergebnis-xp">+{verdientXP} XP</p>
            : <p className="ergebnis-sub" style={{ marginTop: "0.25rem", color: "#888" }}>Noch einmal für volle XP</p>
          }
          {richtige < fragen.length && (
            <button className="weiter-btn" style={{ marginTop: "1.5rem", background: "#2a2040", color: "#fff" }}
              onClick={() => { setPhase("cards"); setCardIdx(0); setFragenIdx(0); setGewaehlt(null); setRichtige(0) }}>
              Nochmal lesen
            </button>
          )}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button className="weiter-btn" style={{ flex: 1 }} onClick={() => onAbgeschlossen(verdientXP, perfekt)}>
              {verdientXP > 0 ? "Weiter →" : "Trotzdem weiter →"}
            </button>
            {alleRichtig && (
              <button
                className="weiter-btn"
                style={{ flex: 1, background: "#2a2040" }}
                onClick={() => navigatorTeilen(`Ich habe gerade gelernt: ${lektion.titel} 📚 #Lumio #Finanzbildung`)}
              >
                Teilen 📤
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cl-screen">
      <div className="cl-topbar">
        <button className="cl-back-btn" onClick={zurueckCard}>←</button>
        <div className="cl-dots">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button
              key={i}
              className={`cl-dot ${i === cardIdx ? "active" : i < cardIdx ? "done" : ""}`}
              onClick={() => { if (i < cardIdx) { animDirRef.current = "from-left"; setCardIdx(i) } }}
              aria-label={`Karte ${i + 1}`}
            />
          ))}
        </div>
        <span className="cl-prog-label">{cardIdx + 1} / {TOTAL}</span>
        {onAskAssistant && (
          <button className="cl-help-btn" onClick={() => onAskAssistant(`Ich lerne gerade "${lektion.titel}". Kannst du mir das Thema einfacher erklären?`)} title="Assistent fragen">?</button>
        )}
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
    if (idx === fragen[fragenIdx].richtig) {
      setRichtige(r => r + 1)
      playSound("richtig")
    } else {
      playSound("falsch")
    }
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
        <button className="zurueck-btn" onClick={() => { setPhase("cards"); setCardIdx(TOTAL - 1) }}><ArrowLeftIcon size={16}/> Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${((fragenIdx + 1) / fragen.length) * 100}%` }} />
          </div>
          <span className="lektion-progress-label">Quiz · {fragenIdx + 1} / {fragen.length}</span>
        </div>
        <p className="theorie-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><StarIcon size={14} color="#7C3AED"/> Verständnisquiz</p>
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
            <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}>{richtigGewaehlt ? <><CheckIcon size={16} color="#10B981"/> Richtig!</> : <><XCircleIcon size={16} color="#EF4444"/> Falsch!</>}</p>
            {frage.erklaerung && <p className="quiz-erklaerung">{frage.erklaerung}</p>}
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
          <div className="ergebnis-emoji">{perfekt ? <TrophyIcon size={52} color="#EAB308"/> : <LernenIcon size={52} color="#7C3AED"/>}</div>
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
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

  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L302Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [ausgaben, setAusgaben] = useState(1800)
  const notgroschenMin = ausgaben * 3
  const notgroschenOpt = ausgaben * 6
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich verlor meinen Job. Auf dem Konto: 340 €. Die nächste Miete kam in 12 Tagen."</div>
          <p className="cl-hook-sub">Markus, 29 – ein Notgroschen hätte alles geändert.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist der Notgroschen?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>Der Notgroschen ist dein <strong style={{ color: "#fff" }}>finanzielles Sicherheitsnetz</strong> – flüssiges Geld das sofort verfügbar ist wenn das Unerwartete passiert.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[["🏥","Arzt, OP, Zähne"],["🚗","Auto-Reparatur"],["💼","Jobverlust"],["🏠","Kaputte Waschmaschine"]].map(([ic,t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                <span style={{ fontSize: "1.1rem" }}>{ic}</span>
                <span style={{ color: "#ccc", fontSize: "0.85rem" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wie viel brauchst du?</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.75rem" }}>Deine monatlichen Ausgaben: <strong style={{ color: "#fff" }}>{ausgaben.toLocaleString("de")} €</strong></p>
          <input type="range" min={500} max={5000} step={100} value={ausgaben} onChange={e => setAusgaben(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(ausgaben, 500, 5000) }} />
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "10px", padding: "0.75rem", textAlign: "center", border: "1px solid #F59E0B44" }}>
              <p style={{ color: "#F59E0B", fontSize: "0.7rem", marginBottom: "0.25rem" }}>Minimum (3 Monate)</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>{notgroschenMin.toLocaleString("de")} €</p>
            </div>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "10px", padding: "0.75rem", textAlign: "center", border: "1px solid #10B98144" }}>
              <p style={{ color: "#10B981", fontSize: "0.7rem", marginBottom: "0.25rem" }}>Optimal (6 Monate)</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>{notgroschenOpt.toLocaleString("de")} €</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wo soll das Geld hin?</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { label: "Girokonto", rating: 1, color: "#ef4444", note: "0 % Zinsen" },
              { label: "Sparkonto", rating: 2, color: "#F59E0B", note: "~0,1 % Zinsen" },
              { label: "Tagesgeld", rating: 5, color: "#10B981", note: "~3 % Zinsen · tägl. verfügbar" },
              { label: "ETF", rating: 4, color: "#0EA5E9", note: "❌ kein Notgroschen!" },
            ].map((d, i) => {
              const w = (d.rating / 5) * 160
              return (
                <g key={i}>
                  <text x="5" y={22 + i * 30} fill="#888" fontSize="8" dominantBaseline="middle">{d.label}</text>
                  <rect x="75" y={13 + i * 30} width="160" height="14" rx="4" fill="#1a1a2e" />
                  <rect x="75" y={13 + i * 30} width={w} height="14" rx="4" fill={d.color} opacity="0.8" />
                  <text x="240" y={22 + i * 30} fill="#666" fontSize="6.5" dominantBaseline="middle" textAnchor="end">{d.note}</text>
                </g>
              )
            })}
          </svg>
          <p style={{ color: "#10B981", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }}>Tagesgeld = Gewinner. Täglich verfügbar + Zinsen.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Warum kein ETF für den Notgroschen?</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.5rem" }}>
            <polyline points="10,20 40,30 70,15 100,45 130,25 160,80 190,60 220,90 250,40" fill="none" stroke="#0EA5E9" strokeWidth="2" />
            <line x1="10" y1="90" x2="250" y2="90" stroke="#333" strokeWidth="1" strokeDasharray="4,4" />
            <text x="130" y="105" textAnchor="middle" fill="#ef4444" fontSize="8">Notfall? ETF steht genau hier ↓ 30 %</text>
            <circle cx="160" cy="80" r="5" fill="#ef4444" />
            <text x="160" y="75" textAnchor="middle" fill="#ef4444" fontSize="7">–30 %</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.6, marginTop: "0.5rem" }}>Börsen-Crashs kommen immer dann wenn es dir ohnehin schlecht geht. Dann <strong style={{ color: "#ef4444" }}>mit Verlust verkaufen müssen</strong> ist das Schlimmste.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Schritt für Schritt aufbauen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem" }}>
            {[
              { step: "1", title: "Ziel berechnen", desc: "3–6 × Monatsausgaben = Zielbetrag", color: "#7C3AED" },
              { step: "2", title: "Dauerauftrag einrichten", desc: "Fester Betrag automatisch aufs Tagesgeld", color: "#0EA5E9" },
              { step: "3", title: "Nicht anrühren", desc: "Kein Urlaub, kein Handy – nur echte Notfälle", color: "#10B981" },
              { step: "4", title: "Nach Notfall: Auffüllen", desc: "Zuerst Notgroschen, dann weiter investieren", color: "#F59E0B" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{s.step}</div>
                <div><p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.1rem" }}>{s.title}</p><p style={{ color: "#888", fontSize: "0.78rem" }}>{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Dein Aktionsplan:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.7 }}>
              1. Tagesgeldkonto bei DKB, ING oder Trade Republic eröffnen (kostenlos, 10 Min.)<br />
              2. Dauerauftrag: <strong style={{ color: "#fff" }}>{Math.round(ausgaben * 0.1).toLocaleString("de")} €/Monat</strong> (10 % deiner Ausgaben)<br />
              3. Ziel: <strong style={{ color: "#F59E0B" }}>{notgroschenMin.toLocaleString("de")} €</strong> in ~{Math.round(notgroschenMin / (ausgaben * 0.1))} Monaten
            </p>
          </div>
          <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.75rem", lineHeight: 1.6 }}>Erst wenn der Notgroschen steht, beginne zu investieren. Das ist Regel Nummer eins.</p>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der Notgroschen – Fundament deiner Finanzen</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p>3–6 Monatsausgaben als sofort verfügbares Polster – dein finanzielles Sicherheitsnetz</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏦</span><p>Tagesgeld: täglich verfügbar + ~3 % Zinsen – besser als Girokonto oder ETF</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Erst Notgroschen aufbauen, dann investieren – in dieser Reihenfolge immer</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L303Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [netto, setNetto] = useState(2200)
  const beduerfnisse = Math.round(netto * 0.5)
  const wuensche = Math.round(netto * 0.3)
  const sparen = Math.round(netto * 0.2)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich verdiente 2.400 € und hatte am Monatsende immer 0 €. Dann entdeckte ich die 50/30/20 Regel."</div>
          <p className="cl-hook-sub">Lena, 26 – jetzt spart sie automatisch 480 € im Monat.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die 50/30/20 Regel erklärt</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            {[
              { pct: "50 %", label: "Bedürfnisse", color: "#0EA5E9", examples: "Miete, Lebensmittel, Strom, Transport" },
              { pct: "30 %", label: "Wünsche", color: "#F59E0B", examples: "Restaurant, Kino, Urlaub, Kleidung" },
              { pct: "20 %", label: "Sparen / Investieren", color: "#10B981", examples: "Notgroschen, ETF, Schulden abbauen" },
            ].map(b => (
              <div key={b.label} style={{ background: "#1a1a2e", borderRadius: "10px", padding: "0.6rem 0.75rem", borderLeft: `3px solid ${b.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                  <span style={{ color: b.color, fontWeight: 700, fontSize: "0.9rem" }}>{b.pct} – {b.label}</span>
                </div>
                <p style={{ color: "#888", fontSize: "0.75rem" }}>{b.examples}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein persönliches 50/30/20</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.6rem" }}>Nettoeinkommen: <strong style={{ color: "#fff" }}>{netto.toLocaleString("de")} €</strong></p>
          <input type="range" min={800} max={6000} step={100} value={netto} onChange={e => setNetto(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(netto, 800, 6000) }} />
          <svg viewBox="0 0 260 60" style={{ width: "100%", marginTop: "0.75rem" }}>
            <rect x="10" y="15" width={120} height="30" rx="4" fill="#0EA5E9" opacity="0.8" />
            <text x="70" y="34" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">{beduerfnisse.toLocaleString("de")} €</text>
            <rect x="133" y="15" width={72} height="30" rx="4" fill="#F59E0B" opacity="0.8" />
            <text x="169" y="34" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">{wuensche.toLocaleString("de")} €</text>
            <rect x="208" y="15" width={48} height="30" rx="4" fill="#10B981" opacity="0.8" />
            <text x="232" y="34" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">{sparen.toLocaleString("de")} €</text>
            <text x="70" y="58" textAnchor="middle" fill="#0EA5E9" fontSize="7">Bedürfnisse</text>
            <text x="169" y="58" textAnchor="middle" fill="#F59E0B" fontSize="7">Wünsche</text>
            <text x="232" y="58" textAnchor="middle" fill="#10B981" fontSize="7">Sparen</text>
          </svg>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Pay Yourself First</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>Die meisten Menschen sparen was <strong style={{ color: "#ef4444" }}>übrig bleibt</strong>. Das Ergebnis: meistens nichts.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div style={{ background: "#ef444422", borderRadius: "8px", padding: "0.6rem 0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span>❌</span>
              <p style={{ color: "#fca5a5", fontSize: "0.82rem" }}>Einkommen → ausgeben → was übrig bleibt sparen</p>
            </div>
            <div style={{ background: "#10B98122", borderRadius: "8px", padding: "0.6rem 0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span>✅</span>
              <p style={{ color: "#6ee7b7", fontSize: "0.82rem" }}>Einkommen → sofort <strong>20 % Dauerauftrag</strong> → mit dem Rest leben</p>
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.82rem", marginTop: "0.75rem", lineHeight: 1.6 }}>Am Monatsanfang: <strong style={{ color: "#10B981" }}>{sparen.toLocaleString("de")} € automatisch</strong> aufs Spar-/Investmentkonto. Fertig.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was zählt als Bedürfnis vs. Wunsch?</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ flex: 1, background: "#0EA5E922", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#0EA5E9", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.4rem" }}>Bedürfnisse</p>
              {["Miete/Hypothek","Strom & Heizung","Lebensmittel","Krankenvers.","ÖPNV/Auto"].map(i => <p key={i} style={{ color: "#aaa", fontSize: "0.75rem", lineHeight: 1.6 }}>• {i}</p>)}
            </div>
            <div style={{ flex: 1, background: "#F59E0B22", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#F59E0B", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.4rem" }}>Wünsche</p>
              {["Restaurant","Streaming","Urlaub","Kleidung extra","Hobbys"].map(i => <p key={i} style={{ color: "#aaa", fontSize: "0.75rem", lineHeight: 1.6 }}>• {i}</p>)}
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.6rem" }}>Handy-Basisvertrag = Bedürfnis. Das neueste iPhone = Wunsch.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">50/30/20 anpassen – ist das OK?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Die Regel ist ein <strong style={{ color: "#fff" }}>Startpunkt</strong>, kein Gesetz. Hohe Miete? 60/20/20. Hohes Einkommen? 40/20/40.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#7C3AED", fontSize: "0.8rem", fontWeight: 700 }}>Mindestanforderung</p>
              <p style={{ color: "#ccc", fontSize: "0.78rem" }}>Mindestens 10–15 % sparen/investieren. Darunter wird Vermögensaufbau sehr schwer.</p>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#10B981", fontSize: "0.8rem", fontWeight: 700 }}>Optimal</p>
              <p style={{ color: "#ccc", fontSize: "0.78rem" }}>20 %+ sparen und 10–15 % Wünsche kürzen – beschleunigt Vermögensaufbau erheblich.</p>
            </div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Dein 3-Schritte-Plan:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Dauerauftrag einrichten: <strong style={{ color: "#fff" }}>{sparen.toLocaleString("de")} €</strong> am 1. des Monats aufs Sparkonto<br />
              2. Budget-Check: Bedürfnisse unter {beduerfnisse.toLocaleString("de")} €?<br />
              3. Wünsche-Limit: max. {wuensche.toLocaleString("de")} € für alles "Schöne"
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">50/30/20 – dein Finanz-Framework</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚖️</span><p>50 % Bedürfnisse · 30 % Wünsche · 20 % Sparen – einfache Leitlinie</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🤖</span><p>Pay Yourself First: Sparbetrag am Monatsanfang automatisch überweisen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔧</span><p>Regel anpassen erlaubt – Mindestens 10–15 % sparen ist nicht verhandelbar</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L304Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [kaffee, setKaffee] = useState(3.5)
  const [streaming, setStreaming] = useState(45)
  const jahresKaffee = Math.round(kaffee * 365)
  const jahresStreaming = streaming * 12
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich dachte ich gebe 200 €/Monat für Sonstiges aus. Es waren 480 €. Jeden. Monat."</div>
          <p className="cl-hook-sub">Anna, 31 – jetzt trackt sie jeden Cent und spart 280 € mehr im Monat.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der Unterschätzungs-Effekt</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            <rect x="30" y="40" width="80" height="70" rx="6" fill="#0EA5E9" opacity="0.8" />
            <text x="70" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">200 €</text>
            <text x="70" y="100" textAnchor="middle" fill="white" fontSize="7">Geschätzt</text>
            <rect x="150" y="10" width="80" height="100" rx="6" fill="#ef4444" opacity="0.8" />
            <text x="190" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">480 €</text>
            <text x="190" y="80" textAnchor="middle" fill="white" fontSize="7">Tatsächlich</text>
            <text x="130" y="125" textAnchor="middle" fill="#888" fontSize="8">Menschen unterschätzen Ausgaben im Schnitt um 40 %</text>
          </svg>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die versteckten Kosten</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Täglicher Kaffee: <strong style={{ color: "#fff" }}>{kaffee.toFixed(2)} €</strong> → <strong style={{ color: "#F59E0B" }}>{jahresKaffee.toLocaleString("de")} €/Jahr</strong></p>
          <input type="range" min={1} max={8} step={0.5} value={kaffee} onChange={e => setKaffee(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(kaffee, 1, 8) }} />
          <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.75rem", marginBottom: "0.5rem" }}>Streaming/Abo/Monat: <strong style={{ color: "#fff" }}>{streaming} €</strong> → <strong style={{ color: "#F59E0B" }}>{jahresStreaming.toLocaleString("de")} €/Jahr</strong></p>
          <input type="range" min={10} max={150} step={5} value={streaming} onChange={e => setStreaming(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(streaming, 10, 150) }} />
          <p style={{ color: "#10B981", fontSize: "0.82rem", marginTop: "0.75rem", fontWeight: 600 }}>Zusammen: {(jahresKaffee + jahresStreaming).toLocaleString("de")} €/Jahr – unbemerkt.</p>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">3 Tracking-Methoden</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            {[
              { title: "📱 App-Tracking", desc: "finanzguru, YNAB, Money Manager – automatischer Bankimport", gut: true },
              { title: "📝 Excel/Sheets", desc: "Manuell eintragen – mehr Bewusstsein, mehr Aufwand", gut: true },
              { title: "✉️ Envelope-Methode", desc: "Bargeld in beschriftete Umschläge (Lebensmittel, Freizeit…)", gut: true },
            ].map(m => (
              <div key={m.title} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
                <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>{m.title}</p>
                <p style={{ color: "#888", fontSize: "0.78rem" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die häufigsten Ausgaben-Fallen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              ["📱","Ungenutzte Abos","~45 €/Monat"],
              ["🚗","Bankgebühren","~8 €/Monat"],
              ["☕","Kaffeekäufe","~60 €/Monat"],
              ["🛒","Spontankäufe online","~85 €/Monat"],
              ["🎮","Mikrotransaktionen","~30 €/Monat"],
            ].map(([ic, name, val]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ fontSize: "0.85rem" }}>{ic} <span style={{ color: "#ccc" }}>{name}</span></span>
                <span style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.82rem" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der Opportunitätskosteneffekt</h2>
          <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.85rem" }}>180 €/Monat gespart statt verausgabt. In einem ETF bei 7 % über 20 Jahre:</p>
          <div className="cl-kaffee-ergebnis" style={{ marginTop: "0.75rem" }}>
            <div className="cl-kaffee-zeile"><span className="cl-kaffee-wert">43.200 €</span><span>nur Einzahlungen</span></div>
            <div className="cl-kaffee-zeile"><span className="cl-kaffee-wert cl-kaffee-big" style={{ color: "#10B981" }}>~92.000 €</span><span>mit Zinseszins</span></div>
          </div>
          <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.75rem" }}>Jeder unbemerkte Euro den du abonnierst ist ein Euro weniger Vermögen.</p>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #0EA5E933" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>30-Tage-Challenge:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              Woche 1: App installieren + Konto verknüpfen<br />
              Woche 2: Alle Kategorien labeln<br />
              Woche 3: Überraschungen finden<br />
              Woche 4: 1 Kategorie aktiv kürzen
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Ausgaben tracken – Bewusstsein schafft Vermögen</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔍</span><p>Menschen unterschätzen Ausgaben um bis zu 40 % – Tracking bringt die Wahrheit</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📱</span><p>App, Excel oder Umschläge – die Methode ist egal, Hauptsache tun</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💸</span><p>180 €/Monat weniger ausgeben = ~92.000 € mehr nach 20 Jahren</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L305Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [schuld1, setSchuld1] = useState(1500)
  const [zins1] = useState(20)
  const jahreszins1 = Math.round(schuld1 * zins1 / 100)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich zahlte 3 Jahre lang die Mindestraten. Die Schuld war danach größer als vorher."</div>
          <p className="cl-hook-sub">Tim, 34 – Kreditkartenfalle mit 22 % Zinsen.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Gute vs. schlechte Schulden</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ flex: 1, background: "#10B98122", borderRadius: "8px", padding: "0.6rem", borderTop: "2px solid #10B981" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.4rem" }}>Gute Schulden</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem", lineHeight: 1.6 }}>• Bildungskredit<br />• Immobilienfinanzierung<br />• Unternehmenskredit<br /><span style={{ color: "#888" }}>→ Investition in Zukunft</span></p>
            </div>
            <div style={{ flex: 1, background: "#ef444422", borderRadius: "8px", padding: "0.6rem", borderTop: "2px solid #ef4444" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.8rem", marginBottom: "0.4rem" }}>Schlechte Schulden</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem", lineHeight: 1.6 }}>• Kreditkarten (20 %+)<br />• Ratenkredite f. Konsum<br />• Dispokredit (10–15 %)<br /><span style={{ color: "#888" }}>→ Konsum auf Kredit</span></p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was kosten deine Schulden wirklich?</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Kreditkartenschuld: <strong style={{ color: "#fff" }}>{schuld1.toLocaleString("de")} €</strong> bei {zins1} % Zinsen</p>
          <input type="range" min={200} max={10000} step={100} value={schuld1} onChange={e => setSchuld1(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(schuld1, 200, 10000) }} />
          <div style={{ marginTop: "0.75rem", background: "#ef444422", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
            <p style={{ color: "#ef4444", fontSize: "0.8rem" }}>Zinslast pro Jahr</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem" }}>{jahreszins1.toLocaleString("de")} €</p>
            <p style={{ color: "#888", fontSize: "0.75rem" }}>Das ist Geld das einfach verbrennt</p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Avalanche vs. Snowball</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ background: "#0EA5E922", borderRadius: "8px", padding: "0.6rem 0.75rem", borderLeft: "3px solid #0EA5E9" }}>
              <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.85rem" }}>❄️ Avalanche (empfohlen)</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.5, marginTop: "0.2rem" }}>Höchste Zinsen zuerst → spart am meisten Geld insgesamt</p>
            </div>
            <div style={{ background: "#7C3AED22", borderRadius: "8px", padding: "0.6rem 0.75rem", borderLeft: "3px solid #7C3AED" }}>
              <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem" }}>⛄ Snowball</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.5, marginTop: "0.2rem" }}>Kleinste Schuld zuerst → mehr Motivation durch schnelle Erfolge</p>
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.6rem" }}>Mathematisch gewinnt Avalanche. Psychologisch kann Snowball effektiver sein.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Mindestrate-Falle</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">2.000 € bei 20 % Zinsen, nur 2 % Mindestrate</text>
            {[
              { jahr: "Heute", rest: 2000, x: 20 },
              { jahr: "5 J.", rest: 1800, x: 66 },
              { jahr: "10 J.", rest: 1400, x: 112 },
              { jahr: "15 J.", rest: 800, x: 158 },
              { jahr: "16 J.", rest: 0, x: 204 },
            ].map((d, i) => {
              const h = (d.rest / 2000) * 80
              return (
                <g key={i}>
                  <rect x={d.x} y={100 - h} width="34" height={h} rx="3" fill="#ef4444" opacity={0.4 + i * 0.1} />
                  <text x={d.x + 17} y={95 - h} textAnchor="middle" fill="#fca5a5" fontSize="7">{d.rest > 0 ? d.rest + "€" : "✓"}</text>
                  <text x={d.x + 17} y="112" textAnchor="middle" fill="#888" fontSize="7">{d.jahr}</text>
                </g>
              )
            })}
          </svg>
          <p style={{ color: "#ef4444", fontSize: "0.8rem", textAlign: "center" }}>16 Jahre. Über 3.800 € Zinsen gezahlt für 2.000 € Schuld.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Schuldenfreiheit als Investition</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>
            Kreditkartenschuld bei 20 % tilgen = <strong style={{ color: "#10B981" }}>20 % garantierte Rendite</strong>.
            Kein ETF schlägt das risikobereinigt.
          </p>
          <div style={{ marginTop: "0.75rem", background: "#1a1a2e", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.5rem" }}>Prioritäten:</p>
            {["1. Notgroschen (1 Monat Minimum)", "2. Hochzinsschulden (>7 %) tilgen", "3. Notgroschen auf 3–6 Monate ausbauen", "4. Langfristig investieren (ETF)"].map((s, i) => (
              <p key={i} style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: 1.8 }}>✓ {s}</p>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #ef444433" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Schulden-Audit heute:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Alle Schulden + Zinssätze auflisten<br />
              2. Höchsten Zinssatz identifizieren<br />
              3. Nur Mindestrate auf alle anderen<br />
              4. Jeden freien Euro auf Schuld #1
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Schulden strategisch abbauen</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">❄️</span><p>Avalanche: höchste Zinsen zuerst – mathematisch optimal und spart am meisten</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💸</span><p>20 % Kreditkartenzinsen tilgen = 20 % garantierte Rendite – kein ETF schlägt das</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Mindestrate-Falle: 2.000 € Schuld kann 16 Jahre und 3.800 € Zinsen kosten</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L306Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [ziel, setZiel] = useState(3600)
  const [monate, setMonate] = useState(18)
  const monatlich = Math.round(ziel / monate)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich wollte 'irgendwann' sparen. Mit SMART-Zielen sparte ich in 14 Monaten 4.200 €."</div>
          <p className="cl-hook-sub">Sofia, 27 – ihr erstes konkretes Sparziel veränderte alles.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein SMART-Ziel?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { letter: "S", word: "Spezifisch", desc: '"3.600 € für Urlaub Japan"', color: "#7C3AED" },
              { letter: "M", word: "Messbar", desc: "In Euro bezifferbar", color: "#0EA5E9" },
              { letter: "A", word: "Attraktiv", desc: "Persönlich bedeutsam", color: "#F59E0B" },
              { letter: "R", word: "Realistisch", desc: "Im Rahmen deines Einkommens", color: "#10B981" },
              { letter: "T", word: "Terminiert", desc: '"bis Sommer 2026"', color: "#ef4444" },
            ].map(s => (
              <div key={s.letter} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "6px", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem", color: "#fff", flexShrink: 0 }}>{s.letter}</div>
                <div><span style={{ color: "#fff", fontWeight: 600, fontSize: "0.82rem" }}>{s.word}: </span><span style={{ color: "#888", fontSize: "0.8rem" }}>{s.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein Sparplan-Rechner</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.4rem" }}>Sparziel: <strong style={{ color: "#fff" }}>{ziel.toLocaleString("de")} €</strong></p>
          <input type="range" min={500} max={20000} step={100} value={ziel} onChange={e => setZiel(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(ziel, 500, 20000) }} />
          <p style={{ color: "#888", fontSize: "0.8rem", margin: "0.75rem 0 0.4rem" }}>Zeitraum: <strong style={{ color: "#fff" }}>{monate} Monate</strong></p>
          <input type="range" min={3} max={60} step={1} value={monate} onChange={e => setMonate(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(monate, 3, 60) }} />
          <div style={{ marginTop: "1rem", background: "#10B98122", borderRadius: "10px", padding: "0.75rem", textAlign: "center", border: "1px solid #10B98144" }}>
            <p style={{ color: "#10B981", fontSize: "0.8rem" }}>Monatlich sparen</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.6rem" }}>{monatlich.toLocaleString("de")} €</p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Automatisch sparen = garantiert sparen</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Dauerauftrag am Zahltag einrichten. Das Geld ist weg bevor du es ausgeben kannst.</p>
          <svg viewBox="0 0 260 100" style={{ width: "100%", marginTop: "0.75rem" }}>
            <rect x="10" y="30" width="70" height="40" rx="8" fill="#1a1a2e" stroke="#7C3AED" strokeWidth="1.5" />
            <text x="45" y="52" textAnchor="middle" fill="#7C3AED" fontSize="8" fontWeight="700">Gehalt</text>
            <text x="45" y="63" textAnchor="middle" fill="#888" fontSize="7">z.B. 2.200 €</text>
            <line x1="80" y1="50" x2="110" y2="50" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="4,3" />
            <text x="95" y="44" textAnchor="middle" fill="#10B981" fontSize="7">Auto</text>
            <rect x="110" y="30" width="70" height="40" rx="8" fill="#1a1a2e" stroke="#10B981" strokeWidth="1.5" />
            <text x="145" y="49" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="700">Sparkonto</text>
            <text x="145" y="61" textAnchor="middle" fill="#888" fontSize="7">{monatlich.toLocaleString("de")} €/Mon</text>
            <line x1="180" y1="50" x2="210" y2="50" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="4,3" />
            <rect x="210" y="30" width="42" height="40" rx="8" fill="#1a1a2e" stroke="#0EA5E9" strokeWidth="1.5" />
            <text x="231" y="49" textAnchor="middle" fill="#0EA5E9" fontSize="7" fontWeight="700">Rest</text>
            <text x="231" y="61" textAnchor="middle" fill="#888" fontSize="6.5">für Leben</text>
          </svg>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Mehrere Ziele gleichzeitig</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { name: "Notgroschen", ziel: 5400, aktuell: 5400, color: "#10B981" },
              { name: "Urlaub Japan", ziel: 3600, aktuell: 2100, color: "#F59E0B" },
              { name: "Laptop", ziel: 1200, aktuell: 400, color: "#0EA5E9" },
              { name: "ETF-Rücklage", ziel: 10000, aktuell: 1800, color: "#7C3AED" },
            ].map(z => {
              const pct = Math.round((z.aktuell / z.ziel) * 100)
              return (
                <div key={z.name} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                    <span style={{ color: "#ccc", fontSize: "0.78rem" }}>{z.name}</span>
                    <span style={{ color: z.color, fontSize: "0.75rem", fontWeight: 600 }}>{pct} %</span>
                  </div>
                  <div style={{ background: "#0d1117", borderRadius: "4px", height: "6px" }}>
                    <div style={{ width: `${pct}%`, height: "6px", borderRadius: "4px", background: z.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Ziele schriftlich festhalten</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Studien zeigen: <strong style={{ color: "#fff" }}>schriftliche Ziele</strong> werden mit 42 % höherer Wahrscheinlichkeit erreicht.</p>
          <div style={{ background: "#1a1a2e", borderRadius: "10px", padding: "0.75rem", marginTop: "0.75rem", border: "1px dashed #333" }}>
            <p style={{ color: "#7C3AED", fontSize: "0.8rem", fontWeight: 700 }}>Vorlage:</p>
            <p style={{ color: "#ccc", fontSize: "0.82rem", lineHeight: 1.8, marginTop: "0.25rem" }}>
              "Ich spare {monatlich} € monatlich per Dauerauftrag um bis [Datum] {ziel.toLocaleString("de")} € für [Ziel] zu haben."
            </p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #7C3AED33" }}>
            <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Heute:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Ein SMART-Ziel formulieren + aufschreiben<br />
              2. Betrag berechnen: Ziel ÷ Monate = {monatlich} €/Monat<br />
              3. Extra-Sparkonto eröffnen (kostenlos)<br />
              4. Dauerauftrag einrichten – fertig
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">SMART-Sparziele – konkret statt vage</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>SMART: Spezifisch · Messbar · Attraktiv · Realistisch · Terminiert</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🤖</span><p>Dauerauftrag = einmal einrichten, automatisch sparen – kein Willenskraft nötig</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📝</span><p>Schriftliche Ziele werden 42 % häufiger erreicht – einfach notieren</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L307Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [inflation, setInflation] = useState(3)
  const jahre10 = Math.round(10000 * Math.pow(1 - inflation / 100, 10))
  const jahre20 = Math.round(10000 * Math.pow(1 - inflation / 100, 20))
  const rule70 = Math.round(70 / inflation)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"10.000 € auf dem Sparbuch – ich dachte ich bin sicher. 10 Jahre später kaufte ich damit 18 % weniger."</div>
          <p className="cl-hook-sub">Klaus, 45 – Inflation frisst stille und leise.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist Inflation?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.9rem" }}>Inflation bedeutet: Preise steigen, die <strong style={{ color: "#ef4444" }}>Kaufkraft deines Geldes sinkt</strong>. Für denselben Euro bekommst du weniger.</p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, textAlign: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#10B981", fontSize: "0.7rem" }}>2014</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>100 €</p>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>= voller Warenkorb</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "#888", fontSize: "1.2rem" }}>→</div>
            <div style={{ flex: 1, textAlign: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#ef4444", fontSize: "0.7rem" }}>2024</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>100 €</p>
              <p style={{ color: "#ef4444", fontSize: "0.7rem" }}>= ~75 % desselben</p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kaufkraftverlust bei {inflation} % Inflation</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.6rem" }}>Inflationsrate: <strong style={{ color: "#fff" }}>{inflation} %</strong></p>
          <input type="range" min={1} max={10} step={0.5} value={inflation} onChange={e => setInflation(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(inflation, 1, 10) }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <div style={{ flex: 1, textAlign: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>Nach 10 Jahren</p>
              <p style={{ color: jahre10 > 8000 ? "#F59E0B" : "#ef4444", fontWeight: 700, fontSize: "1.1rem" }}>{jahre10.toLocaleString("de")} €</p>
              <p style={{ color: "#666", fontSize: "0.7rem" }}>Kaufkraft von 10.000 €</p>
            </div>
            <div style={{ flex: 1, textAlign: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>Nach 20 Jahren</p>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "1.1rem" }}>{jahre20.toLocaleString("de")} €</p>
              <p style={{ color: "#666", fontSize: "0.7rem" }}>Kaufkraft von 10.000 €</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Rule of 70</h2>
          <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.88rem" }}>Faustregel: <strong style={{ color: "#fff" }}>70 ÷ Inflationsrate</strong> = Jahre bis zur Halbierung der Kaufkraft</p>
          <div style={{ marginTop: "0.75rem", background: "#ef444422", borderRadius: "10px", padding: "0.75rem", textAlign: "center", border: "1px solid #ef444444" }}>
            <p style={{ color: "#ef4444", fontSize: "0.8rem" }}>Bei {inflation} % Inflation: Kaufkraft halbiert sich in</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.6rem" }}>{rule70} Jahren</p>
            <p style={{ color: "#888", fontSize: "0.75rem" }}>70 ÷ {inflation} = {rule70}</p>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Tagesgeld schlägt Inflation nicht</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">10.000 € über 20 Jahre</text>
            <polyline points="10,100 60,95 110,90 160,85 210,80 260,75" fill="none" stroke="#888" strokeWidth="1.5" strokeDasharray="4,3" />
            <polyline points="10,100 60,108 110,117 160,110 210,105 260,90" fill="none" stroke="#F59E0B" strokeWidth="2" />
            <polyline points="10,100 60,85 110,68 160,50 210,32 260,15" fill="none" stroke="#10B981" strokeWidth="2" />
            <text x="265" y="78" fill="#888" fontSize="6.5" dominantBaseline="middle">Inflation</text>
            <text x="265" y="93" fill="#F59E0B" fontSize="6.5" dominantBaseline="middle">Tagesgeld</text>
            <text x="265" y="18" fill="#10B981" fontSize="6.5" dominantBaseline="middle">ETF ~7 %</text>
          </svg>
          <p style={{ color: "#888", fontSize: "0.78rem", textAlign: "center" }}>ETF schlägt Inflation langfristig zuverlässig.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was schützt vor Inflation?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { asset: "Aktien/ETFs", schutz: "Sehr gut", color: "#10B981", note: "Unternehmen passen Preise an" },
              { asset: "Immobilien", schutz: "Gut", color: "#0EA5E9", note: "Sachwert + steigende Mieten" },
              { asset: "Tagesgeld", schutz: "Teilweise", color: "#F59E0B", note: "Nur wenn Zins ≥ Inflation" },
              { asset: "Girokonto", schutz: "Schlecht", color: "#ef4444", note: "0 % Zinsen, 100 % Verlust" },
            ].map(a => (
              <div key={a.asset} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <div><p style={{ color: "#ccc", fontSize: "0.82rem" }}>{a.asset}</p><p style={{ color: "#666", fontSize: "0.72rem" }}>{a.note}</p></div>
                <span style={{ color: a.color, fontWeight: 700, fontSize: "0.78rem" }}>{a.schutz}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #F59E0B33" }}>
            <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Anti-Inflations-Strategie:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Notgroschen auf Tagesgeld (Inflation minimieren)<br />
              2. Langfristig in ETFs investieren (Inflation schlagen)<br />
              3. Girokonto nur für laufende Ausgaben nutzen<br />
              4. Gehalt regelmäßig verhandeln (Inflationsausgleich)
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Inflation – der stille Vermögensfresser</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Bei 3 % Inflation verliert 10.000 € auf dem Girokonto in 10 Jahren ~{(10000 - jahre10).toLocaleString("de")} € Kaufkraft</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">70</span><p>Rule of 70: Inflationsrate ÷ 70 = Jahre bis zur Kaufkraft-Halbierung</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📈</span><p>ETFs schlagen Inflation langfristig – Girokonto und Sparbuch nicht</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L308Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [schritt, setSchritt] = useState(0)
  const schritte = [
    { done: true,  label: "Notgroschen (3 Monate)", color: "#10B981" },
    { done: false, label: "Hochzinsschulden tilgen", color: "#F59E0B" },
    { done: false, label: "Notgroschen auf 6 Monate", color: "#0EA5E9" },
    { done: false, label: "ETF-Sparplan starten", color: "#7C3AED" },
    { done: false, label: "bAV & Steuer optimieren", color: "#ec4899" },
  ]
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich hatte Tagesgeld, ETF, Schulden und keinen Notgroschen – alles gleichzeitig. Das kostet Rendite."</div>
          <p className="cl-hook-sub">David, 33 – die richtige Reihenfolge macht den Unterschied.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Finanzpyramide</h2>
          <svg viewBox="0 0 260 160" style={{ width: "100%", marginTop: "0.5rem" }}>
            <polygon points="130,10 10,150 250,150" fill="none" stroke="#333" strokeWidth="1" />
            <line x1="40" y1="110" x2="220" y2="110" stroke="#333" strokeWidth="0.5" />
            <line x1="70" y1="70" x2="190" y2="70" strokeWidth="0.5" stroke="#333" />
            <line x1="100" y1="42" x2="160" y2="42" strokeWidth="0.5" stroke="#333" />
            <text x="130" y="145" textAnchor="middle" fill="#10B981" fontSize="8.5" fontWeight="700">Notgroschen + Basis-Versicherungen</text>
            <text x="130" y="105" textAnchor="middle" fill="#F59E0B" fontSize="8">Schulden tilgen (Hochzins)</text>
            <text x="130" y="65" textAnchor="middle" fill="#0EA5E9" fontSize="7.5">ETFs / Altersvorsorge</text>
            <text x="130" y="38" textAnchor="middle" fill="#7C3AED" fontSize="7">Steuer optimieren</text>
            <text x="130" y="22" textAnchor="middle" fill="#ec4899" fontSize="6.5">Avanciert</text>
          </svg>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein Finanzplan – Schritt für Schritt</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {schritte.map((s, i) => (
              <div key={i} onClick={() => setSchritt(i)} style={{ display: "flex", alignItems: "center", gap: "0.6rem", background: schritt === i ? "#1a1a2e" : "#0d1117", borderRadius: "8px", padding: "0.55rem 0.75rem", border: schritt === i ? `1px solid ${s.color}44` : "1px solid transparent", cursor: "pointer" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: s.done ? s.color : "#1a1a2e", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.done && <span style={{ color: "#fff", fontSize: "0.6rem" }}>✓</span>}
                </div>
                <span style={{ color: s.done ? s.color : "#888", fontSize: "0.82rem" }}>{i + 1}. {s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Warum Reihenfolge wichtig ist</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Beispiel: Lisa investiert in ETFs bevor sie 15 %-Schulden tilgt. Sie erzielt 7 % Rendite und zahlt gleichzeitig 15 % Zinsen.</p>
          <div style={{ marginTop: "0.75rem", background: "#ef444422", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
            <p style={{ color: "#ef4444", fontSize: "0.82rem" }}>Netto-Effekt:</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>–8 % p.a.</p>
            <p style={{ color: "#888", fontSize: "0.75rem" }}>7 % Rendite – 15 % Zinsen = Verlust</p>
          </div>
          <p style={{ color: "#10B981", fontSize: "0.82rem", marginTop: "0.6rem" }}>Erst Hochzinsschulden tilgen, dann investieren = garantiert besseres Ergebnis.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was eine gute Basis aussieht</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              ["✅", "Haftpflichtversicherung", "~5 €/Monat"],
              ["✅", "Notgroschen (3–6 Monate)", "sofort verfügbar"],
              ["✅", "Keine Hochzinsschulden", ">7 % Zinsen"],
              ["✅", "Freistellungsauftrag gestellt", "1.000 €/Jahr"],
              ["✅", "ETF-Sparplan aktiv", "ab 25 €/Monat"],
            ].map(([ic, name, note]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#10B98111", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ color: "#ccc", fontSize: "0.82rem" }}>{ic} {name}</span>
                <span style={{ color: "#10B981", fontSize: "0.75rem" }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Häufige Fehler vermeiden</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { fehler: "Zu früh zu komplex", loesung: "Erst einfach anfangen – World-ETF reicht für den Start" },
              { fehler: "Alles auf einmal", loesung: "Eine Stufe nach der anderen – Pyramide von unten aufbauen" },
              { fehler: "Zu lange warten", loesung: "Perfekt ist der Feind von gut – mit 50 €/Monat starten" },
              { fehler: "Einzelaktien vor ETF", loesung: "ETF-Basis zuerst, dann optionale Einzelaktien" },
            ].map(f => (
              <div key={f.fehler} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                <p style={{ color: "#ef4444", fontSize: "0.78rem" }}>❌ {f.fehler}</p>
                <p style={{ color: "#10B981", fontSize: "0.78rem" }}>✅ {f.loesung}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Dein Finanzplan-Check heute:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Notgroschen vorhanden? (min. 1 Monat)<br />
              2. Hochzinsschulden (&gt;7 %) identifiziert?<br />
              3. Haftpflichtversicherung aktiv?<br />
              4. Freistellungsauftrag gestellt?<br />
              5. Sparplan eingerichtet?
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein persönlicher Finanzplan</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏗️</span><p>Reihenfolge: Notgroschen → Schulden → Investieren – nicht umgekehrt</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚡</span><p>Hochzinsschulden tilgen = garantierte Rendite – besser als jeder ETF</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Finanzpyramide: Basis zuerst – Komplexität erst wenn das Fundament steht</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L604Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [gebuehr, setGebuehr] = useState(7.9)
  const jahresKosten = Math.round(gebuehr * 12)
  const kosten10J = jahresKosten * 10
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"8 Jahre lang zahlte ich 7,90 €/Monat für ein Konto das ich kostenlos haben könnte. Das sind 758 €."</div>
          <p className="cl-hook-sub">Sandra, 30 – ein 10-Minuten-Wechsel hätte es verhindert.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was kostet dein Konto wirklich?</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Monatliche Kontogebühr: <strong style={{ color: "#fff" }}>{gebuehr.toFixed(2)} €</strong></p>
          <input type="range" min={0} max={20} step={0.5} value={gebuehr} onChange={e => setGebuehr(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(gebuehr, 0, 20) }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>Pro Jahr</p>
              <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "1.2rem" }}>{jahresKosten} €</p>
            </div>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>10 Jahre</p>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "1.2rem" }}>{kosten10J} €</p>
            </div>
          </div>
          {gebuehr === 0 && <p style={{ color: "#10B981", fontSize: "0.82rem", marginTop: "0.6rem", textAlign: "center" }}>Super – du zahlst bereits nichts!</p>}
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kostenlose Girokonten im Vergleich</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { bank: "DKB", gebühr: "0 €", bedingung: "Aktives Konto", besonderheit: "Visa-Karte weltweit kostenlos" },
              { bank: "ING", gebühr: "0 €", bedingung: "700 €/Monat Eingang", besonderheit: "Große Markenbank" },
              { bank: "Trade Republic", gebühr: "0 €", bedingung: "Keine", besonderheit: "3 % Zinsen auf Guthaben" },
              { bank: "Consorsbank", gebühr: "0 €", bedingung: "700 €/Monat Eingang", besonderheit: "Depot inklusive" },
            ].map(b => (
              <div key={b.bank} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>{b.bank}</span>
                  <span style={{ color: "#10B981", fontWeight: 700, fontSize: "0.82rem" }}>{b.gebühr}</span>
                </div>
                <p style={{ color: "#666", fontSize: "0.72rem", marginTop: "0.1rem" }}>{b.bedingung} · {b.besonderheit}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Worauf bei "kostenlosen" Konten achten?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            {[
              { punkt: "Mindestgeldeingang", detail: "Oft 500–700 €/Monat erforderlich – sonst Gebühren", warn: true },
              { punkt: "Girokarten-Gebühren", detail: "Manche verlangen Jahresgebühr für EC-/Kreditkarte", warn: true },
              { punkt: "Überziehungszinsen", detail: "Auch kostenlose Konten haben teuren Dispo (10–15 %)", warn: true },
              { punkt: "Einlagensicherung", detail: "Alle deutschen Banken: 100.000 € gesetzlich gesichert", warn: false },
            ].map(p => (
              <div key={p.punkt} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem", borderLeft: `3px solid ${p.warn ? "#F59E0B" : "#10B981"}` }}>
                <p style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>{p.warn ? "⚠️" : "✅"} {p.punkt}</p>
                <p style={{ color: "#888", fontSize: "0.75rem" }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Girokonto-Wechsel: So einfach geht's</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            {[
              { step: "1", desc: "Neues Konto online beantragen (10 Min.)", color: "#7C3AED" },
              { step: "2", desc: "Video-Ident oder Post-Ident legitimieren", color: "#0EA5E9" },
              { step: "3", desc: "Daueraufträge + Lastschriften umstellen", color: "#F59E0B" },
              { step: "4", desc: "Altes Konto kündigen (Banken helfen seit 2016 gesetzlich)", color: "#10B981" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{s.step}</div>
                <p style={{ color: "#ccc", fontSize: "0.82rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Zusatzleistungen die sich lohnen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              ["💳", "Kreditkarte ohne Auslandsgebühr", "Spart 1,75 % bei Auslandszahlungen"],
              ["🏦", "Tagesgeld integriert", "Direkt verzinstes Unterkonto"],
              ["📊", "Ausgaben-Kategorisierung", "Automatisches Tracking"],
              ["🔔", "Push-Benachrichtigungen", "Sofort über Buchungen informiert"],
            ].map(([ic, feat, note]) => (
              <div key={feat} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ fontSize: "1rem" }}>{ic}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{feat}</p><p style={{ color: "#666", fontSize: "0.72rem" }}>{note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Dein 10-Minuten-Wechsel:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Kontogebühr prüfen (Kontoauszug)<br />
              2. DKB, ING oder Trade Republic vergleichen<br />
              3. Konto online eröffnen<br />
              4. Spart {jahresKosten} €/Jahr sofort
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Girokonto optimieren – einfaches Geld</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💶</span><p>Filialbank-Girokonto kostet 60–120 €/Jahr – kostenlose Alternativen genauso gut</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Bei "kostenlosen" Konten: Mindestgeldeingang und Dispo-Zinsen prüfen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔄</span><p>Wechsel dauert ~10 Minuten – Banken sind seit 2016 gesetzlich zur Wechselhilfe verpflichtet</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L605Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [schuld, setSchuld] = useState(2000)
  const [zins] = useState(20)
  const mindestRate = Math.round(schuld * 0.02)
  const jahreAbzahlung = Math.ceil(Math.log(1 - (schuld * (zins / 100 / 12)) / mindestRate) / Math.log(1 + zins / 100 / 12) * -1 / 12)
  const gesamtKosten = Math.round(mindestRate * jahreAbzahlung * 12)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich dachte die Kreditkarte wäre für Notfälle. Drei Jahre Mindestraten später – die Schuld war noch da."</div>
          <p className="cl-hook-sub">Mike, 28 – 2.000 € die sich nie abbezahlten.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wie Kreditkarten-Zinsen funktionieren</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Kreditkarten bieten einen Puffer. Wenn du den <strong style={{ color: "#10B981" }}>Saldo monatlich vollständig begleichst</strong>: kostenloser Kredit für 30–56 Tage.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, background: "#10B98122", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#10B981", fontSize: "0.72rem", fontWeight: 700 }}>Saldo vollständig zahlen</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>0 €</p>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Zinsen pro Monat</p>
            </div>
            <div style={{ flex: 1, background: "#ef444422", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#ef4444", fontSize: "0.72rem", fontWeight: 700 }}>Nur Mindestrate zahlen</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>~{Math.round(schuld * 0.2 / 12)} €</p>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Zinsen/Monat bei {schuld.toLocaleString("de")} €</p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Mindestrate-Falle berechnet</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Schuld: <strong style={{ color: "#fff" }}>{schuld.toLocaleString("de")} €</strong> bei {zins} % Zinsen</p>
          <input type="range" min={500} max={8000} step={100} value={schuld} onChange={e => setSchuld(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(schuld, 500, 8000) }} />
          <div style={{ marginTop: "0.75rem", background: "#ef444422", borderRadius: "10px", padding: "0.75rem", display: "flex", gap: "1rem", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>Mindestrate</p>
              <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "1rem" }}>{mindestRate} €/Mon</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>Abbezahlt in</p>
              <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "1rem" }}>~{isFinite(jahreAbzahlung) ? jahreAbzahlung : 30}+ J.</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.7rem" }}>Gesamtkosten</p>
              <p style={{ color: "#fca5a5", fontWeight: 700, fontSize: "1rem" }}>{isFinite(gesamtKosten) ? gesamtKosten.toLocaleString("de") : "∞"} €</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wann sind Kreditkarten sinnvoll?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { use: "Auslandsreisen", note: "Keine Fremdwährungsgebühren (z.B. DKB Visa)", ok: true },
              { use: "Reiseversicherung", note: "Manche Premium-Karten inkl. Auslandskrankenvers.", ok: true },
              { use: "Cashback/Punkte", note: "Nur wenn Saldo monatlich vollständig beglichen", ok: true },
              { use: "Laufende Ausgaben", note: "Wenn man in Ratenzahlung verfällt: gefährlich", ok: false },
              { use: "Notfallfonds-Ersatz", note: "Kreditkarte ≠ Notgroschen – Schulden entstehen", ok: false },
            ].map(u => (
              <div key={u.use} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: u.ok ? "#10B981" : "#ef4444", fontSize: "0.85rem" }}>{u.ok ? "✅" : "❌"}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{u.use}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{u.note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Gute Kreditkarten (kostenlos)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { name: "DKB Visa", vorteil: "Weltweit kostenlos abheben & zahlen", preis: "0 €/Jahr" },
              { name: "Barclays Visa", vorteil: "2 % Cashback auf Auslandsumsätze", preis: "0 €/Jahr" },
              { name: "Trade Republic Card", vorteil: "1 % Cashback als Aktien-Fractional", preis: "0 €/Jahr" },
              { name: "Payback Amex", vorteil: "Punkte auf jeden Einkauf", preis: "0 €/Jahr" },
            ].map(k => (
              <div key={k.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                <div><p style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>{k.name}</p><p style={{ color: "#666", fontSize: "0.72rem" }}>{k.vorteil}</p></div>
                <span style={{ color: "#10B981", fontWeight: 700, fontSize: "0.8rem" }}>{k.preis}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wenn du schon Kreditkartenschulden hast</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ background: "#0EA5E922", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.82rem" }}>Option 1: Ratenkredit umschulden</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Kredit bei 5–8 % Zinsen aufnehmen und Kreditkarte vollständig tilgen</p>
            </div>
            <div style={{ background: "#7C3AED22", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.82rem" }}>Option 2: 0 %-Kreditkarte (Balance Transfer)</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Neue Karte ohne Zinsen für 6–18 Monate – in dieser Zeit tilgen</p>
            </div>
            <div style={{ background: "#10B98122", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.82rem" }}>Option 3: Alles freie Geld auf Schulden</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Avalanche-Methode – maximale Tilgung sofort beginnen</p>
            </div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #0EA5E933" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Kreditkarten-Audit:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Offener Saldo und Zinssatz prüfen<br />
              2. Saldo ≠ 0 € → sofort maximale Tilgung<br />
              3. Dauerauftrag: immer vollen Saldo zahlen<br />
              4. Kreditkarte = Zahlungsmittel, kein Kredit
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kreditkarten: Werkzeug oder Falle</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✅</span><p>Immer vollständig zahlen = kostenloser Kredit + Vorteile (Cashback, Versicherungen)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Nur Mindestrate: 2.000 € Schuld kostet bei 20 % über 16 Jahre mehr als 3.800 € Zinsen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔄</span><p>Kreditkartenschulden? Sofort umschulden oder maximale Tilgung starten</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L606Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Mein Wohnungskredit wurde abgelehnt. Grund: Ich hatte 3 Kreditanfragen im selben Monat gestellt."</div>
          <p className="cl-hook-sub">Jan, 32 – die SCHUFA-Falle die kaum jemand kennt.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist die SCHUFA?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Die SCHUFA (<strong style={{ color: "#fff" }}>Schutzgemeinschaft für allgemeine Kreditsicherung</strong>) ist eine private Auskunftei. Sie sammelt Daten über deine Kredithistorie und verkauft diese als Bonitätsscore an Banken, Vermieter und Unternehmen.</p>
          <div style={{ marginTop: "0.75rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
            <p style={{ color: "#F59E0B", fontSize: "0.8rem", fontWeight: 700 }}>Wichtig zu wissen:</p>
            <p style={{ color: "#888", fontSize: "0.78rem", lineHeight: 1.6 }}>• Privatunternehmen, nicht staatlich<br />• Kein Zugriff ohne deinen indirekten Hinweis (Kontoerhöhungen, Anfragen)<br />• Du hast Recht auf kostenlose Selbstauskunft jährlich</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">SCHUFA-Score Skala</h2>
          <svg viewBox="0 0 260 110" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { von: 97.5, label: "Sehr gut", color: "#10B981", x: 10 },
              { von: 95, label: "Gut", color: "#84cc16", x: 68 },
              { von: 90, label: "Befriedigend", color: "#F59E0B", x: 126 },
              { von: 80, label: "Ausreichend", color: "#ef8c34", x: 184 },
              { bis: 80, label: "Kritisch", color: "#ef4444", x: 184 },
            ].slice(0, 4).map((s, i) => (
              <g key={i}>
                <rect x={10 + i * 60} y="20" width="54" height="60" rx="6" fill={s.color} opacity="0.2" stroke={s.color} strokeWidth="1" />
                <text x={10 + i * 60 + 27} y="47" textAnchor="middle" fill={s.color} fontSize="9" fontWeight="700">{s.label}</text>
                <text x={10 + i * 60 + 27} y="62" textAnchor="middle" fill={s.color} fontSize="7.5">{["97,5–100","95–97,5","90–95","80–90"][i]} %</text>
              </g>
            ))}
            <text x="130" y="100" textAnchor="middle" fill="#888" fontSize="7">Höher = besser = günstigere Konditionen</text>
          </svg>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was schadet dem SCHUFA-Score?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { schlecht: "Zahlungsausfälle / Mahnungen", impact: "Sehr stark" },
              { schlecht: "Mehrere Kreditanfragen gleichzeitig", impact: "Mittel" },
              { schlecht: "Häufiges Kontowechseln", impact: "Gering" },
              { schlecht: "Viele Kreditkarten gleichzeitig", impact: "Gering" },
              { schlecht: "Schufafremde Anfragen (Konditionsanfragen)", impact: "Keine" },
            ].map(p => (
              <div key={p.schlecht} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: "#ccc", fontSize: "0.78rem" }}>❌ {p.schlecht}</span>
                <span style={{ color: p.impact === "Sehr stark" ? "#ef4444" : p.impact === "Mittel" ? "#F59E0B" : "#888", fontSize: "0.72rem", fontWeight: 600 }}>{p.impact}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was hilft dem Score?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              ["✅", "Rechnungen pünktlich bezahlen", "Wichtigster Faktor"],
              ["✅", "Langjährige Bankverbindung beibehalten", "Stabile Kontohistorie"],
              ["✅", "Wenige, gut geführte Kredite", "Zuverlässig tilgen"],
              ["✅", "Kreditanfragen als Konditionsanfragen stellen", "Keine Schufa-Spur"],
              ["✅", "Fehler in der Selbstauskunft korrigieren lassen", "Jährlich prüfen"],
            ].map(([ic, name, note]) => (
              <div key={name} style={{ display: "flex", gap: "0.5rem", background: "#10B98111", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: "#10B981" }}>{ic}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{name}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kostenlose SCHUFA-Selbstauskunft</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Du hast das <strong style={{ color: "#fff" }}>Recht auf eine kostenlose Datenkopie</strong> einmal pro Jahr (Art. 15 DSGVO).</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#10B981", fontSize: "0.8rem", fontWeight: 700 }}>Wie beantragen?</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem" }}>meineSCHUFA.de → "Datenkopie nach Art. 15 DSGVO" – <strong style={{ color: "#fff" }}>NICHT</strong> die kostenpflichtige "BonitätsAuskunft" kaufen</p>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#F59E0B", fontSize: "0.8rem", fontWeight: 700 }}>Was prüfen?</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem" }}>Falsche Einträge (falsche Adresse, erledigte Schulden die noch drin stehen), veraltete Daten</p>
            </div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #F59E0B33" }}>
            <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Heute:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. SCHUFA-Selbstauskunft beantragen (kostenlos)<br />
              2. Einträge auf Fehler prüfen<br />
              3. Bei Kredit-Anfragen: "Konditionsanfrage" verlangen<br />
              4. Alle Rechnungen per Dauerauftrag – nie verpassen
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">SCHUFA – dein Ruf bei Banken</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>SCHUFA-Score bestimmt Kredit-Konditionen und Wohnungssuche – kennen und pflegen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🆓</span><p>Kostenlose Selbstauskunft: Art. 15 DSGVO – jährlich prüfen und Fehler korrigieren</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Mehrere Kreditanfragen gleichzeitig schaden – immer als "Konditionsanfrage" stellen</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L607Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [betrag, setBetrag] = useState(10000)
  const [laufzeit, setLaufzeit] = useState(5)
  const [zins, setZins] = useState(8)
  const monatszins = zins / 100 / 12
  const anzahl = laufzeit * 12
  const monatsRate = betrag * monatszins / (1 - Math.pow(1 + monatszins, -anzahl))
  const gesamtZahlung = monatsRate * anzahl
  const gesamtZinsen = gesamtZahlung - betrag
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"10.000 € Kredit. 'Nur' 8 % Zinsen. Ich dachte ich zahle 800 € Zinsen. Es waren 2.160 €."</div>
          <p className="cl-hook-sub">Felix, 29 – Zinseszins funktioniert gegen dich bei Schulden.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Nominalzins vs. Effektivzins</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem 0.75rem", borderLeft: "3px solid #F59E0B" }}>
              <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.85rem" }}>Nominalzins (Lockvogel)</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.5 }}>Nur der reine Zinssatz ohne Nebenkosten. Banken bewerben immer den niedrigeren Nominalzins.</p>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem 0.75rem", borderLeft: "3px solid #ef4444" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.85rem" }}>Effektivzins (die Wahrheit)</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.5 }}>Inklusive aller Gebühren und Zinseszins-Effekte. <strong style={{ color: "#fff" }}>Nur dieser zählt für den Vergleich.</strong></p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kredit-Rechner</h2>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.3rem" }}>Betrag: <strong style={{ color: "#fff" }}>{betrag.toLocaleString("de")} €</strong></p>
          <input type="range" min={1000} max={50000} step={500} value={betrag} onChange={e => setBetrag(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(betrag, 1000, 50000) }} />
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.5rem 0 0.3rem" }}>Laufzeit: <strong style={{ color: "#fff" }}>{laufzeit} Jahre</strong></p>
          <input type="range" min={1} max={10} step={1} value={laufzeit} onChange={e => setLaufzeit(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(laufzeit, 1, 10) }} />
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.5rem 0 0.3rem" }}>Zinssatz: <strong style={{ color: "#fff" }}>{zins} % p.a.</strong></p>
          <input type="range" min={1} max={25} step={0.5} value={zins} onChange={e => setZins(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(zins, 1, 25) }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Monatsrate</p>
              <p style={{ color: "#fff", fontWeight: 700 }}>{Math.round(monatsRate).toLocaleString("de")} €</p>
            </div>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Zinslast gesamt</p>
              <p style={{ color: "#ef4444", fontWeight: 700 }}>{Math.round(gesamtZinsen).toLocaleString("de")} €</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wie Banken an Krediten verdienen</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">{betrag.toLocaleString("de")} € Kredit · {zins} % p.a. · {laufzeit} Jahre</text>
            <rect x="10" y="25" width="240" height="30" rx="6" fill="#1a1a2e" />
            <rect x="10" y="25" width={Math.round((betrag / (betrag + gesamtZinsen)) * 240)} height="30" rx="6" fill="#0EA5E9" opacity="0.8" />
            <rect x={10 + Math.round((betrag / (betrag + gesamtZinsen)) * 240)} y="25" width={240 - Math.round((betrag / (betrag + gesamtZinsen)) * 240)} height="30" rx="6" fill="#ef4444" opacity="0.8" />
            <text x="130" y="45" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">Tilgung {betrag.toLocaleString("de")} € vs. Zinsen {Math.round(gesamtZinsen).toLocaleString("de")} €</text>
            <text x="70" y="70" textAnchor="middle" fill="#0EA5E9" fontSize="7">zurückgezahlt</text>
            <text x="190" y="70" textAnchor="middle" fill="#ef4444" fontSize="7">Bankgewinn</text>
            <text x="130" y="90" textAnchor="middle" fill="#888" fontSize="7.5">Gesamtzahlung: {Math.round(gesamtZahlung).toLocaleString("de")} €</text>
          </svg>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Zinsen vergleichen – so richtig</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { typ: "Baufinanzierung", zins: "3–5 %", note: "Niedrig dank Immobiliensicherheit" },
              { typ: "Autokredit", zins: "4–7 %", note: "Mittelfeld" },
              { typ: "Ratenkredit", zins: "5–12 %", note: "Je nach Bonität" },
              { typ: "Dispokredit", zins: "10–15 %", note: "Teuer – vermeiden" },
              { typ: "Kreditkarte (Ratenzahlung)", zins: "15–25 %", note: "Sehr teuer – sofort tilgen" },
            ].map(k => (
              <div key={k.typ} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{k.typ}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{k.note}</p></div>
                <span style={{ color: parseFloat(k.zins) > 9 ? "#ef4444" : parseFloat(k.zins) > 6 ? "#F59E0B" : "#10B981", fontWeight: 700, fontSize: "0.8rem" }}>{k.zins}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Sondertilgung – dein Geheimvorteil</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Viele Kreditverträge erlauben <strong style={{ color: "#fff" }}>jährliche Sondertilgungen</strong> (oft 5–10 % der ursprünglichen Kreditsumme).</p>
          <div style={{ marginTop: "0.75rem", background: "#10B98122", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#10B981", fontSize: "0.82rem", fontWeight: 700 }}>Beispiel: 1.000 € Sondertilgung im 1. Jahr</p>
            <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.6, marginTop: "0.25rem" }}>Bei {betrag.toLocaleString("de")} € Kredit und {zins} % Zinsen: spart ~{Math.round(1000 * zins / 100 * laufzeit * 0.6).toLocaleString("de")} € Zinsen und {Math.round(laufzeit * 1.8)} Monate Laufzeit</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #0EA5E933" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Kredit smart wählen:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Immer effektiven Jahreszins vergleichen<br />
              2. Kreditrechner benutzen (check24.de)<br />
              3. Sondertilgungsoption aushandeln<br />
              4. Dispo nie als langfristigen Kredit nutzen
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Zinsen verstehen – Macht des Wissens</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>Effektivzins (nicht Nominalzins) ist die einzige echte Vergleichsgröße</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💸</span><p>Zinseszins wirkt gegen dich bei Schulden – Kredit schnell tilgen spart viel</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Sondertilgungen nutzen – jeder extra Euro auf die Schuld spart künftige Zinsen</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L608Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [activeStep, setActiveStep] = useState(0)
  const schritte = [
    { title: "Broker vergleichen", desc: "Trade Republic, Scalable, DKB – Kosten, ETF-Auswahl, Sparplan ab?", done: true },
    { title: "Konto beantragen", desc: "Online-Formular ausfüllen (15 Min.) – IBAN + Personalausweis bereit", done: false },
    { title: "Video-Ident / Post-Ident", desc: "Identifizierung per App oder Postfiliale", done: false },
    { title: "Freistellungsauftrag stellen", desc: "Bis 1.000 € Kapitalerträge steuerfrei – sofort einstellen!", done: false },
    { title: "Ersten ETF-Sparplan einrichten", desc: "MSCI World oder FTSE All World, ab 25 €/Monat", done: false },
  ]
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich schob die Depot-Eröffnung 2 Jahre lang auf. Es dauerte dann 8 Minuten. 8 Minuten."</div>
          <p className="cl-hook-sub">Theresa, 27 – die teuerste Prokrastination ihres Lebens.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein Depot?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Ein Depot ist ein <strong style={{ color: "#fff" }}>Konto für Wertpapiere</strong> (ETFs, Aktien, Anleihen). Wie ein Girokonto – aber statt Geld lagern dort deine Investments.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#0EA5E9", fontSize: "0.7rem", fontWeight: 700 }}>Neobroker</p>
              <p style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 700, marginTop: "0.25rem" }}>0–1 €/Trade</p>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Trade Republic, Scalable, justETF</p>
            </div>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#7C3AED", fontSize: "0.7rem", fontWeight: 700 }}>Klassische Bank</p>
              <p style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 700, marginTop: "0.25rem" }}>5–15 €/Trade</p>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Comdirect, DKB, ING</p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Depot eröffnen – Schritt für Schritt</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {schritte.map((s, i) => (
              <div key={i} onClick={() => setActiveStep(i)} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", background: activeStep === i ? "#1a1a2e" : "#0d1117", borderRadius: "8px", padding: "0.5rem 0.75rem", border: activeStep === i ? "1px solid #0EA5E944" : "1px solid transparent", cursor: "pointer" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: i < activeStep ? "#10B981" : i === activeStep ? "#0EA5E9" : "#1a1a2e", border: "2px solid " + (i <= activeStep ? (i < activeStep ? "#10B981" : "#0EA5E9") : "#333"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", color: "#fff", fontWeight: 700 }}>
                  {i < activeStep ? "✓" : i + 1}
                </div>
                <div><p style={{ color: i <= activeStep ? "#fff" : "#888", fontSize: "0.8rem", fontWeight: 600 }}>{s.title}</p><p style={{ color: "#666", fontSize: "0.72rem" }}>{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Freistellungsauftrag – 1.000 € steuerfrei</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Der Sparerpauschbetrag beträgt <strong style={{ color: "#fff" }}>1.000 € pro Jahr</strong> (2.000 € für Ehepaare). Alles darunter: keine Kapitalertragsteuer.</p>
          <div style={{ marginTop: "0.75rem", background: "#10B98122", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#10B981", fontSize: "0.82rem", fontWeight: 700 }}>Wichtig:</p>
            <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.6 }}>• Bei mehreren Depots aufteilen (max. 1.000 € gesamt)<br />• Sofort bei Depot-Eröffnung einstellen<br />• Vergessen = ~264 € Steuern auf 1.000 € Gewinn verschenkt</p>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Welches Depot für Anfänger?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { name: "Trade Republic", note: "Ab 1 € Sparplan · 3 % Zinsen auf Cash · App-First", empfohlen: true },
              { name: "Scalable Capital", note: "Viele ETFs · kostenlose Sparpläne · Web + App", empfohlen: true },
              { name: "DKB Broker", note: "Kostenlos bei Aktivkonto · bewährt · große Bank", empfohlen: false },
              { name: "Comdirect", note: "Große Auswahl · guter Service · höhere Kosten", empfohlen: false },
            ].map(d => (
              <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem", border: d.empfohlen ? "1px solid #10B98133" : "1px solid transparent" }}>
                <div><p style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>{d.name}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{d.note}</p></div>
                {d.empfohlen && <span style={{ color: "#10B981", fontSize: "0.7rem", fontWeight: 700 }}>★ Top</span>}
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was du brauchst – Checkliste</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              ["✅", "Personalausweis oder Reisepass", "Pflicht für Identifizierung"],
              ["✅", "Steuerliche Identifikationsnummer", "11-stellige Zahl aus Steuerbescheid"],
              ["✅", "IBAN deines Girokontos", "Für Einzahlungen"],
              ["✅", "E-Mail-Adresse", "Für Account + Unterlagen"],
              ["❌", "Einkommensnachweis", "Nicht erforderlich!"],
            ].map(([ic, name, note]) => (
              <div key={name} style={{ display: "flex", gap: "0.5rem", background: ic === "✅" ? "#10B98111" : "#ef444411", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: ic === "✅" ? "#10B981" : "#ef4444" }}>{ic}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{name}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Heute in 15 Minuten:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Trade Republic oder Scalable Capital öffnen<br />
              2. Konto beantragen + Ident durchführen<br />
              3. Freistellungsauftrag auf 1.000 € setzen<br />
              4. Ersten Sparplan: iShares Core MSCI World ETF, 25 €/Monat
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">ETF-Depot – dein Einstieg in den Vermögensaufbau</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⏱️</span><p>Depot eröffnen dauert 10–15 Minuten – kein Grund mehr zum Warten</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🆓</span><p>Freistellungsauftrag sofort stellen – 1.000 € Kapitalerträge jährlich steuerfrei</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🚀</span><p>Neobroker ab 1 € Sparplan – kein Mindestbetrag der aufhält</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L704Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [homeoffice, setHomeoffice] = useState(100)
  const [fahrtKm, setFahrtKm] = useState(20)
  const [fahrtTage, setFahrtTage] = useState(220)
  const hoErsparnis = Math.min(homeoffice, 210) * 6
  const fahrtErsparnis = Math.round(fahrtKm * fahrtTage * 0.3 * 0.42)
  const gesamt = hoErsparnis + fahrtErsparnis + 1230
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich dachte die Steuererklärung lohnt sich nicht. Das Finanzamt überwies mir 1.287 €."</div>
          <p className="cl-hook-sub">Melanie, 28 – ihr erster Versuch mit ELSTER.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Lohnt sich die Steuererklärung?</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">Durchschnittliche Steuererstattung in Deutschland</text>
            {[
              { gruppe: "Arbeitnehmer", betrag: 1072, color: "#10B981" },
              { gruppe: "Homeoffice-Nutzer", betrag: 1350, color: "#0EA5E9" },
              { gruppe: "Pendler", betrag: 1580, color: "#7C3AED" },
            ].map((d, i) => {
              const w = (d.betrag / 1580) * 200
              return (
                <g key={i}>
                  <text x="5" y={33 + i * 32} fill="#888" fontSize="7.5" dominantBaseline="middle">{d.gruppe}</text>
                  <rect x="90" y={23 + i * 32} width="200" height="18" rx="4" fill="#1a1a2e" />
                  <rect x="90" y={23 + i * 32} width={w} height="18" rx="4" fill={d.color} opacity="0.8" />
                  <text x={90 + w - 4} y={33 + i * 32} textAnchor="end" fill="white" fontSize="8" fontWeight="700" dominantBaseline="middle">{d.betrag.toLocaleString("de")} €</text>
                </g>
              )
            })}
          </svg>
          <p style={{ color: "#10B981", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }}>Bis zu 4 Jahre rückwirkend möglich – fang am besten jetzt an.</p>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Deine Abzüge schätzen</h2>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.3rem" }}>Homeoffice-Tage: <strong style={{ color: "#fff" }}>{homeoffice}</strong> (max. 210 × 6 €)</p>
          <input type="range" min={0} max={250} step={10} value={homeoffice} onChange={e => setHomeoffice(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(homeoffice, 0, 250) }} />
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.5rem 0 0.3rem" }}>Pendelweg (km einfach): <strong style={{ color: "#fff" }}>{fahrtKm} km</strong></p>
          <input type="range" min={0} max={60} step={1} value={fahrtKm} onChange={e => setFahrtKm(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(fahrtKm, 0, 60) }} />
          <div style={{ marginTop: "0.75rem", background: "#10B98122", borderRadius: "10px", padding: "0.6rem", textAlign: "center" }}>
            <p style={{ color: "#10B981", fontSize: "0.8rem" }}>Geschätzte Abzüge</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem" }}>{gesamt.toLocaleString("de")} €</p>
            <p style={{ color: "#888", fontSize: "0.7rem" }}>Arbeitnehmer-Pauschbetrag + HO + Pendler</p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die wichtigsten Abzüge</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { name: "Arbeitnehmer-Pauschbetrag", betrag: "1.230 €", auto: "Automatisch – kein Nachweis" },
              { name: "Homeoffice-Pauschale", betrag: "6 €/Tag", auto: "Max. 210 Tage = 1.260 €/Jahr" },
              { name: "Fahrtkosten", betrag: "0,30 €/km", auto: "Ab km 21: 0,38 €/km" },
              { name: "Fortbildung/Bücher", betrag: "Voll absetzbar", auto: "Belege aufheben" },
              { name: "Gewerkschaftsbeitrag", betrag: "Voll absetzbar", auto: "Direkt in ELSTER eintragen" },
            ].map(a => (
              <div key={a.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <div><p style={{ color: "#ccc", fontSize: "0.78rem" }}>{a.name}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{a.auto}</p></div>
                <span style={{ color: "#10B981", fontWeight: 700, fontSize: "0.78rem", flexShrink: 0 }}>{a.betrag}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">ELSTER – kostenlos und einfach</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            {[
              { step: "1", desc: "elster.de – kostenloses Konto anlegen", color: "#7C3AED" },
              { step: "2", desc: "Steuerformular auswählen: Anlage N (Arbeitnehmer)", color: "#0EA5E9" },
              { step: "3", desc: "Lohnsteuerbescheinigung vom Arbeitgeber eingeben", color: "#F59E0B" },
              { step: "4", desc: "Werbungskosten, Homeoffice, Pendler eintragen", color: "#10B981" },
              { step: "5", desc: "Abschicken – Erstattung in 4–8 Wochen", color: "#ec4899" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", fontWeight: 700, color: "#fff" }}>{s.step}</div>
                <p style={{ color: "#ccc", fontSize: "0.8rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">4 Jahre rückwirkend holen</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Die freiwillige Steuererklärung kann <strong style={{ color: "#fff" }}>4 Jahre rückwirkend</strong> abgegeben werden.</p>
          <div style={{ marginTop: "0.75rem", background: "#0EA5E922", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.82rem" }}>Beispiel: 4 Jahre × 1.072 € =</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", marginTop: "0.25rem" }}>4.288 € Erstattung</p>
            <p style={{ color: "#888", fontSize: "0.75rem" }}>Einfach 4 Erklärungen hintereinander einreichen</p>
          </div>
          <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.6rem" }}>Frist: 31.7. des Folgejahres für die Pflichtabgabe, freiwillig bis 4 Jahre danach.</p>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Diese Woche:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. ELSTER-Konto anlegen (kostenlos)<br />
              2. Lohnsteuerbescheinigung vom Arbeitgeber<br />
              3. Homeoffice-Tage zählen<br />
              4. Letzte 4 Jahre nachholen = ~{(4 * 1072).toLocaleString("de")} € möglich
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuererklärung – einfaches Geld</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💶</span><p>Durchschnittliche Erstattung: 1.072 € – für ~2 Stunden Aufwand</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏠</span><p>Homeoffice: 6 €/Tag, max. 210 Tage = bis 1.260 € absetzbar</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⏮️</span><p>4 Jahre rückwirkend einreichbar – bis zu ~4.000 € Nachholpotenzial</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L705Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [kinder, setKinder] = useState(0)
  const grundzulage = 175
  const kinderzulage = kinder * 300
  const gesamtzulage = grundzulage + kinderzulage
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Mein Riester-Berater sagte nie wie hoch die Kosten sind. 2,5 % jährlich – das vernichtet die Förderung."</div>
          <p className="cl-hook-sub">Stefan, 38 – der Kostencheck kam 10 Jahre zu spät.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Riester-Rente: Was ist das?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Riester ist eine staatlich geförderte private Altersvorsorge für <strong style={{ color: "#fff" }}>sozialversicherungspflichtige Arbeitnehmer</strong> mit Zulagen und Steuervorteilen.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ background: "#10B98122", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#10B981", fontSize: "0.8rem", fontWeight: 700 }}>Was der Staat zahlt:</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem" }}>Grundzulage 175 € + 300 € je Kind nach 2008 + Steuervorteil</p>
            </div>
            <div style={{ background: "#ef444422", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#ef4444", fontSize: "0.8rem", fontWeight: 700 }}>Was du zahlen musst:</p>
              <p style={{ color: "#aaa", fontSize: "0.78rem" }}>4 % deines Vorjahres-Bruttogehalts (max. 2.100 €/Jahr) abzgl. Zulagen</p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Deine staatliche Förderung</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Anzahl Kinder (nach 2008 geboren): <strong style={{ color: "#fff" }}>{kinder}</strong></p>
          <input type="range" min={0} max={4} step={1} value={kinder} onChange={e => setKinder(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(kinder, 0, 4) }} />
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <span style={{ color: "#ccc", fontSize: "0.82rem" }}>Grundzulage</span>
              <span style={{ color: "#10B981", fontWeight: 700 }}>{grundzulage} €</span>
            </div>
            {kinder > 0 && <div style={{ display: "flex", justifyContent: "space-between", background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <span style={{ color: "#ccc", fontSize: "0.82rem" }}>{kinder} × Kinderzulage</span>
              <span style={{ color: "#10B981", fontWeight: 700 }}>{kinderzulage} €</span>
            </div>}
            <div style={{ display: "flex", justifyContent: "space-between", background: "#10B98122", borderRadius: "8px", padding: "0.5rem 0.75rem", border: "1px solid #10B98133" }}>
              <span style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>Gesamt jährlich</span>
              <span style={{ color: "#10B981", fontWeight: 800, fontSize: "1rem" }}>{gesamtzulage} €</span>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Kostenproblem bei Riester</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">30 Jahre · 100 €/Monat · 6 % Marktrendite</text>
            {[
              { label: "Marktrendite", wert: 100627, color: "#10B981" },
              { label: "ETF (0,2 % Kosten)", wert: 95500, color: "#0EA5E9" },
              { label: "Riester (1,5 % Kosten)", wert: 78000, color: "#F59E0B" },
              { label: "Riester (2,5 % Kosten)", wert: 65000, color: "#ef4444" },
            ].map((d, i) => {
              const h = (d.wert / 100627) * 90
              const x = 15 + i * 58
              return (
                <g key={i}>
                  <rect x={x} y={105 - h} width="46" height={h} rx="3" fill={d.color} opacity="0.8" />
                  <text x={x + 23} y={100 - h} textAnchor="middle" fill="white" fontSize="7" fontWeight="700">{(d.wert / 1000).toFixed(0)}k€</text>
                  <text x={x + 23} y="118" textAnchor="middle" fill="#888" fontSize="6.5">{d.label.split(" ")[0]}</text>
                </g>
              )
            })}
          </svg>
          <p style={{ color: "#ef4444", fontSize: "0.78rem", textAlign: "center", marginTop: "0.25rem" }}>Kosten fressen Förderung – bei 2,5 % p.a. massiv.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Für wen lohnt Riester wirklich?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { gruppe: "Geringverdiener mit Kindern", lohnt: true, grund: "Zulagen > Eigenbeitrag – fast geschenktes Geld" },
              { gruppe: "Normalverdiener ohne Kinder", lohnt: false, grund: "ETF nach Kosten meist besser, mehr Flexibilität" },
              { gruppe: "Gutverdiener (>60k€/Jahr)", lohnt: false, grund: "Steuerbonus interessant, aber Kosten oft zu hoch" },
              { gruppe: "Selbstständige / Freiberufler", lohnt: false, grund: "Kein Anrecht auf Riester-Zulage" },
            ].map(g => (
              <div key={g.gruppe} style={{ display: "flex", gap: "0.5rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                <span style={{ color: g.lohnt ? "#10B981" : "#ef4444" }}>{g.lohnt ? "✅" : "❌"}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{g.gruppe}</p><p style={{ color: "#666", fontSize: "0.72rem" }}>{g.grund}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Rürup (Basisrente) – für Selbstständige</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Rürup ist die Riester-Alternative für <strong style={{ color: "#fff" }}>Selbstständige und Freiberufler</strong>. Kein Zulagenmodell, aber hohe Steuerabzüge.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, background: "#0EA5E922", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.75rem" }}>Riester</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.5, marginTop: "0.2rem" }}>Für Angestellte · Staatliche Zulagen · Max. 2.100 €/Jahr förderbar</p>
            </div>
            <div style={{ flex: 1, background: "#7C3AED22", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.75rem" }}>Rürup</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.5, marginTop: "0.2rem" }}>Für Selbstständige · Steuerabzug bis 27.565 €/Jahr · Keine staatl. Zulagen</p>
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.6rem" }}>Beide: Lebenslange Rente, nicht vererbbar, nicht kapitalisierbar.</p>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #7C3AED33" }}>
            <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Entscheidungshilfe:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Hast du Kinder? → Riester prüfen (Zulagen rechnen)<br />
              2. Selbstständig? → Rürup prüfen (Steuerersparnis)<br />
              3. Angestellter ohne Kinder? → ETF-Sparplan meist besser<br />
              4. Bestehenden Riester auf Kosten prüfen: TER &lt; 0,5 %?
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Riester & Rürup – lohnt es sich?</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">👨‍👩‍👧</span><p>Riester lohnt sich vor allem für Geringverdiener mit Kindern – Zulagen überwiegen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💸</span><p>Kosten entscheiden alles: Bei &gt;1,5 % p.a. frisst die Verwaltung die staatliche Förderung</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📈</span><p>Ohne Kinder: ETF-Sparplan schlägt Riester über 30 Jahre meist deutlich</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L706Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [brutto, setBrutto] = useState(3000)
  const [bav, setBav] = useState(150)
  const agZuschuss = Math.round(bav * 0.15)
  const steuerErsparnis = Math.round(bav * 0.3)
  const nettoKosten = bav - steuerErsparnis - Math.round(bav * 0.1)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich zahle 200 € in die bAV ein. Der Staat und mein Chef tragen 95 € davon. Es kostet mich netto 105 €."</div>
          <p className="cl-hook-sub">Nina, 35 – betriebliche Altersvorsorge richtig genutzt.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist betriebliche Altersvorsorge?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>bAV bedeutet: Teile deines <strong style={{ color: "#fff" }}>Bruttogehalts</strong> fließen direkt in eine Altersvorsorge – bevor Steuern und Sozialabgaben abgezogen werden. Das reduziert dein zu versteuerndes Einkommen sofort.</p>
          <div style={{ marginTop: "0.75rem", background: "#7C3AED22", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
            <p style={{ color: "#7C3AED", fontSize: "0.82rem", fontWeight: 700 }}>Gesetzlicher Anspruch seit 2019:</p>
            <p style={{ color: "#aaa", fontSize: "0.78rem" }}>Arbeitgeber muss mindestens <strong style={{ color: "#fff" }}>15 %</strong> des umgewandelten Betrags als Zuschuss zahlen.</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was kostet dich die bAV wirklich?</h2>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.3rem" }}>bAV-Beitrag: <strong style={{ color: "#fff" }}>{bav} €/Monat</strong></p>
          <input type="range" min={25} max={500} step={25} value={bav} onChange={e => setBav(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(bav, 25, 500) }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginTop: "0.75rem" }}>
            {[
              { label: "Brutto-Einzahlung", wert: bav, color: "#0EA5E9", plus: false },
              { label: "AG-Zuschuss (15 %)", wert: agZuschuss, color: "#10B981", plus: true },
              { label: "Steuerersparnis (~30 %)", wert: steuerErsparnis, color: "#10B981", plus: true },
              { label: "Sozialabgaben-Ersparnis (~10 %)", wert: Math.round(bav * 0.1), color: "#10B981", plus: true },
              { label: "Deine Netto-Belastung", wert: nettoKosten, color: "#fff", plus: false, bold: true },
            ].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", background: "#1a1a2e", borderRadius: "6px", padding: "0.35rem 0.6rem" }}>
                <span style={{ color: "#aaa", fontSize: "0.78rem" }}>{r.label}</span>
                <span style={{ color: r.color, fontWeight: r.bold ? 800 : 600, fontSize: "0.82rem" }}>{r.plus ? "–" : ""}{r.wert} €</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die 5 bAV-Durchführungswege</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { weg: "Direktversicherung", info: "Häufigste Form · Versicherungsvertrag", rating: "★★★" },
              { weg: "Pensionskasse", info: "Kollektiv · günstiger als Direktversicherung", rating: "★★★" },
              { weg: "Pensionsfonds", info: "Flexibler · mehr Kapitalmarktexposure", rating: "★★★★" },
              { weg: "Unterstützungskasse", info: "Für Besserverdiener · hohe Beträge", rating: "★★" },
              { weg: "Direktzusage", info: "Großunternehmen · Bilanzrisiko beim AG", rating: "★★" },
            ].map(w => (
              <div key={w.weg} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{w.weg}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{w.info}</p></div>
                <span style={{ color: "#F59E0B", fontSize: "0.75rem" }}>{w.rating}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der Haken: Besteuerung im Rentenalter</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Heute steuerfreie Einzahlungen werden im Rentenalter <strong style={{ color: "#ef4444" }}>voll besteuert</strong>. Plus: GKV-Beiträge auf die Auszahlung.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, background: "#10B98122", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#10B981", fontSize: "0.72rem", fontWeight: 700 }}>Heute</p>
              <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700, marginTop: "0.2rem" }}>Steuerfrei einzahlen</p>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>~42 % Grenzsteuersatz gespart</p>
            </div>
            <div style={{ flex: 1, background: "#ef444422", borderRadius: "8px", padding: "0.6rem", textAlign: "center" }}>
              <p style={{ color: "#ef4444", fontSize: "0.72rem", fontWeight: 700 }}>Im Rentenalter</p>
              <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700, marginTop: "0.2rem" }}>Voll versteuern</p>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>+GKV-Beiträge (~18,3 %)</p>
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.6rem" }}>Lohnt sich trotzdem – besonders wenn AG-Zuschuss &gt; 15 % beträgt.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">bAV – Checkliste beim Arbeitgeber</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              ["✅", "AG-Zuschuss genau anfragen (gesetzlich min. 15 %)", "Manche zahlen 20–100 %"],
              ["✅", "Produkt und Kosten prüfen (Versicherungslösung?)", "TER &lt;1 % anstreben"],
              ["✅", "Portabilität bei Jobwechsel klären", "Ist die Police übertragbar?"],
              ["⚠️", "Nicht zu viel Geld in bAV binden", "Flexibilität beibehalten"],
            ].map(([ic, act, note]) => (
              <div key={act} style={{ display: "flex", gap: "0.5rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ color: ic === "✅" ? "#10B981" : "#F59E0B" }}>{ic}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.78rem" }}>{act}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #7C3AED33" }}>
            <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Diese Woche:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. HR/Personalabteilung fragen: "Gibt es eine bAV und wie hoch ist der AG-Zuschuss?"<br />
              2. AG-Zuschuss über 15 %? → Sofort nutzen<br />
              3. Produkt auf Kosten prüfen<br />
              4. Optimal: bAV + ETF-Sparplan kombinieren
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">bAV – kostenlose Rentenerhöhung</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏢</span><p>Arbeitgeber muss mind. 15 % Zuschuss zahlen – das ist gesetzlich garantiert</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💶</span><p>Brutto einzahlen spart Steuern und Sozialabgaben heute – Effektivkosten oft unter 60 %</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Im Rentenalter voll versteuern + GKV – trotzdem meist lohnenswert bei hohem AG-Zuschuss</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L707Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [nebenEink, setNebenEink] = useState(800)
  const pflicht = nebenEink > 410
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich verkaufte alte Sachen auf eBay – 3.200 € im Jahr. Dann kam das Finanzamt."</div>
          <p className="cl-hook-sub">Bernd, 40 – was als Aufräumen begann, wurde steuerpflichtig.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Freigrenze vs. Freibetrag</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ flex: 1, background: "#ef444422", borderRadius: "8px", padding: "0.6rem", borderTop: "2px solid #ef4444" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.8rem" }}>Freigrenze</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.5, marginTop: "0.2rem" }}>1 € darüber: <strong style={{ color: "#fff" }}>alles</strong> wird steuerpflichtig. 410 € bei sonstigen Einkünften.</p>
            </div>
            <div style={{ flex: 1, background: "#10B98122", borderRadius: "8px", padding: "0.6rem", borderTop: "2px solid #10B981" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.8rem" }}>Freibetrag</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.5, marginTop: "0.2rem" }}>Der Betrag bleibt steuerfrei – <strong style={{ color: "#fff" }}>nur der Rest</strong> wird versteuert.</p>
            </div>
          </div>
          <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.6rem" }}>Bei Nebeneinkünften gilt die Freigrenze von 410 €. Bei 411 € bist du komplett dabei.</p>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein Nebeneinkommen prüfen</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Jährliches Nebeneinkommen: <strong style={{ color: "#fff" }}>{nebenEink.toLocaleString("de")} €</strong></p>
          <input type="range" min={0} max={5000} step={50} value={nebenEink} onChange={e => setNebenEink(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(nebenEink, 0, 5000) }} />
          <div style={{ marginTop: "0.75rem", background: pflicht ? "#ef444422" : "#10B98122", borderRadius: "10px", padding: "0.75rem", textAlign: "center", border: `1px solid ${pflicht ? "#ef444433" : "#10B98133"}` }}>
            {pflicht ? (
              <>
                <p style={{ color: "#ef4444", fontWeight: 700 }}>⚠️ Steuerpflichtig!</p>
                <p style={{ color: "#ccc", fontSize: "0.82rem", marginTop: "0.25rem" }}>Über 410 € Freigrenze – in Steuererklärung angeben</p>
              </>
            ) : (
              <>
                <p style={{ color: "#10B981", fontWeight: 700 }}>✅ Unter Freigrenze</p>
                <p style={{ color: "#ccc", fontSize: "0.82rem", marginTop: "0.25rem" }}>Unter 410 € – keine Steuerpflicht für Gelegenheitseinkünfte</p>
              </>
            )}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Häufige Nebeneinkünfte im Überblick</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { typ: "Freelancer-Arbeit", steuer: "Ab 1 €", note: "Gewerbliche Einkünfte immer steuerpflichtig" },
              { typ: "eBay-Privatverkäufe", steuer: "Bei gewerblichem Charakter", note: "Gelegentlich ok – regelmäßig = Gewerbe" },
              { typ: "Gelegenheitsjobs", steuer: "Freigrenze 410 €/Jahr", note: "§ 22 Nr. 3 EStG" },
              { typ: "Vermietung Zimmer/Wohnung", steuer: "Einkommensteuerpflichtig", note: "AirBnB etc. = steuerpflichtiger Betrieb" },
              { typ: "ETF-Gewinne/Dividenden", steuer: "Abgeltungssteuer 25 %", note: "Freistellungsauftrag nutzen" },
            ].map(t => (
              <div key={t.typ} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <div><p style={{ color: "#ccc", fontSize: "0.78rem" }}>{t.typ}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{t.note}</p></div>
                <span style={{ color: "#F59E0B", fontSize: "0.72rem", flexShrink: 0, maxWidth: "80px", textAlign: "right" }}>{t.steuer}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kleinunternehmerregelung (§19 UStG)</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Wenn du selbstständig tätig bist: Unter <strong style={{ color: "#fff" }}>22.000 €/Jahr Umsatz</strong> musst du keine Umsatzsteuer ausweisen.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ background: "#10B98122", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.8rem" }}>Vorteil Kleinunternehmer</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Keine Umsatzsteuer-Abführung, einfachere Buchhaltung</p>
            </div>
            <div style={{ background: "#ef444422", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.8rem" }}>Nachteil</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Kein Vorsteuerabzug – bei hohen Betriebskosten kann Regelbesteuerung besser sein</p>
            </div>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Ausgaben als Betriebsausgaben absetzen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { ausgabe: "Laptop / Hardware", info: "Sofortabschreibung bis 800 € netto" },
              { ausgabe: "Homeoffice-Anteil", info: "Bei selbstständiger Tätigkeit absetzbar" },
              { ausgabe: "Fachliteratur / Kurse", info: "Voll absetzbar bei Berufsbezug" },
              { ausgabe: "Telefon / Internet (anteilig)", info: "Betrieblicher Anteil absetzbar" },
              { ausgabe: "Fahrtkosten zu Kunden", info: "0,30 € je km oder Fahrtenbuch" },
            ].map(a => (
              <div key={a.ausgabe} style={{ display: "flex", gap: "0.5rem", background: "#10B98111", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: "#10B981" }}>✅</span>
                <div><p style={{ color: "#ccc", fontSize: "0.78rem" }}>{a.ausgabe}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{a.info}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #F59E0B33" }}>
            <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Nebeneinkünfte korrekt deklarieren:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Alle Quellen und Beträge dokumentieren<br />
              2. Über 410 €? → Anlage SO in ELSTER<br />
              3. Gewerbliche Tätigkeit? → Gewerbe anmelden<br />
              4. Ausgaben immer gegenrechnen
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Nebeneinkünfte & Steuern – richtig machen</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Freigrenze 410 €: Ein Euro darüber und der gesamte Betrag wird steuerpflichtig</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏪</span><p>Kleinunternehmer bis 22.000 €/Jahr: keine Umsatzsteuer, einfache Buchführung</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Betriebsausgaben immer gegenrechnen – senkt die Steuerlast erheblich</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L708Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [gewinn, setGewinn] = useState(2000)
  const [verlust, setVerlust] = useState(500)
  const nettoGewinn = Math.max(0, gewinn - verlust)
  const steuerOhne = Math.round(gewinn * 0.26375)
  const steuerMit = Math.round(nettoGewinn * 0.26375)
  const ersparnis = steuerOhne - steuerMit
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich verkaufte ETFs mit 3.000 € Gewinn und 1.200 € Verlust. Durch Tax-Loss-Harvesting sparte ich 316 €."</div>
          <p className="cl-hook-sub">Kai, 36 – legale Steueroptimierung für Investoren.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Tax-Loss-Harvesting einfach erklärt</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Strategie: <strong style={{ color: "#fff" }}>Verluste bewusst realisieren</strong> um sie mit Gewinnen zu verrechnen und dadurch Steuern zu senken.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ background: "#0EA5E922", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.8rem" }}>Schritt 1: Verlust-ETF verkaufen</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Position mit -500 € realisieren – Verlust gebucht</p>
            </div>
            <div style={{ background: "#10B98122", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.8rem" }}>Schritt 2: Verrechnen</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Verlust wird mit Gewinnen verrechnet – steuerpflichtiger Gewinn sinkt</p>
            </div>
            <div style={{ background: "#7C3AED22", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.8rem" }}>Schritt 3: Ähnliches kaufen</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Ähnlichen ETF (nicht gleichen!) sofort zurückkaufen – Strategie bleibt</p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuerersparnis berechnen</h2>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.3rem" }}>Realisierter Gewinn: <strong style={{ color: "#fff" }}>{gewinn.toLocaleString("de")} €</strong></p>
          <input type="range" min={500} max={10000} step={100} value={gewinn} onChange={e => setGewinn(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(gewinn, 500, 10000) }} />
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.5rem 0 0.3rem" }}>Verrechneter Verlust: <strong style={{ color: "#fff" }}>{verlust.toLocaleString("de")} €</strong></p>
          <input type="range" min={0} max={Math.min(gewinn, 5000)} step={100} value={Math.min(verlust, gewinn)} onChange={e => setVerlust(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(verlust, 0, 5000) }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Steuer ohne</p>
              <p style={{ color: "#ef4444", fontWeight: 700 }}>{steuerOhne.toLocaleString("de")} €</p>
            </div>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Steuer mit</p>
              <p style={{ color: "#F59E0B", fontWeight: 700 }}>{steuerMit.toLocaleString("de")} €</p>
            </div>
            <div style={{ flex: 1, background: "#10B98122", borderRadius: "8px", padding: "0.5rem", textAlign: "center", border: "1px solid #10B98133" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Ersparnis</p>
              <p style={{ color: "#10B981", fontWeight: 700 }}>{ersparnis.toLocaleString("de")} €</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Freistellungsauftrag optimal verteilen</h2>
          <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.88rem" }}>1.000 € Sparerpauschbetrag pro Person – <strong style={{ color: "#fff" }}>aufteilen nach erwartetem Ertrag</strong>.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {[
              { konto: "Trade Republic Depot", ertrag: "~350 €", fsa: "350 €" },
              { konto: "Scalable Depot", ertrag: "~200 €", fsa: "200 €" },
              { konto: "DKB Tagesgeld", ertrag: "~300 €", fsa: "300 €" },
              { konto: "ING Girokonto Zinsen", ertrag: "~150 €", fsa: "150 €" },
            ].map(k => (
              <div key={k.konto} style={{ display: "flex", justifyContent: "space-between", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ color: "#ccc", fontSize: "0.78rem" }}>{k.konto}</span>
                <div style={{ textAlign: "right" }}>
                  <span style={{ color: "#888", fontSize: "0.72rem" }}>Ertrag: {k.ertrag} · </span>
                  <span style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 600 }}>FSA: {k.fsa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Günstigerprüfung nutzen</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Wer einen <strong style={{ color: "#fff" }}>persönlichen Steuersatz unter 25 %</strong> hat, kann in der Steuererklärung beantragen dass Kapitalerträge mit dem niedrigeren Satz versteuert werden.</p>
          <div style={{ marginTop: "0.75rem", background: "#0EA5E922", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.82rem" }}>Für wen relevant?</p>
            <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.5, marginTop: "0.25rem" }}>• Geringverdiener (unter ~15.000 € im Jahr)<br />• Studenten mit Nebeneinkünften<br />• Rentner mit niedrigem Renteneinkommen<br />• Eltern in Elternzeit</p>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Verlustverrechnungstopf verstehen</h2>
          <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.88rem" }}>Banken führen automatisch Verlustverrechnungstöpfe. Verluste aus ETF-Verkäufen werden gegen ETF-Gewinne desselben Jahres verrechnet.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.8rem" }}>Topf 1: Aktien</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Nur gegen Aktiengewinne verrechenbar</p>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.8rem" }}>Topf 2: Sonstige (ETFs, Zinsen)</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Gegen alle Kapitalerträge außer Aktiengewinne</p>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#888", fontSize: "0.75rem" }}>Verbleibende Verluste → automatisch ins nächste Jahr vorgetragen</p>
            </div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #7C3AED33" }}>
            <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Jahresend-Checkliste (Oktober/November):</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Freistellungsauftrag ausgeschöpft? Falls nicht: ausnutzen<br />
              2. Unrealisierte Verluste im Depot? → TLH prüfen<br />
              3. Günstigerprüfung bei niedrigem Einkommen stellen<br />
              4. Verluste bankübertragen wenn Bankwechsel geplant
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steueroptimierung – legale Rendite-Steigerung</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✂️</span><p>Tax-Loss-Harvesting: Verluste realisieren + verrechnen spart echte Steuer-Euros</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📋</span><p>Freistellungsauftrag optimal auf alle Konten verteilen – 1.000 € steuerfrei nutzen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔍</span><p>Günstigerprüfung: Bei persönlichem Steuersatz &lt; 25 % in der Erklärung beantragen</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L803Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich wollte in Immobilien investieren. Aber eine Wohnung? Keine Chance. Dann entdeckte ich REITs."</div>
          <p className="cl-hook-sub">Julia, 26 – investiert seit 3 Jahren in Immobilien ab 1 €.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein REIT?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Ein <strong style={{ color: "#fff" }}>Real Estate Investment Trust</strong> ist eine börsengehandelte Gesellschaft die Immobilien kauft, verwaltet und Mieteinnahmen als Dividende ausschüttet.</p>
          <div style={{ marginTop: "0.75rem", background: "#0EA5E922", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.82rem" }}>Gesetzliche Pflicht:</p>
            <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.6 }}>REITs müssen <strong style={{ color: "#fff" }}>mindestens 90 % ihrer Gewinne</strong> als Dividende ausschütten. Das macht sie zu verlässlichen Ausschüttern.</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">REIT vs. direkte Immobilie</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { kriterium: "Einstieg", reit: "Ab 1 €", direkt: "100k€+" },
              { kriterium: "Liquidität", reit: "Täglich handelbar", direkt: "Monate/Jahre" },
              { kriterium: "Diversifikation", reit: "Viele Objekte", direkt: "1 Objekt" },
              { kriterium: "Verwaltung", reit: "Keine", direkt: "Viel Aufwand" },
              { kriterium: "Rendite p.a.", reit: "4–8 %", direkt: "3–6 %" },
            ].map((k, i) => (
              <g key={i}>
                <text x="5" y={18 + i * 26} fill="#888" fontSize="7.5" dominantBaseline="middle">{k.kriterium}</text>
                <rect x="75" y={10 + i * 26} width="85" height="18" rx="4" fill="#0EA5E922" />
                <text x="117" y={21 + i * 26} textAnchor="middle" fill="#0EA5E9" fontSize="7.5" fontWeight="600">{k.reit}</text>
                <rect x="165" y={10 + i * 26} width="90" height="18" rx="4" fill="#1a1a2e" />
                <text x="210" y={21 + i * 26} textAnchor="middle" fill="#888" fontSize="7.5">{k.direkt}</text>
              </g>
            ))}
            <text x="117" y="140" textAnchor="middle" fill="#0EA5E9" fontSize="7">REIT</text>
            <text x="210" y="140" textAnchor="middle" fill="#888" fontSize="7">Direkt</text>
          </svg>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">REIT-Typen und bekannte Beispiele</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { typ: "Wohn-REITs", bsp: "Vonovia (DE), AvalonBay (US)", color: "#10B981" },
              { typ: "Büro-REITs", bsp: "Boston Properties, Alstria (DE)", color: "#0EA5E9" },
              { typ: "Logistik-REITs", bsp: "Prologis – Amazon-Lager", color: "#7C3AED" },
              { typ: "Healthcare-REITs", bsp: "Welltower – Pflegeheime", color: "#ec4899" },
              { typ: "Diversifiziert via ETF", bsp: "iShares STOXX Europe 600 REITS", color: "#F59E0B" },
            ].map(t => (
              <div key={t.typ} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: t.color, fontSize: "0.8rem", fontWeight: 600 }}>{t.typ}</span>
                <span style={{ color: "#666", fontSize: "0.72rem", maxWidth: "120px", textAlign: "right" }}>{t.bsp}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Besteuerung von REITs in Deutschland</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>REIT-Ausschüttungen werden wie normale Dividenden behandelt: <strong style={{ color: "#fff" }}>Abgeltungssteuer 25 % + Soli = 26,375 %</strong>.</p>
          <div style={{ marginTop: "0.75rem", background: "#F59E0B22", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.82rem" }}>Teilfreistellung beachten:</p>
            <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.5 }}>Bei REIT-ETFs gilt die 60 %-Teilfreistellung für Aktienfonds – effektiv nur ~15,8 % Steuern auf die Ausschüttung.</p>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">REIT-ETFs: Diversifiziert und einfach</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { name: "iShares Developed Real Estate ETF", isin: "IE00B1FZS350", ter: "0,59 %", typ: "Weltweite REITs" },
              { name: "STOXX Europe 600 Real Estate", isin: "IE00B0M63953", ter: "0,46 %", typ: "Europäische REITs" },
              { name: "Vanguard Real Estate ETF", isin: "US9229085538", ter: "0,12 %", typ: "US-REITs (USD)" },
            ].map(e => (
              <div key={e.name} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>{e.typ}</span>
                  <span style={{ color: "#10B981", fontSize: "0.75rem" }}>TER {e.ter}</span>
                </div>
                <p style={{ color: "#666", fontSize: "0.7rem", marginTop: "0.15rem" }}>{e.name}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #0EA5E933" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>REIT-Einstieg in 10 Minuten:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Bestehendes Depot öffnen<br />
              2. ISIN IE00B1FZS350 suchen (iShares Global REIT)<br />
              3. Als Sparplan ab 25 €/Monat einrichten<br />
              4. Diversifikation zum bestehenden ETF-Portfolio
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">REITs – Immobilien für alle</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏢</span><p>REITs: Immobilien-Investment ab 1 € – täglich handelbar, keine Verwaltungsarbeit</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>Pflichtausschüttung 90 %+ der Gewinne – verlässliche Dividendenzahler</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>REIT-ETF statt Einzeltitel: weltweite Diversifikation ab TER 0,12 %</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L804Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [kaufpreis, setKaufpreis] = useState(300000)
  const [sparrate, setSparrate] = useState(800)
  const nebenkosten = Math.round(kaufpreis * 0.1)
  const ekZiel = Math.round(kaufpreis * 0.2 + nebenkosten)
  const monate = Math.ceil(ekZiel / sparrate)
  const jahre = (monate / 12).toFixed(1)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Wir sparten 7 Jahre für das Eigenkapital. Jetzt zahlen wir 600 € weniger Zinsen im Monat als Nachbarn ohne EK."</div>
          <p className="cl-hook-sub">Thomas & Maria, 34/33 – der lange Atem hat sich gelohnt.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Warum Eigenkapital entscheidend ist</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">300.000 € Kaufpreis – Zinssatz je nach Eigenkapital</text>
            {[
              { ek: "5 % EK", zins: "4,5 %", moRate: 1645, color: "#ef4444" },
              { ek: "20 % EK", zins: "3,5 %", moRate: 1347, color: "#F59E0B" },
              { ek: "30 % EK", zins: "3,0 %", moRate: 1062, color: "#10B981" },
            ].map((d, i) => {
              const h = (d.moRate / 1645) * 80
              const x = 30 + i * 75
              return (
                <g key={i}>
                  <rect x={x} y={100 - h} width="55" height={h} rx="4" fill={d.color} opacity="0.8" />
                  <text x={x + 27} y={95 - h} textAnchor="middle" fill="white" fontSize="8" fontWeight="700">{d.moRate.toLocaleString("de")} €</text>
                  <text x={x + 27} y="112" textAnchor="middle" fill="#888" fontSize="7">{d.ek}</text>
                  <text x={x + 27} y="120" textAnchor="middle" fill={d.color} fontSize="6.5">{d.zins} p.a.</text>
                </g>
              )
            })}
          </svg>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein EK-Sparplan</h2>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.3rem" }}>Kaufpreis: <strong style={{ color: "#fff" }}>{kaufpreis.toLocaleString("de")} €</strong></p>
          <input type="range" min={100000} max={800000} step={10000} value={kaufpreis} onChange={e => setKaufpreis(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(kaufpreis, 100000, 800000) }} />
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.5rem 0 0.3rem" }}>Monatliche Sparrate: <strong style={{ color: "#fff" }}>{sparrate.toLocaleString("de")} €</strong></p>
          <input type="range" min={100} max={3000} step={50} value={sparrate} onChange={e => setSparrate(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(sparrate, 100, 3000) }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>EK-Ziel (30 %)</p>
              <p style={{ color: "#F59E0B", fontWeight: 700 }}>{ekZiel.toLocaleString("de")} €</p>
            </div>
            <div style={{ flex: 1, background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Dauer</p>
              <p style={{ color: "#10B981", fontWeight: 700 }}>{jahre} Jahre</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kaufnebenkosten – die oft vergessenen Kosten</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { pos: "Grunderwerbsteuer", wert: "3,5–6,5 %", note: "Je nach Bundesland (Bayern 3,5 %, Berlin 6 %)" },
              { pos: "Notar & Grundbuch", wert: "~1,5 %", note: "Gesetzlich geregelt" },
              { pos: "Maklergebühr", wert: "0–3,57 %", note: "Seit 2020 je 50 % geteilt" },
              { pos: "Summe Nebenkosten", wert: "5–12 %", note: "Muss aus Eigenkapital kommen!" },
            ].map(p => (
              <div key={p.pos} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <div><p style={{ color: "#ccc", fontSize: "0.78rem" }}>{p.pos}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{p.note}</p></div>
                <span style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>{p.wert}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wo EK ansparen?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { ort: "Tagesgeld", info: "Für kurzfristige EK-Ziele (&lt;3 Jahre)", rating: 5, color: "#10B981" },
              { ort: "Festgeld", info: "Fester Zinssatz bei definierten Zeithorizonten", rating: 4, color: "#0EA5E9" },
              { ort: "ETF-Sparplan", info: "Bei Horizon &gt;5 Jahre – höhere Rendite, mehr Risiko", rating: 4, color: "#7C3AED" },
              { ort: "Bausparvertrag", info: "Zinssicherung – lohnt bei niedrigem Marktzins", rating: 3, color: "#F59E0B" },
            ].map(o => (
              <div key={o.ort} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{o.ort}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{o.info}</p></div>
                <span style={{ color: o.color, fontSize: "0.78rem" }}>{"★".repeat(o.rating) + "☆".repeat(5 - o.rating)}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">KfW-Förderung nutzen</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Die KfW (Kreditanstalt für Wiederaufbau) bietet <strong style={{ color: "#fff" }}>vergünstigte Darlehen</strong> für Eigenheimkäufer an.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {[
              { prog: "Wohneigentumsprogramm (KfW 124)", note: "Bis 100.000 € günstiger Kredit für Erstkäufer" },
              { prog: "Energieeffizient Sanieren (KfW 151)", note: "Für Modernisierungen – Zuschuss + günstiger Kredit" },
              { prog: "Klimafreundlicher Neubau (KfW 297/298)", note: "Für Neubauten mit hohem Energiestandard" },
            ].map(p => (
              <div key={p.prog} style={{ background: "#10B98111", borderRadius: "8px", padding: "0.5rem 0.75rem", borderLeft: "3px solid #10B981" }}>
                <p style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 600 }}>{p.prog}</p>
                <p style={{ color: "#888", fontSize: "0.72rem" }}>{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #F59E0B33" }}>
            <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>EK-Aufbau starten:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Kaufpreisvorstellung definieren<br />
              2. EK-Ziel berechnen (20 % + ~10 % Nebenkosten)<br />
              3. Dauerauftrag auf separates Tagesgeldkonto<br />
              4. Bei &gt;5 Jahren: ETF-Sparplan erwägen
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Eigenkapital – der Schlüssel zur günstigen Finanzierung</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏦</span><p>20 % EK + ~10 % Nebenkosten = 30 % des Kaufpreises als Mindest-Eigenkapital</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Mehr EK = niedrigerer Zinssatz – Unterschied von 1 % spart bei 250k€ über 20 Jahre ~50k€</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Sparplan + Tagesgeld + KfW-Förderung kombinieren für schnelleren EK-Aufbau</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L805Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [kaufpreis, setKaufpreis] = useState(250000)
  const [kaltmiete, setKaltmiete] = useState(900)
  const brutto = ((kaltmiete * 12) / kaufpreis * 100).toFixed(2)
  const netto = ((kaltmiete * 12 * 0.7) / kaufpreis * 100).toFixed(2)
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Mein Vermieter-Berater sagte 'super Lage, 4 % Rendite'. Nach Leerstand, Reparaturen und Verwaltung: 1,8 %."</div>
          <p className="cl-hook-sub">Andreas, 44 – Rendite auf dem Papier vs. Wirklichkeit.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Bruttomietrendite berechnen</h2>
          <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.88rem" }}>Formel: <strong style={{ color: "#fff" }}>(Jahreskaltmiete / Kaufpreis) × 100</strong></p>
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.75rem 0 0.3rem" }}>Kaufpreis: <strong style={{ color: "#fff" }}>{kaufpreis.toLocaleString("de")} €</strong></p>
          <input type="range" min={100000} max={600000} step={5000} value={kaufpreis} onChange={e => setKaufpreis(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(kaufpreis, 100000, 600000) }} />
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.5rem 0 0.3rem" }}>Monatliche Kaltmiete: <strong style={{ color: "#fff" }}>{kaltmiete.toLocaleString("de")} €</strong></p>
          <input type="range" min={300} max={3000} step={50} value={kaltmiete} onChange={e => setKaltmiete(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(kaltmiete, 300, 3000) }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, background: parseFloat(brutto) >= 4 ? "#10B98122" : "#F59E0B22", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Brutto-Rendite</p>
              <p style={{ color: parseFloat(brutto) >= 4 ? "#10B981" : "#F59E0B", fontWeight: 700, fontSize: "1.1rem" }}>{brutto} %</p>
            </div>
            <div style={{ flex: 1, background: parseFloat(netto) >= 3 ? "#10B98122" : "#ef444422", borderRadius: "8px", padding: "0.5rem", textAlign: "center" }}>
              <p style={{ color: "#888", fontSize: "0.68rem" }}>Netto (~70 % Brutto)</p>
              <p style={{ color: parseFloat(netto) >= 3 ? "#10B981" : "#ef4444", fontWeight: 700, fontSize: "1.1rem" }}>{netto} %</p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was die Netto-Rendite frisst</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { kosten: "Instandhaltungsrücklage", pct: "1 %/Jahr v. Kaufpreis", color: "#ef4444" },
              { kosten: "Nicht umlagefähige Nebenkosten", pct: "Versicherung, Verwalter", color: "#F59E0B" },
              { kosten: "Leerstand (statistisch ~3 %)", pct: "Ca. 0,5 Mieten/Jahr", color: "#F59E0B" },
              { kosten: "Einkommensteuer auf Mietgewinn", pct: "Pers. Steuersatz", color: "#7C3AED" },
              { kosten: "Tilgung Hypothek", pct: "Nicht Rendite – aber Cashflow", color: "#0EA5E9" },
            ].map(k => (
              <div key={k.kosten} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: "#ccc", fontSize: "0.78rem" }}>– {k.kosten}</span>
                <span style={{ color: k.color, fontSize: "0.72rem", flexShrink: 0 }}>{k.pct}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Akzeptable Rendite – die Faustregeln</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ background: "#ef444422", borderRadius: "8px", padding: "0.6rem 0.75rem", borderLeft: "3px solid #ef4444" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.82rem" }}>Unter 3 % Netto → Finger weg</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Risiko und Aufwand nicht durch Rendite gedeckt</p>
            </div>
            <div style={{ background: "#F59E0B22", borderRadius: "8px", padding: "0.6rem 0.75rem", borderLeft: "3px solid #F59E0B" }}>
              <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.82rem" }}>3–5 % Netto → Akzeptabel</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Gute Lage, stabile Mieter – passables Investment</p>
            </div>
            <div style={{ background: "#10B98122", borderRadius: "8px", padding: "0.6rem 0.75rem", borderLeft: "3px solid #10B981" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.82rem" }}>Über 5 % Netto → Sehr gut</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Schwer zu finden in Großstädten – B-Lagen prüfen</p>
            </div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Hauptrisiko: Mietausfall + Leerstand</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">Vermietungsrisiken und ihre Häufigkeit</text>
            {[
              { risk: "Leerstand 1 Monat/Jahr", wahr: 30, color: "#F59E0B" },
              { risk: "Mieter zahlt unregelmäßig", wahr: 15, color: "#ef8c34" },
              { risk: "Mieter zahlt gar nicht", wahr: 5, color: "#ef4444" },
              { risk: "Unerwartete Reparatur &gt;2k€", wahr: 20, color: "#7C3AED" },
            ].map((r, i) => {
              const w = r.wahr / 100 * 200
              return (
                <g key={i}>
                  <text x="5" y={33 + i * 26} fill="#888" fontSize="7.5" dominantBaseline="middle">{r.risk}</text>
                  <rect x="155" y={23 + i * 26} width="100" height="14" rx="4" fill="#1a1a2e" />
                  <rect x="155" y={23 + i * 26} width={w / 2} height="14" rx="4" fill={r.color} opacity="0.8" />
                  <text x="260" y={32 + i * 26} fill={r.color} fontSize="7.5" dominantBaseline="middle" textAnchor="end">{r.wahr} %</text>
                </g>
              )
            })}
          </svg>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuerlicher Vorteil: Abschreibung</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Vermietete Immobilien können über <strong style={{ color: "#fff" }}>2 % p.a. (Gebäudeanteil)</strong> steuerlich abgeschrieben werden – reduziert dein zu versteuerndes Einkommen.</p>
          <div style={{ marginTop: "0.75rem", background: "#10B98122", borderRadius: "10px", padding: "0.75rem" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.82rem" }}>Beispiel:</p>
            <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: 1.6 }}>250.000 € Kaufpreis, 70 % Gebäudeanteil = 175.000 € × 2 % = <strong style={{ color: "#fff" }}>3.500 €/Jahr Abschreibung</strong>. Bei 42 % Steuersatz: ~1.470 €/Jahr Steuerersparnis.</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #7C3AED33" }}>
            <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Vor dem Kauf rechnen:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Bruttomietrendite berechnen (&gt;4 % minimal)<br />
              2. Netto kalkulieren (–1 % IH, –Leerstand, –Steuer)<br />
              3. 3 % Netto-Ziel als Mindestanforderung<br />
              4. Mietspiegel für die Lage prüfen (mietspiegel.de)
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Vermietung – Rendite nüchtern kalkulieren</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>Brutto ≠ Netto: Nach Instandhaltung, Leerstand und Steuern bleiben oft nur 60–70 % der Bruttorendite</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Mindest-Nettomietrendite: 3 % – darunter schlägt Risiko und Aufwand die Rendite</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Abschreibung (AfA) 2 % p.a. auf Gebäudeanteil senkt effektiv die Steuerlast</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L806Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [betrag, setBetrag] = useState(100)
  const nach20 = Math.round(betrag * 12 * ((Math.pow(1.06, 20) - 1) / 0.06))
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"100 €/Monat in einen REIT-ETF statt Sparbuch. In 20 Jahren: 46.000 € mehr."</div>
          <p className="cl-hook-sub">Sven, 32 – Immobilien-Exposure ohne Hypothek.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">REIT-ETF Sparplan – was kommt raus?</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Monatliche Sparrate: <strong style={{ color: "#fff" }}>{betrag} €</strong></p>
          <input type="range" min={25} max={1000} step={25} value={betrag} onChange={e => setBetrag(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(betrag, 25, 1000) }} />
          <div style={{ marginTop: "1rem", background: "#10B98122", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
            <p style={{ color: "#10B981", fontSize: "0.8rem" }}>Nach 20 Jahren bei ~6 % p.a.</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem" }}>{nach20.toLocaleString("de")} €</p>
            <p style={{ color: "#888", fontSize: "0.72rem" }}>Einzahlungen: {(betrag * 12 * 20).toLocaleString("de")} € · Zinseszins: {(nach20 - betrag * 12 * 20).toLocaleString("de")} €</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Immobilien-Crowdinvesting</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Viele Kleinanleger finanzieren gemeinsam ein Immobilienprojekt und erhalten <strong style={{ color: "#fff" }}>feste Zinsen</strong> (5–8 % p.a.) über 1–3 Jahre.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, background: "#10B98122", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.75rem" }}>Vorteile</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.5, marginTop: "0.2rem" }}>Hohe Zinsen · Fester Zinssatz · Geringe Einstiegshürde (50–500 €)</p>
            </div>
            <div style={{ flex: 1, background: "#ef444422", borderRadius: "8px", padding: "0.6rem" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.75rem" }}>Risiken</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.5, marginTop: "0.2rem" }}>Nachrangdarlehen · Totalverlust möglich · Keine tägliche Liquidität</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Plattformen im Überblick</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { name: "Exporo", typ: "Crowdinvesting", note: "Ab 500 € · bestandshaltendes + entwicklend", rating: "★★★" },
              { name: "Engel & Völkers Digital", typ: "Crowdinvesting", note: "Ab 100 € · etablierter Makler dahinter", rating: "★★★" },
              { name: "iShares REIT ETF", typ: "REIT-ETF", note: "Ab 1 € · tägl. handelbar · 100+ REITs", rating: "★★★★★" },
              { name: "Realty Income (O)", typ: "REIT Einzelaktie", note: "Monatliche Dividende · US-REIT", rating: "★★★★" },
            ].map(p => (
              <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <div><p style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>{p.name}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{p.typ} · {p.note}</p></div>
                <span style={{ color: "#F59E0B", fontSize: "0.7rem", flexShrink: 0 }}>{p.rating}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Risiko-Rendite-Vergleich</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">Risiko vs. Rendite – Immobilien-Investmentformen</text>
            <line x1="20" y1="120" x2="240" y2="120" stroke="#333" strokeWidth="1" />
            <line x1="20" y1="20" x2="20" y2="120" stroke="#333" strokeWidth="1" />
            <text x="130" y="135" textAnchor="middle" fill="#666" fontSize="7">Risiko →</text>
            <text x="10" y="70" fill="#666" fontSize="7" transform="rotate(-90 10 70)">Rendite →</text>
            {[
              { label: "REIT-ETF", x: 80, y: 70, color: "#10B981" },
              { label: "Einzelner REIT", x: 120, y: 55, color: "#0EA5E9" },
              { label: "Crowdinvesting", x: 160, y: 40, color: "#F59E0B" },
              { label: "Direkte Immo", x: 140, y: 80, color: "#7C3AED" },
            ].map(p => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="6" fill={p.color} opacity="0.8" />
                <text x={p.x} y={p.y - 10} textAnchor="middle" fill={p.color} fontSize="7">{p.label}</text>
              </g>
            ))}
          </svg>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Für Einsteiger: REIT-ETF als Ergänzung</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Empfehlung: Immobilien-Anteil im Depot über einen <strong style={{ color: "#fff" }}>REIT-ETF</strong> aufbauen – 5–15 % des Portfolios.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {[
              ["📊", "Basis: 80 % MSCI World ETF", "Kernportfolio"],
              ["🏢", "Ergänzung: 10 % REIT-ETF", "Immobilien-Exposure"],
              ["🌍", "Optional: 10 % Emerging Markets", "Wachstumsmärkte"],
            ].map(([ic, tit, note]) => (
              <div key={tit} style={{ display: "flex", gap: "0.6rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span>{ic}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.82rem" }}>{tit}</p><p style={{ color: "#666", fontSize: "0.72rem" }}>{note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #0EA5E933" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Einstieg heute:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. REIT-ETF in bestehendem Depot suchen<br />
              2. iShares Developed Real Estate (IE00B1FZS350)<br />
              3. Sparplan {betrag} €/Monat einrichten<br />
              4. Nach 20 Jahren: ~{nach20.toLocaleString("de")} € Immobilien-Exposure
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Immobilien-ETFs & Crowdinvesting</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📈</span><p>REIT-ETF: Immobilien ab 1 €, täglich handelbar, weltweite Diversifikation</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Crowdinvesting: hohe Zinsen (5–8 %) aber Nachrangdarlehen mit Totalverlustrisiko</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏗️</span><p>Empfehlung: 10 % REIT-ETF als Immobilien-Ergänzung im Portfolio</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L903Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [brutto, setBrutto] = useState(45000)
  const grenze = 69300
  const pkv = brutto >= grenze
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich wechselte mit 35 in die PKV – tolle Leistungen, 180 € im Monat. Mit 60 in der Rente: 680 €/Monat."</div>
          <p className="cl-hook-sub">Rainer, 62 – der PKV-Beitrag im Rentenalter überrascht viele.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">GKV vs. PKV – der grundlegende Unterschied</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ flex: 1, background: "#0EA5E922", borderRadius: "8px", padding: "0.6rem", borderTop: "2px solid #0EA5E9" }}>
              <p style={{ color: "#0EA5E9", fontWeight: 700, fontSize: "0.75rem" }}>GKV</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.6, marginTop: "0.2rem" }}>Beitrag nach Einkommen · Familie mitversichert (kostenlos) · Solidarsystem · Kein Rückweg</p>
            </div>
            <div style={{ flex: 1, background: "#7C3AED22", borderRadius: "8px", padding: "0.6rem", borderTop: "2px solid #7C3AED" }}>
              <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.75rem" }}>PKV</p>
              <p style={{ color: "#aaa", fontSize: "0.72rem", lineHeight: 1.6, marginTop: "0.2rem" }}>Beitrag nach Risiko/Alter · Familie kostet extra · Bessere Leistungen · Beiträge steigen im Alter</p>
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wer darf in die PKV?</h2>
          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>Dein Jahresbrutto: <strong style={{ color: brutto >= grenze ? "#10B981" : "#F59E0B" }}>{brutto.toLocaleString("de")} €</strong></p>
          <input type="range" min={20000} max={120000} step={1000} value={brutto} onChange={e => setBrutto(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(brutto, 20000, 120000) }} />
          <div style={{ marginTop: "0.75rem", background: pkv ? "#10B98122" : "#F59E0B22", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
            {pkv ? (
              <>
                <p style={{ color: "#10B981", fontWeight: 700 }}>✅ PKV-Wahl möglich</p>
                <p style={{ color: "#ccc", fontSize: "0.82rem", marginTop: "0.2rem" }}>Über Versicherungspflichtgrenze ({grenze.toLocaleString("de")} €)</p>
              </>
            ) : (
              <>
                <p style={{ color: "#F59E0B", fontWeight: 700 }}>⚠️ GKV-Pflicht</p>
                <p style={{ color: "#ccc", fontSize: "0.82rem", marginTop: "0.2rem" }}>Unter {grenze.toLocaleString("de")} € → GKV Pflichtversicherung</p>
              </>
            )}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">PKV-Vorteile und wo sie täuschen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { punkt: "Chefarztbehandlung & Einzelzimmer", real: true, note: "Echter Mehrwert im Krankenhaus" },
              { punkt: "Schnellere Arzttermine", real: true, note: "Statistisch kürzere Wartezeiten" },
              { punkt: "Niedrige Prämien im jungen Alter", real: true, note: "Spart anfangs – steigt aber stark" },
              { punkt: "Günstiger im Alter", real: false, note: "Falsch: Beiträge steigen stark mit Alter" },
              { punkt: "Kinder kostenlos mitversichert", real: false, note: "Falsch: jedes Kind extra Beitrag in PKV" },
            ].map(p => (
              <div key={p.punkt} style={{ display: "flex", gap: "0.5rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: p.real ? "#10B981" : "#ef4444" }}>{p.real ? "✅" : "❌"}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.78rem" }}>{p.punkt}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{p.note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Rentenproblem der PKV</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">PKV-Monatsbeitrag nach Alter (Beispiel)</text>
            {[
              { alter: "30", beitrag: 180, color: "#10B981" },
              { alter: "40", beitrag: 280, color: "#F59E0B" },
              { alter: "50", beitrag: 420, color: "#ef8c34" },
              { alter: "60", beitrag: 620, color: "#ef4444" },
              { alter: "70 (Rente)", beitrag: 680, color: "#9D174D" },
            ].map((d, i) => {
              const h = (d.beitrag / 680) * 80
              const x = 15 + i * 46
              return (
                <g key={i}>
                  <rect x={x} y={95 - h} width="38" height={h} rx="3" fill={d.color} opacity="0.8" />
                  <text x={x + 19} y={90 - h} textAnchor="middle" fill="white" fontSize="8" fontWeight="700">{d.beitrag} €</text>
                  <text x={x + 19} y="108" textAnchor="middle" fill="#888" fontSize="7">{d.alter} J.</text>
                </g>
              )
            })}
            <text x="130" y="120" textAnchor="middle" fill="#888" fontSize="6.5">ohne AG-Zuschuss im Rentenalter</text>
          </svg>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Für wen eignet sich die PKV?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { gruppe: "Single · Gutverdiener · jung · gesund", empf: "PKV kann sinnvoll sein", ok: true },
              { gruppe: "Familie mit Kindern", empf: "GKV meist günstiger (Kinder kostenlos)", ok: false },
              { gruppe: "Selbstständige / Freiberufler", empf: "PKV oft die einzige vollwertige Option", ok: true },
              { gruppe: "Beamte (Beihilfe)", empf: "PKV fast immer die richtige Wahl", ok: true },
              { gruppe: "Niedriges Einkommen im Alter geplant", empf: "GKV besser – Beiträge sinken mit Einkommen", ok: false },
            ].map(g => (
              <div key={g.gruppe} style={{ display: "flex", gap: "0.5rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span style={{ color: g.ok ? "#10B981" : "#ef4444" }}>{g.ok ? "✅" : "⚠️"}</span>
                <div><p style={{ color: "#ccc", fontSize: "0.75rem" }}>{g.gruppe}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{g.empf}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #7C3AED33" }}>
            <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>PKV-Entscheidungshilfe:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Bin ich dauerhaft über {grenze.toLocaleString("de")} €?<br />
              2. Habe ich/plane ich Familie?<br />
              3. Was sind meine Beiträge mit 65 Jahren?<br />
              4. Freier Berater ohne PKV-Provision fragen
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">GKV vs. PKV – lebenslange Entscheidung</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📋</span><p>PKV erst ab 69.300 € Jahresbrutto (2024) – und nur wenn dauerhaft darüber</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">👨‍👩‍👧</span><p>Familie? GKV: Kinder kostenlos mitversichert. PKV: Jedes Kind kostet extra Beitrag</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📈</span><p>PKV-Beiträge steigen im Alter massiv – im Rentenalter ohne AG-Zuschuss teuer</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L904Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [netto, setNetto] = useState(3000)
  const [erwartetRente, setErwartetRente] = useState(1200)
  const luecke = Math.max(0, Math.round(netto * 0.8) - erwartetRente)
  const kapitalBedarf = luecke * 12 * 20
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich dachte die Rente reicht. Dann rechnete ich: 48 % des Bruttogehalts – vor Krankenvers. und Steuern."</div>
          <p className="cl-hook-sub">Klaus, 45 – die erste Rentenhochrechnung war ernüchternd.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was die gesetzliche Rente wirklich zahlt</h2>
          <svg viewBox="0 0 260 130" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">3.000 € Nettoeinkommen – was die Rente deckt</text>
            <rect x="20" y="25" width="100" height="90" rx="6" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
            <rect x="20" y={115 - 90} width="100" height="90" rx="6" fill="#0EA5E9" opacity="0.7" />
            <text x="70" y="60" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">3.000 €</text>
            <text x="70" y="75" textAnchor="middle" fill="white" fontSize="7">Nettoeinkommen</text>
            <rect x="145" y="25" width="100" height="90" rx="6" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
            <rect x="145" y={115 - 42} width="100" height="42" rx="6" fill="#F59E0B" opacity="0.7" />
            <text x="195" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">~1.200 €</text>
            <text x="195" y="100" textAnchor="middle" fill="white" fontSize="7">Gesetzl. Rente</text>
            <text x="195" y="50" textAnchor="middle" fill="#ef4444" fontSize="8">–1.800 €</text>
            <text x="195" y="62" textAnchor="middle" fill="#ef4444" fontSize="7">Lücke!</text>
          </svg>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Deine Rentenlücke berechnen</h2>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.3rem" }}>Aktuelles Nettoeinkommen: <strong style={{ color: "#fff" }}>{netto.toLocaleString("de")} €</strong></p>
          <input type="range" min={1500} max={8000} step={100} value={netto} onChange={e => setNetto(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(netto, 1500, 8000) }} />
          <p style={{ color: "#888", fontSize: "0.78rem", margin: "0.5rem 0 0.3rem" }}>Erwartete Rente: <strong style={{ color: "#fff" }}>{erwartetRente.toLocaleString("de")} €</strong></p>
          <input type="range" min={400} max={3000} step={50} value={erwartetRente} onChange={e => setErwartetRente(+e.target.value)} className="rc-slider rc-slider-full" style={{ background: sliderBg(erwartetRente, 400, 3000) }} />
          <div style={{ marginTop: "0.75rem", background: "#ef444422", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
            <p style={{ color: "#ef4444", fontSize: "0.8rem" }}>Monatliche Lücke</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem" }}>{luecke.toLocaleString("de")} €/Monat</p>
            <p style={{ color: "#888", fontSize: "0.72rem" }}>Benötigtes Kapital über 20 Rentenjahre: {kapitalBedarf.toLocaleString("de")} €</p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Rentenniveau in Zahlen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ color: "#888", fontSize: "0.78rem" }}>Gesetzliches Rentenniveau 2024</p>
              <p style={{ color: "#F59E0B", fontWeight: 800, fontSize: "1rem" }}>48 % des Durchschnittsbruttogehalts</p>
              <p style={{ color: "#666", fontSize: "0.72rem" }}>VOR Steuern und Krankenversicherungsbeiträgen</p>
            </div>
            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ color: "#888", fontSize: "0.78rem" }}>Effektiv ausgezahlte Rente</p>
              <p style={{ color: "#ef4444", fontWeight: 800, fontSize: "1rem" }}>~35–38 % des letzten Nettogehalts</p>
              <p style={{ color: "#666", fontSize: "0.72rem" }}>Nach Abzug Steuern + GKV/PKV-Beiträge auf Rente</p>
            </div>
            <div style={{ background: "#ef444422", borderRadius: "8px", padding: "0.6rem 0.75rem" }}>
              <p style={{ color: "#ef4444", fontSize: "0.78rem" }}>Prognose 2040–2060</p>
              <p style={{ color: "#fff", fontWeight: 700 }}>Rentenniveau fällt auf ~43 %</p>
            </div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die 3 Säulen der Altersvorsorge</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { saule: "1. Säule: Gesetzliche Rente", note: "Pflicht · reicht nicht · schrumpft weiter", farbe: "#ef4444" },
              { saule: "2. Säule: Betriebliche AV", note: "bAV, Riester (AN), Rürup (Selbst.) – staatlich gefördert", farbe: "#F59E0B" },
              { saule: "3. Säule: Private Vorsorge", note: "ETF-Sparplan, Immobilien, private RV – dein stärkster Hebel", farbe: "#10B981" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem", borderLeft: `3px solid ${s.farbe}` }}>
                <p style={{ color: s.farbe, fontWeight: 700, fontSize: "0.82rem" }}>{s.saule}</p>
                <p style={{ color: "#888", fontSize: "0.75rem" }}>{s.note}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.6rem" }}>Säule 3 (ETF) ist für die meisten der effektivste Weg zur Lückenschließung.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wie viel musst du monatlich sparen?</h2>
          <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.88rem" }}>Ziel: Lücke von {luecke.toLocaleString("de")} €/Monat über 20 Rentenjahre schließen. Kapital gesucht: <strong style={{ color: "#fff" }}>{kapitalBedarf.toLocaleString("de")} €</strong></p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {[
              { jahre: 10, rate: Math.round(kapitalBedarf / (((Math.pow(1.07, 10) - 1) / 0.07) * 12)) },
              { jahre: 20, rate: Math.round(kapitalBedarf / (((Math.pow(1.07, 20) - 1) / 0.07) * 12)) },
              { jahre: 30, rate: Math.round(kapitalBedarf / (((Math.pow(1.07, 30) - 1) / 0.07) * 12)) },
            ].map(r => (
              <div key={r.jahre} style={{ display: "flex", justifyContent: "space-between", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ color: "#ccc", fontSize: "0.8rem" }}>Noch {r.jahre} Jahre bis Rente</span>
                <span style={{ color: r.jahre >= 20 ? "#10B981" : "#F59E0B", fontWeight: 700 }}>{r.rate.toLocaleString("de")} €/Mon</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Altersvorsorge-Start:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Rentenbescheid lesen (rentenauskunft.de)<br />
              2. Rentenlücke berechnen (s. oben)<br />
              3. ETF-Sparplan als Säule 3 einrichten<br />
              4. bAV beim Arbeitgeber anfragen
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Rentenlücke – jetzt handeln nicht später</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Gesetzliche Rente: nur ~48 % des Bruttos, effektiv ~35–38 % netto – nicht ausreichend</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>3 Säulen: Gesetzl. Rente + bAV + ETF-Sparplan – alle 3 nutzen für maximale Absicherung</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⏰</span><p>Je früher gestartet, desto weniger monatliche Rate nötig – Zinseszins multipliziert den Vorsprung</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L905Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [checked, setChecked] = useState([])
  const toggle = (id) => setChecked(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id])
  const versicherungen = [
    { id: 1, name: "Private Haftpflicht", kategorie: "Pflicht", behalten: true, preis: "~60 €/Jahr" },
    { id: 2, name: "Berufsunfähigkeit", kategorie: "Kritisch", behalten: true, preis: "~800–1.500 €/Jahr" },
    { id: 3, name: "Hausrat", kategorie: "Wichtig", behalten: true, preis: "~100–150 €/Jahr" },
    { id: 4, name: "Kfz-Haftpflicht", kategorie: "Pflicht", behalten: true, preis: "~200–500 €/Jahr" },
    { id: 5, name: "Rechtsschutz", kategorie: "Optional", behalten: false, preis: "~200–400 €/Jahr" },
    { id: 6, name: "Reiserücktritt", kategorie: "Oft unnötig", behalten: false, preis: "~50–100 €/Jahr" },
  ]
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich prüfte meine Versicherungen. 400 €/Jahr für Produkte die ich nie brauchen würde. Gekündigt."</div>
          <p className="cl-hook-sub">Emma, 29 – der Versicherungs-Audit spart ihr 400 € im Jahr.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Deutsche überzahlen im Schnitt 400 €/Jahr</h2>
          <svg viewBox="0 0 260 110" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">Durchschnittliche Versicherungsausgaben pro Jahr</text>
            {[
              { kat: "Notwendig", val: 980, color: "#10B981" },
              { kat: "Überflüssig", val: 400, color: "#ef4444" },
              { kat: "Doppelt vers.", val: 150, color: "#F59E0B" },
            ].map((d, i) => {
              const w = (d.val / 980) * 160
              return (
                <g key={i}>
                  <text x="5" y={32 + i * 32} fill="#888" fontSize="8" dominantBaseline="middle">{d.kat}</text>
                  <rect x="90" y={22 + i * 32} width="170" height="18" rx="4" fill="#1a1a2e" />
                  <rect x="90" y={22 + i * 32} width={w} height="18" rx="4" fill={d.color} opacity="0.8" />
                  <text x={90 + w - 5} y={33 + i * 32} textAnchor="end" fill="white" fontSize="8" fontWeight="700" dominantBaseline="middle">{d.val.toLocaleString("de")} €</text>
                </g>
              )
            })}
          </svg>
          <p style={{ color: "#10B981", fontSize: "0.78rem", textAlign: "center", marginTop: "0.25rem" }}>400 € Überzahlung vermeiden = 8.000 € in 20 Jahren im ETF</p>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dein Versicherungs-Audit</h2>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: "0.5rem" }}>Tippe auf Versicherungen die du aktuell hast:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {versicherungen.map(v => (
              <div key={v.id} onClick={() => toggle(v.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: checked.includes(v.id) ? "#1a1a2e" : "#0d1117", borderRadius: "8px", padding: "0.45rem 0.75rem", border: checked.includes(v.id) ? "1px solid #0EA5E944" : "1px solid transparent", cursor: "pointer" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: checked.includes(v.id) ? "#0EA5E9" : "#333", border: "1px solid #333", flexShrink: 0 }} />
                  <div><p style={{ color: "#ccc", fontSize: "0.78rem" }}>{v.name}</p><p style={{ color: "#666", fontSize: "0.68rem" }}>{v.preis}</p></div>
                </div>
                <span style={{ color: v.behalten ? "#10B981" : "#F59E0B", fontSize: "0.7rem" }}>{v.kategorie}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wann habe ich ein Sonderkündigungsrecht?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
            {[
              { anlass: "Beitragserhöhung durch Versicherer", frist: "Sofort kündbar nach Erhalt der Mitteilung" },
              { anlass: "Nach reguliertem Schadensfall", frist: "Innerhalb 1 Monat nach Schadenszahlung" },
              { anlass: "Reguläre Kündigung", frist: "3 Monate vor Jahresende (31.12.)" },
              { anlass: "Wechsel zu besserem Angebot", frist: "Ordentliche Kündigung zum Vertragsende" },
            ].map(s => (
              <div key={s.anlass} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
                <p style={{ color: "#F59E0B", fontSize: "0.8rem", fontWeight: 600 }}>{s.anlass}</p>
                <p style={{ color: "#888", fontSize: "0.75rem" }}>{s.frist}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Richtig vergleichen – worauf es ankommt</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { schritt: "1. Leistungsumfang prüfen", note: "Was ist konkret versichert? Was ausgeschlossen?" },
              { schritt: "2. Bedingungen lesen", note: "Wartezeiten, Ausschlüsse, Selbstbehalt" },
              { schritt: "3. Preis vergleichen", note: "Check24, Verivox, oder unabhängiger Makler" },
              { schritt: "4. Bewertungen checken", note: "Stiftung Warentest, Finanztest, TrustPilot" },
            ].map(s => (
              <div key={s.schritt} style={{ display: "flex", gap: "0.5rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ color: "#0EA5E9", fontSize: "0.9rem" }}>→</span>
                <div><p style={{ color: "#ccc", fontSize: "0.8rem" }}>{s.schritt}</p><p style={{ color: "#666", fontSize: "0.7rem" }}>{s.note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Doppelversicherungen erkennen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { a: "Auslandskrankenv. über Kreditkarte", b: "Extra Auslandskrankenvers.", note: "Eine reicht" },
              { a: "Hausrat-Police inkl. Glasversicherung", b: "Extra Glasbruchversicherung", note: "Prüfen ob beide nötig" },
              { a: "Kasko inkl. Fahrerunfallschutz", b: "Extra Unfallversicherung", note: "Möglicherweise doppelt" },
              { a: "Risikolebensversicherung", b: "Restschuldversicherung", note: "RLV fast immer besser" },
            ].map(d => (
              <div key={d.a} style={{ background: "#1a1a2e", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                  <span style={{ color: "#ccc", fontSize: "0.75rem" }}>{d.a}</span>
                  <span style={{ color: "#666" }}>+</span>
                  <span style={{ color: "#ccc", fontSize: "0.75rem" }}>{d.b}</span>
                </div>
                <p style={{ color: "#F59E0B", fontSize: "0.7rem", marginTop: "0.1rem" }}>⚠️ {d.note}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #10B98133" }}>
            <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Versicherungs-Audit heute:</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Alle Versicherungsverträge auflisten<br />
              2. Überflüssige identifizieren (Checkliste nächste Karte)<br />
              3. Sonderkündigungsrecht bei Preiserhöhung nutzen<br />
              4. Vergleich: Check24 oder Finanztest
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Versicherungen optimieren – 400 €/Jahr zurück</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔍</span><p>Audit: Alle Verträge auflisten, überflüssige kündigen, Doppelversicherungen entfernen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚡</span><p>Sonderkündigungsrecht: Bei Beitragserhöhung sofort kündbar – Vorteil nutzen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>Erst Leistungen vergleichen, dann Preis – der günstigste Preis ist wertlos ohne Deckung</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L906Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [gezeigt, setGezeigt] = useState(null)
  const unnoetig = [
    { id: 1, name: "Handyversicherung", grund: "Kosten 70–120 €/Jahr. Selbst ansparen (10 €/Monat = 120 €/Jahr) ist günstiger und flexibler.", ersatz: "Selbst ansparen statt versichern" },
    { id: 2, name: "Restschuldversicherung", grund: "Oft 5–10× teurer als eine Risikolebensversicherung, mit schlechten Bedingungen und Ausschlüssen.", ersatz: "Risikolebensversicherung" },
    { id: 3, name: "Reiserücktrittsversicherung", grund: "Lohnt nur bei teuren, nicht stornierbaren Reisen. Standard-Urlauber brauchen sie meist nicht.", ersatz: "Kreditkarte mit Reiseschutz prüfen" },
    { id: 4, name: "Brillenversicherung", grund: "Prämien übersteigen oft den Leistungswert. Brillen werden günstiger, Leistung bleibt begrenzt.", ersatz: "Sparbetrag für neue Brille anlegen" },
    { id: 5, name: "Tierversicherung/Tierkrankenvers.", grund: "Meist sehr teuer, viele Ausschlüsse, Beiträge steigen mit Tieralter stark.", ersatz: "Tierarztrücklage aufbauen" },
  ]
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ich hatte Handyversicherung, Brillenversicherung, Reiserücktritt – und nie eine einzige Leistung gebraucht. 480 € im Müll."</div>
          <p className="cl-hook-sub">Lea, 31 – der Versicherungscheck befreite sie von 5 Verträgen.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die 5 überflüssigsten Versicherungen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginTop: "0.5rem" }}>
            {unnoetig.map(v => (
              <div key={v.id} onClick={() => setGezeigt(gezeigt === v.id ? null : v.id)} style={{ background: gezeigt === v.id ? "#1a1a2e" : "#0d1117", borderRadius: "8px", padding: "0.5rem 0.75rem", border: gezeigt === v.id ? "1px solid #ef444433" : "1px solid transparent", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#ccc", fontSize: "0.82rem" }}>❌ {v.name}</span>
                  <span style={{ color: "#666", fontSize: "0.75rem" }}>{gezeigt === v.id ? "▲" : "▼"}</span>
                </div>
                {gezeigt === v.id && <div style={{ marginTop: "0.4rem" }}>
                  <p style={{ color: "#ef4444", fontSize: "0.75rem", lineHeight: 1.5 }}>{v.grund}</p>
                  <p style={{ color: "#10B981", fontSize: "0.75rem", marginTop: "0.25rem" }}>→ Besser: {v.ersatz}</p>
                </div>}
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Selbstversicherungsprinzip</h2>
          <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: "0.88rem" }}>Bei kleinen Risiken (unter 1.000 €): <strong style={{ color: "#fff" }}>selbst ansparen statt versichern</strong>. Versicherung lohnt nur für Risiken die du nicht selbst tragen kannst.</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ background: "#10B98122", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.82rem" }}>Versichern lohnt sich bei:</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Existenzbedrohenden Risiken – Haftpflicht (Millionen €), BU (dein Einkommen), Krankenversicherung</p>
            </div>
            <div style={{ background: "#ef444422", borderRadius: "8px", padding: "0.5rem 0.75rem" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.82rem" }}>Selbst tragen bei:</p>
              <p style={{ color: "#aaa", fontSize: "0.75rem" }}>Kleinen Risiken unter 500–1.000 €. Handy, Brille, Fernseher – selbst ansparen kostet weniger</p>
            </div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Diese 4 Versicherungen MUSST du haben</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" }}>
            {[
              { name: "Private Haftpflicht", note: "Schützt bei Schäden die du anderen zufügst – bis zu Millionen €", preis: "~60 €/Jahr" },
              { name: "Berufsunfähigkeit", note: "Sichert dein Einkommen wenn du nicht mehr arbeiten kannst", preis: "~800–1.500 €/Jahr" },
              { name: "Krankenversicherung", note: "Gesetzlich Pflicht – GKV oder PKV je nach Situation", preis: "je nach EK" },
              { name: "Hausrat (wenn Mieter)", note: "Schützt dein Eigentum – besonders bei wertvollen Gegenständen", preis: "~100–150 €/Jahr" },
            ].map(v => (
              <div key={v.name} style={{ display: "flex", gap: "0.5rem", background: "#10B98111", borderRadius: "8px", padding: "0.45rem 0.75rem" }}>
                <span style={{ color: "#10B981" }}>✅</span>
                <div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between" }}><p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>{v.name}</p><span style={{ color: "#10B981", fontSize: "0.72rem" }}>{v.preis}</span></div><p style={{ color: "#666", fontSize: "0.7rem" }}>{v.note}</p></div>
              </div>
            ))}
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Warum die Restschuldversicherung Abzocke ist</h2>
          <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.88rem" }}>Restschuldversicherung soll Kredit absichern wenn du stirbst oder arbeitslos wirst. Klingt gut – aber:</p>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {[
              ["💸", "Kostet 3–8 % der Kreditsumme einmalig – nicht transparent ausgewiesen"],
              ["❌", "Viele Ausschlüsse: Vorerkrankungen, erste 3–6 Monate gelten oft nicht"],
              ["📉", "Versicherungssumme sinkt mit der Tilgung – Kosten bleiben fix"],
              ["✅", "Besser: Risikolebensversicherung – 10× günstiger, klare Konditionen"],
            ].map(([ic, text]) => (
              <div key={text} style={{ display: "flex", gap: "0.5rem", background: "#1a1a2e", borderRadius: "8px", padding: "0.4rem 0.75rem" }}>
                <span>{ic}</span>
                <p style={{ color: "#aaa", fontSize: "0.78rem" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Sparen durch Kündigung – Rechnung</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.5rem" }}>
            <text x="130" y="12" textAnchor="middle" fill="#888" fontSize="8">Typische unnötige Versicherungskosten/Jahr</text>
            {[
              { name: "Handy", kosten: 100 },
              { name: "Brille", kosten: 80 },
              { name: "Reiserücktritt", kosten: 70 },
              { name: "Restschuld", kosten: 150 },
            ].map((v, i) => {
              const w = (v.kosten / 150) * 160
              return (
                <g key={i}>
                  <text x="5" y={32 + i * 26} fill="#888" fontSize="8" dominantBaseline="middle">{v.name}</text>
                  <rect x="60" y={22 + i * 26} width="170" height="16" rx="4" fill="#1a1a2e" />
                  <rect x="60" y={22 + i * 26} width={w} height="16" rx="4" fill="#ef4444" opacity="0.7" />
                  <text x={60 + w + 4} y={32 + i * 26} fill="#ef4444" fontSize="8" dominantBaseline="middle">{v.kosten} €</text>
                </g>
              )
            })}
            <text x="130" y="112" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="700">Gesamt: 400 €/Jahr · 20 Jahre im ETF: ~16.000 €</text>
          </svg>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">So machst du das jetzt</h2>
          <div style={{ background: "#0f1923", borderRadius: "10px", padding: "1rem", border: "1px solid #ef444433" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>Heute kündigen (falls vorhanden):</p>
            <p style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: 1.8 }}>
              1. Handyversicherung → stattdessen 10 €/Monat sparen<br />
              2. Brillenversicherung → Brillenrücklage anlegen<br />
              3. Restschuldversicherung → Risikoleben prüfen<br />
              4. Reiserücktritt → nur bei Luxusreise ab 1.000 €
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">5 Versicherungen die du jetzt kündigen kannst</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📵</span><p>Handyversicherung: 100 €/Jahr für selten genutzten Schutz – selbst ansparen statt versichern</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p>Restschuldversicherung: 3–8 % der Kreditsumme – Risikolebensversicherung 10× günstiger</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Nur große existenzielle Risiken versichern – kleine Risiken selbst tragen und ansparen</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

// ─── Hebel & Optionen Screens ────────────────────────────────────────────────

function L401Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [einsatz, setEinsatz]     = useState(1000)
  const [hebel, setHebel]         = useState(10)
  const [bewegung, setBewegung]   = useState(10)
  const positionswert  = einsatz * hebel
  const gewinnVerlust  = Math.round(positionswert * bewegung / 100)
  const renditeEinsatz = Math.round((gewinnVerlust / einsatz) * 100)
  const liquidiert     = renditeEinsatz <= -100

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ein Trader setzt 1.000 € mit 10× Hebel ein. Der Markt fällt 10 %. Er verliert nicht 100 € – er verliert alles."</div>
          <p className="cl-hook-sub">Hebel multipliziert Gewinne. Und Verluste.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein Hebel?</h2>
          <p className="cl-card-sub">Stell dir vor, du willst ein Haus kaufen das 100.000 € kostet.</p>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem", lineHeight: 1.7 }}>
            <p style={{ color: "#ccc", fontSize: "0.9rem" }}>
              Du hast nur 10.000 € Eigenkapital. Die Bank leiht dir 90.000 €. Du kontrollierst das gesamte Haus – aber mit 10× Hebel.<br /><br />
              Steigt das Haus um 10 % → du hast 10.000 € gewonnen. Das sind <strong style={{ color: "#10B981" }}>100 % Rendite auf deinen Einsatz</strong>.<br /><br />
              Fällt es um 10 % → <strong style={{ color: "#ef4444" }}>dein gesamtes Eigenkapital ist weg.</strong>
            </p>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>Leverage kommt aus dem Englischen: Hebel. In der Finanzwelt bedeutet es: mehr kontrollieren als man tatsächlich besitzt.</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Margin – die Sicherheitsleistung</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "💰", name: "Initial Margin", val: "Betrag den du bei Eröffnung hinterlegst (z.B. 1.000 €)" },
              { icon: "⚠️", name: "Maintenance Margin", val: "Mindestbetrag um die Position offen zu halten" },
              { icon: "📞", name: "Margin Call", val: "Warnung: Nachschuss erforderlich oder Position wird geschlossen" },
              { icon: "💀", name: "Liquidation", val: "Automatische Schließung wenn Kapital erschöpft ist" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Hebel multipliziert ALLES</h2>
          <p className="cl-card-sub">Visualisierung: 1.000 € Einsatz, verschiedene Hebel</p>
          <svg viewBox="0 0 260 160" style={{ width: "100%", marginTop: "0.75rem" }}>
            {[
              { hebel: "1×", gewinn: 100, verlust: -100, x: 20 },
              { hebel: "5×", gewinn: 500, verlust: -500, x: 80 },
              { hebel: "10×", gewinn: 1000, verlust: -1000, x: 140 },
              { hebel: "20×", gewinn: 2000, verlust: -2000, x: 200 },
            ].map((d, i) => {
              const maxVal = 2000
              const ghPx = Math.min((Math.abs(d.gewinn) / maxVal) * 60, 60)
              const vlPx = Math.min((Math.abs(d.verlust) / maxVal) * 60, 60)
              return (
                <g key={i}>
                  <rect x={d.x} y={80 - ghPx} width="40" height={ghPx} fill="#10B981" rx="3" opacity="0.85" />
                  <rect x={d.x} y={80} width="40" height={vlPx} fill="#ef4444" rx="3" opacity="0.85" />
                  <text x={d.x + 20} y={74 - ghPx} textAnchor="middle" fill="#10B981" fontSize="7.5" fontWeight="700">+{d.gewinn}€</text>
                  <text x={d.x + 20} y={85 + vlPx} textAnchor="middle" fill="#ef4444" fontSize="7.5" fontWeight="700">{d.verlust}€</text>
                  <text x={d.x + 20} y="155" textAnchor="middle" fill="#888" fontSize="8">{d.hebel}</text>
                </g>
              )
            })}
            <line x1="10" y1="80" x2="250" y2="80" stroke="#444" strokeWidth="1" />
            <text x="10" y="13" fill="#666" fontSize="7">Markt +10% – Gewinn/Verlust auf 1.000 € Einsatz</text>
          </svg>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Hebel-Rechner</h2>
          <p className="cl-card-sub">Einsatz: <strong>{einsatz.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={100} max={5000} step={100} value={einsatz} onChange={e => setEinsatz(Number(e.target.value))} className="rc-slider rc-slider-full" style={{ background: sliderBg(einsatz, 100, 5000), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Hebel: <strong>{hebel}×</strong></p>
          <input type="range" min={2} max={20} step={1} value={hebel} onChange={e => setHebel(Number(e.target.value))} className="rc-slider rc-slider-full" style={{ background: sliderBg(hebel, 2, 20), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Marktbewegung: <strong style={{ color: bewegung >= 0 ? "#10B981" : "#ef4444" }}>{bewegung >= 0 ? "+" : ""}{bewegung} %</strong></p>
          <input type="range" min={-50} max={50} step={1} value={bewegung} onChange={e => setBewegung(Number(e.target.value))} className="rc-slider rc-slider-full" style={{ background: sliderBg(bewegung + 50, 0, 100), marginBottom: "1rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>Positionswert</span><span>{positionswert.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Gewinn/Verlust</span><span className="cl-kaffee-wert cl-kaffee-big" style={{ color: gewinnVerlust >= 0 ? "#10B981" : "#ef4444" }}>{gewinnVerlust >= 0 ? "+" : ""}{gewinnVerlust.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Rendite auf Einsatz</span><span style={{ color: renditeEinsatz >= 0 ? "#10B981" : "#ef4444", fontWeight: 700 }}>{renditeEinsatz >= 0 ? "+" : ""}{renditeEinsatz} %</span></div>
          </div>
          {liquidiert && <div style={{ background: "#ef444422", border: "1px solid #ef444455", borderRadius: "8px", padding: "0.6rem 0.8rem", marginTop: "0.75rem" }}><p style={{ color: "#ef4444", fontSize: "0.82rem", margin: 0, fontWeight: 600 }}>⚠️ LIQUIDATION – Totalverlust des Einsatzes</p></div>}
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Liquidations-Falle</h2>
          <p className="cl-card-sub">Wie schnell ist man liquidiert?</p>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            {[
              { hebel: "2×", abstand: "50 %" },
              { hebel: "5×", abstand: "20 %" },
              { hebel: "10×", abstand: "10 %" },
              { hebel: "20×", abstand: "5 %" },
              { hebel: "100×", abstand: "1 %" },
            ].map(r => (
              <div key={r.hebel} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #2a2040" }}>
                <span style={{ color: "#ccc", fontWeight: 600 }}>{r.hebel} Hebel</span>
                <span style={{ color: "#ef4444" }}>Liquidation bei −{r.abstand}</span>
              </div>
            ))}
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">⚠️</span>
            <p>Bitcoin schwankt täglich 2–5 %. Bei 20× Hebel reicht eine normale Tagesbewegung für den Totalverlust.</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wer nutzt Hebelprodukte wirklich?</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏦</span><p><strong>Institutionen:</strong> Hedgefonds zur Renditeoptimierung und Absicherung – mit professionellem Risikomanagement</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✈️</span><p><strong>Airlines & Industrie:</strong> Futures zur Preissicherung von Rohstoffen – legitimes Hedging</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p><strong>Privatanleger:</strong> Oft Zocken und FOMO – ohne Strategie, ohne Risikomanagement. Ergebnis: 74–85 % verlieren</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Wichtigste über Hebelprodukte</h2>
          <p className="cl-card-sub">3 Regeln die du dir merken musst</p>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📐</span><p>Hebel multipliziert Gewinne UND Verluste – symmetrisch. Es gibt kein "Heads I win, Tails you lose"</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💀</span><p>Totalverlust ist keine Ausnahme – bei hohem Hebel ist er die Normalität. Liquidation in Sekunden möglich</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Für 95 % der Privatanleger: Finger weg. Ein ETF-Sparplan schlägt Trading langfristig – ohne Stress</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L402Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"CFD-Anbieter verdienen wenn du verlierst. 74 % der Privatanleger verlieren Geld mit CFDs."</div>
          <p className="cl-hook-sub">Das steht in der Pflichtangabe jedes EU-regulierten Anbieters.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein CFD?</h2>
          <p className="cl-card-sub">Contract for Difference – Differenzkontrakt</p>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.9rem" }}>
              Du wettest auf die Kursbewegung eines Assets – Aktie, Index, Rohstoff, Krypto – <strong style={{ color: "#fff" }}>ohne es jemals zu besitzen</strong>.<br /><br />
              Apple steht bei 190 $. Du öffnest einen Long-CFD. Apple steigt auf 200 $ → du bekommst 10 $ pro CFD.<br />
              Apple fällt auf 180 $ → du verlierst 10 $ pro CFD.<br /><br />
              Dazu kommt ein Hebel der alles multipliziert.
            </p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">CFD vs. direkter Aktienkauf</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.75rem" }}>
            <rect x="5" y="10" width="115" height="120" rx="8" fill="#1a1a2e" stroke="#7C3AED44" strokeWidth="1" />
            <text x="62" y="30" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="700">DIREKT KAUF</text>
            {[
              "✅ Du besitzt die Aktie",
              "✅ Dividendenberechtigt",
              "✅ Kein Ablaufdatum",
              "✅ Kein Overnight-Zins",
              "❌ Kein Hebel",
            ].map((t, i) => <text key={i} x="12" y={47 + i * 16} fill="#ccc" fontSize="7.5">{t}</text>)}
            <rect x="140" y="10" width="115" height="120" rx="8" fill="#1a1a2e" stroke="#ef444444" strokeWidth="1" />
            <text x="197" y="30" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="700">CFD</text>
            {[
              "❌ Kein Eigentum",
              "❌ Keine Dividende",
              "⚠️ Overnight-Gebühren",
              "⚠️ Hebel = mehr Risiko",
              "✅ Leerverkäufe möglich",
            ].map((t, i) => <text key={i} x="147" y={47 + i * 16} fill="#ccc" fontSize="7.5">{t}</text>)}
          </svg>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Warum verdient der Anbieter wenn du verlierst?</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem", lineHeight: 1.7 }}>
            <p style={{ color: "#ccc", fontSize: "0.88rem" }}>
              Viele CFD-Anbieter sind sogenannte <strong style={{ color: "#fff" }}>"Market Maker"</strong> – sie nehmen die Gegenseite deines Trades.<br /><br />
              Wenn du long gehst (Kurs steigt), ist der Anbieter short. Wenn du verlierst, gewinnt der Anbieter direkt.<br /><br />
              Dazu kommen: <strong style={{ color: "#F59E0B" }}>Spreads</strong> (Differenz Kauf-/Verkaufspreis), <strong style={{ color: "#F59E0B" }}>Overnight-Gebühren</strong> und <strong style={{ color: "#F59E0B" }}>Finanzierungskosten</strong>.
            </p>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die versteckten Kosten von CFDs</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "💸", name: "Spread", val: "Differenz zwischen Kauf- und Verkaufspreis. Bei DAX-CFDs ca. 0,5–1 Punkt" },
              { icon: "🌙", name: "Overnight-Swap", val: "Täglich 0,02–0,05 % Finanzierungskosten. ~15 % p.a. bei gehaltenen Long-Positionen" },
              { icon: "📉", name: "Slippage", val: "Bei Markteröffnung oder Nachrichten: Kurs springt weg bevor deine Order ausgeführt wird" },
              { icon: "⚡", name: "Requotes", val: "Broker lehnt deine Order ab und bietet einen schlechteren Kurs" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die offizielle EU-Warnung</h2>
          <div style={{ background: "#ef444415", border: "2px solid #ef444444", borderRadius: "12px", padding: "1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, marginBottom: "0.5rem" }}>⚠️ Pflichtangabe bei EU-regulierten Anbietern:</p>
            <p style={{ color: "#ffaaaa", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
              "74–82 % der Kleinanlegerkonten verlieren Geld beim CFD-Handel mit diesem Anbieter. Sie sollten sich überlegen, ob Sie es sich leisten können, das hohe Risiko einzugehen, Ihr Geld zu verlieren."
            </p>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>Diese Zahl ist der Durchschnitt. Manche Anbieter melden bis zu 85 % Verlustquote.</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wann werden CFDs trotzdem genutzt?</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔽</span><p><strong>Leerverkäufe:</strong> CFDs erlauben es auf fallende Kurse zu setzen – ohne Aktien zu leihen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p><strong>Hedging:</strong> Profis sichern Aktienpositionen kurzfristig mit Index-CFDs ab</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚡</span><p><strong>Kurzfristiges Trading:</strong> Day-Trader nutzen niedrige Spreads und schnelle Ausführung – mit professionellem Risikomanagement</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das Fazit zu CFDs</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>74–85 % der Privatanleger verlieren Geld mit CFDs – das ist Fakt, kein Gerücht</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💸</span><p>Versteckte Kosten (Spread + Overnight) fressen Gewinne systematisch auf</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Für Einsteiger gilt: CFDs sind kein Investmentvehikel – sie sind ein Glücksspielprodukt mit Finanzverpackung</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L403Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Eine Option gibt dir das Recht – nicht die Pflicht – eine Aktie zu kaufen oder zu verkaufen."</div>
          <p className="cl-hook-sub">Das klingt einfach. Die Realität ist komplexer.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Call-Option – das Recht zu kaufen</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#10B981", fontWeight: 700, marginBottom: "0.5rem" }}>📈 CALL OPTION</p>
            <p style={{ color: "#ccc", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Du kaufst das Recht, Apple-Aktien bis zum <strong style={{ color: "#fff" }}>15. März</strong> zum Preis von <strong style={{ color: "#fff" }}>190 $ (Strike)</strong> zu kaufen.<br /><br />
              Du zahlst dafür eine <strong style={{ color: "#F59E0B" }}>Prämie von 5 $</strong> pro Aktie.<br /><br />
              Apple steigt auf 210 $: Du kaufst für 190 $, verkaufst für 210 $ → <strong style={{ color: "#10B981" }}>Gewinn: 15 $ (nach Prämie)</strong><br />
              Apple bleibt unter 190 $: Du übst nicht aus → <strong style={{ color: "#ef4444" }}>Verlust: 5 $ Prämie</strong>
            </p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Put-Option – das Recht zu verkaufen</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, marginBottom: "0.5rem" }}>📉 PUT OPTION</p>
            <p style={{ color: "#ccc", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Du kaufst das Recht, Apple-Aktien bis zum <strong style={{ color: "#fff" }}>15. März</strong> für <strong style={{ color: "#fff" }}>190 $ (Strike)</strong> zu VERKAUFEN.<br /><br />
              Du zahlst eine <strong style={{ color: "#F59E0B" }}>Prämie von 4 $</strong>.<br /><br />
              Apple fällt auf 170 $: Du verkaufst für 190 $ was nur 170 $ wert ist → <strong style={{ color: "#10B981" }}>Gewinn: 16 $</strong><br />
              Apple bleibt über 190 $: Du übst nicht aus → <strong style={{ color: "#ef4444" }}>Verlust: 4 $ Prämie</strong>
            </p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Auszahlungsdiagramm: Call vs. Put</h2>
          <svg viewBox="0 0 260 150" style={{ width: "100%", marginTop: "0.5rem" }}>
            <line x1="10" y1="120" x2="250" y2="120" stroke="#444" strokeWidth="1" />
            <line x1="130" y1="10" x2="130" y2="140" stroke="#444" strokeWidth="1" strokeDasharray="4,3" />
            <text x="125" y="148" fill="#888" fontSize="7.5" textAnchor="middle">Strike</text>
            <polyline points="10,120 130,120 250,20" stroke="#10B981" strokeWidth="2" fill="none" />
            <text x="220" y="18" fill="#10B981" fontSize="7.5">CALL</text>
            <polyline points="10,20 130,120 250,120" stroke="#ef4444" strokeWidth="2" fill="none" />
            <text x="12" y="18" fill="#ef4444" fontSize="7.5">PUT</text>
            <text x="50" y="90" fill="#ccc" fontSize="7">Kurs fällt ↙</text>
            <text x="160" y="90" fill="#ccc" fontSize="7">Kurs steigt ↗</text>
            <text x="10" y="12" fill="#666" fontSize="6.5">Gewinn (nach Prämie)</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.78rem", textAlign: "center", marginTop: "0.5rem" }}>Beim Strike-Preis ist der Break-even (nach Prämienabzug)</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Strike Price, Expiry & Premium</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "🎯", name: "Strike Price", val: "Ausübungspreis – zu diesem Preis kannst du die Aktie kaufen (Call) oder verkaufen (Put)" },
              { icon: "📅", name: "Expiry Date", val: "Verfallsdatum – danach verfällt die Option wertlos wenn nicht ausgeübt" },
              { icon: "💵", name: "Premium", val: "Preis der Option – was du als Käufer zahlst, als Verkäufer einnimmst" },
              { icon: "📊", name: "In/Out of Money", val: "In the money = innerer Wert vorhanden. Out of money = nur noch Zeitwert" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Immobilien-Analogie</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Du willst ein Haus kaufen (Preis: 300.000 €) bist aber noch nicht sicher.<br /><br />
              Du zahlst dem Verkäufer <strong style={{ color: "#F59E0B" }}>5.000 € Reservierungsgebühr (= Prämie)</strong> für das Recht, das Haus in 3 Monaten für 300.000 € zu kaufen.<br /><br />
              <strong style={{ color: "#10B981" }}>Haus steigt auf 330.000 €?</strong> Du kaufst für 300.000 €. Gewinn: 25.000 € (nach Prämie).<br />
              <strong style={{ color: "#ef4444" }}>Haus fällt auf 270.000 €?</strong> Du kaufst nicht. Verlust: 5.000 € Prämie.<br /><br />
              Das ist genau wie eine Call-Option.
            </p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Zeitwertverlust (Theta Decay)</h2>
          <p className="cl-card-sub">Der größte Feind des Options-Käufers</p>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Optionen verlieren jeden Tag automatisch an Wert – auch wenn der Kurs sich nicht bewegt. Dieses "Schmelzen" heißt <strong style={{ color: "#fff" }}>Theta Decay</strong>.<br /><br />
              Je näher das Verfallsdatum, desto schneller schmilzt der Zeitwert.<br /><br />
              <strong style={{ color: "#F59E0B" }}>Konsequenz:</strong> Als Optionskäufer kämpfst du gegen die Zeit. Du musst Recht haben – UND schnell genug.
            </p>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>Deshalb verkaufen Profis oft Optionen statt sie zu kaufen – Theta Decay arbeitet für den Verkäufer.</p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was du über Optionen wissen musst</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📞</span><p>Call = Recht zu kaufen (profitiert von steigenden Kursen)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📉</span><p>Put = Recht zu verkaufen (profitiert von fallenden Kursen)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⏰</span><p>Theta Decay – Optionen verlieren täglich Wert. Du musst richtig UND schnell liegen</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L404Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Covered Calls, Protective Puts, Cash-Secured Puts. Diese Strategien klingen einfach – und sind trotzdem nur für Erfahrene."</div>
          <p className="cl-hook-sub">Verstehen heißt nicht bereit sein.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Covered Call – Prämien auf bestehende Aktien</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#10B981", fontWeight: 700, marginBottom: "0.5rem" }}>📞 COVERED CALL</p>
            <p style={{ color: "#ccc", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Du besitzt 100 Apple-Aktien à 190 $.<br />
              Du verkaufst eine Call-Option mit Strike 200 $ und kassierst 3 $ Prämie pro Aktie = <strong style={{ color: "#10B981" }}>300 $ eingenommen</strong>.<br /><br />
              <strong>Apple unter 200 $ am Verfallstag:</strong> Option verfällt wertlos. Du behältst die 300 $ Prämie. ✅<br />
              <strong>Apple über 200 $:</strong> Aktien werden für 200 $ "abgerufen". Du verpasst Gewinne über 200 $. ⚠️
            </p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Protective Put – Portfolio-Versicherung</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#0EA5E9", fontWeight: 700, marginBottom: "0.5rem" }}>🛡️ PROTECTIVE PUT</p>
            <p style={{ color: "#ccc", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Du besitzt Apple-Aktien und kaufst gleichzeitig eine Put-Option mit Strike 170 $. Prämie: 2 $.<br /><br />
              <strong>Apple fällt auf 150 $:</strong> Deine Put-Option ist 20 $ wert. Verlust begrenzt auf Strike minus Prämie. ✅<br />
              <strong>Apple steigt:</strong> Put verfällt wertlos. Du verlierst nur die Prämie – wie eine Versicherung die du nicht brauchst. ✅
            </p>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>Viele institutionelle Anleger kaufen vor unsicheren Ereignissen (Earnings, Fed-Entscheidung) Protective Puts.</p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Cash-Secured Put – günstig einsteigen</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#F59E0B", fontWeight: 700, marginBottom: "0.5rem" }}>💰 CASH-SECURED PUT</p>
            <p style={{ color: "#ccc", fontSize: "0.88rem", lineHeight: 1.7 }}>
              Du willst Apple gerne für 170 $ kaufen, aber sie stehen bei 190 $.<br />
              Du verkaufst einen Put mit Strike 170 $ und kassierst 2 $ Prämie.<br /><br />
              <strong>Apple über 170 $:</strong> Put verfällt wertlos. Du hast 2 $ Prämie verdient. ✅<br />
              <strong>Apple unter 170 $:</strong> Du musst für 170 $ kaufen. Aber das wolltest du ja! ✅ (Gesamtkosten: 168 $ nach Prämie)
            </p>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Risiko-Rendite-Profile im Vergleich</h2>
          <svg viewBox="0 0 260 150" style={{ width: "100%", marginTop: "0.5rem" }}>
            {[
              { name: "Covered Call", risiko: 35, rendite: 55, farbe: "#10B981", x: 30 },
              { name: "Protective Put", risiko: 20, rendite: 75, farbe: "#0EA5E9", x: 100 },
              { name: "Cash-Sec. Put", risiko: 50, rendite: 45, farbe: "#F59E0B", x: 170 },
            ].map((d, i) => (
              <g key={i}>
                <rect x={d.x} y={130 - d.rendite} width="50" height={d.rendite} fill={d.farbe} rx="4" opacity="0.7" />
                <rect x={d.x} y={130} width="50" height={d.risiko * 0.4} fill="#ef4444" rx="4" opacity="0.5" />
                <text x={d.x + 25} y={125 - d.rendite} textAnchor="middle" fill={d.farbe} fontSize="7" fontWeight="700">+{d.rendite}%</text>
                <text x={d.x + 25} y={148} textAnchor="middle" fill="#888" fontSize="6.5">{d.name}</text>
              </g>
            ))}
            <line x1="20" y1="130" x2="240" y2="130" stroke="#333" strokeWidth="1" />
            <text x="10" y="10" fill="#666" fontSize="6.5">Grün = möglicher Gewinn · Rot = möglicher Verlust (vereinfacht)</text>
          </svg>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Greeks – was Optionen wirklich treibt</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "Δ", name: "Delta", val: "Wie stark die Option auf €1 Kursbewegung reagiert (0–1)" },
              { icon: "Γ", name: "Gamma", val: "Wie schnell sich Delta verändert – nimmt zu je näher am Verfall" },
              { icon: "Θ", name: "Theta", val: "Täglicher Zeitwertverlust. Feind des Käufers, Freund des Verkäufers" },
              { icon: "V", name: "Vega", val: "Sensitivität gegenüber Volatilität. Höhere Vola = teurere Optionen" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon" style={{ fontSize: "1rem", fontStyle: "italic" }}>{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Warum Optionen für Einsteiger gefährlich sind</h2>
          <div style={{ background: "#ef444415", border: "1px solid #ef444444", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ffaaaa", lineHeight: 1.7, fontSize: "0.88rem" }}>
              ❌ Optionsverkäufer haben <strong>unbegrenzte Verlustmöglichkeiten</strong> (beim nackten Call)<br />
              ❌ Theta Decay arbeitet gegen jeden Optionskäufer<br />
              ❌ 4 Greeks die man gleichzeitig im Kopf hat – und das in Echtzeit<br />
              ❌ Volatilität kann explodieren und Optionen unbezahlbar teuer machen<br /><br />
              <strong style={{ color: "#ef4444" }}>Diese Strategien sind für erfahrene Anleger – nicht für Einsteiger.</strong>
            </p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Optionsstrategien auf einen Blick</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📞</span><p><strong>Covered Call:</strong> Auf bestehende Aktien Prämien verdienen – Upside begrenzt</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p><strong>Protective Put:</strong> Portfolio absichern wie eine Versicherung – kostet Prämie</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💰</span><p><strong>Cash-Secured Put:</strong> Aktien günstiger einsammeln – oder Prämie kassieren</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L405Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Ein Landwirt weiß nicht welchen Preis er im Herbst für seinen Weizen bekommt. Ein Futures-Kontrakt gibt ihm heute die Antwort."</div>
          <p className="cl-hook-sub">Futures wurden für Sicherheit erfunden – nicht für Spekulation.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was ist ein Future?</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.9rem" }}>
              Ein Future ist ein <strong style={{ color: "#fff" }}>verbindlicher Vertrag</strong>, eine bestimmte Menge eines Assets zu einem festgelegten Preis an einem zukünftigen Datum zu kaufen oder zu verkaufen.<br /><br />
              Beide Seiten <strong style={{ color: "#F59E0B" }}>müssen</strong> erfüllen – Käufer muss kaufen, Verkäufer muss liefern.<br /><br />
              Im Gegensatz zur Option gibt es kein Wahlrecht – es ist eine Pflicht.
            </p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Option vs. Future – der entscheidende Unterschied</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", marginTop: "0.75rem" }}>
              <thead>
                <tr>
                  {["", "Option", "Future"].map(h => <th key={h} style={{ padding: "6px 4px", color: "#888", fontWeight: 600, borderBottom: "1px solid #333", textAlign: "center" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Käufer", opt: "Recht (nicht Pflicht)", fut: "Pflicht" },
                  { label: "Verkäufer", opt: "Pflicht", fut: "Pflicht" },
                  { label: "Max. Verlust Käufer", opt: "Prämie", fut: "Unbegrenzt" },
                  { label: "Vorauskosten", opt: "Prämie zahlen", fut: "Margin hinterlegen" },
                  { label: "Typische Nutzung", opt: "Absicherung/Spekulation", fut: "Lieferung/Hedging" },
                ].map(row => (
                  <tr key={row.label}>
                    <td style={{ padding: "7px 4px", color: "#bbb", fontWeight: 600 }}>{row.label}</td>
                    <td style={{ padding: "7px 4px", color: "#ddd", textAlign: "center", borderBottom: "1px solid #222" }}>{row.opt}</td>
                    <td style={{ padding: "7px 4px", color: "#ddd", textAlign: "center", borderBottom: "1px solid #222" }}>{row.fut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wer nutzt Futures – und warum?</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🌾</span><p><strong>Landwirte:</strong> Sichern heute den Preis für die Herbsternte ab – Planungssicherheit</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✈️</span><p><strong>Airlines:</strong> Kerosin-Futures sichern Treibstoffkosten – Southwest Airlines spart so Milliarden</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏦</span><p><strong>Fondsmanager:</strong> Index-Futures zur Portfolioabsicherung oder für schnelle Marktexposure</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎲</span><p><strong>Spekulanten:</strong> Liquidity Provider die mit Prognosen Geld verdienen wollen</p></div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Futures-Zeitstrahl</h2>
          <svg viewBox="0 0 260 120" style={{ width: "100%", marginTop: "0.75rem" }}>
            <line x1="20" y1="60" x2="240" y2="60" stroke="#7C3AED" strokeWidth="2" />
            {[
              { x: 20, label: "Heute", sub: "Kontrakt\neröffnet", color: "#7C3AED" },
              { x: 80, label: "Mtg. 1", sub: "Daily\nSettlement", color: "#888" },
              { x: 140, label: "Mtg. 2", sub: "Rollover\nmöglich", color: "#F59E0B" },
              { x: 220, label: "Verfall", sub: "Lieferung\noder Cash", color: "#10B981" },
            ].map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy="60" r="5" fill={d.color} />
                <text x={d.x} y="45" textAnchor="middle" fill={d.color} fontSize="7.5" fontWeight="600">{d.label}</text>
                <text x={d.x} y="80" textAnchor="middle" fill="#888" fontSize="6.5">{d.sub.split("\n")[0]}</text>
                <text x={d.x} y="93" textAnchor="middle" fill="#888" fontSize="6.5">{d.sub.split("\n")[1]}</text>
              </g>
            ))}
          </svg>
          <div className="cl-fakt-box" style={{ marginTop: "0.75rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>Daily Settlement: Futures werden täglich abgerechnet – Gewinne und Verluste werden täglich auf dein Konto gebucht oder abgezogen.</p>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Rollover – die ewige Verlängerung</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Futures laufen ab. Wer langfristig investiert bleibt, muss regelmäßig "rollen" – den auslaufenden Kontrakt verkaufen und den nächsten kaufen.<br /><br />
              <strong style={{ color: "#fff" }}>Rollkosten entstehen durch:</strong><br />
              • Preisunterschied zwischen altem und neuem Kontrakt<br />
              • Transaktionsgebühren<br />
              • Contango (neuer Kontrakt teurer) vs. Backwardation (neuer günstiger)
            </p>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>Öl-ETFs verlieren regelmäßig durch Rollkosten – sie kaufen täglich teurere Futures und verlieren systematisch gegenüber dem Spotpreis.</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Contango und Backwardation</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ flex: 1, background: "#ef444415", borderRadius: "8px", padding: "0.75rem" }}>
                <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>📈 CONTANGO</p>
                <p style={{ color: "#ccc", fontSize: "0.78rem", lineHeight: 1.6 }}>Futures teurer als Spot. Rollover kostet Geld. Schadet Long-Investoren.</p>
              </div>
              <div style={{ flex: 1, background: "#10B98115", borderRadius: "8px", padding: "0.75rem" }}>
                <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>📉 BACKWARDATION</p>
                <p style={{ color: "#ccc", fontSize: "0.78rem", lineHeight: 1.6 }}>Futures günstiger als Spot. Rollover bringt Gewinn. Nutzt Long-Investoren.</p>
              </div>
            </div>
          </div>
          <p style={{ color: "#aaa", fontSize: "0.8rem", marginTop: "0.75rem", textAlign: "center" }}>Öl und Rohstoffe sind oft in Contango – das macht Commodity-ETFs langfristig teuer.</p>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Futures – das Wichtigste</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📜</span><p>Futures sind verbindliche Verträge – beide Seiten MÜSSEN erfüllen (anders als Optionen)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🌾</span><p>Landwirte und Airlines nutzen sie zur Preissicherung – das ist der eigentliche Zweck</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔄</span><p>Rollkosten sind real – langfristig gehaltene Commodity-Futures verlieren systematisch durch Contango</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L406Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Krypto-Börsen bieten bis zu 125× Hebel. Das ist kein Investment – das ist Glücksspiel."</div>
          <p className="cl-hook-sub">Der Unterschied: beim Glücksspiel verlierst du nur den Einsatz.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Bitcoin Futures</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "📅", name: "Regulierte Futures", val: "CME Group (Chicago) bietet regulierte Bitcoin-Futures – physisch oder cash-settled" },
              { icon: "💵", name: "Kontraktgröße", val: "1 CME Bitcoin-Future = 5 Bitcoin. Sehr groß, nur für institutionelle Trader" },
              { icon: "⚖️", name: "Regulierung", val: "Unter CFTC-Aufsicht – deutlich sicherer als unregulierte Krypto-Börsen" },
              { icon: "📊", name: "Preis-Discovery", val: "CME Futures gelten als Referenz für institutionelle Bitcoin-Preise" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Perpetual Swaps – kein Verfallsdatum</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Perpetual Swaps sind die <strong style={{ color: "#fff" }}>beliebtesten Krypto-Derivate</strong> – erhältlich auf Bybit, Binance, Bitmex und Co.<br /><br />
              Sie funktionieren wie Futures aber ohne Verfalldatum. Stattdessen gibt es die <strong style={{ color: "#F59E0B" }}>Funding Rate</strong> – eine regelmäßige Zahlung die den Preis am Spot-Kurs hält.
            </p>
          </div>
          <svg viewBox="0 0 260 80" style={{ width: "100%", marginTop: "0.75rem" }}>
            <rect x="10" y="15" width="70" height="50" rx="8" fill="#1a1a2e" stroke="#10B98144" />
            <text x="45" y="44" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="700">LONGS</text>
            <rect x="180" y="15" width="70" height="50" rx="8" fill="#1a1a2e" stroke="#ef444444" />
            <text x="215" y="44" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">SHORTS</text>
            <line x1="85" y1="40" x2="178" y2="40" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="130" y="33" textAnchor="middle" fill="#F59E0B" fontSize="7.5">Funding Rate</text>
            <text x="130" y="55" textAnchor="middle" fill="#888" fontSize="6.5">(alle 8 Stunden)</text>
          </svg>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Die Funding Rate – ein versteckter Kostenfaktor</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Funding Rate = 0,01 % pro 8 Stunden = <strong style={{ color: "#F59E0B" }}>3× täglich</strong><br /><br />
              Das sind 0,03 % pro Tag oder ~<strong style={{ color: "#ef4444" }}>10,9 % pro Monat</strong> an reinen Haltekosten.<br /><br />
              Bei 100.000 $ Long-Position zahlst du ~10.900 $ nur für das Halten – schon bevor der Markt sich bewegt hat.<br /><br />
              In starken Bull-Märkten kann die Rate 0,1 %+ pro 8h erreichen. Das sind <strong style={{ color: "#ef4444" }}>109 % Jahreskosten.</strong>
            </p>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Liquidation bei Krypto – wie schnell geht das?</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.75rem" }}>
            <text x="10" y="15" fill="#888" fontSize="7.5">Bitcoin bei 100.000 $ – Liquidationspreise</text>
            {[
              { hebel: "2×", liqPct: 50, liqPx: 50000, color: "#10B981" },
              { hebel: "5×", liqPct: 20, liqPx: 80000, color: "#F59E0B" },
              { hebel: "10×", liqPct: 10, liqPx: 90000, color: "#ef9334" },
              { hebel: "25×", liqPct: 4, liqPx: 96000, color: "#ef4444" },
            ].map((d, i) => (
              <g key={i}>
                <rect x="10" y={25 + i * 27} width="200" height="18" rx="3" fill="#1a1a2e" />
                <rect x="10" y={25 + i * 27} width={(d.liqPct / 100) * 200} height="18" rx="3" fill={d.color} opacity="0.3" />
                <text x="15" y={38 + i * 27} fill={d.color} fontSize="7.5" fontWeight="600">{d.hebel} Hebel – Liq. bei {d.liqPx.toLocaleString("de-DE")} $ (−{d.liqPct} %)</text>
              </g>
            ))}
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.78rem", marginTop: "0.5rem", textAlign: "center" }}>Bitcoin bewegt sich täglich 2–5 %. Bei 25× Hebel reicht eine normale Korrektur.</p>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">⚠️ Klare Risiko-Warnung</h2>
          <div style={{ background: "#ef444415", border: "2px solid #ef444455", borderRadius: "12px", padding: "1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, marginBottom: "0.75rem" }}>Krypto-Derivate mit hohem Hebel:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Liquidation in Sekunden – rund um die Uhr, 7 Tage die Woche",
                "Börsen können technische Fehler haben oder manipuliert sein",
                "Keine Einlagensicherung – Plattform-Insolvenz = Totalverlust (FTX 2022)",
                "Steuerlich komplex – jede Liquidation ist ein steuerpflichtiges Ereignis",
                "Psychologische Sucht – Adrenalin bei hohem Hebel ist real und gefährlich",
              ].map((t, i) => <p key={i} style={{ color: "#ffaaaa", fontSize: "0.82rem", margin: 0 }}>⛔ {t}</p>)}
            </div>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">EU-Regulierung vs. unregulierte Plattformen</h2>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, background: "#10B98115", border: "1px solid #10B98133", borderRadius: "10px", padding: "0.75rem" }}>
              <p style={{ color: "#10B981", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.4rem" }}>🇪🇺 EU reguliert</p>
              <p style={{ color: "#ccc", fontSize: "0.75rem", lineHeight: 1.5 }}>Max. 2× Hebel auf Krypto<br />Einlagenschutz<br />Strikte Dokumentation</p>
            </div>
            <div style={{ flex: 1, background: "#ef444415", border: "1px solid #ef444433", borderRadius: "10px", padding: "0.75rem" }}>
              <p style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.4rem" }}>🌍 Unreguliert</p>
              <p style={{ color: "#ccc", fontSize: "0.75rem", lineHeight: 1.5 }}>Bis 125× Hebel<br />Kein Schutz<br />Offshore-Jurisdiktion</p>
            </div>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>FTX hatte Millionen Kunden. 2022 war es pleite. 8 Milliarden Dollar Kundengeld weg.</p>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Krypto-Derivate – das Fazit</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚡</span><p>125× Hebel + 24/7-Märkte = Liquidation in Sekunden. Kein Wochenende, keine Pause</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💸</span><p>Funding Rate = versteckte Haltekosten die bis zu 100 %+ p.a. betragen können</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Wenn überhaupt: nur auf regulierten Plattformen, nur mit Risikokapital, nur mit 2× max.</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L407Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Du hast alles richtig analysiert. Der Kurs steigt um 15 %. Dein Knock-Out hat vorher die Barrier berührt. Du bekommst nichts."</div>
          <p className="cl-hook-sub">Das ist kein Sonderfall. Das ist das Design.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was sind Knock-Out Zertifikate?</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.9rem" }}>
              Knock-Out Zertifikate (auch: Turbos, Mini-Futures) sind <strong style={{ color: "#fff" }}>Hebelprodukte</strong> die den Basiswert nahezu 1:1 abbilden – aber mit Hebel.<br /><br />
              Der Hebel entsteht durch die <strong style={{ color: "#F59E0B" }}>Barrier</strong> – eine Schwelle unter (Long) oder über (Short) dem aktuellen Kurs.<br /><br />
              Je näher die Barrier am aktuellen Kurs, desto höher der Hebel.
            </p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wie der Hebel funktioniert</h2>
          <p className="cl-card-sub">DAX bei 18.000 Punkten</p>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            {[
              { barrier: "17.000", hebel: "18×", abstand: "5,6 %" },
              { barrier: "16.000", hebel: "9×", abstand: "11,1 %" },
              { barrier: "14.000", hebel: "4,5×", abstand: "22,2 %" },
              { barrier: "10.000", hebel: "2,25×", abstand: "44,4 %" },
            ].map(r => (
              <div key={r.barrier} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid #2a2040" }}>
                <span style={{ color: "#ccc", fontSize: "0.82rem" }}>Barrier: {r.barrier}</span>
                <span style={{ color: "#F59E0B", fontWeight: 700 }}>Hebel ≈ {r.hebel}</span>
                <span style={{ color: "#ef4444", fontSize: "0.78rem" }}>KO bei −{r.abstand}</span>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Was passiert beim Knock-Out?</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.5rem" }}>
            <polyline points="10,90 60,80 100,60 130,50 155,40" stroke="#10B981" strokeWidth="2" fill="none" />
            <line x1="10" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="15" y="95" fill="#ef4444" fontSize="7.5">Barrier</text>
            <circle cx="155" cy="100" r="5" fill="#ef4444" />
            <text x="157" y="90" fill="#ef4444" fontSize="7.5">KO</text>
            <polyline points="155,100 200,100 250,100" stroke="#888" strokeWidth="2" fill="none" strokeDasharray="3,2" />
            <polyline points="155,40 170,30 200,10 240,20" stroke="#aaa" strokeWidth="1.5" fill="none" strokeDasharray="3,2" opacity="0.4" />
            <text x="170" y="115" fill="#aaa" fontSize="6.5">Position wertlos</text>
            <text x="165" y="25" fill="#aaa" fontSize="6.5" opacity="0.5">Kurs steigt danach</text>
            <text x="10" y="12" fill="#666" fontSize="6.5">Kursverlauf → Knock-Out-Event</text>
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.78rem", textAlign: "center" }}>Auch wenn der Kurs danach wieder steigt: nach dem KO ist das Zertifikat wertlos.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Knock-Out vs. Turbo – der Unterschied</h2>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
            <div style={{ flex: 1, background: "#1a1a2e", border: "1px solid #7C3AED33", borderRadius: "10px", padding: "0.75rem" }}>
              <p style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>Knock-Out</p>
              <p style={{ color: "#ccc", fontSize: "0.75rem", lineHeight: 1.6 }}>Barrier = Stop-Loss-Level<br />Bei KO: kleiner Restwert möglich<br />Emittiert von Banken</p>
            </div>
            <div style={{ flex: 1, background: "#1a1a2e", border: "1px solid #F59E0B33", borderRadius: "10px", padding: "0.75rem" }}>
              <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>Turbo</p>
              <p style={{ color: "#ccc", fontSize: "0.75rem", lineHeight: 1.6 }}>Open-End (kein Verfall)<br />Tägliche Anpassung der Barrier<br />Overnight-Finanzierungskosten</p>
            </div>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">💡</span>
            <p>In Deutschland sind Knock-Out Zertifikate nach Aktien und ETFs das drittbeliebteste Anlageprodukt – trotz der extremen Risiken.</p>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kosten und versteckte Gebühren</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "💸", name: "Spread", val: "Differenz Kauf/Verkauf. Bei liquiden Produkten 0,5–1 Punkt, bei exotischen bis 5 Punkte" },
              { icon: "🌙", name: "Finanzierungskosten", val: "Open-End Turbos: täglich Zinsen auf den Basispreis. ~3–5 % p.a. (verschiebt Barrier täglich)" },
              { icon: "🏦", name: "Emittentenrisiko", val: "Zertifikate sind Schuldverschreibungen der Bank. Bankpleite = Verlust möglich" },
              { icon: "📉", name: "Gap-Risiko", val: "Kurs springt über Barrier – Restwert kann sogar negativ werden (Nachschusspflicht!)" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Für wen könnten Knock-Outs geeignet sein?</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✅</span><p>Erfahrene Trader die kurzfristige, präzise Marktschwankungen handeln (Day-Trading)</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">✅</span><p>Anleger die bestehende Positionen kurzfristig mit KO-Puts absichern wollen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">❌</span><p>NICHT für Einsteiger, NICHT als langfristige Anlage, NICHT mit Kapital das man braucht</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Knock-Outs – das Wichtigste</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💣</span><p>Knock-Out-Event: Barrier kurz berührt → sofort wertlos. Kein zweite Chance</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📐</span><p>Je näher die Barrier am Kurs, desto höher der Hebel – und desto schneller der KO</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">⚠️</span><p>Emittentenrisiko: Zertifikate sind Bankanleihen – Bankpleite bedeutet Verlust auch ohne KO</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L408Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [kapital, setKapital]       = useState(10000)
  const [risikoAnt, setRisikoAnt]   = useState(1)
  const [slAbstand, setSlAbstand]   = useState(5)
  const maxVerlust    = Math.round(kapital * risikoAnt / 100)
  const posGrösse     = Math.round(maxVerlust / (slAbstand / 100))

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Riskiere nie mehr als 1–2 % deines Kapitals in einem einzigen Trade."</div>
          <p className="cl-hook-sub">Diese Regel trennt professionelle Trader von Zockern.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Warum 1–2 % Regel?</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Du hast 10.000 €. Du verlierst 10 Trades in Folge (passiert auch Profis).<br /><br />
              <strong style={{ color: "#ef4444" }}>Bei 10 % Risiko pro Trade:</strong> Nach 10 Verlusten → 3.487 € übrig (−65 %)<br />
              <strong style={{ color: "#10B981" }}>Bei 1 % Risiko pro Trade:</strong> Nach 10 Verlusten → 9.044 € übrig (−9,6 %)<br /><br />
              Der Unterschied? <strong style={{ color: "#fff" }}>Recovery.</strong> Von −65 % brauchst du +186 % um auf null zu kommen. Von −9,6 % brauchst du +10,6 %.
            </p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Stop-Loss – dein Sicherheitsnetz</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "🛑", name: "Was ist ein Stop-Loss?", val: "Automatische Verkaufsorder wenn der Kurs einen definierten Preis unterschreitet" },
              { icon: "📐", name: "Wo platzieren?", val: "Unter technischen Unterstützungsniveaus oder in fixer % Distanz zum Einstieg" },
              { icon: "⚠️", name: "Slippage-Risiko", val: "Bei Markteröffnung oder Lücken springt der Kurs über den Stop-Loss – Ausführung schlechter" },
              { icon: "🎯", name: "Mental vs. Hard Stop", val: "Hard Stop = automatisch in der Plattform. Mental Stop = gefährlich (Hoffnung schlägt Disziplin)" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Position-Sizing Rechner</h2>
          <p className="cl-card-sub">Kapital: <strong>{kapital.toLocaleString("de-DE")} €</strong></p>
          <input type="range" min={1000} max={50000} step={500} value={kapital} onChange={e => setKapital(Number(e.target.value))} className="rc-slider rc-slider-full" style={{ background: sliderBg(kapital, 1000, 50000), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Risiko pro Trade: <strong>{risikoAnt} %</strong></p>
          <input type="range" min={0.5} max={5} step={0.5} value={risikoAnt} onChange={e => setRisikoAnt(Number(e.target.value))} className="rc-slider rc-slider-full" style={{ background: sliderBg(risikoAnt, 0.5, 5), marginBottom: "0.75rem" }} />
          <p className="cl-card-sub">Stop-Loss Abstand: <strong>{slAbstand} %</strong></p>
          <input type="range" min={1} max={20} step={1} value={slAbstand} onChange={e => setSlAbstand(Number(e.target.value))} className="rc-slider rc-slider-full" style={{ background: sliderBg(slAbstand, 1, 20), marginBottom: "1rem" }} />
          <div className="cl-kaffee-ergebnis">
            <div className="cl-kaffee-zeile"><span>Max. Verlust</span><span className="cl-kaffee-wert cl-kaffee-big" style={{ color: "#ef4444" }}>{maxVerlust.toLocaleString("de-DE")} €</span></div>
            <div className="cl-kaffee-zeile"><span>Positionsgröße</span><span style={{ color: "#10B981", fontWeight: 700 }}>{posGrösse.toLocaleString("de-DE")} €</span></div>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Kelly-Kriterium – optimale Positionsgröße</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              John Kelly (Bell Labs, 1956) entwickelte die optimale Formel für Positionsgrößen:<br /><br />
              <strong style={{ color: "#F59E0B", fontFamily: "monospace" }}>f* = (p × b − q) / b</strong><br /><br />
              • p = Gewinnwahrscheinlichkeit<br />
              • q = 1 − p (Verlustwahrscheinlichkeit)<br />
              • b = Gewinn/Verlust Verhältnis (Reward/Risk)<br /><br />
              Profis verwenden <strong style={{ color: "#fff" }}>½ oder ¼ Kelly</strong> – voller Kelly ist zu aggressiv.
            </p>
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Maximaler Drawdown – der echte Test</h2>
          <svg viewBox="0 0 260 140" style={{ width: "100%", marginTop: "0.75rem" }}>
            <polyline points="10,120 40,100 70,80 90,70 110,85 130,95 150,105 170,100 200,70 230,50 250,40" stroke="#7C3AED" strokeWidth="2" fill="none" />
            <line x1="90" y1="70" x2="150" y2="70" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="90" y1="70" x2="90" y2="105" stroke="#ef4444" strokeWidth="1" />
            <line x1="150" y1="105" x2="150" y2="105" stroke="#ef4444" strokeWidth="1" />
            <rect x="90" y="70" width="60" height="35" fill="#ef444415" />
            <text x="120" y="92" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700">Max DD</text>
            <text x="10" y="12" fill="#666" fontSize="7">Portfolio-Performance mit Drawdown-Phase</text>
            <text x="170" y="48" fill="#10B981" fontSize="7.5">Recovery ✓</text>
          </svg>
          <div className="cl-fakt-box">
            <span className="cl-fakt-icon">⚠️</span>
            <p>Bei 50% Drawdown brauchst du 100% Rendite um auf null zu kommen. Halte Max DD unter 20–25%.</p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Risiko-Pyramide</h2>
          <svg viewBox="0 0 260 150" style={{ width: "100%", marginTop: "0.5rem" }}>
            <polygon points="130,10 20,135 240,135" fill="none" stroke="#7C3AED44" strokeWidth="1" />
            <polygon points="130,40 50,135 210,135" fill="#7C3AED22" stroke="#7C3AED44" strokeWidth="1" />
            <text x="130" y="100" textAnchor="middle" fill="#7C3AED" fontSize="8" fontWeight="600">Stop-Loss</text>
            <text x="130" y="114" textAnchor="middle" fill="#aaa" fontSize="7">immer definiert</text>
            <polygon points="130,10 75,90 185,90" fill="#F59E0B22" stroke="#F59E0B44" strokeWidth="1" />
            <text x="130" y="65" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="600">Position Sizing</text>
            <text x="130" y="77" textAnchor="middle" fill="#aaa" fontSize="7">max 1–2 % Risiko</text>
            <polygon points="130,10 100,50 160,50" fill="#10B98122" stroke="#10B98144" strokeWidth="1" />
            <text x="130" y="36" textAnchor="middle" fill="#10B981" fontSize="7.5" fontWeight="600">Setup-Qualität</text>
          </svg>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Risikomanagement – die goldenen Regeln</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Nie mehr als 1–2 % des Kapitals in einem Trade riskieren – ohne Ausnahme</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛑</span><p>Stop-Loss immer setzen – vor dem Trade, nicht danach. Mental Stop funktioniert nicht</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>Position Sizing berechnen: Positionsgröße = Max. Verlust / Stop-Loss-Abstand</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L409Screen({ lektion, onZurueck, onAbgeschlossen }) {
  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Verluste aus Optionen können NICHT mit ETF-Gewinnen verrechnet werden. Das kostet Anleger jährlich Tausende Euro."</div>
          <p className="cl-hook-sub">Steuerrecht schlägt Marktlogik – verstehe die Regeln bevor du handelst.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der separate Verlustverrechnungstopf</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Seit 2021 gibt es in Deutschland <strong style={{ color: "#fff" }}>3 separate Töpfe</strong> für Kapitalverluste:<br /><br />
              🪣 <strong style={{ color: "#7C3AED" }}>Aktien-Topf:</strong> Verluste nur mit Aktiengewinnen verrechenbar<br />
              🪣 <strong style={{ color: "#F59E0B" }}>Sonstiger Topf:</strong> Verluste aus ETFs, Anleihen, Dividenden<br />
              🪣 <strong style={{ color: "#ef4444" }}>Termingeschäfts-Topf:</strong> Optionen, Futures, CFDs – NUR untereinander verrechenbar
            </p>
          </div>
          <div className="cl-fakt-box" style={{ marginTop: "1rem" }}>
            <span className="cl-fakt-icon">⚠️</span>
            <p>Das gilt seit Jahressteuergesetz 2020. Vorher konnten Verluste freier verrechnet werden.</p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Der 20.000 € Cap – ein massiver Nachteil</h2>
          <div style={{ background: "#ef444415", border: "1px solid #ef444444", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ef4444", fontWeight: 700, marginBottom: "0.5rem" }}>§20 Abs. 6 Satz 5 EStG</p>
            <p style={{ color: "#ffaaaa", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Verluste aus Termingeschäften können pro Jahr nur bis zu <strong>20.000 €</strong> mit Gewinnen aus Termingeschäften verrechnet werden.<br /><br />
              Der Rest wird auf das nächste Jahr vorgetragen – aber wieder mit 20.000 € Cap.
            </p>
          </div>
          <div style={{ background: "#1a1a2e", borderRadius: "10px", padding: "0.75rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", fontSize: "0.82rem", lineHeight: 1.6 }}>
              Beispiel: Du verlierst 100.000 € mit Optionen. Du gewinnst 100.000 € mit CFDs.<br />
              Steuerpflichtig: 80.000 € Gewinn (nur 20.000 € Verlust anrechenbar). Steuer: ~21.100 €.
            </p>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Vergleich: ETFs vs. Termingeschäfte steuerlich</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", marginTop: "0.75rem" }}>
              <thead>
                <tr>
                  {["", "ETFs/Aktien", "Optionen/CFDs"].map(h => <th key={h} style={{ padding: "6px 4px", color: "#888", fontWeight: 600, borderBottom: "1px solid #333", textAlign: "left" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Gewinne", etf: "26,375 % AbgSt", deriv: "26,375 % AbgSt" },
                  { label: "Verluste", etf: "Freie Verrechnung", deriv: "NUR mit Termin-Gewinnen" },
                  { label: "Jahrescap", etf: "Unbegrenzt", deriv: "Max. 20.000 €/Jahr" },
                  { label: "Haltedauer", etf: "Irrelevant für Steuer", deriv: "Irrelevant für Steuer" },
                ].map(row => (
                  <tr key={row.label}>
                    <td style={{ padding: "7px 4px", color: "#bbb", fontWeight: 600 }}>{row.label}</td>
                    <td style={{ padding: "7px 4px", color: "#10B981", borderBottom: "1px solid #222" }}>{row.etf}</td>
                    <td style={{ padding: "7px 4px", color: "#ef4444", borderBottom: "1px solid #222" }}>{row.deriv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuerpflichtige Ereignisse bei Derivaten</h2>
          <div className="cl-invisible-liste">
            {[
              { icon: "✅", name: "Option mit Gewinn verkauft", val: "Steuerpflichtig – Abgeltungssteuer auf Gewinn" },
              { icon: "✅", name: "Option wertlos verfallen", val: "Verlust → in Termingeschäfts-Topf (max. 20k/Jahr)" },
              { icon: "✅", name: "CFD-Trade geschlossen", val: "Gewinn/Verlust → Termingeschäfts-Topf" },
              { icon: "✅", name: "Prämie als Optionsverkäufer", val: "Sofort steuerpflichtig wenn Option verfällt oder geschlossen" },
              { icon: "⚠️", name: "Glattstellung der Gegenposition", val: "Beides steuerpflichtig – nicht nur der Saldo" },
            ].map(r => (
              <div key={r.name} className="cl-invisible-zeile" style={{ alignItems: "flex-start" }}>
                <span className="cl-inv-icon">{r.icon}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.82rem", margin: 0 }}>{r.name}</p>
                  <p style={{ color: "#aaa", fontSize: "0.75rem", margin: 0 }}>{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Praktisches Beispiel: Jahresbilanz</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.5rem" }}>
            <p style={{ color: "#ccc", fontSize: "0.82rem", lineHeight: 1.8 }}>
              Max hat 2024 folgendes Depot:<br />
              📈 ETF-Gewinne: +15.000 € → 1.000 € Steuer (nach Freibetrag)<br />
              📉 Optionsverluste: −30.000 € → <strong style={{ color: "#ef4444" }}>NICHT mit ETF-Gewinnen verrechenbar!</strong><br />
              📈 CFD-Gewinne: +25.000 € → davon 20.000 € Verluste anrechenbar<br />
              Steuer auf verbleibende 5.000 €: 1.319 €<br /><br />
              <strong style={{ color: "#fff" }}>Gesamtsteuer: ~2.319 €</strong> obwohl netto 10.000 € Gesamtgewinn
            </p>
          </div>
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Dokumentation und Jahresabschluss</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📋</span><p><strong>Jahressteuerbescheinigung:</strong> Broker stellt sie bis Ende Februar aus. Termingeschäfts-Topf wird separat ausgewiesen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔄</span><p><strong>Verlustvortrag:</strong> Nicht verrechnete Verluste werden automatisch ins nächste Jahr vorgetragen</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p><strong>Tools:</strong> Koinly, Taxfix oder direkter Steuerberater für komplexe Derivate-Situationen empfohlen</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Steuern bei Derivaten – das Fazit</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🪣</span><p>Separater Termingeschäfts-Topf seit 2021 – Verluste NICHT mit ETF-Gewinnen verrechenbar</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🔒</span><p>20.000 € Cap pro Jahr – wer mehr verliert zahlt trotzdem Steuern auf Gewinne</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📜</span><p>Diese Asymmetrie macht aktives Derivate-Trading steuerlich besonders unvorteilhaft</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function L410Screen({ lektion, onZurueck, onAbgeschlossen }) {
  const [bereitFragen, setBereitFragen] = useState({ f1: null, f2: null, f3: null, f4: null, f5: null })
  const alleBeantwortet = Object.values(bereitFragen).every(v => v !== null)
  const jaAntworten = Object.values(bereitFragen).filter(v => v === "ja").length

  function getEmpfehlung() {
    if (jaAntworten >= 4) return { text: "Du hast die Voraussetzungen – aber starte mit kleinen Beträgen und nur auf regulierten Plattformen.", farbe: "#F59E0B" }
    if (jaAntworten >= 2) return { text: "Noch nicht bereit. Baue erst mehr Erfahrung mit ETFs und Aktien auf.", farbe: "#ef9334" }
    return { text: "Definitiv noch nicht bereit. Bleib bei ETF-Sparplänen – sie schlagen aktives Trading langfristig.", farbe: "#ef4444" }
  }

  function renderCard(idx) {
    switch (idx) {
      case 0: return (
        <div className="cl-card cl-card-hook">
          <div className="cl-hook-statement">"Für 95 % der Privatanleger gilt: Finger weg von Hebelprodukten. Ein ETF-Sparplan schlägt Trading langfristig – ohne Stress."</div>
          <p className="cl-hook-sub">Das ist keine Meinung. Das sind Daten.</p>
        </div>
      )
      case 1: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Hedging – die legitime Nutzung</h2>
          <div style={{ background: "#1a1a2e", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: "0.88rem" }}>
              Du hast ein ETF-Portfolio im Wert von 50.000 € und hast Angst vor einem Kursrückgang in den nächsten 3 Monaten (z.B. wegen einer erwarteten Rezession).<br /><br />
              Statt alles zu verkaufen kaufst du Put-Optionen auf den MSCI World – Prämie: ~1.000 €.<br /><br />
              Markt fällt 20 %: Dein Portfolio verliert 10.000 €, die Put-Option gewinnt ~8.000 € → <strong style={{ color: "#10B981" }}>Nettoverlust: nur 3.000 € statt 10.000 €</strong>
            </p>
          </div>
        </div>
      )
      case 2: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Professionelle Nutzung</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🏦</span><p><strong>Hedgefonds:</strong> Long-Short-Strategien mit Optionen und Futures zur Renditeoptimierung bei neutralem Marktrisiko</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🌾</span><p><strong>Produzenten:</strong> Rohstoff-Futures zur Plaungssicherheit – essentiell für die Agrarwirtschaft</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💼</span><p><strong>Market Maker:</strong> Stellen Liquidität zur Verfügung und hedgen ihr eigenes Risiko mit Optionen</p></div>
          </div>
        </div>
      )
      case 3: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">ETF-Sparplan vs. aktives Trading – die Fakten</h2>
          <svg viewBox="0 0 260 150" style={{ width: "100%", marginTop: "0.5rem" }}>
            <polyline points="10,130 60,110 110,85 160,60 210,35 250,20" stroke="#7C3AED" strokeWidth="2.5" fill="none" />
            <polyline points="10,130 40,125 80,120 120,115 160,125 200,110 250,105" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="4,2" />
            <text x="220" y="16" fill="#7C3AED" fontSize="7.5" fontWeight="700">MSCI World ETF</text>
            <text x="215" y="100" fill="#ef4444" fontSize="7.5">Avg. Trader</text>
            <text x="10" y="12" fill="#666" fontSize="6.5">10-Jahres-Performance (vereinfacht)</text>
            <line x1="10" y1="130" x2="250" y2="130" stroke="#333" strokeWidth="1" />
          </svg>
          <p style={{ color: "#aaa", fontSize: "0.78rem", textAlign: "center" }}>SPIVA-Studie: 85–90 % der aktiven Trader underperformen den Index über 10 Jahre.</p>
        </div>
      )
      case 4: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wann NICHT mit Hebelprodukten handeln</h2>
          <div style={{ background: "#ef444415", border: "1px solid #ef444444", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem" }}>
            {[
              "Wenn du weniger als 2 Jahre aktive Börsenerfahrung hast",
              "Wenn du dein Notgroschen-Kapital einsetzt",
              "Wenn du dir Kapital geliehen hast (Kredit, Dispo)",
              "Wenn du im Job oder privat gerade Stress hast",
              "Wenn du aus FOMO handelst weil 'alle verdienen'",
              "Wenn du nicht erklären kannst was Margin, Theta und Liquidation bedeuten",
            ].map((t, i) => <p key={i} style={{ color: "#ffaaaa", fontSize: "0.82rem", margin: "0.3rem 0" }}>⛔ {t}</p>)}
          </div>
        </div>
      )
      case 5: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Bin ich bereit für Hebelprodukte?</h2>
          <p className="cl-card-sub" style={{ marginBottom: "0.75rem" }}>Beantworte ehrlich – 5 Fragen:</p>
          {[
            { key: "f1", frage: "Habe ich 2+ Jahre aktive Börsenerfahrung?" },
            { key: "f2", frage: "Ist das Kapital Risikokapital (Totalverlust okay)?" },
            { key: "f3", frage: "Kenne ich Greeks, Margin und Stop-Loss im Detail?" },
            { key: "f4", frage: "Habe ich eine klare schriftliche Trading-Strategie?" },
            { key: "f5", frage: "Handle ich auf regulierten Plattformen mit max. 5× Hebel?" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: "0.5rem" }}>
              <p style={{ color: "#ccc", fontSize: "0.8rem", marginBottom: "0.3rem" }}>{f.frage}</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => setBereitFragen(p => ({ ...p, [f.key]: "ja" }))} style={{ flex: 1, padding: "0.35rem", borderRadius: "8px", border: bereitFragen[f.key] === "ja" ? "2px solid #10B981" : "1px solid #333", background: bereitFragen[f.key] === "ja" ? "#10B98122" : "#1a1a2e", color: "#10B981", cursor: "pointer", fontSize: "0.8rem" }}>✅ Ja</button>
                <button onClick={() => setBereitFragen(p => ({ ...p, [f.key]: "nein" }))} style={{ flex: 1, padding: "0.35rem", borderRadius: "8px", border: bereitFragen[f.key] === "nein" ? "2px solid #ef4444" : "1px solid #333", background: bereitFragen[f.key] === "nein" ? "#ef444422" : "#1a1a2e", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem" }}>❌ Nein</button>
              </div>
            </div>
          ))}
          {alleBeantwortet && (
            <div style={{ background: "#1a1a2e", borderRadius: "10px", padding: "0.75rem", marginTop: "0.75rem", borderLeft: `3px solid ${getEmpfehlung().farbe}` }}>
              <p style={{ color: getEmpfehlung().farbe, fontWeight: 700, fontSize: "0.82rem", margin: 0 }}>{jaAntworten}/5 Ja – {getEmpfehlung().text}</p>
            </div>
          )}
        </div>
      )
      case 6: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Wenn du trotzdem anfangen willst</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📚</span><p><strong>Schritt 1:</strong> 6 Monate Papiertrades (kein echtes Geld) – lerne ohne Verlustrisiko</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">💶</span><p><strong>Schritt 2:</strong> Mit max. 500 € Risikokapital starten – Geld das du vollständig verlieren kannst</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🇪🇺</span><p><strong>Schritt 3:</strong> Nur EU-regulierte Plattformen (IBKR, CapTrader) – max. 5× Hebel, nie mehr</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p><strong>Schritt 4:</strong> Jede Trade dokumentieren – ohne Journal kein Lernen</p></div>
          </div>
        </div>
      )
      case 7: return (
        <div className="cl-card">
          <h2 className="cl-card-titel">Das ehrliche Fazit zu Hebelprodukten</h2>
          <div className="cl-takeaways">
            <div className="cl-takeaway"><span className="cl-takeaway-icon">📊</span><p>85–90 % der aktiven Trader underperformen den MSCI World – über alle Zeiträume und Märkte</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🛡️</span><p>Legitime Nutzung: Hedging mit Protective Puts für erfahrene Langfristanleger</p></div>
            <div className="cl-takeaway"><span className="cl-takeaway-icon">🎯</span><p>Für 95 % gilt: ETF-Sparplan, buy-and-hold, jährliches Rebalancing. Einfach. Effektiv. Bewiesen.</p></div>
          </div>
          <p className="cl-quiz-cta">Teste dein Wissen im Quiz!</p>
        </div>
      )
      default: return null
    }
  }
  return <CardShell lektion={lektion} onZurueck={onZurueck} onAbgeschlossen={onAbgeschlossen} renderCard={renderCard} onAskAssistant={onAskAssistant} />
}

function calcReadTime(text) {
  if (!text) return "~3 Min"
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `~${mins} Min`
}

function parseHL(text) {
  if (!text) return text
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <span key={i} className="hl">{part}</span> : part
  )
}

function LektionScreen({ lektion, kategorie, onZurueck, onAbgeschlossen }) {
  const [phase, setPhase] = useState("lesen")
  const [aktualeFrage, setAktualeFrage] = useState(0)
  const [gewaehlt, setGewaehlt] = useState(null)
  const [richtige, setRichtige] = useState(0)

  const fragen = lektion.fragen
  const aktuelleFrage = fragen[aktualeFrage]
  const readTime = calcReadTime(lektion.inhalt)

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
        <button className="zurueck-btn" onClick={onZurueck}><ArrowLeftIcon size={16}/> Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: "40%" }} />
          </div>
          <span className="lektion-progress-label">Lesen · {readTime}</span>
        </div>
        <p className="theorie-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><LernenIcon size={14} color="#7C3AED"/> Lerneinheit</p>
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
        <button className="zurueck-btn" onClick={() => setPhase("lesen")}><ArrowLeftIcon size={16}/> Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${60 + ((aktualeFrage + 1) / fragen.length) * 40}%` }} />
          </div>
          <span className="lektion-progress-label">Quiz · {aktualeFrage + 1} / {fragen.length}</span>
        </div>
        <p className="theorie-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><StarIcon size={14} color="#7C3AED"/> Verständnisquiz</p>
        <h2 className="frage">{aktuelleFrage.text}</h2>
        <div className="antworten">
          {aktuelleFrage.antworten.map((a, i) => (
            <button
              key={i}
              className={`antwort-btn ${gewaehlt !== null ? i === aktuelleFrage.richtig ? "richtig" : gewaehlt === i ? "falsch" : "" : ""}`}
              onClick={() => antworten(i)}
            >{a}</button>
          ))}
        </div>
        {gewaehlt !== null && (
          <div className={`feedback ${richtigGewaehlt ? "feedback-richtig" : "feedback-falsch"}`}>
            <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}>
              {richtigGewaehlt ? <><CheckIcon size={16} color="#10B981"/> Richtig!</> : <><XCircleIcon size={16} color="#EF4444"/> Falsch</>}
            </p>
            {aktuelleFrage.erklaerung && <p className="quiz-erklaerung">{aktuelleFrage.erklaerung}</p>}
            <button className="weiter-btn" onClick={naechsteFrage}>
              {aktualeFrage + 1 >= fragen.length ? "Ergebnis →" : "Weiter →"}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (phase === "ergebnis") {
    const alleRichtig = richtige === fragen.length
    const fastRichtig = richtige === fragen.length - 1
    const verdientXP = alleRichtig ? lektion.xp : fastRichtig ? Math.round(lektion.xp / 2) : 0
    const perfekt = alleRichtig
    return (
      <div className="screen">
        <div className="ergebnis-screen">
          <div className="ergebnis-emoji">
            {alleRichtig ? <TrophyIcon size={52} color="#EAB308"/> : <LernenIcon size={52} color="#7C3AED"/>}
          </div>
          <h1 className="ergebnis-titel">
            {alleRichtig ? "Perfekt! 🎉" : fastRichtig ? "Fast perfekt!" : "Noch einmal!"}
          </h1>
          <p className="ergebnis-sub">{richtige} von {fragen.length} Fragen richtig</p>
          {verdientXP > 0
            ? <p className="ergebnis-xp">+{verdientXP} XP</p>
            : <p className="ergebnis-sub" style={{ marginTop: "0.25rem", color: "#888" }}>Noch einmal für volle XP</p>
          }
          {richtige < fragen.length && (
            <button className="weiter-btn" style={{ marginTop: "1.5rem", background: "#2a2040", color: "#fff" }}
              onClick={() => { setPhase("lesen"); setAktualeFrage(0); setGewaehlt(null); setRichtige(0) }}>
              Nochmal lesen
            </button>
          )}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button className="weiter-btn" style={{ flex: 1 }} onClick={() => onAbgeschlossen(verdientXP, perfekt)}>
              {verdientXP > 0 ? "Weiter →" : "Trotzdem weiter →"}
            </button>
            {alleRichtig && (
              <button
                className="weiter-btn"
                style={{ flex: 1, background: "#2a2040" }}
                onClick={() => navigatorTeilen(`Ich habe gerade gelernt: ${lektion.titel} 📚 #Lumio #Finanzbildung`)}
              >
                Teilen 📤
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

function FeedbackModal({ onClose }) {
  const [sterne, setSterne] = useState(0)
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function abschicken() {
    const abgeschl = JSON.parse(localStorage.getItem("abgeschlosseneLektionen") || "[]")
    const eintrag = { sterne, text, datum: getHeute(), lektionen: abgeschl.length }
    const bisheriges = JSON.parse(localStorage.getItem("feedbackEintraege") || "[]")
    bisheriges.push(eintrag)
    localStorage.setItem("feedbackEintraege", JSON.stringify(bisheriges))
    setSubmitted(true)
    setTimeout(onClose, 2200)
  }

  if (submitted) {
    return (
      <div className="level-up-overlay" onClick={onClose}>
        <div className="level-up-modal" onClick={e => e.stopPropagation()}>
          <div className="level-up-emoji">🙏</div>
          <h2 className="level-up-titel">Danke!</h2>
          <p className="level-up-sub">Dein Feedback hilft uns, Lumio besser zu machen.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="level-up-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={e => e.stopPropagation()}>
        <div className="level-up-emoji">💬</div>
        <h2 className="level-up-titel">Wie gefällt dir Lumio bisher?</h2>
        <div className="feedback-sterne">
          {[1, 2, 3, 4, 5].map(s => (
            <span key={s} className={`feedback-stern${s <= sterne ? " aktiv" : ""}`} onClick={() => setSterne(s)}>★</span>
          ))}
        </div>
        <textarea
          className="feedback-textarea"
          placeholder="Was können wir besser machen? (optional)"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
        />
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
          <button className="weiter-btn" style={{ flex: 1, background: "#2a2040" }} onClick={onClose}>Überspringen</button>
          <button className="weiter-btn" style={{ flex: 1 }} disabled={sterne === 0} onClick={abschicken}>Senden</button>
        </div>
      </div>
    </div>
  )
}

function ErsteLeKtionEmailModal({ onClose }) {
  return (
    <div className="level-up-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={e => e.stopPropagation()}>
        <div className="level-up-emoji">📚</div>
        <h2 className="level-up-titel">Du lernst gerade – bleib dabei!</h2>
        <p className="level-up-sub" style={{ marginBottom: "1.25rem" }}>
          Wir erinnern dich wöchentlich an deinen Fortschritt.
        </p>
        <EmailSubscribe compact />
        <button
          style={{ marginTop: "0.875rem", background: "none", border: "none", color: "#666", fontSize: "0.85rem", cursor: "pointer", padding: "0.25rem" }}
          onClick={onClose}
        >
          Nein danke
        </button>
      </div>
    </div>
  )
}

function LevelUpModal({ levelUpInfo, onClose }) {
  if (!levelUpInfo) return null
  const newLevel = levelUpInfo.newLevel
  const oldLevel = levelUpInfo.oldLevel || (newLevel - 1)
  const newName = LEVEL_NAMEN[newLevel] || ""
  const oldName = LEVEL_NAMEN[oldLevel] || ""
  const newIcon = LEVEL_ICONS[newLevel] || "⭐"

  const unlockedKats = kategorien.filter(k => k.minLevel === newLevel)

  const [shareKopiert, setShareKopiert] = useState(false)

  async function handleShare() {
    const text = `Ich bin gerade Level ${newLevel} (${newName}) bei Lumio! 🚀 Kostenlose Finanzbildung: lumio.app`
    const success = await navigatorTeilen(text)
    if (success && !navigator.share) {
      setShareKopiert(true)
      setTimeout(() => setShareKopiert(false), 2000)
    }
  }

  return (
    <div className="level-up-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={e => e.stopPropagation()}>
        <div className="lup-confetti">
          {CONFETTI.map((c, i) => (
            <div key={i} className="lup-conf-dot" style={{ "--cx": c.cx, "--cc": c.cc, "--cd": c.cd, "--cdelay": c.cdelay }} />
          ))}
        </div>
        <div className="level-up-emoji">{newIcon}</div>
        <h2 className="level-up-titel">Level Up! 🎉</h2>
        {oldName && (
          <p className="level-up-transition">
            <span className="lut-old">{oldName}</span>
            <span className="lut-arrow"> → </span>
            <span className="lut-new">{newName}</span>
          </p>
        )}
        <div className="level-up-zahl">{newLevel}</div>
        {unlockedKats.length > 0 && (
          <div className="level-up-unlocked">
            <p className="luu-label">Neu freigeschaltet:</p>
            {unlockedKats.map(k => (
              <div key={k.id} className="luu-item">
                <span>{k.icon}</span>
                <span>{k.name}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
          <button className="weiter-btn" style={{ flex: 1 }} onClick={onClose}>Weiter →</button>
          <button className="weiter-btn" style={{ flex: 1, background: "#2a2040" }} onClick={handleShare}>
            {shareKopiert ? "✓ Kopiert!" : "Teilen 📤"}
          </button>
        </div>
      </div>
    </div>
  )
}

function AchievementModal({ achievement, onClose }) {
  if (!achievement) return null
  return (
    <div className="level-up-overlay" onClick={onClose}>
      <div className="level-up-modal" onClick={e => e.stopPropagation()}>
        <div className="level-up-emoji">{achievement.icon}</div>
        <h2 className="level-up-titel">Achievement!</h2>
        <p className="level-up-name" style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>{achievement.name}</p>
        <p className="level-up-sub">{achievement.beschreibung}</p>
        <button className="weiter-btn" style={{ marginTop: "1.25rem" }} onClick={onClose}>Cool! →</button>
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
        <button className="zurueck-btn" onClick={() => setAktiverQuest(null)}><ArrowLeftIcon size={16}/> Zurück</button>
        <div className="lektion-progress-header">
          <div className="lektion-progress" style={{ flex: 1, margin: 0 }}>
            <div className="lektion-progress-fill" style={{ width: `${((aktualeFrage + 1) / aktiverQuest.fragen.length) * 100}%` }} />
          </div>
          <span className="lektion-progress-label">Quest · {aktualeFrage + 1} / {aktiverQuest.fragen.length}</span>
        </div>
        <p className="theorie-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><QuestIcon size={14} color="#7C3AED"/> Daily Quest</p>
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
            <p style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>{richtigGewaehlt ? <><CheckIcon size={16} color="#10B981"/> Richtig!</> : <><XCircleIcon size={16} color="#EF4444"/> Falsch!</>}</p>
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
          <div className="ergebnis-emoji">{perfekt ? <TrophyIcon size={52} color="#EAB308"/> : <StarIcon size={52} color="#7C3AED"/>}</div>
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
          <div style={{ textAlign: "center", marginBottom: "1rem" }}><CheckIcon size={52} color="#10B981"/></div>
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
              <div className="lektion-status"><QuestIcon size={20} color="#7C3AED"/></div>
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

function AktionsplanScreen({ planId, aktionsplaene, onSchrittToggle, onBonusXP, onUeberspringen }) {
  const plan       = AKTIONSPLAN_DATEN[planId]
  const planState  = aktionsplaene[planId] || {}
  const schritte   = planState.schritte || Array(plan.schritte.length).fill(false)
  const erledigt   = schritte.filter(Boolean).length
  const gesamt     = plan.schritte.length
  const pct        = gesamt > 0 ? Math.round((erledigt / gesamt) * 100) : 0
  const alleGeschafft = erledigt === gesamt
  const [bonusDone, setBonusDone] = useState(false)
  const [notgroschen, setNotgroschen] = useState(1500)
  const [apSparrate, setApSparrate] = useState(100)

  const apSparProjektion = Math.round(apSparrate * ((Math.pow(1 + 0.07 / 12, 240) - 1) / (0.07 / 12)))
  const apSparSliderBg = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100
    return `linear-gradient(to right, #7C3AED ${pct}%, #2a2040 ${pct}%)`
  }

  useEffect(() => {
    if (alleGeschafft && !bonusDone && !planState.bonusVergeben) {
      setBonusDone(true)
      onBonusXP(plan.bonusXP, planId)
    }
  }, [alleGeschafft])

  const farben = ["#7C3AED", "#9D174D", "#10B981", "#EAB308", "#3B82F6", "#F97316", "#EC4899", "#8B5CF6"]

  return (
    <div className="screen ap-screen">
      {/* Konfetti wenn alles erledigt */}
      {alleGeschafft && (
        <div className="ap-konfetti-container" aria-hidden="true">
          {farben.concat(farben).map((farbe, i) => (
            <div key={i} className="ap-konfetti-piece"
              style={{ left: `${(i / 16) * 100}%`, background: farbe, animationDelay: `${i * 0.12}s`, animationDuration: `${2.5 + (i % 4) * 0.5}s` }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="ap-skip-row">
        <button className="ap-skip-btn" onClick={onUeberspringen}>Überspringen</button>
      </div>
      <div className="ap-header">
        <div className="ap-header-icon">{plan.headerIcon}</div>
        <h1 className="ap-titel">{alleGeschafft ? plan.abschlussText : plan.titel}</h1>
        <p className="ap-subtitel">{plan.subtitel}</p>
      </div>

      {/* Fortschritt */}
      <div className="ap-fortschritt">
        <div className="ap-fort-row">
          <span className="ap-fort-label">{erledigt} von {gesamt} Schritten erledigt</span>
          <span className="ap-fort-pct">{pct}%</span>
        </div>
        <div className="ap-fort-bar-bg">
          <div className="ap-fort-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Bonus XP Banner wenn alles erledigt */}
      {alleGeschafft && (
        <div className="ap-bonus-banner">
          <span className="ap-bonus-icon">⚡</span>
          <span className="ap-bonus-text">+{plan.bonusXP} Bonus-XP erhalten!</span>
        </div>
      )}

      {/* Schritt-Karten */}
      <div className="ap-schritte">
        {plan.schritte.map((s, i) => {
          const done = schritte[i] || false
          return (
            <div key={i} className={`ap-schritt-karte ${done ? "done" : ""}`}>
              <div className="ap-schritt-top">
                <button
                  className={`ap-checkbox ${done ? "checked" : ""}`}
                  onClick={() => onSchrittToggle(planId, i)}
                  aria-label={done ? "Als unerledigt markieren" : "Als erledigt markieren"}
                >
                  {done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7"/></svg>}
                </button>
                <div className="ap-schritt-icon">
                  <KatIcon id={s.iconKatId} size={18} color={done ? "#10B981" : "#7C3AED"}/>
                </div>
                <div className="ap-schritt-kopf">
                  <span className="ap-schritt-titel">{s.titel}</span>
                  <span className="ap-schritt-dauer">{s.dauer}</span>
                </div>
              </div>
              <p className="ap-schritt-beschreibung">{s.beschreibung}</p>
              {s.broker && (
                <div className="ap-broker-pills">
                  {s.broker.map(b => (
                    <span key={b} className="ap-broker-pill">{b}</span>
                  ))}
                </div>
              )}
              {s.sparplanRechner && (
                <div className="ap-mini-rechner">
                  <span className="ap-rechner-label">Deine Sparrate: <strong>{apSparrate} €/Monat</strong></span>
                  <input
                    type="range"
                    min={10} max={500} step={5}
                    value={apSparrate}
                    onChange={e => setApSparrate(Number(e.target.value))}
                    className="ap-sparplan-slider"
                    style={{ background: apSparSliderBg(apSparrate, 10, 500) }}
                  />
                  <div className="ap-rechner-result">
                    In 20 Jahren: <strong>{apSparProjektion.toLocaleString("de-DE")} €</strong>
                  </div>
                  <p className="ap-rechner-hint">Bei 7% Rendite (historischer MSCI World Schnitt)</p>
                </div>
              )}
              {s.rechner && (
                <div className="ap-mini-rechner">
                  <span className="ap-rechner-label">Monatsausgaben:</span>
                  <div className="ap-rechner-row">
                    <input
                      type="number"
                      min={100}
                      max={10000}
                      value={notgroschen}
                      onChange={e => setNotgroschen(Number(e.target.value) || 0)}
                      className="ap-rechner-input"
                    />
                    <span className="ap-rechner-unit">€/Mo</span>
                  </div>
                  <div className="ap-rechner-result">
                    Dein Notgroschen-Ziel: <strong>{(notgroschen * 3).toLocaleString("de-DE")} €</strong>
                  </div>
                </div>
              )}
              {s.infoBox && (
                <div className="ap-info-box">
                  <span className="ap-info-icon">💡</span>
                  <p className="ap-info-text">{s.infoBox}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Abschluss-Button */}
      {alleGeschafft && (
        <button className="ap-weiter-btn" onClick={onUeberspringen}>
          Nächster Lernpfad →
        </button>
      )}
    </div>
  )
}

function ProfilScreen({ xp, streak, abgeschlosseneLektionen, userName, userWissenslevel, achievements, xpTaeglich, streakFreezes, onStreakFreeze, aktionsplaene, onAktionsplanOeffnen }) {
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem("soundEnabled") === "true")
  function toggleSound() {
    const neu = !soundOn
    setSoundOn(neu)
    localStorage.setItem("soundEnabled", String(neu))
  }
  const lvl         = getLevelInfo(xp)
  const circumf     = 2 * Math.PI * 44
  const dashOffset  = circumf - (lvl.fortschritt / 100) * circumf
  const streakInfo  = getStreakDisplay(streak)

  const etfGesamt        = lernpfad[1].length
  const etfAbgeschlossen = lernpfad[1].filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const aktienGesamt        = lernpfad[2].length
  const aktienAbgeschlossen = lernpfad[2].filter(l => abgeschlosseneLektionen.includes(l.id)).length
  const kryptoGesamt        = lernpfad[3].length
  const kryptoAbgeschlossen = lernpfad[3].filter(l => abgeschlosseneLektionen.includes(l.id)).length

  const badges = [
    { id: "erste_lektion",  name: "Erster Schritt",   icon: "🎯", beschreibung: "Erste Lektion", erreicht: abgeschlosseneLektionen.length >= 1 },
    { id: "etf_komplett",   name: "ETF Experte",       icon: "📈", beschreibung: "Alle ETF-Lektionen", erreicht: etfAbgeschlossen === etfGesamt && etfGesamt > 0 },
    { id: "aktien_start",   name: "Aktien Profi",      icon: "📊", beschreibung: "5 Aktien-Lektionen", erreicht: aktienAbgeschlossen >= 5 },
    { id: "aktien_komplett",name: "Wall Street",        icon: "💼", beschreibung: "Alle Aktien", erreicht: aktienAbgeschlossen === aktienGesamt && aktienGesamt > 0 },
    { id: "krypto_start",   name: "Krypto Einsteiger", icon: "₿",  beschreibung: "1 Krypto-Lektion", erreicht: kryptoAbgeschlossen >= 1 },
    { id: "krypto_komplett",name: "Blockchain Master", icon: "⛓️", beschreibung: "Alle Krypto", erreicht: kryptoAbgeschlossen === kryptoGesamt && kryptoGesamt > 0 },
    { id: "streak_7",       name: "Feuer-Streak",      icon: "🔥", beschreibung: "7 Tage am Stück", erreicht: streak >= 7 },
    { id: "level_5",        name: "Aufsteiger",        icon: "⭐", beschreibung: "Level 5 erreicht", erreicht: lvl.level >= 5 },
    { id: "level_10",       name: "Veteran",           icon: "🏆", beschreibung: "Level 10 erreicht", erreicht: lvl.level >= 10 },
  ]

  const stats = [
    { label: "Lektionen", wert: abgeschlosseneLektionen.length, icon: <LernenIcon size={20} color="#7C3AED"/> },
    { label: "Streak",    wert: `${streak} Tage`,               icon: <FlameIcon  size={20} color="#f97316"/> },
    { label: "XP Gesamt", wert: xp,                             icon: <BoltIcon   size={20} color="#EAB308"/> },
    { label: "ETF",       wert: `${etfAbgeschlossen}/${etfGesamt}`,       icon: <ETFIcon    size={20} color="#7C3AED"/> },
    { label: "Aktien",    wert: `${aktienAbgeschlossen}/${aktienGesamt}`,  icon: <AktienIcon size={20} color="#9D174D"/> },
    { label: "Krypto",    wert: `${kryptoAbgeschlossen}/${kryptoGesamt}`,  icon: <KryptoIcon size={20} color="#7C3AED"/> },
  ]

  const lernpfadItems = kategorien.map(k => {
    const gesamt = (lernpfad[k.id] || []).length
    const abg    = (lernpfad[k.id] || []).filter(l => abgeschlosseneLektionen.includes(l.id)).length
    const pct    = gesamt > 0 ? Math.round((abg / gesamt) * 100) : 0
    return { ...k, gesamt, abg, pct }
  })

  const initials = userName
    ? userName.trim().split(/\s+/).map(w => w[0]).join("").substring(0, 2).toUpperCase()
    : "??"

  // 7-Tage-Timeline
  const timeline = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    const key = d.toISOString().split("T")[0]
    const tagXP = xpTaeglich[key] || 0
    const wochentage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
    return { key, label: wochentage[d.getDay()], aktiv: tagXP > 0, xp: tagXP }
  })

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
            <circle cx="50" cy="50" r="44" fill="none" stroke="url(#lvlGrad)"
              strokeWidth="7" strokeDasharray={circumf} strokeDashoffset={dashOffset} strokeLinecap="round"/>
          </svg>
          <div className="profil-avatar-circle">{initials}</div>
        </div>
        <p className="profil-avatar-name">{userName || "Unbekannt"}</p>
        <p className="profil-avatar-level" style={{ display: "flex", alignItems: "center", gap: "0.3rem", justifyContent: "center" }}><StarIcon size={12} color="#EAB308"/> {lvl.name} · Level {lvl.level}</p>
      </div>

      <div className="profil-xp-section">
        <div className="profil-xp-row">
          <span><strong>XP zum nächsten Level</strong></span>
          <span>{lvl.xpAktuell} / {lvl.xpBenoetigt}</span>
        </div>
        <div className="profil-xp-bar">
          <div className="profil-xp-fill" style={{ width: `${lvl.fortschritt}%` }} />
        </div>
      </div>

      {(() => {
        const score = berechneFinanzScore(xp, streak, abgeschlosseneLektionen)
        const scoreKat = getFinanzScoreKategorie(score)
        const nextMilestone = [100, 300, 600, 1000, 1500, 2000].find(m => m > score) || score + 500
        const pct = Math.min(100, Math.round((score / nextMilestone) * 100))
        const circumfScore = 2 * Math.PI * 36
        const dashScore = circumfScore - (pct / 100) * circumfScore
        return (
          <div className="finanz-score-card">
            <div className="fsc-left">
              <p className="fsc-label">Finanz-Score</p>
              <p className="fsc-zahl" style={{ color: scoreKat.color }}>{score.toLocaleString("de-DE")}</p>
              <p className="fsc-kat" style={{ color: scoreKat.color }}>{scoreKat.icon} {scoreKat.label}</p>
            </div>
            <div className="fsc-ring">
              <svg viewBox="0 0 80 80" width={80} height={80}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={scoreKat.color}/>
                    <stop offset="100%" stopColor={scoreKat.color + "88"}/>
                  </linearGradient>
                </defs>
                <circle cx="40" cy="40" r="36" fill="none" stroke="#2a2040" strokeWidth="6"/>
                <circle cx="40" cy="40" r="36" fill="none" stroke="url(#scoreGrad)"
                  strokeWidth="6" strokeDasharray={circumfScore} strokeDashoffset={dashScore}
                  strokeLinecap="round" transform="rotate(-90 40 40)"/>
                <text x="40" y="45" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">{pct}%</text>
              </svg>
            </div>
          </div>
        )
      })()}
      <div className="profil-streak-card">
        <span className={`streak-flame${streak > 0 ? " active" : ""}`}><FlameIcon size={28} color={streak > 0 ? "#f97316" : "#555"}/></span>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: "1rem" }}>{streakInfo.label}</p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>
            {streak > 0 ? "Weiter so! Komm morgen wieder." : "Starte deinen Streak heute."}
          </p>
        </div>
        {streakFreezes > 0 && (
          <button className="freeze-btn" onClick={onStreakFreeze} title="Streak-Freeze aktivieren">
            🧊 {streakFreezes}
          </button>
        )}
      </div>

      <h3 className="profil-section-titel">Deine Reise – letzte 7 Tage</h3>
      <div className="timeline-woche">
        {timeline.map(t => (
          <div key={t.key} className={`timeline-tag ${t.aktiv ? "aktiv" : ""}`}>
            <div className="timeline-dot">{t.aktiv ? <CheckIcon size={10} color="#10B981" strokeWidth={3}/> : ""}</div>
            <span className="timeline-label">{t.label}</span>
            {t.aktiv && <span className="timeline-xp">+{t.xp}</span>}
          </div>
        ))}
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

      <h3 className="profil-section-titel">Achievements</h3>
      <div className="achievements-grid">
        {ACHIEVEMENTS_DEF.map(a => {
          const erreicht = !!(achievements && achievements[a.id])
          return (
            <div key={a.id} className={`achievement-karte ${erreicht ? "erreicht" : "gesperrt"}`}>
              <span className="achievement-icon">{erreicht ? a.icon : <LockIcon size={22} color="#555"/>}</span>
              <p className="achievement-name">{erreicht ? a.name : "???"}</p>
              <p className="achievement-beschreibung">{erreicht ? a.beschreibung : "Noch nicht freigeschaltet"}</p>
            </div>
          )
        })}
      </div>

      <h3 className="profil-section-titel">Abzeichen</h3>
      <div className="profil-badges">
        {badges.map(b => (
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
            <div className="plp-icon" style={{ background: k.farbe + "22", color: k.farbe }}><KatIcon id={k.id} size={20} color={k.farbe}/></div>
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

      {Object.keys(aktionsplaene || {}).length > 0 && (
        <>
          <h3 className="profil-section-titel">Meine Aktionspläne</h3>
          <div className="profil-aktionsplaene">
            {Object.entries(AKTIONSPLAN_DATEN).map(([planId, plan]) => {
              const planState = (aktionsplaene || {})[planId]
              if (!planState) return null
              const schritte = planState.schritte || []
              const erd = schritte.filter(Boolean).length
              const ges = plan.schritte.length
              const pct = ges > 0 ? Math.round((erd / ges) * 100) : 0
              return (
                <div key={planId} className="pap-karte" onClick={() => onAktionsplanOeffnen && onAktionsplanOeffnen(planId)}>
                  <div className="pap-icon">{plan.headerIcon}</div>
                  <div className="pap-info">
                    <p className="pap-name">{plan.name}</p>
                    <div className="pap-bar-bg">
                      <div className="pap-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="pap-meta">{erd}/{ges} Schritte · {pct}%</p>
                  </div>
                  <div className="pap-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {abgeschlosseneLektionen.length === 0 && (
        <div className="empty-state" style={{ marginTop: "1rem" }}>
          <span className="empty-state-icon">🌱</span>
          <p className="empty-state-title">Du fängst gerade an</p>
          <p className="empty-state-sub">Dein Profil füllt sich mit jeder abgeschlossenen Lektion. Starte jetzt!</p>
        </div>
      )}

      <h3 className="profil-section-titel" style={{ marginTop: "1.5rem" }}>Einstellungen</h3>
      <div className="sound-toggle-row">
        <div>
          <p className="sound-toggle-label">🔊 Sounds</p>
          <p className="sound-toggle-sub">Audio-Feedback beim Lernen</p>
        </div>
        <button className={`sound-switch ${soundOn ? "on" : ""}`} onClick={toggleSound} aria-label={soundOn ? "Sounds deaktivieren" : "Sounds aktivieren"} />
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

function ChallengesScreen({ onZurueck, abgeschlosseneLektionen, streak, rechnerOeffnungen, newsOeffnungen, xpTaeglich, perfektQuizzeGesamt, challengesClaimed, onChallengeEinloesen, xp }) {
  const [ansicht, setAnsicht] = useState("offen")

  const weekKey  = getWeekKey()
  const monthKey = getMonthKey()

  const wochenStats  = JSON.parse(localStorage.getItem(`weeklyStats_${weekKey}`)  || '{"lektionen":0,"perfekt":0,"rechner":0,"news":0}')
  const monatsStats  = JSON.parse(localStorage.getItem(`monthlyStats_${monthKey}`) || '{"lektionen":0,"kategorienSet":[]}')

  const level = berechneLevel(xp)

  // Weekly XP from xpTaeglich (Mon–Sun)
  const heute = new Date()
  const wochenStart = new Date(heute)
  const tagIndex = heute.getDay() || 7
  wochenStart.setDate(heute.getDate() - tagIndex + 1)
  wochenStart.setHours(0, 0, 0, 0)
  const wochenXP = Object.entries(xpTaeglich)
    .filter(([d]) => new Date(d) >= wochenStart)
    .reduce((sum, [, v]) => sum + v, 0)

  // Completed categories
  const katKomplett = kategorien.filter(k => {
    const alleIds = (lernpfad[k.id] || []).map(l => l.id)
    return alleIds.length > 0 && alleIds.every(id => abgeschlosseneLektionen.includes(id))
  }).length

  const aktuelleWC = getAktuelleWochenchallenge()
  const aktuelleMC = getAktuelleMonatschallenge()
  const tageRestlich = getTageRestlicheWoche()

  function getWochenProgress(typ) {
    switch (typ) {
      case "lektionen":     return wochenStats.lektionen || 0
      case "perfekt_quizze": return wochenStats.perfekt   || 0
      case "streak":        return streak
      case "rechner":       return wochenStats.rechner    || 0
      case "news":          return wochenStats.news       || 0
      case "xp":            return wochenXP
      default: return 0
    }
  }

  function getMonatsProgress(typ) {
    switch (typ) {
      case "lektionen":    return monatsStats.lektionen || 0
      case "kategorien":   return (monatsStats.kategorienSet || []).length
      case "streak_gesamt": return streak
      default: return 0
    }
  }

  function getPermanentProgress(typ) {
    switch (typ) {
      case "lektionen_gesamt": return abgeschlosseneLektionen.length
      case "streak_gesamt":    return streak
      case "perfekt_gesamt":   return perfektQuizzeGesamt
      case "rechner_gesamt":   return rechnerOeffnungen
      case "news_gesamt":      return newsOeffnungen
      case "kat_komplett":     return katKomplett
      case "level":            return level
      default: return 0
    }
  }

  const wClaimKey = `w_${aktuelleWC.id}_${weekKey}`
  const mClaimKey = `m_${aktuelleMC.id}_${monthKey}`
  const wFortschritt  = getWochenProgress(aktuelleWC.typ)
  const mFortschritt  = getMonatsProgress(aktuelleMC.typ)
  const wAbgeschlossen = wFortschritt >= aktuelleWC.ziel
  const mAbgeschlossen = mFortschritt >= aktuelleMC.ziel
  const wEingelo = !!challengesClaimed[wClaimKey]
  const mEingelo = !!challengesClaimed[mClaimKey]

  // Filter permanent challenges by ansicht
  const permanentMitStatus = PERMANENT_CHALLENGES.map(c => {
    const fortschritt = getPermanentProgress(c.typ)
    const abgeschlossen = fortschritt >= c.ziel
    const eingelo = !!challengesClaimed[`p_${c.id}`]
    return { ...c, fortschritt, abgeschlossen, eingelo }
  })
  const offenePermanent     = permanentMitStatus.filter(c => !c.eingelo)
  const abgeschlossenePermanent = permanentMitStatus.filter(c => c.eingelo)
  const anzeigeListePermanent   = ansicht === "offen" ? offenePermanent : abgeschlossenePermanent

  function ChallengeKarte({ icon, titel, beschreibung, xpBetrag, fortschritt, ziel, abgeschlossen, eingelo, claimKey, farbe = "#9D174D" }) {
    const pct = Math.min(100, Math.round((fortschritt / ziel) * 100))
    return (
      <div className={`ch-karte ${eingelo ? "ch-eingelo" : abgeschlossen ? "ch-bereit" : ""}`}>
        <div className="ch-karte-icon" style={{ background: farbe + "22", color: farbe }}>{icon}</div>
        <div className="ch-karte-body">
          <div className="ch-karte-header-row">
            <span className="ch-karte-titel">{titel}</span>
            <span className="ch-xp-badge">+{xpBetrag} XP</span>
          </div>
          <p className="ch-karte-desc">{beschreibung}</p>
          <div className="ch-progress-row">
            <div className="ch-progress-bg">
              <div className="ch-progress-fill" style={{ width: `${pct}%`, background: farbe }} />
            </div>
            <span className="ch-progress-label">{Math.min(fortschritt, ziel)}/{ziel}</span>
          </div>
        </div>
        {eingelo && <div className="ch-check">✓</div>}
        {abgeschlossen && !eingelo && (
          <button className="ch-claim-btn" onClick={() => onChallengeEinloesen(claimKey, xpBetrag)}>
            Einlösen
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="screen-header" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <button className="zurueck-btn" onClick={onZurueck}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div>
          <h1 className="screen-header-title" style={{ background: "linear-gradient(135deg, #9D174D, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 800, fontSize: "1.7rem" }}>Challenges</h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>{tageRestlich} Tag{tageRestlich !== 1 ? "e" : ""} bis zur neuen Wochenchallenge</p>
        </div>
      </div>

      {/* ── Wöchentliche Challenge ── */}
      <p className="section-label">DIESE WOCHE</p>
      <ChallengeKarte
        icon={aktuelleWC.icon}
        titel={aktuelleWC.titel}
        beschreibung={aktuelleWC.beschreibung}
        xpBetrag={aktuelleWC.xp}
        fortschritt={wFortschritt}
        ziel={aktuelleWC.ziel}
        abgeschlossen={wAbgeschlossen}
        eingelo={wEingelo}
        claimKey={wClaimKey}
        farbe="#9D174D"
      />

      {/* ── Monatliche Challenge ── */}
      <p className="section-label" style={{ marginTop: "1.5rem" }}>DIESEN MONAT</p>
      <ChallengeKarte
        icon={aktuelleMC.icon}
        titel={aktuelleMC.titel}
        beschreibung={aktuelleMC.beschreibung}
        xpBetrag={aktuelleMC.xp}
        fortschritt={mFortschritt}
        ziel={aktuelleMC.ziel}
        abgeschlossen={mAbgeschlossen}
        eingelo={mEingelo}
        claimKey={mClaimKey}
        farbe="#7C3AED"
      />

      {/* ── Permanente Challenges ── */}
      <div className="ch-toggle-row" style={{ marginTop: "1.75rem" }}>
        <p className="section-label" style={{ margin: 0 }}>CHALLENGES</p>
        <div className="ch-toggle">
          <button className={`ch-toggle-btn ${ansicht === "offen" ? "aktiv" : ""}`} onClick={() => setAnsicht("offen")}>
            Offen ({offenePermanent.length})
          </button>
          <button className={`ch-toggle-btn ${ansicht === "abgeschlossen" ? "aktiv" : ""}`} onClick={() => setAnsicht("abgeschlossen")}>
            Fertig ({abgeschlossenePermanent.length})
          </button>
        </div>
      </div>
      <div className="ch-liste" style={{ marginTop: "0.75rem" }}>
        {anzeigeListePermanent.length === 0 && (
          <div className="ch-leer">
            {ansicht === "offen" ? "Alle Challenges abgeschlossen! 🏆" : "Noch keine Challenge abgeschlossen."}
          </div>
        )}
        {anzeigeListePermanent.map(c => (
          <ChallengeKarte
            key={c.id}
            icon={c.icon}
            titel={c.titel}
            beschreibung={c.beschreibung}
            xpBetrag={c.xp}
            fortschritt={c.fortschritt}
            ziel={c.ziel}
            abgeschlossen={c.abgeschlossen}
            eingelo={c.eingelo}
            claimKey={`p_${c.id}`}
            farbe="#7C3AED"
          />
        ))}
      </div>
    </div>
  )
}

function TippDerWocheKarte({ onLektionClick }) {
  const tipp = getTippDerWoche()
  return (
    <div className="tipp-woche-karte">
      <div className="tipp-woche-accent" />
      <div className="tipp-woche-content">
        <span className="tipp-woche-label">TIPP DER WOCHE</span>
        <h3 className="tipp-woche-titel">{tipp.titel}</h3>
        <p className="tipp-woche-text">{tipp.text}</p>
        {tipp.lektionId && onLektionClick && (
          <button className="tipp-woche-btn" onClick={() => onLektionClick(tipp.lektionId)}>
            Mehr dazu lernen →
          </button>
        )}
      </div>
    </div>
  )
}

function NewsScreen({ onZurueck, onOeffnen, onLektionClick }) {
  const [news, setNews] = useState([])
  const [laden, setLaden] = useState(true)
  const [istFallback, setIstFallback] = useState(false)
  const [aktiverFilter, setAktiverFilter] = useState("alle")

  useEffect(() => { if (onOeffnen) onOeffnen() }, [])

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
        {onZurueck && <button className="zurueck-btn" onClick={onZurueck}><ArrowLeftIcon size={16}/> Zurück</button>}
        <div className="screen-header" style={{ marginTop: "1rem" }}>
          <Skeleton width="80px" height={28} borderRadius={8} style={{ marginBottom: "0.5rem" }} />
          <Skeleton width="160px" height={14} borderRadius={6} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: "#12101a", border: "1px solid #2a2040", borderRadius: 16, padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Skeleton width="90%" height={16} />
              <Skeleton width="75%" height={13} />
              <Skeleton width="50%" height={11} borderRadius={6} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      {onZurueck && <button className="zurueck-btn" onClick={onZurueck}><ArrowLeftIcon size={16}/> Zurück</button>}
      <div className="screen-header" style={{ marginTop: "1rem" }}>
        <h1>News</h1>
        <p className="xp-info">📰 Aktuelle Finanz-News</p>
      </div>

      <TippDerWocheKarte onLektionClick={onLektionClick} />

      {istFallback && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1A1728", border: "1px solid #2A2040", borderRadius: "10px", padding: "10px 14px", marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.78rem", color: "#888", margin: 0 }}>📶 Live-Feeds werden auf lumio.app geladen</p>
          <button onClick={ladeNews} style={{ background: "#7C3AED22", border: "1px solid #7C3AED44", color: "#a78bfa", borderRadius: "8px", padding: "4px 10px", fontSize: "0.72rem" }}>Erneut laden</button>
        </div>
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
        <div className="empty-state">
          <span className="empty-state-icon">📰</span>
          <p className="empty-state-title">Keine News gefunden</p>
          <p className="empty-state-sub">Kein Treffer für diesen Filter. Versuche "Alle".</p>
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

      <EmailSubscribe
        compact
        title="📬 Finanz-News direkt ins Postfach"
        subtitle="Wöchentlich die wichtigsten News. Kein Spam."
      />
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

function RechnerScreen({ onZurueck, userFinanzsituation, onRechnerOeffnung }) {
  const defaultSpar = getBudgetDefault(userFinanzsituation)
  const [sparrate, setSparrate]         = useState(defaultSpar)
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

  useEffect(() => { if (onRechnerOeffnung) onRechnerOeffnung() }, [])

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

  async function teilen() {
    const steuerZeile = steuerAn ? `\n💼 Nach Steuern: ${formatEuro(nettoEndwert)}` : ""
    const text = [
      `Mit ${sparrate}€/Monat werde ich in ${laufzeit} Jahren ${formatEuro(ergebnis)} haben. Zinseszins ist magisch! 📈 #Lumio`,
      `📊 ${sparrate} €/Monat × ${laufzeit} Jahre @ ${aktuelleProzent} % p.a.${steuerZeile}`,
      `💰 Davon Zinseszins: ${formatEuro(gewinn)} (${gewinnPct} %)`,
      `🔢 lumio.app`,
    ].join("\n")
    if (navigator.share) {
      try { await navigator.share({ text }); return } catch {}
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setKopiert(true)
        setTimeout(() => setKopiert(false), 2500)
      })
    }
  }

  return (
    <div className="screen">
      {onZurueck && <button className="zurueck-btn" onClick={onZurueck}><ArrowLeftIcon size={16}/> Zurück</button>}
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

// ── Simulated Rangliste Users ──
const SIMULATED_USERS = [
  { name: "Sophie K.",  xp: 2840, wxp: 210, initials: "SK" },
  { name: "Lukas M.",   xp: 2650, wxp: 195, initials: "LM" },
  { name: "Anna R.",    xp: 2410, wxp: 175, initials: "AR" },
  { name: "Tobias S.",  xp: 2180, wxp: 160, initials: "TS" },
  { name: "Julia B.",   xp: 1950, wxp: 140, initials: "JB" },
  { name: "Max H.",     xp: 1740, wxp: 120, initials: "MH" },
  { name: "Laura K.",   xp: 1520, wxp: 100, initials: "LK" },
  { name: "Stefan W.",  xp: 1350, wxp:  85, initials: "SW" },
  { name: "Nina P.",    xp: 1180, wxp:  70, initials: "NP" },
  { name: "Kevin F.",   xp: 1020, wxp:  60, initials: "KF" },
  { name: "Sarah L.",   xp:  860, wxp:  50, initials: "SL" },
  { name: "David M.",   xp:  720, wxp:  40, initials: "DM" },
  { name: "Lea T.",     xp:  590, wxp:  30, initials: "LT" },
  { name: "Jonas R.",   xp:  480, wxp:  22, initials: "JR" },
  { name: "Marie N.",   xp:  390, wxp:  18, initials: "MN" },
  { name: "Paul G.",    xp:  310, wxp:  15, initials: "PG" },
  { name: "Emma S.",    xp:  240, wxp:  12, initials: "ES" },
  { name: "Finn K.",    xp:  215, wxp:  10, initials: "FK" },
  { name: "Felix W.",   xp:  180, wxp:   8, initials: "FW" },
]

const TIPPS_DER_WOCHE = [
  { titel: "Der Zinseszins-Effekt", lektionId: 1, text: "Wusstest du? 100€/Monat bei 7% Rendite werden in 30 Jahren zu 121.997€. Du zahlst nur 36.000€ ein. Der Rest ist purer Zinseszins." },
  { titel: "Sparerpauschbetrag", lektionId: null, text: "Du hast 1.000€ steuerfrei pro Jahr auf Kapitalerträge. Hast du deinen Freistellungsauftrag eingerichtet? Ohne ihn zahlt die Bank automatisch 26% Steuer." },
  { titel: "Cost Averaging", lektionId: null, text: "Timing the market oder time in market? Studien zeigen: Regelmäßiges Investieren schlägt Markt-Timing in 94% der Fälle über 20 Jahre." },
  { titel: "Notgroschen First", lektionId: null, text: "Bevor du investierst: Baue einen Notgroschen von 3-6 Monatsausgaben auf. Ohne ihn zwingst du dich möglicherweise, ETFs im schlimmsten Moment zu verkaufen." },
  { titel: "TER Vergleich", lektionId: null, text: "Ein ETF mit 0.5% TER vs. 0.1% TER. Bei 10.000€ über 30 Jahre: 4.700€ Unterschied – nur wegen 0.4% Kostenunterschied." },
  { titel: "Rebalancing", lektionId: null, text: "Einmal pro Jahr: Prüfe ob dein Portfolio noch deiner Ziel-Aufteilung entspricht. Neue Einzahlungen in den untergewichteten Teil – keine Steuern ausgelöst." },
  { titel: "Behavioral Finance", lektionId: null, text: "Der größte Feind deiner Rendite bist du selbst. Anleger die in Crashs verkaufen, verlieren im Schnitt 3-4% p.a. gegenüber denen die nichts tun." },
]

function getWeeklyXP(xpTaeglich) {
  const heute = new Date()
  const day = heute.getDay()
  const diff = day === 0 ? 6 : day - 1
  const monday = new Date(heute)
  monday.setDate(heute.getDate() - diff)
  let total = 0
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const key = d.toISOString().split("T")[0]
    total += xpTaeglich[key] || 0
  }
  return total
}

function getTippDerWoche() {
  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  return TIPPS_DER_WOCHE[week % TIPPS_DER_WOCHE.length]
}

function berechneFinanzScore(xp, streak, abgeschlosseneLektionen) {
  const lektionenPunkte = abgeschlosseneLektionen.length * 10
  const streakPunkte = Math.min(streak, 30) * 2
  const uniqueKats = new Set(
    abgeschlosseneLektionen.map(lid => {
      for (const [k, ls] of Object.entries(lernpfad)) {
        if ((ls || []).some(l => l.id === lid)) return k
      }
      return null
    }).filter(Boolean)
  ).size
  const katPunkte = uniqueKats * 50
  return lektionenPunkte + streakPunkte + katPunkte
}

function getFinanzScoreKategorie(score) {
  if (score >= 1500) return { label: "Finanz-Profi",      color: "#EAB308", icon: "👑" }
  if (score >= 1001) return { label: "Experte",           color: "#7C3AED", icon: "💎" }
  if (score >=  601) return { label: "Fortgeschritten",   color: "#3b82f6", icon: "🚀" }
  if (score >=  301) return { label: "Solides Wissen",    color: "#10B981", icon: "📈" }
  if (score >=  101) return { label: "Grundkenntnisse",   color: "#f97316", icon: "🌱" }
  return               { label: "Einsteiger",             color: "#888",    icon: "🔰" }
}

function buildRangliste(userXP, userWXP, userName) {
  const userInit = userName
    ? userName.trim().split(/\s+/).map(w => w[0]).join("").substring(0, 2).toUpperCase()
    : "DU"
  const allUsers = [
    ...SIMULATED_USERS.map(u => ({ ...u, istUser: false })),
    { name: "Du", xp: userXP, wxp: userWXP, initials: userInit, istUser: true }
  ]
  return [...allUsers].sort((a, b) => b.xp - a.xp)
}

function buildRanglisteWoche(userXP, userWXP, userName) {
  const userInit = userName
    ? userName.trim().split(/\s+/).map(w => w[0]).join("").substring(0, 2).toUpperCase()
    : "DU"
  const allUsers = [
    ...SIMULATED_USERS.map(u => ({ ...u, istUser: false, sortXP: u.wxp })),
    { name: "Du", xp: userXP, wxp: userWXP, initials: userInit, istUser: true, sortXP: userWXP }
  ]
  return [...allUsers].sort((a, b) => b.sortXP - a.sortXP)
}

function RanglisteScreen({ xp, xpTaeglich, userName, onZurueck }) {
  const [modus, setModus] = useState("gesamt")
  const weeklyXP = getWeeklyXP(xpTaeglich)
  const liste = modus === "gesamt"
    ? buildRangliste(xp, weeklyXP, userName)
    : buildRanglisteWoche(xp, weeklyXP, userName)
  const userIdx = liste.findIndex(u => u.istUser)
  const userRang = userIdx + 1
  const top3 = liste.slice(0, 3)
  const rest = liste.slice(3)

  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3

  return (
    <div className="rl-screen">
      <div className="rl-header">
        {onZurueck && <button className="zurueck-btn" onClick={onZurueck} style={{ position: "absolute", left: "1rem" }}><ArrowLeftIcon size={16}/> Zurück</button>}
        <h2 className="rl-titel">Rangliste</h2>
        <div className="rl-toggle">
          <button className={`rl-toggle-btn ${modus === "woche" ? "aktiv" : ""}`} onClick={() => setModus("woche")}>Diese Woche</button>
          <button className={`rl-toggle-btn ${modus === "gesamt" ? "aktiv" : ""}`} onClick={() => setModus("gesamt")}>Gesamt</button>
        </div>
      </div>

      {xp === 0 ? (
        <div className="empty-state" style={{ marginTop: "1.5rem" }}>
          <span className="empty-state-icon">🏆</span>
          <p className="empty-state-title">Noch kein Ranking</p>
          <p className="empty-state-sub">Sammle deine ersten XP um in die Rangliste aufgenommen zu werden.</p>
        </div>
      ) : (
        <div className="rl-rang-banner">
          <span className="rl-rang-label">Dein Rang</span>
          <span className="rl-rang-zahl">#{userRang}</span>
          <span className="rl-rang-sub">von {liste.length} Usern</span>
        </div>
      )}

      {top3.length >= 3 && (
        <div className="rl-podium">
          {podiumOrder.map((u, i) => {
            const rang = liste.indexOf(u) + 1
            const medals = ["🥈", "🥇", "🥉"]
            return (
              <div key={u.name} className={`rl-podium-item rl-podium-${rang === 1 ? "gold" : rang === 2 ? "silber" : "bronze"} ${u.istUser ? "eigener" : ""}`}>
                {rang === 1 && <span className="rl-krone">👑</span>}
                <div className="rl-pod-avatar">{u.initials}</div>
                <span className="rl-pod-medal">{medals[i]}</span>
                <p className="rl-pod-name">{u.istUser ? "Du" : u.name}</p>
                <p className="rl-pod-xp">{(modus === "gesamt" ? u.xp : u.wxp || u.xp).toLocaleString("de-DE")} XP</p>
                <p className="rl-pod-level">{LEVEL_NAMEN[berechneLevel(u.xp)] || ""}</p>
              </div>
            )
          })}
        </div>
      )}

      <div className="rl-liste">
        {rest.map((u, i) => {
          const rang = i + 4
          return (
            <div key={u.name} className={`rl-row ${u.istUser ? "eigener" : ""}`}>
              <span className="rl-rang">{rang}</span>
              <div className="rl-avatar">{u.initials}</div>
              <div className="rl-info">
                <span className="rl-name">{u.istUser ? `Du${userName ? ` (${userName})` : ""}` : u.name}</span>
                <span className="rl-level-tag">{LEVEL_NAMEN[berechneLevel(u.xp)] || ""}</span>
              </div>
              {u.istUser && <span className="rl-du-badge">Du</span>}
              <span className="rl-xp">{(modus === "gesamt" ? u.xp : u.wxp || u.xp).toLocaleString("de-DE")} XP</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StreakShareModal({ streak, onClose }) {
  const [kopiert, setKopiert] = useState(false)
  const shareText = `🔥 ${streak} Tage Streak bei Lumio! Jeden Tag 5 Minuten Finanzwissen. lumio.app`

  async function teilen() {
    if (navigator.share) {
      try { await navigator.share({ text: shareText }); return } catch {}
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText)
      setKopiert(true)
      setTimeout(() => setKopiert(false), 2000)
    }
  }

  return (
    <div className="ssm-overlay" onClick={onClose}>
      <div className="ssm-modal" onClick={e => e.stopPropagation()}>
        <div className="ssm-icon">🔥</div>
        <h2 className="ssm-titel">{streak} Tage Streak!</h2>
        <p className="ssm-sub">Krasse Leistung – du bist jetzt besser als 95% aller Anfänger.</p>
        <div className="ssm-text-preview">{shareText}</div>
        <button className="ssm-copy-btn" onClick={teilen}>
          {kopiert ? "✓ Kopiert!" : "📤 Teilen"}
        </button>
        <button className="ssm-close-btn" onClick={onClose}>Schließen</button>
      </div>
    </div>
  )
}

function NudgeBanner({ nudge, onDismiss }) {
  if (!nudge) return null
  const colors = {
    streak: { bg: "linear-gradient(135deg,#f97316,#ea580c)", border: "#f97316" },
    level:  { bg: "linear-gradient(135deg,#7C3AED,#9D174D)", border: "#7C3AED" },
    kat:    { bg: "linear-gradient(135deg,#10B981,#059669)", border: "#10B981" },
  }
  const c = colors[nudge.typ] || colors.level
  return (
    <div className="nudge-banner" style={{ background: c.bg, borderColor: c.border }}>
      <span className="nudge-icon">{nudge.icon}</span>
      <p className="nudge-text">{nudge.text}</p>
      <button className="nudge-close" onClick={onDismiss}>×</button>
    </div>
  )
}

function XpToast({ amount, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [])
  return <div className="xp-toast">+{amount} XP</div>
}

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => !!localStorage.getItem("onboardingComplete"))
  const [welcomeScreenSeen, setWelcomeScreenSeen]   = useState(() => !!localStorage.getItem("welcomeScreenSeen"))
  const [onboardingDate]                             = useState(() => localStorage.getItem("onboardingDate") || getHeute())
  const [userName, setUserName]                       = useState(() => localStorage.getItem("userName") || "")
  const [userZiel, setUserZiel]                       = useState(() => localStorage.getItem("userZiel") || "")
  const [userAlter, setUserAlter]                     = useState(() => localStorage.getItem("userAlter") || "")
  const [userLebenssituation, setUserLebenssituation] = useState(() => localStorage.getItem("userLebenssituation") || "")
  const [userFinanzsituation, setUserFinanzsituation] = useState(() => localStorage.getItem("userFinanzsituation") || "")
  const [userWissenslevel, setUserWissenslevel]       = useState(() => Number(localStorage.getItem("userWissenslevel")) || 0)
  const [xp, setXp]         = useState(() => Number(localStorage.getItem("xp")) || 0)
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 0)
  const [letzterTag, setLetzterTag]   = useState(() => localStorage.getItem("letzterTag") || "")
  const [aktiverTab, setAktiverTab]   = useState("home")
  const [aktiveHauptkategorie, setAktiveHauptkategorie] = useState(null)
  const [aktiveKategorie, setAktiveKategorie] = useState(null)
  const [aktiveLektion, setAktiveLektion]     = useState(null)
  const [abgeschlosseneLektionen, setAbgeschlosseneLektionen] = useState(() => JSON.parse(localStorage.getItem("abgeschlosseneLektionen") || "[]"))
  const [abgeschlosseneQuests, setAbgeschlosseneQuests]       = useState(() => JSON.parse(localStorage.getItem("abgeschlosseneQuests") || "{}"))
  const [levelUpInfo, setLevelUpInfo]   = useState(null)
  const [xpToast, setXpToast]           = useState(null)
  const [streakMsg, setStreakMsg]       = useState(null)
  const [streakShareModal, setStreakShareModal] = useState(null)
  const [dismissedNudges, setDismissedNudges]   = useState(() => JSON.parse(localStorage.getItem("dismissedNudges") || "{}"))
  const [zeigeRangliste, setZeigeRangliste]     = useState(false)
  const [streakMilestonesShown, setStreakMilestonesShown] = useState(() => JSON.parse(localStorage.getItem("streakMilestonesShown") || "{}"))
  // ── Gamification ──
  const [achievements, setAchievements]           = useState(() => JSON.parse(localStorage.getItem("achievements") || "{}"))
  const [xpTaeglich, setXpTaeglich]               = useState(() => JSON.parse(localStorage.getItem("xpTaeglich") || "{}"))
  const [streakFreezes, setStreakFreezes]          = useState(() => Number(localStorage.getItem("streakFreezes")) || 0)
  const [perfekteQuizze, setPerfekteQuizze]       = useState(() => Number(localStorage.getItem("perfekteQuizze")) || 0)
  const [rechnerOeffnungen, setRechnerOeffnungen] = useState(() => Number(localStorage.getItem("rechnerOeffnungen")) || 0)
  const [newsOeffnungen, setNewsOeffnungen]       = useState(() => Number(localStorage.getItem("newsOeffnungen")) || 0)
  const [pendingAchievement, setPendingAchievement] = useState(null)
  const [kategorienBonus, setKategorienBonus]     = useState(() => JSON.parse(localStorage.getItem("kategorienBonus") || "[]"))
  const [aktionsplaene, setAktionsplaene]         = useState(() => JSON.parse(localStorage.getItem("aktionsplaene") || "{}"))
  const [aktiversAktionsplanId, setAktiversAktionsplanId] = useState(null)
  const [zeigeEmailModal, setZeigeEmailModal]         = useState(false)
  const [zeigeFeedbackModal, setZeigeFeedbackModal]   = useState(false)
  const [assistentContextFrage, setAssistentContextFrage] = useState(null)
  const [challengesClaimed, setChallengesClaimed]     = useState(() => JSON.parse(localStorage.getItem("challengesClaimed") || "{}"))
  const [perfektQuizzeGesamt, setPerfektQuizzeGesamt] = useState(() => Number(localStorage.getItem("perfektQuizzeGesamt") || 0))

  useEffect(() => {
    const heute = getHeute()
    const gestern = new Date(Date.now() - 86400000).toISOString().split("T")[0]
    if (letzterTag && letzterTag !== heute && letzterTag !== gestern) {
      const diffTage = Math.floor((Date.now() - new Date(letzterTag).getTime()) / 86400000)
      if (diffTage >= 3) freischaltenAchievement("comeback_kid")
      if (streak > 0) {
        setStreakMsg(`Dein ${streak}-Tage Streak ist abgelaufen. Fang heute neu an! 🔥`)
      }
      setStreak(0)
      localStorage.setItem("streak", 0)
    } else if (letzterTag === gestern) {
      if (streak > 0) {
        setStreakMsg(`Dein ${streak}-Tage Streak wartet auf dich! Leg heute los. 🔥`)
      }
    }
    if (!achievements["erster_tag"]) freischaltenAchievement("erster_tag")
  }, [])

  useEffect(() => {
    if (!window.visualViewport) return
    const handleResize = () => {
      if (window.visualViewport.height < window.innerHeight * 0.75) {
        document.body.classList.add("keyboard-open")
      } else {
        document.body.classList.remove("keyboard-open")
      }
    }
    window.visualViewport.addEventListener("resize", handleResize)
    return () => window.visualViewport.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (aktiveLektion) {
      document.title = `Lumio – ${aktiveLektion.titel}`
    } else if (aktiverTab === "profil") {
      document.title = "Lumio – Dein Profil"
    } else if (aktiverTab === "quest") {
      document.title = "Lumio – Daily Quest"
    } else if (aktiveHauptkategorie === "challenges") {
      document.title = "Lumio – Challenges"
    } else if (aktiveHauptkategorie === "rechner") {
      document.title = "Lumio – Rechner"
    } else if (aktiveHauptkategorie === "news") {
      document.title = "Lumio – News"
    } else {
      document.title = "Lumio – Dein Finanz-Coach"
    }
  }, [aktiverTab, aktiveLektion, aktiveHauptkategorie])

  function freischaltenAchievement(id) {
    setAchievements(prev => {
      if (prev[id]) return prev
      const def = ACHIEVEMENTS_DEF.find(a => a.id === id)
      if (!def) return prev
      const neu = { ...prev, [id]: getHeute() }
      localStorage.setItem("achievements", JSON.stringify(neu))
      setPendingAchievement(def)
      return neu
    })
  }

  function updateTagesXP(menge) {
    const heute = getHeute()
    setXpTaeglich(prev => {
      const neu = { ...prev, [heute]: (prev[heute] || 0) + menge }
      localStorage.setItem("xpTaeglich", JSON.stringify(neu))
      return neu
    })
  }

  function updateStreak() {
    const heute = getHeute()
    const gestern = new Date(Date.now() - 86400000).toISOString().split("T")[0]
    if (letzterTag === heute) return
    const neuerStreak = letzterTag === gestern ? streak + 1 : 1
    // Streak-Freeze vergeben: 1 pro 7-Tage-Meilenstein
    if (neuerStreak % 7 === 0) {
      setStreakFreezes(prev => {
        const n = prev + 1
        localStorage.setItem("streakFreezes", n)
        return n
      })
    }
    setStreak(neuerStreak)
    setLetzterTag(heute)
    localStorage.setItem("streak", neuerStreak)
    localStorage.setItem("letzterTag", heute)
    // Streak milestones: 7, 14, 30
    const milestones = [7, 14, 30]
    for (const m of milestones) {
      if (neuerStreak === m && !streakMilestonesShown[m]) {
        const neu = { ...streakMilestonesShown, [m]: true }
        setStreakMilestonesShown(neu)
        localStorage.setItem("streakMilestonesShown", JSON.stringify(neu))
        setStreakShareModal(neuerStreak)
        break
      }
    }
  }

  function addXP(menge) {
    if (menge <= 0) return
    updateTagesXP(menge)
    setXpToast({ amount: menge, key: Date.now() })
    playSound("xp")
    setXp(prev => {
      const altesLevel = berechneLevel(prev)
      const neueXP     = prev + menge
      const neuesLevel = berechneLevel(neueXP)
      localStorage.setItem("xp", neueXP)
      if (neuesLevel > altesLevel) { setLevelUpInfo({ newLevel: neuesLevel, oldLevel: altesLevel }); playSound("levelup") }
      return neueXP
    })
  }

  function lektionAbschliessen(verdientXP, perfekt = true) {
    const heute = getHeute()
    const stunde = new Date().getHours()
    let bonusXP = 0
    let neueAbgeschlossen = abgeschlosseneLektionen

    if (!abgeschlosseneLektionen.includes(aktiveLektion.id)) {
      neueAbgeschlossen = [...abgeschlosseneLektionen, aktiveLektion.id]
      setAbgeschlosseneLektionen(neueAbgeschlossen)
      localStorage.setItem("abgeschlosseneLektionen", JSON.stringify(neueAbgeschlossen))

      challengeTracking("lektion")
      const katId = aktiveKategorie?.id
      if (katId) challengeTracking("kat", katId)

      // Streak-Bonus
      if (verdientXP > 0) {
        if (streak >= 7)      bonusXP += 10
        else if (streak >= 3) bonusXP += 5
      }

      // Erste Lektion in dieser Kategorie
      if (katId && !kategorienBonus.includes(`first_${katId}`)) {
        const istErsteInKat = !abgeschlosseneLektionen.some(lid => (lernpfad[katId] || []).find(l => l.id === lid))
        if (istErsteInKat) {
          bonusXP += 25
          const neueBonus = [...kategorienBonus, `first_${katId}`]
          setKategorienBonus(neueBonus)
          localStorage.setItem("kategorienBonus", JSON.stringify(neueBonus))
        }
      }

      // Kategorie komplett
      if (katId && !kategorienBonus.includes(`complete_${katId}`)) {
        const alleIds = (lernpfad[katId] || []).map(l => l.id)
        const alleGeschafft = alleIds.every(id => neueAbgeschlossen.includes(id))
        if (alleGeschafft) {
          bonusXP += 100
          const neueBonus = [...kategorienBonus, `complete_${katId}`]
          setKategorienBonus(neueBonus)
          localStorage.setItem("kategorienBonus", JSON.stringify(neueBonus))
        }
      }

      // Achievements
      if (stunde >= 22) freischaltenAchievement("nachteuler")
      if (stunde < 7)   freischaltenAchievement("fruehaufsteher")

      const lektioneHeute = neueAbgeschlossen.filter(id => {
        const t = JSON.parse(localStorage.getItem("lektionDaten") || "{}")
        return t[id] === heute
      }).length
      // Lektions-Zeitstempel tracken
      const lektionDaten = JSON.parse(localStorage.getItem("lektionDaten") || "{}")
      lektionDaten[aktiveLektion.id] = heute
      localStorage.setItem("lektionDaten", JSON.stringify(lektionDaten))

      const lektioneHeuteFinal = Object.values(lektionDaten).filter(d => d === heute).length
      if (lektioneHeuteFinal >= 3) freischaltenAchievement("schnellstarter")
      if (lektioneHeuteFinal >= 5) freischaltenAchievement("wissens_marathon")

      // Erste Lektion: E-Mail Modal einmalig zeigen
      if (neueAbgeschlossen.length === 1 && !localStorage.getItem("emailModalShown")) {
        localStorage.setItem("emailModalShown", "true")
        setZeigeEmailModal(true)
      }

      // Feedback Modal nach jeder 5. Lektion
      const lastFeedbackAt = Number(localStorage.getItem("lastFeedbackAt") || 0)
      if (neueAbgeschlossen.length % 5 === 0 && neueAbgeschlossen.length > lastFeedbackAt) {
        localStorage.setItem("lastFeedbackAt", neueAbgeschlossen.length)
        setZeigeFeedbackModal(true)
      }
    }

    // Perfektionist: 10 in Folge
    if (perfekt) {
      const newPQ = perfekteQuizze + 1
      setPerfekteQuizze(newPQ)
      localStorage.setItem("perfekteQuizze", newPQ)
      if (newPQ >= 10) freischaltenAchievement("perfektionist")
      challengeTracking("perfekt")
    } else {
      setPerfekteQuizze(0)
      localStorage.setItem("perfekteQuizze", 0)
    }

    if (verdientXP > 0) updateStreak()
    addXP(verdientXP + bonusXP)

    // Aktionsplan-Trigger prüfen
    const triggerId = AKTIONSPLAN_TRIGGER[aktiveLektion.id]
    if (triggerId) {
      const bisheriger = JSON.parse(localStorage.getItem("aktionsplaene") || "{}")
      if (!bisheriger[triggerId]) {
        const neuAktionsplaene = {
          ...bisheriger,
          [triggerId]: { gesehen: true, schritte: Array(AKTIONSPLAN_DATEN[triggerId].schritte.length).fill(false), bonusVergeben: false }
        }
        localStorage.setItem("aktionsplaene", JSON.stringify(neuAktionsplaene))
        setAktionsplaene(neuAktionsplaene)
        setAktiveLektion(null)
        setAktiversAktionsplanId(triggerId)
        return
      }
    }

    setAktiveLektion(null)
  }

  function questAbschliessen(questId, verdientXP) {
    const heute = getHeute()
    const neue = { ...abgeschlosseneQuests, [heute]: questId }
    setAbgeschlosseneQuests(neue)
    localStorage.setItem("abgeschlosseneQuests", JSON.stringify(neue))
    updateStreak()
    // Streak-Bonus auf Quest
    let bonus = 0
    if (streak >= 7)      bonus = 10
    else if (streak >= 3) bonus = 5
    addXP(verdientXP + bonus)
  }

  function rechnerOeffnen() {
    const n = rechnerOeffnungen + 1
    setRechnerOeffnungen(n)
    localStorage.setItem("rechnerOeffnungen", n)
    if (n >= 10) freischaltenAchievement("zahlen_nerd")
    challengeTracking("rechner")
  }

  function newsOeffnen() {
    const n = newsOeffnungen + 1
    setNewsOeffnungen(n)
    localStorage.setItem("newsOeffnungen", n)
    if (n >= 7) freischaltenAchievement("news_junkie")
    challengeTracking("news")
  }

  function challengeTracking(typ, katId = null) {
    const weekKey  = getWeekKey()
    const monthKey = getMonthKey()

    const wKey = `weeklyStats_${weekKey}`
    const ws   = JSON.parse(localStorage.getItem(wKey) || '{"lektionen":0,"perfekt":0,"rechner":0,"news":0}')
    if (typ === "lektion") ws.lektionen = (ws.lektionen || 0) + 1
    if (typ === "perfekt") ws.perfekt   = (ws.perfekt   || 0) + 1
    if (typ === "rechner") ws.rechner   = (ws.rechner   || 0) + 1
    if (typ === "news")    ws.news      = (ws.news      || 0) + 1
    localStorage.setItem(wKey, JSON.stringify(ws))

    const mKey = `monthlyStats_${monthKey}`
    const ms   = JSON.parse(localStorage.getItem(mKey) || '{"lektionen":0,"kategorienSet":[]}')
    if (typ === "lektion") ms.lektionen = (ms.lektionen || 0) + 1
    if (typ === "kat" && katId && !(ms.kategorienSet || []).includes(katId)) {
      ms.kategorienSet = [...(ms.kategorienSet || []), katId]
    }
    localStorage.setItem(mKey, JSON.stringify(ms))

    if (typ === "perfekt") {
      const n = Number(localStorage.getItem("perfektQuizzeGesamt") || 0) + 1
      localStorage.setItem("perfektQuizzeGesamt", n)
      setPerfektQuizzeGesamt(n)
    }
  }

  function challengeEinloesen(claimKey, xpBetrag) {
    setChallengesClaimed(prev => {
      if (prev[claimKey]) return prev
      const neu = { ...prev, [claimKey]: true }
      localStorage.setItem("challengesClaimed", JSON.stringify(neu))
      addXP(xpBetrag)
      return neu
    })
  }

  function streakFreeze() {
    if (streakFreezes <= 0) return
    const n = streakFreezes - 1
    setStreakFreezes(n)
    localStorage.setItem("streakFreezes", n)
    // Streak auf aktuellen Tag setzen (verhindert Reset)
    const heute = getHeute()
    setLetzterTag(heute)
    localStorage.setItem("letzterTag", heute)
  }

  function resetNav() {
    setAktiveHauptkategorie(null)
    setAktiveKategorie(null)
    setAktiveLektion(null)
    setAktiversAktionsplanId(null)
    setZeigeRangliste(false)
  }

  function aktionsplanSchrittToggle(planId, idx) {
    setAktionsplaene(prev => {
      const planState = prev[planId] || { gesehen: true, schritte: Array(AKTIONSPLAN_DATEN[planId].schritte.length).fill(false), bonusVergeben: false }
      const neueSchritte = [...(planState.schritte || [])]
      neueSchritte[idx] = !neueSchritte[idx]
      const updated = { ...prev, [planId]: { ...planState, schritte: neueSchritte } }
      localStorage.setItem("aktionsplaene", JSON.stringify(updated))
      return updated
    })
  }

  function aktionsplanBonusXP(bonusXP, planId) {
    setAktionsplaene(prev => {
      if (prev[planId]?.bonusVergeben) return prev
      const updated = { ...prev, [planId]: { ...prev[planId], bonusVergeben: true } }
      localStorage.setItem("aktionsplaene", JSON.stringify(updated))
      addXP(bonusXP)
      return updated
    })
  }

  function aktionsplanOeffnen(planId) {
    setAktiversAktionsplanId(planId)
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
    if (!localStorage.getItem("onboardingDate")) {
      localStorage.setItem("onboardingDate", getHeute())
    }
    setOnboardingComplete(true)
    freischaltenAchievement("erster_tag")
  }

  if (!onboardingComplete) {
    return (
      <div className="app">
        <OnboardingFlow onComplete={onboardingAbschliessen} />
      </div>
    )
  }

  if (!welcomeScreenSeen) {
    return (
      <div className="app">
        <WelcomeScreen
          userFinanzsituation={userFinanzsituation}
          userZiel={userZiel}
          userName={userName}
          onDone={() => setWelcomeScreenSeen(true)}
        />
      </div>
    )
  }

  // Compute active nudge (only one at a time)
  const heute = getHeute()
  const hatAktivitaetHeute = letzterTag === heute
  const gestern2 = new Date(Date.now() - 86400000).toISOString().split("T")[0]
  const lvlInfo = getLevelInfo(xp)
  let aktuellerNudge = null
  if (!aktuellerNudge && streak > 0 && !hatAktivitaetHeute && letzterTag === gestern2 && !dismissedNudges["streak_warn"]) {
    aktuellerNudge = { id: "streak_warn", typ: "streak", icon: "⚠️", text: `Dein ${streak}-Tage Streak ist in Gefahr! Mach heute noch eine Lektion.` }
  }
  if (!aktuellerNudge && lvlInfo.xpBenoetigt - lvlInfo.xpAktuell <= 30 && !dismissedNudges["level_nudge_" + lvlInfo.level]) {
    aktuellerNudge = { id: "level_nudge_" + lvlInfo.level, typ: "level", icon: "⚡", text: `Noch ${lvlInfo.xpBenoetigt - lvlInfo.xpAktuell} XP bis Level ${lvlInfo.level + 1}! Eine Lektion reicht.` }
  }
  if (!aktuellerNudge) {
    for (const kat of kategorien) {
      const ls = lernpfad[kat.id] || []
      if (ls.length === 0) continue
      const abg = ls.filter(l => abgeschlosseneLektionen.includes(l.id)).length
      const pctKat = abg / ls.length
      const nudgeId = "kat_nudge_" + kat.id
      if (pctKat >= 0.8 && pctKat < 1 && !dismissedNudges[nudgeId]) {
        const verbleibend = ls.length - abg
        aktuellerNudge = { id: nudgeId, typ: "kat", icon: "📈", text: `Du bist fast durch ${kat.name}! Noch ${verbleibend} Lektion${verbleibend > 1 ? "en" : ""}.` }
        break
      }
    }
  }

  function dismissNudge(id) {
    const neu = { ...dismissedNudges, [id]: true }
    setDismissedNudges(neu)
    localStorage.setItem("dismissedNudges", JSON.stringify(neu))
  }

  return (
    <div className="app">
      <div className="content">
        {aktiverTab === "home" && streakMsg && (
          <div className="streak-msg-banner" onClick={() => setStreakMsg(null)}>
            <span>{streakMsg}</span>
            <span style={{ opacity: 0.5, marginLeft: "auto" }}>×</span>
          </div>
        )}
        {aktiverTab === "home" && aktiversAktionsplanId && (
          <AktionsplanScreen
            planId={aktiversAktionsplanId}
            aktionsplaene={aktionsplaene}
            onSchrittToggle={aktionsplanSchrittToggle}
            onBonusXP={aktionsplanBonusXP}
            onUeberspringen={() => setAktiversAktionsplanId(null)}
          />
        )}
        {aktiverTab === "home" && !aktiversAktionsplanId && !aktiveHauptkategorie && !aktiveLektion && (
          <Startscreen
            xp={xp} streak={streak}
            onHauptkategorieClick={(id) => setAktiveHauptkategorie(id)}
            userName={userName}
            abgeschlosseneQuests={abgeschlosseneQuests}
            xpTaeglich={xpTaeglich}
            abgeschlosseneLektionen={abgeschlosseneLektionen}
            userWissenslevel={userWissenslevel}
            userZiel={userZiel}
            userFinanzsituation={userFinanzsituation}
            onboardingDate={onboardingDate}
            onLektionClick={(l, k) => { setAktiveKategorie(k); setAktiveLektion(l) }}
            userAktuelleSituation={JSON.parse(localStorage.getItem("userAktuelleSituation") || "[]")}
          />
        )}
        {aktiverTab === "home" && !aktiversAktionsplanId && aktiveHauptkategorie === "news" && (
          <NewsScreen
            onZurueck={() => setAktiveHauptkategorie(null)}
            onOeffnen={newsOeffnen}
            onLektionClick={(lektionId) => {
              const found = kategorien.flatMap(k => (lernpfad[k.id] || []).map(l => ({ lektion: l, kat: k }))).find(({ lektion: l }) => l.id === lektionId)
              if (found) { setAktiveHauptkategorie(null); setAktiveKategorie(found.kat); setAktiveLektion(found.lektion) }
            }}
          />
        )}
        {aktiverTab === "home" && !aktiversAktionsplanId && aktiveHauptkategorie === "rechner" && (
          <RechnerScreen onZurueck={() => setAktiveHauptkategorie(null)} userFinanzsituation={userFinanzsituation} onRechnerOeffnung={rechnerOeffnen} />
        )}
        {aktiverTab === "home" && !aktiversAktionsplanId && aktiveHauptkategorie === "challenges" && (
          <ChallengesScreen
            onZurueck={() => setAktiveHauptkategorie(null)}
            abgeschlosseneLektionen={abgeschlosseneLektionen}
            streak={streak}
            rechnerOeffnungen={rechnerOeffnungen}
            newsOeffnungen={newsOeffnungen}
            xpTaeglich={xpTaeglich}
            perfektQuizzeGesamt={perfektQuizzeGesamt}
            challengesClaimed={challengesClaimed}
            onChallengeEinloesen={challengeEinloesen}
            xp={xp}
          />
        )}
        {aktiverTab === "home" && !aktiversAktionsplanId && aktiveLektion && aktiveLektion.typ === "cards" && (
          <CardLektionScreen lektion={aktiveLektion} onZurueck={() => { setAktiveLektion(null) }} onAbgeschlossen={lektionAbschliessen} onAskAssistant={setAssistentContextFrage} />
        )}
        {aktiverTab === "home" && !aktiversAktionsplanId && aktiveLektion && aktiveLektion.typ !== "cards" && (
          <LektionScreen lektion={aktiveLektion} kategorie={aktiveKategorie} onZurueck={() => { setAktiveLektion(null) }} onAbgeschlossen={lektionAbschliessen} />
        )}
        {aktiverTab === "quest" && (
          <DailyQuestScreen abgeschlosseneQuests={abgeschlosseneQuests} onQuestAbgeschlossen={questAbschliessen} />
        )}
        {aktiverTab === "profil" && (
          <ProfilScreen xp={xp} streak={streak} abgeschlosseneLektionen={abgeschlosseneLektionen} userName={userName} userWissenslevel={userWissenslevel} achievements={achievements} xpTaeglich={xpTaeglich} streakFreezes={streakFreezes} onStreakFreeze={streakFreeze} aktionsplaene={aktionsplaene} onAktionsplanOeffnen={aktionsplanOeffnen} />
        )}
        {aktiverTab === "entdecken" && !zeigeRangliste && (
          <EntdeckenScreen
            userFinanzsituation={userFinanzsituation}
            onRechnerOeffnung={rechnerOeffnen}
            onNewsOeffnen={newsOeffnen}
            xp={xp}
            xpTaeglich={xpTaeglich}
            userName={userName}
            onRanglisteOeffnen={() => setZeigeRangliste(true)}
          />
        )}
        {aktiverTab === "entdecken" && zeigeRangliste && (
          <RanglisteScreen xp={xp} xpTaeglich={xpTaeglich} userName={userName} onZurueck={() => setZeigeRangliste(false)} />
        )}
      </div>
      {xpToast && <XpToast key={xpToast.key} amount={xpToast.amount} onDone={() => setXpToast(null)} />}
      {aktuellerNudge && aktiverTab === "home" && !aktiveLektion && !aktiversAktionsplanId && (
        <NudgeBanner nudge={aktuellerNudge} onDismiss={() => dismissNudge(aktuellerNudge.id)} />
      )}
      {streakShareModal && (
        <StreakShareModal streak={streakShareModal} onClose={() => setStreakShareModal(null)} />
      )}
      <LevelUpModal levelUpInfo={levelUpInfo} onClose={() => setLevelUpInfo(null)} />
      <AchievementModal achievement={pendingAchievement} onClose={() => setPendingAchievement(null)} />
      {zeigeEmailModal && <ErsteLeKtionEmailModal onClose={() => setZeigeEmailModal(false)} />}
      {zeigeFeedbackModal && <FeedbackModal onClose={() => setZeigeFeedbackModal(false)} />}
      {!aktiveLektion && (
        <FinanzAssistent
          abgeschlosseneLektionen={abgeschlosseneLektionen}
          level={berechneLevel(xp)}
          contextFrage={assistentContextFrage}
          onContextFrageUsed={() => setAssistentContextFrage(null)}
        />
      )}
      <nav className="bottom-nav">
        {[
          { id: "home",      label: "Home",      svg: <HomeIcon      size={22}/> },
          { id: "quest",     label: "Quest",     svg: <QuestIcon     size={22}/> },
          { id: "profil",    label: "Profil",    svg: <ProfilIcon    size={22}/> },
          { id: "entdecken", label: "Entdecken", svg: <RanglisteIcon size={22}/> },
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

function AppRoot() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}

export default AppRoot