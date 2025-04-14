import React from "react";
import "./MovieCard.css";
import { FaHeart } from "react-icons/fa";
import { useMovieContext } from "../../contexts/MovieContext";
import { TbRating18Plus } from "react-icons/tb";
import { FaRegStarHalf } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(movie.id);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
      toast.error(`"${movie.title}" removed from your Favorites!`);
    } else {
      addToFavorites(movie);
      toast.success(`"${movie.title}" added to your Favorites!`);
    }
  };

  const voteResult = (voteCount) => {
    switch (true) {
      case voteCount < 2:
        return <FaRegStarHalf />;
      case voteCount < 4:
        return <FaRegStar />;
      case voteCount < 6:
        return <FaStarHalf />;
      case voteCount < 8:
        return <FaStarHalfAlt />;
      case voteCount < 10:
        return <FaStar />;
      default:
        return <FaStar />;
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <div className="vote-result">
            <div className="vote-result-container">
              <span className="star">{voteResult(movie.vote_average)} </span>
              <span className="vote">{Math.floor(movie.vote_average)}</span>
            </div>
            <button
              className={`favorite-btn ${favorite ? "active " : ""} `}
              onClick={onFavoriteClick}
            >
              <FaHeart />
            </button>
          </div>
          <div className="movie-overview-container">
            <p className="movie-overview">
              {movie.overview ? movie.overview : ""}
            </p>
          </div>
          <span>
            {movie.adult === true ? <TbRating18Plus size={"80px"} /> : ""}
          </span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-release">{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;
