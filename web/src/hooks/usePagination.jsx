import { useEffect, useState } from "react";

const usePagination = ({ defaultPageLimit = 10, data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(defaultPageLimit);
  const [rows, setRows] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    if (!rows) return setPages([]);
    const pages = [];
    for (let i = 0; i < Math.ceil(rows.length / pageLimit); i++) {
      pages.push(rows.slice(i * pageLimit, (i + 1) * pageLimit));
    }
    setPages(pages);
  }, [rows, pageLimit]);

  const hasNextPage = () => {
    return currentPage < pages.length - 1;
  };

  const hasPreviousPage = () => {
    return currentPage > 0 && pages.length > 0;
  };

  const goToNextPage = () => {
    if (!hasNextPage()) return;
    setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (!hasPreviousPage()) return;
    setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (page) => {
    if (page < 0 || page > pages.length - 1) return;
    setCurrentPage(page);
  };

  const changePageLimit = (limit) => {
    if (limit < 1) return;
    setPageLimit(limit);
  };

  const getRows = () => {
    if (!pages) return [];
    return pages[currentPage];
  };

  return {
    currentPage,
    totalPages: pages.length,
    data: getRows(),
    pageLimit,
    hasNextPage,
    hasPreviousPage,
    next: goToNextPage,
    previous: goToPreviousPage,
    goToPage,
    changePageLimit,
  };
};

export default usePagination;
