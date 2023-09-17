import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import deleteImg from '../assets/delete.png'
import { deleteState } from '../reduxStore/taskSlice'
import editImg from '../assets/edit.png'
import items from '../constants/headings.json'
import Modal from 'react-modal';
import Form from './Form';
import FormUpdate from './FormUpdate';
const Tasks = () => {
    const dispatch = useDispatch();
    const rows = useSelector((state) => state.contents);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editorIsOpen, setEditorOpen] = useState(false)
    function deleteRow(id){
        dispatch(deleteState({id:id}));
        window.location.reload()
    }
    function openModal() {
        setIsOpen(true);
    }

    function openEditModal() {
        setEditorOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function closeEditorModal() {
        setEditorOpen(false);
    }
    const [param, setParam] = useState(1)
    return <div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create"
        >
            <Form close={closeModal} />
        </Modal>


        <h1 className='shadow-xl rounded-md text-xl text-blue-600 font-bold  m-2 px-2 py-4'>Dashboard</h1>
        <div>
            <div className='flex justify-between p-2'>
                <h1 className='inline text-blue-500'>Emplanelment Case Requests</h1>
                <div >
                    <label>Search by: </label>
                    <select value={param} onChange={e => setParam(e.target.value)} className='py-2 px-4 border-blue-500 text-blue-500 rounded-lg border' >
                        {
                            items.map((elem, key) => {
                                return <option value={key}>{elem.label}</option>
                            })
                        }
                    </select>
                    <input id='search' type='text' placeholder={`Search by ${items[param].label}`} className='mx-2 rounded-md border py-2 px-4 border-blue-500 text-blue-500' />
                </div>
                <div>
                    <button onClick={openModal} className='py-2 px-4 hover:bg-sky-100 border-blue-500 text-blue-500 rounded-lg border'>Create +</button>
                </div>
            </div>
            <table class="text-sm mt-4 w-full text-center shadow-lg  ">
                <thead >
                    <tr >
                        {items.map((element, key) => {
                            return <th className='p-2 text-center border  bg-gray-600 text-white'>{element.label}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((row, key) => {
                            return (<tr className={(key % 2) ? 'bg-blue-100' : "bg-white"}>
                                {items.map((element, key) => {
                                    {/* console.log(row[element.value]) */ }
                                    return (<td className={' border text-center p-2 border-slate-300 '}>{row[element.Value] || '_'}</td>)
                                })}
                                <div className='flex justify-start'>
                                    <Modal
                                        isOpen={editorIsOpen}
                                        onRequestClose={closeEditorModal}
                                        contentLabel="update"
                                    >
                                        <FormUpdate data={row} close={closeModal} />
                                    </Modal>
                                    <button onClick={openEditModal} className='p-2 rounded m-2 bg-green-50 hover:bg-green-200 shadow-md'><img width={'40px'} src={editImg} /></button>
                                    <button onClick={()=>deleteRow(row._id)} className='p-2 rounded m-2 bg-rose-50 hover:bg-rose-200 shadow-md'><img width={'40px'} src={deleteImg} /></button>
                                </div>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
};
export default Tasks