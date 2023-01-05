import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import PeopleIcon from '@material-ui/icons/People';
import LocalMallIcon from '@material-ui/icons/LocalMall';
// import ArticleIcon from '@material-ui/icons/Article';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import VisibilityIcon from '@material-ui/icons/Visibility';


export default function AdmimPage() {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.FormDataReducer);
    return (
        <div className='lg:grid-cols-12 grid'>
            <div className='lg:col-span-2 w-75 text-white bg-gray-600'>
                <div className='p-2'>
                    <img src={userInfo.profile_pic} className='relative left-10' style={{ borderRadius: '50%', height: "50px", width: '50px' }} />
                    <h6 className='text-white text-start xs:text-xs lg:text-lg' >{userInfo.username}</h6>
                </div>
                <div className=' text-start mt-3 ml-5'>
                    <h6>Dashboard </h6>
                    <h6>Products</h6>
                    <h6>Users</h6>
                </div>

            </div>
            <div className='lg:col-span-10 mt-2'>
                <div className='flex '>
                    <div className=' p-3 ml-5 text-white bg-green-500 h-25 '>
                        <div className='flex '>
                            <div className='text-start'>
                                <h3>83</h3>
                                <h5>Register Users</h5>
                            </div>
                            <div className='p-1 bg-white ml-2' style={{ height: '40px', width: '40px', borderRadius: '50%' }}>
                                <PeopleIcon className='text-black lg:text-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='text-start p-3 ml-5 text-white bg-blue-500  h-25'>
                        <div className='flex '>
                            <div className='text-start'>
                                <h3>83</h3>
                                <h5>Register Users</h5>
                            </div>
                            <div className='p-1 bg-white ml-2' style={{ height: '40px', width: '40px', borderRadius: '50%' }}>
                                <LocalMallIcon className='text-black lg:text-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='text-start p-3 ml-5 text-white bg-yellow-500  h-25'>
                        <div className='flex '>
                            <div className='text-start'>
                                <h3>83</h3>
                                <h5>Register Users</h5>
                            </div>
                            <div className='p-1 bg-white ml-2' style={{ height: '40px', width: '40px', borderRadius: '50%' }}>
                                <VisibilityIcon className='text-black lg:text-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='text-start p-3 ml-5 text-white bg-orange-500  h-25'>
                        <div className='flex '>
                            <div className='text-start'>
                                <h3>83</h3>
                                <h5>Register Users</h5>
                            </div>
                            <div className='p-1 bg-white ml-2' style={{ height: '40px', width: '40px', borderRadius: '50%' }}>
                                <LocalShippingIcon className='text-black lg:text-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='text-start p-3 ml-5 text-white bg-red-500  h-25'>
                        <div className='flex '>
                            <div className='text-start'>
                                <h3>83</h3>
                                <h5>Register Users</h5>
                            </div>
                            <div className='p-1 bg-white ml-2' style={{ height: '40px', width: '40px', borderRadius: '50%' }}>
                                <AddShoppingCartIcon className='text-black lg:text-lg' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}
