# ICRoots 🌳🔗  
*Bitcoin lending, rooted in trust.*

Collateralize BTC, borrow stablecoins, earn reputation-NFTs – all **on-chain** on the Internet Computer (ICP).

---

## 1 Why ICRoots?

Millions of BTC holders sit on locked value but lack fast, non-custodial liquidity.  
ICRoots fixes that with three super-powers:

1. **BTC-backed loans** – keep your coins, unlock short-term cash.  
2. **Soul-bound NFT reputation** – trust level grows (or shrinks) with every repayment.  
3. **AI copilot** – on-chain risk scoring and loan matchmaking.

---

## 2 Service Anatomy

| Concern                           | Canister (crate)          | Rationale for isolation                 | Status            |
| --------------------------------- | ------------------------- | --------------------------------------- | ----------------- |
| Loan ledger & core state          | **`loans_backend`**       | Small, auditable upgrades
