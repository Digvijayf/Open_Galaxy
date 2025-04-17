'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Open Galaxy</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300">About</a>
          </li>
          <li>
            <a href="/browse-projects" className="hover:text-gray-300">Browse Projects</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; 2025 Open Galaxy. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          <a href="/terms" className="hover:text-gray-400">Terms of Service</a> | 
          <a href="/privacy" className="hover:text-gray-400 ml-2">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

// Profile Page Component
const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'Digvijay Yadav',
    bio: 'Passionate about open-source software and eager to learn.',
    avatar: 'https://via.placeholder.com/150',
    email: 'ydigvijay836@gmail.com',
    location: 'Lucknow, UttarPradesh, India',
    skills: ['React', 'Node.js', 'JavaScript', 'Python'],
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Name is required'),
    bio: Yup.string()
      .min(10, 'Bio must be at least 10 characters')
      .max(250, 'Bio must be less than 250 characters')
      .required('Bio is required'),
  });

  const handleSaveChanges = (values) => {
    setUser({
      ...user,
      name: values.name,
      bio: values.bio,
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <header className="flex items-center space-x-6 mb-6">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
            <div className="w-full">
              <Formik
                initialValues={{
                  name: user.name,
                  bio: user.bio,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSaveChanges}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <Field
                        type="text"
                        name="name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your name"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Bio Field */}
                    <div>
                      <Field
                        as="textarea"
                        name="bio"
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about yourself"
                      />
                      <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {/* Save Changes Button */}
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
                      >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </header>

          {/* Profile Details */}
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600"><strong>Location:</strong> {user.location}</p>
              <p className="text-gray-600"><strong>Skills:</strong> {user.skills.join(', ')}</p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;