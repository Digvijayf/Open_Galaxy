'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ViewProject = () => {
  const [project, setProject] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateData, setCertificateData] = useState({
    recipientName: "",
    projectName: "",
    companyName: "",
    duration: "",
    completionDate: new Date().toISOString().split('T')[0],
    mentorName: "",
    certificateId: "",
  });

  const router = useRouter();
  const { id } = useParams();
  const projectId = id;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Generate a random certificate ID
  const generateCertificateId = useCallback(() => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }, []);

  // Fetch all required data
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) {
        setError('No project ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch project details
        const projectRes = await axios.get(`${API_URL}/project/getbyid/${projectId}`);
        setProject(projectRes.data);
        
        // Fetch enrollments for this project
        const enrollmentsRes = await axios.get(`${API_URL}/enroll/getall`);
        const filteredEnrollments = enrollmentsRes.data.filter(
          enrollment => enrollment.project === projectId
        );
        
        // Get detailed user info for each enrollment
        const userDetailsPromises = filteredEnrollments.map(async (enrollment) => {
          try {
            const userRes = await axios.get(`${API_URL}/user/getbyid/${enrollment.user}`);
            return { ...enrollment, userDetails: userRes.data };
          } catch (err) {
            console.error('Error fetching user details:', err);
            return { ...enrollment, userDetails: { name: 'Unknown', email: 'N/A' } };
          }
        });
        
        const enrichedEnrollments = await Promise.all(userDetailsPromises);
        setEnrollments(enrichedEnrollments);
        
        // Fetch tasks for this project
        const tasksRes = await axios.get(`${API_URL}/task/getbyproject/${projectId}`);
        setTasks(tasksRes.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load project information');
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, API_URL]);

  const openCertificateModal = (enrollment) => {
    setSelectedEnrollment(enrollment);
    
    // Pre-populate certificate data
    setCertificateData({
      recipientName: enrollment.userDetails?.name || 'Unknown',
      projectName: project?.title || '',
      companyName: project?.company || '',
      duration: project?.duration || '',
      completionDate: new Date().toISOString().split('T')[0],
      mentorName: project?.mentor || '',
      certificateId: generateCertificateId(),
    });
    
    setShowCertificateModal(true);
  };

  const handleGenerateCertificate = () => {
    // Store certificate data in local storage or query params to pass to certificate page
    localStorage.setItem('certificateData', JSON.stringify(certificateData));
    
    // Navigate to certificate page
    router.push('/certificate');
  };

  const handleCertificateDataChange = (e) => {
    const { name, value } = e.target;
    setCertificateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <div className="w-16 h-16 border-4 border-t-indigo-600 border-opacity-50 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading project data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Admin Header */}
      <div className="mb-8 flex items-center justify-between bg-white shadow p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <img src="https://openmoji.org/data/color/svg/1F680.svg" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-indigo-700">Admin Panel - Project View</h1>
        </div>
        <div>
          <button 
            onClick={() => window.history.back()} 
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">{project?.title}</h3>
            <div className="mb-4">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                {project?.category}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{project?.description}</p>
            
            <div className="space-y-2">
              <div className="flex">
                <span className="font-medium w-32 text-gray-600">Company:</span>
                <span>{project?.company}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-32 text-gray-600">Mentor:</span>
                <span>{project?.mentor}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-32 text-gray-600">Duration:</span>
                <span>{project?.duration}</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Status</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project?.status === 'Open for Applications' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {project?.status}
              </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Tech Stack</h3>
              <p>{project?.techStack}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Users Section with Certificate Generation */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Enrolled Users <span className="text-gray-500 text-lg">({enrollments.length})</span>
        </h2>
        
        {enrollments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {enrollment.userDetails?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {enrollment.userDetails?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        enrollment.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : enrollment.status === 'in progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-800"
                          onClick={() => openCertificateModal(enrollment)}
                        >
                          Generate Certificate
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Update Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No users have enrolled in this project yet.
          </div>
        )}
      </div>

      {/* Tasks Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Project Tasks <span className="text-gray-500 text-lg">({tasks.length})</span>
          </h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm">
            Add New Task
          </button>
        </div>
        
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        task.priority === 'High' || task.priority === 'Urgent' 
                          ? 'bg-red-100 text-red-800' 
                          : task.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-gray-500">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No tasks have been created for this project yet.
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate Certificate</h2>
            <p className="mb-4 text-gray-600">
              Generating certificate for <span className="font-semibold">{selectedEnrollment.userDetails?.name || 'Unknown'}</span> 
              for project <span className="font-semibold">{project?.title || 'Unknown'}</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={certificateData.recipientName}
                  onChange={handleCertificateDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={certificateData.projectName}
                  onChange={handleCertificateDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={certificateData.companyName}
                  onChange={handleCertificateDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={certificateData.duration}
                  onChange={handleCertificateDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Completion Date
                </label>
                <input
                  type="date"
                  name="completionDate"
                  value={certificateData.completionDate}
                  onChange={handleCertificateDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mentor Name
                </label>
                <input
                  type="text"
                  name="mentorName"
                  value={certificateData.mentorName}
                  onChange={handleCertificateDataChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCertificate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Generate Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProject;