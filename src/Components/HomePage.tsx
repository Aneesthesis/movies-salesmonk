import React, { useContext, useEffect, useState } from "react";
import { Store, Movie, StoreContextProps } from "../Store/Store";
import axios from "axios";

interface HomepageProps {
  // Add any props if needed
}

const Homepage: React.FC<HomepageProps> = () => {
  const context = useContext(Store);

  if (!context) {
    throw new Error("useContext must be inside a StoreProvider");
  }

  const { state, dispatch } = context as StoreContextProps;
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/movies");
        const data: Movie[] = response.data.movies;

        dispatch({ type: "FETCH_MOVIES_SUCCESS", payload: data });
      } catch (error) {
        console.error("Error fetching movies:", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [dispatch]);

  const filteredMovies = state.movies?.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="my-3 mx-4 flex flex-col ">
        <h1 className="text-2xl w-[50%]">The best movie reviews site!</h1>
        <div className="mb-4  my-2 w-[50%]">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <ul className="flex flex-wrap">
          {filteredMovies?.map((movie) => (
            <li className="w-[30%] mx-4 my-4" key={movie._id}>
              <div className="card">
                <h2>{movie.name}</h2>
                <p className="italic">Released: {movie.releaseDate}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Homepage;
