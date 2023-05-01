'use client';

import AboutUs from "./components/aboutUs/AboutUs";
import Claim from "./components/claim/Claim";
import Tokenomics from "./components/tokenomics/Tokenomics";

export default function Home() {
  return(
    <>
      <AboutUs />
      <Claim />
      <Tokenomics />
    </>
  )
}
