import './Footer.css';

const LINKS = {
  Protocol: [
    { label: 'Marketplace',     href: '#marketplace' },
    { label: 'Trending Agents', href: '#trending' },
    { label: 'Create Agent',    href: '#create' },
    { label: 'How It Works',    href: '#network' },
  ],
  'Ritual Chain': [
    { label: 'Documentation',   href: 'http://docs.ritualfoundation.org',      ext: true },
    { label: 'Explorer',        href: 'http://explorer.ritualfoundation.org',   ext: true },
    { label: 'Faucet',          href: 'http://faucet.ritualfoundation.org',     ext: true },
    { label: 'RPC Endpoint',    href: 'http://rpc.ritualfoundation.org',        ext: true },
  ],
  Developers: [
    { label: 'Agent Skills',    href: 'http://skills.ritualfoundation.org',     ext: true },
    { label: 'Whitepaper',      href: 'https://whitepaper.ritualfoundation.org', ext: true },
    { label: 'Precompile Map',  href: 'http://docs.ritualfoundation.org',       ext: true },
    { label: 'System Contracts', href: 'http://docs.ritualfoundation.org',      ext: true },
  ],
  Community: [
    { label: 'Twitter / X',     href: 'https://twitter.com/ritualfoundation',   ext: true },
    { label: 'Discord',         href: '#',                                       ext: true },
    { label: 'GitHub',          href: 'https://github.com/ritual-net',          ext: true },
    { label: 'Blog',            href: '#',                                       ext: true },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <defs>
                  <linearGradient id="flg" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#06D6A0"/>
                  </linearGradient>
                </defs>
                <circle cx="14" cy="14" r="13" stroke="url(#flg)" strokeWidth="1.5"/>
                <path d="M8 10L14 7L20 10L20 18L14 21L8 18Z" fill="url(#flg)" opacity="0.25"/>
                <circle cx="14" cy="14" r="3.5" fill="url(#flg)"/>
              </svg>
              <span className="footer__logo-text font-head">VirtuAI</span>
            </div>
            <p className="footer__tagline">
              The autonomous AI agent marketplace on Ritual Chain — where sovereign intelligence is tokenized.
            </p>
            <div className="footer__network">
              <span className="live-dot"></span>
              <span>Ritual Testnet</span>
              <span className="font-mono" style={{color:'var(--text-dim)', fontSize:'11px'}}>Chain ID: 1979 · ~350ms</span>
            </div>
            <div className="footer__social">
              <a href="https://twitter.com/ritualfoundation" target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12.6 1H15L9.8 7.1L16 15H11.1L7.3 10.1L3 15H0.6L6.2 8.4L0 1H5.1L8.5 5.5L12.6 1ZM11.8 13.6H13.1L4.3 2.3H2.9L11.8 13.6Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://github.com/ritual-net" target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="http://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="Docs">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2H10L13 5V14H3V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M10 2V5H13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M5 8H11M5 11H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="footer__links">
            {Object.entries(LINKS).map(([section, items]) => (
              <div key={section} className="footer__col">
                <div className="footer__col-title">{section}</div>
                {items.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.ext ? '_blank' : undefined}
                    rel={link.ext ? 'noreferrer' : undefined}
                    className="footer__col-link"
                  >
                    {link.label}
                    {link.ext && <span style={{opacity:0.5}}>↗</span>}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="divider" style={{margin:'0'}}></div>

        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>© 2026 VirtuAI · Built on</span>
            <a href="https://ritualfoundation.org" target="_blank" rel="noreferrer" className="footer__ritual-link">
              Ritual Chain
            </a>
          </div>
          <div className="footer__bottom-right">
            <span className="footer__disclaimer">
              VirtuAI is a demo marketplace. All agents are testnet-only. Not financial advice.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
