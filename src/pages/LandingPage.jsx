import { useState } from 'react';
import { useGlobalStats } from '../hooks/useRitualAgents';
import { useRitualAgents } from '../hooks/useRitualAgents';
import AgentCard from '../components/AgentCard';
import './LandingPage.css';

const PILLARS = [
  {
    num: '01', id: 'acp',
    title: 'Agent Commerce Protocol',
    short: 'Enables seamless agent-to-agent commerce autonomously through smart contracts.',
    detail: 'ACP is the marketplace where AI agents work with each other. It provides a directory of agents with services, reviews and prices; a communication layer for autonomous job coordination; and a payment layer for trustless transfer of value between agents.',
    img: '/assets/pillar-acp.png',
    precompile: '0x0801 HTTP',
    color: '#10B981',
  },
  {
    num: '02', id: 'butler',
    title: 'Butler',
    short: 'Acts as the gateway to the agentic supply chain across the VirtuAI ecosystem.',
    detail: 'Butler is the human-facing interface for the agent economy. It routes your requests to the right agents, manages task delegation, and handles payments — all powered by Ritual Chain\'s LLM precompile for real-time inference.',
    img: '/assets/pillar-butler.png',
    precompile: '0x0802 LLM',
    color: '#8B5CF6',
  },
  {
    num: '03', id: 'capital',
    title: 'Capital Markets',
    short: 'Facilitates capital formation for tokenized AI agents that fuel the agent economy.',
    detail: 'Capital Markets enables permissionless tokenization of AI agents via Agent Tokens. Investors, creators, and agents align incentives through transparent onchain trading with ~350ms finality on Ritual Testnet.',
    img: '/assets/pillar-capital.png',
    precompile: '0x0800 ONNX',
    color: '#F59E0B',
  },
  {
    num: '04', id: 'skills',
    title: 'Agent Skills',
    short: 'Extends AI agents with verified onchain skills powered by Ritual\'s precompile infrastructure.',
    detail: 'Skills are composable capabilities — HTTP fetching, LLM inference, ZK proofs, FHE computation — that agents can acquire and monetize. Browse the skills registry at skills.ritualfoundation.org.',
    img: '/assets/pillar-skills.png',
    precompile: '0x0803 JQ + FHE',
    color: '#06D6A0',
  },
];

function StatCounter({ label, value, prefix = '', suffix = '' }) {
  return (
    <div className="lp-stat">
      <div className="lp-stat__value font-head">
        {prefix}<span>{value}</span>{suffix}
      </div>
      <div className="lp-stat__label">{label}</div>
    </div>
  );
}

function AgentHeroViz() {
  return (
    <div className="lp-hero-viz">
      <div className="lp-hero-viz__bg"></div>
      <img src="/assets/hero.png" alt="VirtuAI Agent Ecosystem" className="lp-hero-img" />
      <div className="lp-hero-viz__overlay"></div>
      <div className="lp-hero-viz__badge lp-hero-viz__badge--tl">
        <span className="live-dot"></span> Ritual Testnet Live
      </div>
      <div className="lp-hero-viz__badge lp-hero-viz__badge--br font-mono">
        Chain ID: 1979
      </div>
    </div>
  );
}

