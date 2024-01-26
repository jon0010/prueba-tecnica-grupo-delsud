"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import CardCharacter from "../cardCharacter/page";
import CharacterDetail from "../cardCharacter/[characterId]/page";
import fetchCharacterDetails from "../actions/fetchCaracterDetails/index";
import { ICharacterDetail } from "../interfaces/CharacterDetail/index";

const Home = () => {
  const [characterDetail, setCharacterDetail] =
    useState<ICharacterDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCharacterDetails("characterId");
        setCharacterDetail(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>cargando</div>;
  }

  return (
    <div>
      <Navbar />
      <CardCharacter />
      {characterDetail && <CharacterDetail characterDetail={characterDetail} />}
      <Footer />
    </div>
  );
};

export default Home;
