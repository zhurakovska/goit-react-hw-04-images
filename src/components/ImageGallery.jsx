import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageListUl } from './styled';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ImageListUl>
      {images.map(photo => (
        <ImageGalleryItem
          toggleModal={toggleModal}
          key={photo.id}
          photo={photo}
        />
      ))}
    </ImageListUl>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
