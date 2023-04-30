'use client';

import useConnectWalletModal from "@/app/hooks/useConnectWalletModal";
import Button from "../Button";
import Logo from "./Logo";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const connectWalletModal = useConnectWalletModal();

  return (
    <div className="w-full py-6">
      <div className="max-w-[2520px] mx-auto xl:px-20 
      md:px-10 sm:px-2 px-4">
        <div className="flex flex-row items-center 
        justify-between">
          <Logo />
          <div className="flex flex-row justify-center
          gap-5 md:gap-10">
            <NavbarItem 
              label="About us"
            />
            <NavbarItem 
              label="Tokenomics"
            />
            <NavbarItem 
              label="Earn"
            />
            <NavbarItem 
              label="Contact us"
            />
          </div>
          <Button
            label="Connect Wallet"
            onClick={connectWalletModal.onOpen}
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar;