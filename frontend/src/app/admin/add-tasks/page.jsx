'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
            <Link href="/admin/manage-task" className="text-white hover:text-indigo-100">
              Manage Tasks
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
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Open Galaxy</h3>
            <p className="text-gray-400 text-sm">
              Streamlining project task management.
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
                <Link href="/admin/manage-task" className="text-gray-400 hover:text-white">
                  Tasks
                </Link>
              </li>
              <li>
                <Link href="/admin/manage-project" className="text-gray-400 hover:text-white">
                  Projects
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

const TaskForm = () => {

  const [projectList, setProjectList] = useState([]);

  //initializing formikk
  const taskForm = useFormik({
    initialValues: {
      title: "",
      project: "",
      description: "",
      // status:"",
      deadline: "",
      priority: "Low"
    },

    onSubmit: (value, { resetForm, setSubmitting }) => {
      console.log(value);

      // send values to backend
      //sending request to backend
      axios.post('http://localhost:5000/task/add', value)
        .then((result) => {
          toast.success('project registered successfully');
          resetForm();

        }).catch((err) => {
          console.log(err);
          toast.error('something went wrong');
          setSubmitting(false);
        });
    },
  })

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/project/getall');
      setProjectList(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-center py-8">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Task</h2>

          <form onSubmit={taskForm.handleSubmit}>

            <div className="mb-4">
              <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                Select Project *
              </label>
              <select
                id="project"
                name="project"
                value={taskForm.values.project}
                onChange={taskForm.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  -- Select a Project --
                </option>
                {projectList.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskForm.values.title}
                onChange={taskForm.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={taskForm.values.description}
                onChange={taskForm.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={taskForm.values.status}
                onChange={taskForm.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div> */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={taskForm.values.priority}
                onChange={taskForm.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="mb-6 mt-2">
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={taskForm.values.deadline}
                onChange={taskForm.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskForm;

