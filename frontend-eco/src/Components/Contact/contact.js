import React, { useState } from 'react';
import { Navbar } from '../Home b4 Login/Navbar';
import "../Home b4 Login/Home.css";
import "../../../src/styles.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      info: "support@ecolens.com",
      link: "mailto:support@ecolens.com"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone",
      info: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Office",
      info: "123 Eco Street, Green City, EC 12345",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <FaTwitter />,
      link: "https://twitter.com/ecolens"
    },
    {
      icon: <FaLinkedin />,
      link: "https://linkedin.com/company/ecolens"
    },
    {
      icon: <FaGithub />,
      link: "https://github.com/ecolens"
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-gray-800 text-white'>
      <Navbar/>
      
      {/* Page Header */}
      <div className='page-header'>
        <h1>Contact Us</h1>
        <p>
          Have questions about EcoLens? We're here to help! Reach out to us through any of the channels below.
        </p>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='contact-grid'>
          {/* Contact Form */}
          <div className='content-card'>
            <h2 className='text-2xl font-bold mb-6'>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <label className='form-label'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='form-input'
                  required
                />
              </div>
              <div className='mb-6'>
                <label className='form-label'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='form-input'
                  required
                />
              </div>
              <div className='mb-6'>
                <label className='form-label'>Subject</label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='form-input'
                  required
                />
              </div>
              <div className='mb-6'>
                <label className='form-label'>Message</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='4'
                  className='form-input'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='primary-button w-full'
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className='content-card mb-8'>
              <h2 className='text-2xl font-bold mb-6'>Contact Information</h2>
              <div className='space-y-6'>
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className='contact-info'
                  >
                    <div className='text-green-500'>{item.icon}</div>
                    <div>
                      <h3 className='font-bold'>{item.title}</h3>
                      <p>{item.info}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className='content-card'>
              <h2 className='text-2xl font-bold mb-6'>Follow Us</h2>
              <div className='social-links'>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='social-icon'
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
