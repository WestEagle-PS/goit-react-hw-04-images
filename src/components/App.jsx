import { Component } from 'react';
import { searchPosts } from 'shared/api/getFetch';
import { ToastContainer, toast } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import Spinner from 'shared/components/Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from '../shared/components/Button/Button';

import Modal from '../shared/components/Modal/Modal';

import css from './app.module.scss';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    total: null,
    search: '',
    status: 'idle',
    error: null,
    showModal: false,
    postDetails: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.setState({ status: 'pending' });
      this.getFetch();
    }
  }

  getFormData = data => {
    const { search } = this.state;
    if (search !== data) {
      this.setState({ search: data, images: [], page: 1, total: null });
    }
  };

  async getFetch() {
    try {
      const { search, page } = this.state;
      const { data } = await searchPosts(search, page);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.total,
        status: 'sucess',
      }));
    } catch ({ error }) {
      this.setState({
        error: error.data.message || 'Cannot fetch images.',
        status: 'rejected',
      });
    }
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  notifyError = message => {
    toast.error(message);
  };

  showModal = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      postDetails: {
        largeImageURL,
        tags,
      },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, postDetails: {} });
  };

  render() {
    const { images, page, status, error, total, showModal, postDetails } = this.state;

    return (
      <div className={css.container}>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={postDetails.largeImageURL} alt={postDetails.tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.getFormData} />
        {status === 'pending' && <Spinner />}
        {status === 'rejected' && this.notifyError(error)}
        {total === 0 && this.notifyError('Cannot find images')}
        {(status === 'sucess' || images.length > 0) && <ImageGallery images={images} showModal={this.showModal} />}
        {Boolean(images?.length) && total >= page * 12 && <Button onClick={this.handleLoadMoreClick} />}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}
