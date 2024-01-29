"use client";
import React, { useEffect, useState } from "react";
import Loader from "./loader";
import Home from "./home/page";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

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
      <div style={{ position: showLoader ? "fixed" : "relative" }}>
        <Home />
      </div>
    </>
  );
};

export default App;
