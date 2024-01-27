"use client";
import React from "react";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import CardCharacter from "../cardCharacter/page";

const Home = () => {
  return (
    <div>
      <Navbar />
      <CardCharacter />
      <Footer />
    </div>
  );
};

export default Home;
