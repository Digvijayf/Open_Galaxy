'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            Open Galaxy
          </Link>
          <div className="space-x-6">
            <Link href="/browse-projects" className="text-white hover:text-gray-200">Projects</Link>
            <Link href="/companies" className="text-white hover:text-gray-200">Companies</Link>
            <Link href="/resources" className="text-white hover:text-gray-200">Resources</Link>
            <Link href="/contact" className="text-white hover:text-gray-200">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Open Galaxy</h3>
            <p className="text-gray-400 text-sm">
              Connecting companies with talented developers for open source collaboration.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse-projects" className="text-gray-400 hover:text-white">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-400 hover:text-white">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Email: contact@opengalaxy.com<br />
              Phone: (555) 123-4567<br />
              Location: San Francisco, CA
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

// Company Card Component
const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img 
          src={company.banner || '/company-default-banner.jpg'} 
          alt={company.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white text-xl font-bold">{company.name}</h3>
          <p className="text-gray-200 text-sm">{company.location}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{company.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {company.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {company.openProjects} Open Projects
          </span>
          <Link 
            href={`/companies/${company.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

// Filter Section Component
const FilterSection = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select 
            onChange={(e) => onFilterChange('industry', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Industries</option>
            <option value="tech">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select 
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Locations</option>
            <option value="us">United States</option>
            <option value="eu">Europe</option>
            <option value="asia">Asia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Size
          </label>
          <select 
            onChange={(e) => onFilterChange('size', e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Sizes</option>
            <option value="small">Small (1-5)</option>
            <option value="medium">Medium (6-20)</option>
            <option value="large">Large (20+)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Companies Page Component
const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    size: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, [filters]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/companies', {
        params: filters
      });
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Companies
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover companies offering exciting open source opportunities and internships.
            </p>
          </div>

          <FilterSection onFilterChange={handleFilterChange} />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompaniesPage;