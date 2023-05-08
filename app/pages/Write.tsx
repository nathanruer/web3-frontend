'use client';

import { useState, useEffect } from 'react';

import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, 
  useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import ConnectWalletButton from '../components/ConnectWalletButton';

import { SetGetNumber_contractABI, SetGetNumber_contractAddress } from '@/data/constants';

import Heading from '../components/Heading';
import Input from '../components/Input';
import Button from '../components/Button';
import TransactionModal from '../components/modals/TransactionModal';

const Write = () => {
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()

  const [inputValue, setInputValue] = useState('');

  const { config } = usePrepareContractWrite({
    address: SetGetNumber_contractAddress,
    abi: SetGetNumber_contractABI,
    functionName: 'setNumber',
    args: [inputValue],
  })
  const { data, write, error } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({hash: data?.hash,})

  useEffect(() => {
    if (isLoading) {
      setIsLoadingModalOpen(true);
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 10000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error || isError) {
      setIsErrorModalOpen(true);
      setTimeout(() => {
        setIsErrorModalOpen(false);
      }, 10000);
    }
  }, [error, isError]);

  async function handleClick() {
    try {
      if (write) {
        write();
      }
    } catch (error) {
      console.error(`Failed to send transaction: ${error}`);
    }
  }

  function handleSwitchToGoerli() {
    switchNetwork?.(5)
  }
  
  return (
    <div id="write">
      <Heading
        title="Write in a smart contract"
        subtitle="Calling a smart contract write-only method (only on Goerli)" 
      />

      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 
      border shadow-md shadow-white">
        <div className='p-3 flex flex-col justify-center text-black'>
          <Input
            id= "Number"
            label= "Number"
            type= "text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <div className='flex justify-center'>
            {isConnected ? (
              chain?.name === 'Goerli' ? (
                <Button label='Set number' onClick={handleClick} />
              ) : (
                <Button label='Switch to Goerli' onClick={handleSwitchToGoerli} />
              )
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </div>
      {isLoadingModalOpen && isLoading && 
        <TransactionModal
          isLoading 
          bgColor="white"
          textColor="gray-900"
          onClose={() => setIsLoadingModalOpen(false)} 
        />
      }
      {isSuccessModalOpen && isSuccess && 
        <TransactionModal
          isSuccess
          bgColor="green-400"
          textColor="white"
          label={`${data?.hash}`} 
          onClose={() => setIsSuccessModalOpen(false)} 
        />
      }
      {isErrorModalOpen && (error || isError) &&
        <TransactionModal
          bgColor="red-400"
          textColor="white"
          isError
          label={`${error}`}
          onClose={() => setIsErrorModalOpen(false)} 
        />
      }
    </div>
  );
};

export default Write;
