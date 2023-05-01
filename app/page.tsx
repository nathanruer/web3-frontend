'use client';

import AboutUs from "./components/aboutUs/AboutUs";
import Claim from "./components/claim/Claim";
import Send from "./components/send/Send";
import Tokenomics from "./components/tokenomics/Tokenomics";

export default function Home() {
  return(
    <>
      <Send />
      <AboutUs />
      <Claim />
      <Tokenomics />
    </>
  )
}
