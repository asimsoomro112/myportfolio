export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" /> {/* slate-900 */}
          <stop offset="100%" stopColor="#020617" /> {/* slate-950 */}
        </linearGradient>
        <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
          <stop offset="100%" stopColor="#10b981" /> {/* emerald-500 */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Background Squircle */}
      <rect width="120" height="120" rx="35" fill="url(#bg-grad)" />
      
      {/* Subtle inner border */}
      <rect x="2" y="2" width="116" height="116" rx="33" stroke="white" strokeOpacity="0.1" strokeWidth="2" />

      {/* Stylized 'M' */}
      <path 
        d="M 32 80 L 32 45 L 60 65 L 88 45 L 88 80" 
        stroke="white" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Accent Dot (Representing 'A' / Asim) */}
      <circle 
        cx="60" cy="85" r="8" 
        fill="url(#accent-grad)" 
        filter="url(#glow)"
      />
      
      {/* Top right decorative dot */}
      <circle 
        cx="88" cy="32" r="5" 
        fill="#22d3ee" 
      />
    </svg>
  );
}
