import { useState, useCallback, useMemo } from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { AGENT_MARKETPLACE_ADDRESS, AGENT_MARKETPLACE_ABI } from '../utils/constants';

export function useRitual() {
  const [loading, setLoading] = useState(false);

  const getProvider = useCallback(async () => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    return new BrowserProvider(window.ethereum);
  }, []);

  const getContract = useCallback(async (withSigner = false) => {
    const provider = await getProvider();
    if (withSigner) {
      const signer = await provider.getSigner();
      return new Contract(AGENT_MARKETPLACE_ADDRESS, AGENT_MARKETPLACE_ABI, signer);
    }
    return new Contract(AGENT_MARKETPLACE_ADDRESS, AGENT_MARKETPLACE_ABI, provider);
  }, [getProvider]);

  const fetchAgentsFromChain = useCallback(async () => {
    // If address is still placeholder, skip real fetch
    if (AGENT_MARKETPLACE_ADDRESS === '0x0000000000000000000000000000000000000000') {
      return null;
    }

    setLoading(true);
    try {
      const contract = await getContract();
      const rawAgents = await contract.getAllAgents();
      
      // Transform raw blockchain data to app format
      return rawAgents.map(a => ({
        id: a.id,
        name: a.name,
        ticker: a.ticker,
        description: a.description,
        marketCap: Number(a.marketCap),
        price: Number(formatEther(a.price)),
        change24h: Number(a.change24h),
        volume24h: Number(a.volume24h),
        liquidity: Number(a.volume24h) * 2, // Placeholder calculation
        holders: 1, // Default for new agent
        address: a.owner,
        originalChain: 'RITUAL',
        tags: ['AI', 'Ritual'],
        precompiles: ['LLM', 'HTTP'],
        avatar: a.name.charAt(0),
        avatarGradient: ['#8B5CF6', '#06D6A0'],
        age: '1d',
        teeVerified: true,
      }));
    } catch (err) {
      console.error("Failed to fetch agents from Ritual Chain:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const launchAgent = useCallback(async (agentData) => {
    setLoading(true);
    try {
      const contract = await getContract(true);
      const tx = await contract.launchAgent(
        agentData.name,
        agentData.ticker,
        agentData.description,
        agentData.precompiles,
        { value: parseEther("0.001") } // Example fee
      );
      return await tx.wait();
    } catch (err) {
      console.error("Launch transaction failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const buyAgent = useCallback(async (agentId, amountInRitual) => {
    setLoading(true);
    try {
      const contract = await getContract(true);
      const tx = await contract.buyAgent(agentId, {
        value: parseEther(amountInRitual.toString())
      });
      return await tx.wait();
    } catch (err) {
      console.error("Buy transaction failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const sellAgent = useCallback(async (agentId, tokenAmount) => {
    setLoading(true);
    try {
      const contract = await getContract(true);
      const tx = await contract.sellAgent(agentId, parseEther(tokenAmount.toString()));
      return await tx.wait();
    } catch (err) {
      console.error("Sell transaction failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  return { fetchAgentsFromChain, launchAgent, buyAgent, sellAgent, loading };
}
