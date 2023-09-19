import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import deleteImg from '../assets/delete.png'
import { deleteState } from '../reduxStore/taskSlice'
import editImg from '../assets/edit.png'
import items from '../constants/headings.json'
import { Modal } from '@mui/material';
import Form from './Form';
import FormUpdate from './FormUpdate';
const customStyles = {
    content: {
        left: '50%',
        right: 'auto',
        width: "max-content"
    },
};


const Tasks = () => {
    const dispatch = useDispatch();
    const rows = useSelector((state) => state.contents);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editorIsOpen, setEditorOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [current, setCurrent] = useState({})
    function deleteRow(id) {
        dispatch(deleteState({ id: id }));
    }
    function openModal() {
        setIsOpen(true);
    }

    function openEditModal(rowData) {
        setCurrent(rowData)
        setEditorOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function closeEditorModal() {
        setEditorOpen(false);
    }
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const [param, setParam] = useState(1)
    return <div>
        <div className=''>
            {/* Modal for Creating new Row */}
            <Modal
                open={modalIsOpen}
                onClose={closeModal}
            >
                <Form close={closeModal} />
            </Modal>
            {/* Modal for updating a pre-existing row */}
            <Modal
                open={editorIsOpen}
                onClose={closeEditorModal}
            >
                <FormUpdate data={current} close={closeEditorModal} />
            </Modal>
        </div>

        <h1 className='shadow-xl rounded-md text-xl text-blue-600 font-bold  m-2 px-2 py-4'>Dashboard</h1>
        <div>
            <div className='sm:flex sm:justify-between p-2'>
                <h1 className='block text-xl text-blue-500'>Emplanelment Case Requests</h1>
                <div >
                    <label className='block sm:inline'>Search by: </label>
                    <select value={param} onChange={e => setParam(e.target.value)} className='sm:py-2 sm:px-4 p-1 sm:w-auto w-24  border-blue-500 text-blue-500 rounded-lg border' >
                        {
                            items.map((elem, key) => {
                                return <option value={key}>{elem.label}</option>
                            })
                        }
                    </select>
                    <input id='search' value={searchQuery} onChange={handleSearchChange} type='text' placeholder={`Search by ${items[param].label}`} className='mx-2 rounded-full border-2 sm:w-auto pl-4 pr-8 py-2 w-48 border-blue-500 text-blue-500' />
                </div>
                <div>
                    <button onClick={openModal} className='py-2 px-4 hover:bg-sky-100 border-blue-500 text-blue-500 rounded-lg border'>Create +</button>
                </div>
            </div>
            <div className='overflow-auto'>
                <table class="text-xs mt-4 w-[100vw]  text-center shadow-xl  ">
                    <thead >
                        <tr >
                            {items.map((element, key) => {
                                return <th className=' text-center border  bg-gray-600 text-white'>{element.label}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.filter((row) =>
                                row[items[param].Value].toLowerCase().includes(searchQuery.toLowerCase())
                            ).map((row, key) => {
                                return (<tr className={(key % 2) ? 'bg-blue-100' : "bg-white"}>
                                    {items.map((element, key) => {
                                        return (<td className={' border text-center border-slate-300 '}>{row[element.Value] || '_'}</td>)
                                    })}
                                    <div className='flex justify-start'>
                                        <button onClick={() =>
                                            openEditModal(row)}
                                            className='p-2 w-8 h-8 rounded m-2 bg-green-50 hover:bg-green-200 shadow-md'><img width={'40px'} src={editImg} /></button>
                                        <button onClick={() => {
                                            deleteRow(row._id)
                                        }} className='p-2 rounded m-2 bg-rose-50 w-8 h-8 hover:bg-rose-200 shadow-md'><img width={'40px'} src={deleteImg} /></button>
                                    </div>
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
};
export default Tasks