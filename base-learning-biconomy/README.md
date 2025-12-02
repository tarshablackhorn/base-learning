# BASE LEARNING — Account Abstraction (Biconomy)

Complete implementation guide for Account Abstraction on Base using Biconomy paymasters, bundlers, and smart accounts.

## 🎯 Project Overview

This project demonstrates how to implement ERC-4337 Account Abstraction using Biconomy's infrastructure, enabling gasless transactions for users on Base testnet.

**Key Technologies:**
- **Biconomy SDK** - Smart Account infrastructure
- **Particle Network** - Social login & EOA provider
- **Foundry** - Smart contract development
- **Next.js** - Frontend framework
- **Base Sepolia** - Testnet deployment

## 📋 Prerequisites

- Node.js v18+ and yarn/npm
- Foundry installed (`curl -L https://foundry.paradigm.xyz | bash`)
- Base Sepolia testnet ETH (for deployer wallet & gas tank)
- Git

## 🗂️ Project Structure

```
base-learning-biconomy/
├── myproject/
│   ├── contracts/
│   │   ├── src/
│   │   │   └── Counter.sol
│   │   ├── script/
│   │   ├── test/
│   │   └── foundry.toml
│   └── my-app/          # Next.js frontend
│       ├── app/
│       │   └── page.tsx
│       ├── .env.local
│       └── package.json
└── README.md
```

## 🚀 Implementation Steps

### Phase 1: Project & Directory Setup

1. **Create root project directory**
   ```bash
   cd ~/base-learning/base-learning-biconomy
   mkdir myproject
   cd myproject
   ```

2. **Initialize Foundry for contracts**
   ```bash
   mkdir contracts
   cd contracts
   forge init
   ```

3. **Verify structure**
   ```bash
   ls -la
   # Should see: foundry.toml, script/, src/, test/
   cat src/Counter.sol  # Confirm default contract exists
   ```

### Phase 2: Smart Contract Preparation

1. **Build the contract**
   ```bash
   forge build
   ```

2. **Import deployer wallet**
   ```bash
   cast wallet import deployer --interactive
   # Enter your private key when prompted
   ```

3. **Verify wallet imported**
   ```bash
   cast wallet list
   ```

### Phase 3: Deploy to Base Testnet

1. **Fund your deployer wallet**
   - Get Base Sepolia ETH: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

2. **Deploy Counter.sol**
   ```bash
   forge create src/Counter.sol:Counter \
     --rpc-url https://sepolia.base.org \
     --account deployer \
     --broadcast
   ```

