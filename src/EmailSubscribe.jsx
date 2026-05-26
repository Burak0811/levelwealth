import { useState } from "react"

// TODO: Brevo API Key hier einfügen
const BREVO_API_KEY = "BREVO_API_KEY_HIER"

export default function EmailSubscribe({ compact = false, title, subtitle }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle | loading | success | error

  async function anmelden(e) {
    e.preventDefault()
    if (!email.includes("@") || !email.includes(".")) return
    setStatus("loading")
    try {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({ email, listIds: [1], updateEnabled: true }),
      })
      if (res.ok || res.status === 201 || res.status === 204) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className={`subscribe-box${compact ? " compact" : ""}`}>
        <p className="subscribe-success">✓ Du bist dabei! Schau in dein Postfach.</p>
      </div>
    )
  }

  return (
    <div className={`subscribe-box${compact ? " compact" : ""}`}>
      {title && <p className="subscribe-title">{title}</p>}
      {subtitle && <p className="subscribe-sub">{subtitle}</p>}
      <form className="subscribe-form" onSubmit={anmelden}>
        <input
          className="subscribe-input"
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className="subscribe-btn" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "…" : "Anmelden"}
        </button>
      </form>
      {status === "error" && <p className="subscribe-error">Fehler – bitte nochmal versuchen.</p>}
    </div>
  )
}
