import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';
import css from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = e => {
    const search = e.target.value;
    setSearch(search);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      return toast.error('Input valid name');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.button}>
          <BsSearch className={css.icon} />
        </button>

        <input
          className={css.input}
          value={search}
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
