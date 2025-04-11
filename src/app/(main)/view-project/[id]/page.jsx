'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ViewProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [editMode, setEditMode] = useState(false)

  // Simulated user role (you can fetch this from session/auth later)
  const userRole = 'admin' // or 'mentor' or 'viewer'

  useEffect(() => {
    async function fetchProject() {
      const res = await fetch(`/api/projects/${id}`)
      const data = await res.json()
      setProject(data)
    }

    if (id) fetchProject()
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSave() {
    console.log('Saving project data:', project)
    // Add API call here to update
    setEditMode(false)
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading project...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Project Details</h1>
        {userRole === 'admin' || userRole === 'mentor' ? (
          <button
            onClick={() => setEditMode((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {editMode ? 'Cancel' : 'Edit Project'}
          </button>
        ) : null}
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-100">
        {[
          { label: 'Project Title', name: 'title', type: 'text' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Difficulty', name: 'difficulty', type: 'text' },
          { label: 'Mentor Name', name: 'mentorName', type: 'text' },
          { label: 'Mentor Email', name: 'mentorEmail', type: 'email' },
          { label: 'GitHub Repository', name: 'githubUrl', type: 'text' },
          { label: 'Organization', name: 'organization', type: 'text' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={project[field.name]}
                onChange={handleChange}
                readOnly={!editMode}
                className={`w-full mt-1 px-4 py-2 border rounded-md h-32 ${
                  editMode ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={project[field.name]}
                onChange={handleChange}
                readOnly={!editMode}
                className={`w-full mt-1 px-4 py-2 border rounded-md ${
                  editMode ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
          {editMode ? (
            <input
              type="text"
              name="techStack"
              value={project.techStack.join(', ')}
              onChange={(e) =>
                setProject((prev) => ({
                  ...prev,
                  techStack: e.target.value.split(',').map((item) => item.trim()),
                }))
              }
              className="w-full mt-1 px-4 py-2 border rounded-md bg-white"
            />
          ) : (
            <div className="flex flex-wrap gap-2 mt-1">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {editMode && (
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
