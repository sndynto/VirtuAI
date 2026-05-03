import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ onBackToLanding, account, onConnect }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shortAddr = account ? `${account.slice(0,6)}...${account.slice(-4)}` : '';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <a href="#" className="navbar__logo" onClick={e => { e.preventDefault(); onBackToLanding?.(); }}>
            <div className="navbar__logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <defs>
                  <linearGradient id="lg1" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#06D6A0"/>
                  </linearGradient>
                  <linearGradient id="lg2" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" stopOpacity="0.4"/><stop offset="1" stopColor="#06D6A0" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
                <circle cx="14" cy="14" r="13" stroke="url(#lg1)" strokeWidth="1.5"/>
                <path d="M8 10 L14 7 L20 10 L20 18 L14 21 L8 18 Z" fill="url(#lg2)"/>
                <circle cx="14" cy="14" r="3.5" fill="url(#lg1)"/>
              </svg>
            </div>
            <span className="navbar__logo-text">VirtuAI<span className="navbar__logo-badge">on Ritual</span></span>
          </a>

          <div className="navbar__links hide-md">
            <a href="#marketplace" className="navbar__link">Marketplace</a>
            <a href="#trending" className="navbar__link">Trending</a>
            <a href="https://skills.ritualfoundation.org" target="_blank" rel="noreferrer" className="navbar__link">Skills</a>
            <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="navbar__link">Docs</a>
            <a href="#create" className="navbar__link navbar__link--create">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Create Agent
            </a>
          </div>

          <div className="navbar__actions">
            <div className="navbar__network hide-md">
              <span className="live-dot"></span>
              <span>Ritual Testnet</span>
              <span className="navbar__chain-id font-mono">1979</span>
            </div>
            <a href="https://faucet.ritualfoundation.org" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm hide-md">Faucet</a>
            <button id="wallet-connect-btn" onClick={onConnect} className={`btn ${account ? 'btn-outline' : 'btn-primary'} btn-sm`}>
              {account ? <><span className="live-dot" style={{background:'var(--accent)'}}></span>{account.slice(0,6)}...{account.slice(-4)}</> : <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="3" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 6H12" stroke="currentColor" strokeWidth="1.5"/><circle cx="9.5" cy="8.5" r="1" fill="currentColor"/></svg>
                Connect Wallet
              </>}
            </button>
            <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <span className={mobileOpen ? 'open' : ''}></span>
              <span className={mobileOpen ? 'open' : ''}></span>
              <span className={mobileOpen ? 'open' : ''}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__network"><span className="live-dot"></span><span>Ritual Testnet · Chain 1979</span></div>
        {['#marketplace|Marketplace','#trending|Trending','https://skills.ritualfoundation.org|Agent Skills ↗','https://docs.ritualfoundation.org|Docs ↗','https://faucet.ritualfoundation.org|Faucet ↗','https://explorer.ritualfoundation.org|Explorer ↗'].map(item => {
          const [href, label] = item.split('|');
          return <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" onClick={() => setMobileOpen(false)} className="mobile-menu__link">{label}</a>;
        })}
        <a href="#create" onClick={() => setMobileOpen(false)} className="mobile-menu__link mobile-menu__link--create">+ Create Agent</a>
      </div>
    </>
  );
}
