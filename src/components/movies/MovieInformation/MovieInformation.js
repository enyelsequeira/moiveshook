import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import { Modal, Typography } from '@material-ui/core';

import StarRatings from 'react-star-ratings';
import { FaImdb } from 'react-icons/fa';
import { BsPlay } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';
import { RiSendPlaneLine } from 'react-icons/ri';
import Backdrop from '@material-ui/core/Backdrop';
import { selectGenre } from '../../../actions';
import styles from './MovieInformation.module.scss';
// import useStyles from './styles';

function MovieInformation() {
  const { movie } = useSelector((state) => state.movie);
  const loading = useSelector((state) => state.loading);
  // const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

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
              <div className={styles.ratingSection}>
                <StarRatings rating={movie.vote_average / 2} numberOfStars={5} starDimension="22px" starSpacing="2px" />
                <span className={styles.votes}>{movie.vote_average}</span>
              </div>
              {/* make grayish and a bit bigger, add spaces between / */}
              <p className={styles.runtime}>{movie.runtime}mins / <span>{movie.release_date}</span> / <span>{movie.spoken_languages[0].name}</span></p>
            </div>
            <div className={styles.movieMiddle}>
              <div className={styles.genres}>
                <h5 className={styles.genreTitle}>Genres:</h5>
                <ul className={styles.genreList}>
                  {movie.genres.map((genre, i) => (
                    <Link className={styles.links} to="/" onClick={() => dispatch(selectGenre(genre.id, 1))} key={i}><Typography>{genre.name}</Typography><RiSendPlaneLine /></Link>
                  ))}
                </ul>
              </div>
              <div className={styles.synopsisContainer}>
                <h5 className={styles.synopsis}>Information:</h5>
                <p className={styles.textSummary}>{movie.overview}</p>
              </div>

              {/* <div className={styles.languages}>
                <h5 className={styles.langTitle}>Languages</h5>
                <ul className={styles.genreList}>
                  {movie.spoken_languages.map((lan, i) => (
                    <p className={styles.lang} key={i}>{lan.name}</p>
                  ))}
                </ul>
              </div> */}
              <div className={styles.cast}>
                <h5 className={styles.castTitle}>Cast:</h5>
                <ul className={styles.castList}>
                  {console.log(movie.cast)}
                  {movie.cast.map((character, i) => (
                    <img key={i} className={styles.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.left}>
                <a className={styles.button} target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${movie.imdb_id}`}> IMDB  <FaImdb className={styles.icon} /></a>
                <button type="button" className={styles.button} onClick={handleOpen}>
                  Trailer
                  <BsPlay className={styles.icon} />
                </button>
                <a className={styles.button} target="_blank" rel="noopener noreferrer" href={`${movie.homepage}`}>Website <FiLink className={styles.icon} /> </a>
              </div>
              <Link to="/">
                <button type="button" className={styles.right}>Back</button>
              </Link>
            </div>
          </div>
        </div>
        <Modal
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 900,
          }}
          className={styles.modalVideo}
          open={open}
          onClose={handleClose}
        >
          {
            movie.videos.results
              ? <iframe className={styles.video} frameBorder="0" title="Video Player" src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`} />
              : null
          }

        </Modal>

      </div>
    ) : <Redirect to="/" />
  );
}

export default MovieInformation;
