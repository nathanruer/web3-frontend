'use client';

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
  
  const handleClick = async () => {
    const target = document.querySelector(href);
    
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset,
        behavior: 'smooth'
      });
    }
  };

  return ( 
    <div 
      onClick={() => {
        handleClick();
        if (onClick) {
          onClick();
        }
      }}
      className={`text-white cursor-pointer hover:opacity-80 
        ${mobile ? '' : 'hover:scale-110 transition duration-300 ease-in-out'}
      `}
    >
      {label}
    </div>
   );
}
 
export default NavbarItem;
