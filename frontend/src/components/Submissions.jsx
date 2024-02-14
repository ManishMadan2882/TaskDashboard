import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header';
import { changeStatus, fetchProjects } from '../api';
const Submissions = () => {
    const params = useParams();
    const [projects, setProjects] = useState([])
    const { id } = params;
    useEffect(() => {
        fetchProjects(id).then((data) => {
            if (data?.length > 0)
                setProjects(data)
        })
    }, [])
    function getColor(status) {
        if (status === 'APPROVED')
            return 'bg-green-100'
        else if (status === 'REJECTED')
            return 'bg-rose-100'
        
        return 'bg-yellow-100'
    }
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Header assignmentId={id} />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-12">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Problem Statement
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Team
                            </th>
                            <th scope="col" className="px-6 py-3 w-48">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.map((project, key) => {
                                let color = getColor(project.status)
                                return (
                                    <tr className={`border-b border-gray-200 dark:border-gray-700`}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {project.id}
                                        </th>
                                        <td class="px-6 py-4">
                                            {project.problemStatement}
                                        </td>
                                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            {project.team.toString()}
                                        </td>
                                        <td class={"px-6 py-4 "+color}>
                                            <select
                                                className={'p-2 '}
                                                value={project.status} 
                                                onChange={(e) => {
                                                    let x = projects;
                                                    x[key].status = e.target.value;
                                                    changeStatus(id,project.id,e.target.value).then()
                                                    setProjects(prevOptions => {
                                                        const newOptions = [...prevOptions]; // Create a copy of the state array
                                                        newOptions[key].status = e.target.value; // Update the status of the corresponding object
                                                        return newOptions; // Update the state with the new array
                                                    })
                                                }}>
                                                <option>APPROVED</option>
                                                <option>PENDING</option>
                                                <option>REJECTED</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Submissions