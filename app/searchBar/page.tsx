import React, { useState, ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onShowComics: () => void;
  onShowHeroes: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onShowComics,
  onShowHeroes,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showHeroes, setShowHeroes] = useState(true);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowHeroes(true);
    setSearchTerm("");
  };

  const handleShowAllHeroes = () => {
    setShowHeroes(true);
    onShowHeroes();
    setSearchTerm("");
  };

  const handleShowAllComics = () => {
    setShowHeroes(false);
    onShowComics();
    setSearchTerm("");
  };

  return (
    <div className="justify-content-start">
      <form
        className="col-12 col-sm-8 form-inline my-2 my-lg-0"
        onSubmit={handleSearchSubmit}
      >
        <div className="input-group">
          <input
            className="form-control ms-2"
            type="search"
            placeholder="search hero name / comic"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-info ms-3" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </form>
      <button
        className={`btn btn-outline-info mt-3 fw-semibold ms-2 ${
          showHeroes ? "active" : ""
        }`}
        onClick={handleShowAllHeroes}
      >
        Mostrar Heroes
      </button>
      <button
        className={`btn btn-outline-info mt-3 fw-semibold ms-2 ${
          !showHeroes ? "active" : ""
        }`}
        onClick={handleShowAllComics}
      >
        Mostrar Comics
      </button>
    </div>
  );
};

export default SearchBar;
