ICRoots
# ICRoots

ICRoots is a decentralized lending platform where users borrow stablecoins (like USDT or fiat) using Bitcoin as collateral. Built on the Internet Computer (ICP), it features AI-powered loan matching, trust-based lending via soulbound NFTs, and automated Bitcoin custody infrastructure.

---

## Vision

Bitcoin holders shouldn't have to sell to access liquidity. ICRoots unlocks lending for BTC users through trust-based AI recommendations and decentralized custody on ICP.

---

## Problem Statement

Many Bitcoin holders lack access to non-custodial, trust-based lending platforms. Existing options are centralized, risky, or lack AI-driven support for safer loan decisions. ICRoots solves this by providing collateralized loans, AI scoring, and NFT-based trust levels.

---

## Core Features

### Borrowers
- Deposit BTC to an auto-generated ICP wallet
- Get AI-matched loan offers based on your profile and trust level
- Receive loans in USDT or fiat
- Build reputation with successful repayments
- Advance through NFT-based trust tiers

### Lenders
- View borrower trust levels and AI scores
- Use AI tools to assess loan risk and opportunities
- Diversify portfolio with borrower profiles
- Track repayments across loans

### AI Modules
- Loan recommendation engine
- Risk profiling & creditworthiness scoring
- NLP-based borrower intent analysis
- KYC document verification
- Fraud detection

---

## NFT Trust Levels (Soulbound Reputation System)

| Tier    | Icon         | Description                                |
| ------- | ------------ | ------------------------------------------ |
| Sprout  | Leaf         | New user                                   |
| Sapling | Small branch | Completed 1–2 loans                        |
| Branch  | Tree         | Good repayment record                      |
| Trunk   | Sturdy tree  | Consistent behavior & positive feedback    |
| Oak     | Acorn & Tree | Highest reputation and verified trust      |

NFTs are non-transferable and minted automatically through the ICP NFT standard.

---

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Blockchain**: Internet Computer (ICP), Dfinity Canisters (Rust)
- **Wallets**: Auto-generated ICP wallets, Plug Wallet integration
- **AI**: OpenAI / Caffeine AI for scoring, matching, and KYC/fraud detection
- **NFTs**: Soulbound, trust-based reputation layers

---

## Folder Structure

