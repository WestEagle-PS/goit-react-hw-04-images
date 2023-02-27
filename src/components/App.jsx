import { useState, useEffect, useCallback } from 'react';
import { searchPosts } from 'shared/api/getFetch';
import { ToastContainer, toast } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import Spinner from 'shared/components/Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from '../shared/components/Button/Button';
import Modal from '../shared/components/Modal/Modal';
import css from './app.module.scss';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    const getFetch = async () => {
      try {
        setStatus('pending');
        const { data } = await searchPosts(search, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotal(data.total);
        setStatus('sucess');
      } catch ({ error }) {
        const errorMessage = error.data.message || 'Cannot fetch images.';
        setError(errorMessage);
        setStatus('error');
      }
    };

    if (search) {
      getFetch();
    }
  }, [search, page]);

  const getFormData = data => {
    if (search !== data) {
      setSearch(data);
      setImages([]);
      setPage(1);
      setTotal(null);
    }
  };

  const handleLoadMoreClick = useCallback(() => setPage(prevPage => prevPage + 1), []);

  const notifyError = message => {
    toast.error(message);
  };

  const onShowModal = useCallback(({ largeImageURL, tags }) => {
    setShowModal(true);
    setPostDetails({ largeImageURL, tags });
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setPostDetails({});
  }, []);

  return (
    <div className={css.container}>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={postDetails.largeImageURL} alt={postDetails.tags} />
        </Modal>
      )}
      <Searchbar onSubmit={getFormData} />
      {status === 'pending' && <Spinner />}
      {status === 'rejected' && this.notifyError(error)}
      {total === 0 && notifyError('Cannot find images')}
      {(status === 'sucess' || images.length > 0) && <ImageGallery images={images} showModal={onShowModal} />}
      {Boolean(images?.length) && total >= page * 12 && <Button onClick={handleLoadMoreClick} />}
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
};
