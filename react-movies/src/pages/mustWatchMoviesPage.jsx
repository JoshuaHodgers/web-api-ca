import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const mustWatchMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = mustWatchMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <Box
      sx={{
        backgroundColor: "#111111",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Box
        sx={{
          border: "2px solid #fbc02d",
          borderRadius: 2,
          padding: 2,
          backgroundColor: "#1a1a1a",
        }}
      >
        {movies.length === 0 ? (
          <>
            <Typography
              variant="h3"
              sx={{
                color: "#fbc02d",
                marginBottom: 2,
                fontWeight: "bold",
              }}
            >
              Must Watch Movies
            </Typography>
            <Typography sx={{ color: "#f5f5f5" }}>
              No must watch movies added yet.
            </Typography>
          </>
        ) : (
          <PageTemplate
            title="Must Watch Movies"
            movies={movies}
            action={(movie) => {
              return <RemoveFromMustWatch movie={movie} />;
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default MustWatchMoviesPage;