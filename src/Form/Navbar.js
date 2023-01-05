import React, { useState } from 'react'
import { Button } from "@material-ui/core";
import {
    Modal,
    ModalBody,
} from 'reactstrap';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import swal from 'sweetalert';
import Lottie from 'react-lottie';
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from 'react-modal-video'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from "react-redux";
import login from '../lotties/login.json'
export default function Navbar() {

    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.FormDataReducer);
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false)
    const [sizeArray, setSizeArray] = useState([])
    const [error, setError] = useState("")
    const [isOpen, setOpen] = useState(false)


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: login,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };



    var initialVal = {
        full_name: "",
        phone: "",
        email: "",
        profile_pic: "",
        password: ""
    }

    var valSchema = yup.object().shape({
        full_name: yup.string().required('Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        profile_pic: yup.string().required('Profile Image is Required!'),
        phone: yup.string().required('Mobile Number is Required'),
        email: yup.string().required('Email is Required'),
        password: yup.string().required('Password is Required'),
    });

    var initialVal3 = {
        email: "",
        password: ""
    }

    var valSchema3 = yup.object().shape({
        email: yup.string().required('Email is Required'),
        password: yup.string().required('Password is Required'),
    });

    const handleSubmit = (values) => {
        axios.post("http://localhost:5000/api/e-commerce/signupuser", values)
            .then((response) => {
                if (response.data.code == 200) {
                    dispatch({ type: "USerInfo", payload: response.data.data })
                    swal({
                        title: "Success",
                        text: "SignUp SuccessFully",
                        icon: "success",
                        button: "Okay",
                    })
                    setModal1(false)
                    localStorage.setItem('USerInfo', JSON.stringify(response.data.data))
                    setError("")
                }
                else {
                    swal({
                        text: response.data.msg,
                        icon: "Danger",
                        button: "Okay",
                    })
                }
            }).catch((error) => {
            });
    }

    const handleChange3 = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
    }

    const handleChange = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
        if (e.target.name == "profile_pic") {
            const formData = new FormData();
            formData.append('item_photo', e.target.files[0]);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post("http://localhost:5000/api/e-commerce/upload", formData, config)
                .then((response) => {
                    setFieldValue(e.target.name, response.data.msg)
                }).catch((error) => {
                });
        }
        else {
            setFieldValue(e.target.name, e.target.value)
        }
    }



    var initialVal2 = {
        item_name: "",
        original_price: "",
        price: "",
        size: "",
        free_deliver: "",
        item_photo: ""
    }

    var valSchema2 = yup.object().shape({
        item_name: yup.string().required('Name is Required!').matches(/^([A-Za-z ])+$/, "Invalid Name").min(3, "Invalid Name"),
        original_price: yup.string().required('Original Price is Required!'),
        price: yup.string().required('Price is Required'),
        size: yup.array().required('Size is Required'),
        free_deliver: yup.string().required('Free Deliver is Required'),
        item_photo: yup.string().required('Item Photo is Required'),
    });

    const handleSubmit2 = async (values) => {
        console.log(values, 'vals')
        const result = await axios.post('http://localhost:5000/api/e-commerce/addDetails', values)
        if (result.data.code == 200) {
            swal({
                title: "Success",
                text: "SuccessFully Added",
                icon: "success",
                button: "Okay",
            })
        }
        else {
            swal({
                text: result.data.msg,
                icon: "Danger",
                button: "Okay",
            })
        }
        setModal2(false)
    }

    const handleSubmit3 = async (values) => {
        console.log(values, 'vals')
        const result = await axios.post('http://localhost:5000/api/e-commerce/Login', values)
        if (result.data.code == 200) {
            swal({
                title: "Success",
                text: "Login SuccessFully",
                icon: "success",
                button: "Okay",
            })
            setModal1(false)
            dispatch({ type: "USerInfo", payload: result.data.data })
            localStorage.setItem('USerInfo', JSON.stringify(result.data.data))
            setError("")

        }
        else {
            setError(result.data.msg)
        }
    }


    const handleChange2 = (e, setFieldValue) => {
        if (e.target.name == "size") {
            if (!sizeArray.includes(e.target.value))
                setSizeArray([...sizeArray, e.target.value])
            setFieldValue(e.target.name, sizeArray)
        }
        else if (e.target.name == "item_photo") {
            setFieldValue(e.target.name, sizeArray)
            const formData = new FormData();
            formData.append('item_photo', e.target.files[0]);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post("http://localhost:5000/api/e-commerce/upload", formData, config)
                .then((response) => {
                    setFieldValue(e.target.name, response.data.msg)
                }).catch((error) => {
                });
            // 
        }
        else {
            setFieldValue(e.target.name, sizeArray)
            setFieldValue(e.target.name, e.target.value)
        }

    }
    return (
        < >
            <div className='lg:bg-blue-600 sm:bg-blue-600 md:bg-blue-600 xs:bg-blue-600 h-25'>
                <div className='grid container lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 xs:grid-cols-12  ' >
                    <div className='lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12'><h3 className='font-mono text-white italic relative lg:top-3 top-2 position  lg:right-0 xs:text-start md:text-start sm:text-start font-bold'>E-Commerce</h3></div>
                    <div className='lg:col-span-6 ml-1 lg:ml-0 md:col-span-10 sm:col-span-12 xs:col-span-10'>
                        <div className='lg:d-flex '>
                            <input style={{ color: '#4b61c0', fontWeight: '700' }} className='p-2 mt-3  w-100  lg:rounded-none italic xs:text-xs lg:text-base' placeholder="Search Your Dream Products Here...." />
                            <SearchIcon style={{ color: '#4b61c0', fontWeight: '900' }} className='lg:relative lg:bottom-10 lg:left-72 lg:font-medium mt-2 sm:relative sm:bottom-10 md:relative md:bottom-10 xs:relative xs:bottom-10 xs:left-24 ' />
                        </div>
                    </div>
                    {userInfo.login_status != 1 ?
                        <button className='mt-3 lg:col-span-2  xs:col-span-3 md:col-span-3 bg-white text-blue-600 xs:p-1 md:p-1  w-32' style={{ color: '#4b61c0', fontSize: '16px', fontWeight: '600' }} onClick={() => {
                            setModal1(!modal1)
                            setError("")
                        }}>Login</button> :
                        < >
                            <div className='lg:col-span-3 flex xs:col-span-2 xs:ml-5 sm:col-span-2 md:col-span-12 lg:ml-10  '>
                               
                                <Menu as="div" className="relative inline-block text-left ">
                                    <div>
                                        <Menu.Button className="justify-center  py-2 text-sm font-medium text-gray-700 lg-outline-none  rounded-md   focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                            <img src={userInfo.profile_pic} style={{ borderRadius: '50%', height: "30px", width: '30px' }} />
                                            <b className='text-white float-center xs:text-xs lg:text-lg' >{userInfo.username}</b>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute  right-0 z-40 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <span className='triangle'></span>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100 text-gray-900 no-underline"
                                                                    : "text-gray-700 no-underline",
                                                                "block px-4 py-2 text-sm no-underline"
                                                            )}
                                                        >
                                                            My Account
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="/admimPage"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100 text-gray-900 no-underline"
                                                                    : "text-gray-900 no-underline",
                                                                "block px-4 py-2 text-sm no-underline"
                                                            )}
                                                        >
                                                            Dashboard
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100 text-gray-900 no-underline"
                                                                    : "text-gray-900 no-underline",
                                                                "block px-4 py-2 text-sm no-underline"
                                                            )}
                                                        >
                                                            All Products
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100 text-gray-900 no-underline"
                                                                    : "text-gray-900 no-underline",
                                                                "block px-4 py-2 text-sm no-underline"
                                                            )}
                                                        >
                                                            User Chats
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <form method="POST" action="#">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                type="submit"
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100 text-gray-900"
                                                                        : "text-gray-900",
                                                                    "block w-full text-left px-4 py-2 text-sm"
                                                                )}
                                                            >
                                                                Sign out
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </form>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {userInfo.role=="admin"?null:<>
                                <div className='mt-1'>
                                    <ShoppingCartIcon className='text-white relative left-10 ' style={{ fontSize: '25px' }} onClick={() => setOpen(!isOpen)} />
                                    <b className='text-white ml-1 relative top-7' style={{ fontSize: '14px' }}>Cart</b>
                                </div>
                                <div className='mt-1'>
                                    <FavoriteIcon className='text-white  relative left-10 ' style={{ fontSize: '25px' }} />
                                    <b className='text-white ml-1 relative top-7' style={{ fontSize: '14px' }}>Wishlist</b>
                                </div></>}
                            </div>

                        </>}
                </div>
            </div>
            <Modal
                isOpen={modal1}
                toggle={() => {
                    setModal1(!modal1)
                    setError("")
                }}
                backdrop={true}
                keyboard={false}
                fullscreen={"lg"}
                scrollable={true}
                size="lg"
            >

                {modal ?
                    <div className='grid grid-cols-12'>
                        <div className='col-span-5 bg-blue-600 text-white'>
                            <div className='p-5'>
                                <h5>Create Account</h5>
                                <h6 className='leading-6 text-gray-300 mt-4 text-start'>SignUp With these Details<br />to get Started</h6>
                                <div className=' mr-3 relative top-20 mb-5'>
                                    <Lottie
                                        options={defaultOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-span-7'>
                            <CloseIcon className='relative float-right' style={{ fontSize: '40px', zIndex: '999' }} onClick={() => {
                                setModal1(!modal1)
                                setError("")
                            }} />
                            <Formik initialValues={initialVal} validationSchema={valSchema} onSubmit={handleSubmit} >
                                {
                                    (props) =>
                                    (<Form >
                                        <ModalBody>
                                            <div>
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-md-8 col-sm-6 d-flex justify-content-center">  <img src={props.values.profile_pic ? props.values.profile_pic : "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"} style={{ borderRadius: '50%', height: '100px', width: '100px' }} /> </div>
                                                    <div className="col-md-8 col-sm-6">

                                                        <Field
                                                            value={props.values.full_name}
                                                            onKeyDown={handleEnter}
                                                            onChange={(e) => handleChange(e, props.setFieldValue)}
                                                            placeholder="Enter Your Full Name" name="full_name" type="text" className={` ${props.touched.full_name && props.errors.full_name ? `is-invalid` : `form-control`}`} />
                                                        <ErrorMessage name="full_name">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                    </div>
                                                    <div className="col-md-8 col-sm-12">
                                                        <Field
                                                            value={props.values.phone}
                                                            onKeyDown={handleEnter}
                                                            onChange={(e) => handleChange(e, props.setFieldValue)}
                                                            placeholder="Enter Your Mobile Number" name="phone" type="text" className={` ${props.touched.phone && props.errors.phone ? `is-invalid` : `form-control`}`} />
                                                        <ErrorMessage name="phone">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                    </div>
                                                    <div className="col-md-8 col-sm-12">
                                                        <input value={props.values.email} onKeyDown={handleEnter}
                                                            onChange={(e) => handleChange(e, props.setFieldValue)}
                                                            placeholder="Enter Your Email id"
                                                            name="email" type="text" className={` ${props.touched.email && props.errors.email ? `is-invalid` : `form-control`}`} />
                                                        <ErrorMessage name="email">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                    </div>
                                                    <div className="col-md-8 col-sm-12">
                                                        <input type="file" onKeyDown={handleEnter}
                                                            onChange={(e) => handleChange(e, props.setFieldValue)}
                                                            name="profile_pic" className={` ${props.touched.profile_pic && props.errors.profile_pic ? `is-invalid` : `form-control`}`} />
                                                        <ErrorMessage name="profile_pic">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                    </div>
                                                    <div className="col-md-8 col-sm-12">
                                                        <input value={props.values.password} onKeyDown={handleEnter}
                                                            placeholder="Create a strong Password"
                                                            onChange={(e) => handleChange(e, props.setFieldValue)}
                                                            name="password" type="text" className={` ${props.touched.password && props.errors.password ? `is-invalid` : `form-control`}`} />
                                                        <ErrorMessage name="password">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center mt-3'>
                                                <button type="submit" className="mt-1 bg-blue-600 w-32 p-1  ml-4" style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>Create Account</button>
                                            </div>

                                            <div className='d-flex justify-content-center'>
                                                <h6 className='text-blue-600 text-center mt-2'>Already have An Account?</h6>
                                                <button type="button" className='mt-1 text-blue-600   p-1   mb-2' style={{ fontSize: '15px', fontWeight: '600' }} onClick={() => {
                                                    setModal(false)
                                                    setModal1(true)
                                                    setError("")
                                                }}>Login</button>
                                            </div>
                                        </ModalBody>
                                    </Form>)
                                }
                            </Formik>
                        </div>
                    </div> :
                    <div className='grid grid-cols-12'>
                        <div className='col-span-5 bg-blue-600 text-white'>
                            <div className='p-5'>
                                <h5>Login</h5>
                                <h6 className='leading-6 text-gray-300 mt-4 text-start'>Get access to your<br />Orders, Wishlist and<br /> Recommendations</h6>
                                <div className=' mr-3 relative top-20 mb-5'>
                                    <Lottie
                                        options={defaultOptions}
                                    //    className="img-lottie"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='col-span-7'>
                            <CloseIcon className='relative float-right' style={{ fontSize: '40px', zIndex: '999' }} onClick={() => {
                                setModal1(!modal1)
                                setError("")
                            }
                            } />
                            <Formik initialValues={initialVal3} validationSchema={valSchema3} onSubmit={handleSubmit3}>
                                {
                                    (props) =>
                                    (<Form >
                                        {/* <ModalBody> */}
                                        <div className='relative top-20 h-100'>
                                            <div className="row d-flex justify-content-center   ">
                                                <div className="col-md-8 col-sm-12">
                                                    <Field
                                                        value={props.values.email}
                                                        onKeyDown={handleEnter}
                                                        onChange={(e) => handleChange3(e, props.setFieldValue)}
                                                        placeholder="Enter Your Email" name="email" type="text" className={` ${props.touched.email && props.errors.email ? `is-invalid` : `form-control`}`} />
                                                    <ErrorMessage name="email">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                </div>
                                                <div className="col-md-8 col-sm-12">
                                                    <input value={props.values.password} onKeyDown={handleEnter}
                                                        placeholder="Enter Your Password"
                                                        onChange={(e) => handleChange3(e, props.setFieldValue)}
                                                        name="password" type="text" className={` ${props.touched.password && props.errors.password ? `is-invalid` : `form-control`}`} />
                                                    {error ? <span className="errText">{error}</span> : <ErrorMessage name="password">{msg => <div className="errText">{msg}</div>}</ErrorMessage>}
                                                </div>

                                            </div>
                                            <div className='grid grid-cols-12'>
                                                <div className='col-span-7'></div>
                                                <div className='col-span-4' > <span className=' text-blue-600  mr-5 ' >Forgett Password?</span></div>
                                            </div>
                                            <div className='d-flex justify-content-center mt-3'>
                                                <button type="submit" className="mt-1 bg-blue-600 w-32 p-1  ml-4" style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>Login</button>
                                            </div>
                                            <div className='d-flex justify-content-center mt-5'>
                                                <h6 className='text-blue-600 text-center mt-2'>Don't have Account?</h6>
                                                <button type="button" className='mt-1 text-blue-600 p-1   ' style={{ fontSize: '15px', fontWeight: '600' }} onClick={() => setModal(true)}>Create Account</button>
                                            </div>
                                        </div>

                                        {/* </ModalBody> */}
                                    </Form>)
                                }
                            </Formik>
                        </div>
                    </div>

                }
            </Modal>
            <Modal
                isOpen={modal2}
                toggle={() => setModal2(false)}
                backdrop={true}
                keyboard={false}
            >
                {/* <ModalHeader toggle={() => setModal2(false)} ><b style={{ position: 'relative', left: '140px' }}>Add A Product</b></ModalHeader> */}
                <Formik initialValues={initialVal2} validationSchema={valSchema2} onSubmit={handleSubmit2} >
                    {
                        (props) =>
                        (<Form >
                            <ModalBody>
                                <div>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-8 col-sm-12">
                                            <Field
                                                value={props.values.item_name}
                                                onKeyDown={handleEnter}
                                                onChange={(e) => handleChange2(e, props.setFieldValue)}
                                                placeholder="Enter Item Name" name="item_name" type="text" className={` ${props.touched.item_name && props.errors.item_name ? `is-invalid` : `form-control`}`} />
                                            <ErrorMessage name="item_name">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className="col-md-8 col-sm-12">
                                            <Field
                                                value={props.values.original_price}
                                                onKeyDown={handleEnter}
                                                onChange={(e) => handleChange2(e, props.setFieldValue)}
                                                placeholder="Enter Item Original Price" name="original_price" type="text" className={` ${props.touched.original_price && props.errors.original_price ? `is-invalid` : `form-control`}`} />
                                            <ErrorMessage name="original_price">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className="col-md-8 col-sm-12">
                                            <Field
                                                value={props.values.price}
                                                onKeyDown={handleEnter}
                                                onChange={(e) => handleChange2(e, props.setFieldValue)}
                                                placeholder="Enter Item Price" name="price" type="text" className={` ${props.touched.price && props.errors.price ? `is-invalid` : `form-control`}`} />
                                            <ErrorMessage name="price">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className="col-md-8 col-sm-12">
                                            <div className='d-flex'>{sizeArray.map((item) => <div className='size'><p>{item}</p><CloseIcon className='close' onClick={() => setSizeArray(sizeArray.filter(item1 => item1 != item))} /></div>)}</div>
                                            <select
                                                onKeyDown={handleEnter}
                                                onChange={(e) => handleChange2(e, props.setFieldValue)}
                                                placeholder="Enter Item name" name="size" type="text" className={` ${props.touched.size && props.errors.size ? `is-invalid` : `form-control`}`} >
                                                <option >Select Size</option>
                                                <option>S</option>
                                                <option>XS</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>M</option>
                                                <option>XL</option>
                                                <option>XXL</option>
                                            </select>
                                            <ErrorMessage name="size">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className="col-md-8 col-sm-12">
                                            <select
                                                value={props.values.free_deliver}
                                                onKeyDown={handleEnter}
                                                onChange={(e) => handleChange2(e, props.setFieldValue)}
                                                placeholder="Enter Item Is Free deliver" name="free_deliver" type="text" className={` ${props.touched.free_deliver && props.errors.free_deliver ? `is-invalid` : `form-control`}`} >
                                                <option>Select Free</option>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </select>
                                            <ErrorMessage name="free_deliver">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div className="col-md-8 col-sm-12">
                                            <input onKeyDown={handleEnter}
                                                placeholder="Enter Your Item Photo"
                                                onChange={(e) => handleChange2(e, props.setFieldValue)}
                                                name="item_photo" type="file" className={` ${props.touched.item_photo && props.errors.item_photo ? `is-invalid` : `form-control`}`} />
                                            <ErrorMessage name="item_photo">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", position: 'relative', left: '170px' }}>Submit</Button>
                                </div>
                            </ModalBody>
                        </Form>)
                    }
                </Formik>
            </Modal>

            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />

        </>
    )
}
