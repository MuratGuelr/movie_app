import React, { useEffect, useState } from "react";
import "./Home.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import { FaSearch } from "react-icons/fa";
import { searchMovies, getPopularMovies } from "../../services/api";
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  return (
    <div className="home">
      <div className="search-box">
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          movies={movies}
          setMovies={setMovies}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loader />
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
