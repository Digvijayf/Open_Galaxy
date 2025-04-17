'use client';
import Link from "next/link";
import React, { useState } from 'react';

const OpenGalaxyLandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('students');

  // Featured companies and internships (sample data)
  const featuredCompanies = [  
    { id: 1, name: 'TechForward', logo: '/api/placeholder/80/80', positions: 12 },
    { id: 2, name: 'CodeCraft', logo: '/api/placeholder/80/80', positions: 8 },
    { id: 3, name: 'DataFlow', logo: '/api/placeholder/80/80', positions: 5 },
    { id: 4, name: 'CloudScale', logo: '/api/placeholder/80/80', positions: 10 },
  ];

  const featuredInternships = [
    { id: 1, title: 'Open Source Backend Developer', company: 'TechForward', location: 'Remote', stipend: '$1000/month' },
    { id: 2, title: 'Frontend Contributor', company: 'CodeCraft', location: 'Hybrid', stipend: '$800/month' },
    { id: 3, title: 'ML Model Enhancer', company: 'DataFlow', location: 'Remote', stipend: '$1200/month' },
    { id: 4, title: 'DevOps Engineer', company: 'CloudScale', location: 'Remote', stipend: '$1500/month' },
  ];

  // Modal components
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Log In to Open Galaxy</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="your@email.com" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
            <div className="mt-1 text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">LogIn</button>
          
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account?</span>
            <span 
              className="ml-1 text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                setShowLoginModal(false);
                setShowSignupModal(true);
              }}
            >
              Sign up
            </span>
          </div>
        </form>
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setShowLoginModal(false)}
        >
          X
        </button>
      </div>
    </div>
  );

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Join Open Galaxy</h2>
        <div className="mb-4 flex gap-4">
          <button className="flex-1 py-2 border rounded hover:bg-gray-50">
            I'm a Student
          </button>
          <button className="flex-1 py-2 border rounded hover:bg-gray-50">
            I'm a Company
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="John Doe" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full p-2 border rounded" placeholder="your@email.com" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
          </div>
          <div className="mb-6">
            <input type="checkbox" className="mr-2" id="terms" />
            <label htmlFor="terms" className="text-gray-700">
              I agree to the <span className="text-blue-600 hover:underline">Terms & Conditions</span>
            </label>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Sign Up</button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account?</span>
            <span 
              className="ml-1 text-blue-600 hover:underline cursor-pointer"
              onClick={() => {
                setShowSignupModal(false);
                setShowLoginModal(true);
              }}
            >
              Log in
            </span>
          </div>
        </form>
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setShowSignupModal(false)}
        >
          X
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">OpenGalaxy</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/browse-projects" className="text-gray-700 hover:text-indigo-600">Browse Projects</a>
            <a href="/companies" className="text-gray-700 hover:text-indigo-600">For Companies</a>
            <a href="/Resources" className="text-gray-700 hover:text-indigo-600">Resources</a>
            <a href="/About" className="text-gray-700 hover:text-indigo-600">About</a>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600">Contact</a>
            
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="text-indigo-600 hover:text-indigo-800"
              onClick={() => setShowLoginModal(true)}
            >
              Log In
            </button>
            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() => setShowSignupModal(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Open Source Internship Opportunities</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Connect with companies building the future through open source software and kickstart your tech career</p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg">
            <input 
              type="text" 
              placeholder="Search for internships, companies, or technologies..." 
              className="flex-grow p-2 focus:outline-none text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Search
            </button>
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-white text-indigo-600 px-6 py-2 rounded hover:bg-gray-100">
              For Students
            </button>
            <button className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:bg-opacity-10">
              For Companies
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">Featured Opportunities</h2>
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">
                View All
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b">
            <div className="flex space-x-8">
              <button 
                className={`pb-4 font-medium ${activeTab === 'students' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
                onClick={() => setActiveTab('students')}
              >
                For Students
              </button>
              <button 
                className={`pb-4 font-medium ${activeTab === 'companies' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
                onClick={() => setActiveTab('companies')}
              >
                For Companies
              </button>
            </div>
          </div>

          {activeTab === 'students' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredInternships.map(internship => (
                <div key={internship.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                    <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCompanies.map(company => (
                <div key={company.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col items-center text-center">
                    <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                    <p className="text-gray-600 mb-4">{company.positions} Open Positions</p>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                      View Company
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How Open Galaxy Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and build your profile showcasing your skills, projects, and open source contributions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Opportunities</h3>
              <p className="text-gray-600">Browse internships from top companies looking for open source contributors.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply & Contribute</h3>
              <p className="text-gray-600">Apply to projects that match your interests and start your open source journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">250+</div>
              <div>Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div>Open Source Internships</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div>Student Participants</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div>Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic mb-4">"Through Open Galaxy, I found an internship at Mozilla where I contributed to Firefox. This led to a full-time role after graduation!"</p>
              <div className="flex items-center">
                <div className="bg-gray-300 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-gray-600 text-sm">Software Engineer, Mozilla</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic mb-4">"As a company, we've found incredible talent through Open Galaxy's platform. The students come prepared and ready to contribute."</p>
              <div className="flex items-center">
                <div className="bg-gray-300 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">Mark Johnson</div>
                  <div className="text-gray-600 text-sm">CTO, CodeCraft</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="italic mb-4">"The guidance provided by Open Galaxy helped me navigate the open source world and land my dream internship at Kubernetes."</p>
              <div className="flex items-center">
                <div className="bg-gray-300 w-10 h-10 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">Raj Patel</div>
                  <div className="text-gray-600 text-sm">DevOps Engineer, Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Begin Your Open Source Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">Join thousands of students and companies in the open source ecosystem</p>
          <div className="flex justify-center space-x-4">
            <button 
              className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
              onClick={() => setShowSignupModal(true)}
            >
              Sign Up Now
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Open Galaxy</h3>
              <p className="mb-4">Connecting students with companies through open source internships.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-indigo-300">Twitter</a>
                <a href="#" className="hover:text-indigo-300">LinkedIn</a>
                <a href="#" className="hover:text-indigo-300">GitHub</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Students</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-300">Browse Internships</a></li>
                <li><a href="#" className="hover:text-indigo-300">Resource Library</a></li>
                <li><a href="#" className="hover:text-indigo-300">Success Stories</a></li>
                <li><a href="#" className="hover:text-indigo-300">Open Source Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Companies</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-300">Post Internships</a></li>
                <li><a href="#" className="hover:text-indigo-300">Browse Students</a></li>
                <li><a href="#" className="hover:text-indigo-300">Partner Program</a></li>
                <li><a href="#" className="hover:text-indigo-300">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-300">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-300">FAQ</a></li>
                <li><a href="#" className="hover:text-indigo-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-300">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Open Galaxy. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLoginModal && <LoginModal />}
      {showSignupModal && <SignupModal />}
    </div>
  );
};

export default OpenGalaxyLandingPage;

