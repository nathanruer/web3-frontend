'use client';

import './globals.css'

import { Roboto } from "next/font/google"

import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';

const font = Roboto({
  subsets: ["latin"],
  weight: "500",
});

export const metadata = {
  title: 'Web3 App - Nathan Ruer',
  description: 'Simple Web3 App using Next 13!',
}

import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, polygon, arbitrum, optimism, avalanche } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Chain } from 'wagmi/chains';

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

const { connectors } = getDefaultWallets({
  appName: 'Web3Modal Connect Wallet',
  projectId: process.env.PROJECT_ID,
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

import '@rainbow-me/rainbowkit/styles.css';
import Footer from './components/Footer';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gradient-to-r from-gray-900 to-gray-600 text-white
       ${font.className}`}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider 
          chains={chains}
          modalSize="compact"
          coolMode
          showRecentTransactions={true}
          theme={lightTheme({
            accentColor: '#E2E2E2',
            accentColorForeground: 'black',
          })}>
            <ClientOnly>
              <Navbar />
              {children}
              <Footer />
            </ClientOnly>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
