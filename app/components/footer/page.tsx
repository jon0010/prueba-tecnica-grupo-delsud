"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import delsud from "../../assets/delsud.jpg";
import { BsHandIndexFill } from "react-icons/bs";
import { useStyles } from "../../setDarkMode";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);
  const { darkMode } = useStyles();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setShowButton(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`d-flex align-items-center justify-content-between col-11 col-md-8 mx-auto py-5 ${
        darkMode ? "bg-dark" : "bg-light"
      } m-0`}
      style={{
        padding: "35px",
        marginTop: "5em",
        width: "100%",
      }}
    >
      <div className={`${darkMode ? "text-white" : "text-dark"}`}>
        <Image
          src={delsud}
          alt="Copyright Logo"
          width={undefined}
          style={{ width: "6em", marginRight: "5px", height: "3em" }}
        ></Image>
        <span className="fw-semibold">
          &copy; {currentYear} Grupo delsud | prueba tecnica marvel app
        </span>
      </div>
      {showButton && (
        <button
          onClick={handleScrollToTop}
          className={`btn ${
            darkMode ? "border border-white" : "border border-dark"
          } ${darkMode ? "text-white" : "text-dark"} me-2`}
          style={{ fontSize: "16px" }}
        >
          Subir <BsHandIndexFill />
        </button>
      )}
    </div>
  );
};

export default Footer;
