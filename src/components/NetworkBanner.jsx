import './NetworkBanner.css';

const PRECOMPILES = [
  { addr: '0x0801', name: 'HTTP', desc: 'REST & webhook calls from Solidity', icon: '🌐', color: '#3B82F6' },
  { addr: '0x0802', name: 'LLM Inference', desc: 'GLM-4.7-FP8 in TEE, 64K context', icon: '🧠', color: '#8B5CF6' },
  { addr: '0x0803', name: 'JQ Query', desc: 'JSON data extraction, synchronous', icon: '⚡', color: '#06D6A0' },
  { addr: '0x0800', name: 'ONNX', desc: 'Classical ML model inference', icon: '📊', color: '#F59E0B' },
  { addr: '0x0009', name: 'Ed25519', desc: 'Hardware-backed signature verification', icon: '🔐', color: '#10B981' },
  { addr: '0x0100', name: 'SECP256R1', desc: 'P-256 curve for passkeys & WebAuthn', icon: '🔑', color: '#EF4444' },
];

const NETWORK = [
  { label: 'Chain ID',    value: '1979',                           mono: true },
  { label: 'Token',       value: 'RITUAL (18 decimals)',           mono: false },
  { label: 'Block Time',  value: '~350ms',                         mono: true },
  { label: 'TX Types',    value: 'EIP-1559 + 0x10, 0x11, 0x12',  mono: true },
  { label: 'RPC',         value: 'rpc.ritualfoundation.org',       mono: true, link: 'https://rpc.ritualfoundation.org' },
  { label: 'Explorer',    value: 'explorer.ritualfoundation.org',  mono: true, link: 'https://explorer.ritualfoundation.org' },
  { label: 'Faucet',      value: 'faucet.ritualfoundation.org',    mono: true, link: 'https://faucet.ritualfoundation.org' },
  { label: 'Docs',        value: 'docs.ritualfoundation.org',      mono: true, link: 'https://docs.ritualfoundation.org' },
];

export default function NetworkBanner() {
  return (
    <section className="network-section">
      <div className="orb orb-purple" style={{width:'600px',height:'600px',top:'-100px',left:'-100px',opacity:0.4}}></div>
      <div className="orb orb-green"  style={{width:'400px',height:'400px',bottom:'-100px',right:'10%',opacity:0.3}}></div>

      <div className="container" style={{position:'relative',zIndex:1}}>
        {/* Header */}
        <div className="network__header">
          <div className="badge badge-ritual" style={{marginBottom:'12px'}}>
            <span className="live-dot"></span> Ritual Chain · Testnet Live
          </div>
          <h2 className="network__title font-head">
            Powered by <span className="gradient-text">Ritual Chain</span>
          </h2>
          <p className="network__sub">
            The first blockchain where smart contracts can think, see, hear, and act —
            the schelling point for autonomous agents.
          </p>
        </div>

        {/* Two column layout */}
        <div className="network__grid">
          {/* Network Info */}
          <div className="network__info-card glass">
            <div className="network__info-title font-head">Network Details</div>
            <div className="network__info-list">
              {NETWORK.map(item => (
                <div key={item.label} className="network__info-row">
                  <span className="network__info-label">{item.label}</span>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer"
                       className={`network__info-val ${item.mono ? 'font-mono' : ''} network__info-link`}>
                      {item.value} ↗
                    </a>
                  ) : (
                    <span className={`network__info-val ${item.mono ? 'font-mono' : ''}`}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="network__add-btn-wrap">
              <button className="btn btn-accent" style={{width:'100%'}} onClick={() => {
                if (window.ethereum) {
                  window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: '0x7BB',
                      chainName: 'Ritual Testnet',
                      nativeCurrency: { name: 'RITUAL', symbol: 'RITUAL', decimals: 18 },
                      rpcUrls: ['https://rpc.ritualfoundation.org'],
                      blockExplorerUrls: ['https://explorer.ritualfoundation.org'],
                    }],
                  }).catch(console.warn);
                }
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add Ritual Testnet to MetaMask
              </button>
            </div>
          </div>

          {/* Precompiles */}
          <div className="network__precompiles">
            <div className="network__pre-title font-head">Agent Precompiles</div>
            <div className="network__pre-grid">
              {PRECOMPILES.map(p => (
                <div key={p.addr} className="network__pre-card card">
                  <div className="network__pre-icon" style={{background: `${p.color}18`, border: `1px solid ${p.color}30`}}>
                    <span>{p.icon}</span>
                  </div>
                  <div className="network__pre-info">
                    <div className="network__pre-name font-head">{p.name}</div>
                    <div className="network__pre-addr font-mono">{p.addr}</div>
                    <div className="network__pre-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
