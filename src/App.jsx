import { useState, useEffect } from "react"
import "./App.css"

const fragen = [
  {
    text: "Was ist ein ETF?",
    antworten: [
      "Ein Sparkonto mit Zinsen",
      "Ein Fonds der einen Index abbildet",
      "Eine Kryptowährung",
      "Ein staatlicher Rentenfonds"
    ],
    richtig: 1
  },
  {
    text: "Was bedeutet Diversifikation?",
    antworten: [
      "Alles in eine Aktie investieren",
      "Geld auf viele verschiedene Anlagen verteilen",
      "Nur in Gold investieren",
      "Sein Geld auf dem Konto lassen"
    ],
    richtig: 1
  },
  {
    text: "Was ist der MSCI World?",
    antworten: [
      "Eine Kryptobörse",
      "Ein deutsches Unternehmen",
      "Ein Index der ~1500 Unternehmen weltweit abbildet",
      "Ein Tagesgeldkonto"
    ],
    richtig: 2
  }
]

function getHeute() {
  return new Date().toISOString().split("T")[0]
}

function App() {
  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0)
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 0)
  const [letzterTag, setLetzterTag] = useState(() => localStorage.getItem("letzterTag") || "")
  const [aktuelle, setAktuelle] = useState(0)
  const [gewaehlt, setGewaehlt] = useState(null)
  const [fertig, setFertig] = useState(false)
  const [heuteGemacht, setHeuteGemacht] = useState(() => localStorage.getItem("letzterTag") === getHeute())

  useEffect(() => {
    const heute = getHeute()
    const gestern = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    if (letzterTag === "") return
    if (letzterTag !== heute && letzterTag !== gestern) {
      setStreak(0)
      localStorage.setItem("streak", 0)
    }
  }, [])

  function antworten(index) {
    if (gewaehlt !== null) return
    setGewaehlt(index)
    if (index === fragen[aktuelle].richtig) {
      const neueXp = xp + 10
      setXp(neueXp)
      localStorage.setItem("xp", neueXp)
    }
  }

  function naechste() {
    if (aktuelle + 1 >= fragen.length) {
      const heute = getHeute()
      const neuerStreak = letzterTag === heute ? streak : streak + 1
      setStreak(neuerStreak)
      setLetzterTag(heute)
      setHeuteGemacht(true)
      localStorage.setItem("streak", neuerStreak)
      localStorage.setItem("letzterTag", heute)
      setFertig(true)
    } else {
      setAktuelle(aktuelle + 1)
      setGewaehlt(null)
    }
  }

  if (heuteGemacht && !fertig) {
    return (
      <div className="app fertig">
        <h1>✅ Heute erledigt</h1>
        <p>Streak: 🔥 {streak} Tage</p>
        <p>⚡ {xp} XP gesamt</p>
        <p style={{ marginTop: "1rem", color: "#888" }}>Komm morgen wieder für dein nächstes Quest.</p>
      </div>
    )
  }

  if (fertig) {
    return (
      <div className="app fertig">
        <h1>Quest abgeschlossen! 🎉</h1>
        <p>Streak: 🔥 {streak} Tage</p>
        <p>⚡ {xp} XP gesamt</p>
      </div>
    )
  }

  const frage = fragen[aktuelle]

  return (
    <div className="app">
      <div className="header">
        <h1>LevelWealth</h1>
        <p className="xp-bar">⚡ {xp} XP · 🔥 {streak} Tage Streak · Frage {aktuelle + 1} von {fragen.length}</p>
      </div>
      <p className="frage">{frage.text}</p>
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
          <p>{gewaehlt === frage.richtig ? "✅ Richtig! +10 XP" : "❌ Falsch!"}</p>
          <button className="weiter-btn" onClick={naechste}>Weiter →</button>
        </div>
      )}
    </div>
  )
}

export default App