'use client';

import { FaHeart, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="pt-20 pb-10 px-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-lg font-bold">
          Made with <FaHeart className="text-white inline-block" />
        </div>
        <div className="flex items-center space-x-4">
          <a className="text-white hover:text-white/80">
            <FaTwitter className="w-6 h-6 fill-current" />
          </a>
          <a className="text-white hover:text-white/80">
            <FaGithub className="w-6 h-6 fill-current" />
          </a>
          <div className="text-white">
            Version 1.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;






