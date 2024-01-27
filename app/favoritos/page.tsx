"use client";
import React, { useEffect, useState } from "react";
import { ICharacter, ICharacterDetail } from "../interfaces/index";
import fetchCaracterDetails from "../actions/fetchCaracterDetails/index";
import CharacterModal from "../characterDetailModal/characterModal";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import { Bangers } from "next/font/google";
import Pagination from "../pagination/page";
import styles from "../cardCharacter/card.module.css";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const Favoritos = () => {
  const [favorites, setFavorites] = useState<ICharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacterDetail | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as ICharacter[];
    setFavorites(storedFavorites);
  }, []);

  const handleCardClick = async (character: ICharacter) => {
    try {
      const result = await fetchCaracterDetails(character.id.toString());
      if (result) {
        setSelectedCharacter(result);
        setShowModal(true);
      } else {
        console.error("Error fetching character details:", console.error);
      }
    } catch (error) {
      console.error("Error fetching character details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  favorites.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="row px-0">
      <Navbar />
      <div className="col-2 col-sm-0 d-none d-sm-block"></div>
      <div className="col-8 container-fluid p-0">
        <h1
          className={`modal-title ${bangers.className} ${styles["titleDetail"]} text-warning text-center`}
        >
          favorites
        </h1>
        <div className="mt-3">
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={favorites.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
        <div className={`row justify-content-center ${styles["card-row"]}`}>
          {favorites.map((character, index) => {
            const lowercaseName = character.name.toLowerCase();
            const isComic = lowercaseName.includes("comic");
            return !isComic ? (
              <div
                key={index}
                className={`col-12 col-sm-6 col-md-3 col-lg-3 ${styles["card-wrapper"]} ${styles["custom-breakpoint-class"]}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(character)}
              >
                <div
                  className={`card mt-4 d-flex flex-row-reverse flex-wrap align-content-start justify-content-start align-items-center ${styles.card} ${styles["custom-animation-class"]}`}
                  style={{
                    backgroundImage: `url('${character.thumbnail.path}.${character.thumbnail.extension}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    cursor: "pointer",
                  }}
                >
                  <div className={`card-text ${styles["card-text"]}`}>
                    <p
                      className="d-flex justify-content-start ms-2"
                      style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
                    >
                      {character.name}
                    </p>
                  </div>
                  <span className="top spanCard"></span>
                  <span className="right spanCard"></span>
                  <span className="bottom spanCard"></span>
                  <span className="left spanCard"></span>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
      <div className="col-2 col-sm-0 d-none d-sm-block"></div>
      {showModal && selectedCharacter && (
        <CharacterModal
          characterDetails={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default Favoritos;
