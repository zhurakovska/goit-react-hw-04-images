import React from 'react';
// import PropTypes from 'prop-types';
import { ModalWrapper, StyledModalWindow } from './styled';
import { useEffect } from 'react';

export const Modal = ({ children, toggleModal }) => {
  // static propTypes = {
  //   toggleModal: PropTypes.func.isRequired,
  //   children: PropTypes.node.isRequired,
  // };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown); // ивенлисенер будет срабатывать каждый раз когда нажимаем на кнопку

    return () => document.removeEventListener('keydown', handleKeyDown); //удаляем слушателя
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
