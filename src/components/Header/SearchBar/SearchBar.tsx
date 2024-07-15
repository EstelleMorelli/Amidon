import './SearchBar.scss';

function SearchBar() {
  return (
    <div className="searchbar">
      <form action="" className="searchbar__form">
        <input
          placeholder="Recherchez un produit"
          className="searchbar__form--input"
        ></input>
      </form>
    </div>
  );
}

export default SearchBar;
