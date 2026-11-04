// Logo do sistema: carro estilizado em traco, branco (para a navbar azul).
export default function Logo({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 11l1.5-4A2 2 0 0 1 8.4 5.7h7.2a2 2 0 0 1 1.9 1.3L19 11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 11h17a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 1-1 1h-1.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.2 17H3a1 1 0 0 1-1-1v-3.5A1.5 1.5 0 0 1 3.5 11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.5" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.3 17h5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
