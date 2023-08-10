import React from 'react';
import PropTypes from 'prop-types';

import { StyledForm, StyledInput, StyledButtonSearch } from './styled';

export class Searchbar extends React.Component {
  static propTypes = {
    onSearchInput: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSearchInput(this.state.inputValue);
  };

  handleInputCheange = ({ target }) => {
    this.setState({ inputValue: target.value });
  };

  render() {
    const disabled = !this.state.inputValue.length;
    return (
      <header>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledInput
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            placeholder="Search images and photos"
            onChange={this.handleInputCheange} // хендлим введеное
          />
          <StyledButtonSearch
            onClick={this.handleSubmit}
            type="submit"
            disabled={disabled}
            className={disabled && 'disabled'}
          >
            Search
          </StyledButtonSearch>
        </StyledForm>
      </header>
    );
  }
}
