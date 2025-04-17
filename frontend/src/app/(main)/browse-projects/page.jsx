'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Open Galaxy</div>
        <div className="space-x-6">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          <a href="/about" className="text-white hover:text-gray-200">About</a>
          <Link href="/admin/manage-project" className="text-white hover:text-gray-200">project</Link>
          <a href="/contact" className="text-white hover:text-gray-200">Contact</a>
          <a href="/admin/add-project" className="text-white hover:text-gray-300">Add Project</a>
          <a href="/admin/manage-project" className="text-white hover:text-indigo-100">Manage Project</a>
        </div>
      </div>
    </nav>
  );
};

// ProjectCard Component
const ProjectCard = ({ id, title, description, language, image, tags, createdAt, enrollInProject }) => {
  console.log(enrollInProject);

  return (
    <div className="max-w-xs w-full rounded-lg overflow-hidden shadow-md bg-white">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-6">
        {id}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">Language: <strong>{language}</strong></p>
        <p className="text-sm text-gray-600 mb-2">Tags: {tags.join(', ')}</p>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <p className="text-xs text-gray-500">Created At: {new Date(createdAt).toLocaleDateString()}</p>
        <button onClick={enrollInProject} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none w-full">
          Apply Now
        </button>
        <Link href={'/view-project/' + id} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none w-full">
          View Details
        </Link>
      </div>
    </div>
  );
};

// FilterBar Component
const FilterBar = ({ categories, selectedCategory, onFilterChange, locations, selectedLocation, onLocationChange }) => {
  return (
    <div className="flex justify-between flex-wrap mb-6">
      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-800 font-medium">Category</span>
        <select
          value={selectedCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-800 font-medium">Location</span>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm"
        >
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="flex items-center text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <h5 className="text-xl font-bold">Open Galaxy</h5>
            <p className="mt-2 text-sm">The platform connecting companies with top talent for open source internships.</p>
          </div>
          <div className="space-x-6">
            <a href="/terms" className="text-white hover:text-gray-300">Terms of Service</a>
            <a href="/privacy" className="text-white hover:text-gray-300">Privacy Policy</a>
            <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
            <a href="/admin/add-project" className="text-white hover:text-gray-300">Add Project</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; 2025 Open Galaxy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Main BrowsePage Component
const BrowsePage = () => {
  const categories = ['All', 'Frontend', 'Backend', 'UI/UX Design', 'Marketing'];
  const locations = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [internships, setInternships] = useState([]);
  const internshipsPerPage = 6;
  const token = localStorage.getItem('token');
  const [activeTab, setActiveTab] = useState('students');
  const featuredInternships = [
    {
      id: 1,
      title: "Open Source Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      stipend: "$1000/month",
      tags: ["React", "TypeScript"]
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      company: "CloudScale",
      location: "San Francisco",
      stipend: "$1500/month",
      tags: ["Node.js", "MongoDB"]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "DevHub",
      location: "Remote",
      stipend: "$1200/month",
      tags: ["React", "Node.js"]
    },
    {
      id: 4,
      title: "ML Engineer Intern",
      company: "AI Solutions",
      location: "New York",
      stipend: "$2000/month",
      tags: ["Python", "TensorFlow"]
    }
  ];

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/getall`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      console.log(data);

      // Ensure the data matches the backend model
      const formattedData = data.map((project) => ({
        _id: project._id,
        title: project.title,
        difficulty: project.difficulty,
        description: project.description,
        language: project.language,
        image: project.image,
        tags: project.tags,
        createdAt: new Date(project.createdAt),
      }));

      setInternships(formattedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter internships by selected category and location
  const filteredInternships = internships.filter((internship) => {
    const isCategoryMatch = selectedCategory === 'All' || internship.category === selectedCategory;
    const isLocationMatch = selectedLocation === 'All' || internship.location === selectedLocation;
    return isCategoryMatch && isLocationMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInternships.length / internshipsPerPage);
  const currentInternships = filteredInternships.slice(
    (currentPage - 1) * internshipsPerPage,
    currentPage * internshipsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const enrollInProject = async (projectId) => {
    console.log(projectId);


    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/enroll/checkenrolled/${projectId}`, {
      headers: {
        'x-auth-token': token,
      },
    })
      .then((response) => {


        if (response.status === 200 && response.data.isEnrolled) {
          alert('You are already enrolled in this project.');
          return;
        } else if (response.status === 203) {
          axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/enroll/add`,
            { project: projectId }, {
            headers: {
              'x-auth-token': token,
            },
          })
            .then(
              (response) => {
                if (response.status === 200) {
                  toast.success('Successfully enrolled in the project!');
                } else {
                  toast.error('Failed to enroll in the project. Please try again.');
                }
              })
            .catch((error) => {
              console.error('Error enrolling in project:', error);
              alert('An error occurred while enrolling in the project. Please try again later.');
            }
            )

        }
      })
      .catch((error) => {
        console.error('Error checking enrollment:', error);
        alert('An error occurred while checking enrollment. Please try again later.');
      });


  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Featured Opportunities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">Featured Opportunities</h2>
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/browse-projects"
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
              >
                View All
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b">
            <div className="flex space-x-8">
              <button
                className={`pb-4 font-medium ${activeTab === 'students'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
                  }`}
                onClick={() => setActiveTab('students')}
              >
                For Students
              </button>
              <button
                className={`pb-4 font-medium ${activeTab === 'companies'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
                  }`}
                onClick={() => setActiveTab('companies')}
              >
                For Companies
              </button>
            </div>
          </div>

          {activeTab === 'students' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredInternships.map(internship => (
                <div
                  key={internship.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{internship.title}</h3>
                    <p className="text-indigo-600 mb-4">{internship.company}</p>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">📍</span>
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="text-gray-600 mr-2">💰</span>
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => enrollInProject(internship.id)}
                      className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Are you a company looking to hire?</h3>
              <p className="text-gray-600 mb-6">
                Post your open source opportunities and connect with talented developers.
              </p>
              <Link
                href="/admin/Add-project"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Post a Project
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onFilterChange={setSelectedCategory}
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
          />

          {/* Internship Listings (Project Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentInternships.map((internship, index) => (
              <ProjectCard
                enrollInProject={() => enrollInProject(internship._id)}
                key={index}
                id={internship._id}
                title={internship.title}
                difficulty={internship.difficulty}
                description={internship.description}
                language={internship.language}
                image={internship.image}
                tags={internship.tags}
                createdAt={internship.createdAt}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BrowsePage;



