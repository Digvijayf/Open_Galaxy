'use client';
import React, { useState } from 'react';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Open Galaxy</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/admin/manage-users" className="hover:text-gray-300">Manage Users</a>
          </li>
          <li>
            <a href="/admin/manage-projects" className="hover:text-gray-300">Manage Projects</a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Open Galaxy. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          <a href="/terms" className="hover:text-gray-400">Terms of Service</a> | 
          <a href="/privacy" className="hover:text-gray-400 ml-2">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

// Manage User Form Component
const ManageUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'intern',
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      role: 'intern',
      isActive: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Data:', formData);
    // Add API call here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage User</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
            >
              <option value="admin">Admin</option>
              <option value="mentor">Mentor</option>
              <option value="intern">Intern</option>
            </select>
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">User Status</span>
            <label htmlFor="isActive" className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition duration-300" />
              <span className="ml-3 text-sm text-gray-600 peer-checked:text-indigo-600">
                {formData.isActive ? 'Active' : 'Inactive'}
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManageUserForm;




// 'use client';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// // Navbar Component
// const Navbar = () => {
//   return (
//     <nav className="bg-indigo-600 text-white py-4">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Open Galaxy</h1>
//         <ul className="flex space-x-6">
//           <li>
//             <a href="/" className="hover:text-gray-300">Home</a>
//           </li>
//           <li>
//             <a href="/about" className="hover:text-gray-300">About</a>
//           </li>
//           <li>
//             <a href="/browse-projects" className="hover:text-gray-300">Browse Projects</a>
//           </li>
//           <li>
//             <a href="/contact" className="hover:text-gray-300">Contact</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// // Footer Component
// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <p className="text-sm">
//           &copy; 2025 Open Galaxy. All rights reserved.
//         </p>
//         <p className="text-sm mt-2">
//           <a href="/terms" className="hover:text-gray-400">Terms of Service</a> | 
//           <a href="/privacy" className="hover:text-gray-400 ml-2">Privacy Policy</a>
//         </p>
//       </div>
//     </footer>
//   );
// };

// // Manage Users Form Component
// const ManageUsersForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       role: '',
//       status: '',
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Name is required'),
//       email: Yup.string().email('Invalid email address').required('Email is required'),
//       role: Yup.string().required('Role is required'),
//       status: Yup.string().required('Status is required'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form Data:', values);
//       alert('User details submitted successfully!');
//     },
//   });

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className="flex-grow flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             Manage Users
//           </h1>
//           <form onSubmit={formik.handleSubmit}>
//             {/* Name Field */}
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`mt-2 block w-full text-sm text-gray-900 border ${
//                   formik.touched.name && formik.errors.name
//                     ? 'border-red-500'
//                     : 'border-gray-300'
//                 } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//                 placeholder="Enter user name"
//               />
//               {formik.touched.name && formik.errors.name && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`mt-2 block w-full text-sm text-gray-900 border ${
//                   formik.touched.email && formik.errors.email
//                     ? 'border-red-500'
//                     : 'border-gray-300'
//                 } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//                 placeholder="Enter user email"
//               />
//               {formik.touched.email && formik.errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
//               )}
//             </div>

//             {/* Role Field */}
//             <div className="mb-4">
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formik.values.role}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`mt-2 block w-full text-sm text-gray-900 border ${
//                   formik.touched.role && formik.errors.role
//                     ? 'border-red-500'
//                     : 'border-gray-300'
//                 } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//               >
//                 <option value="">Select Role</option>
//                 <option value="Admin">Admin</option>
//                 <option value="User">User</option>
//                 <option value="Moderator">Moderator</option>
//               </select>
//               {formik.touched.role && formik.errors.role && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.role}</p>
//               )}
//             </div>

//             {/* Status Field */}
//             <div className="mb-4">
//               <label htmlFor="status" className="block text-sm font-medium text-gray-700">
//                 Status
//               </label>
//               <select
//                 id="status"
//                 name="status"
//                 value={formik.values.status}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`mt-2 block w-full text-sm text-gray-900 border ${
//                   formik.touched.status && formik.errors.status
//                     ? 'border-red-500'
//                     : 'border-gray-300'
//                 } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
//               >
//                 <option value="">Select Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//               {formik.touched.status && formik.errors.status && (
//                 <p className="text-red-500 text-sm mt-1">{formik.errors.status}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };
