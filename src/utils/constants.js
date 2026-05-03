export const RITUAL_CHAIN_ID = 1979;
export const RITUAL_RPC_URL = 'https://rpc.ritualfoundation.org';

// Replace with your real contract addresses
export const AGENT_MARKETPLACE_ADDRESS = '0x0000000000000000000000000000000000000000';

// Example ABI for a Ritual Agent Marketplace
export const AGENT_MARKETPLACE_ABI = [
  "function getAllAgents() view returns (tuple(string id, string name, string ticker, string description, uint256 marketCap, uint256 price, int256 change24h, uint256 volume24h, address owner)[])",
  "function getAgentDetails(string id) view returns (tuple(string id, string name, string description, string[] precompiles, bool teeVerified))",
  "function launchAgent(string name, string ticker, string description, string[] precompiles) payable returns (string id)",
  "function buyAgent(string id) payable returns (bool)",
  "function sellAgent(string id, uint256 amount) returns (bool)",
  "event AgentLaunched(string id, address owner, string name)",
  "event Trade(string id, address indexed user, bool isBuy, uint256 amount, uint256 price)"
];
