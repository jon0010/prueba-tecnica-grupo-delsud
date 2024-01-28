export interface IPaginationProps {
  cardsPerPage: number;
  totalCards: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}
