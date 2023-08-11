import React from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { fetchImages } from 'service/api';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Container } from './styled';

export class App extends React.Component {
  state = {
    loading: false,
    error: '',
    images: [],
    page: 1,
    per_page: 12,
    totalHits: 0,
    query: '',
    showloadMore: false,
    currentImage: '',
    isModalOpen: false,
    tags: '',
  };
  // Функция для загрузки изображений

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if ((prevState.query !== query || prevState.page) !== page) {
      try {
        this.setState({ loading: true, error: '' }); // Устанавливаем состояние "загрузка" и сбрасываем ошибку
        const { per_page, page, query } = this.state; // Получаем данные из состояния

        const { hits, totalHits } = await fetchImages({
          // тут мы получаем запрос
          per_page, // тут мы перезаписываем этот запрос
          page,
          q: query,
        }); // Выполняем запрос на сервер и получаем результат

        this.setState(prevState => ({
          images: [...prevState.images, ...hits], // Объединяем старые и новые изображения
          showloadMore: page * per_page < totalHits, // Показать кнопку "Load More" в зависимости от количества изображений
        }));
      } catch (error) {
        this.setState({ error: 'An error occurred while fetching images.' }); // Обрабатываем ошибку, если запрос не удался
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = async () => {
    this.setState({ images: [], page: 1, totalHits: 0 }); // обнуляем стейт чтобы при новом запросе не мешать данные с предыдущими
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 })); // Увеличиваем текущую страницу на 1
  };

  handleSearchInput = query => {
    if (this.state.query !== query) {
      this.setState({ query: query, hits: [], page: 1 });
    }
  };

  toggleModal = imageURL => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      currentImage: imageURL,
    }));
  };

  render() {
    const { images, loading, showloadMore, isModalOpen, currentImage, tags } =
      this.state;
    // const isSearchButtonDisabled = !this.state.query.trim();
    return (
      <Container>
        <Searchbar
          onSearchInput={this.handleSearchInput}
          handleSubmit={this.handleSubmit}
          query={this.state.query}
        />
        {<ImageGallery toggleModal={this.toggleModal} images={images} />}
        {loading && <Loader />}
        {showloadMore && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal
            toggleModal={this.toggleModal}
            currentImage={currentImage}
            tags={tags}
          >
            <img src={currentImage} alt="text" onClick={this.getModalImage} />{' '}
          </Modal>
        )}{' '}
        {/* если модалка открытра то мы показываем наше окно */}
      </Container>
    );
  }
}
