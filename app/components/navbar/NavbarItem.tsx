'use client';

interface NavbarItemProps {
  label: string;
  mobile?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  mobile
}) => {
  return ( 
    <div className={`text-white cursor-pointer hover:opacity-80
    ${mobile ? '' : 'hover:scale-110 transition'}`
    }>
      {label}
    </div>
   );
}
 
export default NavbarItem;