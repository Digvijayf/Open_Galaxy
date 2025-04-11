import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Open Galaxy</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300">About</a>
          </li>
          <li>
            <a href="/browse-projects" className="hover:text-gray-300">Browse Projects</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; 2025 Open Galaxy. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          <a href="/terms" className="hover:text-gray-400">Terms of Service</a> | 
          <a href="/privacy" className="hover:text-gray-400 ml-2">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Welcome to Open Galaxy
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Your Gateway to Open Source Internships
          </p>
        </header>

        {/* What is Open Galaxy Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900">What is Open Galaxy?</h2>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-12">
            <div className="sm:w-1/2">
              <img
                className="w-full rounded-lg shadow-lg"
                src="https://via.placeholder.com/600x400"
                alt="Open Galaxy Overview"
              />
            </div>
            <div className="sm:w-1/2 mt-8 sm:mt-0">
              <p className="text-lg text-gray-700 leading-relaxed">
                Open Galaxy is a platform that connects talented developers with companies offering internship
                opportunities through open-source projects. Whether you're a student looking to gain hands-on
                experience or a company seeking fresh talent, Open Galaxy is the place where both sides can collaborate
                on impactful projects that help shape the future of software development.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-12">
            <div className="sm:w-1/2">
              <img
                className="w-full rounded-lg shadow-lg"
                src="https://via.placeholder.com/600x400"
                alt="Mission Image"
              />
            </div>
            <div className="sm:w-1/2 mt-8 sm:mt-0">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is simple: to provide a space where talented interns can grow their skills by working
                on real-world open-source projects, while companies can tap into a global pool of passionate developers.
                By fostering collaboration and innovation in the open-source community, we aim to help build better products
                and equip the next generation of developers with the skills they need to succeed in their careers.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed mb-8">
            Open Galaxy works by facilitating a partnership between companies and interns in the open-source world.
            Whether you are looking for an internship or offering one, here’s how you can get involved:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Interns</h3>
              <img
                className="w-24 h-24 object-cover rounded-full mb-4"
                src="https://via.placeholder.com/100x100"
                alt="Interns"
              />
              <p className="text-gray-700 text-lg text-center">
                Browse available open-source internship opportunities, apply to the ones that interest you, and start
                collaborating with companies on exciting projects. Gain valuable hands-on experience, contribute to the open-source
                community, and enhance your skills while working with real-world codebases.
              </p>
            </div>
            <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Companies</h3>
              <img
                className="w-24 h-24 object-cover rounded-full mb-4"
                src="https://via.placeholder.com/100x100"
                alt="Companies"
              />
              <p className="text-gray-700 text-lg text-center">
                Post your open-source internship opportunities and work with talented interns. Collaborate with them on important
                projects and get fresh perspectives, code contributions, and innovative ideas that drive your products forward.
                It’s a win-win situation!
              </p>
            </div>
          </div>
        </section>

        {/* Why Open Source Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900">Why Open Source?</h2>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-12">
            <div className="sm:w-1/2">
              <img
                className="w-full rounded-lg shadow-lg"
                src="https://via.placeholder.com/600x400"
                alt="Why Open Source"
              />
            </div>
            <div className="sm:w-1/2 mt-8 sm:mt-0">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Open source is the foundation of modern technology. By participating in open-source projects, interns not only improve
                their technical skills but also make meaningful contributions to global software solutions. For companies, collaborating
                with interns on open-source projects provides access to diverse ideas, fosters innovation, and allows companies to
                support and grow the open-source ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-12 space-y-8 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xl">
                    1.
                  </span>
                  <p className="text-lg text-gray-700">
                    Contribute to a global community of developers, creating software that benefits millions of users worldwide.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xl">
                    2.
                  </span>
                  <p className="text-lg text-gray-700">
                    Gain experience working with cutting-edge technologies and contribute to high-quality codebases.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xl">
                    3.
                  </span>
                  <p className="text-lg text-gray-700">
                    Build your portfolio and improve your chances of securing future job opportunities in the tech industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;