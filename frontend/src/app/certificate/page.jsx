"use client"

import { useState, useEffect } from "react"

export default function CertificatePage() {
  const [certificateData, setCertificateData] = useState({
    recipientName: "John Doe",
    projectName: "Galaxy Explorer",
    companyName: "Stellar Technologies",
    duration: "3 months",
    completionDate: "2025-04-10",
    mentorName: "Dr. Jane Smith",
    certificateId: "",
  })

  // Generate a random certificate ID on initial load
  useEffect(() => {
    setCertificateData((prev) => ({
      ...prev,
      certificateId: Math.random().toString(36).substring(2, 10).toUpperCase(),
    }))
  }, [])

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Update certificate with form values
  const updateCertificate = () => {
    setCertificateData((prev) => ({
      ...prev,
      certificateId: Math.random().toString(36).substring(2, 10).toUpperCase(),
    }))
  }

  // Print certificate
  const printCertificate = () => {
    window.print()
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 print:hidden">Open Galaxy Certificate Generator</h1>

      {/* Form Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              value={certificateData.recipientName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={certificateData.projectName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={certificateData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={certificateData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-1">
              Completion Date
            </label>
            <input
              type="date"
              id="completionDate"
              name="completionDate"
              value={certificateData.completionDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="mentorName" className="block text-sm font-medium text-gray-700 mb-1">
              Mentor Name
            </label>
            <input
              type="text"
              id="mentorName"
              name="mentorName"
              value={certificateData.mentorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={updateCertificate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Update Certificate
          </button>
          <button
            onClick={printCertificate}
            className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
          >
            Print Certificate
          </button>
        </div>
      </div>

      {/* Certificate */}
      <div id="certificate-container">
        <div className="w-[210mm] h-[297mm] bg-white border-8 border-purple-900 p-8 mx-auto relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-repeat opacity-10"></div>
          </div>

          {/* Certificate border */}
          <div className="border-4 border-purple-200 h-full w-full p-8 relative">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>

            <div className="flex flex-col items-center justify-between h-full">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div className="w-16 h-16 relative bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">Logo</span>
                  </div>
                  <h1 className="text-4xl font-bold text-purple-900">OPEN GALAXY</h1>
                  <div className="w-16 h-16 relative bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">Logo</span>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-600">Open Source Internship Program</h2>
              </div>

              {/* Certificate content */}
              <div className="text-center flex-grow flex flex-col justify-center">
                <h2 className="text-2xl text-gray-700 mb-2">This certificate is proudly presented to</h2>
                <h1 className="text-5xl font-bold text-purple-800 my-6 font-serif">{certificateData.recipientName}</h1>

                <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                  for successfully completing the Open Source Internship Program at{" "}
                  <span className="font-semibold">{certificateData.companyName}</span>, contributing to the{" "}
                  <span className="font-semibold">{certificateData.projectName}</span> project for a duration of{" "}
                  <span className="font-semibold">{certificateData.duration}</span>.
                </p>

                <div className="flex justify-center items-center gap-2 mb-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-500"
                  >
                    <path d="M12 8.5V12.5L14 14.5"></path>
                    <path d="M19.7 14C21.1 14 22 15 21.9 16.7C21.8 18.1 21.6 19.4 21.1 20.6C20.7 21.6 19.9 22 18.5 22H5.5C4.1 22 3.3 21.6 2.9 20.6C2.4 19.4 2.2 18.1 2.1 16.7C2 15 2.9 14 4.3 14C4.3 14 4.4 14 4.8 14H19.2C19.6 14 19.7 14 19.7 14Z"></path>
                    <path d="M16.2 2H7.8C6.18 2 5.37 2 4.73 2.33C4.08 2.66 3.66 3.28 2.83 4.52L2 5.7C3 5.7 3.9 6.1 4.5 6.7L7.5 9.7C8.3 10.5 9.7 10.5 10.5 9.7L13.5 6.7C14.1 6.1 15 5.7 16 5.7L15.17 4.52C14.34 3.28 13.92 2.66 13.27 2.33C12.63 2 11.82 2 10.2 2"></path>
                  </svg>
                  <span className="text-xl font-semibold text-purple-800">CERTIFICATE OF ACHIEVEMENT</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-500"
                  >
                    <path d="M12 8.5V12.5L14 14.5"></path>
                    <path d="M19.7 14C21.1 14 22 15 21.9 16.7C21.8 18.1 21.6 19.4 21.1 20.6C20.7 21.6 19.9 22 18.5 22H5.5C4.1 22 3.3 21.6 2.9 20.6C2.4 19.4 2.2 18.1 2.1 16.7C2 15 2.9 14 4.3 14C4.3 14 4.4 14 4.8 14H19.2C19.6 14 19.7 14 19.7 14Z"></path>
                    <path d="M16.2 2H7.8C6.18 2 5.37 2 4.73 2.33C4.08 2.66 3.66 3.28 2.83 4.52L2 5.7C3 5.7 3.9 6.1 4.5 6.7L7.5 9.7C8.3 10.5 9.7 10.5 10.5 9.7L13.5 6.7C14.1 6.1 15 5.7 16 5.7L15.17 4.52C14.34 3.28 13.92 2.66 13.27 2.33C12.63 2 11.82 2 10.2 2"></path>
                  </svg>
                </div>

                <div className="flex justify-center gap-4 mb-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Code Contribution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Open Source Best Practices</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="w-full mt-8">
                <div className="flex justify-between items-end flex-wrap">
                  <div className="text-center">
                    <div className="w-48 border-t-2 border-gray-400 pt-2 mb-1"></div>
                    <p className="font-semibold">{certificateData.mentorName}</p>
                    <p className="text-sm text-gray-600">Program Mentor</p>
                  </div>

                  <div className="text-center">
                    <div className="w-48 border-t-2 border-gray-400 pt-2 mb-1"></div>
                    <p className="font-semibold">Open Galaxy</p>
                    <p className="text-sm text-gray-600">Program Director</p>
                  </div>

                  <div className="text-center">
                    <div className="w-48 border-t-2 border-gray-400 pt-2 mb-1"></div>
                    <p className="font-semibold">{formatDate(certificateData.completionDate)}</p>
                    <p className="text-sm text-gray-600">Date of Completion</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">Certificate ID: OG-CERT-{certificateData.certificateId}</p>
                  <p className="text-sm text-gray-500">Verify this certificate at opengalaxy.example.com/verify</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
