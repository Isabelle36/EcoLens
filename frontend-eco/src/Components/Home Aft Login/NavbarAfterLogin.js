import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";

export const NavbarAfterLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    auth.signOut();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="rounded-lg container navbar">
      <ul className="ulList">
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
            to="/notifications"
            className={
              location.pathname === "/notifications"
                ? "text-white"
                : "text-gray-500 hover:text-white"
            }
          >
            Notifications
          </Link>
        </li>
        <li className="liwithouteco">
          <Link
            to="/air-quality"
            className={
              location.pathname === "/air-quality"
                ? "text-white"
                : "text-gray-500 hover:text-white"
            }
          >
            Air Quality
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogoutClick}
            className="rounded-lg btn loginBtn"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
