'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const TaskForm = () => {



    //initializing formikk
    const taskForm = useFormik({
        initialValues: {
            title: "",
            description: "",
            // status:"",
            deadline: "",
            assignedTo: "",
            associatedInternship: "",
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

    return (
        <div className='flex justify-center items-center min-h-screen'>

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

            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Task</h2>

                <form onSubmit={taskForm.handleSubmit}>
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

                    <div className="mb-6 mt-2">
                        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
                            AssignedTo
                        </label>
                        <input
                            type="date"
                            id="assignedTo"
                            name="assignedTo"
                            value={taskForm.values.assignedTo}
                            onChange={taskForm.handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6 mt-2">
                        <label htmlFor="associatedInternship" className="block text-sm font-medium text-gray-700 mb-1">
                            AssociatedInternship
                        </label>
                        <input
                            type="date"
                            id="associatedInternship"
                            name="associatedInternship"
                            value={taskForm.values.associatedInternship}
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
            </div >
        </div >
    );
};

export default TaskForm;

