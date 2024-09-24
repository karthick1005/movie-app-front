import { FC, useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import React from "react";
import Reviewform from "../Reviewform/Reviewform";
interface review {
  body: string;
}
interface Reviewtype {
  getMovieData: (movieId: string | undefined) => void;
  movie:
    | {
        poster: string | undefined;
        title: string | undefined;
        backdrops: string[];
        trailerLink: string;
        imdbId: string;
      }
    | undefined;
  reviews: review[];
  setReviews: React.Dispatch<React.SetStateAction<review[]>>;
}
const Review: FC<Reviewtype> = ({
  getMovieData,
  movie,
  reviews,
  setReviews,
}) => {
  const revText = useRef<HTMLTextAreaElement | null>(null);
  let params = useParams();
  const movieid = params.movieId;
  useEffect(() => {
    getMovieData(movieid);
  }, []);
  const addReview = async (e: any) => {
    console.log(e);
    e.preventDefault();
    console.log(revText.current);
    try {
      if (revText.current) {
        let rev = revText.current.value;
        const resp = await api.post("/api/v1/reviews", {
          reviewbody: rev,
          imdbId: movieid,
        });
        console.log(resp);
        const updatedreviews = [...reviews, { body: rev }];
        rev = "";
        setReviews(updatedreviews);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <Reviewform
                    handleSumbit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                    defaultValue=""
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r, i) => {
            console.log(r);
            return (
              <div key={i}>
                <Row key={i}>
                  <Col>{r?.body}</Col>
                </Row>
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Review;
