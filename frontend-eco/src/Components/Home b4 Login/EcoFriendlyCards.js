import React from "react";

export default function EcoFriendlyCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-28">
      <div className="bg-transparent w-50 h-80 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-center text-white border border-green-500 relative mr-14">
        <div className="absolute inset-0 bg-transparent blur-2xl opacity-20"></div>
        <h2 className="text-5xl font-bold text-green-400 ecoTag">Eco Awareness</h2>
        <p className="mt-20 text-gray-300 text-lg">
          Learn about the impact of daily habits on the environment and how to make sustainable choices. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, ex cumque aliquid dolorum harum illum explicabo laudantium voluptatem voluptate. Dicta unde, ad numquam nisi quaerat nemo eius. Natus, a error.
        </p>
      </div>
      <div className="bg-transparent w-50 h-80 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-center text-white border border-green-500 relative mr-14">
        <div className="absolute inset-0 bg-transparent blur-2xl opacity-20"></div>
        <h2 className="text-5xl font-bold text-green-400 ecoTag">Chihiro</h2>
        <p className="mt-20 text-gray-300 text-lg">
          Learn about the impact of daily habits on the environment and how to make sustainable choices. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, ex cumque aliquid dolorum harum illum explicabo laudantium voluptatem voluptate. Dicta unde, ad numquam nisi quaerat nemo eius. Natus, a error.
        </p>
      </div>
      <div className="bg-transparent w-50 h-80 rounded-xl shadow-lg p-4 flex flex-col justify-center items-center text-center text-white border border-green-500 relative mr-14">
        <div className="absolute inset-0 bg-transparent blur-2xl opacity-20"></div>
        <h2 className="text-5xl font-bold text-green-400 ecoTag">Wildflower</h2>
        <p className="mt-20 text-gray-300 text-lg">
          Learn about the impact of daily habits on the environment and how to make sustainable choices. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore, ex cumque aliquid dolorum harum illum explicabo laudantium voluptatem voluptate. Dicta unde, ad numquam nisi quaerat nemo eius. Natus, a error.
        </p>
      </div>
    </div>
  );
}