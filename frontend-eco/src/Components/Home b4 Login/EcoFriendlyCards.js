import React from "react";

export default function EcoFriendlyCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-28 cursor-pointer">
      <div className="bg-transparent w-50 h-80 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-center text-white border border-green-500 relative mr-14">
        <div className="absolute inset-0 bg-transparent blur-2xl opacity-20"></div>
        <h2 className="text-5xl font-bold text-green-400 ecoTag">Eco-Conscious</h2>
        <p className="mt-20 text-gray-300 text-lg">
        Discover products that align with sustainability goals. EcoLens simplifies eco-friendly choices, ensuring your lifestyle is kind to both you and the environment        </p>
      </div>
      <div className="bg-transparent w-50 h-80 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-center text-white border border-green-500 relative mr-14">
        <div className="absolute inset-0 bg-transparent blur-2xl opacity-20"></div>
        <h2 className="text-5xl font-bold text-green-400 ecoTag">Sustainable Products</h2>
        <p className="mt-20 text-gray-300 text-lg">
        EcoLens verifies product sustainability and provides insights to help you embrace an eco-friendly lifestyle, reducing your carbon footprint effortlessly        </p>
      </div>
      <div className="bg-transparent w-50 h-80 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-center text-white border border-green-500 relative mr-14">
        <div className="absolute inset-0 bg-transparent blur-2xl opacity-20"></div>
        <h2 className="text-5xl font-bold text-green-400 ecoTag">Healthier Choices</h2>
        <p className="mt-20 text-gray-300 text-lg">
        EcoLens connects you with eco-friendly solutions, combining health benefits and environmental consciousness for a better tomorrow        </p>
      </div>
    </div>
  );
}