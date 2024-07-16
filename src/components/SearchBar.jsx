import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className='container'>
      <input
        className='form-control form-control-lg my-3'
        type="text"
        placeholder="Buscar contactos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;