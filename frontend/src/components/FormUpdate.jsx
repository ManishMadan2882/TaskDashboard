import { updateState } from '../reduxStore/taskSlice'
import React, { useState } from 'react'
import items from '../constants/headings.json'
import { useDispatch } from 'react-redux'

const FormUpdate = ({ data }) => {
    const [obj, setObj] = useState(data)


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
        dispatch(updateState({ newbie: obj, id: data._id }))
    }
    return (
        <div className='w-[80%]'>
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
                                        <option value={'ABORT'} >ABORT</option>
                                    </select>
                                </div>
                            )
                        }
                        return (<div className='m-8 border-b border-grey-200'>
                            <label className='p-2 text-lg'>{elem.label}</label>
                            <input value={obj[elem.Value]} name={elem.Value} type='text' onChange={handleChange} className='float-right shadow-lg rounded-md border-sky-200 border bg-sky-50 p-2 w-48' />
                        </div>)
                    })
                }

                <button
                    onClick={save}
                    className='border p-2 rounded hover:bg-green-100 border-green-500 w-48 text-green-500'>
                    UPDATE
                </button>

            </div>
        </div>
    )
}

export default FormUpdate