import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const userId = localStorage.getItem("userId");
const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [dialogHeading, setDialogHeading] = useState("");
  const [movieToBeAdded, setMovieToBeAdded] = useState({});
  const [open, setOpen] = React.useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setSnackBarOpen(false);
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.table(movies);
  // we have to pass use effect into [] because each time new url is fetched results can be rendered accordingly
  // this is generally used when we use a outside variable inside a useEffect -async function
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    }
    // if trailer is not found we append the string with the moviee name and then find the trailer
    else {
      setOpen(true);
      setDialogHeading(movie?.title || movie?.name || movie?.original_name);
      setMovieToBeAdded(movie);
      movieTrailer(null, { tmdbId: movie.id })
        .then((url) => {
          new URLSearchParams();
          console.log("url is " + url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("urlParamsn" + urlParams);
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
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
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
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Added to List"
        action={action}
      />
      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
    </div>
  );
}

export default Row;
