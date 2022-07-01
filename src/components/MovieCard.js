import React from "react";
import { Stack, Button, Card, CardContent, Typography } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const MovieCard = ({ movie, selectMovie }) => {
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const scrollUp = () => {
    window.scrollBy(0, -50000);
  };

  return (
    <Stack sx={{ padding: 1 }}>
      {movie.poster_path ? (
        <Stack sx={{ position: "relative" }}>
          <img
            alt=""
            src={`${imageUrl}${movie.poster_path}`}
            style={{ width: "100%", borderRadius: "10px 10px 10px 10px" }}
          />
          <Card
            className="image-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              color: "whitesmoke",
              fontFamily: "Quicksand",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              "&:hover": {
                opacity: 1,
                borderRadius: "10px 10px 10px 10px",
              },
            }}
          >
            <Card sx={{ fontSize: "1.25em" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  selectMovie(movie);
                  scrollUp();
                }}
              >
                See Movie Content
              </Button>
            </Card>
          </Card>
        </Stack>
      ) : (
        <Stack
          sx={{
            minHeight: "359px",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageNotSupportedIcon />
          No Content
        </Stack>
      )}
      <Card
        sx={{
          backgroundColor: "#EC7063",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          borderRadius: " 5px 5px 5px 5px",
          height: 80,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {movie.title}
          </Typography>
        </CardContent>

        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <StarRoundedIcon sx={{ color: "yellow" }} />
          <Typography
            variant="caption"
            style={{
              marginLeft: 3,
              marginRight: 7,
              fontWeight: 780,
              height: 15,
            }}
          >
            {movie.vote_average}/10
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default MovieCard;
