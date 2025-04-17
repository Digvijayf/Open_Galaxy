'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
            <Link href="/about" className="text-white hover:text-gray-200">About</Link>
            <Link href="/browse-projects" className="text-white hover:text-gray-200">Projects</Link>
            <Link href="/resources" className="text-white hover:text-gray-200">Resources</Link>
            <Link href="/contact" className="text-white hover:text-gray-200">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ResourceCard Component
const ResourceCard = ({ title, description, link, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        Learn More →
      </a>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Open Galaxy</h3>
            <p className="text-gray-400 text-sm">
              Your gateway to open source development resources.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-400 text-sm">
              Follow us on social media for updates and news.
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

// Main Resources Page Component
const ResourcesPage = () => {
  const resources = [
    {
      title: "Documentation",
      description: "Comprehensive guides and API documentation for project development.",
      link: "/docs",
      icon: "📚"
    },
    {
      title: "Tutorials",
      description: "Step-by-step tutorials for getting started with open source.",
      link: "/tutorials",
      icon: "🎓"
    },
    {
      title: "Community Forums",
      description: "Connect with other developers and get help.",
      link: "/community",
      icon: "👥"
    },
    {
      title: "Best Practices",
      description: "Learn industry best practices for open source development.",
      link: "/best-practices",
      icon: "✨"
    },
    {
      title: "Tools & Templates",
      description: "Essential tools and templates for your projects.",
      link: "/tools",
      icon: "🛠️"
    },
    {
      title: "FAQ",
      description: "Common questions and answers about our platform.",
      link: "/faq",
      icon: "❓"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Developer Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in your open source journey. Explore our curated resources to enhance your development skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Additional Help?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is always here to help you succeed.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
