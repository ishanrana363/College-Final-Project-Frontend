import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/feature/auth/authSlice";
import { useLogoutUserMutation } from "../../redux/feature/auth/authApi";
import Swal from "sweetalert2";
import CartModal from "../cart-modal/CartModal";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchFormOpen, setSearchFormOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);


  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleSearchForm = () => setSearchFormOpen(!isSearchFormOpen);
  const toggleNavbar = () => setIsDropdownOpen(!isDropdownOpen);

  const { user } = useSelector((state) => state.auth);

  const adminDropdown = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Items", path: "/dashboard/manage-items" },
    { label: "All Orders", path: "/dashboard/all-orders" },
    { label: "Add Products", path: "/dashboard/add-products" },
  ];

  const userDropdown = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownOptions = useMemo(
    () => (user?.role === "admin" ? adminDropdown : userDropdown),
    [user]
  );

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = () => {
    try {
      dispatch(logout());
      logoutUser().unwrap();
      Swal.fire({
        title: "Logged Out Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      })
      window.location.href = "/";
    } catch (error) {
      Swal.fire({
        title: "Logout failed",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      })
      console.error(error)
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-400 to-orange-500">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                className="w-10 rounded-full"
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
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop"
                    className="relative group transition-all duration-300"
                  >
                    Shop
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pages"
                    className="relative group transition-all duration-300"
                  >
                    Pages
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="relative group transition-all duration-300"
                  >
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Icons Section */}
          <div>
            <nav>
              <ul className="flex gap-6 items-center">
                {/* Search Icon */}
                <li>
                  <button onClick={toggleSearchForm} aria-label="Search">
                    <img
                      className="w-6 hover:opacity-80 transition-opacity duration-300"
                      src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1732979094/search_q0taov.png"
                      alt="Search"
                    />
                  </button>
                </li>

                {/* Cart Icon */}
                <li>
                  <button className="flex  " onClick={toggleSidebar} aria-label="Cart">
                    <p className="-mt-4  font-bold  " >
                      {
                        products?.length
                      }
                    </p>
                    <img
                      className="w-6 hover:opacity-80 transition-opacity duration-300"
                      src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1732979093/add-card_yhxgks.png"
                      alt="Cart"
                    />
                  </button>
                </li>

                {/* User Dropdown */}
                <li>
                  {user ? (
                    <div className="relative">
                      {/* Profile Icon */}
                      <img
                        onClick={toggleNavbar}
                        src={user?.profileImg || "https://via.placeholder.com/40"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full cursor-pointer"
                      />

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute right-0 top-16 z-50 w-40 bg-white shadow-lg py-2 rounded-md border transform transition-transform duration-300 ${isDropdownOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                          }`}
                        role="menu"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dropdown
                      >
                        {dropdownOptions.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)} // Close dropdown on item click
                          >
                            {item.label}
                          </Link>
                        ))}
                        <li>
                          <Link onClick={handleLogout} className="ml-[19px]  " to={""}>Logout</Link>
                        </li>
                      </div>
                    </div>
                  ) : (
                    <NavLink to="/login" aria-label="Login">
                      <img
                        className="w-6 hover:opacity-80 transition-opacity duration-300"
                        src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1732979093/user_duftrh.png"
                        alt="Login"
                      />
                    </NavLink>
                  )}
                </li>

              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 right-0 h-full w-1/3 bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Cart</h2>
          <button
            onClick={toggleSidebar}
            className="text-red-500 font-bold text-lg"
            aria-label="Close Cart"
          >
            X
          </button>
        </div>
        <div className="p-4">
          <CartModal products={products} ></CartModal>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0  h-full bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Search Form */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-lg py-4 transform transition-transform duration-300 ${isSearchFormOpen ? "translate-y-0" : "-translate-y-full"
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
            aria-label="Close Search"
          >
            X
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
