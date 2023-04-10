import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  totalPizzas,
  currentPage,
  nextPage,
  prevPage,
  paginate,
  pizzasPerPage,
}) => {
  const pagesNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPizzas / pizzasPerPage); i++) {
    pagesNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <div onClick={prevPage} className={styles.pagination__item}>
        &lt;
      </div>
      {pagesNumbers.map((number) => (
        <div
          onClick={() => paginate(number)}
          className={
            currentPage === number
              ? `${styles.pagination__item} ${styles.pagination__itemActive}`
              : `${styles.pagination__item}`
          }
          key={number}
        >
          {number}
        </div>
      ))}
      <div onClick={nextPage} className={styles.pagination__item}>
        &gt;
      </div>
    </div>
  );
};

export default Pagination;
