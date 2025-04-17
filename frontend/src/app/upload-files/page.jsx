'use client';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image or PDF file');
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'mypreset');
    fd.append('cloud_name', 'dng2mcid4');

    try {
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dng2mcid4/image/upload',
        fd
      );
      setFileUrl(result.data.url);
      setPreview(result.data.url);
      setSelectedFile(file);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileUrl) {
      toast.error('Please upload a file first');
      return;
    }

    setUploading(true);
    try {
      // Save the file URL to your backend
      const response = await axios.post('http://localhost:5000/api/files/save', {
        fileUrl: fileUrl,
        fileName: selectedFile.name,
        fileType: selectedFile.type
      });

      if (response.data) {
        toast.success('File saved successfully');
        // Reset form
        setSelectedFile(null);
        setFileUrl('');
        setPreview('');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toaster */}
      <Toaster position="top-right" />

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
                htmlFor="upload"
                className="block p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-indigo-500"
              >
                {uploading ? (
                  <span className="text-gray-500">Uploading...</span>
                ) : (
                  <span className="text-gray-700">
                    Click to select file
                    <br />
                    <span className="text-sm text-gray-500">
                      (Supported: JPG, PNG, GIF, PDF)
                    </span>
                  </span>
                )}
                <input
                  type="file"
                  id="upload"
                  onChange={upload}
                  disabled={uploading}
                  className="hidden"
                  accept="image/*,application/pdf"
                />
              </label>
            </div>

            {preview && (
              <div className="mb-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {selectedFile && (
              <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !fileUrl}
              className={`w-full py-2 px-4 rounded-lg font-semibold ${
                uploading || !fileUrl
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {uploading ? 'Saving...' : 'Save Upload'}
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

