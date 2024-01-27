import React from "react";

const SearchBar = () => {
  return (
    <div className="justify-content-start">
      <form className="col-12 col-sm-8 form-inline my-2 my-lg-0">
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            placeholder="search hero name / comic"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-info ms-3" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
