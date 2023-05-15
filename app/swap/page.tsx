'use client';

import { useState, useEffect } from "react";

import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'
import ConnectWalletButton from '../components/ConnectWalletButton';

import useInputCoinsInModal from "../hooks/useInputCoinsInModal";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import Fetching from "../components/Fetching";
import useInputCoinsOutModal from "../hooks/useInputCoinsOutModal";
import InputCoinsOutModal from "../components/modals/InputCoinsOutModal";
import InputCoinsInModal from "../components/modals/InputCoinsInModal";

import { quoteAmount } from "../utils/quoteAmount";
import { getCryptoPrice } from "../utils/fetchPriceCoingecko";

import { BsInfoCircle } from 'react-icons/bs';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

const Swap = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()


  //------- HANDLE SELECT TOKEN IN -------//
  const [isInputInFocused, setIsInputInFocused] = useState(false);
  const inputCoinsInModal = useInputCoinsInModal();
  const [tokenInLabel, setTokenInLabel] = useState("WETH");
  const [tokenInAddress, setTokenInAddress] = useState("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
  const [tokenInGeckoId, setTokenInGeckoId ] = useState("weth");
  async function handleSelectTokenIn(
    tokenLabel: string, 
    tokenAddress: string, 
    tokenGeckoId: string
  ) {
    setTokenInLabel(tokenLabel);
    setTokenInAddress(tokenAddress);
    setTokenInGeckoId(tokenGeckoId);

    if (amountIn) {
      setIsAmountOutLoading(true);
      setIsAmountOutGeckoLoading(true);
      const amountOut = await quoteAmount(tokenAddress, tokenOutAddress, amountIn);
      setAmountOut(amountOut);
      updateTokenOutGeckoPrice(tokenOutGeckoId, amountOut);
      setIsAmountOutLoading(false);
      setIsAmountOutGeckoLoading(false);
    }
  }
  const [showMessageTokenIn, setShowMessageTokenIn] = useState(false);
  const handleMouseEnterTokenIn = () => {
    setShowMessageTokenIn(true);
  };
  const handleMouseLeaveTokenIn = () => {
    setShowMessageTokenIn(false);
  };

  //------- HANDLE SELECT TOKEN OUT -------//
  const [isInputOutFocused, setIsInputOutFocused] = useState(false);
  const inputCoinsOutModal = useInputCoinsOutModal();
  const [tokenOutLabel, setTokenOutLabel] = useState("USDC");
  const [tokenOutAddress, setTokenOutAddress] = useState("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
  const [tokenOutGeckoId, setTokenOutGeckoId ] = useState("usd-coin");
  async function handleSelectTokenOut(
    tokenLabel: string, 
    tokenAddress: string, 
    tokenGeckoId: string
  ) {
    setTokenOutLabel(tokenLabel);
    setTokenOutAddress(tokenAddress);
    setTokenOutGeckoId(tokenGeckoId)

    if (amountIn) {
      setIsAmountOutLoading(true);
      setIsAmountOutGeckoLoading(true);
      const amountOut = await quoteAmount(tokenInAddress, tokenAddress, amountIn);
      setAmountOut(amountOut);
      setIsAmountOutLoading(false);
      setIsAmountOutGeckoLoading(false);
    }
  }
  const [showMessageTokenOut, setShowMessageTokenOut] = useState(false);
  const handleMouseEnterTokenOut = () => {
    setShowMessageTokenOut(true);
  };
  const handleMouseLeaveTokenOut = () => {
    setShowMessageTokenOut(false);
  };

  //------- HANDLE SWITCH TOKENS -------//
  async function handleSwitchTokens() {
    // TO DO : wait token addresses to correctly change before quoting new amount
    setTokenInLabel(tokenOutLabel);
    setTokenInAddress(tokenOutAddress);
    setTokenInGeckoId(tokenOutGeckoId);

    setTokenOutLabel(tokenInLabel);
    setTokenOutAddress(tokenInAddress);
    setTokenOutGeckoId(tokenInGeckoId);

    if (amountIn) {
      setIsAmountOutLoading(true);
      setIsAmountOutGeckoLoading(true);
      const amountOut = await quoteAmount(tokenOutAddress, tokenInAddress, amountIn);
      setAmountOut(amountOut);
      setIsAmountOutLoading(false);
      setIsAmountOutGeckoLoading(false);
    }
  }

  //------- HANDLE SELECT AMOUNT IN -------//
  const [amountIn, setAmountIn] = useState("");
  const [isAmountInLoading, setIsAmountInLoading] = useState(false);
  const [amountInGecko, setAmountInGecko] = useState<number | null>(null);
  const [isAmountInGeckoLoading, setIsAmountInGeckoLoading] = useState(false);
  async function handleAmountInChanged(e: string) {
    setAmountIn(e);
    try {
      if (e === '') {
        setAmountOut('');
        return;
      } else if (e === '0') {
        setAmountOut('0');
        return;
      }
      updateTokenInGeckoPrice(tokenInGeckoId, e);

      setIsAmountOutLoading(true);
      setIsAmountOutGeckoLoading(true);

      const amountOut = await quoteAmount(tokenInAddress, tokenOutAddress, e);
      setAmountOut(amountOut);
      updateTokenOutGeckoPrice(tokenOutGeckoId, amountOut);

      setIsAmountOutGeckoLoading(false);
      setIsAmountOutLoading(false);
    } catch (error) {
      console.error("Error while quoting amount out:", error);
    }
  }

  //------- HANDLE SELECT AMOUNT OUT -------//
  const [amountOut, setAmountOut] = useState("");
  const [isAmountOutLoading, setIsAmountOutLoading] = useState(false);
  const [amountOutGecko, setAmountOutGecko] = useState<number | null>(null);
  const [isAmountOutGeckoLoading, setIsAmountOutGeckoLoading] = useState(false);
  async function handleAmountOutChanged(e: string) {
    setAmountOut(e);
    try {
      if (e === '') {
        setAmountIn('');
        return;
      } else if (e === '0') {
        setAmountIn('0');
        return;
      }
      updateTokenOutGeckoPrice(tokenOutGeckoId, e);

      setIsAmountInLoading(true);
      setIsAmountInGeckoLoading(true);

      const amountOutGecko = await getCryptoPrice(tokenOutGeckoId, e);
      setAmountOutGecko(amountOutGecko);
      const amountIn = await quoteAmount(tokenOutAddress, tokenInAddress, e);
      setAmountIn(amountIn);
      updateTokenInGeckoPrice(tokenInGeckoId, amountIn);

      setIsAmountInGeckoLoading(false);
      setIsAmountInLoading(false);
    } catch (error) {
      console.error("Error while quoting amount out:", error);
    }
  }

  //------- HANDLE TOKEN BALANCES -------//
  const { data: tokenInBalance, isLoading: isTokenInBalanceLoading } = useBalance({
    address: address,
    token: `0x${tokenInAddress.slice(2)}`,
  });
  const { data: tokenOutBalance, isLoading: isTokenOutBalanceLoading } = useBalance({
    address: address,
    token: `0x${tokenOutAddress.slice(2)}`,
  });

  //------- HANDLE SWAP -------//
  async function handleSwap() {
    // TODO: CREATE THE REAL SWAP FUNCTION
    console.log("Swap de", amountIn, tokenInLabel, ":", tokenInAddress, "vers", tokenOutLabel, ":", tokenOutAddress)
  }

  //------- UPDATE COINGECKO TOKENS PRICES -------//
  async function updateTokenInGeckoPrice(tokenGeckoId: string, amount: string) {
    const amountInGecko = await getCryptoPrice(tokenGeckoId, amount);
    setAmountInGecko(amountInGecko);
  }
  async function updateTokenOutGeckoPrice(tokenGeckoId: string, amount: string) {
    const amountOutGecko = await getCryptoPrice(tokenGeckoId, amount);
    setAmountOutGecko(amountOutGecko);
  }
  useEffect(() => {
    updateTokenOutGeckoPrice(tokenOutGeckoId, amountOut);
  }, [tokenOutGeckoId, amountOut]);
  useEffect(() => {
    updateTokenInGeckoPrice(tokenInGeckoId, amountIn);
  }, [tokenInGeckoId, amountIn]);
  
  return (
    <div>
      <Heading  
        title="Swap"
        subtitle="Swap ERC20 tokens using Uniswap V2 (only on Mainnet for now)"
      />
      
      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 border
      shadow-md shadow-white relative">
        <div className={`p-3 flex flex-col justify-center text-black
        rounded-xl mb-1 border
        ${isInputInFocused ? 'border-white ' : 'border-gray-600'}`}>
          <div className="flex items-center gap-2">
            {isAmountInLoading ?
            ( <div className="w-full p-2 rounded-xl bg-transparent text-white"><Loader color="white"/></div> )
            : ( 
            <input
              type="number"
              value={amountIn}
              placeholder="Enter value"
              onFocus={() => setIsInputInFocused(true)}
              onBlur={() => setIsInputInFocused(false)}
              onChange={(e) => handleAmountInChanged(e.target.value)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />)}
            
            <button
              onClick={inputCoinsInModal.onOpen}
              className="flex w-[220px] text-black bg-white py-2 px-4 hover:bg-white/80 
              transition rounded-xl items-center justify-between"
            >
              {tokenInLabel}<MdOutlineKeyboardArrowDown />
            </button>
          </div>
          <div className="flex text-align justify-between p-1
          text-gray-400 font-light text-sm relative">
            {amountIn && amountInGecko && !isAmountInGeckoLoading ? (
              <div className="flex gap-1 items-center">
                <BsInfoCircle
                  onMouseEnter={handleMouseEnterTokenIn}
                  onMouseLeave={handleMouseLeaveTokenIn}
                  className="cursor-pointer"
                />
                {showMessageTokenIn && (
                  <div className="absolute bg-white p-1 rounded shadow top-[-30px] left-0">
                    <div className="relative">
                      <div className="bg-white rounded shadow">
                        <p className="text-gray-800 relative z-10">Live price feed from coingecko</p>
                      </div>
                      <div className="absolute top-[10px] w-4 h-4 bg-white transform rotate-45 z-0"></div>
                    </div>
                  </div>
                )}
                <p>${amountInGecko}</p>
              </div>
            ) : null}
            <div>
              {isConnected && 
                <Fetching 
                  isFetching={isTokenInBalanceLoading}
                  fetchingLabel="Balance fetching..."
                  label={`Balance: ${tokenInBalance?.formatted ?? 0}`}
                />
              }
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button className="bg-white p-1 rounded-full
          hover:scale-110 transition duration-300 ease-in-out"
          onClick={handleSwitchTokens}>
            <CgArrowsExchangeAltV className="text-gray-900 text-2xl" />
          </button>
        </div>


        <div className={`p-3 flex flex-col justify-center text-black
        rounded-xl mb-1 border
        ${isInputOutFocused ? 'border-white ' : 'border-gray-600'}`}>
          <div className="flex items-center gap-2">
            {isAmountOutLoading ?
            ( <div className="w-full p-2 rounded-xl bg-transparent text-white"><Loader color="white"/></div> )
            : ( 
            <input
              type="number"
              value={amountOut}
              placeholder="Enter value"
              onFocus={() => setIsInputOutFocused(true)}
              onBlur={() => setIsInputOutFocused(false)}
              onChange={(e) => handleAmountOutChanged(e.target.value)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />)}

            <button
              onClick={inputCoinsOutModal.onOpen}
              className="flex w-[220px] text-black bg-white py-2 px-4 hover:bg-white/80 
              transition rounded-xl items-center justify-between"
            >
              {tokenOutLabel}<MdOutlineKeyboardArrowDown />
            </button>
          </div>
          <div className="flex text-align justify-between p-1
          text-gray-400 font-light text-sm relative">
            {amountOut && amountOutGecko && !isAmountOutGeckoLoading ? (
              <div className="flex gap-1 items-center">
                <BsInfoCircle
                  onMouseEnter={handleMouseEnterTokenOut}
                  onMouseLeave={handleMouseLeaveTokenOut}
                  className="cursor-pointer"
                />
                {showMessageTokenOut && (
                  <div className="absolute bg-white p-1 rounded shadow top-[-30px] left-0">
                    <div className="relative">
                      <div className="bg-white rounded shadow">
                        <p className="text-gray-800 relative z-10">Live price feed from coingecko</p>
                      </div>
                      <div className="absolute top-[10px] w-4 h-4 bg-white transform rotate-45 z-0"></div>
                    </div>
                  </div>
                )}
                <p>${amountOutGecko}</p>
              </div>
            ) : null}
            <div>
              {isConnected && 
                <Fetching 
                  isFetching={isTokenOutBalanceLoading}
                  fetchingLabel="Balance fetching..."
                  label={`Balance: ${tokenOutBalance?.formatted ?? 0}`}
                />
              }
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
            {isConnected ? (
              chain?.name === 'Localhost' || 'Mainnet' ? (
                <Button label='Swap' onClick={handleSwap} />
              ) : (
                <Button label='Switch to Mainnet' onClick={() => switchNetwork?.(1)} />
              )
            ) : (
              <ConnectWalletButton />
            )}
          </div>
      </div>

      <InputCoinsInModal
        onSelectToken={handleSelectTokenIn}
      />
      <InputCoinsOutModal 
        onSelectToken={handleSelectTokenOut}
      />
    </div>
  );
};

export default Swap;
