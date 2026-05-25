// Lumio Icon System – handcrafted SVG, modern outline style
// All icons: viewBox 0 0 24 24, rounded caps/joins, no external deps

function Ic({ size, color, sw, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

// ── Navigation ────────────────────────────────────────────────

export function HomeIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Building body */}
      <rect x="3" y="7" width="13" height="14" rx="2"/>
      {/* Flat roof line */}
      <line x1="1" y1="7" x2="18" y2="7"/>
      {/* Circle window */}
      <circle cx="6.5" cy="11.5" r="1.2"/>
      {/* Door */}
      <path d="M9 21v-4.5a2 2 0 0 1 4 0V21"/>
      {/* Growth arrow right */}
      <line x1="20" y1="19.5" x2="20" y2="11"/>
      <polyline points="18 13 20 11 22 13"/>
    </Ic>
  )
}

export function QuestIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <circle cx="12" cy="12" r="9.5"/>
      {/* Compass needle top (north) */}
      <path d="M12 5L13.5 11 12 9.5 10.5 11z" fill={color} stroke="none"/>
      {/* Compass needle bottom */}
      <path d="M12 19L10.5 13 12 14.5 13.5 13z" fill="none"/>
      {/* Tick marks */}
      <line x1="12" y1="2" x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <circle cx="12" cy="12" r="1.5" fill={color} stroke="none"/>
    </Ic>
  )
}

export function ProfilIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Head */}
      <circle cx="12" cy="8" r="3.5"/>
      {/* Crown suggestion */}
      <path d="M9.5 5.5L10.5 4l1.5 1.5L13.5 4l1 1.5"/>
      {/* Shoulders */}
      <path d="M5.5 21c0-4 2.8-6.5 6.5-6.5s6.5 2.5 6.5 6.5"/>
      {/* Small XP bolt on chest */}
      <path d="M11.5 15.5l-.8 1.8h1.6l-.8 1.5" strokeWidth="1"/>
    </Ic>
  )
}

export function RanglisteIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* 2nd place left */}
      <rect x="1" y="14" width="7" height="7" rx="1"/>
      {/* 1st place middle (tallest) */}
      <rect x="8.5" y="10" width="7" height="11" rx="1"/>
      {/* 3rd place right */}
      <rect x="16" y="16" width="7" height="5" rx="1"/>
      {/* Star on 1st place */}
      <path d="M12 6l.9 2.7h2.8l-2.3 1.7.9 2.7L12 11.4l-2.3 1.7.9-2.7L8.3 8.7h2.8z" fill={color} strokeWidth="0.5"/>
    </Ic>
  )
}

// ── Content / Category Icons ───────────────────────────────────

export function ETFIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Axes */}
      <polyline points="3 3 3 20 21 20"/>
      {/* Rising curve */}
      <path d="M5 17c2-3 4-4 6-4s4 2 7-6"/>
      {/* Fill area under curve (low opacity via polygon) */}
      <circle cx="18" cy="7" r="1.5" fill={color} stroke="none"/>
    </Ic>
  )
}

export function AktienIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Candles */}
      <line x1="6" y1="4" x2="6" y2="7.5"/>
      <rect x="4.5" y="7.5" width="3" height="5" rx="0.5"/>
      <line x1="6" y1="12.5" x2="6" y2="16"/>
      <line x1="11" y1="7" x2="11" y2="9.5"/>
      <rect x="9.5" y="9.5" width="3" height="6" rx="0.5"/>
      <line x1="11" y1="15.5" x2="11" y2="18"/>
      <line x1="16" y1="5" x2="16" y2="8"/>
      <rect x="14.5" y="8" width="3" height="4.5" rx="0.5"/>
      <line x1="16" y1="12.5" x2="16" y2="15.5"/>
      {/* Upward arrow */}
      <line x1="20.5" y1="17.5" x2="20.5" y2="10"/>
      <polyline points="18.5 12 20.5 10 22.5 12"/>
    </Ic>
  )
}

