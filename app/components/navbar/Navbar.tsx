'use client';

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../Logo";
import NavbarItem from "./NavbarItem";
import ConnectWalletButton from "../ConnectWalletButton";
import { IoMdClose } from "react-icons/io";

import { links } from "@/data/constants";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="w-full py-6 relative">
      <div className="max-w-[2520px] mx-auto px-10">
        <div className="flex flex-row justify-between items-center">
          <Logo />
          
          <div className="hidden md:flex flex-row justify-center md:gap-5 lg:gap-10"> 
            {links.map((item) => (
              <>
                <NavbarItem 
                  href={item.href} 
                  label={item.label}
                />
              </>
            ))}
          </div>

          <ConnectWalletButton />
          
          <div className="md:hidden">
            <FaBars onClick={toggleMenu} color="white" 
            className="hover:scale-110 transition hover:opacity-80" />
          </div>
        </div>
      </div>
      
      {showSidebar && (
        <div className="md:hidden flex overflow-x-hidden overflow-y-auto
        fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="bg-gradient-to-b from-gray-900 to-gray-600 shadow-xl
          fixed top-0 right-0 h-full w-3/5 overflow-auto">
            <div className="flex flex-col gap-5 h-full
            py-6 px-10">
              <div className="flex justify-between mb-5">
                <Logo />
                <IoMdClose color="white" size={25} onClick={toggleMenu}
                className="hover:scale-110 transition hover:opacity-80"/>
              </div>
              <div className="flex flex-col">
                {links.map((item) => (
                <>
                  <NavbarItem 
                    href={item.href} 
                    label={item.label} 
                    mobile 
                    onClick={toggleMenu}
                  />
                  <hr className="my-6"/>
                </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
