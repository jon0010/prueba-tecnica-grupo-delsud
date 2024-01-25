import React from "react";
import Link from "next/link";
import { IPaginationProps } from "@/app/interfaces";

export const Pagination: React.FC<IPaginationProps> = ({
  cardsPerPage,
  totalCards,
  currentPage, // Modificado para recibir la página actual como prop
  paginate,
}) => {
  const pageNumbers = Math.ceil(totalCards / cardsPerPage);

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

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link href="#" className="page-link" onClick={handlePrevious}>
            Previous
          </Link>
        </li>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (number) => (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <Link
                href="#"
                className="page-link"
                onClick={() => paginate(number)}
              >
                {number}
              </Link>
            </li>
          )
        )}
        <li
          className={`page-item ${
            currentPage === pageNumbers ? "disabled" : ""
          }`}
        >
          <Link href="#" className="page-link" onClick={handleNext}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
