'use client';
import { IconEye, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import axios from "axios"
import Link from "next/link";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";


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
                        className="block w-fit  mx-auto rounded bg-blue-500 text-white px-3 py-1">
                        <IconPencil />
                      </Link>
                    </td>
                    <td>
                      <Link href={`/admin/view-project/${project._id}`}
                        className="block w-fit  mx-auto rounded bg-green-500 text-white px-3 py-1">
                        <IconEye />
                      </Link>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default Manageproduct;