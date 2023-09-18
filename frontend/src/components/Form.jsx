import { createRow } from '../reduxStore/taskSlice'
import React, { useState } from 'react'
import items from '../constants/headings.json'
import { useDispatch } from 'react-redux'

const Form = ({ close }) => {
    const [obj, setObj] = useState({
        "ensrCode": "",
        "caseId": "",
        "caseDate": "",
        "zone": "",
        "receivedFrom": "",
        "processName": "",
        "caseName": "",
        "status": "",
        "timeElapsed": "  ",
        "dateExtension": "",
        "assignedTo": "",
        "action": "ASSIGN"
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setObj({
            ...obj, // Spread the existing state
            [name]: value, // Update the property based on event name
        });
    };
    const dispatch = useDispatch()
    const save = () => {
        //saves the created state
        dispatch(createRow({ newbie: obj }))
        close()
    }
    return (
        <div className='bg-white p-2 w-full sm:w-[50%] center h-screen overflow-auto'>

            <button className='rounded-full float-right px-2 hover:bg-sky-500 bg-blue-700 text-white' onClick={close}>x</button>
            <h1 className='text-xl text-blue-400 border-blue-400 border-b'>Create New Row </h1>
            <div >
                {
                    items.map((elem, key) => {
                        if (elem.label === 'Action') {
                            return (
                                <div className='m-8 border-b border-grey-200'>
                                    <label className='p-2 text-lg'>
                                        {elem.label}
                                    </label>
                                    <select onChange={handleChange} name={elem.Value} value={obj.action} className='float-right  rounded-md border-sky-200 w-48 border bg-sky-50 p-2'>
                                        <option value={'ASSIGN'} >ASSIGN</option>
                                        <option value={'REASSIGN'} >REASSIGN</option>
                                        <option value={'COMPLETED'} >COMPLETED</option>
                                        <option value={'ABORT'} >ABORT</option>
                                    </select>
                                </div>
                            )
                        }
                        return (<div className='m-8 border-b border-grey-200'>
                            <label className='p-2 text-lg'>{elem.label}</label>
                            <input placeholder={elem.placeholder} name={elem.Value} type='text' onChange={handleChange} className='float-right shadow-lg rounded-md border-sky-200 border bg-sky-50 p-2 w-48'></input>
                        </div>)
                    })
                }

                <div className='justify-center flex'>
                <button
                    onClick={save}
                    className=' border my-4 mx-2 p-2 rounded hover:bg-sky-100 border-blue-500 w-48 text-blue-500'>
                    SAVE
                </button>
                </div>

            </div>
        </div>
    )
}

export default Form