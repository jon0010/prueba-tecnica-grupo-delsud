"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import fetchCharacterDetails from "../../actions/fetchCaracterDetails/index";
import { ICharacterDetail } from "../../interfaces/index";
import Image from "next/image";
import { Bangers } from "next/font/google";
import styles from "../card.module.css";
import Navbar from "@/app/navbar/page";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const CharacterDetail = () => {
  const pathname = usePathname();
  const characterId = pathname.split("/").pop();
  const [characterDetail, setCharacterDetail] =
    useState<ICharacterDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (characterId) {
          const data = await fetchCharacterDetails(characterId);
          setCharacterDetail(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };
    fetchData();
  }, [characterId]);

  return (
    <div className="text-center">
      <Navbar />
      {characterDetail ? (
        <>
          <div className={`row`}>
            <div className={`mt-3 text-warning ${styles["titleDetail"]}`}>
              <p className={`${bangers.className} antialiased`}>
                {characterDetail.name}
              </p>
            </div>
            <div className="col-6">
              <Image
                className={` ${styles.imagedetail}`}
                src={`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`}
                alt={characterDetail.name}
                width={600}
                height={600}
              ></Image>
            </div>
            <div className="col-6 text-center mt-5">
              <p className={`fs-1 ${bangers.className} antialiased`}>
                hero's description
              </p>
              <p className="col-8 mx-auto mt-5">
                {characterDetail.description || "Description not available"}
              </p>
            </div>
          </div>

          <div className={`mt-3 text-warning ${styles["titleDetail"]}`}>
            <p className={`${bangers.className} antialiased`}>
              previous comic book appearances
            </p>
          </div>

          {characterDetail.comicsDetails?.map((comic, index) => (
            <div key={index}>
              <p>{comic.title}</p>
              <p>{comic.description}</p>
              <Image
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                width={300}
                height={300}
              ></Image>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterDetail;
