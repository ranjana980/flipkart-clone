import React, { useState } from 'react'
import { Notifications, Email, Menu } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import SideNavbar from '../../pages/admin/side-navbar';
import logo from '../../assests/images/admin-logo.png'
import { useSelector } from 'react-redux';

export default function AdminNavbar() {
    const navigate = useNavigate()
    const [Open, setOpen] = useState(false);
    const { menu } = useSelector((state) => state.style)

    return (
        <div>
            <SideNavbar />
            <div className={`${menu ? 'w-[85%]' : 'w-[95%]'}   bg-white drop-shadow-lg h-[60px] ] absolute  top-0 right-0`}>
                <div >
                    <div className='flex justify-between pl-5 pr-5'>
                        <div className='mt-3 text-teal-500 lg:hidden xl:hidden md:block sm:block xs:block'>
                            <Menu />
                        </div>
                        <div>
                            <img src={logo} height={50} width={50} className='rounded-full p-2  cursor-pointer' />
                        </div>
                        <div className='flex p-2'>
                            <div className=' flex border-r-2 border-gray-400 mt-2 h-[30px] mr-5'>
                                <Notifications className='text-gray-300 mr-10' />
                                <Email className='text-gray-300 mr-10' />
                            </div>
                            <img src={logo} height={50} width={50} className='rounded-full p-2  cursor-pointer' onClick={() => setOpen(!Open)} />
                        </div>
                    </div>
                </div>
                {Open ? <div className=' bg-white absolute text-start right-10 p-2 rounded-[3px] top-10 drop-shadow-lg cursor-pointer' onClick={() => {
                    localStorage.removeItem('LoginStatus')
                    navigate('/')
                    swal('LogOut SuccessFully')
                }}>
                    <span className='p-1 text-start'>LogOut</span><br />
                    <span className='p-1 text-start text-nowrap'>Edit Profile</span>
                </div> : ""}
            </div>
        </div >
    )
}