import React from 'react';
import searchp from '../img/search.svg';

const SearchBar = ({ search, initialData, dataType, update }) => {
  const dataSearch = () => {
    const value = search.toLowerCase();
    const filteredData = initialData[dataType].filter(user => {
      return user.firstName.toLowerCase().includes(value) 
      || user.lastName.toLowerCase().includes(value) 
      || user.email.toLowerCase().includes(value) 
      || user.phone.toLowerCase().includes(value)
    });

    update({
      currentData: filteredData,
      active: null,
      search: value,
      activePage: 1,
      isSorted: false,
    });
  };

  const handleChange = e => {
    if (initialData[dataType]) {
      e.target.placeholder = 'Search for users by name, email or phone';
      update({ search: e.target.value });
    } else {
      e.target.placeholder = 'Please, select data set!';
    }
  };

  const handleClick = () => {
    if (initialData[dataType]) {
      dataSearch();
    } else {
      update({
        currentData: null,
        active: null,
        activePage: 1,
      });
    }
  };

  return (
    <div className="input-group">
      <button className="btn" onClick={handleClick}>
        Search
        <img id="search" src={searchp} alt="search"/>{' '}
      </button>
      <input
        value={search}
        type="text"
        className="form-control"
        placeholder="Search for users by name, email or phone..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;