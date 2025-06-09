import React, { useState } from 'react'
import {
    Search, PersonOutline, ShoppingCartOutlined, ExpandMore, ExpandLess, StoreOutlined, MoreVert, FavoriteBorder, RedeemOutlined, PaymentOutlined,
    StarBorder, NotificationsOutlined, HeadsetMicOutlined, TrendingUp, SaveAlt,
    Menu, PowerSettingsNew
} from "@material-ui/icons";
import './styles.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderMenu from '../../section-component/HeaderMenu';
import { logOutUserAction } from '../../entities/auth-reducer';
import swal from 'sweetalert'

export default function UserNavbar() {
    const [openLoginMenu, setOpenLoginMenu] = useState(false)
    const [openLoginMenu2, setOpenLoginMenu2] = useState(false)
    const { pathname } = useLocation()
    const isHome = pathname === "/"
    const seller = pathname === "/become-a-seller"
    const authPage = !pathname.includes('/account')
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        const onSuccess = () => {
            localStorage.removeItem("userId")
            navigate('/')
            swal('Logout SuccessFully')
        }
        dispatch(logOutUserAction(user?._id, onSuccess))
    }

    return (
        <>
            {!seller && <div className={isHome ? "bg-white navbar" : "bg-[blue] navbar"}>
                <div className='navbar-container '>
                    {!authPage ?? <Menu className='!block md:!hidden' />}
                    <Link to="/"> <img src={isHome ? "https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" : "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"} className={isHome ? "mr-10" : 'ml-[200px] max-w-[100px] h-[25px]'} /></Link>
                    <div className={isHome ? "bg-[#f0f5ff] rounded-[10px] navbar-search !hidden md:!flex" : "navbar-search bg-white rounded-[5px]"}>
                        <Search className="navbar-search-icon"
                        />
                        <input
                            className={isHome ? 'bg-[#f0f5ff]' : 'bg-white'}
                            placeholder="Search For Products,Brands,and More"
                        />
                    </div>
                    <div className='relative user-profile ' onMouseEnter={() => setOpenLoginMenu(true)}
                        onMouseLeave={() => setOpenLoginMenu(false)}>
                        <Link to={user?.is_logged_in ? "userProfile" : "/account?login=true"}
                            className='navbar-button'
                        >
                            <div className={`${isHome ? 'hover:bg-[blue] hover:text-white text-black p-2 hover:rounded-[10px]' : 'hover:text-blue text-blue p-1'} flex items-center `}>
                                {isHome && <PersonOutline className='mr-2' />}
                                {user?.is_logged_in ? "My Profile" : "Login"}
                                {isHome && <>{!openLoginMenu ? <ExpandMore className='!hidden md:!block' /> : <ExpandLess className='!hidden md:!block' />}</>}</div>
                        </Link>
                        {openLoginMenu && <div className="user-profile text-nowrap text-black shadow-lg absolute top-10 p-1 bg-white">
                            <div className='flex justify-between p-2 gap-5 border-b-[1px] hover:bg-gray-50'  ><div>New customer?</div><div className='text-[blue]'>Sign Up</div></div>
                            <Link to="/userProfile" className='flex justify-between p-2 hover:bg-gray-50'><PersonOutline />My Profile</Link>
                            <Link to='/plus' className='flex justify-between p-2 hover:bg-gray-50 text-black'><StarBorder />Flipecart Plus Zone</Link>
                            <div className='flex justify-between p-2 hover:bg-gray-50'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 128 128">
                                <path d="M63,14.2l-48,17c-1.2,0.4-2,1.6-2,2.8v60c0,1.3,0.8,2.4,2,2.8l48,17c0.3,0.1,0.7,0.2,1,0.2c0.2,0,0.3,0,0.5,0 c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V34c0,0,0-0.1,0-0.1c0-0.1,0-0.3,0-0.4 c0,0,0-0.1,0-0.1c-0.2-1-0.9-1.9-1.9-2.2l-24-8.5c0,0-0.1,0-0.1,0c-0.6-0.2-1.4-0.3-2.1,0L40,39.2c-1.2,0.4-2,1.6-2,2.8v11 c0,1.7,1.3,3,3,3s3-1.3,3-3v-8.9l43.8-15.5L103,34L63,48.2c-1.2,0.4-2,1.5-2,2.8c0,0,0,0,0,0.1v55.8L19,91.9V36.1l46-16.3 c1.6-0.6,2.4-2.3,1.8-3.8C66.3,14.4,64.6,13.6,63,14.2z M67,53.1l42-14.9v53.6l-42,14.9V53.1z"></path>
                            </svg>Orders</div>
                            <Link to='/wishlist' className='flex  justify-between p-2 hover:bg-gray-50'><FavoriteBorder />WishList</Link>
                            <div className='flex justify-between p-2 hover:bg-gray-50'><RedeemOutlined /> Rewards</div>
                            <Link to="/gift-cards-store" className='flex justify-between p-2 hover:bg-gray-50 text-black'><PaymentOutlined />Gift Cards</Link>
                        </div>}
                    </div>
                    <Link to={"/cart"} className={isHome ? "text-black relative" : "text-white relative"}>
                        <div className='flex gap-2'><ShoppingCartOutlined
                        />
                            <b
                                className='hidden md:block'>
                                Cart
                            </b></div>
                        {user?.cart?.length > 0 && <h6 className={`${isHome ? 'text-[white] bg-[blue]' : 'text-[blue] bg-white'} absolute bottom-[7px]  h-5 w-5 rounded-full`}>{user?.cart?.length}</h6>}
                    </Link>
                    <Link to={"/become-a-seller"} className={isHome ? "text-black !hidden md:!block" : "text-white !hidden md:!block"}> <StoreOutlined /> Become a Seller</Link>
                    <div className='flex gap-3'>
                        <MoreVert className={isHome ? "text-black ml-10 !hidden md:!block cursor-pointer" : "text-white !hidden md:!block ml-10 cursor-pointer"} onMouseEnter={() => setOpenLoginMenu2(true)}
                            onMouseLeave={() => setOpenLoginMenu2(false)} />
                        {openLoginMenu2 && <div className="z-[99] text-nowrap text-black shadow-lg absolute top-10 right-5 p-1 bg-white">
                            <div className='flex justify-between p-2 hover:bg-gray-50 cursor-pointer'><NotificationsOutlined />Notification Preferences</div>
                            <div className='flex justify-between p-2 hover:bg-gray-50 cursor-pointer'><HeadsetMicOutlined />24X7 Customer Care</div>
                            <div className='flex justify-between p-2 hover:bg-gray-50 cursor-pointer'><TrendingUp />Advertise</div>
                            <div className='flex justify-between p-2 hover:bg-gray-50 cursor-pointer'><SaveAlt />Download App</div>
                        </div>}
                        {user?.is_logged_in && <PowerSettingsNew className='hover:text-[black] text-black cursor-pointer' onClick={handleLogout} />}
                    </div>
                </div >
            </div >}
            <HeaderMenu />
        </>

    )
}
