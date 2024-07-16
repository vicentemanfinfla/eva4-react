import React from 'react';

const SortButton = ({ isSortedAlphabetically, toggleSortOrder }) => {
  return (
    <div className="text-center my-3">
      <button className="btn btn-primary" onClick={toggleSortOrder}>
        {isSortedAlphabetically ? <i class="bi bi-sort-down-alt"></i> : <i class="bi bi-sort-alpha-down"></i>}
      </button>
    </div>
  );
};

export default SortButton;