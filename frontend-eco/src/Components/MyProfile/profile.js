import React, { useState } from 'react';
import { Navbar } from '../Home b4 Login/Navbar';
import "../Home b4 Login/Home.css";
import "../../../src/styles.css";
import { FaUser, FaEnvelope, FaLeaf, FaMedal } from 'react-icons/fa';

export const MyProfile = () => {
  // Placeholder data - in a real app, this would come from your backend
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    carbonScore: 85,
    ecoActivities: [
      "Planted 5 trees",
      "Reduced plastic usage by 30%",
      "Started composting"
    ],
    badges: ["Early Adopter", "Tree Planter", "Carbon Reducer"]
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-gray-800 text-white'>
      <Navbar />
      
      {/* Page Header */}
      <div className='page-header'>
        <h1>{userData.name}</h1>
        <p className='flex items-center justify-center gap-2'>
          <FaEnvelope className='text-green-500' />
          {userData.email}
        </p>
      </div>

      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* Profile Card */}
        <div className='content-card'>
          <div className='flex flex-col items-center mb-6'>
            <div className='profile-avatar mb-4'>
              <FaUser className='text-4xl' />
            </div>
            <p className='text-gray-400'>Member since {userData.joinDate}</p>
          </div>

          {/* Eco Stats */}
          <div className='grid md:grid-cols-2 gap-6 mb-8'>
            <div className='content-card'>
              <div className='flex items-center mb-4'>
                <FaLeaf className='text-green-500 mr-2 text-xl' />
                <h2 className='text-xl font-semibold'>Eco Score</h2>
              </div>
              <div className='text-3xl font-bold text-green-500'>{userData.carbonScore}</div>
              <p className='text-gray-400'>Carbon Reduction Points</p>
            </div>

            <div className='content-card'>
              <div className='flex items-center mb-4'>
                <FaMedal className='text-yellow-500 mr-2 text-xl' />
                <h2 className='text-xl font-semibold'>Achievements</h2>
              </div>
              <div className='flex flex-wrap gap-2'>
                {userData.badges.map((badge, index) => (
                  <span key={index} className='bg-green-600 px-3 py-1 rounded-full text-sm'>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className='content-card'>
            <h2 className='text-xl font-semibold mb-4'>Recent Eco Activities</h2>
            <ul className='space-y-3'>
              {userData.ecoActivities.map((activity, index) => (
                <li key={index} className='flex items-center'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
