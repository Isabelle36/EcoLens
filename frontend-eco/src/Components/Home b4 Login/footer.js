import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black relative top-44 text-white py-6 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between footgonebad items-center">
        

          {/* Follow Us */}
          <div className="w-full sm:w-1/2 mb-4 ">
            <h3 className="text-xl font-semibold mb-2 ml-7">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="/" className="text-white hover:text-blue-500">
                <FaFacebookF />
              </a>
              <a href="/" className="text-white hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="/" className="text-white hover:text-pink-500">
                <FaInstagram />
              </a>
              <a href="/" className="text-white hover:text-blue-700">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm font-light">
            &copy; {new Date().getFullYear()} EcoLens | All rights reserved. | <span className="text-green-400">Go Green, Stay Green</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;