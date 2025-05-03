import React, { useState } from 'react'
import './style.scss'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

export default function ProductTopMenu() {
    const [openTopMenu, setopenTopMenu] = useState(false)
    const [openTopMenu2, setopenTopMenu2] = useState(false)
    const [openTopMenu3, setopenTopMenu3] = useState(false)
    const [openTopMenu4, setopenTopMenu4] = useState(false)
    const [openTopMenu5, setopenTopMenu5] = useState(false)

    return (
        <div className='top-header-product mb-3'>
            <div className='top-header-product-box'>
                <span className='top-header-product-lable'>
                    <span>Electric</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <span className='top-header-product-lable'>
                    <span>Tv's & Appliances</span>
                </span>
            </div>
            <div className='top-header-product-box' onMouseOver={() => setopenTopMenu(true)} onMouseLeave={() => setopenTopMenu(false)}>
                <span className='top-header-product-lable'>
                    <span>Men</span>
                    {!openTopMenu ? <ExpandMore /> : <ExpandLess />}
                </span>
                {openTopMenu && <div className="z-[99]  rounded-[10px] text-nowrap text-black shadow-lg absolute top-15 p-1 bg-white">
                    <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >Men's Top Wear</div></div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Men's Bottom Wear</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Men's Ethnic</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Men FootWear</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Women FootWear</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Watches & Accessries</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Women Westurn</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Bags,SuiteCase & Luggage</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Kids</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Essentieals</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Winter</div>
                </div>}
            </div>
            <div className='top-header-product-box' onMouseOver={() => setopenTopMenu2(true)} onMouseLeave={() => setopenTopMenu2(false)}>

                <span className='top-header-product-lable'>
                    <span>Women</span>
                    {!openTopMenu2 ? <ExpandMore /> : <ExpandLess />}
                </span>
                {openTopMenu2 && <div className="z-[99] text-nowrap  rounded-[10px] text-black shadow-lg absolute top-15 p-1 bg-white">
                    <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >Audio</div></div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Electronics CST Store</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Camera's & Accessries</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Computer Perpherials</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Gaming</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Health & Personal care</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Laptop Accessries</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Laptop & Desktop</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Mobile Accessries</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Power Bank</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Smart Home Automation</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Smart Wearable</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Storage </div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Tablets</div>
                </div>}
            </div>
            <div className='top-header-product-box' onMouseOver={() => setopenTopMenu3(true)} onMouseLeave={() => setopenTopMenu3(false)}>
                <span className='top-header-product-lable'>
                    <span>Baby & Kids</span>
                    {!openTopMenu3 ? <ExpandMore /> : <ExpandLess />}
                </span>
                {openTopMenu3 && <div className="z-[99] text-nowrap  rounded-[10px] text-black shadow-lg absolute top-15 p-1 bg-white">
                    <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >Home Furnishings</div></div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Furnitures</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Living Room Furniture</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Kitchen & Dining</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Bedroom Furniture</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Space Saving furnitures</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Home Decore</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Tools & Utility</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Work Space furtniture</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Kids Furniture</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Lighting & Electricals</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Clining & Bath</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Pet & garding</div>
                </div>}
            </div>
            <div className='top-header-product-box' >
                <span className='top-header-product-lable'>
                    <span>Home & Furniture</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <span className='top-header-product-lable'>
                    <span>Sport,Books & More</span>
                </span>
            </div>
            <div className='top-header-product-box' onMouseOver={() => setopenTopMenu4(true)} onMouseLeave={() => setopenTopMenu4(false)}>
                <span className='top-header-product-lable'>
                    <span>Flight</span>
                </span>
                {openTopMenu4 && <div className="z-[99] text-nowrap text-black  rounded-[10px] shadow-lg absolute top-15 p-1 bg-white">
                    <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >Beauty & Personal Care</div></div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Men's Grooming</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Food & Drinks</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Nutration & Health Care</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Baby Care</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Toys & School Supplies</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Sports & fitness</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Books & Music</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Music</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>stationary & Office Supplies</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Auto Accessries</div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Safty & Hygien Esse</div>
                </div>}
            </div>
            <div className='top-header-product-box' onMouseOver={() => setopenTopMenu5(true)} onMouseLeave={() => setopenTopMenu5(false)}>
                <span className='top-header-product-lable'>
                    <span>Offer Zone</span>
                </span>
                {openTopMenu5 && <div className="z-[99] text-nowrap rounded-[10px] text-black shadow-lg absolute top-15 p-1 bg-white">
                    <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >Petrol vehical</div></div>
                    <div className='flex justify-between p-2 hover:bg-gray-50'>Electric vehical</div>
                </div>}
            </div>
        </div>
    )
}
