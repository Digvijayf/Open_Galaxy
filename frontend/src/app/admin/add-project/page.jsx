'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Add this Navbar component
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">Open Galaxy Admin</span>
          </div>
          <div className="flex space-x-4">
            <a href="/admin/manage-project" className="text-white hover:text-indigo-100">
              Manage Projects
            </a>
            <a href="/admin/Add-project" className="text-white hover:text-indigo-100">
              Add Project
            </a>
            <a href="/admin/dashboard" className="text-white hover:text-indigo-100">
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-indigo-400">Open Galaxy</h3>
            <p className="text-gray-400 text-sm">
              Connecting talented developers with innovative open-source projects.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/projects" className="text-gray-400 hover:text-indigo-400">Browse Projects</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-indigo-400">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-indigo-400">Contact</a></li>
            </ul>
          </div>

          {/* Admin Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Admin</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/admin/dashboard" className="text-gray-400 hover:text-indigo-400">Dashboard</a></li>
              <li><a href="/admin/manage-project" className="text-gray-400 hover:text-indigo-400">Manage Projects</a></li>
              <li><a href="/admin/settings" className="text-gray-400 hover:text-indigo-400">Settings</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-400">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                support@opengalaxy.com
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Open Galaxy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const AddProject = () => {

  const router = useRouter();

  // initializing formik
  const projectForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      tags: '',
      duration: '',
      language: '',
      deadline: '',
      companyName: '',
      image: ''
    },

    onSubmit: (value, { resetForm, setSubmitting }) => {
      console.log(value);

      // send values to backend
      //sending request to backend
      axios.post('http://localhost:5000/project/add', value)
        .then((result) => {
          toast.success('project registered successfully');
          resetForm();
          router.push('/login');
        }).catch((err) => {
          console.log(err);
          toast.error('something went wrong');
          setSubmitting(false);
        });

    },
    // validationSchema: projectFormSchema
  })

  const [preview, setPreview] = useState('');

  const upload = (e) => {

    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'mypreset')
    fd.append('cloud_name', 'dng2mcid4')

        axios.post('https://api.cloudinary.com/v1_1/dng2mcid4/image/upload', fd)
        .then((result) => {
          toast.success('file upload successfully');
          console.log(result.data);
          setPreview(result.data.url);
          projectForm.setFieldValue('image', result.data.url);
        }).catch((err) => {
          console.log(err);
          toast.error('failed to upload file');

        });
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">

        <h2 className="text-2xl font-bold mb-4">Add a New Project</h2>

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
            
          </div>

          {/* Skills Required */}
          <div className="mb-4">
            <label htmlFor="skills" className="block text-gray-700">Skills Required</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={projectForm.values.skills}
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
            
          </div>
          <div className="mb-4">
            <label htmlFor="upload" className="block text-gray-700">
              Image
                    <input type="file"  onChange={upload} id='upload' hidden/>
            </label>
            <input
              type="text"
              id="image"
              value={projectForm.values.image}
              onChange={projectForm.handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your company name"
            />
          
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
      </div>
      <Footer />
    </>
  );
};

export default AddProject;
