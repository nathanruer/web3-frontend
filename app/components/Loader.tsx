'use client';

import { PuffLoader } from "react-spinners";

interface LoaderProps {
  color: string;
}

const Loader: React.FC<LoaderProps> = ({
  color,
}) => {
  return ( 
    <div
    className="justify-center items-center">
      <PuffLoader
        size={25}
        color={`${color}`}
      />
    </div>
   );
}
 
export default Loader;