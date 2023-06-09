import setGetNumberABI from "./SetGetNumberABI.json";

export const SetGetNumber_contractAddress = "0x56bb8116e453A7B05155aC8C159cFB3a7A5Db02a";
export const SetGetNumber_contractABI = setGetNumberABI.abi;

export const links = [
  {
    label: 'Send',
    href: 'send'
  },
  {
    label: 'Write',
    href: 'write'
  },
  {
    label: 'Read',
    href: 'read'
  },
  {
    label: 'Swap',
    href: 'swap'
  },
  {
    label: 'New Uniswap v2 pools',
    href: 'event-newpools'
  }
]

export const coins = [
  {
    symbol: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    geckoId: 'weth',
  },
  {
    symbol: 'UNI',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    geckoId: 'uniswap',
  },
  {
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    geckoId: 'usd-coin',
  },
  {
    symbol: 'AAVE',
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    geckoId: 'aave'
  },
  {
    symbol: 'FXS',
    address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
    geckoId: 'frax-share',
  },
  {
    symbol: 'CNC',
    address: '0x9aE380F0272E2162340a5bB646c354271c0F5cFC',
    geckoId: 'conic-finance',
  },
]