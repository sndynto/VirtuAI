import { useState } from 'react';
import './CreateAgentModal.css';
import { useRitual } from '../hooks/useRitual';

const PRECOMPILE_OPTIONS = ['HTTP', 'LLM Inference', 'ONNX', 'JQ Query', 'Ed25519', 'SECP256R1', 'FHE', 'DKMS', 'Scheduler'];
const CATEGORY_OPTIONS = ['DeFi', 'Trading', 'Research', 'Oracle', 'Lending', 'NFT', 'Analytics', 'Governance', 'Privacy', 'Infrastructure'];

export default function CreateAgentModal({ onClose, account, balance, onConnect }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', ticker: '', category: '', description: '',
    precompiles: [], initialBuy: '', website: '',
  });
  const [launched, setLaunched] = useState(false);
  const { launchAgent, loading: isProcessing } = useRitual();
  const [txHash, setTxHash] = useState('');

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const togglePre = (p) => update('precompiles', form.precompiles.includes(p)
    ? form.precompiles.filter(x => x !== p)
    : [...form.precompiles, p]
  );

  const hasBalance = account && parseFloat(balance) > 0;

  const handleLaunch = async () => {
    if (!account) return;
    
    try {
      const receipt = await launchAgent({
        name: form.name,
        ticker: form.ticker,
        description: form.description,
        precompiles: form.precompiles
      });

      setTxHash(receipt.hash);
      setLaunched(true);
    } catch (err) {
      console.error('Launch failed:', err);
      // alert handled by hook or custom logic
      alert('Transaction failed: ' + (err.reason || err.message || 'User rejected or network error'));
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box glass-bright">
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title font-head">
              {launched ? '🚀 Agent Launched!' : 'Create AI Agent'}
            </div>
            {!launched && (
              <div className="modal-steps">
                {[1,2,3].map(s => (
                  <div key={s} className={`modal-step ${step === s ? 'active' : step > s ? 'done' : ''}`}>
                    {step > s ? '✓' : s}
                  </div>
                ))}
                <div className="modal-step-labels">
                  <span>Identity</span><span>Config</span><span>Launch</span>
                </div>
              </div>
            )}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {isProcessing ? (
          <div className="modal-processing">
            <div className="modal-processing__spinner"></div>
            <h3 className="font-head">Processing on Ritual Chain...</h3>
            <p>Confirming your autonomous agent deployment on Ritual Testnet (1979).</p>
            <div className="processing-hash font-mono">Status: Awaiting Finality...</div>
          </div>
        ) : launched ? (
          <div className="modal-success">
            <div className="modal-success__orb"></div>
            <div className="modal-success__icon">🤖</div>
            <h3 className="font-head">Agent "{form.name || 'MyAgent'}" is Live!</h3>
            <p>Your autonomous agent has been deployed to Ritual Testnet (Chain ID: 1979)</p>
            <div className="modal-success__addr font-mono" title="Agent Contract Address">
              0x{Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}
            </div>
            <div className="modal-success__tx font-mono">
              TX: <a href={`https://explorer.ritualfoundation.org/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash.slice(0,14)}...{txHash.slice(-8)} ↗</a>
            </div>
            <div className="modal-success__links">
              <a href="https://explorer.ritualfoundation.org" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">View on Explorer ↗</a>
              <a href="https://faucet.ritualfoundation.org" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">Get RITUAL ↗</a>
            </div>
            <button className="btn btn-primary" onClick={onClose}>View Marketplace</button>
          </div>
        ) : (
          <div className="modal-body">
            {/* Step 1: Identity */}
            {step === 1 && (
              <div className="modal-step-content">
                <div className="form-group">
                  <label>Agent Name *</label>
                  <input id="agent-name-input" type="text" placeholder="e.g. NexusAI" value={form.name} onChange={e => update('name', e.target.value)} className="form-input" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Token Ticker *</label>
                    <div className="input-prefix">
                      <span>$</span>
                      <input id="agent-ticker-input" type="text" placeholder="NEXUS" value={form.ticker} onChange={e => update('ticker', e.target.value.toUpperCase())} className="form-input" maxLength={8}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select className="form-input" value={form.category} onChange={e => update('category', e.target.value)}>
                      <option value="">Select...</option>
                      {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea placeholder="What does your agent do? How does it use Ritual precompiles?" value={form.description} onChange={e => update('description', e.target.value)} className="form-input form-textarea" rows={3}/>
                </div>
              </div>
            )}

            {/* Step 2: Config */}
            {step === 2 && (
              <div className="modal-step-content">
                <div className="form-group">
                  <label>Precompiles <span className="label-hint">Select capabilities your agent uses</span></label>
                  <div className="precompile-grid">
                    {PRECOMPILE_OPTIONS.map(p => (
                      <button key={p} type="button"
                        className={`precompile-btn ${form.precompiles.includes(p) ? 'selected' : ''}`}
                        onClick={() => togglePre(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Website / Docs URL <span className="label-hint">optional</span></label>
                  <input type="url" placeholder="https://..." value={form.website} onChange={e => update('website', e.target.value)} className="form-input"/>
                </div>
                <div className="form-group">
                  <label>Initial Buy (RITUAL) <span className="label-hint">optional — boosts launch</span></label>
                  <div className="input-suffix">
                    <input type="number" placeholder="0.00" min="0" step="0.01" value={form.initialBuy} onChange={e => update('initialBuy', e.target.value)} className="form-input"/>
                    <span>RITUAL</span>
                  </div>
                </div>
                <div className="form-info glass">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="var(--primary-light)" strokeWidth="1.2"/><path d="M7 6V10M7 4.5V5" stroke="var(--primary-light)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  Agent tokens are deployed via Ritual Testnet (Chain ID: 1979). Get free RITUAL from the <a href="https://faucet.ritualfoundation.org" target="_blank" rel="noreferrer" style={{color:'var(--primary-light)'}}>faucet ↗</a>
                </div>
              </div>
            )}

            {/* Step 3: Launch Preview */}
            {step === 3 && (
              <div className="modal-step-content">
                <div className="launch-preview glass">
                  <div className="launch-preview__row">
                    <span>Agent Name</span>
                    <strong className="font-head">{form.name || '—'}</strong>
                  </div>
                  <div className="launch-preview__row">
                    <span>Token</span>
                    <strong className="font-mono">${form.ticker || '—'}</strong>
                  </div>
                  <div className="launch-preview__row">
                    <span>Category</span>
                    <strong>{form.category || 'General'}</strong>
                  </div>
                  <div className="launch-preview__row">
                    <span>Precompiles</span>
                    <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
                      {form.precompiles.length ? form.precompiles.map(p => (
                        <span key={p} className="badge badge-tee">{p}</span>
                      )) : <span style={{color:'var(--text-muted)'}}>None selected</span>}
                    </div>
                  </div>
                  <div className="launch-preview__row">
                    <span>Network</span>
                    <span className="font-mono" style={{color:'var(--accent)'}}>Ritual Testnet · 1979</span>
                  </div>
                  <div className="launch-preview__row">
                    <span>Initial Buy</span>
                    <strong className="font-mono">{form.initialBuy || '0'} RITUAL</strong>
                  </div>
                </div>
                <div className="launch-warn">
                  ⚠ This deploys to Ritual Testnet only. Ensure you have RITUAL tokens from the <a href="https://faucet.ritualfoundation.org" target="_blank" rel="noreferrer">faucet</a>.
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="modal-footer">
              {step > 1 && (
                <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              <div style={{flex:1}}/>
              {step < 3 ? (
                <button id="modal-next-btn" className="btn btn-primary" onClick={() => setStep(s => s + 1)}>
                  Next →
                </button>
              ) : !account ? (
                <button className="btn btn-primary" onClick={onConnect}>Connect Wallet</button>
              ) : !hasBalance ? (
                <button className="btn btn-accent" disabled title="Insufficient RITUAL balance">
                  Insufficient Funds
                </button>
              ) : (
                <button id="modal-launch-btn" className="btn btn-accent" onClick={handleLaunch}>
                  🚀 Launch Agent
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
