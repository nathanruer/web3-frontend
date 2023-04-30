'use client';
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "./Logo";
import NavbarItem from "./NavbarItem";
import ConnectWalletButton from "../ConnectWalletButton";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-full py-6">
      <div className="max-w-[2520px] mx-auto px-10">
        <div className="flex flex-row justify-between items-center">
          <Logo />
          <div className="hidden md:flex flex-row justify-center md:gap-5 lg:gap-10">
            <NavbarItem label="About us" />
            <NavbarItem label="Tokenomics" />
            <NavbarItem label="Earn" />
            <NavbarItem label="Contact us" />
          </div>
          <ConnectWalletButton />
          <div className="md:hidden">
            <FaBars onClick={toggleMenu} color="white" />
          </div>
        </div>
      </div>
      
      {showMenu && (
        <div className="justify-center items-center flex 
        overflow-x-hidden overflow-y-auto fixed inset-0 
        z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="bg-gradient-to-b from-gray-900 to-gray-600 shadow-xl
          fixed top-0 right-0 h-full w-4/5 md:hidden">
            <div className="flex flex-col justify-center items-center gap-5 h-full">
              <IoMdClose color="white" onClick={toggleMenu}/>
              <NavbarItem label="About us" />
              <NavbarItem label="Tokenomics" />
              <NavbarItem label="Earn" />
              <NavbarItem label="Contact us" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
