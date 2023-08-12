import React from 'react';
import PropTypes from 'prop-types';
import { ModalWrapper, StyledModalWindow } from './styled';
import { useEffect, useCallback } from 'react';

export const Modal = ({ children, toggleModal }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    const onKeyDown = e => handleKeyDown(e);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleKeyDown]);

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
