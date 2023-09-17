import { createRow } from '../reduxStore/taskSlice'
import React, { useState } from 'react'
import items from '../constants/headings.json'
import { useDispatch } from 'react-redux'

const Form = () => {
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
        let obj2 = obj;
        obj2[e.target.name] = e.target.value;
        setObj(obj2)
        console.log(obj);
    }
    const dispatch = useDispatch()
    const save = ()=>{
            //saves the created state
            dispatch(createRow({newbie:obj}))
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
                            <input name={elem.Value} type='text' onChange={handleChange} className='float-right shadow-lg rounded-md border-sky-200 border bg-sky-50 p-2 w-48'></input>
                        </div>)
                    })
                }
                
                    <button
                    onClick={save} 
                    className='border p-2 rounded hover:bg-sky-100 border-blue-500 w-48 text-blue-500'>
                        SAVE
                    </button>
                
            </div>
        </div>
    )
}

export default Form