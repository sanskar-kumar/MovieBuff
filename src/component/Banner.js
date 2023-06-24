import "./Banner.css";
import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle } from "@mui/material";

const userId = localStorage.getItem("userId");

function Banner() {
  const [movie, setMovie] = useState([]);
  const [dialogHeading, setDialogHeading] = useState("");
  const [movieToBeAdded, setMovieToBeAdded] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setSnackBarOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      const lengthh = request.data.results.length - 1;
      setMovie(request.data.results[Math.floor(Math.random() * lengthh)]);
      return request;
    }
    fetchData();
  }, []);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      setOpen(true);
      setDialogHeading(movie?.title || movie?.name || movie?.original_name);
      setMovieToBeAdded(movie);
      movieTrailer(movie.id, { tmdbId: movie.id })
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  const addToList = async (movie) => {
    setOpen(false);
    // console.log("add to list clicked");
    try {
      const docRef = await addDoc(collection(db, "myList"), {
        userId: userId,
        movie: movie,
      });
      // console.log("Document written with ID: ", docRef.id);
      setSnackBarOpen(true);
    } catch (error) {
      console.log("Error writing the data into My List");
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const navigate = useNavigate();

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center-center",
      }}
    >
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>{dialogHeading}</DialogTitle>
        <DialogContent>
          <YouTube videoId={trailerUrl} opts={opts} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => addToList(movieToBeAdded)} autoFocus>
            <AddIcon /> Add to List
          </Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button"
              onClick={() => handleClick(movie)}
            >
              Play
            </button>
            <button
              className="banner_button"
              onClick={() => navigate("/myList")}
            >
              My List
            </button>
          </div>
          <h1 className="banner_description">{movie?.overview}</h1>
          <div className="banner_fadebottom"></div>
        </div>
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Added to List"
        action={action}
      />
    </header>
  );
}

export default Banner;
