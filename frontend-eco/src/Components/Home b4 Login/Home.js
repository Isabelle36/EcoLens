import React from "react";
import "./Home.css";
import { Navbar } from "./Navbar";
import EcoFriendlyCards from "./EcoFriendlyCards";

export const Home = () => {
  return (
    <div className="w-screen h-screen">
      <span className="rounded-full w-40 h-40 colo blur-2xl "></span>
      <span className="rounded-full w-40 h-40 bl blur-2xl "></span>
      <Navbar />
      <h1 className="text-8xl text-white">Eco Lens</h1>
      <p className="text-2xl tracking-wide leading-<4> text-white z-10 pag">
        At EcoLens, we help you stay informed and make healthier, eco-friendly
        choices. We provide real-time environmental insights, product
        eco-certification verification, and personalized health advice based on
        your location and lifestyle.
      </p>
      <button className="text-9xl px-8 py-4 rounded-md Getstartedbtn text-white">
        Get Started
      </button>
      <svg
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        className="wave1"
      >
        <rect x="0" y="0" width="900" height="600" fill="#262626"></rect>
        <path
          d="M0 408L25 411.2C50 414.3 100 420.7 150 426.2C200 431.7 250 436.3 300 431.8C350 427.3 400 413.7 450 421.3C500 429 550 458 600 475.7C650 493.3 700 499.7 750 493.5C800 487.3 850 468.7 875 459.3L900 450L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z"
          fill="#000000"
          stroke-linecap="round"
          stroke-linejoin="miter"
        ></path>
      </svg>
      <h1 className="text-8xl text-white whatsec ">What Do We Do ??</h1>
      <div className="whatsection">
      <EcoFriendlyCards/>
      </div>
    </div>
  );
};
