import React from 'react'
import accountPic from '../assets/account.png'
const Navbar = ({ user }) => {
    return (
        <div>
            <div className='sm:flex shadow-lg sm:justify-between p-2 border align-middle'>
                <h1 className='mt-4 block text-3xl text-blue-500'>Task Management Dashboard</h1>
                {user.success ? <div className='border rounded-2xl border-gray-500'>
                    <img src={accountPic} className='inline' />
                    <span className='text-xl p-2'>
                        {user.name}
                    </span>
                </div>
                    : <div>
                        <a href='/login'>Log in</a>
                        <a href='/register'>Sign up</a>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar