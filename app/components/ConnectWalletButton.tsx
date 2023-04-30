import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, polygon, arbitrum, optimism, avalanche } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { ConnectButton } from '@rainbow-me/rainbowkit';


const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, arbitrum, optimism, avalanche],
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

const ConnectWalletButton = () => {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider 
      chains={chains}
      modalSize="compact"
      coolMode
      theme={lightTheme({
        accentColor: '#E2E2E2',
        accentColorForeground: 'black',
      })}>
      <ConnectButton chainStatus="icon"/>
    </RainbowKitProvider>
  </WagmiConfig>
  )
}

export default ConnectWalletButton