import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

export interface Movie {
  _id: string;
  name: string;
  releaseDate: String;
  averageRating: Number;
}

export interface Review {
  _id: string;
  movieId: string;
  reviewerName: string;
  rating: Number;
  reviewComments: string;
}

interface State {
  movies: Movie[];
}

type Action =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "DELETE_MOVIE"; payload: string }
  | { type: "FETCH_MOVIES_SUCCESS"; payload: Movie[] };

export interface StoreContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export const Store = createContext<StoreContextProps | undefined>(undefined);

const initialState: State = {
  movies: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_MOVIE":
      const newMovie = action.payload;
      const existingMovie = state.movies.find(
        (movie) => movie._id === newMovie._id
      );
      const updatedMovies = existingMovie
        ? state.movies.map((movie) =>
            movie._id === existingMovie._id ? newMovie : movie
          )
        : [...state.movies, newMovie];

      return {
        ...state,
        movies: updatedMovies,
      };

    case "DELETE_MOVIE":
      const removedMovieId = action.payload;
      const filteredMovies = state.movies.filter(
        (movie) => movie._id !== removedMovieId
      );

      return {
        ...state,
        movies: filteredMovies,
      };

    case "FETCH_MOVIES_SUCCESS":
      return { ...state, movies: action.payload };

    default:
      return state;
  }
}

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: StoreContextProps = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
