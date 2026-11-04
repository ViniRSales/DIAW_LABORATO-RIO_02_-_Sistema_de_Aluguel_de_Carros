// Ilustracao SVG de automovel, com variacao de silhueta por categoria.
// Mantem a paleta azul do sistema. Sem dependencias externas.
export default function CarIcon({ categoria = '', size = 72 }) {
  const cat = categoria.toLowerCase()

  // SUV / utilitario tem teto mais alto; seda e mais alongado; economico mais compacto.
  const isSuv = cat.includes('suv') || cat.includes('utilit')
  const isSeda = cat.includes('sedã') || cat.includes('seda')

  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Ilustração de automóvel ${categoria}`}
    >
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbeafe" />
          <stop offset="1" stopColor="#93c5fd" />
        </linearGradient>
      </defs>

      {/* Sombra */}
      <ellipse cx="60" cy="64" rx="48" ry="5" fill="#1e3a8a" opacity="0.12" />

      {/* Corpo */}
      <path
        d={
          isSuv
            ? 'M12 46 L16 30 Q18 22 28 22 L84 22 Q96 22 102 32 L108 44 Q110 46 108 50 L14 50 Q10 50 12 46 Z'
            : isSeda
            ? 'M8 48 L14 36 Q16 30 26 30 L50 30 L62 20 Q66 18 74 20 L92 32 Q104 34 108 44 L110 48 Q112 50 108 52 L12 52 Q6 52 8 48 Z'
            : 'M12 48 L18 34 Q20 28 30 28 L52 28 L60 22 Q64 20 72 22 L88 32 Q98 34 104 44 L106 48 Q108 50 104 52 L14 52 Q8 52 12 48 Z'
        }
        fill="url(#carBody)"
      />

      {/* Vidros */}
      <path
        d={
          isSuv
            ? 'M30 26 L50 26 L50 38 L26 38 Z M54 26 L80 26 Q88 26 92 34 L92 38 L54 38 Z'
            : 'M32 31 L50 31 L50 40 L28 40 Z M54 31 L70 25 Q74 24 78 26 L88 34 L88 40 L54 40 Z'
        }
        fill="url(#carGlass)"
      />

      {/* Rodas */}
      <circle cx="34" cy="54" r="10" fill="#1e293b" />
      <circle cx="34" cy="54" r="4.5" fill="#cbd5e1" />
      <circle cx="90" cy="54" r="10" fill="#1e293b" />
      <circle cx="90" cy="54" r="4.5" fill="#cbd5e1" />

      {/* Farol */}
      <rect x="103" y="42" width="6" height="4" rx="2" fill="#fef08a" />
    </svg>
  )
}
