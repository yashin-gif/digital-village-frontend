export default function VillageIllustration() {
  return (
    <svg
      viewBox="0 0 600 520"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfeaff" />
          <stop offset="1" stopColor="#f3fbf6" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="600" height="520" fill="url(#vv-sky)" />

      {/* sun */}
      <circle cx="470" cy="120" r="72" fill="#fff3b0" opacity="0.6" />
      <circle cx="470" cy="120" r="44" fill="#ffd43b" />

      {/* cloud */}
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="130" cy="110" rx="52" ry="16" />
        <ellipse cx="165" cy="98" rx="34" ry="18" />
        <ellipse cx="100" cy="100" rx="28" ry="14" />
        <ellipse cx="320" cy="70" rx="42" ry="12" />
        <ellipse cx="345" cy="60" rx="26" ry="13" />
      </g>

      {/* bird */}
      <g fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round">
        <path d="M250 150 q8 -8 16 0 q8 -8 16 0" />
        <path d="M300 175 q6 -6 12 0 q6 -6 12 0" />
      </g>

      {/* mountains */}
      <path
        d="M0 330 Q120 250 250 310 T500 300 T600 320 V520 H0 Z"
        fill="#bde8cc"
      />
      <path d="M0 400 Q150 330 300 385 T600 360 V520 H0 Z" fill="#8fd6ab" />

      {/* mosque */}
      <rect x="380" y="323" width="120" height="85" fill="#ffffff" />
      <path d="M395 323 A45 45 0 0 1 485 323 Z" fill="#2a9d62" />
      <line x1="440" y1="278" x2="440" y2="262" stroke="#d4a017" strokeWidth="3" />
      <circle cx="440" cy="258" r="5" fill="#d4a017" />
      <rect x="505" y="273" width="16" height="135" fill="#f1f5f9" />
      <rect x="500" y="298" width="26" height="6" fill="#cbd5e1" />
      <path d="M503 273 L513 251 L523 273 Z" fill="#2a9d62" />
      <path d="M428 408 V376 a12 12 0 0 1 24 0 V408 Z" fill="#166941" />
      <rect x="397" y="360" width="16" height="26" rx="8" fill="#b3e5c8" />
      <rect x="467" y="360" width="16" height="26" rx="8" fill="#b3e5c8" />

      {/* house 1 */}
      <rect x="90" y="360" width="80" height="60" fill="#fff7e6" />
      <polygon points="80,360 130,318 180,360" fill="#c8344d" />
      <rect x="120" y="382" width="20" height="38" fill="#92400e" />
      <rect x="98" y="372" width="16" height="16" fill="#bae6fd" />
      <rect x="146" y="372" width="16" height="16" fill="#bae6fd" />

      {/* house 2 */}
      <rect x="205" y="372" width="62" height="50" fill="#fff1f2" />
      <polygon points="197,372 236,340 275,372" fill="#b45309" />
      <rect x="229" y="392" width="14" height="30" fill="#78350f" />

      {/* tree */}
      <rect x="36" y="380" width="8" height="40" fill="#92400e" />
      <circle cx="40" cy="358" r="30" fill="#166941" />
      <circle cx="58" cy="368" r="22" fill="#1b8350" />

      <rect x="316" y="395" width="8" height="44" fill="#92400e" />
      <circle cx="320" cy="372" r="26" fill="#1b8350" />

      <rect x="556" y="380" width="8" height="42" fill="#92400e" />
      <circle cx="560" cy="358" r="28" fill="#166941" />
      <circle cx="545" cy="368" r="18" fill="#2a9d62" />

      {/* front field, pathway */}
      <path d="M0 430 Q150 395 300 435 T600 415 V520 H0 Z" fill="#4fb87f" />
      <path d="M260 520 Q310 470 385 425 L425 425 Q360 475 345 520 Z" fill="#ead9b0" />
      <path d="M0 480 Q150 455 300 490 T600 472 V520 H0 Z" fill="#2a9d62" />
    </svg>
  )
}