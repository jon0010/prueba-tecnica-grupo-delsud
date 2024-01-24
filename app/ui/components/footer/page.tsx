"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import delsud from "../../../assets/delsud.jpg";
import { BsHandIndexFill } from "react-icons/bs";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);

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
      className="d-flex align-items-center justify-content-between col-11 col-md-8 mx-auto mb-5 py-4"
      style={{
        border: "solid #000000",
        borderRadius: "12px",
        padding: "12px",
        backgroundColor: "#E3E2E2",
        marginTop: "4em",
      }}
    >
      <div>
        <Image
          src={delsud}
          alt="Copyright Logo"
          style={{ width: "60px", marginRight: "5px" }}
          width={50}
          height={40}
        ></Image>
        <span className="fw-semibold">
          &copy; {currentYear} Grupo delsud | prueba tecnica marvel app
        </span>
      </div>
      {showButton && (
        <button
          onClick={handleScrollToTop}
          className="btn btn-dark"
          style={{ fontSize: "16px" }}
        >
          Subir <BsHandIndexFill />
        </button>
      )}
    </div>
  );
};
