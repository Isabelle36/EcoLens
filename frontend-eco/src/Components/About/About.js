import React from 'react';
import { Navbar } from '../Home b4 Login/Navbar';
import "../Home b4 Login/Home.css";
import "../../../src/styles.css";
import { FaLeaf, FaChartLine, FaUsers, FaGlobeAmericas, FaHandsHelping } from 'react-icons/fa';

export const About = () => {
  const features = [
    {
      icon: <FaLeaf />,
      title: "Environmental Monitoring",
      description: "Track and analyze environmental data in real-time to make informed decisions about sustainability."
    },
    {
      icon: <FaChartLine />,
      title: "Carbon Footprint Analysis",
      description: "Advanced analytics to measure and reduce your carbon footprint with actionable insights."
    },
    {
      icon: <FaUsers />,
      title: "Community Engagement",
      description: "Connect with like-minded individuals and organizations committed to environmental conservation."
    }
  ];

  const impactStats = [
    {
      number: "50K+",
      label: "Active Users"
    },
    {
      number: "100K",
      label: "Trees Saved"
    },
    {
      number: "500K",
      label: "CO₂ Reduction (kg)"
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-gray-800 text-white'>
      <Navbar />
      
      {/* Page Header */}
      <div className='page-header'>
        <h1>About EcoLens</h1>
        <p>
          EcoLens is a cutting-edge environmental monitoring platform that empowers individuals and organizations 
          to make a positive impact on our planet through data-driven sustainability practices.
        </p>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Mission Section */}
        <div className='content-card'>
          <div className='flex items-center justify-center mb-6'>
            <FaGlobeAmericas className='text-4xl text-green-500 mr-4' />
            <h2 className='text-3xl font-bold'>Our Mission</h2>
          </div>
          <p className='text-center text-gray-300 text-lg'>
            To revolutionize environmental consciousness by providing accessible tools and insights 
            that enable everyone to understand and reduce their environmental impact, creating a 
            sustainable future for generations to come.
          </p>
        </div>

        {/* Features Grid */}
        <div className='features-grid'>
          {features.map((feature, index) => (
            <div key={index} className='feature-card'>
              <div className='feature-icon'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold mb-3'>{feature.title}</h3>
              <p className='text-gray-300'>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className='content-card'>
          <h2 className='text-3xl font-bold text-center mb-8'>Our Impact</h2>
          <div className='impact-stats'>
            {impactStats.map((stat, index) => (
              <div key={index}>
                <div className='stat-number'>{stat.number}</div>
                <div className='text-gray-300'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className='content-card text-center'>
          <div className='flex items-center justify-center mb-6'>
            <FaHandsHelping className='text-4xl text-green-500 mr-4' />
            <h2 className='text-3xl font-bold'>Join Our Mission</h2>
          </div>
          <p className='text-gray-300 mb-6'>
            Be part of the solution. Join EcoLens today and help us create a more sustainable future.
          </p>
          <button className='primary-button'>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
