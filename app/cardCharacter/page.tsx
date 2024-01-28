"use client";
import React, { useState, useEffect } from "react";
import fetchHundredCharacters from "../actions/fetchHundredCharacters/index";
import fetchCharacterDetails from "../actions/fetchCaracterDetails";
import { ICharacter, ICharacterDetail } from "@/app/interfaces";
import { FaStar } from "react-icons/fa";
import Pagination from "../components/pagination/page";
import CharacterModal from "../characterDetailModal/characterModal";
import SearchBar from "../components/searchBar/page";
import styles from "../cardCharacter/card.module.css";
import fetchCharacterOrComicByName from "../actions/fetchCharacterOrComicByName";
import fetchHundredComics from "../actions/fetchHundredComic";
import { IComicResult } from "../interfaces/Comic";
import { IHero } from "../interfaces/Character/index";
import { useRouter } from "next/navigation";
import fetchComicById from "../actions/fetchComicById";
import { useStyles } from "../setDarkMode";

const CardCharacter: React.FC = () => {
  const router = useRouter();
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [comics, setComics] = useState<IComicResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const [selectedCharacter, setSelectedCharacter] =
    useState<ICharacterDetail | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [favoriteStates, setFavoriteStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [filteredCharacters, setFilteredCharacters] = useState<
    IHero[] | IComicResult[]
  >([]);
  const [showingHeroes, setShowingHeroes] = useState(true);
  const { darkMode } = useStyles();

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const result = await fetchHundredCharacters();
        if (result.characters) {
          setHeroes(result.characters);
          setFilteredCharacters(result.characters);
        } else {
          console.error("Error fetching hero data:", result.error);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroes();
  }, []);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const result = await fetchHundredComics();
        if (result.comics) {
          setComics(result.comics);
          setFilteredCharacters(result.comics);
        } else {
          console.error("Error fetching comics:", result.error);
        }
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };

    fetchComics();
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favoriteStatesCopy: { [key: number]: boolean } = {};

    favorites.forEach((fav: ICharacter) => {
      favoriteStatesCopy[fav.id] = true;
    });

    setFavoriteStates(favoriteStatesCopy);
  }, [heroes, comics]);

  useEffect(() => {
    if (showingHeroes) {
      setFilteredCharacters(heroes);
    } else {
      setFilteredCharacters(comics);
    }
    setCurrentPage(1);
  }, [showingHeroes, heroes, comics]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCharacters.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCardClick = async (character: IHero | IComicResult) => {
    try {
      if ("id" in character) {
        const result = await fetchCharacterDetails(character.id.toString());
        if (result) {
          setSelectedCharacter(result);
          setShowModal(true);
        } else {
          console.error("Error fetching character details:", console.error);
        }
      } else {
      }
    } catch (error) {
      console.error("Error fetching character details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const handleAddFavorites = (character: IHero | IComicResult): boolean => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const existsInFavorites = favorites.some(
      (fav: ICharacter) => fav.id === character.id
    );

    if (!existsInFavorites) {
      const name =
        "name" in character ? character.name ?? "Default Name" : "Comic";

      const characterWithValidName: ICharacter = {
        id: character.id,
        name: name,
        thumbnail:
          "thumbnail" in character
            ? character.thumbnail
            : { path: "", extension: "" },
      };

      favorites.push(characterWithValidName);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return true;
    } else {
      return false;
    }
  };

  const handleAddFavoritesAndUpdateIcon = (character: IHero | IComicResult) => {
    const addedToFavorites = handleAddFavorites(character);
    setFavoriteStates((prevStates) => ({
      ...prevStates,
      [character.id]: addedToFavorites,
    }));
  };

  const handleIconClick = (
    event: React.MouseEvent<HTMLDivElement | SVGElement, MouseEvent>,
    character: IHero | IComicResult
  ) => {
    event.stopPropagation();
    handleAddFavoritesAndUpdateIcon(character);
  };

  const handleSearchSubmit = async (searchTerm: string) => {
    try {
      const apiResults = await fetchCharacterOrComicByName(
        searchTerm,
        showingHeroes
      );

      if (apiResults) {
        if (
          "characters" in apiResults &&
          Array.isArray(apiResults.characters)
        ) {
          const filteredHeroes = apiResults.characters
            .filter((hero) =>
              hero.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
            )
            .map((hero) => ({
              id: hero.id,
              name: hero.name || "",
              thumbnail: hero.thumbnail,
              comics: hero.title,
            }));

          setFilteredCharacters(filteredHeroes);
          setCurrentPage(1);
          setShowingHeroes(true);
        } else if ("comics" in apiResults && Array.isArray(apiResults.comics)) {
          const filteredComics = apiResults.comics
            .filter((comic) =>
              comic.title?.toLowerCase().startsWith(searchTerm.toLowerCase())
            )
            .map((comic) => ({
              id: comic.id,
              title: comic.title || "",
              thumbnail: comic.thumbnail,
            }));

          setFilteredCharacters(filteredComics);
          setCurrentPage(1);
          setShowingHeroes(false);
        } else {
          console.error("Invalid data structure in API response");
        }
      } else {
        console.error("Empty API response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowAllHeroes = () => {
    setShowingHeroes(true);
    setFilteredCharacters(heroes);
    setCurrentPage(1);
  };

  const handleShowAllComics = () => {
    setShowingHeroes(false);
    setFilteredCharacters(comics);
    setCurrentPage(1);
  };

  return (
    <div className={`row px-0 ${darkMode ? "bg-dark" : "bg-light"}`}>
      <div className="col-2 col-sm-0 d-none d-sm-block"></div>
      <div className="col-8 container-fluid p-0">
        <div className="mt-3">
          <SearchBar
            onSearch={handleSearchSubmit}
            onShowHeroes={handleShowAllHeroes}
            onShowComics={handleShowAllComics}
          />
        </div>
        <div className="mt-3">
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={filteredCharacters.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
        <div className={`row justify-content-center ${styles["card-row"]}`}>
          {currentCards.map((character, index) => (
            <div
              key={index}
              className={`col-12 col-sm-6 col-md-3 col-lg-3 ${styles["card-wrapper"]} ${styles["custom-breakpoint-class"]}`}
              style={{ cursor: "pointer" }}
              onClick={async () => {
                if (showingHeroes) {
                  handleCardClick(character);
                } else {
                  try {
                    const result = await fetchComicById(character.id);
                    if (result.comic) {
                      const comicUrl = `/characterDetailModal/${result.comic.id}`;
                      router.push(comicUrl);
                    } else {
                      console.error(result.error);
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            >
              <div
                className={`card mt-4 d-flex flex-row-reverse flex-wrap align-content-start justify-content-start align-items-center ${styles.card} ${styles["custom-animation-class"]}`}
                style={{
                  backgroundImage: `url('${
                    "thumbnail" in character
                      ? `${character.thumbnail.path}.${character.thumbnail.extension}`
                      : ""
                  }')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  cursor: "pointer",
                }}
              >
                <div
                  className={`fs-2 mt-2 ${styles.starIcon} ${
                    showingHeroes && favoriteStates[character.id]
                      ? styles.favorite
                      : ""
                  }`}
                >
                  {showingHeroes && (
                    <FaStar
                      className={styles.star}
                      onClick={(event) => handleIconClick(event, character)}
                    />
                  )}
                </div>

                <div className={`card-text ${styles["card-text"]}`}>
                  <p
                    className="d-flex justify-content-start ms-2"
                    style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
                  >
                    {showingHeroes
                      ? "name" in character
                        ? character.name
                        : "Default Name"
                      : "title" in character
                      ? character.title
                      : "Comic Title"}
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
