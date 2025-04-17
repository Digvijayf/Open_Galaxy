'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const EnrollmentPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Please login to view your enrollments');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/enroll/user`, {
          headers: {
            'x-auth-token': token
          }
        });

        setEnrollments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching enrollments:', err);
        const errorMessage = err.response?.data?.message || 'Failed to load enrollment data.';
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading enrollment data...</p>
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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">Open Galaxy</div>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-indigo-500">Home</a></li>
            <li><a href="/enrollment" className="hover:text-indigo-500">Enrollment</a></li>
            <li><a href="/about" className="hover:text-indigo-500">About</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Enrollments</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {enrollments.length > 0 ? (
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Project Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Enrollment Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{enrollment.project.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{enrollment.project.company}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        enrollment.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => window.location.href = `/view-project/${enrollment.project._id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        View Project
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't enrolled in any projects yet.</p>
              <a 
                href="/browse-projects"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Browse Projects
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Open Galaxy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EnrollmentPage;