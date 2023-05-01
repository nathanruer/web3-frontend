'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains } from 'wagmi';
import { mainnet, goerli, polygon, arbitrum, optimism, avalanche } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Chain } from 'wagmi/chains';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const localhostChain: Chain = {
  id: 31337,
  name: 'Localhost',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
    public: {
      http: ['https://localhost:8545'],
    },
  },
  testnet: false,
};
const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, arbitrum, optimism, avalanche, localhostChain],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
    publicProvider()
  ]
);


interface ConnectWalletButtonProps {
  label: string;
  mobile?: boolean;
}

const ConnectWalletButton = () => {
  return (
      <RainbowKitProvider 
        chains={chains}
        modalSize="compact"
        coolMode
        showRecentTransactions={true}
        theme={lightTheme({
          accentColor: '#E2E2E2',
          accentColorForeground: 'black',
        })}>
        <ConnectButton chainStatus="icon" />
      </RainbowKitProvider>
  )
}

export default ConnectWalletButton