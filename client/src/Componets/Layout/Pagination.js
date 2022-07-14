import React from "react";

const Pagination = ({ woPerPage, totalWo, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalWo / woPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={pag} className="pagination">
      <ul style={ulFlex} className="pag-list">
        {pageNumbers.map((number) => (
          <li key={number} className="p-1">
            <button
              onClick={() => paginate(number)}
              className="p-1 br-round btn btn-dark"
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

const ulFlex = {
  display: "flex",
};

const pag = {
  paddingRight: "150px",
};
