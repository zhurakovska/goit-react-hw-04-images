import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { StyledForm, StyledInput, StyledButtonSearch } from './styled';

export const Searchbar = ({ handleSearchInput, handleSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const onSubmit = e => {
    e.preventDefault();

    handleSearchInput(inputValue);
  };

  const handleInputCheange = ({ target }) => {
    setInputValue(target.value);
  };

  const disabled = !inputValue.length;
  return (
    <header>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput
          type="text"
          autoComplete="off"
          autoFocus
          name="query"
          placeholder="Search images and photos"
          onChange={handleInputCheange}
        />
        <StyledButtonSearch
          onClick={() => handleSubmit(inputValue)}
          type="submit"
          disabled={disabled}
          className={disabled && 'disabled'}
        >
          Search
        </StyledButtonSearch>
      </StyledForm>
    </header>
  );
};

Searchbar.propTypes = {
  handleSearchInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
