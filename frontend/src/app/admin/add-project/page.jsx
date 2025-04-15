'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddProject = () => {

  const router = useRouter();

  // initializing formik
  const projectForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      tags: '',
      duration: '',
      language: '',
      deadline: '',
      companyName: '',
      image: ''
    },

    onSubmit: (value, { resetForm, setSubmitting }) => {
      console.log(value);

      // send values to backend
      //sending request to backend
      axios.post('http://localhost:5000/task/add', value)
        .then((result) => {
          toast.success('project registered successfully');
          resetForm();
          router.push('/login');
        }).catch((err) => {
          console.log(err);
          toast.error('something went wrong');
          setSubmitting(false);
        });

    },
    // validationSchema: projectFormSchema
  })

  const [preview, setPreview] = useState('');

  const upload = (e) => {

    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'mypreset')
    fd.append('cloud_name', 'dng2mcid4')

        axios.post('https://api.cloudinary.com/v1_1/dng2mcid4/image/upload', fd)
        .then((result) => {
          toast.success('file upload successfully');
          console.log(result.data);
          setPreview(result.data.url);
          projectForm.setFieldValue('image', result.data.url);
        }).catch((err) => {
          console.log(err);
          toast.error('failed to upload file');

        });
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add a New Project</h2>

      <form onSubmit={projectForm.handleSubmit}>
        {/* Project Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Project Title</label>
          <input
            type="text"
            id="title"
            value={projectForm.values.title}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter the project title"
          />
          {/* {error.title && <p className="text-red-500 text-sm">{error.title}</p>} */}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={projectForm.values.description}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Describe the project"
            rows="4"
          />
          {/* {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>} */}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={projectForm.values.tags}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter project tags (optional)"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700">Internship Duration</label>
          <select
            type="text"
            id="duration"
            name="duration"
            value={projectForm.values.duration}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select Duration</option>
            <option value="1 month">1 month</option>
            <option value="2 months">2 months</option>
            <option value="3 months">3 months</option>
            <option value="4 months">4 months</option>
          </select>
          {/* {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>} */}
        </div>

        {/* Skills Required */}
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700">Skills Required</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={projectForm.values.skills}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter skills separated by commas"
          />
        </div>

        {/* Application Deadline */}
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700">Application Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={projectForm.values.deadline}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
          {/* {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>} */}
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={projectForm.values.companyName}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter your company name"
          />
          {/* {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>} */}
        </div>
        <div className="mb-4">
          <label htmlFor="upload" className="block text-gray-700">
            Image
                  <input type="file"  onChange={upload} id='upload' hidden/>
          </label>
          <input
            type="text"
            id="image"
            value={projectForm.values.image}
            onChange={projectForm.handleChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter your company name"
          />
          {/* {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>} */}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
