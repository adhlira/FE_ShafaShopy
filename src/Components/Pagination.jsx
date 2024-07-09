/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-2 leading-tight ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-500'
              } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
