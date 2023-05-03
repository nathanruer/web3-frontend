'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div
    className="justify-center items-center">
      <PuffLoader
        size={25}
        color="black"
      />
    </div>
   );
}
 
export default Loader;