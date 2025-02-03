import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  let location = useLocation();

  return (
    <div>
      <div className="cen">
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
            <li className="liwithouteco">
              <Link
                to="/"
                className={location.pathname === '/' ? 'text-white' : 'text-gray-500 hover:text-white'}
              >
                Home
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/about"
                className={location.pathname === '/about' ? 'text-white' : 'text-gray-500 hover:text-white'}
              >
                About
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/profile"
                className={location.pathname === '/profile' ? 'text-white' : 'text-gray-500 hover:text-white'}
              >
                My Profile
              </Link>
            </li>
            <li className="liwithouteco">
              <Link
                to="/contact"
                className={location.pathname === '/contact' ? 'text-white' : 'text-gray-500 hover:text-white'}
              >
                Contact
              </Link>
            </li>
            <button className="rounded-lg btn loginBtn">Login</button>
          </ul>
        </nav>
      </div>
    </div>
  );
};
