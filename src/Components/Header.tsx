import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav className="flex justify-between bg-gray-200 px-4 py-2">
        <div className="py-2">
          <Link to={"/"} className=" font-semibold">
            MOVIECRITIC
          </Link>
        </div>
        <div className="flex gap-x-4">
          <Link
            className="bg-indigo-600 text-white border border-white py-2 px-4"
            to={"/create-movie"}
          >
            Add new movie
          </Link>
          <Link
            className="bg-white text-indigo-600 border border-indigo-600 py-2 px-4"
            to={"/create-review"}
          >
            Add a review
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
