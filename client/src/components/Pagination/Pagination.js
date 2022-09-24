import React from "react";
import c from "./Pagination.module.css";

const Pagination = ({ videogames, gamesPage, pagination }) => {
  const pageIndex = [];
  for (let i = 0; i <= Math.ceil(videogames / gamesPage) - 1; i++) {
    pageIndex.push(i + 1);
  }
  return (
    <div className={c.container_page}>
      <ul>
        {pageIndex?.map((e) => {
          return (
            <li onClick={() => pagination(e)} key={e}>
              {e}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
