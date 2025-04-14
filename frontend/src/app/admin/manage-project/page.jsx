 'use client';
 import { IconPencil, IconTrashFilled } from "@tabler/icons-react";
 import axios from "axios"
 import Link from "next/link";
 import React, { useEffect, useState } from "react"
 import toast from "react-hot-toast";

 const Manageproduct = () => {

     const[userList,setuserList]= useState([]);

const fetchuserData= async () => {
 const res=await axios.get('http://localhost:5000/project/getall');
 console.table(res.data);
 setuserList(res.data);
}

useEffect(() => {
    fetchuserData();
}, []);

const deleteproject= (id) => {
    axios.delete(`http://localhost:5000/project/delete/${id} `)
    .then((result) => {
        toast.success('project deleted successfully');
        fetchuserData();
    }).catch((err) => {
        console.log(err);
        toast.error('failed to delete project');
    })
}

 return(
    <div>
    <div className='max-w-[80%] mx-auto'>
    <h1 className='text-3xl font-bold text-center'>Manage Project</h1>
      <table className="w-full mt-10 border-2 border-slate-800">
        <thead className="bg-blue-600 text-white">
            <tr>
                <th>S. No.</th>
                {/* <th>Project ID</th> */}
                <th>Title</th>
                {/* <th>difficulty</th> */}
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
                userList.map((project,index) => {
                
                  return <tr key={project._id}
                  className={`border-2 border-blue-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}`}>
                     
                    <td className="p-3">{index + 1}</td>
                    {/* <td className="p-3">{project._id}</td> */}
                    <td className="p-3">{project.title}</td>
                    {/* <td className="p-3">{project.difficulty}</td> */}
                    <td className="p-3">{project.description}</td>
                    <td className="p-3">{project.language}</td>
                    <td className="p-3">{project.tags}</td>
                    <td className="p-3">{project.companyName}</td>
                    <td className="p-3">{new Date(project.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">{new Date(project.deadline).toLocaleDateString()}</td>
                    
                    <td>
                        <button onClick={ () => {deleteproject(project._id) } }
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
  )
 };

  export default Manageproduct;




//  'use client';
// import { IconTrash } from '@tabler/icons-react';
// import axios from 'axios';
// import { Snippet } from 'next/font/google';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast';

// const ManageProject = () => {
    
//     const [appointmentList, setAppointmentList] = useState([]);

//    const fetchUserData = async ()=>{
//         const res= await axios.get('http://localhost:5000/project/getall');
//         console.table(res.data);
//         setAppointmentList(res.data);
//    }

//    useEffect(() => {
//     fetchUserData();
//    },[]);

//    const deleteappointment =(id)=>{
//       axios.delete(`http://localhost:5000/project/delete/${id}`)
//       .then((result) => {
//         toast.success('Project Deleted Successfully');
//         fetchUserData();
//       }).catch((err) => {
//         console.log(err);
//         toast.error('failed To Delete project')
        
//       });
//    }

//     return (
//     <div>
//         <div className='max-w-[80%] mx-auto'>
//         <h1 className='text-center font-bold text-4xl'>Manage-Project</h1>

//         <table className='w-full mt-10 border-2 border-blue-200'>
//           <thead className='bg-blue-400 text-white'>
//             <tr>
//               <th>S.NO.</th>
//               <th>Patient Name</th>
//               <th>Doctor Name</th>
//               <th>Date</th>  
//               <th>Time</th>
//               <th>Status</th>
//               <th>Link</th>
//               <th>Report</th>
//             </tr>
//           </thead>
//           <tbody className='border-2'>
//             {
//               appointmentList.map((appointment,index)=>{
//                 return<tr key={appointment._id}  className={`text-center border-2 border-blue-200 ${index %2===0 ? 'bg-blue-100' : 'bg-blue-200'}`}>
//                   <td className='p-3'>{index+1}</td>
//                   <td className='p-3'>{appointment?.patient?.name}</td>
//                   <td className='p-3'>{appointment?.slot?.doctor?.name}</td>
//                   <td className='p-3'>{appointment?.slot?.date}</td>
//                   <td className='p-3'>{appointment?.slot?.time}</td>
//                   <td className='p-3'>{appointment?.status}</td>
//                   <td className='p-3'>
//                     <a target='_blank' href={appointment?.slot?.doctor?.meetingLink}>Join Meeting</a>
//                   </td>
//                   <td>
//                       <Link href={`/user/view-report/${appointment._id}`} className='bg-green-400 p-2 rounded-md'>View Report</Link>
//                   </td>
//                 </tr>
//               })
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default ManageProject;