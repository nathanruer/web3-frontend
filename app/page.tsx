'use client';

import Send from "./pages/Send";
import Footer from "./components/Footer";
import AboutMe from "./pages/AboutMe";
import Read from "./pages/Read";
import Write from "./pages/Write";
import Swap from "./pages/Swap";

export default function Home() {
  return(
    <>
      <AboutMe />
      <Send />
      <Write />
      <Read />
      <Swap />
      <Footer />
    </>
  )
}
