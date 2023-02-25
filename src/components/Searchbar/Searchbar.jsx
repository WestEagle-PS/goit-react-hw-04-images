import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';
import css from './searchbar.module.scss';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleInputChange = e => {
    const search = e.target.value;
    this.setState({ search });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    if (search.trim() === '') {
      return toast.error('Input valid name');
    }
    this.props.onSubmit(search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.button}>
            <BsSearch className={css.icon} />
          </button>

          <input
            className={css.input}
            value={this.state.search}
            onChange={this.handleInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
