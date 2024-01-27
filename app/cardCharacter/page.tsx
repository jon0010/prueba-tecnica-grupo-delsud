"use client";
import React, { useState, useEffect } from "react";
import fetchFiftyCharacters from "../actions/fetchFiftyCharacters/index";
import fetchCharacterDetails from "../actions/fetchCaracterDetails";
import { ICharacter, ICharacterDetail } from "@/app/interfaces";
import { RiStarLine } from "react-icons/ri";
import Pagination from "../pagination/page";
import CharacterModal from "../characterDetailModal/characterModal";
import SearchBar from "../searchBar/page";
import styles from "../cardCharacter/card.module.css";

const CardCharacter: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacterDetail | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFiftyCharacters();
        if (result.characters) {
          setCharacters(result.characters);
        } else {
          console.error("Error fetching data:", result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log({ characters });

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = characters.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleConsoleLog = () => {
    console.log("aaaaaaaaaaaaaaaa");
  };

  const handleCardClick = async (character: ICharacter) => {
    try {
      const result = await fetchCharacterDetails(character.id.toString());
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

  return (
    <div className="row px-0">
      <div className="col-2 col-sm-0 d-none d-sm-block"></div>
      <div className="col-8 container-fluid p-0">
      <div className="mt-3">
          <SearchBar />
        </div>
        <div className={`row justify-content-center ${styles["card-row"]}`}>
          {currentCards.map((character, index) => (
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
                <div className="">
                  <RiStarLine
                    onClick={() => handleConsoleLog()}
                    className="fs-2 mt-2 text-white-50"
                  />
                </div>
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
          ))}
        </div>
        <div className="mt-3">
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={characters.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
      <div className="col-2 col-sm-0 d-none d-sm-block"></div>

      {showModal && selectedCharacter && (
        <CharacterModal
          characterDetails={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CardCharacter;
