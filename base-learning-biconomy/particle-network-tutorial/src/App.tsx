import React, { useState, useEffect } from 'react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { BaseSepolia } from '@particle-network/chains';
import { AAWrapProvider, SmartAccount, SendTransactionMode } from '@particle-network/aa';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const [balance, setBalance] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [transactionAmount, setTransactionAmount] = useState<string>('');

  // Initialize SmartAccount after login
  useEffect(() => {
    const initSmartAccount = async () => {
      if (provider && userInfo) {
        const smartAccountInstance = new SmartAccount(provider, {
          projectId: process.env.REACT_APP_PROJECT_ID!,
          clientKey: process.env.REACT_APP_CLIENT_KEY!,
          appId: process.env.REACT_APP_APP_ID!,
          aaOptions: {
            accountContracts: {
              SIMPLE: [
                {
                  version: '2.0.0',
                  chainIds: [BaseSepolia.id],
                },
              ],
            },
          },
        });

        const aaProvider = new AAWrapProvider(
          smartAccountInstance,
          SendTransactionMode.Gasless
        );

        const address = await smartAccountInstance.getAddress();
        setUserAddress(address);
        setSmartAccount(smartAccountInstance);

        // Get balance
        const ethersProvider = new ethers.providers.Web3Provider(
          aaProvider as any,
          'any'
        );
        const balanceResponse = await ethersProvider.getBalance(address);
        setBalance(ethers.utils.formatEther(balanceResponse));
      }
    };

    initSmartAccount();
  }, [provider, userInfo]);

  // Handle login
  const handleLogin = async () => {
    if (!userInfo) {
      await connect();
    }
  };

  // Execute user operation (send transaction)
  const executeUserOp = async () => {
    if (!smartAccount || !recipientAddress || !transactionAmount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const aaProvider = new AAWrapProvider(
        smartAccount,
        SendTransactionMode.Gasless
      );
      const ethersProvider = new ethers.providers.Web3Provider(
        aaProvider as any,
        'any'
      );
      const signer = ethersProvider.getSigner();

      const tx = {
        to: recipientAddress,
        value: ethers.utils.parseEther(transactionAmount),
      };

      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();

      alert(
        `Transaction successful!\nHash: ${txReceipt.transactionHash}`
      );

      // Update balance after transaction
      const balanceResponse = await ethersProvider.getBalance(
        userAddress!
      );
      setBalance(ethers.utils.formatEther(balanceResponse));

      // Clear form
      setRecipientAddress('');
      setTransactionAmount('');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. See console for details.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Particle Network + Base Sepolia</h1>

        {!userInfo ? (
          <button onClick={handleLogin}>Connect Wallet</button>
        ) : (
          <div>
            <h2>Wallet Info</h2>
            <p>
              <strong>User Email:</strong> {userInfo.email || 'N/A'}
            </p>
            <p>
              <strong>Smart Account Address:</strong>
              <br />
              {userAddress}
            </p>
            <p>
              <strong>Balance:</strong> {balance} ETH
            </p>

            <div style={{ marginTop: '30px' }}>
              <h3>Send Transaction</h3>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                style={{
                  width: '400px',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              />
              <br />
              <input
                type="text"
                placeholder="Amount (ETH)"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                style={{
                  width: '400px',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              />
              <br />
              <button
                onClick={executeUserOp}
                style={{ padding: '10px 20px', cursor: 'pointer' }}
              >
                Send Transaction
              </button>
            </div>

            <button
              onClick={disconnect}
              style={{
                marginTop: '30px',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              Disconnect
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
