import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


import HomePage from "./pages/homePage";
import MovieDetailsPage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import FavoriteMoviesPage from "./pages/favouriteMoviesPage";
import AddMovieReviewPage from "./pages/addMovieReviewPages";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import ProtectedRoutes from "./protectedRoutes";

import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
 <QueryClientProvider client={queryClient}>
  <AuthContextProvider>
  <MoviesContextProvider>
  <BrowserRouter>
  <SiteHeader />
  <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignUpPage />} />

  <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
  <Route path="/movies/toprated" element={<TopRatedMoviesPage />} />
  <Route path="/movies/:id" element={<MovieDetailsPage />} />
  <Route path="/reviews/:id" element={<MovieReviewPage />} />

  <Route element={<ProtectedRoutes />}>
    <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
    <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
    <Route path="/reviews/form" element={<AddMovieReviewPage />} />
  </Route>

  <Route path="*" element={<Navigate to="/" />} />
</Routes>
          </BrowserRouter>
        </MoviesContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);