'use client';

interface NavbarItemProps {
  label: string;
  mobile?: boolean;
  href: string,
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  mobile,
  href
}) => {
  
  const handleClick = async () => {
    window.location.href=href;
  };

  return ( 
    <div 
    onClick={handleClick}
    className={`text-white cursor-pointer hover:opacity-80
    ${mobile ? '' : 'hover:scale-110 transition'}`
    }>
      {label}
    </div>
   );
}
 
export default NavbarItem;