import { useNavigate } from "react-router-dom";

function SearchBar({ search, setSearch }) {

const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className="search-box">
      🔍
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;