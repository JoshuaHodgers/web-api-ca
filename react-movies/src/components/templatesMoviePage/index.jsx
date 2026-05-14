import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import MovieDetails from "../movieDetails";

function TemplateMoviePage({ movie, children }) {
  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid size={{ xs: 12, md: 9 }}>
          <MovieDetails movie={movie} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}

export default TemplateMoviePage;