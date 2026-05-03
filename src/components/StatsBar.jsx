import { useGlobalStats } from '../hooks/useRitualAgents';
import './StatsBar.css';

function fmt(n) {
  if (!n) return '—';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(2)}`;
}

export default function StatsBar() {
  const { stats, loading } = useGlobalStats();

  const items = stats ? [
    { label: 'RITUAL',           value: stats.token },
    { label: 'MCAP',             value: fmt(stats.totalMcap) },
    { label: 'VOL 24H',          value: fmt(stats.totalVol24h) },
    { label: 'AGENTS',           value: stats.totalAgents?.toLocaleString() },
    { label: 'BLOCK TIME',       value: stats.blockTime },
    { label: 'CHAIN ID',         value: String(stats.chainId) },
    { label: 'HOLDERS',          value: stats.totalHolders?.toLocaleString() },
    { label: 'TEE EXECUTORS',    value: '128' },
  ] : [];

  return (
    <div className="stats-bar font-mono">
      <div className="stats-bar__inner container">
        <div className="stats-bar__live">
          <span className="live-dot pulse"></span>
          LIVE
        </div>
        {loading ? (
          <div className="stats-bar__loading">Syncing with Ritual Node...</div>
        ) : (
          items.map((item, i) => (
            <div key={i} className="stats-bar__item">
              <span className="label">{item.label}:</span>
              <span className="value">{item.value}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
