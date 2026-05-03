import { useState, useEffect } from 'react';
import './Hero.css';

const HERO_STATS = [
  { label: 'Total Market Cap', value: '$213M', suffix: '' },
  { label: 'AI Agents Live', value: '847', suffix: '+' },
  { label: '24h Volume', value: '$38.4M', suffix: '' },
  { label: 'Block Time', value: '~350ms', suffix: '' },
];

export default function Hero({ onExplore }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % 3), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      {/* Orbs */}
      <div className="orb orb-purple hero__orb hero__orb--1"></div>
      <div className="orb orb-green  hero__orb hero__orb--2"></div>
      <div className="orb orb-cyan   hero__orb hero__orb--3"></div>

      {/* Grid overlay */}
      <div className="hero__grid-bg" aria-hidden="true"></div>

      <div className="hero__content container">
        <div className="hero__text">
          {/* Top badge */}
          <div className="hero__badge-row">
            <span className="badge badge-ritual">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 2.5V5.5L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Ritual Chain · Testnet Live
            </span>
            <span className="badge badge-tee">TEE-Verified Execution</span>
          </div>

          {/* Headline */}
          <h1 className="hero__title font-head">
            The Autonomous<br/>
            <span className="gradient-text">AI Agent</span> Marketplace
          </h1>

          <p className="hero__subtitle">
            Deploy, tokenize, and trade sovereign AI agents on <strong>Ritual Chain</strong>.
            Powered by TEE inference, ~350ms finality, and onchain LLM execution.
          </p>

          {/* CTA */}
          <div className="hero__cta">
            <button id="explore-agents-btn" className="btn btn-primary btn-lg" onClick={onExplore}>
              Explore Agents
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#create" className="btn btn-outline btn-lg">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Deploy Agent
            </a>
            <a href="https://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg">
              Docs ↗
            </a>
          </div>

          {/* Network links */}
          <div className="hero__links">
            {[
              { label: 'Docs', href: 'http://docs.ritualfoundation.org' },
              { label: 'Faucet', href: 'http://faucet.ritualfoundation.org' },
              { label: 'Explorer', href: 'http://explorer.ritualfoundation.org' },
              { label: 'RPC', href: 'http://rpc.ritualfoundation.org' },
              { label: 'Skills', href: 'http://skills.ritualfoundation.org' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hero__link">
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="hero__visual">
          <div className="hero__terminal">
            <div className="hero__terminal-header">
              <div className="hero__terminal-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="hero__terminal-title font-mono">ritual_agent.sol</span>
            </div>
            <div className="hero__terminal-body">
              <pre className="hero__code font-mono">{`// Ritual Chain Agent — Chain ID 1979
contract MyAgent is PrecompileConsumer {
  uint256 public chainId = <span class="c-green">1979</span>;
  
  function think(
    bytes calldata prompt
  ) external {
    // GLM-4.7-FP8 inference via TEE
    bytes memory result = 
      _executePrecompile(
        LLM_PRECOMPILE, // 0x0802
        prompt
      );
    emit AgentThought(result);
  }
  
  function fetch(string calldata url) 
    external 
  {
    // HTTP call from Solidity
    _executePrecompile(
      HTTP_PRECOMPILE, // 0x0801
      abi.encode(url)
    );
  }
}`}</pre>
              <div className="hero__terminal-footer">
                <span className="live-dot"></span>
                <span className="font-mono" style={{fontSize:'11px', color:'var(--text-muted)'}}>
                  Block #1,247,891 · ~350ms
                </span>
              </div>
            </div>
          </div>

          {/* Floating stats cards */}
          <div className="hero__float-card hero__float-card--1">
            <div className="hero__float-label">New Agent</div>
            <div className="hero__float-value gradient-text font-head">QuantumYield</div>
            <div className="hero__float-sub text-green font-mono">+88.2% ▲</div>
          </div>
          <div className="hero__float-card hero__float-card--2">
            <div className="hero__float-label">TEE Status</div>
            <div className="hero__float-value font-mono" style={{color:'var(--neon)', fontSize:'13px'}}>VERIFIED ✓</div>
            <div className="hero__float-sub" style={{color:'var(--text-muted)'}}>128 executors</div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="hero__stats container">
        {HERO_STATS.map((stat, i) => (
          <div key={i} className="hero__stat">
            <div className="hero__stat-value font-head">
              {stat.value}<span style={{color:'var(--primary-light)'}}>{stat.suffix}</span>
            </div>
            <div className="hero__stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
