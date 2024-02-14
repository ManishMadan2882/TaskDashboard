import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AssignmentCard from './AssignmentCard'
import { fetchAssignments } from '../api'
import { Modal } from '@mui/material'
const Dashboard = ({ user }) => {
  const [assignments, setAssignments] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(() => {
    fetchAssignments().then((data) => {
      setAssignments(data)
    })
  }, []);
  return (
    <div>
      <Navbar user={user} />
      
      <div className='bg-blue-50 h-[88vh]'>
        <div className=''>
          <h1 className='p-2 inline-block m-2 text-xl font-medium text-blue-600'>Assignments created by you</h1>
          <button onClick={() => setOpen(true)} className='p-2 m-4 float-right bg-blue-500 rounded-lg text-gray-200'>Create new +</button>
        </div>
        <div className='grid grid-cols-4 gap-1'>
          {
            assignments.map((assignment, key) => {
              return (
                <AssignmentCard assignment={assignment} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard