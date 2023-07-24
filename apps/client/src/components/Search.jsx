import { useState } from 'react';
import useStore from '../store';

export default function Search() {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { handleSearchCategory, handleSearchText } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSearchCategory(searchCategory);
    handleSearchText(searchInput);
  };

  return (
    <div className="py-2 border-bottom mb-3">
      <div className="container d-flex flex-wrap justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select
              className="form-select"
              id="inputGroupSelect04"
              aria-label="Example select with button addon"
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="">Search by:</option>
              <option value="name">Name</option>
              <option value="designer">Designer</option>
              <option value="artist">Artist</option>
              <option value="yearpublished">Year published</option>
              <option value="minplayers">Min players</option>
              <option value="maxplayers">Max players</option>
              <option value="minage">Min age</option>
              <option value="playingtime">Playing time</option>
              <option value="publisher">Publisher</option>
              <option value="category">Category</option>
              <option value="mechanic">Mechanic</option>
            </select>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!searchInput || !searchCategory}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
