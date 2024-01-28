"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IPaginationProps } from "@/app/interfaces";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

const Pagination: React.FC<IPaginationProps> = ({
  cardsPerPage,
  totalCards,
  currentPage,
  paginate,
}) => {
  const pageNumbers = Math.ceil(totalCards / cardsPerPage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers) {
      paginate(currentPage + 1);
    }
  };

  const handleDropdownItemClick = (number: number) => {
    paginate(number);
    setIsDropdownOpen(false);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link href="#" className="page-link" onClick={handlePrevious}>
            <RiArrowDropLeftLine />
          </Link>
        </li>

        <li className={`page-item dropdown${isDropdownOpen ? " show" : ""}`}>
          <a
            href="#"
            className="page-link dropdown-toggle"
            id="pageDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            onClick={handleDropdownToggle}
          >
            {currentPage}
          </a>
          <div
            className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}
            aria-labelledby="pageDropdown"
          >
            {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
              (number) => (
                <Link
                  key={number}
                  href="#"
                  className={`dropdown-item ${
                    number === currentPage ? "active" : ""
                  }`}
                  onClick={() => handleDropdownItemClick(number)}
                >
                  {number}
                </Link>
              )
            )}
          </div>
        </li>

        <li
          className={`page-item ${
            currentPage === pageNumbers ? "disabled" : ""
          }`}
        >
          <Link href="#" className="page-link" onClick={handleNext}>
            <RiArrowDropRightLine />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
