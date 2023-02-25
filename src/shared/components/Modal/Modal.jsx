import { Component } from 'react';
import { createPortal } from 'react-dom';
import { SlClose } from 'react-icons/sl';
// import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import css from './modal.module.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleClose);
  }

  handleClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, children } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleClose}>
        <div className={css.modal}>
          <button className={css.button} type="button" onClick={onClose}>
            <SlClose className={css.icon} />
          </button>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
