'use client';
import { IconPencil, IconTrashFilled } from "@tabler/icons-react";
import axios from "axios"
import Link from "next/link";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";

// Add Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-indigo-600 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">
            Open Galaxy Admin
          </Link>
          <div className="flex space-x-6">
            <Link href="/admin/manage-task" className="text-white hover:text-indigo-100">Manage Tasks</Link>
            <Link href="/admin/add-project" className="text-white hover:text-indigo-100">
              Add Project
            </Link>
            <Link href="/admin/update-projects" className="text-white hover:text-indigo-100">
              Update Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Add Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Open Galaxy</h3>
            <p className="text-gray-400 text-sm">
              Managing open source projects efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/manage-project" className="text-gray-400 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/admin/Add-project" className="text-gray-400 hover:text-white">
                  Add Project
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Email: admin@opengalaxy.com<br />
              Phone: (555) 123-4567
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

const Manageproduct = () => {

  const [userList, setuserList] = useState([]);

  const fetchuserData = async () => {
    const res = await axios.get('http://localhost:5000/project/getall');
    console.table(res.data);
    setuserList(res.data);
  }

  useEffect(() => {
    fetchuserData();
  }, []);

  const deleteproject = (id) => {
    axios.delete(`http://localhost:5000/project/delete/${id} `)
      .then((result) => {
        toast.success('project deleted successfully');
        fetchuserData();
      }).catch((err) => {
        console.log(err);
        toast.error('failed to delete project');
      })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className='max-w-[80%] mx-auto'>
          <h1 className='text-3xl font-bold text-center'>Manage Project</h1>
          <table className="w-full mt-10 border-2 border-slate-800">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th>S. No.</th>
                <th>Title</th>
                <th>description</th>
                <th>language</th>
                <th>Tags</th>
                <th>CompanyName</th>
                <th>CreatedAt</th>
                <th>Deadline</th>
                <th>Action</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                userList.map((project, index) => {

                  return <tr key={project._id}
                    className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}>

                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{project.title}</td>
                    <td className="p-3">{project.description}</td>
                    <td className="p-3">{project.language}</td>
                    <td className="p-3">{project.tags}</td>
                    <td className="p-3">{project.companyName}</td>
                    <td className="p-3">{new Date(project.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(project.deadline).toLocaleDateString()}</td>


                    <td>
                      <button onClick={() => { deleteproject(project._id) }}
                        className="rounded bg-red-500 text-white px-3 py-1">
                        <IconTrashFilled />
                      </button>
                    </td>

                    <td>
                      <Link href={`/admin/update-projects/${project._id}`}
                        className="block w-fit  mx-auto rounded bg-red-500 text-white px-3 py-1">
                        <IconPencil />
                      </Link>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Manageproduct;