import React from "react";
import "./Home.css";
import { Navbar } from "./Navbar";
import EcoFriendlyCards from "./EcoFriendlyCards";
import CardContainer from "./WeCanHelpCard";
import Footer from "./footer";

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
          strokeLinecap="round"
          strokeLinejoin="miter"
        ></path>
      </svg>
      <h1 className="text-8xl text-white whatsec ">What Do We Do ??</h1>
      <div className="whatsection">
        <EcoFriendlyCards />
      </div>
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
        <rect x="0" y="0" width="900" height="600" fill="#000000"></rect>
        <path
          d="M0 481L10 478.5C20 476 40 471 60 473.8C80 476.7 100 487.3 120 495.7C140 504 160 510 180 509.8C200 509.7 220 503.3 240 488.7C260 474 280 451 300 456.3C320 461.7 340 495.3 360 512.7C380 530 400 531 420 528.8C440 526.7 460 521.3 480 514.7C500 508 520 500 540 495.7C560 491.3 580 490.7 600 477.7C620 464.7 640 439.3 660 437.7C680 436 700 458 720 473.2C740 488.3 760 496.7 780 491.8C800 487 820 469 840 457C860 445 880 439 890 436L900 433L900 601L890 601C880 601 860 601 840 601C820 601 800 601 780 601C760 601 740 601 720 601C700 601 680 601 660 601C640 601 620 601 600 601C580 601 560 601 540 601C520 601 500 601 480 601C460 601 440 601 420 601C400 601 380 601 360 601C340 601 320 601 300 601C280 601 260 601 240 601C220 601 200 601 180 601C160 601 140 601 120 601C100 601 80 601 60 601C40 601 20 601 10 601L0 601Z"
          fill="#96f550"
          strokeLinecap="round"
          strokeLinejoin="miter"
        ></path>
      </svg>
      <h1 className="text-8xl text-red-600 whatsec2 ">How we can help you ??</h1>
      <div className="whatsection2">
       <CardContainer/>
    <Footer/>
      </div>
    </div>
  );
};
