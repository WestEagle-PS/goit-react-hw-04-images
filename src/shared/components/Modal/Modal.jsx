import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SlClose } from 'react-icons/sl';
// import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import css from './modal.module.scss';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.body.addEventListener('keydown', handleClose);

    return () => document.body.removeEventListener('keydown', handleClose);
  });

  const handleClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <button className={css.button} type="button" onClick={onClose}>
          <SlClose className={css.icon} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
