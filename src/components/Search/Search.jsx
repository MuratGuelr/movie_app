import React, { useCallback, useEffect, useMemo } from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import { searchMovies, getPopularMovies } from "../../services/api";

const Search = ({
  searchQuery,
  setSearchQuery,
  loading,
  setLoading,
  error,
  setError,
  movies,
  setMovies,
}) => {
  const handleChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  useEffect(() => {
    const loadPopularMovies = async () => {
      if (!searchQuery.trim()) {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
          console.log(err);
          setError("Failed to load...");
        } finally {
          setLoading(false);
        }
      }
    };
    loadPopularMovies();
  }, [searchQuery]);

  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;
      if (!searchQuery.trim()) return;

      setLoading(true);
      try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);
      } catch (error) {
        setError("Failed to search movies...");
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, loading, setLoading, setMovies, setError]
  );

  const inputClass = useMemo(
    () => `search-input ${searchQuery.trim().length === 0 ? "" : "valid"}`,
    [searchQuery.length]
  );

  const buttonClass = useMemo(
    () => `search-button ${!searchQuery.trim() ? "" : "active"}`,
    [searchQuery]
  );

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search for movies..."
        className={inputClass}
        value={searchQuery}
        onChange={handleChange}
      />
      <button type="submit" className={buttonClass}>
        <FaSearch />
      </button>
    </form>
  );
};

export default React.memo(Search);
