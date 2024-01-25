import React from "react";
import { Navbar, Footer, CardCharacter } from "../../components/index";

export const Home = async () => {
  return (
    <div>
      <Navbar />
      <CardCharacter />
      <Footer />
    </div>
  );
};