3. **Save the deployed contract address** (you'll need it for Biconomy)

### Phase 4: Biconomy Paymaster Setup

1. **Create Biconomy account**
   - Visit: https://dashboard.biconomy.io/
   - Sign up / Log in

2. **Register Paymaster**
   - Navigate to "Paymasters"
   - Click "Create Paymaster"
   - Select "Base Sepolia"
   - Copy API Key and Paymaster URL

3. **Fund Gas Tank**
   - Go to "Gas Tank"
   - Deposit Base Sepolia ETH
   - Minimum: 0.01 ETH recommended

4. **Create Paymaster Policy**
   - Click "Add Policy"
   - Select "Contract Whitelist"
   - Add your deployed Counter contract address
   - Whitelist functions: `increment()` and `setNumber(uint256)`

### Phase 5: Biconomy Bundler Setup

1. **Get Bundler URL**
   - Navigate to "Bundlers" tab
   - Find Base Sepolia entry
   - Copy Bundler URL
   - Format: `https://bundler.biconomy.io/api/v2/84532/...`

### Phase 6: Frontend Setup

1. **Create Next.js app**
   ```bash
   cd ~/base-learning/base-learning-biconomy/myproject
   yarn create next-app my-app
   # Choose: TypeScript, App Router, Tailwind CSS
   ```

2. **Install dependencies**
   ```bash
   cd my-app
   yarn add @biconomy/account @biconomy/bundler @biconomy/paymaster @biconomy/modules
   yarn add @particle-network/auth-core-modal @particle-network/chains ethers@5
   ```

### Phase 7: Particle Network Setup

1. **Create Particle account**
   - Visit: https://dashboard.particle.network/
   - Create new project
   - Create new app (select "Web")

2. **Get credentials**
   - Copy Project ID
   - Copy Client Key
   - Copy App ID

### Phase 8: Frontend Configuration

1. **Create `.env.local`**
   ```env
   # Particle Network
   NEXT_PUBLIC_PARTICLE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_PARTICLE_CLIENT_KEY=your_client_key
   NEXT_PUBLIC_PARTICLE_APP_ID=your_app_id

   # Biconomy
   NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY=your_paymaster_api_key
   NEXT_PUBLIC_BICONOMY_PAYMASTER_URL=your_paymaster_url
   NEXT_PUBLIC_BICONOMY_BUNDLER_URL=your_bundler_url

   # Contract
   NEXT_PUBLIC_COUNTER_CONTRACT_ADDRESS=your_deployed_counter_address
   ```

2. **Update `app/page.tsx`**
   - Replace boilerplate with Biconomy integration code
   - Initialize ParticleAuthModule
   - Create Smart Account client
   - Implement gasless transaction functions

### Phase 9: Smart Account & Gasless TX Implementation

**Key Code Structure:**

```typescript
// 1. Initialize Particle Auth
const particle = new ParticleAuthModule.ParticleNetwork({
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID,
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY,
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID,
  chainName: "Base",
  chainId: 84532,
});

// 2. Get EOA Provider
const provider = new ethers.providers.Web3Provider(
  particle.provider,
  "any"
);

// 3. Create Smart Account
const smartAccount = await createSmartAccountClient({
  signer: provider.getSigner(),
  bundlerUrl: process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_URL,
  biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY,
});

// 4. Build & Send UserOp
const userOp = await smartAccount.buildUserOp([transaction]);
const userOpResponse = await smartAccount.sendUserOp(userOp);
await userOpResponse.wait();
```

### Phase 10: Validation & Testing

1. **Connect wallet** (using Particle social login)
2. **Check smart account address** (should be displayed)
3. **Execute gasless transaction** (increment or setNumber)
4. **Verify on BaseScan**:
   - Check UserOperation on bundler
   - Confirm Paymaster sponsored gas
   - Verify contract state updated

## 🔗 Important URLs

- **Base Sepolia RPC:** `https://sepolia.base.org`
- **Base Sepolia Explorer:** `https://sepolia.basescan.org`
- **Base Sepolia Faucet:** `https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet`
- **Biconomy Dashboard:** `https://dashboard.biconomy.io/`
- **Particle Network Dashboard:** `https://dashboard.particle.network/`

## 📝 Environment Variables Checklist

- [ ] `NEXT_PUBLIC_PARTICLE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_PARTICLE_CLIENT_KEY`
- [ ] `NEXT_PUBLIC_PARTICLE_APP_ID`
- [ ] `NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY`
- [ ] `NEXT_PUBLIC_BICONOMY_PAYMASTER_URL`
- [ ] `NEXT_PUBLIC_BICONOMY_BUNDLER_URL`
- [ ] `NEXT_PUBLIC_COUNTER_CONTRACT_ADDRESS`

## 🐛 Common Issues & Solutions

### "Paymaster validation failed"
- Ensure contract address is whitelisted in Biconomy policy
- Check gas tank has sufficient funds
- Verify function selectors are whitelisted

### "Bundler rejected userOp"
- Confirm Bundler URL is correct for Base Sepolia
- Check smart account has proper initialization
- Verify nonce management

### "Particle login not working"
- Clear browser cache/cookies
- Check Project ID, Client Key, App ID are correct
- Ensure app is configured for "Web" platform

## 📚 Resources

- [Biconomy Documentation](https://docs.biconomy.io/)
- [Particle Network Docs](https://docs.particle.network/)
- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)
- [Base Documentation](https://docs.base.org/)
- [Foundry Book](https://book.getfoundry.sh/)

## 🎯 Success Criteria

- ✅ Counter contract deployed to Base Sepolia
- ✅ Biconomy Paymaster configured and funded
- ✅ Bundler URL obtained
- ✅ Particle Network integrated for social login
- ✅ Smart Account created successfully
- ✅ Gasless transactions executed (increment/setNumber)
- ✅ Transactions confirmed on BaseScan
- ✅ Paymaster sponsorship verified in dashboard

## 🚀 Next Steps After Completion

1. Add more complex contract interactions
2. Implement batch transactions
3. Add session keys for improved UX
4. Deploy to Base mainnet
5. Integrate with your existing dApps

---

**Created:** December 1, 2025  
**Base Learning Journey:** Account Abstraction with Biconomy
