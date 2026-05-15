import React from "react";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templatesMoviePage";
import useMovie from "../hooks/useMovie";
// import useMovie from "../hooks/useMovie";   Redundant

const MoviePage = (props) => {
  const { movie, error, isLoading } = useMovie(props.match.params.id);

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;