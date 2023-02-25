import PropTypes from 'prop-types';
import css from './image-gallery-item.module.scss';

const ImageGalleryItem = ({
  smallImageURL,
  tags,
  largeImageURL,
  showModal,
}) => {
  return (
    <li className={css.item} onClick={() => showModal({ largeImageURL, tags })}>
      <img className={css.image} src={smallImageURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
