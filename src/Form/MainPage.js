import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import swal from 'sweetalert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Footer from './Footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


export default function MainPage() {

    const FormData = useSelector((state) => state.FormDataReducer);
    const history = useNavigate()
    const dispatch = useDispatch();
    const [Isopen1, setIsopen1] = useState(false)
    const [Isopen2, setIsopen2] = useState(false)
    const [Isopen3, setIsopen3] = useState(false)
    const [Isopen4, setIsopen4] = useState(false)
    const [Isopen5, setIsopen5] = useState(false)
    const [Isopen6, setIsopen6] = useState(false)
    const [Isopen7, setIsopen7] = useState(false)
    const [Isopen8, setIsopen8] = useState(false)
    const [Isopen9, setIsopen9] = useState(false)
    const [Isopen10, setIsopen10] = useState(false)
    const [Isopen11, setIsopen11] = useState(false)
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        getAllProduct()
    }, [])
    const getAllProduct = async () => {
        const result = await axios.get('http://localhost:5000/api/e-commerce/')
        setItemList(result.data.data)
        console.log(result, 'get all data')
    }
    function handleFileChange(e, setFieldValue) {
        setFieldValue(e.target.name, URL.createObjectURL(e.target.files[0]))
    }

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 8
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    const responsive1 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    var initialVal = {
        role_no: "",
        first_name: "",
        last_name: "",
        photo: "",
        subject: "",
        gender: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
    }

    var valSchema = yup.object().shape({
        role_no: yup.string().required('role_no is Required'),
        first_name: yup.string().required('Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        last_name: yup.string().required('Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        photo: yup.string().required('photo is Required!'),
        subject: yup.string().required('subject is Required'),
        gender: yup.string().required('Gender is Required'),
        pincode: yup.string().required('pincode is Required'),
        city: yup.string().required('city is Required'),
        country: yup.string().required('country is Required'),
        state: yup.string().required('state is Required'),
    });

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const handleChange = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
    }

    const handleSubmit = (values) => {
        dispatch({ type: 'Add_Data', payload: values })
        swal({
            title: "Success",
            text: "SuccessFully Added",
            icon: "success",
            button: "Okay",
        })
        history('/')
    }
    return (
        <>
            <div className='grid grid-cols-12'>
                <div className='lg:col-span-2 xs:col-span-0 side-box lg:ml-5 mt-3  p-2 lg:block md:block  xs:hidden'>
                    <div className='d-flex justify-content-between w-100 mt-3 bg-blue-600   '><h5 className='text-white p-2 '>All Categories</h5></div>
                    <div className='d-flex justify-content-between w-100  sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen1(!Isopen1)}> <span>Women's Fashion</span>
                        {Isopen1 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}
                    </div>
                    {Isopen1 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-1 ' ><span>Clothing</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Western Wear</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Ethnic Wear</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Top Brands</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Lingere & nightwear</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Watches</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Handbags & Clutches</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Jwellery</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Subglasses</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Shoes</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1 mb-3'><span>Fashion Sandles</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen2(!Isopen2)}><span>Men's Fashion</span> {Isopen2 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen2 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-1 ' ><span>Clothing</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Tshirt & Polos</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Shirts</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Jeans</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Inner Wear</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Watches</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>bags & luggage</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Wallet</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Subglasses</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Shoes</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1 mb-3'><span>Causaul Shoes</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen3(!Isopen3)}><span>Home,Kitchen,Pets</span> {Isopen3 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen3 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-1 ' ><span>Explore Showroom</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Kitchen & Dining</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Kitchen Storage & Contsiners</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Furniture</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Home Decor</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Indoor Lighting</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Garden & Outdoors</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Swing And Craft Supplies</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Home Improvement</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>All Home & Kithen</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen4(!Isopen4)}> <span>Mobiles,Computers</span> {Isopen4 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen4 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-1 ' ><span>All Mobile Phones</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>All Mobile Accessories</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Cases & Covers</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Screen Protectors</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Power Banks</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Tablets</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Laptops</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Drivers And Storage</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Printer & Ink</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Computer Accessories</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1 mb-3'><span>All Electronics</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen5(!Isopen5)}> <span>TV,Appliances,Electronics</span> {Isopen5 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen5 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-1 ' ><span>Televisions</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Home Entertainment Systems</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>HeadPhones</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Speakers</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Home Audio & Theater</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Cameras</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>DSLR Cameras</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Air Conditioners</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Refrigerators</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Washing Machine</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1 mb-3'><span>Security Cameras</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen6(!Isopen6)}><span>Beauty,Health,Grocery</span> {Isopen6 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen6 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-1 ' ><span>Beauty & Grooming</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Luxury Beauty</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Make-up</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Health & Personal Care</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Household Supplies</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Diet & Nutrition</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen7(!Isopen7)}> <span>Sports,Fitness,Bags</span> {Isopen7 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen7 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-1 ' ><span>Crickets</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Badminton</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Cycling</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Football</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Running</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Camping & Hiking</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'> <span>Fitness Accessories</span></div>
                        <div className='d-flex justify-content-between w-100 mt-1'><span>Yoga</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen8(!Isopen8)}><span>Toys,Kid's Fashion</span> {Isopen8 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen8 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 nt-1 ' ><span>Toys & Games</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'><span>Baby Products</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'><span>Diapers</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'> <span>Toys Gifting Store</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'> <span>Baby Bath,Skin & Grooming</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'><span>Strollers & Prams</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'> <span>Nursing $ Feeding</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'><span>Kid's Clothing</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'><span>Kid's Shoes</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1'> <span>Kid's Watches</span></div>
                        <div className='d-flex justify-content-between w-100 nt-1 '><span>School Bags</span></div>
                    </div> : ""}
                    <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen9(!Isopen9)}><span>Car,Motorbike,Industrial</span> {Isopen9 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                    {Isopen9 ? <div className='ml-2'>
                        <div className='d-flex justify-content-between w-100 mt-3 ' ><span>MotorBike Accessories & Parts</span></div>
                        <div className='d-flex justify-content-between w-100 mt-3'><span>Car Accessories</span></div>
                        <div className='d-flex justify-content-between w-100 mt-3'><span>Car Electronics</span></div>
                        <div className='d-flex justify-content-between w-100 mt-3'> <span>Car Parts</span></div>
                        <div className='d-flex justify-content-between w-100 mt-3'> <span>Car & Bike Care</span></div>
                        <div className='d-flex justify-content-between w-100 mt-3'><span>All Car & MotorBike Products</span></div>
                    </div> : ""}
                    <div className='mb-3'>
                        <div className='d-flex justify-content-between w-100 sm-div p-2 bg-gray-300 mt-2' onClick={() => setIsopen10(!Isopen10)}> <span>Books</span> {Isopen10 ? <KeyboardArrowDownIcon style={{ color: 'gray', fontSize: '30px' }} /> : <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '20px' }} />}</div>
                        {Isopen10 ? <div className='ml-2'>
                            <div className='d-flex justify-content-between w-100 mt-1 ' ><span>All Books</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'><span>Fiction Books</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'><span>Editor's Corner</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'> <span>School Textbooks</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'> <span>Children's Books</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'><span>Exam Central</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'> <span>Textbooks</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'><span>Indian Language Books</span></div>
                            <div className='d-flex justify-content-between w-100 mt-1'><span>Kindle ebooks</span></div>
                        </div> : ""}
                    </div>
                </div>
                <div className='lg:col-span-8  main-page mt-3  lg:ml-3  xs:col-span-12'>
                    <div >
                        <Carousel responsive={responsive1} interval={7000} className='mt-2' height={600} width={850} swipeable={true} infiniteLoop={true} autoPlay={true} dynamicHeight={true}>
                            <div>
                                <img className="ml-2 mt-1 sm:w-75 sm:h-50 xs:50" style={{ height: '470px', width: '970px' }} src="https://img2.thejournal.ie/article/3830479/river?version=3830715&width=1340" />
                            </div>
                            <div>
                                <img style={{ height: '470px', width: '970px' }} className="ml-2 mt-1" src="https://www.techprevue.com/wp-content/uploads/2015/01/reason-to-prefer-online-shopping.jpg" />
                            </div>
                            <div>
                                <img style={{ height: '470px', width: '970px' }} className="ml-2 mt-1" src="https://static.timesofisrael.com/www/uploads/2017/11/shopping-cart-cropped.jpg" />
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className=' lg:col-span-2  xs:col-span-6 ml-3 mt-3 h-100 mr-5 lg:block md:block xs:hidden '>
                    <div className='box h-40'>  <img style={{ height: '159px', width: '214px' }} className="p-1 " src="https://th.bing.com/th/id/R.0f2741e83552feef6ccfe56f4bd8e438?rik=RlT3lqaAYH1p9Q&riu=http%3a%2f%2fwww.annelibush.com%2fwp-content%2fuploads%2f2016%2f07%2fcocktails-2-1-768x512.jpg&ehk=PnBpxu4lbXsRoLQwFAGB2dB4%2f9yAfwYay5trPXchnUg%3d&risl=&pid=ImgRaw&r=0" /></div>
                    <div className='box mt-2 h-40'>  <img style={{ height: '159px', width: '214px' }} className="p-1  " src="https://images-na.ssl-images-amazon.com/images/I/8118ZfaYYlL._AC_UL1500_.jpg" /></div>
                    <div className='box mt-2 h-40'>  <img style={{ height: '159px', width: '214px' }} className="p-1  " src="https://th.bing.com/th/id/OIP.y21E373yCnZ2ackw3YgMJAHaFj?pid=ImgDet&rs=1" /></div>
                </div>
            </div>
            <div >
                <Carousel className='grid lg:grid-cols-10 xs:grid-cols-12 ml-1  mt-3 mr-7'
                    swipeable={true}
                    arrows={true}
                    responsive={responsive}
                // removeArrowOnDeviceType={[ "mobile"]}
                >
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box h-48 xs:ml-2 '>
                        <b>Wedding</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://i.pinimg.com/originals/9a/fa/ea/9afaea6b7539a40de7a913c97b7e7885.jpg" />
                    </div>
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box xs:ml-2'>
                        <b>Clothing</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://th.bing.com/th/id/OIP.bKG47DkefFg9ifOTaPtHtgHaHa?pid=ImgDet&rs=1" />
                    </div>
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box xs:ml-2 '>
                        <b>Jwellery</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://th.bing.com/th/id/OIP.bZDIkWve00HnFijBwPBtCwHaIZ?pid=ImgDet&rs=1" />
                    </div>
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box xs:ml-2 '>
                        <b>Gifts</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://th.bing.com/th/id/R.9c766108d0e21ca6ff62c12ee99422be?rik=UwFOQ9WeCPB6nQ&riu=http%3a%2f%2fveipd.org%2fearlyintervention%2fwp-content%2fuploads%2f2015%2f12%2fgift.jpg&ehk=u51aXlmwKwcpKG0LhHzLCvjM2LU4VUZ4g%2fHgwhugA30%3d&risl=&pid=ImgRaw&r=0" />
                    </div>
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box xs:ml-2 '>
                        <b>Foot Wears</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://th.bing.com/th/id/OIP.9U_rYsBX-4bM4ligWUriIQHaHa?pid=ImgDet&rs=1" />
                    </div>
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box xs:ml-2 '>
                        <b>Baby Wears</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://th.bing.com/th/id/OIP.r1tWDLO7aMtmel73p1qgeAHaHa?pid=ImgDet&rs=1" />
                    </div>
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box xs:ml-2 '>
                        <b>Purse</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://th.bing.com/th/id/OIP.S4yb5ssFyMIFdZxB8IRElgHaHa?pid=ImgDet&rs=1" />
                    </div>
                    <div className='lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box xs:ml-2 '>
                        <b>Makeup</b>
                        <img style={{ height: '166px', width: '182px' }} className=" p-2" src="https://th.bing.com/th/id/OIP.y21E373yCnZ2ackw3YgMJAHaFj?pid=ImgDet&rs=1" />
                    </div>
                </Carousel>
            </div>
            <div >
                <Carousel className='grid lg:grid-cols-10 xs:grid-cols-12 ml-1  mt-3 mr-7'
                    swipeable={true}
                    arrows={true}
                    responsive={responsive}
                // removeArrowOnDeviceType={[ "mobile"]}
                >
                    {itemList.map((item) => (
                        <div className='lg:col-auto xs:col-span-6 box xs:ml-2 xs:mt-2'>
                            <img style={{ height: '166px', width: '182px' }} className=" p-2" src={item.item_photo} />
                            <h6 style={{ lineHeight: '0px' }}>{item.item_name}</h6>
                            <b className='priceO' style={{ lineHeight: '0px' }}>Rs.{item.original_price}</b>
                            <h5 style={{ fontSize: '15px' }}>Rs.{item.price}</h5>
                        </div>
                    ))}
                </Carousel>
            </div>
            <Footer />
        </>

    )
}
