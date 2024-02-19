import React from 'react'
import copyIcon from '../assets/copy.png'
const AssignmentCard = ({assignment}) => {
    return (
        <div className='p-4'>
            <div
                className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <a href="#!">

                </a>
                <div className="p-6 relative">
                    <h5
                        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {assignment.title}
                    </h5>
                    <p className="mb-4 h-[200px] text-base text-neutral-600 dark:text-neutral-200">
                       {(assignment.description+(assignment.description.length>250 ? '...':"")).slice(0,250)}
                    </p>
                    <div className='flex justify-between absoulute -bottom-2'>
                        <a
                            href={'/submissions/'+assignment.id}
                            className="inline-block text-sm rounded bg-blue-500 text-gray-200 p-1">
                            View Submissions
                        </a>
                        <button
                            type="button"
                            onClick={()=>{
                                navigator.clipboard.writeText(window.location.href+'form/'+assignment.id)
                            }}
                            className="flex  text-sm justify-between  rounded bg-blue-100 text-gray-200 p-1">
                            <span className='inline mx-4 text-blue-900'>Copy URL</span>
                            <img className='w-6 float-right' src={copyIcon}/>
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignmentCard