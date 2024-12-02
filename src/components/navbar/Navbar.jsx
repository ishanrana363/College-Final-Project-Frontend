import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchFormOpen, setSearchFormOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearchForm = () => {
    setSearchFormOpen(!isSearchFormOpen);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-400 via-red-300 to-orange-500">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to={`/`}>
              <img
                className="w-20 rounded-full"
                src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1732978784/e-commerce-logo_exvcsm.webp"
                alt="E-commerce Logo"
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div>
            <nav>
              <ul className="flex gap-8 items-center text-lg font-bold">
                <li>
                  <NavLink
                    to="/"
                    className="relative group transition-all duration-300"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop"
                    className="relative group transition-all duration-300"
                  >
                    Shop
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pages"
                    className="relative group transition-all duration-300"
                  >
                    Pages
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="relative group transition-all duration-300"
                  >
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Icons Section */}
          <div>
            <nav>
              <ul className="flex gap-6 ">
                <li>
                  <button onClick={toggleSearchForm}>
                    <img
                      className="w-6 hover:opacity-80 transition-opacity duration-300"
                      src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1732979094/search_q0taov.png"
                      alt="Search"
                    />
                  </button>
                </li>
                <li>
                  <button onClick={toggleSidebar}>
                    <img
                      className="w-6 hover:opacity-80 transition-opacity duration-300"
                      src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1732979093/add-card_yhxgks.png"
                      alt="Cart"
                    />
                  </button>
                </li>
                <li>
                  <NavLink to="/login">
                    <img
                      className="w-6 hover:opacity-80 transition-opacity duration-300"
                      src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1732979093/user_duftrh.png"
                      alt="Profile"
                    />
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Cart</h2>
          <button
            onClick={toggleSidebar}
            className="text-red-500 font-bold text-lg"
          >
            X
          </button>
        </div>
        <div className="p-4">
          {/* Add cart items here */}
          <p>Your cart is currently empty.</p>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Search Form */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-lg py-4 transform transition-transform duration-300 ${
          isSearchFormOpen ? "translate-y-0" : "-translate-y-full"
        } flex justify-center items-center`}
      >
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Search submitted:", e.target.elements.search.value);
          }}
        >
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="w-[60vh] p-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 transition"
          >
            Submit
          </button>
          <button
            onClick={toggleSearchForm}
            type="button"
            className="ml-2 text-red-500 font-bold text-lg"
          >
            X
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;

