'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ViewProjectForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  // Fetch project details from the backend
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/project/getbyid/${id}`); // Replace '1' with dynamic ID
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load project details.');
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  // Formik initialization
  const projectForm = useFormik({
    initialValues: {
      title:'',
      description:  '',
      techStack: '',
      duration:  '',
      mentor:  '',
      category:  '',
      level: '',
      status:  '',
      company: '' 
           },
    enableReinitialize: true, // Allows form to update when project data is fetched
    onSubmit: (values) => {
      console.log(values);
      toast.success('Form submitted successfully!');
    },
  });

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-gray-600 text-lg">Loading project details...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-red-600 text-lg">{error}</p>
  //     </div>
  //   );
  // }

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

      {/* View Project Form */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10 bg-white mt-10 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-8">View Project Details</h1>

        <form className="space-y-6" onSubmit={projectForm.handleSubmit}>
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Project Title</label>
            <input
              type="text"
              name="title"
              value={projectForm.values.title}
              onChange={projectForm.handleChange}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Project Description</label>
            <textarea
              name="description"
              rows="5"
              value={projectForm.values.description}
              onChange={projectForm.handleChange}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            ></textarea>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium mb-1">Tech Stack</label>
            <input
              type="text"
              name="techStack"
              value={projectForm.values.techStack}
              onChange={projectForm.handleChange}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Two Columns: Duration & Mentor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={projectForm.values.duration}
                onChange={projectForm.handleChange}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mentor</label>
              <input
                type="text"
                name="mentor"
                value={projectForm.values.mentor}
                onChange={projectForm.handleChange}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Two Columns: Category & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={projectForm.values.category}
                onChange={projectForm.handleChange}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <input
                type="text"
                name="level"
                value={projectForm.values.level}
                onChange={projectForm.handleChange}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={projectForm.values.company}
              onChange={projectForm.handleChange}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <input
              type="text"
              name="status"
              value={projectForm.values.status}
              onChange={projectForm.handleChange}
              readOnly
              className={`w-full px-4 py-2 border rounded-lg font-semibold ${
                projectForm.values.status === 'Open for Applications'
                  ? 'text-green-700 bg-green-50'
                  : 'text-red-700 bg-red-50'
              }`}
            />
          </div>

          {/* Apply Button */}
          <div className="pt-4">
            <button
              type="button"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Apply for Internship
            </button>
          </div>
        </form>
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

export default ViewProjectForm;


