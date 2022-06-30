import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import {
  Button,
  Stack,
  Card,
  Typography,
  Grid,
  Box,
  Modal,
} from "@mui/material";

function App() {
  const imageUrl = "https://image.tmdb.org/t/p/w1280";
  const API_URL = "https://api.themoviedb.org/3";
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMovies = async (searchValue) => {
    const type = searchValue ? "search" : "discover";

    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchValue,
      },
    });

    setMovies(results);
    await selectMovie(results[0]);
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: "videos",
      },
    });

    return data;
  };

  const selectMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    setSelectedMovie(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderTrailer = () => {
    let data = null;

    if (selectedMovie.videos.results.length > 0) {
      const trailer = selectedMovie.videos.results.find(
        (video) => video.name === "Official Trailer"
      );
      const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;

      data = (
        <iframe
          key={key}
          title="YouTubePlayer"
          src={`https://www.youtube.com/embed/${key}`}
          frameBorder="0"
          allowFullScreen
          width="90%"
          height="700"
        />
      );
    } else {
      data = (
        <img
          src="https://images.drivereasy.com/wp-content/uploads/2017/10/this-video-is-not-available-1.jpg"
          alt=""
          style={{ width: 1450, height: 500 }}
        />
      );
    }

    return data;
  };

  const renderMovies = () =>
    movies.map((movie) => (
      <Grid item xs={12} sm={6} md={3} key={movie.id}>
        <MovieCard movie={movie} selectMovie={selectMovie} />
      </Grid>
    ));

  const searchMovies = (e) => {
    fetchMovies(searchValue);
    e.preventDefault();
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#2E4053",

        color: "whitesmoke",
      }}
    >
      <Grid item xs={12} sm={12} md={12}>
        {" "}
        <Navbar
          searchMovies={searchMovies}
          setSearchValue={setSearchValue}
          setMovies={setMovies}
          selectMovie={selectMovie}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Card
          sx={{
            backgroundImage: `url('${imageUrl}${selectedMovie.backdrop_path}')`,
            minHeight: "700px",

            backgroundSize: "cover",
            display: "flex",
            alignItems: "flex-end",
            color: "whitesmoke",
          }}
        >
          {" "}
          <Stack
            sx={{
              maxWidth: "70%",
              paddingBottom: "60px",
              display: "grid",
              padding: "30px",
            }}
          >
            <Box sx={{ px: 30, alignItems: "center" }}>
              {modalOpen && (
                <Modal
                  open={true}
                  onClose={handleClose}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedMovie.videos && playTrailer ? renderTrailer() : null}
                </Modal>
              )}
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setPlayTrailer(true);
                setModalOpen(true);
              }}
              style={{ width: 180, marginTop: 10 }}
            >
              Play Trailer
            </Button>
            <Typography sx={{ fontSize: "60px", margin: 0, fontWeight: 600 }}>
              {selectedMovie.title}
            </Typography>
            {selectedMovie.overview ? (
              <Typography>{selectedMovie.overview}</Typography>
            ) : null}
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          sx={{
            maxWidth: "1100px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "15px",
          }}
        >
          {renderMovies()}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
