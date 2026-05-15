import React, { useState, useEffect } from "react";
import { getFavourites, addFavourite, deleteFavourite } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getFavourites().then((favourites) => {
        const favouriteIds = favourites.map((favourite) => favourite.movieId);
        setFavorites(favouriteIds);
      });
    }
  }, []);

  const addToFavorites = async (movie) => {
    let newFavorites = [];

    if (!favorites.includes(movie.id)) {
      await addFavourite(movie);
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }

    setFavorites(newFavorites);
  };

  const removeFromFavorites = async (movie) => {
    await deleteFavourite(movie.id);
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch = [...mustWatch, movie.id];
    } else {
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch);
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({
      ...myReviews,
      [movie.id]: review,
    });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        myReviews,
        addToFavorites,
        removeFromFavorites,
        addToMustWatch,
        removeFromMustWatch,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;