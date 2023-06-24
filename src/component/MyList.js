import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MyList.css";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const MyList = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    if (userId === null) {
      // If client is not logged in, navigate to registration page
      navigate("/register");
    } else {
      const fetchData = async () => {
        const q = query(
          collection(db, "myList"),
          where("userId", "==", userId)
        );
        try {
          const querySnapshot = await getDocs(q);
          const newMovies = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const movieDetail = doc.data();
            const moviedbId = doc.id;
            newMovies.push({ movieDetail, moviedbId });
          });
          setMovies(newMovies);
        } catch (error) {
          console.log("Error fetching your lists");
        }
      };

      fetchData();
    }
  }, [userId,navigate]);

  const handleDelete = async (moviedbId) => {
    // Implement the delete functionality here
    try {
      await deleteDoc(doc(db, "myList", moviedbId));
      //   console.log("Deleting movie with id:", moviedbId);
      window.location.reload();
    } catch (error) {
      console.log("error in deleting", error);
    }
  };
  // console.log(movies);
  // console.log(movies[0].movieDetail.movie);

  return (
    <div>
      <Nav />
      <h2
        style={{
          textAlign: "center",
          fontSize: "5em",
          color: "whitesmoke",
          fontWeight: "bolder",
          margin: "5%",
          //   marginTop:"5%",
        }}
      >
        My List
      </h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.movieDetail.movie.id} className="movie-card">
            <img
              src={`${baseURL}${movie.movieDetail.movie.poster_path}`}
              alt={movie.movieDetail.movie.title}
              className="movie-image"
            />
            movie.movieDetail.
            <div className="movie-description">
              <h3>
                {movie.movieDetail.movie.title ||
                  movie.movieDetail.movie.name ||
                  movie.movieDetail.movie.original_name}
              </h3>
              <h4>
                {" "}
                {movie.movieDetail.movie.vote_average} (
                {movie.movieDetail.movie.vote_count} ratings)
              </h4>
              <h4>
                {" "}
                Release Date:-{" "}
                {movie.movieDetail.movie.release_date ||
                  movie.movieDetail.movie.first_air_date}
              </h4>
              <p>
                {movie.movieDetail.movie.description ||
                  movie.movieDetail.movie.overview}
              </p>
              <DeleteIcon
                className="delete-icon"
                style={{ color: "#ff6f00" }} // Neon orange color
                onClick={() => handleDelete(movie.moviedbId)}
              />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyList;
