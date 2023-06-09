'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface NavbarItemProps {
  label: string;
  mobile?: boolean;
  href: string;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  mobile,
  href,
  onClick
}) => {
  const router = useRouter();

  function useOnClick(href:string) {
    router.push(`${href}`);
    if (onClick) {
      onClick();
    }
  }

  return ( 
    <div 
      onClick={() => useOnClick(href)}
      className={`text-white cursor-pointer hover:opacity-80 
        ${mobile ? '' : 'hover:scale-110 transition duration-300 ease-in-out'}
      `}
    >
      {label}
    </div>
   );
}
 
export default NavbarItem;
