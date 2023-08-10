import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreStyledBtn } from './styled';

export const Button = ({ onClick }) => {
  return <LoadMoreStyledBtn onClick={onClick}>Load more</LoadMoreStyledBtn>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
