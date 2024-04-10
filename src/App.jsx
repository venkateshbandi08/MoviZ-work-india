import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres, getMovies } from "./store/homeSlice";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Search from "./pages/searchResult/Search";
import Explore from "./pages/explore/Explore";
import NotFoundPage from "./pages/404/NotFoundPage";

import "react-toastify/dist/ReactToastify.css";
import Upcoming from "./pages/upcoming/Upcoming";
import TopRatedPage from "./pages/topRated/TopRatedPage";
import Popular from "./pages/popular/Popular";
const App = () => {
  const url = useSelector((state) => state.home.url);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/explore/upcoming" element={<Upcoming />} />
        <Route path="/explore/toprated" element={<TopRatedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
