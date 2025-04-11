
   'use client';
import { useState } from 'react';
import axios from 'axios';

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

// Upload File Page Component
const UploadFilePage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Example: 5MB limit
      setMessage('File size exceeds the 5MB limit.');
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setMessage('Only JPEG and PNG files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setMessage('');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('Failed to upload the file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred while uploading the file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Upload File
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Choose a file
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${
                uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UploadFilePage;