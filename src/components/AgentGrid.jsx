import { useState, useMemo } from 'react';
import AgentCard from './AgentCard';
import { useRitualAgents } from '../hooks/useRitualAgents';
import { CATEGORIES } from '../data/agents';
import './AgentGrid.css';

const SORT_TABS = [
  { id: 'mcap:desc', label: '👑 Top' },
  { id: 'vol:desc',  label: '🔥 Trending' },
  { id: 'new:desc',  label: '🆕 New' },
  { id: 'up:desc',   label: '📈 Gainers' },
  { id: 'down:desc', label: '📉 Losers' },
];

export default function AgentGrid({ onOpenDetail }) {
  const [sortTab, setSortTab]   = useState('mcap:desc');
  const [category, setCategory] = useState('All');
  const [view, setView]         = useState('grid');
  const [search, setSearch]     = useState('');

  const { agents, loading, error, hasMore, total, loadMore, refresh } =
    useRitualAgents({ sort: sortTab, pageSize: 12 });

  const filtered = useMemo(() => {
    let list = agents;
    if (category !== 'All') {
      list = list.filter(a =>
        (a.category ?? '').toLowerCase() === category.toLowerCase()
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) || a.ticker.toLowerCase().includes(q)
      );
    }
    return list;
  }, [agents, category, search]);

  return (
    <section className="agent-grid-section" id="marketplace">
      <div className="container">
        {/* Header */}
        <div className="agent-grid__header">
          <div>
            <h2 className="agent-grid__title font-head">
              Agent <span className="gradient-text">Marketplace</span>
            </h2>
            <p className="agent-grid__sub">
              {loading ? 'Fetching agents from Ritual Chain...' : `${total.toLocaleString()} autonomous agents · Ritual Chain 1979`}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="btn btn-ghost btn-sm" onClick={refresh} title="Refresh">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5A4.5 4.5 0 016.5 2M11 6.5A4.5 4.5 0 016.5 11M2 6.5H4M11 6.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 4L2 6.5L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="agent-grid__view-toggle">
              <button id="grid-view-btn" className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} title="Grid view">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
              </button>
              <button id="list-view-btn" className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} title="List view">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3H13M1 7H13M1 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="agent-grid__filters">
          <div className="agent-grid__sort-tabs">
            {SORT_TABS.map(tab => (
              <button key={tab.id} id={`sort-${tab.id}`}
                className={`sort-tab ${sortTab === tab.id ? 'sort-tab--active' : ''}`}
                onClick={() => setSortTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="agent-grid__search">
            <svg className="search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input id="agent-search" type="text" placeholder="Search agents..."
              value={search} onChange={e => setSearch(e.target.value)} className="search-input"/>
          </div>
        </div>

        {/* Category pills */}
        <div className="agent-grid__categories">
          {CATEGORIES.map(cat => (
            <button key={cat}
              className={`category-pill ${category === cat ? 'category-pill--active' : ''}`}
              onClick={() => setCategory(cat)}>{cat}</button>
          ))}
        </div>

        {/* Error */}
        {error && !loading && agents.length === 0 && (
          <div className="agent-grid__error">
            <span>⚠ Could not reach Ritual Agent Data — showing cached data.</span>
            <button className="btn btn-ghost btn-xs" onClick={refresh}>Retry</button>
          </div>
        )}

        {/* List header */}
        {view === 'list' && (
          <div className="agent-list__header">
            <span>Agent</span><span>Price</span><span>24h %</span>
            <span className="hide-md">Market Cap</span><span className="hide-md">Volume 24h</span>
            <span className="hide-xl">Holders</span><span>Action</span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && agents.length === 0 ? (
          <div className={view === 'grid' ? 'agent-grid' : 'agent-list'}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="agent-skeleton card">
                <div className="skeleton" style={{height:180}}></div>
                <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:8}}>
                  <div className="skeleton" style={{height:14,width:'60%'}}></div>
                  <div className="skeleton" style={{height:12,width:'80%'}}></div>
                  <div className="skeleton" style={{height:12,width:'40%'}}></div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="agent-grid__empty">
            <div className="agent-grid__empty-icon">🤖</div>
            <p>No agents found matching your search.</p>
          </div>
        ) : view === 'grid' ? (
          <div className="agent-grid">
            {filtered.map(agent => <AgentCard key={agent.id} agent={agent} view="grid" onOpenDetail={onOpenDetail} />)}
          </div>
        ) : (
          <div className="agent-list">
            {filtered.map(agent => <AgentCard key={agent.id} agent={agent} view="list" onOpenDetail={onOpenDetail} />)}
          </div>
        )}

        {/* Load More */}
        {hasMore && !loading && (
          <div className="agent-grid__load-more">
            <button className="btn btn-outline" onClick={loadMore}>
              Load More Agents
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3V11M3 7L7 11L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
        {loading && agents.length > 0 && (
          <div className="agent-grid__load-more">
            <span style={{color:'var(--text-muted)',fontSize:'13px'}}>Loading more agents...</span>
          </div>
        )}
      </div>
    </section>
  );
}
