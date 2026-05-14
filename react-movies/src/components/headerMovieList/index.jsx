import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ padding: 2 }}>
      <Grid size={{ xs: 1 }}>
        <IconButton aria-label="go back" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>
      </Grid>
      <Grid size={{ xs: 11 }}>
        <Typography variant="h4" component="h1">
          {props.title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;