import React from "react";
import { GOOGLE_BASE_URL } from "../config";

//Components
import Navigation from "./elements/Navigation";
import MovieInfo from "./elements/MovieInfo";
import MovieInfoBar from "./elements/MovieInfoBar";
import Actor from "./elements/Actor";
import Grid from "./elements/Grid";
import Spinner from "./elements/Spinner";

import { useMovieFetch } from "./hooks/useMovieFetch";

export const Movie = ({ movieId }) => {
  const [movie, loading, error] = useMovieFetch(movieId);

  if (error) return <div>Something went wromg...</div>;
  if (loading) return <Spinner />;
  return (
    <>
      <Navigation movie={movie.original_title} />
      <a
        style={{ textDecoration: "none" }}
        href={`${GOOGLE_BASE_URL}${movie.original_title}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MovieInfo movie={movie} />
      </a>

      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />

      <Grid header="Actors">
        {movie.actors.map(actor => (
          <a
            style={{ textDecoration: "none" }}
            href={`${GOOGLE_BASE_URL}${actor.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Actor key={actor.credit_id} actor={actor} />
          </a>
        ))}
      </Grid>
    </>
  );
};

export default Movie;
