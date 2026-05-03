import './AgentCard.css';

function formatNum(n) {
  if (n >= 1e6) return `$${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${n.toFixed(2)}`;
}

function AgentAvatar({ agent }) {
  return (
    <div className="agent-avatar" style={{
      background: `linear-gradient(135deg, ${agent.avatarGradient[0]}, ${agent.avatarGradient[1]})`,
    }}>
      <span className="agent-avatar__letter">{agent.avatar}</span>
      {agent.teeVerified && (
        <div className="agent-avatar__tee" title="Ritual TEE Verified">✓</div>
      )}
    </div>
  );
}

export default function AgentCard({ agent, view = 'grid', onOpenDetail }) {
  const handleClick = (e) => {
    if (e.target.closest('.btn') || e.target.closest('.social-icons') || e.target.closest('a')) return;
    onOpenDetail?.(agent.id);
  };

  const getExplorerLink = () => {
    const chain = agent.originalChain.toLowerCase();
    const addr  = agent.address;
    if (chain.includes('base')) return `https://basescan.org/token/${addr}`;
    if (chain.includes('solana')) return `https://solscan.io/token/${addr}`;
    return `https://explorer.ritualfoundation.org/address/${addr}`;
  };

  if (view === 'list') {
    return (
      <div className="agent-card-row" onClick={handleClick}>
        <div className="agent-card-row__left">
          <AgentAvatar agent={agent} />
          <div>
            <div className="agent-card-row__name">
              {agent.name}
              {agent.hot && <span className="badge badge-hot">🔥 Hot</span>}
              <span className={`badge chain-badge ${agent.originalChain.toLowerCase()}`}>{agent.originalChain}</span>
            </div>
            <div className="agent-card-row__ticker font-mono">${agent.ticker}</div>
          </div>
        </div>
        <div className="agent-card-row__price font-mono">${agent.price.toFixed(8)}</div>
        <div className={`agent-card-row__change font-mono ${agent.change24h >= 0 ? 'text-green' : 'text-red'}`}>
          {agent.change24h >= 0 ? '▲' : '▼'} {Math.abs(agent.change24h).toFixed(1)}%
        </div>
        <div className="agent-card-row__mcap font-mono hide-md">{formatNum(agent.marketCap)}</div>
        <div className="agent-card-row__vol  font-mono hide-md">{formatNum(agent.volume24h)}</div>
        <div className="agent-card-row__holders hide-xl">{agent.holders.toLocaleString()}</div>
        <div className="agent-card-row__actions">
          <button className="btn btn-primary btn-xs" onClick={() => onOpenDetail?.(agent.id)}>Buy</button>
          <a href={getExplorerLink()} target="_blank" rel="noreferrer" className="btn btn-ghost btn-xs">Explorer</a>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-card card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="agent-card__badges">
        {agent.hot && <span className="badge badge-hot">🔥 Hot</span>}
        <span className={`badge chain-badge ${agent.originalChain.toLowerCase()}`}>{agent.originalChain}</span>
        {agent.teeVerified && <span className="badge badge-tee">Ritual TEE</span>}
        <span className="agent-card__age">{agent.age}</span>
      </div>

      <div className="agent-card__header">
        <AgentAvatar agent={agent} />
        <div className="agent-card__info">
          <div className="agent-card__name font-head">
            {agent.name}
            {agent.verified && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="agent-card__check">
                <circle cx="7" cy="7" r="6" fill="var(--neon)" opacity="0.15"/>
                <path d="M4 7L6 9L10 5" stroke="var(--neon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div className="agent-card__ticker font-mono">${agent.ticker}</div>
        </div>
      </div>

      <p className="agent-card__desc">{agent.description}</p>

      <div className="agent-card__tags">
        {agent.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>

      <div className="agent-card__precompiles">
        <span className="agent-card__pre-label">Precompiles:</span>
        {agent.precompiles.map(p => <span key={p} className="agent-card__pre-badge font-mono">{p}</span>)}
      </div>

      <div className="agent-card__price-row">
        <div>
          <div className="agent-card__price-label">Price</div>
          <div className="agent-card__price font-mono">${agent.price.toFixed(8)}</div>
        </div>
        <div className={`agent-card__change ${agent.change24h >= 0 ? 'text-green' : 'text-red'}`}>
          <span className="agent-card__change-icon">{agent.change24h >= 0 ? '▲' : '▼'}</span>
          <span className="font-mono">{Math.abs(agent.change24h).toFixed(1)}%</span>
          <span className="agent-card__change-label">24h</span>
        </div>
      </div>

      <div className="agent-card__stats">
        <div className="agent-card__stat">
          <span className="agent-card__stat-label">Market Cap</span>
          <span className="agent-card__stat-val font-mono">{formatNum(agent.marketCap)}</span>
        </div>
        <div className="agent-card__stat">
          <span className="agent-card__stat-label">Volume 24h</span>
          <span className="agent-card__stat-val font-mono">{formatNum(agent.volume24h)}</span>
        </div>
        <div className="agent-card__stat">
          <span className="agent-card__stat-label">Holders</span>
          <span className="agent-card__stat-val font-mono">{agent.holders.toLocaleString()}</span>
        </div>
        <div className="agent-card__stat">
          <span className="agent-card__stat-label">Liquidity</span>
          <span className="agent-card__stat-val font-mono">{formatNum(agent.liquidity)}</span>
        </div>
      </div>

      <div className="agent-card__actions">
        <button className="btn btn-primary" style={{flex:1}} onClick={() => onOpenDetail?.(agent.id)}>Buy ${agent.ticker}</button>
        <button className="btn btn-ghost btn-sm" title="View chart" onClick={() => onOpenDetail?.(agent.id)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 10L4 6L7 8L10 3L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <a href={getExplorerLink()} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" title={`View on ${agent.originalChain} Explorer`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2H2V12H12V9M12 2H8M12 2L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
