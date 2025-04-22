import React, { useState } from 'react'
import {
    Search, PersonOutline, ShoppingCartOutlined, ExpandMore, ExpandLess, StoreOutlined, MoreVert, FavoriteBorder, RedeemOutlined, PaymentOutlined,
    StarBorder, NotificationsOutlined, HeadsetMicOutlined, TrendingUp, SaveAlt
} from "@material-ui/icons";
import './styles.scss'
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [openLoginMenu, setOpenLoginMenu] = useState(false)
    const [openLoginMenu2, setOpenLoginMenu2] = useState(false)

    return (
        <div className="navbar  bg-[white]">
            <div className='navbar-container'>
                <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" className='mr-10' />
                <div className="navbar-search">
                    <Search className="navbar-search-icon"
                    />
                    <input
                        placeholder="Search For Products,Brands,and More"
                    />
                </div>
                <Link to="/account?login=true"
                    className='navbar-button relative' onMouseOver={() => setOpenLoginMenu(true)} onMouseLeave={() => setOpenLoginMenu(false)}
                >
                    <div className='hover:bg-[blue] hover:text-white p-2 flex items-center hover:rounded-[10px]'> <PersonOutline className='mr-2' />
                        Login
                        {!openLoginMenu ? <ExpandMore /> : <ExpandLess />}</div>
                    {openLoginMenu && <div className="z-[99] text-nowrap text-black shadow-lg absolute top-10 p-1 bg-white">
                        <div className='flex justify-between p-2 gap-5 border-b-[1px] hover:bg-gray-50'><div>New customer?</div><div className='text-[blue]'>Sign Up</div></div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><PersonOutline />My Profile</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><StarBorder />Flipecart Plus Zone</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 128 128">
                            <path d="M63,14.2l-48,17c-1.2,0.4-2,1.6-2,2.8v60c0,1.3,0.8,2.4,2,2.8l48,17c0.3,0.1,0.7,0.2,1,0.2c0.2,0,0.3,0,0.5,0 c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V34c0,0,0-0.1,0-0.1c0-0.1,0-0.3,0-0.4 c0,0,0-0.1,0-0.1c-0.2-1-0.9-1.9-1.9-2.2l-24-8.5c0,0-0.1,0-0.1,0c-0.6-0.2-1.4-0.3-2.1,0L40,39.2c-1.2,0.4-2,1.6-2,2.8v11 c0,1.7,1.3,3,3,3s3-1.3,3-3v-8.9l43.8-15.5L103,34L63,48.2c-1.2,0.4-2,1.5-2,2.8c0,0,0,0,0,0.1v55.8L19,91.9V36.1l46-16.3 c1.6-0.6,2.4-2.3,1.8-3.8C66.3,14.4,64.6,13.6,63,14.2z M67,53.1l42-14.9v53.6l-42,14.9V53.1z"></path>
                        </svg>Orders</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><FavoriteBorder />WishList</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><RedeemOutlined /> Rewards</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><PaymentOutlined />Gift Cards</div>
                    </div>}
                </Link>
                <div className="navbar-cart">
                    <ShoppingCartOutlined
                    />
                    <b
                    >
                        Cart
                    </b>
                </div>
                {/* <NotificationsOutlined className='navbar-notification'
                /> */}
                <div className='flex gap-2'> <StoreOutlined /> Become a Seller</div>
                <div >
                    <MoreVert onMouseOver={() => setOpenLoginMenu2(true)} onMouseLeave={() => setOpenLoginMenu2(false)} className='ml-10' />
                    {openLoginMenu2 && <div className="z-[99] text-nowrap text-black shadow-lg absolute top-10 right-5 p-1 bg-white">
                        <div className='flex justify-between p-2 hover:bg-gray-50'><NotificationsOutlined />Notification Preferences</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><HeadsetMicOutlined />24X7 Customer Care</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><TrendingUp />Advertise</div>
                        <div className='flex justify-between p-2 hover:bg-gray-50'><SaveAlt />Download App</div>
                    </div>}
                </div>
            </div>
        </div >

    )
}