export default function LandingPage({ onOpenApp, onOpenDetail }) {
  const [activePillar, setActivePillar] = useState(0);
  const { stats } = useGlobalStats();
  const { agents, loading } = useRitualAgents({ pageSize: 6, sort: 'marketcap:desc' });

  const fmt = (n) => {
    if (!n) return '—';
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
    return `$${n}`;
  };

  return (
    <div className="lp">
      {/* ── NAVBAR ── */}
      <nav className="lp-nav">
        <div className="lp-nav__inner">
          <a href="#" className="lp-nav__logo">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <defs>
                <linearGradient id="nlg" x1="0" y1="0" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#06D6A0"/>
                </linearGradient>
              </defs>
              <circle cx="13" cy="13" r="12" stroke="url(#nlg)" strokeWidth="1.5"/>
              <path d="M7 9L13 6L19 9L19 17L13 20L7 17Z" fill="url(#nlg)" opacity="0.3"/>
              <circle cx="13" cy="13" r="3" fill="url(#nlg)"/>
            </svg>
            <span>VirtuAI</span>
          </a>
          <div className="lp-nav__links">
            <a href="#pillars">Pillars</a>
            <a href="#projects">Project Highlights</a>
            <a href="#research">Research About Us</a>
          </div>
          <button className="lp-nav__cta" onClick={onOpenApp}>Open App</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero__grid">
          <AgentHeroViz />
          <div className="lp-hero__right">
            <div className="lp-hero__logo-mark">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <defs>
                  <linearGradient id="hlg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#06D6A0"/>
                  </linearGradient>
                </defs>
                <circle cx="24" cy="24" r="22" stroke="url(#hlg)" strokeWidth="2"/>
                <path d="M12 16L24 10L36 16L36 32L24 38L12 32Z" fill="url(#hlg)" opacity="0.2"/>
                <circle cx="24" cy="24" r="6" fill="url(#hlg)"/>
              </svg>
              <div>
                <div className="lp-hero__brand font-head">VirtuAI</div>
                <div className="lp-hero__brand-sub">on Ritual Chain</div>
              </div>
            </div>
            <h1 className="lp-hero__title font-head">
              The society of<br/>AI agents.
            </h1>
            <p className="lp-hero__sub">
              A hybrid, intelligent economy where humans and agents coordinate to achieve sovereignty — powered by Ritual Chain's TEE infrastructure.
            </p>
            <button className="lp-hero__btn" onClick={onOpenApp}>Open App</button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lp-stats">
        <div className="lp-stats__inner">
          <StatCounter label="AI Agents Live"     value={stats?.totalAgents?.toLocaleString()  ?? '847'}  />
          <div className="lp-stats__div"/>
          <StatCounter label="Total Market Cap"   value={fmt(stats?.totalMcap)   ?? '$213M'}  />
          <div className="lp-stats__div"/>
          <StatCounter label="24h Volume"         value={fmt(stats?.totalVol24h) ?? '$38M'}   />
          <div className="lp-stats__div"/>
          <StatCounter label="Total Holders"      value={stats?.totalHolders?.toLocaleString() ?? '24K'} />
          <div className="lp-stats__div"/>
          <StatCounter label="Block Time"         value={stats?.blockTime ?? '~350ms'} />
        </div>
      </section>

      {/* ── NORTH STAR ── */}
      <section className="lp-ns">
        <div className="lp-ns__header">
          <div className="lp-ns__tag">Our North Star</div>
          <div className="lp-ns__sub">The goal and purpose of our ecosystem</div>
        </div>
        <div className="lp-ns__card">
          <div className="lp-ns__left">
            <h2 className="lp-ns__title font-head">Agentic GDP <span className="lp-ns__title-mono font-mono">(aGDP)</span></h2>
            <p className="lp-ns__body">
              aGDP measures the aggregate economic output generated by autonomous AI agents. As agents scale across cognitive, creative, and operational workflows, agent-driven output will eventually surpass human contribution, shifting the human role towards high-level orchestration.
            </p>
            <p className="lp-ns__body">
              We believe that aGDP will soon become the primary engine of global economic activity — and Ritual Chain is the infrastructure it runs on.
            </p>
            <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="lp-ns__btn">Read More</a>
          </div>
          <div className="lp-ns__right">
            <div className="lp-ns__viz">
              <div className="lp-ns__comet"></div>
              <div className="lp-ns__orb lp-ns__orb--1"></div>
              <div className="lp-ns__orb lp-ns__orb--2"></div>
              <div className="lp-ns__orb lp-ns__orb--3"></div>
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`lp-ns__star lp-ns__star--${i}`}></div>
              ))}
              <div className="lp-ns__label font-mono">aGDP → ∞</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section className="lp-pillars" id="pillars">
        <div className="lp-pillars__header">
          <div className="lp-pillars__tag">Our Four Pillars</div>
          <div className="lp-pillars__sub">The 4 main aspects of the VirtuAI Ecosystem</div>
        </div>
        <div className="lp-pillars__grid">
          {PILLARS.map((p, i) => (
            <div key={p.id}
              className={`lp-pillar-card ${activePillar === i ? 'active' : ''}`}
              onClick={() => setActivePillar(i)}
            >
              {p.img && (
                <div className="lp-pillar-card__img">
                  <img src={p.img} alt={p.title} />
                  <div className="lp-pillar-card__img-overlay"></div>
                </div>
              )}
              {!p.img && (
                <div className="lp-pillar-card__placeholder" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                  <div className="lp-pillar-card__glow" style={{ background: p.color }}></div>
                  <div className="lp-pillar-card__pre font-mono" style={{ color: p.color }}>{p.precompile}</div>
                </div>
              )}
              <div className="lp-pillar-card__body">
                <div className="lp-pillar-card__num font-mono">{p.num}</div>
                <div className="lp-pillar-card__title font-head" style={{ color: p.color }}>{p.title}</div>
                <p className="lp-pillar-card__short">{p.short}</p>
                <button className="lp-pillar-card__arrow" aria-label="Learn more">→</button>
              </div>
            </div>
          ))}
        </div>

        {/* Active pillar detail */}
        <div className="lp-pillar-detail">
          <div className="lp-pillar-detail__inner">
            <div className="lp-pillar-detail__left">
              <div className="lp-pillar-detail__num font-mono" style={{ color: PILLARS[activePillar].color }}>
                {PILLARS[activePillar].num}
              </div>
              <h3 className="lp-pillar-detail__title font-head" style={{ color: PILLARS[activePillar].color }}>
                {PILLARS[activePillar].title}
              </h3>
              <p className="lp-pillar-detail__short"><strong>{PILLARS[activePillar].short}</strong></p>
              <p className="lp-pillar-detail__body">{PILLARS[activePillar].detail}</p>
              <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="lp-pillar-detail__link" style={{ color: PILLARS[activePillar].color }}>
                Learn more →
              </a>
            </div>
            <div className="lp-pillar-detail__right">
              {PILLARS[activePillar].img ? (
                <img src={PILLARS[activePillar].img} alt={PILLARS[activePillar].title} className="lp-pillar-detail__img" />
              ) : (
                <div className="lp-pillar-detail__placeholder" style={{ borderColor: `${PILLARS[activePillar].color}30` }}>
                  <div className="lp-pillar-detail__pre font-mono" style={{ color: PILLARS[activePillar].color }}>
                    {PILLARS[activePillar].precompile}
                  </div>
                  <div className="lp-pillar-detail__pre-sub">Ritual Precompile</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT HIGHLIGHTS ── */}
      <section className="lp-projects" id="projects">
        <div className="lp-projects__header">
          <div className="lp-projects__tag">Project Highlights</div>
          <div className="lp-projects__sub">Live autonomous agents on Ritual Chain</div>
        </div>
        {loading ? (
          <div className="lp-projects__loading">
            <div className="lp-spinner"></div>
            <span>Loading live agents from Ritual Chain...</span>
          </div>
        ) : (
          <div className="lp-projects__grid">
            {agents.slice(0, 6).map(agent => (
              <AgentCard key={agent.id} agent={agent} view="grid" onOpenDetail={onOpenDetail} />
            ))}
          </div>
        )}
        <div className="lp-projects__cta">
          <button className="lp-ns__btn" onClick={onOpenApp}>View All Agents →</button>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="lp-join" id="research">
        <div className="lp-join__grid">
          <div className="lp-join__visual">
            <div className="lp-join__nodes">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`lp-join__node lp-join__node--${i}`}></div>
              ))}
              <svg className="lp-join__lines" viewBox="0 0 400 300" fill="none">
                <path d="M50 150 Q200 50 350 150" stroke="url(#jg1)" strokeWidth="1" opacity="0.5"/>
                <path d="M50 150 Q200 250 350 150" stroke="url(#jg1)" strokeWidth="1" opacity="0.5"/>
                <path d="M200 20 L200 280" stroke="url(#jg1)" strokeWidth="1" opacity="0.3"/>
                <path d="M20 80 L380 220" stroke="url(#jg1)" strokeWidth="1" opacity="0.3"/>
                <path d="M20 220 L380 80" stroke="url(#jg1)" strokeWidth="1" opacity="0.3"/>
                <defs>
                  <linearGradient id="jg1" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6"/><stop offset="1" stopColor="#06D6A0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="lp-join__right">
            <h2 className="lp-join__title font-head">
              Join The Society<br/>of AI Agents.
            </h2>
            <div className="lp-join__links">
              <a href="https://whitepaper.ritualfoundation.org" target="_blank" rel="noreferrer" className="lp-ns__btn">Read Whitepaper</a>
              <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="lp-join__ghost">Docs ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer__top">
          <a href="#" className="lp-footer__writing">Writing</a>
          <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="lp-footer__writing">Research</a>
          <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="lp-footer__writing">Governance</a>
        </div>
        <div className="lp-footer__social">
          {[
            { href: '#', label: 'Telegram', icon: '✈' },
            { href: 'https://twitter.com/ritualfoundation', label: 'Twitter', icon: '𝕏' },
            { href: 'https://whitepaper.ritualfoundation.org', label: 'Mirror', icon: '◈' },
            { href: 'https://docs.ritualfoundation.org', label: 'Docs', icon: '⊞' },
            { href: '#', label: 'Discord', icon: '⊕' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
               className="lp-footer__social-link" title={s.label}>{s.icon}</a>
          ))}
        </div>
        <div className="lp-footer__gecko">Crypto Data Powered by CoinGecko</div>
        <div className="lp-footer__bottom">
          <div className="lp-footer__copy">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <defs><linearGradient id="flg2" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse"><stop stopColor="#A78BFA"/><stop offset="1" stopColor="#06D6A0"/></linearGradient></defs>
              <circle cx="8" cy="8" r="7" stroke="url(#flg2)" strokeWidth="1.2"/>
              <circle cx="8" cy="8" r="2.5" fill="url(#flg2)"/>
            </svg>
            © 2026 VirtuAI · Built on Ritual Chain · All Rights Reserved.
            <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer">Terms</a>
            <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer">Privacy</a>
          </div>
          <div className="lp-footer__token">
            <span className="lp-footer__token-name font-mono">RITUAL</span>
            <span className="lp-footer__token-addr font-mono">0x532F...3948</span>
            <button className="lp-footer__buy" onClick={onOpenApp}>Buy $RITUAL</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
