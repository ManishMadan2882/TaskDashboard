import React from 'react'
import { useState } from 'react'
import { createAssignment } from '../api';
const AssignmentForm = ({assignments,setAssignments}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState(null)
    const [teamSize, setTeamSize] = useState(2)
    const handleSubmit = (e)=>{
        e.preventDefault()
        createAssignment({
            title,
            description,
            deadline,
            teamSize
        }).then((data)=>{
            if(data.id){
                setAssignments([...assignments,data])
            }
        })
    }
    return (
        <div class="max-w-sm mx-auto mt-8 bg-slate-100 p-4">
            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IoT Systems Design and Security Evaluation "></textarea>

            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

            <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Size</label>
            <input value={teamSize} onChange={(e)=> setTeamSize(e.target.value)} type="number" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</label>
            <input className='w-80 p-2 m-2' type='date'value={deadline} onChange={(e)=>setDeadline(e.target.value)}/>
            <button onClick={(e)=>handleSubmit(e)} className='p-2 bg-sky-400 text-white m-1 w-full'>Create</button>
        </div>
    )
}

export default AssignmentForm