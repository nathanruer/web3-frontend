'use client';

import { useAccount } from 'wagmi'
import ConnectWalletButton from '../ConnectWalletButton';

const Claim = () => {
  const { address, isConnected } = useAccount()

  return (
    <div className='p-5'>
      <div className="w-2/3 lg:w-1/3 mx-auto border
       rounded-xl font-semibold p-3 shadow-md shadow-white">
        <p id="claim" className='text-center text-2xl'>
          Get SHIT now
        </p>
        <p className='text-gray-400 text-center'>
          A total of 21 000 000 SHITCOIN are now available to be claimed by those who
          have claimed the BTC airdrop. $SHIT tokens that have not been claimed
          within 31 days will be burned.
        </p>
        <div className='p-3 flex justify-center'>
          {isConnected ? 
          <button className='w-1/2 bg-white rounded-xl text-gray-900 p-2'>
            Claim
          </button>
          :
          <ConnectWalletButton />
          }
        </div>
    </div>
  </div>
  )
}

export default Claim