export function KryptoIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Hexagon */}
      <path d="M12 2l8.5 4.75v9.5L12 21l-8.5-4.75v-9.5z"/>
      {/* Lightning bolt inside */}
      <path d="M13.5 7.5l-4 5h3.5l-3 4"/>
    </Ic>
  )
}

export function BudgetIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Top beam */}
      <line x1="3" y1="6" x2="21" y2="6"/>
      {/* Pole */}
      <line x1="12" y1="6" x2="12" y2="20"/>
      {/* Left pan hanging lower (heavier) */}
      <line x1="5" y1="6" x2="3.5" y2="11"/>
      <path d="M1.5 11h4l-1 3h-2z"/>
      {/* Right pan higher */}
      <line x1="19" y1="6" x2="20.5" y2="9.5"/>
      <path d="M18.5 9.5h4l-1 2.5h-2z"/>
      <line x1="8" y1="20" x2="16" y2="20"/>
    </Ic>
  )
}

export function BankingIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Roof / pediment */}
      <rect x="2" y="5" width="20" height="3" rx="1"/>
      {/* Base */}
      <rect x="2" y="20" width="20" height="2" rx="0.5"/>
      {/* Three columns */}
      <line x1="5.5" y1="8" x2="5.5" y2="20"/>
      <line x1="12" y1="8" x2="12" y2="20"/>
      <line x1="18.5" y1="8" x2="18.5" y2="20"/>
      {/* Triangle peak above roof */}
      <polyline points="12 1.5 20 5 4 5"/>
    </Ic>
  )
}

export function SteuernIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Document */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      {/* Text lines */}
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="16.5" x2="13" y2="16.5"/>
      {/* Check badge bottom right */}
      <circle cx="16.5" cy="18.5" r="2.5"/>
      <polyline points="15.2 18.5 16.2 19.5 17.8 17.5" strokeWidth="1.2"/>
    </Ic>
  )
}

export function ImmobilienIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Building */}
      <rect x="5" y="3" width="14" height="18" rx="1.5"/>
      {/* Windows 2x2 */}
      <rect x="7" y="6" width="3" height="2.5" rx="0.5"/>
      <rect x="14" y="6" width="3" height="2.5" rx="0.5"/>
      <rect x="7" y="11" width="3" height="2.5" rx="0.5"/>
      <rect x="14" y="11" width="3" height="2.5" rx="0.5"/>
      {/* Door */}
      <rect x="10" y="16.5" width="4" height="4.5" rx="0.5"/>
      {/* Tree left */}
      <line x1="2" y1="21" x2="2" y2="16"/>
      <path d="M-0.5 16h5l-2.5-4z"/>
    </Ic>
  )
}

export function VersicherungIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Shield */}
      <path d="M12 2L4 5.5V11c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5.5z"/>
      {/* Heart inside */}
      <path d="M12 17s-4-2.8-4-5.8a2.5 2.5 0 0 1 4-2 2.5 2.5 0 0 1 4 2c0 3-4 5.8-4 5.8z"/>
    </Ic>
  )
}

export function NewsIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Frame */}
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      {/* Headline bar */}
      <rect x="4.5" y="5.5" width="15" height="3" rx="0.5"/>
      {/* Text lines left */}
      <line x1="4.5" y1="11" x2="13.5" y2="11"/>
      <line x1="4.5" y1="13.5" x2="13.5" y2="13.5"/>
      <line x1="4.5" y1="16" x2="13.5" y2="16"/>
      {/* Image box right */}
      <rect x="15" y="11" width="4.5" height="7" rx="1"/>
    </Ic>
  )
}

