import React, { useState } from 'react'
import { createProject } from '../api';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import Header from './Header';
const ProjectForm = () => {
    const params = useParams();
    const { id } = params;
    const [problemStatement, setProblemStatement] = useState('')
    const [values, setValues] = useState(['', '']);
    const addrow = () => {
        let x = values;
        setValues([...values, ""])
    }
    const reducerow = ()=>{
        if (values.length > 0) {
            const newValues = [...values]; // Create a copy of the array
            newValues.pop(); // Remove the last element from the array
            setValues(newValues); // Update the state
          }
    }
    const handleChange = (index, value) => {
        let newValues = [...values]; // Create a copy of the array
        newValues[index] = value; // Update the value at the specified index
        setValues(newValues); // Update the state
    };
    const handleSubmit = (e) => {
        createProject({
            problemStatement,
            team: values
        },
            id
        ).then((data) => {
            if (data.id)
                toast.success('Submited !')
            else toast.error(data.msg)
        })
    }
    return (
        <div className='bg-sky-100 h-[100vh] mt-0'>
            <div className="container mx-auto  px-4 ">
                <ToastContainer
                    className={'fixed z-10 '}
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <div className="max-w-lg mx-auto">
                <Header assignmentId={id}/>
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
                            <h2 className="text-2xl font-bold">Submit Problem Statement</h2>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <label for="problem_statement" className="block text-lg font-medium text-gray-700 mb-1">Problem Statement</label>
                                <textarea value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} id="problem_statement" rows="4" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your problem statement here..."></textarea>
                            </div>
                            <div className="mb-4">
                                <label for="team_usn" className="block text-lg font-medium text-gray-700 mb-1">Enter Student USN</label>
                                {
                                    values.map((value, key) => {
                                        return <div id="team_usn_fields">
                                            <input
                                                key={key}
                                                type="text"
                                                value={value}
                                                className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2'
                                                onChange={(e) => handleChange(key, e.target.value)}
                                            />
                                        </div>
                                    })
                                }
                                <div className='flex justify-between w-full'>
                                <button type="button" onClick={() => addrow()} id="add_usn_button" className="bg-sky-500 text-white font-medium px-4 py-2 rounded-md focus:outline-none">+</button>
                                <button type="button" onClick={() => reducerow()} id="add_usn_button" className="bg-sky-500 text-white font-medium px-4 py-2 rounded-md focus:outline-none">-</button>
                                </div>
                            </div>
                            <div className="text-center">
                                <button onClick={(e) => handleSubmit(e)} className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm