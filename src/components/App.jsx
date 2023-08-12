import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { fetchImages } from 'service/api';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Container } from './styled';

export const App = () => {
  const initialState = {
    error: '',
    page: 1,
    per_page: 12,
    totalHits: 0,
    query: '',
    currentImage: '',
  };

  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [params, setParams] = useState(initialState);
  const [isShowloadMore, setShowloadMore] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { per_page, page, query, currentImage } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);

        const { hits, totalHits } = await fetchImages({
          per_page,
          page,
          q: query,
        });

        setImages(prevState => {
          return [...prevState, ...hits];
        });

        setShowloadMore(page * per_page < totalHits);
      } catch (error) {
        setParams(prevState => ({
          ...prevState,
          error: 'An error occurred while fetching images.',
        }));
      } finally {
        setLoader(false);
      }
    };

    if (inputValue && query === inputValue) {
      fetchData();
    }
  }, [query, page, per_page, inputValue]);

  // useEffect(() => {
  //   if (initialState.query !== query || initialState.page !== page) {
  //     fetchData();
  //   }
  // }, [query, page, initialState.query, initialState.page, fetchData]);

  const handleSubmit = async () => {
    if (query === inputValue) {
      return;
    }
    setImages([]);
    setParams(initialState);
  };

  const handleLoadMore = () => {
    setParams(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleSearchInput = currentQuery => {
    if (query !== currentQuery) {
      setParams(prevState => ({
        ...prevState,
        query: currentQuery,
      }));
    }
  };

  const toggleModal = currentImage => {
    setModalOpen(prevState => !prevState);
    setParams(prevState => ({
      ...prevState,
      currentImage,
    }));
  };

  return (
    <Container>
      <Searchbar
        onSearchInput={handleSearchInput}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {<ImageGallery toggleModal={toggleModal} images={images} />}
      {loader && <Loader />}
      {isShowloadMore && <Button onClick={handleLoadMore} />}
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <img src={currentImage} alt="text" />
        </Modal>
      )}
    </Container>
  );
};
