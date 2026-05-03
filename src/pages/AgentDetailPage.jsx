import { useState, useEffect, useRef } from 'react';
import { useRitualAgent } from '../hooks/useRitualAgents';
import { useRitual } from '../hooks/useRitual';
import './AgentDetailPage.css';

export default function AgentDetailPage({ agentId, onBack, account, balance, onConnect }) {
  const { agent, loading, error } = useRitualAgent(agentId);
  const { buyAgent, sellAgent, loading: isProcessing } = useRitual();
  const [activeTab, setActiveTab] = useState('updates');
  const [tradeMode, setTradeMode] = useState('buy');
  const [amount, setAmount] = useState('');
  const terminalRef = useRef(null);

  const handleTrade = async () => {
    if (!amount || !account) {
      if (!account) onConnect();
      return;
    }
    
    try {
      let receipt;
      if (tradeMode === 'buy') {
        receipt = await buyAgent(agentId, amount);
      } else {
        receipt = await sellAgent(agentId, amount);
      }

      console.log('Trade Successful:', receipt.hash);
      alert(`Trade Successful on Ritual Chain! TX: ${receipt.hash}`);
      setAmount('');
    } catch (err) {
      console.error('Trade failed', err);
      alert('Transaction Error: ' + (err.reason || err.message || 'User rejected or network error'));
    }
  };

  const [logs, setLogs] = useState([
    { type: 'info', text: 'Initializing Ritual TEE session...' },
    { type: 'success', text: 'TEE Verified: Enclave 0x7a...f2 active' },
    { type: 'info', text: 'Loading LLM Precompile (0x0802)...' },
  ]);

  useEffect(() => {
    if (!agent) return;
    const interval = setInterval(() => {
      const categoryLogs = {
        'DeFi': [
          `Scanning Ritual ACP for yield opportunities...`,
          `Calculating slippage for $${agent.ticker}/RITUAL swap...`,
          `Verified TEE Proof: Enclave state consistent`,
          `Calling HTTP Precompile (0x0801) for oracle feed...`,
        ],
        'Gaming': [
          `Updating NPC state on Ritual Chain...`,
          `Generating autonomous dialogue via LLM Precompile (0x0802)...`,
          `Syncing player inventory at block 1979...`,
          `Verifying move legality via ONNX (0x0800)...`,
        ],
        'Social': [
          `Analyzing social sentiment for $${agent.ticker}...`,
          `Posting autonomous update to decentralized social graph...`,
          `Running LLM inference for content moderation...`,
          `Querying Ritual Testnet for community status...`,
        ]
      };
      
      const pool = categoryLogs[agent.category] || [
        `Analyzing market sentiment for $${agent.ticker}...`,
        `Calling HTTP precompile (0x0801) for social data...`,
        `LLM Inference: Confidence score 0.92`,
        `Syncing state with Ritual Chain (block 1979283)...`,
      ];

      const randomText = pool[Math.floor(Math.random() * pool.length)];
      setLogs(prev => [...prev.slice(-15), { type: 'info', text: randomText }]);
    }, 5000);
    return () => clearInterval(interval);
  }, [agent]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  if (loading) return (
    <div className="agent-detail-loading container">
      <div className="skeleton" style={{ height: 400, width: '100%', borderRadius: 'var(--radius-xl)' }}></div>
    </div>
  );

  if (error || !agent) return (
    <div className="agent-detail-error container">
      <div className="card glass-bright" style={{ padding: '40px', textAlign: 'center' }}>
        <h2 className="font-head">Agent Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '16px 0' }}>{error || "We couldn't find the agent you're looking for."}</p>
        <button className="btn btn-primary" onClick={onBack}>Back to Marketplace</button>
      </div>
    </div>
  );

  return (
    <div className="agent-detail">
      <div className="container">
        {/* Header */}
        <header className="agent-detail__header">
          <button className="back-btn" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <div className="agent-info-main">
            <div className="agent-avatar-wrap">
               {agent.imageUrl ? (
                 <img src={agent.imageUrl} alt={agent.name} className="agent-detail-avatar" />
               ) : (
                 <div className="agent-detail-avatar-placeholder" style={{ background: `linear-gradient(135deg, ${agent.avatarGradient[0]}, ${agent.avatarGradient[1]})` }}>
                   {agent.avatar}
                 </div>
               )}
               {agent.teeVerified && (
                 <div className="tee-badge-floating" title="Ritual TEE Verified">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 18c-3.75-1.01-6.5-4.9-6.5-9.1V8.53l6.5-3.61 6.5 3.61V10.9c0 4.2-2.75 8.09-6.5 9.1z"/><path d="M11 14h2v2h-2zm0-7h2v5h-2z"/></svg>
                 </div>
               )}
            </div>
            <div className="agent-name-meta">
              <div className="agent-name-row">
                <h1 className="font-head">{agent.name}</h1>
                <span className="ticker-badge font-mono">${agent.ticker}</span>
                <span className="badge badge-ritual">Ritual Chain</span>
              </div>
              <div className="agent-addr-row">
                <span className="font-mono text-dim">{agent.address.slice(0, 6)}...{agent.address.slice(-4)}</span>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(agent.address)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                </button>
                <div className="social-icons">
                   <a href="#"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                   <a href="#"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20z"/><path d="M2 12h20"/></svg></a>
                </div>
              </div>
            </div>
          </div>
          <div className="header-stats">
            <div className="h-stat">
              <span className="h-stat-label">APY</span>
              <span className="h-stat-value text-green">12.4%</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-label">TVL</span>
              <span className="h-stat-value">$142.5K</span>
            </div>
            <div className="h-stat">
              <span className="h-stat-label">Util.</span>
              <span className="h-stat-value">64%</span>
            </div>
          </div>
        </header>

        <div className="agent-detail__grid">
          {/* LEFT COLUMN */}
          <div className="agent-detail__left">
            {/* Chart Area */}
            <div className="detail-card chart-container glass">
               <div className="chart-header">
                 <div className="chart-title font-mono">{agent.ticker} / USD</div>
                 <div className="chart-controls">
                   {['1M', '5M', '15M', '1H', '4H', '1D'].map(p => (
                     <button key={p} className={p === '1H' ? 'active' : ''}>{p}</button>
                   ))}
                 </div>
               </div>
               <div className="chart-mock">
                  <div className="chart-viz">
                    <div className="chart-header-overlay">
                      <span className="chart-pair font-mono">{agent.ticker} / RITUAL</span>
                      <span className="chart-price-live font-mono">${agent.price.toFixed(4)}</span>
                    </div>
                    <svg viewBox="0 0 800 320" className="chart-svg">
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary-light)" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0 280 Q 50 260, 100 240 T 200 180 T 300 200 T 400 140 T 500 100 T 600 120 T 700 60 T 800 40" 
                        fill="none" 
                        stroke="var(--primary-light)" 
                        strokeWidth="3" 
                        className="chart-path-anim"
                      />
                      <path 
                        d="M0 280 Q 50 260, 100 240 T 200 180 T 300 200 T 400 140 T 500 100 T 600 120 T 700 60 T 800 40 L 800 320 L 0 320 Z" 
                        fill="url(#chartFill)" 
                      />
                    </svg>
                    <div className="chart-grid-lines">
                      {[...Array(6)].map((_, i) => <div key={i} className="grid-line" style={{top: `${i * 20}%`}}></div>)}
                    </div>
                    <div className="chart-tooltip-sim">
                      <div className="dot pulse"></div>
                      <span className="font-mono">Live Finality</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="detail-stats-bar glass">
               <div className="ds-item">
                 <span className="ds-label">Market Cap</span>
                 <span className="ds-value">${(agent.marketCap / 1e6).toFixed(2)}M</span>
               </div>
               <div className="ds-item">
                 <span className="ds-label">Liquidity</span>
                 <span className="ds-value">${(agent.liquidity / 1e3).toFixed(1)}K</span>
               </div>
               <div className="ds-item">
                 <span className="ds-label">Holders</span>
                 <span className="ds-value">{agent.holders.toLocaleString()}</span>
               </div>
               <div className="ds-item">
                 <span className="ds-label">24h Vol</span>
                 <span className="ds-value">${(agent.volume24h / 1e3).toFixed(1)}K</span>
               </div>
            </div>

            {/* Content Tabs */}
            <div className="detail-content-tabs">
               <div className="tabs-nav">
                 <button className={activeTab === 'updates' ? 'active' : ''} onClick={() => setActiveTab('updates')}>Verified Thoughts</button>
                 <button className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}>Project Details</button>
                 <button className={activeTab === 'holders' ? 'active' : ''} onClick={() => setActiveTab('holders')}>Holders</button>
               </div>
               <div className="tabs-content glass">
                 {activeTab === 'updates' && (
                   <div className="terminal-wrap">
                      <div className="terminal-header font-mono">
                        <span>ritual_agent_logs --follow</span>
                        <div className="terminal-dots"><span></span><span></span><span></span></div>
                      </div>
                      <div className="terminal-body font-mono" ref={terminalRef}>
                        {logs.map((log, i) => (
                          <div key={i} className={`terminal-line ${log.type}`}>
                            <span className="line-prefix">[{new Date().toLocaleTimeString()}]</span> {log.text}
                          </div>
                        ))}
                        <div className="terminal-cursor">_</div>
                      </div>
                   </div>
                 )}
                 {activeTab === 'details' && (
                   <div className="project-details">
                      <p className="detail-desc">{agent.description || "This agent is autonomously managed on the Ritual Chain, utilizing secure enclaves and AI precompiles to execute logic without human intervention."}</p>
                      <div className="precompile-details">
                        <h4 className="font-head">Active Ritual Precompiles</h4>
                        <div className="pre-grid">
                          {agent.precompiles.map(p => (
                            <div key={p} className="pre-item card">
                              <span className="pre-icon">⚡</span>
                              <div>
                                <div className="pre-name font-head">{p}</div>
                                <div className="pre-status">Operational</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                   </div>
                 )}
                 {activeTab === 'holders' && (
                   <div className="holders-list">
                      <div className="holders-header font-mono">
                        <span>Rank</span><span>Address</span><span>Quantity</span><span>%</span>
                      </div>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="holder-row font-mono">
                          <span>#{i+1}</span>
                          <span className="text-dim">0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}</span>
                          <span>{(1000000 / (i+1)).toLocaleString()}</span>
                          <span className="text-green">{(10 / (i+1)).toFixed(2)}%</span>
                        </div>
                      ))}
                   </div>
                 )}
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN - TRADE */}
          <div className="agent-detail__right">
            <div className="trade-card glass-bright">
               <div className="trade-tabs">
                 <button className={tradeMode === 'buy' ? 'active' : ''} onClick={() => setTradeMode('buy')}>Buy</button>
                 <button className={tradeMode === 'sell' ? 'active' : ''} onClick={() => setTradeMode('sell')}>Sell</button>
               </div>
               <div className="trade-body">
                 <div className="trade-input-group">
                   <div className="input-label">
                     <span>{tradeMode === 'buy' ? 'Pay' : 'Sell'}</span>
                     <span className="balance">Balance: {account ? balance : '0.00'}</span>
                   </div>
                   <div className="input-wrap">
                     <input type="number" placeholder="0.0" value={amount} onChange={e => setAmount(e.target.value)} />
                     <span className="token-ticker font-mono">{tradeMode === 'buy' ? 'RITUAL' : agent.ticker}</span>
                   </div>
                 </div>
                 <div className="trade-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                 </div>
                 <div className="trade-input-group">
                   <div className="input-label">
                     <span>Receive</span>
                   </div>
                   <div className="input-wrap">
                     <input type="number" placeholder="0.0" readOnly value={amount ? (amount * 1250).toFixed(2) : ''} />
                     <span className="token-ticker font-mono">{tradeMode === 'buy' ? agent.ticker : 'RITUAL'}</span>
                   </div>
                 </div>
                 
                 <div className="trade-info font-mono">
                   <div className="ti-row"><span>Slippage</span><span>0.5%</span></div>
                   <div className="ti-row"><span>Price Impact</span><span className="text-green">&lt; 0.01%</span></div>
                 </div>

                 <button 
                   className={`trade-submit-btn ${tradeMode} ${isProcessing ? 'loading' : ''}`} 
                   disabled={!amount || isProcessing || (account && parseFloat(balance) <= 0)}
                   onClick={handleTrade}
                 >
                    {isProcessing ? 'Processing...' : (!account ? 'Connect Wallet' : (parseFloat(balance) <= 0 ? 'Insufficient Funds' : (tradeMode === 'buy' ? `Buy ${agent.ticker}` : `Sell ${agent.ticker}`)))}
                 </button>
               </div>
            </div>

            <div className="ritual-integrity-card glass">
               <div className="ri-icon">🛡️</div>
               <div className="ri-content">
                 <h4 className="font-head">Ritual Integrity</h4>
                 <p>This agent's weights and execution are cryptographically verified via <strong>Ritual Testnet</strong>. Any manipulation of its logic would invalidate the TEE proof.</p>
                 <a href="http://explorer.ritualfoundation.org" target="_blank" rel="noreferrer" className="ri-link">View Proof Onchain ↗</a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
