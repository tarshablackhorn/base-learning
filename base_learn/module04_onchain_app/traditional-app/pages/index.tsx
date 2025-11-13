import WalletConnect from '../components/WalletConnect';

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui' }}>
      <h1>RainbowKit + wagmi — Base Sepolia</h1>
      <p>If the button shows, rendering is fixed.</p>
      <WalletConnect />
    </main>
  );
}
