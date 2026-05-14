import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const TopRatedMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRatedMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

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
          border: "2px solid #1a1a1a",
          borderRadius: 2,
          padding: 2,
          backgroundColor: "#1a1a1a",
        }}
      >
        <PageTemplate
          title="Top Rated Movies"
          movies={data.results}
          action={(movie) => {
            return (
              <>
          <AddToFavoritesIcon movie={movie} />
           <AddToMustWatchIcon movie={movie} />
              </>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default TopRatedMoviesPage;