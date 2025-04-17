'use client';
import { IconLoader3, IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Add Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Open Galaxy Admin
          </Link>
          <div className="flex space-x-6">
            <Link href="/admin/manage-project" className="text-white hover:text-indigo-100">
              Manage Projects
            </Link>
            <Link href="/admin/add-project" className="text-white hover:text-indigo-100">
              Add Project
            </Link>
            <Link href="/admin/manage-users" className="text-white hover:text-indigo-100">
              Manage Users
            </Link>
            <Link href="/admin/dashboard" className="text-white hover:text-indigo-100">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Add Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Open Galaxy</h3>
            <p className="text-gray-400 text-sm">
              Managing open source projects efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/manage-project" className="text-gray-400 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/admin/manage-users" className="text-gray-400 hover:text-white">
                  Users
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Email: admin@opengalaxy.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Open Galaxy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const Updateprojects = () => {

  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [projectData, setprojectData] = useState(null);
  const router = useRouter();

  const fetchprojectData = async () => {
    const res = await axios.get(`http://localhost:5000/project/getbyid/${id}`);
    console.log(res.data);
    setprojectData(res.data);
  }

  useEffect(() => {
    fetchprojectData();
  }, [id]);

  const formSubmit = (values, { setSubmitting }) => {
    axios.put(`http://localhost:5000/project/update/${id}`, values)
      .then(res => {
        console.log(res.data);
        router.back();
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
      })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Add a New Project</h2>
        {
          projectData === null ? (
            <h2 className='text-center my-6 font-bold text-2xl text-gray-300'>Loading ... </h2>
          ) : (
            <Formik initialValues={projectData} onSubmit={formSubmit}>

              {(projectForm) => {
                return (
                  <form onSubmit={projectForm.handleSubmit}>
                    {/* Project Title */}
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-gray-700">Project Title</label>
                      <input
                        type="text"
                        id="title"
                        value={projectForm.values.title}
                        onChange={projectForm.handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter the project title"
                      />
                      {/* {error.title && <p className="text-red-500 text-sm">{error.title}</p>} */}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label htmlFor="description" className="block text-gray-700">Description</label>
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={projectForm.values.description}
                        onChange={projectForm.handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Describe the project"
                        rows="4"
                      />
                      {/* {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>} */}
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <label htmlFor="tags" className="block text-gray-700">Tags (comma separated)</label>
                      <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={projectForm.values.tags}
                        onChange={projectForm.handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter project tags (optional)"
                      />
                    </div>

                    {/* Duration */}
                    <div className="mb-4">
                      <label htmlFor="duration" className="block text-gray-700">Internship Duration</label>
                      <select
                        type="text"
                        id="duration"
                        name="duration"
                        value={projectForm.values.duration}
                        onChange={projectForm.handleChange}
                        className="mt-1 p-2 border rounded w-full"
                      >
                        <option value="">Select Duration</option>
                        <option value="1 month">1 month</option>
                        <option value="2 months">2 months</option>
                        <option value="3 months">3 months</option>
                        <option value="4 months">4 months</option>
                      </select>
                      {/* {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>} */}
                    </div>

                    {/* Skills Required */}
                    <div className="mb-4">
                      <label htmlFor="language" className="block text-gray-700">Skills Required</label>
                      <input
                        type="text"
                        id="language"
                        value={projectForm.values.language}
                        onChange={projectForm.handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter skills separated by commas"
                      />
                    </div>

                    {/* Application Deadline */}
                    <div className="mb-4">
                      <label htmlFor="deadline" className="block text-gray-700">Application Deadline</label>
                      <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={projectForm.values.deadline}
                        onChange={projectForm.handleChange}
                        className="mt-1 p-2 border rounded w-full"
                      />
                      {/* {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>} */}
                    </div>

                    {/* Company Name */}
                    <div className="mb-4">
                      <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={projectForm.values.companyName}
                        onChange={projectForm.handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter your company name"
                      />
                      {/* {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>} */}
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                      <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
                      >
                        Add Project
                      </button>
                    </div>
                  </form>
                )
              }}
            </Formik>
          )}
      </div>
      <Footer />
    </div>
  )
}

export default Updateprojects;
