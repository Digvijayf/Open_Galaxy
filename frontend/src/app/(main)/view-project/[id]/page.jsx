'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ViewProject = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/project/getbyid/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load project details.');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="https://openmoji.org/data/color/svg/1F680.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-indigo-600">Open Galaxy</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="/" className="hover:text-indigo-600">Home</a>
            <a href="/browse-projects" className="hover:text-indigo-600">Browse Projects</a>
            <a href="/post-internship" className="hover:text-indigo-600">Post Internship</a>
            <a href="/about" className="hover:text-indigo-600">About</a>
          </div>
          <div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm">Login</button>
          </div>
        </div>
      </nav>

      {/* View Project Details */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10 bg-white mt-10 rounded-xl shadow-md">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-indigo-700">Project Details</h1>
          <a 
            href="/browse-projects" 
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to Projects
          </a>
        </div>

        <div className="space-y-8">
          {/* Project Title */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-xl text-gray-900 mb-2">{project?.title}</h2>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {project?.category}
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-900">{project?.description}</p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tech Stack</h3>
              <p className="text-gray-900">{project?.techStack}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Duration</h3>
              <p className="text-gray-900">{project?.duration}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Mentor</h3>
              <p className="text-gray-900">{project?.mentor}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Level</h3>
              <p className="text-gray-900">{project?.level}</p>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Company</h3>
            <p className="text-gray-900">{project?.company}</p>
          </div>

          {/* Project Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              project?.status === 'Open for Applications'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {project?.status}
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Open Galaxy</h3>
            <p className="text-sm text-gray-600 mt-2">
              Empowering open-source internships, one project at a time.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-indigo-600">Home</a></li>
              <li><a href="/browse-projects" className="hover:text-indigo-600">Browse Projects</a></li>
              <li><a href="/post-internship" className="hover:text-indigo-600">Post Internship</a></li>
              <li><a href="/login" className="hover:text-indigo-600">login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold">Contact</h4>
            <ul className="mt-2 text-sm text-gray-600">
              <li>Email: support@opengalaxy.dev</li>
              <li>Twitter: @OpenGalaxy</li>
              <li>GitHub: github.com/opengalaxy</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 py-4 border-t">
          © 2025 Open Galaxy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ViewProject;


