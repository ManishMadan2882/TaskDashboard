import React, { useEffect, useState } from 'react'
import { fetchAssignment } from '../api'

const Header = ({ assignmentId }) => {
    const [assignment, setAssignment] = useState({})
    useEffect(() => {
        fetchAssignment(assignmentId).then((data) => {
            if (data.id)
                setAssignment(data)
            else console.log('error')
        })
    }, [])
    return (
        <div className='text-center bg-sky-100 p-2'>
            <div>
                <h1 className='text-3xl'> {assignment.title}</h1>
            </div>
            <div>

                <span className='italic'>{assignment.description}</span>
            </div>
            <div>
                <h1>Maximum {assignment.teamSize} students per team</h1>
            </div>
        </div>
    )
}

export default Header