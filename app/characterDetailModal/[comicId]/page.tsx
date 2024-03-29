"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import fetchComicById from "@/app/actions/fetchComicById";
import { usePathname } from "next/navigation";
import { IComic } from "@/app/interfaces";
import Image from "next/image";
import { Bangers } from "next/font/google";
import styles from "../../cardCharacter/card.module.css";
import { formatDate, capitalizeFirstLetter } from "../../utils/formatDate";
import { useStyles } from "../../setDarkMode";
import Loader from "../../loader";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const ComicDetail = () => {
  const pathname = usePathname();
  const comicId = pathname.split("/").pop() || "";
  const [comicDetails, setComicDetails] = useState<IComic | null>(null);
  const { darkMode } = useStyles();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchComicById(parseInt(comicId, 10));

      if (result.comic) {
        setComicDetails(result.comic);
      } else {
        console.error("Error:", result.error);
      }
    };

    fetchData();
  }, [comicId]);

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      <div
        className={` ${darkMode ? "bg-dark" : "bg-light"}`}
        style={{ position: showLoader ? "fixed" : "relative" }}
      >
        <Navbar />
        <h1
          className={`modal-title ${bangers.className} ${styles["titleComicDetail"]}  text-warning mb-4 text-center mt-2`}
          style={{
            textShadow: darkMode
              ? "3px 2px 2px rgba(255, 255, 255, 1)"
              : "3px 2px 2px rgba(0, 0, 0, 1)",
          }}
        >
          comic book info
        </h1>
        {comicDetails && (
          <div className={`row  ${darkMode ? "text-white" : "text-dark"}`}>
            <div className="col-sm-12 col-md-6 text-center px-5">
              <Image
                className="img-fluid border border-2 border-danger rounded"
                src={`${comicDetails.thumbnail.path}.${comicDetails.thumbnail.extension}`}
                alt={comicDetails.title}
                height={600}
                width={600}
              />
            </div>
            <div className="col-sm-12 col-md-6 px-5">
              <h2 className={`${bangers.className}`}>{comicDetails.title}</h2>
              <p>
                Comments:{" "}
                {comicDetails.variantDescription || "comments no available"}
              </p>
              <p>
                Description:{" "}
                {comicDetails.description || "description no available"}
              </p>

              <h3 className={`${bangers.className}`}>Creators:</h3>
              {comicDetails.creators.items.map((creator, index) => (
                <div key={index}>
                  <span>
                    <p>
                      <span>{creator.name || "creators no available"}</span> 🧑‍💻{" "}
                      <span>Role: {creator.role}</span>
                    </p>
                  </span>
                </div>
              ))}

              <h3 className={`${bangers.className}`}>Dates:</h3>
              {comicDetails.dates.map((date, index) => (
                <div key={index}>
                  <span>
                    <p>
                      <span>{formatDate(date.date)}</span>
                      <span>&nbsp; {capitalizeFirstLetter(date.type)}</span>
                    </p>
                  </span>
                </div>
              ))}

              <h3 className={`${bangers.className}`}>Prices:</h3>
              {comicDetails.prices.map((price, index) => (
                <div key={index}>
                  <span>
                    <p>
                      <span>{capitalizeFirstLetter(price.type)}</span>
                      <span>&nbsp;&nbsp;${price.price}</span>
                    </p>
                  </span>
                </div>
              ))}

              <h3 className={`${bangers.className}`}>synopsis</h3>
              {comicDetails.textObjects.length > 0 && (
                <div>
                  <p>Language: {comicDetails.textObjects[0].language}</p>
                  <p>
                    {comicDetails.textObjects[0].text ||
                      "synopsis no available"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default ComicDetail;
