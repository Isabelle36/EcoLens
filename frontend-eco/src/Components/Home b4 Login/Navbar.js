import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once user state is determined
    });

    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    auth.signOut();
    setDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="rounded-lg container navbar">
      <ul className="ulList">
        <li className="Ecolens text-4xl z-10">
          <Link to="/">
            Eco Lens
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#57FF03"
              className="lens z-0"
            >
              <path d="M824-120 636-308q-41 32-90.5 50T440-240q-90 0-162.5-44T163-400h98q34 37 79.5 58.5T440-320q100 0 170-70t70-170q0-100-70-170t-170-70q-94 0-162.5 63.5T201-580h-80q8-127 99.5-213.5T440-880q134 0 227 93t93 227q0 56-18 105.5T692-364l188 188-56 56ZM397-400l-63-208-52 148H80v-60h160l66-190h60l61 204 43-134h60l60 120h30v60h-67l-47-94-50 154h-59Z" />
            </svg>
          </Link>
        </li>

        {loading ? (
          <li>
            <button className="rounded-lg btn loginBtn">Loading...</button>
          </li>
        ) : user ? (
          <>
            {/* After Login Navbar */}
            <li className="liwithouteco">
              <Link
                to="/verify-product"
                className={
                  location.pathname === "/verify-product"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                Verify Product
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/scan-product"
                className={
                  location.pathname === "/scan-product"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                Scan Product
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                My Profile
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                Contact
              </Link>
            </li>
            <li className="relative ml-5">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-14 h-14 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              ) : (
                <div
                  className="w-14 h-14 flex items-center justify-center bg-gray-300 text-white rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {getInitials(user.email)}
                </div>
              )}
              {dropdownOpen && (
                <div className="absolute left-0 mt-3 bg-white shadow-lg rounded-lg w-32 text-center">
                  <button
                    onClick={handleLogoutClick}
                    className="w-32 py-2 text-black hover:bg-red-700 rounded-lg text-xl"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            {/* Before Login Navbar */}
            <li className="liwithouteco">
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                Home
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/about"
                className={
                  location.pathname === "/about"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                About
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                My Profile
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact"
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                className="rounded-lg btn loginBtn"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
