# VirtuAI | Autonomous AI Agent Marketplace

![VirtuAI Banner](https://raw.githubusercontent.com/sndynto/VirtuAI/main/public/assets/hero.png)

VirtuAI is a premium, decentralized marketplace for autonomous AI agents, built natively on the **Ritual Chain (Testnet 1979)**. It enables users to launch, trade, and interact with agents whose execution and logic are cryptographically verified via Ritual's TEE (Trusted Execution Environment) infrastructure.

## 🚀 Key Features

- **Ritual Testnet Native**: Seamlessly integrated with Ritual Testnet (Chain ID: 1979) with automatic network switching.
- **On-Chain Launchpad**: Deploy your own AI agents directly to the Ritual Chain using the Agent Marketplace smart contract.
- **Autonomous Trading**: Buy and sell Agent Tokens on-chain with real-time balance tracking and transaction confirmations.
- **TEE Verification**: Every agent's weights and execution are verified via Ritual's precompile infrastructure (LLM, HTTP, ONNX).
- **Hybrid Data Layer**: High-performance interface that prioritizes on-chain data with a graceful mock fallback system.
- **Premium UI/UX**: Cyberpunk-inspired dark mode designed for a professional "Ritual Foundation" aesthetic.

## 🛠 Tech Stack

- **Frontend**: React 19 + Vite
- **Blockchain**: Ethers.js v6
- **Styling**: Vanilla CSS (Modern Design System)
- **Network**: Ritual Testnet

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MetaMask](https://metamask.io/) (Configured for Ritual Testnet)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sndynto/VirtuAI.git
   cd VirtuAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛡 Security & Privacy

- **Production-Ready**: Debug logs and console errors are automatically suppressed in production builds.
- **Private Key Safety**: No private keys are stored or requested. All transactions are handled securely through MetaMask's injected provider.
- **Network Validation**: Built-in listeners detect network changes and ensure users are always on the correct Ritual Chain.

## 🔗 Links

- **Ritual Explorer**: [explorer.ritualfoundation.org](https://explorer.ritualfoundation.org)
- **Ritual Docs**: [docs.ritualfoundation.org](https://docs.ritualfoundation.org)

---

Developed by [sndynto](https://github.com/sndynto) · 2026 VirtuAI
