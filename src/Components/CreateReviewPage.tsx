import React, { useState, useContext } from "react";
import { Store, Movie, StoreContextProps } from "../Store/Store";
import axios from "axios";

interface AddReviewPageProps {}

const AddReviewPage: React.FC<AddReviewPageProps> = () => {
  const context = useContext(Store);

  if (!context) {
    throw new Error("useContext must be inside a StoreProvider");
  }

  const { state } = context as StoreContextProps;
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [comments, setComments] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/reviews", {
        movieId: selectedMovieId,
        reviewerName,
        rating,
        comments,
      });
      const newReview = response.data.review;

      console.log("Newly created review:", newReview);
    } catch (error) {
      console.error("Error while creating a review:", error);
    }

    setSelectedMovieId("");
    setReviewerName("");
    setRating(undefined);
    setComments("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="selectedMovieId"
            className="block text-sm font-medium text-gray-600"
          >
            Select Movie:
          </label>
          <select
            id="selectedMovieId"
            value={selectedMovieId}
            onChange={(e) => setSelectedMovieId(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="" disabled>
              Select a movie
            </option>
            {state.movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="reviewerName"
            className="block text-sm font-medium text-gray-600"
          >
            Reviewer Name:
          </label>
          <input
            type="text"
            id="reviewerName"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-600"
          >
            Rating (out of 10):
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="0"
            max="10"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-600"
          >
            Comments:
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewPage;
