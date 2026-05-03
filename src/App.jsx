import './index.css';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import Hero from './components/Hero';
import TrendingBar from './components/TrendingBar';
import AgentGrid from './components/AgentGrid';
import NetworkBanner from './components/NetworkBanner';
import Footer from './components/Footer';
import CreateAgentModal from './components/CreateAgentModal';
import LandingPage from './pages/LandingPage';
import AgentDetailPage from './pages/AgentDetailPage';
import { useState, useRef, useEffect } from 'react';
import './App.css';

export default function App() {
  const [view, setView] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/agent/')) return 'detail';
    return hash === '#/app' ? 'app' : 'landing';
  });
  const [selectedAgentId, setSelectedAgentId] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/agent/')) return hash.split('/').pop();
    return null;
  });
  const [showCreate, setShowCreate] = useState(false);
  const [account, setAccount] = useState(null); 
  const [balance, setBalance] = useState('0'); // RITUAL Balance
  const marketplaceRef = useRef(null);

  const RITUAL_CHAIN_ID = '0x7BB'; // 1979 in hex
  const RITUAL_CHAIN_CONFIG = {
    chainId: RITUAL_CHAIN_ID,
    chainName: 'Ritual Testnet',
    nativeCurrency: { name: 'RITUAL', symbol: 'RITUAL', decimals: 18 },
    rpcUrls: ['https://rpc.ritualfoundation.org'],
    blockExplorerUrls: ['https://explorer.ritualfoundation.org'],
  };

  const claimTestBalance = () => {
    // Keep simulation for now as a fallback
    setBalance('100.0000');
    alert('Simulated 100 RITUAL added! (Note: Real transactions require actual Ritual Testnet ETH)');
  };

  const fetchBalance = async (addr) => {
    if (window.ethereum && addr) {
      try {
        const bal = await window.ethereum.request({ 
          method: 'eth_getBalance', 
          params: [addr, 'latest'] 
        });
        setBalance((parseInt(bal, 16) / 1e18).toFixed(4));
      } catch (e) { console.error('Balance fetch error', e); }
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: RITUAL_CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [RITUAL_CHAIN_CONFIG],
          });
        } catch (addError) { console.error('Add chain error', addError); }
      }
    }
  };

  const connectWallet = async () => {
    if (account) { 
      setAccount(null); 
      setBalance('0'); 
      setView('landing');
      return; 
    }
    
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        await switchNetwork();
        fetchBalance(accounts[0]);
      } catch (e) { 
        console.error('Wallet connection failed', e);
        // Fallback or alert
      }
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchBalance(accounts[0]);
        } else {
          setAccount(null);
          setBalance('0');
          setView('landing'); // Auto-redirect on disconnect
        }
      });
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, []);

  // Strict check: if view is app/detail but no account, redirect to landing
  // (Optional: only if you want to force connect before app entry)
  // useEffect(() => {
  //   if ((view === 'app' || view === 'detail') && !account) {
  //     setView('landing');
  //   }
  // }, [account, view]);

  useEffect(() => {
    if (account) {
      const timer = setInterval(() => fetchBalance(account), 10000);
      return () => clearInterval(timer);
    }
  }, [account]);

  useEffect(() => {
    if (view === 'detail' && selectedAgentId) {
      window.location.hash = `#/agent/${selectedAgentId}`;
    } else {
      window.location.hash = view === 'app' ? '#/app' : '';
    }
  }, [view, selectedAgentId]);

  const openApp = () => {
    setView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDetail = (id) => {
    setSelectedAgentId(id);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToMarketplace = () => {
    marketplaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (view === 'landing') {
    return <LandingPage onOpenApp={openApp} onOpenDetail={openApp} />;
  }

  if (view === 'detail') {
    return (
      <div className="app">
        <Navbar 
          onBackToLanding={() => setView('landing')} 
          account={account} 
          balance={balance} 
          onConnect={connectWallet} 
          onClaimTestBalance={claimTestBalance}
        />
        <div className="app__main">
          <div className="stats-bar-offset"><StatsBar /></div>
          <AgentDetailPage agentId={selectedAgentId} onBack={() => setView('app')} account={account} balance={balance} onConnect={connectWallet} />
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar 
        onBackToLanding={() => setView('landing')} 
        account={account} 
        balance={balance} 
        onConnect={connectWallet} 
        onClaimTestBalance={claimTestBalance}
      />
      <div className="app__main">
        <div className="stats-bar-offset"><StatsBar /></div>
        <Hero onExplore={scrollToMarketplace} />
        <TrendingBar onOpenDetail={openDetail} />
        <div ref={marketplaceRef}><AgentGrid onOpenDetail={openDetail} /></div>
        <NetworkBanner />
        <section className="create-section" id="create">
          <div className="orb orb-cyan" style={{width:'500px',height:'500px',top:'-100px',left:'50%',transform:'translateX(-50%)',opacity:0.3}}></div>
          <div className="container" style={{position:'relative',zIndex:1}}>
            <div className="create__card glass-bright">
              <div className="create__badge badge badge-agent">Deploy Your Agent</div>
              <h2 className="create__title font-head">
                Launch Your <span className="gradient-text">Autonomous AI Agent</span> on Ritual Chain
              </h2>
              <p className="create__desc">
                Create a sovereign agent powered by TEE-verified LLM inference, HTTP precompiles, and onchain execution with ~350ms finality.
              </p>
              <div className="create__features">
                {['TEE-Verified Execution','LLM Inference (GLM-4.7-FP8)','HTTP Precompile Access','Autonomous Scheduling','Token Launch (Agent Tokens)','Onchain Revenue Share'].map(f => (
                  <div key={f} className="create__feature">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" fill="var(--accent)" opacity="0.15"/>
                      <path d="M4 7L6 9L10 5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
              <div className="create__actions">
                <button id="launch-agent-btn" className="btn btn-primary btn-lg" onClick={() => setShowCreate(true)}>
                  Launch Agent
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L8 14M2 8L8 2L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <a href="http://docs.ritualfoundation.org" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Read the Docs ↗</a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      {showCreate && <CreateAgentModal onClose={() => setShowCreate(false)} account={account} balance={balance} onConnect={connectWallet} />}
    </div>
  );
}
