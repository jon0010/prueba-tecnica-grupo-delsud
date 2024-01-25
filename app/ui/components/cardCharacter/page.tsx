"use client";
import React, { useState, useEffect } from "react";
import { fetchTenCharacters } from "../../../actions/fetchTenCharacters/index";
import { ICharacter } from "@/app/interfaces";
import styles from "./card.module.css";
import { RiStarLine } from "react-icons/ri";
import { Pagination } from "../index";

export const CardCharacter: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTenCharacters();
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

  return (
    <div className="container-fluid">
      <div className={`row justify-content-center ${styles["card-row"]}`}>
        {characters.map((character, index) => (
          <div
            className={`col-12 col-sm-6 col-md-4 col-lg-2 mx-1 row justify-content-evenly px-3 ${styles["card-wrapper"]}`}
            key={index}
          >
            <div
              className={`card mt-3 ${styles.card}`}
              style={{
                backgroundImage: `url('${character.thumbnail.path}.${character.thumbnail.extension}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="d-flex flex-row-reverse">
                <RiStarLine className="fs-2 text-warning" />
              </div>
              <div className={`card-text ${styles["card-text"]}`}>
                <p
                  className="d-flex justify-content-start ms-2"
                  style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
                >
                  {character.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        {" "}
        <Pagination />
      </div>
    </div>
  );
};
