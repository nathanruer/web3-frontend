'use client';

import Heading from '../components/Heading';
import TechnoItem from '../components/aboutMe/TechnoItem';

import { FaReact } from "react-icons/fa"

const AboutMe = () => {
  return (
    <div id="about-me">
      <Heading
        title="About me"
        subtitle="Currently learning full stack blockchain development"
      />

      <div className='px-20'>
        <p className='text-xl text-center'>
          This app is developed with the following technologies :
        </p>
        <div className="flex items-center justify-center py-5">
          <div className="grid grid-cols md:grid-cols-2
          gap-x-10 gap-y-4">
            <TechnoItem src="../nextjs.png" label="Next.js 13" />
            <TechnoItem src="../hardhat.png" label="Hardhat" />
            <TechnoItem src="../ethers.png" label="ethers.js" />
            <TechnoItem src="../wagmi.png" label="Wagmi hooks" />
            <TechnoItem src="../tailwind.png" label="Tailwind CSS" />
          </div>
        </div>
      </div> 
    </div>
  );
};

export default AboutMe;
