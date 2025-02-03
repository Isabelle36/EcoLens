import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="w-96 bg-black p-10 rounded-lg shadow-2xl wehlp transition-shadow duration-300 transform hover:-translate-y-2 hover:rotate-1 animate-float flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl font-semibold text-white mb-4">{title}</h2>
      <p className="text-blue-400 text-xl">{description}</p>
    </div>
  );
};

const CardContainer = () => {
  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-14">
        <Card
          title="Eco-friendly Product"
          description="Discover products that are both good for your health and the environment."
        />
        <Card
          title="Real-Time Alerts"
          description="Stay updated with air quality and water safety alerts based on your location."
        />
        <Card
          title="Personalized Health Tips"
          description="Get tips that match your health and eco-living goals."
        />
        <Card
          title="Carbon Footprint Reduction"
          description="Learn how to reduce your carbon footprint with simple lifestyle changes."
        />
      </div>
    </div>
  );
};

export default CardContainer;
