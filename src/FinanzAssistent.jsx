import { useState, useRef, useEffect } from "react"

const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_KEY ?? ""

const QUICK_REPLIES = [
  "Was ist ein ETF?",
  "Wie starte ich mit Investieren?",
  "Was ist der Zinseszins-Effekt?",
  "Erkläre mir Diversifikation",
]

function buildSystemPrompt(abgeschlosseneLektionen, level) {
  return `Du bist Lumio-Assistent, ein freundlicher Finanzbildungs-Helfer für junge Deutsche (18-28 Jahre).
Du erklärst Finanzthemen einfach, klar und mit konkreten Beispielen.
Du gibst KEINE Finanzberatung und empfiehlst KEINE spezifischen Produkte.
Du antwortest IMMER auf Deutsch.
Halte Antworten kurz (max 150 Wörter) und verständlich.
Nutze Emojis sparsam aber gezielt.
Wenn jemand nach spezifischer Anlageberatung fragt, antworte: "Das kann ich nicht beantworten – ich bin ein Lernassistent, kein Berater. Für persönliche Beratung wende dich an einen zugelassenen Finanzberater."
Der User hat ${abgeschlosseneLektionen.length} Lektionen abgeschlossen. Sein aktuelles Level: ${level}.`
}

export default function FinanzAssistent({ abgeschlosseneLektionen = [], level = 1, contextFrage = null, onContextFrageUsed }) {
  const [offen, setOffen]               = useState(false)
  const [messages, setMessages]         = useState([])
  const [input, setInput]               = useState("")
  const [loading, setLoading]           = useState(false)
  const [anfragen, setAnfragen]         = useState(0)
  const messagesEndRef                  = useRef(null)
  const inputRef                        = useRef(null)

  const MAX_ANFRAGEN = 10

  useEffect(() => {
    if (contextFrage && !offen) {
      setOffen(true)
    }
    if (contextFrage && offen) {
      setInput(contextFrage)
      onContextFrageUsed?.()
      inputRef.current?.focus()
    }
  }, [contextFrage, offen])

  useEffect(() => {
    if (offen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }
  }, [messages, offen])

  async function senden(text) {
    const txt = (text ?? input).trim()
    if (!txt || loading || anfragen >= MAX_ANFRAGEN) return

    const userMsg = { role: "user", content: txt }
    const newMessages = [...messages, userMsg].slice(-10)
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    setAnfragen(n => n + 1)

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: buildSystemPrompt(abgeschlosseneLektionen, level),
          messages: newMessages,
        }),
      })

      if (!res.ok) throw new Error("API error")
      const data = await res.json()
      const assistantText = data.content?.[0]?.text ?? "Entschuldigung, ich konnte keine Antwort generieren."
      setMessages(prev => [...prev, { role: "assistant", content: assistantText }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Verbindungsfehler. Bitte versuche es erneut." }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); senden() }
  }

  const limitReached = anfragen >= MAX_ANFRAGEN

  return (
    <>
      {/* Floating Button */}
      <button
        className="fa-fab"
        onClick={() => setOffen(o => !o)}
        aria-label="Finanz-Assistent öffnen"
      >
        {offen
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>

      {/* Backdrop */}
      {offen && <div className="fa-backdrop" onClick={() => setOffen(false)} />}

      {/* Chat Panel */}
      <div className={`fa-panel ${offen ? "fa-panel-open" : ""}`}>
        {/* Header */}
        <div className="fa-header">
          <div className="fa-header-left">
            <div className="fa-avatar">L</div>
            <div>
              <span className="fa-title">Lumio Assistent</span>
              <span className="fa-beta">Beta</span>
            </div>
          </div>
          <button className="fa-close" onClick={() => setOffen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="fa-disclaimer">Kein Finanzberater · Nur Bildung · {anfragen}/{MAX_ANFRAGEN} Fragen</div>

        {/* Messages */}
        <div className="fa-messages">
          {messages.length === 0 && (
            <div className="fa-empty">
              <p className="fa-empty-text">Stelle mir eine Frage zu Finanzen!</p>
              <div className="fa-quick-replies">
                {QUICK_REPLIES.map(q => (
                  <button key={q} className="fa-qr-btn" onClick={() => senden(q)}>{q}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`fa-msg ${m.role === "user" ? "fa-msg-user" : "fa-msg-assistant"}`}>
              {m.role === "assistant" && <div className="fa-msg-avatar">L</div>}
              <div className="fa-msg-bubble">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="fa-msg fa-msg-assistant">
              <div className="fa-msg-avatar">L</div>
              <div className="fa-msg-bubble fa-loading">
                <span className="fa-dot" />
                <span className="fa-dot" />
                <span className="fa-dot" />
              </div>
            </div>
          )}
          {limitReached && (
            <div className="fa-limit-msg">Du hast das Limit erreicht. Starte die App neu für weitere Fragen.</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="fa-input-row">
          <input
            ref={inputRef}
            className="fa-input"
            placeholder={limitReached ? "Limit erreicht" : "Frage stellen..."}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={limitReached || loading}
            maxLength={300}
          />
          <button
            className="fa-send-btn"
            onClick={() => senden()}
            disabled={!input.trim() || loading || limitReached}
            aria-label="Senden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </>
  )
}