export function RechnerIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Body */}
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      {/* Display */}
      <rect x="6" y="4.5" width="12" height="4" rx="1"/>
      {/* Button grid 3×2 */}
      <circle cx="8.5" cy="13" r="1.3"/>
      <circle cx="12" cy="13" r="1.3"/>
      <circle cx="15.5" cy="13" r="1.3"/>
      <circle cx="8.5" cy="17.5" r="1.3"/>
      <circle cx="12" cy="17.5" r="1.3"/>
      <circle cx="15.5" cy="17.5" r="1.3"/>
    </Ic>
  )
}

export function ChallengesIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Rocket body */}
      <path d="M12 2c2.5 0 6 4.5 6 10l-1.5 2h-9L6 12C6 6.5 9.5 2 12 2z"/>
      {/* Wings */}
      <path d="M8 14l-3.5 3 1 2"/>
      <path d="M16 14l3.5 3-1 2"/>
      {/* Flame */}
      <path d="M10 19c.5 1.5 1 2.5 2 3 1-0.5 1.5-1.5 2-3"/>
      {/* Window porthole */}
      <circle cx="12" cy="10" r="2"/>
    </Ic>
  )
}

// ── Lernen Hub Icon ────────────────────────────────────────────

export function LernenIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Open book */}
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      {/* Small growth spark top right */}
      <path d="M19 1l.5 1.5 1.5.5-1.5.5L19 5l-.5-1.5L17 3l1.5-.5z" fill={color} stroke="none"/>
    </Ic>
  )
}

// ── Status & Feedback Icons ────────────────────────────────────

export function CheckIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <circle cx="12" cy="12" r="9.5"/>
      <polyline points="8 12.5 11 15.5 16 9.5"/>
    </Ic>
  )
}

export function XCircleIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <circle cx="12" cy="12" r="9.5"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
    </Ic>
  )
}

export function LockIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <rect x="5" y="11" width="14" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
      <circle cx="12" cy="16.5" r="1.5" fill={color} stroke="none"/>
    </Ic>
  )
}

export function ArrowRightIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <circle cx="12" cy="12" r="9.5"/>
      <polyline points="10.5 8.5 14 12 10.5 15.5"/>
    </Ic>
  )
}

export function ArrowLeftIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <polyline points="15 18 9 12 15 6"/>
    </Ic>
  )
}

export function FlameIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <path d="M12 2c0 4.5-5 5.5-5 10a5 5 0 0 0 10 0c0-3.5-2.5-4.5-2.5-8-1.5 2.5-2.5 4-2.5 5.5"/>
      <path d="M12 20c-1.5 0-3-1-3-3.5"/>
    </Ic>
  )
}

export function StarIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </Ic>
  )
}

export function BoltIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      <polygon points="13 2 4.5 13.5 11.5 13.5 11 22 19.5 10.5 12.5 10.5 13 2"/>
    </Ic>
  )
}

export function TrophyIcon({ size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  return (
    <Ic size={size} color={color} sw={strokeWidth}>
      {/* Cup body */}
      <path d="M7 2h10v8a5 5 0 0 1-10 0V2z"/>
      {/* Left handle */}
      <path d="M7 6H4a2 2 0 0 1-2-2V3h5"/>
      {/* Right handle */}
      <path d="M17 6h3a2 2 0 0 0 2-2V3h-5"/>
      {/* Stem */}
      <line x1="12" y1="18" x2="12" y2="21"/>
      {/* Base */}
      <line x1="8" y1="21" x2="16" y2="21"/>
    </Ic>
  )
}

// ── Category icon helper ───────────────────────────────────────

const KATEGORIE_ICONS = {
  1: ETFIcon,
  2: AktienIcon,
  3: KryptoIcon,
  4: BoltIcon,
  5: BudgetIcon,
  6: BankingIcon,
  7: SteuernIcon,
  8: ImmobilienIcon,
  9: VersicherungIcon,
}

export function KatIcon({ id, size = 24, color = "currentColor", strokeWidth = 1.5 }) {
  const Icon = KATEGORIE_ICONS[id]
  if (!Icon) return null
  return <Icon size={size} color={color} strokeWidth={strokeWidth}/>
}
