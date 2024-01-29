import React from "react";
import Image from "next/image";
import "./loader.css";
import Navbar from "../components/navbar/page";

const Loader = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-black m-0 p-0">
      <Navbar />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Image
          className="img-fluid p-4 me-2"
          width={250}
          height={500}
          src="https://res.cloudinary.com/dkpotpaaf/image/upload/v1706495897/mvzae4ce5qfk7rm6bite.gif"
          alt="logo loader"
        />
      </div>
    </div>
  );
};

export default Loader;
