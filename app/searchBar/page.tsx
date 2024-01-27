import React, { useState, ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onShowAll: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onShowAll }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm("");
  };

  const handleShowAllClick = () => {
    onShowAll();
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
            className="form-control"
            type="search"
            placeholder="search hero name / comic"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-info ms-3" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </form>
      <button
        className="btn btn-outline-info mt-3 fw-semibold"
        onClick={handleShowAllClick}
      >
        Mostrar Todos
      </button>
    </div>
  );
};

export default SearchBar;
