import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review, Store, StoreContextProps } from "../Store/Store";
import axios from "axios";

interface DetailsPageProps {}

const DetailsPage: React.FC<DetailsPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(Store);

  if (!context) {
    throw new Error("useContext must be inside a StoreProvider");
  }

  const { state } = context as StoreContextProps;
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/reviews/${id}`);
        const reviews: Review[] = response.data.reviews;

        setMovieReviews(reviews);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchMovieReviews();
  }, [id]);

  return (
    <div>
      <h1>Movie Reviews</h1>
      {movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map((review) => (
            <li key={review._id} className="my-2">
              <div className="card">
                <h2>{review.reviewerName}</h2>
                <p>Rating: {+review.rating}/10</p>
                <p>{review.reviewComments}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default DetailsPage;
