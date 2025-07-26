# ICRoots 🌳🔗

> **Bitcoin lending, rooted in trust.**  
> Collateralize BTC, borrow stablecoins, earn reputation-NFTs – all fully on-chain on the Internet Computer.

---

## 1. Why ICRoots?

Millions of Bitcoin holders sit on locked value but lack fast, non-custodial access to liquidity.  
Traditional “crypto loans” are either centralized or ignore borrower reputation.  
**ICRoots** blends three super-powers:

1. **BTC-backed loans** – keep your coins, unlock short-term cash.
2. **Soul-bound NFT reputation** – gamified trust that grows with every repayment.
3. **AI Copilot** – on-chain risk scoring & loan matchmaking.

---

## 2. System Architecture (micro-canisters)

| Concern                         | Canister          | Why isolate it?                                    |
| ------------------------------- | ----------------- | -------------------------------------------------- |
| Loan ledger & core state        | `loans`           | Small, auditable upgrades.                         |
| BTC custody & liquidation logic | `collateral`      | Tight security boundary; almost never upgraded.    |
| Reputation NFTs                 | `repute` _(TBD)_  | Separate lifecycle for mint/burn permissions.      |
| AI scoring engine               | `trust_ai`_(TBD)_ | WASM heavy; can be swapped for newer models later. |
| UX events / logs                | `event_bus`       | Keeps business logic clean; tiny footprint.        |

📄 See **docs/micro-canister-architecture.png** for a visual and **docs/data-flow-sequence.png** for the happy-path sequence diagram.

---

## 3. Tech Stack

| Layer       | Choice                                          |
| ----------- | ----------------------------------------------- |
| Frontend    | React + Vite + TailwindCSS                      |
| Blockchain  | Internet Computer (ICP) Canisters (Rust/Motoko) |
| Wallet/Auth | Plug Wallet • Internet Identity                 |
| AI Layer    | OpenAI / Caffeine AI                            |
| NFTs        | Soul-bound DIP-721                              |
| Dev tooling | `dfx`, Vitest, Husky pre-commit hooks           |

---

## 4. Folder Map (top level)

icroots/
├─ canisters/ # each micro-canister lives here
│ ├─ loans/
│ ├─ collateral/
│ ├─ repute/
│ ├─ trust_ai/
│ └─ event_bus/
├─ src/frontend/ # React app
├─ docs/ # diagrams & pitch assets
├─ tests/ # integration tests (ic-cdk-testing)
├─ scripts/ # helper bash/ts scripts
├─ dfx.json # ICP workspace definition
└─ README.md # you are here

---

## 5. Quick Start (local)

1. *Pre-requisites*

   ```
   node ≥18   dfx ≥0.20   git ≥2.40
   ```

````

2. Clone & prepare

   git clone https://github.com/ICRoots/ICRoots.git
   cd ICRoots
   cp .env.sample .env         # adjust NETWORK / cycles wallet if needed
   npm install               # installs both root and workspace deps

````

3. *Run ICP locally + frontend*

   ```
   dfx start --background
   dfx deploy
   npm run dev                 # launches Vite on http://localhost:5173
   ```

---

## 6. Deploy to ICP Mainnet

```
dfx deploy --network ic
# copy the printed canister IDs into README & DoraHacks submission
```

Make sure you have enough cycles in your default wallet (`dfx ledger --network ic balance`).

---

## 7. Roadmap (post-qualification)

* 🔄 Integrate real BTC test-net custody via Chain-Fusion.
* 🏷️ Launch soul-bound NFT minting in `repute` canister.
* 🤖 Fine-tune `trust_ai` risk model on-chain.
* 📱 Mobile PWA wrapper for emerging-market users.

---

## 8. Contributing

PRs welcome – follow our **Git flow**:

```
feat/✏️      → new features
fix/🐛        → patches
docs/📚       → README / diagrams
```

Run `npm run lint && npm test` before pushing.

---

## 9. License

MIT © 2025 ICRoots team.

---

*Let’s build a fairer, faster Bitcoin credit market – together.* 🚀

````
