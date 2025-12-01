# Base Learn Progress Tracker

Each section below mirrors the [Building Onchain](https://docs.base.org/learn/welcome) guide and additional Base ecosystem learning.

## Completed Lessons

### Building Onchain
- ✅ Welcome
- ✅ Onchain Concepts
- ✅ Core Concepts
- ✅ Understanding Onchain in Your Tech Stack
- ✅ Web2 vs Building Onchain
- ✅ The Development Flow

### Introduction to Ethereum
- ✅ Introduction
- ✅ Ethereum Dev Overview
- ✅ Ethereum Applications
- ✅ Gas Use in Ethereum Transactions
- ✅ EVM Diagram

### Smart Contract Development
- ✅ Solidity Basics
- ✅ ERC-721 (NFT) Contract Development
- ✅ ERC-1155 (Multi-Token) Contract Development
- ✅ Contract Deployment on Base Sepolia
- ✅ Contract Verification on BaseScan

### Web3 Libraries & Blockchain Interaction
- ✅ Web3.js Setup and Configuration
- ✅ Viem Setup and Configuration
- ✅ Reading from Smart Contracts
- ✅ Writing to Smart Contracts
- ✅ Working with Contract ABIs
- ✅ Transaction Handling and Confirmation

### Frontend Development with Base
- ✅ Next.js App Setup for Web3
- ✅ RainbowKit Integration
- ✅ Wagmi Hooks (`useReadContract`, `useWriteContract`, `useAccount`)
- ✅ WalletConnect Setup
- ✅ Base Sepolia RPC Configuration
- ✅ Building Full-Stack Onchain Applications

### Account Abstraction (ERC-4337)
- ✅ Introduction to Account Abstraction
- ✅ Smart Accounts (Simple Account)
- ✅ Paymaster Concepts
- ✅ Gasless Transactions with Coinbase Paymaster
- ✅ Permissionless.js Integration
- ✅ User Operations and Bundlers
- ✅ Sponsored Transaction Implementation
- ✅ Paymaster Allowlist Configuration

### Advanced Topics
- ✅ NFT Minting with Gasless Transactions
- ✅ ERC-1155 Multi-Token Library System
- ✅ Soulbound Tokens (Non-transferable NFTs)
- ✅ Token Burning and Badge Systems
- ✅ Review Systems with On-chain Hashing
- ✅ Time-based Token Borrowing/Lending

## Project Portfolio

### 1. Blackhorn Reader (ERC-1155 Library System)
**Repository:** `~/blackhorn-reader`
**Contract:** `0x5a3a45160494A2cf01dF35683380f17B33D73E35` (Base Sepolia)
**Description:** Full-featured decentralized library with book borrowing, review system, and badge rewards

**Features:**
- Book ownership and borrowing system (time-locked tokens)
- Review submission with on-chain commitments
- Dual badge system: Basic (soulbound) and Rare (transferable)
- Token burning mechanics for badge upgrades
- Complete Next.js frontend with RainbowKit

**Tech Stack:** Solidity, Next.js, Wagmi, RainbowKit, Viem, TanStack Query

### 2. ERC-721 NFT Demo (Mrs. Blackhorn)
**Repository:** `~/erc721-mrsblackhorn-demo`
**Description:** Custom ERC-721 NFT contract with minting functionality

**Tech Stack:** Solidity, Hardhat/Remix

### 3. ERC-1155 Demo (Blackhorn Multi-Token)
**Repository:** `~/erc1155-blackhorn-demo`
**Description:** Multi-token standard implementation

**Tech Stack:** Solidity

### 4. Sponsored Transactions (Gasless NFT Minting)
**Repository:** `~/sponsored_transactions`
**Contract:** `0xf0272310aaab0a47205525fdb86a0c9822455215` (Base Sepolia)
**Deployment Tx:** `0xc68168da36e2c38f9fbb0c37d2879f08e51d80ae5f4104b8d743e0833a5d9fa4`
**Description:** Complete implementation of ERC-4337 Account Abstraction with Coinbase Paymaster

**Features:**
- Smart Account wallet creation (no ETH required)
- Paymaster-sponsored NFT minting
- Zero gas cost for users
- Integration with Next.js frontend
- Custom `useReadContract` hooks for NFT balance

**Completed Transactions:**
- Mint to SA #1: `0x04e6d73d7f76c4d7b5c7a1ef051ae1d24d1d7202611b0d987351a459bc5d207d`
- Mint to SA #2: `0x861bcd068d13aba30ef66eaf6a88303eb46bbfc728bd8534a01e11946f81693f`

**Tech Stack:** Solidity, Permissionless.js, Viem, Wagmi, Next.js, Coinbase Developer Platform

### 5. Web3.js Learning
**Repository:** `~/web3-lesson`
**Description:** Foundational Web3.js library practice

### 6. Viem Learning
**Repository:** `~/viem-lesson`
**Description:** Modern Ethereum library practice with TypeScript

## Next.js Frontend Integrations

### Blackhorn Reader Frontend
**Path:** `~/blackhorn-reader/frontend`
**Features:**
- Complete book browsing and borrowing UI
- My Borrowed Books page with return functionality
- Book detail pages with review submission
- Badge collection display
- Wallet connection with RainbowKit
- Real-time blockchain state updates

### Sponsored Transactions Frontend
**Path:** `~/blackhorn-reader/frontend` (integrated)
**New Components:**
- `lib/nftContract.ts` - NFT contract configuration
- `hooks/useNFTBalance.ts` - Wagmi hook for sponsored reads
- `components/NFTBalance.tsx` - NFT balance display component
- `SPONSORED_READS.md` - Integration documentation

## Key Learning Achievements

### Smart Contract Development
- ✅ Deployed multiple contracts to Base Sepolia
- ✅ Implemented ERC-721 and ERC-1155 standards
- ✅ Created custom token mechanics (soulbound, time-locked, burnable)
- ✅ Integrated contract verification on BaseScan

### Frontend Development
- ✅ Built production-ready Next.js dApps
- ✅ Implemented wallet connection flows
- ✅ Created reusable blockchain hooks
- ✅ Handled transaction states and error handling
- ✅ SSR-compatible Web3 configuration

### Account Abstraction Mastery
- ✅ Implemented full ERC-4337 flow
- ✅ Configured Coinbase Paymaster for sponsorship
- ✅ Created smart accounts programmatically
- ✅ Executed gasless transactions
- ✅ Integrated paymaster with Next.js frontend

### Best Practices
- ✅ Environment variable management
- ✅ TypeScript for type safety
- ✅ Proper error handling and user feedback
- ✅ Transaction confirmation patterns
- ✅ Allowlist management for paymasters

## Current Status

**Last Updated:** December 1, 2025
**Current Focus:** Account Abstraction & Gasless Transactions
**Recently Completed:** Gasless NFT Minting with Paymaster (ERC-4337)

## Resources Used

- [Base Documentation](https://docs.base.org/learn/welcome)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)
- [Permissionless.js Docs](https://github.com/pimlicolabs/permissionless.js)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [RainbowKit Docs](https://www.rainbowkit.com)
