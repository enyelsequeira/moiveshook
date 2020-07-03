import React from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { Redirect, Link } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import Modal from '@material-ui/core/Modal';

import StarRatings from 'react-star-ratings';
import { FaImdb } from 'react-icons/fa';
import { BsPlay } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';
import { RiSendPlaneLine } from 'react-icons/ri';
import styles from './MovieInformation.module.scss';

function MovieInformation() {
  const { movie, isLoading, error } = useSelector((state) => state.movie);
  const { data } = useSelector((state) => state.movies);
  const loading = useSelector((state) => state.loading);

  const [open, setOpen] = React.useState(false);
  console.log(data);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <RingLoader size={150} color="#123abc" loading />
      </div>
    );
  }

  return (
    movie ? (
      <div className={styles.container}>
        <div className={styles.movieContainer}>
          <img className={styles.posterPath} alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <div className={styles.movieInformation}>
            <div className={styles.movieTop}>
              <h2 className={styles.title}>{movie.title}</h2>
              <p className={styles.subtitle}>{movie.tagline}</p>
              <StarRatings rating={movie.vote_average / 2} numberOfStars={5} starDimension="20px" starSpacing="4px" />
              <p><span className={styles.titles}>Number of Votes:</span> {movie.vote_count}</p>
              <p className={styles.information}> <span className={styles.titles}>Release Date: </span> {movie.release_date}</p>
              <p className={styles.information}>  <span className={styles.titles}>Runtime: </span>{movie.runtime} Mins</p>
              <p className={styles.synopsis}><span className={styles.titles}>Information:</span> <h6 className={styles.textSummary}>{movie.overview}</h6></p>
            </div>

            <div className={styles.movieMiddle}>
              <div className={styles.genres}>
                <h5 className={styles.genreTitle}>Genres</h5>
                <ul className={styles.genreList}>
                  {movie.genres.map((genre, i) => (
                    <Link className={styles.links} to="/" key={i}> {genre.name} <RiSendPlaneLine />  </Link>
                  ))}
                </ul>
              </div>

              <div className={styles.languages}>
                <h5 className={styles.genreTitle}>Langugaes</h5>
                <ul className={styles.genreList}>
                  {movie.spoken_languages.map((lan, i) => (
                    <p className={styles.lang} key={i}>{lan.name}</p>
                  ))}
                </ul>
              </div>

              <div className={styles.cast}>
                <h5 className={styles.castTitle}>Cast</h5>
                {movie.cast.map((character, i) => (
                  <img key={i} className={styles.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                ))}
              </div>

            </div>

            <div className={styles.buttons}>
              <button type="button" className={styles.button}>
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`}> IMDB  <FaImdb className={styles.icon} /></a>
              </button>
              <button type="button" className={styles.button} onClick={handleOpen}>
                Trailer
                <BsPlay className={styles.icon} />
              </button>
              <button type="button" className={styles.button}>
                <a href={`${movie.homepage}`}>Website <FiLink className={styles.icon} /> </a>
              </button>
            </div>

          </div>
        </div>

        <div>
          <h1>Recomendations</h1>
          <h1>Recomendations</h1>
          <h1>Recomendations</h1>
          <h1>Recomendations</h1>
          <h1>Recomendations</h1>
          <h1>Recomendations</h1>
          <h1>Recomendations</h1>
          <h1>Recomendations</h1>
        </div>
        {/* <div className={styles.overview}>
          <h2>{movie.title}</h2>
          <p className={styles.subtitle}>{movie.tagline}</p>
          <StarRatings rating={movie.vote_average / 2} numberOfStars={5} starDimension="20px" starSpacing="4px" />
          <p>Number of Votes: {movie.vote_count}</p>
          <div>
            <p>Release Date: {movie.release_date}</p>
            <p>Runtime: {movie.runtime} Mins</p>
            <ul>
              {movie.spoken_languages.map((lan, i) => (
                <li key={i}>Language: {lan.name}</li>
              ))}
            </ul>
          </div>
          <p>Information</p>
          <h6>{movie.overview}</h6>
          <div>
            <ul>
              {movie.genres.map((genre, i) => (
                <li key={i}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <div className={styles.castContainer}>
            <p className={styles.castName}>Cast</p>
            <ul className={styles.cast}>
              {movie.cast.map((character, i) => (
                <li className={styles.castImages} key={i}>
                  <img className={styles.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.button} href={`https://www.imdb.com/title/${movie.imdb_id}`}> IMDB  <FaImdb className={styles.icon} /></button>
            <button className={styles.button} type="button" onClick={handleOpen}>
              Trailer
              <BsPlay className={styles.icon} />
            </button>
            <button type="button" className={styles.button} href={`${movie.homepage}`}>Website <FiLink className={styles.icon} /> </button>
          </div>
        </div> */}
        <Modal
          open={open}
          onClose={handleClose}
        >

          { movie.videos.results ? (
            <iframe
              frameBorder="0"
              height="50%"
              width="50%"
              title="Video Player"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].id}`}
            />
          ) : null }

        </Modal>
      </div>
    ) : <Redirect to="/" />
  );
}

export default MovieInformation;

{ /* const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`; */ }
// {console.log(movie.videos)}
