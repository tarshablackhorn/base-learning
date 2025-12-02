# Quick Start Checklist

Use this as a quick reference while working through the Biconomy Account Abstraction tutorial.

## ✅ Phase 1: Project Setup
- [ ] `cd ~/base-learning/base-learning-biconomy`
- [ ] `mkdir myproject && cd myproject`
- [ ] `mkdir contracts && cd contracts`
- [ ] `forge init`
- [ ] Verify `src/Counter.sol` exists

## ✅ Phase 2: Contract Prep
- [ ] `forge build`
- [ ] `cast wallet import deployer --interactive`
- [ ] `cast wallet list` (verify)

## ✅ Phase 3: Deploy Contract
- [ ] Get Base Sepolia ETH from faucet
- [ ] `forge create src/Counter.sol:Counter --rpc-url https://sepolia.base.org --account deployer --broadcast`
- [ ] Save contract address: `_____________________`

## ✅ Phase 4: Biconomy Paymaster
- [ ] Create account at https://dashboard.biconomy.io/
- [ ] Create new Paymaster for Base Sepolia
- [ ] Copy Paymaster API Key: `_____________________`
- [ ] Copy Paymaster URL: `_____________________`
- [ ] Fund gas tank (min 0.01 ETH)
- [ ] Create policy → Add contract address
- [ ] Whitelist `increment()` and `setNumber(uint256)`

## ✅ Phase 5: Biconomy Bundler
- [ ] Go to Bundlers tab
- [ ] Copy Bundler URL: `_____________________`

## ✅ Phase 6: Particle Network
- [ ] Create account at https://dashboard.particle.network/
- [ ] Create new project
- [ ] Create new app (Web)
- [ ] Copy Project ID: `_____________________`
- [ ] Copy Client Key: `_____________________`
- [ ] Copy App ID: `_____________________`

## ✅ Phase 7: Frontend Setup
- [ ] `cd ~/base-learning/base-learning-biconomy/myproject`
- [ ] `yarn create next-app my-app`
- [ ] `cd my-app`
- [ ] `yarn add @biconomy/account @biconomy/bundler @biconomy/paymaster @biconomy/modules`
- [ ] `yarn add @particle-network/auth-core-modal @particle-network/chains ethers@5`

## ✅ Phase 8: Configure Environment
- [ ] Create `.env.local`
- [ ] Add all Particle credentials
- [ ] Add all Biconomy credentials
- [ ] Add contract address

## ✅ Phase 9: Implement Code
- [ ] Update `app/page.tsx`
- [ ] Initialize ParticleAuthModule
- [ ] Create Smart Account client
- [ ] Implement increment/setNumber functions
- [ ] Add loading states and error handling

## ✅ Phase 10: Test & Validate
- [ ] `yarn dev`
- [ ] Connect wallet via Particle
- [ ] Check smart account address displays
- [ ] Execute increment transaction
- [ ] Verify on BaseScan: `_____________________`
- [ ] Confirm Paymaster sponsored gas
- [ ] Execute setNumber transaction
- [ ] Verify on BaseScan: `_____________________`

## 📋 Credentials Tracker

**Contract:**
- Deployed Address: `_____________________`
- BaseScan Link: `https://sepolia.basescan.org/address/_____________________`

**Biconomy:**
- Paymaster API Key: `_____________________`
- Paymaster URL: `_____________________`
- Bundler URL: `_____________________`
- Dashboard: https://dashboard.biconomy.io/

**Particle Network:**
- Project ID: `_____________________`
- Client Key: `_____________________`
- App ID: `_____________________`
- Dashboard: https://dashboard.particle.network/

**Transactions:**
- Deploy Tx: `_____________________`
- First Gasless Tx: `_____________________`
- Second Gasless Tx: `_____________________`

## 🔧 Quick Commands

**Build contract:**
```bash
forge build
```

**Deploy contract:**
```bash
forge create src/Counter.sol:Counter \
  --rpc-url https://sepolia.base.org \
  --account deployer \
  --broadcast
```

**Start frontend:**
```bash
cd my-app
yarn dev
```

**Check wallet:**
```bash
cast wallet list
cast wallet address deployer
```

## 🐛 Quick Fixes

**Paymaster fails:**
1. Check gas tank has funds
2. Verify contract is whitelisted
3. Confirm functions are whitelisted

**Bundler fails:**
1. Verify Bundler URL is correct
2. Check network is Base Sepolia (84532)

**Particle login fails:**
1. Clear browser cache
2. Verify credentials in .env.local
3. Check app is configured for Web

---

**Tip:** Keep this file open while following the main README.md guide!
