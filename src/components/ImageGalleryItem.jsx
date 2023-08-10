import React from 'react';
import PropTypes from 'prop-types';

import { ImageItemStyled } from './styled';

export const ImageGalleryItem = ({ photo, toggleModal }) => {
  return (
    <ImageItemStyled>
      <img
        onClick={() => toggleModal(photo.largeImageURL)}
        src={photo.webformatURL}
        alt="fox"
      />
    </ImageItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  photo: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
