import { useRef } from 'react';
import AgentCard from './AgentCard';
import { useTrendingAgents } from '../hooks/useRitualAgents';
import './TrendingBar.css';

export default function TrendingBar({ onOpenDetail }) {
  const scrollRef = useRef(null);
  const { agents, loading } = useTrendingAgents(8);

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="trending-section" id="trending">
      <div className="container">
        <div className="trending__header">
          <div>
            <div className="trending__tag"><span>🔥</span> Hot Right Now</div>
            <h2 className="trending__title font-head">
              Trending <span className="gradient-text-gold">Agents</span>
            </h2>
          </div>
          <div className="trending__nav">
            <button id="trending-prev" className="trend-nav-btn" onClick={() => scroll(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button id="trending-next" className="trend-nav-btn" onClick={() => scroll(1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="trending__track-wrap">
          {loading ? (
            <div className="trending__track">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="trending__item">
                  <div className="card" style={{padding:'18px',display:'flex',flexDirection:'column',gap:12}}>
                    <div className="skeleton" style={{height:52,width:52,borderRadius:12}}></div>
                    <div className="skeleton" style={{height:14,width:'70%'}}></div>
                    <div className="skeleton" style={{height:12,width:'50%'}}></div>
                    <div className="skeleton" style={{height:80}}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="trending__track" ref={scrollRef}>
              {agents.map(agent => (
                <div key={agent.id} className="trending__item">
                  <AgentCard agent={agent} view="grid" onOpenDetail={onOpenDetail} />
                </div>
              ))}
            </div>
          )}
          <div className="trending__fade-left"  aria-hidden="true"></div>
          <div className="trending__fade-right" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
