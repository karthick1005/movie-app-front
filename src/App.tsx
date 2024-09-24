import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./api/axiosConfig";
import { Route, Routes, useAsyncError } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Trailer from "./components/Trailer/Trailer";
import Review from "./components/Review/Review";
import NotFound from "./components/Notfound/NotFound";
import Spinner from "react-bootstrap/Spinner";
interface review {
  body: string;
}
interface movie {
  poster: string | undefined;
  title: string | undefined;
  backdrops: string[];
  trailerLink: string;
  imdbId: string;
}

function App() {
  const [movies, setmovies] = useState([]);
  const [movie, setmovie] = useState<movie>();
  const [reviews, setreviews] = useState<review[]>([]);
  console.log = () => {};
  const getMovies = async (): Promise<void> => {
    try {
      const resp = await api.get("/api/v1/movies");
      console.log(resp.data);
      setmovies(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getmoviedata = async (movieid: string | undefined) => {
    try {
      const resp = await api.get(`/api/v1/movies/${movieid}`);
      const singlemovie = resp.data;
      setmovie(singlemovie);
      setreviews(singlemovie.reviewIds);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  if (movies.length == 0) {
    return (
      <div className="App">
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Spinner animation="border" />
          <div>Loading</div>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Review
                movie={movie}
                getMovieData={getmoviedata}
                reviews={reviews}
                setReviews={setreviews}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
