import React from 'react';
import PropTypes from 'prop-types';
import { ModalWrapper, StyledModalWindow } from './styled';
import { useEffect } from 'react';

export const Modal = ({ children, toggleModal }) => {
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <ModalWrapper onClick={onBackdropClick}>
      <StyledModalWindow>{children}</StyledModalWindow>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
