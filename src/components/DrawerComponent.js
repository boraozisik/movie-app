import React from "react";
import { useState } from "react";
import {
  Stack,
  Drawer,
  List,
  ListItemText,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Urls } from "../Constansts";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

import axios from "axios";

const DrawerComponent = ({
  searchMovies,
  setSearchValue,
  setMovies,
  selectMovie,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const open = Boolean(anchorElement);

  const params = {
    params: {
      api_key: process.env.REACT_APP_MOVIE_API_KEY,
      query: "discover",
    },
  };

  const handleClearClick = () => {
    const text = document.getElementById("search-text");
    text.value = "";
  };
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorElement(event.currentTarget);
  };
  const handleClose = async (event) => {
    let results = null;

    switch (event.target.id) {
      case "in_theatres":
        ({
          data: { results },
        } = await axios.get(Urls.in_theathers, params));
        break;
      case "most_popular_now":
        ({
          data: { results },
        } = await axios.get(Urls.most_popular_now, params));
        break;
      case "most_popular_actions_now":
        ({
          data: { results },
        } = await axios.get(Urls.most_popular_actions_now, params));
        break;
      case "most_popular_dramas_now":
        ({
          data: { results },
        } = await axios.get(Urls.most_popular_dramas_now, params));
        break;
      case "most_popular_crimes_now":
        ({
          data: { results },
        } = await axios.get(Urls.most_popular_crimes_now, params));
        break;
      case "most_popular_science-fictions_now":
        ({
          data: { results },
        } = await axios.get(Urls.most_popular_science_fictions_now, params));
        break;
      case "most_popular_comedies_now":
        ({
          data: { results },
        } = await axios.get(Urls.most_popular_comedies_now, params));
        break;

      default:
        ({
          data: { results },
        } = await axios.get(Urls.default, params));
        break;
    }

    setMovies(results);
    await selectMovie(results[0]);
    setAnchorElement(null);
    setOpenDrawer(!openDrawer);
    window.scrollBy(0, -5000);
  };
  const setDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="error"
              style={{
                borderRadius: "15px 15px 15px 15px",

                marginLeft: "20px",
                height: 47,
              }}
              onClick={setDrawer}
            >
              Close Tab
            </Button>

            <ListItemText sx={{ marginBottom: 5, marginTop: 2 }}>
              <hr />
              <form
                onSubmit={(e) => {
                  searchMovies(e);
                  setDrawer();
                  window.scrollBy(0, -5000);
                }}
              >
                <Stack direction="row">
                  <TextField
                    id="search-text"
                    label="Search for movies..."
                    variant="filled"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClearClick}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    endIcon={<SearchIcon />}
                    style={{
                      marginLeft: 10,
                      height: 48,
                      borderRadius: "5px 15px 15px 5px",
                      backgroundColor: "#1F618D",
                    }}
                  >
                    Search
                  </Button>
                </Stack>
              </form>
            </ListItemText>
            <ListItemText>
              <Button
                id="filter-movies-button"
                variant="contained"
                size="medium"
                onClick={handleClick}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ backgroundColor: "#1F618D", height: 47 }}
              >
                Show Movies...
              </Button>
              <Menu
                id="movie-filters"
                anchorEl={anchorElement}
                open={open}
                MenuListProps={{
                  "aria-labelledby": "filter-movies-button",
                }}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem id="in_theatres" onClick={handleClose}>
                  {" "}
                  <CircleTwoToneIcon
                    sx={{ width: 12, marginRight: 0.6, color: "#EC7063" }}
                  />{" "}
                  In Theatres
                </MenuItem>
                <MenuItem id="most_popular_now" onClick={handleClose}>
                  <CircleTwoToneIcon
                    sx={{ width: 12, marginRight: 0.6, color: "#EC7063" }}
                  />
                  Most Popular Now
                </MenuItem>
                <MenuItem id="most_popular_actions_now" onClick={handleClose}>
                  <CircleTwoToneIcon
                    sx={{ width: 12, marginRight: 0.6, color: "#EC7063" }}
                  />
                  Most Popular Actions Now
                </MenuItem>
                <MenuItem id="most_popular_dramas_now" onClick={handleClose}>
                  <CircleTwoToneIcon
                    sx={{ width: 12, marginRight: 0.6, color: "#EC7063" }}
                  />
                  Most Popular Dramas Now
                </MenuItem>
                <MenuItem id="most_popular_crimes_now" onClick={handleClose}>
                  <CircleTwoToneIcon
                    sx={{ width: 12, marginRight: 0.6, color: "#EC7063" }}
                  />
                  Most Popular Crimes Now
                </MenuItem>
                <MenuItem
                  id="most_popular_science-fictions_now"
                  onClick={handleClose}
                >
                  <CircleTwoToneIcon
                    sx={{ width: 12, marginRight: 0.6, color: "#EC7063" }}
                  />
                  Most Popular Science-Fictions Now
                </MenuItem>
                <MenuItem id="most_popular_comedies_now" onClick={handleClose}>
                  <CircleTwoToneIcon
                    sx={{ width: 12, marginRight: 0.6, color: "#EC7063" }}
                  />
                  Most Popular Comedies Now
                </MenuItem>
              </Menu>
            </ListItemText>
          </Container>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
