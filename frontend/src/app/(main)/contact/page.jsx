'use client';
import React, { useState } from 'react';

const ContactPage = () => {
  // Form state to hold values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    internshipInterest: '',
  });

  // State for form submission status
  const [formStatus, setFormStatus] = useState('');

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (validation would go here)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation here (not implemented in this example)
    setFormStatus('Form submitted successfully!');
    // Reset the form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      internshipInterest: '',
    });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-indigo-600 shadow-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-semibold">Open Galaxy</div>
            <div className="space-x-4">
              <a href="/" className="text-white hover:text-indigo-200">Home</a>
              <a href="/about" className="text-white hover:text-indigo-200">About</a>
              <a href="/contact" className="text-white hover:text-indigo-200">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Contact Us About Your Internship Interest
        </h2>
        <p className="text-center text-lg text-gray-600 mb-6">
          Fill in the details below, and our team will get back to you regarding open internship opportunities.
        </p>

        {formStatus && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
            <p>{formStatus}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-900">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-900">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-900">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your phone number (optional)"
            />
          </div>

          {/* Internship Interest Field */}
          <div>
            <label htmlFor="internshipInterest" className="block text-lg font-medium text-gray-900">
              Internship Interests
            </label>
            <select
              id="internshipInterest"
              name="internshipInterest"
              value={formData.internshipInterest}
              onChange={handleInputChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select an Internship Type</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-900">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your message or inquiry here"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center">
            <div>&copy; 2025 Open Galaxy. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200">
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200">
                <i className="fab fa-github"></i> GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
