import { useState, useEffect, useCallback } from 'react';
import { RITUAL_NATIVE_AGENTS } from '../data/ritual_agents';
import { useRitual } from './useRitual';
import { AGENT_MARKETPLACE_ADDRESS } from '../utils/constants';

export function useRitualAgents({
  sort     = 'mcapInVirtual:desc',
  pageSize = 12,
  autoLoad = true,
} = {}) {
  const [agents,  setAgents]  = useState(RITUAL_NATIVE_AGENTS);
  const [isRealData, setIsRealData] = useState(false);
  const { fetchAgentsFromChain, loading: contractLoading } = useRitual();
  const [error,   setError]   = useState(null);

  const refreshData = useCallback(async () => {
    // 1. Try to fetch real data if contract address is set
    if (AGENT_MARKETPLACE_ADDRESS !== '0x0000000000000000000000000000000000000000') {
      const realAgents = await fetchAgentsFromChain();
      if (realAgents && realAgents.length > 0) {
        setAgents(realAgents);
        setIsRealData(true);
        setError(null);
        return;
      }
    }

    // 2. Fallback to mock data with simulation delay
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 800));
    setAgents(RITUAL_NATIVE_AGENTS);
    setIsRealData(false);
  }, [fetchAgentsFromChain]);

  useEffect(() => {
    if (autoLoad) refreshData();
  }, [autoLoad, refreshData]);

  return { 
    agents, 
    loading: contractLoading, 
    error, 
    isRealData,
    hasMore: false, 
    total: agents.length, 
    loadMore: () => {}, 
    refresh: refreshData
  };
}

export function useGlobalStats() {
  const { agents } = useRitualAgents({ autoLoad: true });
  const [stats, setStats] = useState({
    totalAgents:  RITUAL_NATIVE_AGENTS.length,
    totalMcap:    213000000,
    totalVol24h:  38000000,
    totalHolders: 24200,
    chainId:      1979,
    blockTime:    '~350ms',
    token:        'RITUAL',
  });

  useEffect(() => {
    if (agents && agents.length > 0) {
      setStats(prev => ({
        ...prev,
        totalAgents: agents.length
      }));
    }
  }, [agents]);

  return { stats, loading: false };
}

export function useRitualAgent(id) {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchAgentsFromChain } = useRitual();

  useEffect(() => {
    if (!id) return;
    
    async function load() {
      setLoading(true);
      try {
        // 1. Try real data first if possible
        if (AGENT_MARKETPLACE_ADDRESS !== '0x0000000000000000000000000000000000000000') {
           const all = await fetchAgentsFromChain();
           const found = all.find(a => a.id === id);
           if (found) {
             setAgent(found);
             setLoading(false);
             return;
           }
        }

        // 2. Fallback to mock
        const mock = RITUAL_NATIVE_AGENTS.find(a => a.id === id);
        if (mock) {
          setAgent(mock);
        } else {
          setError('Agent not found on Ritual Testnet');
        }
      } catch (err) {
        console.error("Error loading agent", err);
        // Fallback to mock on error
        const mock = RITUAL_NATIVE_AGENTS.find(a => a.id === id);
        if (mock) setAgent(mock);
        else setError('Failed to load agent data');
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [id, fetchAgentsFromChain]);

  return { agent, loading, error };
}

export function useTrendingAgents(count = 6) {
  const { agents, loading, error } = useRitualAgents({ pageSize: count });
  return { agents, loading, error };
}

export function transformAgent(raw) {
    // No longer needed for external API, but keeping for compatibility
    return raw;
}
