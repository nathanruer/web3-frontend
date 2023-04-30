'use client';

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  label
}) => {
  return ( 
    <div className="text-white cursor-pointer hover:opacity-80
    hover:scale-110 transition">
      {label}
    </div>
   );
}
 
export default NavbarItem;