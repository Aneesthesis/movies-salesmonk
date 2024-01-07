import axios from "axios";
import React, { useState } from "react";

interface CreateMoviePageProps {}

const CreateMoviePage: React.FC<CreateMoviePageProps> = () => {
  const [movieName, setMovieName] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send a POST request to http://localhost:8000
      await axios.post("http://localhost:8080/api/movies", {
        name: movieName,
        releaseDate: releaseDate,
      });

      console.log("Movie created successfully!");
    } catch (error) {
      console.error("Error creating movie:", error);
    }

    // Reset the form fields after submission
    setMovieName("");
    setReleaseDate("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="movieName"
            className="block text-sm font-medium text-gray-600"
          >
            Movie Name:
          </label>
          <input
            type="text"
            id="movieName"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium text-gray-600"
          >
            Release Date:
          </label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md "
          >
            Create Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMoviePage;
