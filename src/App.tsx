// src/App.tsx
import React, { Suspense, ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import DetailsPage from "./Components/DetailsPage";
import CreateMoviePage from "./Components/CreateMoviePage";
import CreateReviewPage from "./Components/CreateReviewPage";
import Header from "./Components/Header";
import NotFound from "./Components/NotFound";
import Footer from "./Components/Footer";

function App(): ReactElement {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route
                index
                element={
                  <Suspense
                    fallback={
                      <div>
                        Welcome to Movie Critic! Please wait while we load
                        movies...
                      </div>
                    }
                  />
                }
              />
            </Route>

            <Route path="/movie-detail" element={<DetailsPage />} />
            <Route path="/create-movie" element={<CreateMoviePage />} />
            <Route
              path="/:movie/create-review"
              element={<CreateReviewPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
