//https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination, DOTS } from "../hooks/usePagination";
const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    // className,
  } = props;

  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) || [];
//   console.log(`currentPage: ${currentPage}`);
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex">
      {/* Left navigation arrow */}
      <div
        className={`${
          currentPage === 1
            ? "disabled:pointer-events-none b p-3 items-center"
            : "p-3 items-center"
        }`}
      >
        <li onClick={onPrevious}>
          <ChevronLeft />
          {/* <div className="arrow left" /> */}
        </li>
      </div>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              className="p-3 h-8 text-center m-auto flex items-center font-bold cursor-default bg-transparent"
              key={pageNumber}
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className="p-3 h-8 text-center m-auto items-center"
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li className="" onClick={onNext}>
        <ChevronRight />
      </li>
    </ul>
  );
};

export default Pagination;
