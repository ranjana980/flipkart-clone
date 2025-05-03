import React, { useState } from 'react'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

export default function SellerTopMenu() {
    const [openTopMenu, setopenTopMenu] = useState(false)
    const [openTopMenu2, setopenTopMenu2] = useState(false)
    const [openTopMenu3, setopenTopMenu3] = useState(false)
    const [openTopMenu4, setopenTopMenu4] = useState(false)

    return (
        <div className='bg-white'>
            <div className='text-start px-5 py-3 border-b border-[lightgrey] '> Existing Seller? Explore our product recommendations with Dhamaka Selection</div>
            <div className='flex justify-between  px-5'>
                <div className='mb-3 flex item-center'>
                    <img src="https://static-assets-web.flixcart.com/fk-sp-static/images/flipkart_logo_color_revamp.svg" />
                    <div className='top-header-product-box' onMouseOver={() => setopenTopMenu(true)} onMouseLeave={() => setopenTopMenu(false)}>
                        <span >
                            <span>Sell Online</span>
                            {!openTopMenu ? <ExpandMore /> : <ExpandLess />}
                            {openTopMenu && <div className="z-[99]  rounded-[10px] text-nowrap text-black shadow-lg absolute top-15 p-1 bg-white">
                                <div className='flex justify-between p-2 gap-5  '>Create Account
                                </div>
                                <div className='flex justify-between p-2 '>
                                    List Products
                                </div>
                                <div className='flex justify-between p-2 '>
                                    Storage & Shipping
                                </div>
                                <div className='flex justify-between p-2 '>
                                    Recieve Payments
                                </div>
                                <div className='flex justify-between p-2 '>
                                    Grow Faster
                                </div>
                                <div className='flex justify-between p-2 '>
                                    Seller App
                                </div>
                                <div className='flex justify-between p-2 '>
                                    Help & SupportBags,SuiteCase & Luggage</div>
                            </div>}
                        </span>
                    </div>
                    <div className='top-header-product-box' onMouseOver={() => setopenTopMenu2(true)} onMouseLeave={() => setopenTopMenu2(false)}>
                        <span >
                            <span>Fees And Commisson</span>
                            {!openTopMenu2 ? <ExpandMore /> : <ExpandLess />}
                            {openTopMenu2 && <div className="z-[99]  rounded-[10px] text-nowrap text-black shadow-lg absolute top-15 p-1 bg-white">
                                <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >Payment Cycle</div></div>
                                <div className='flex justify-between p-2 hover:bg-gray-50'>Fee Type</div>
                                <div className='flex justify-between p-2 hover:bg-gray-50'>Calculate Gross Margin</div>
                            </div>}
                        </span>
                    </div>
                    <div className='top-header-product-box' onMouseOver={() => setopenTopMenu3(true)} onMouseLeave={() => setopenTopMenu3(false)}>
                        <span >
                            <span>Grow</span>
                            {!openTopMenu3 ? <ExpandMore /> : <ExpandLess />}
                            {openTopMenu3 && <div className="z-[99]  rounded-[10px] text-nowrap text-black shadow-lg absolute top-15 p-1 bg-white">
                                <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >FAssured badge</div></div>
                                <div className='flex justify-between p-2 hover:bg-gray-50'>Insights & Tools</div>
                                <div className='flex justify-between p-2 hover:bg-gray-50'>Flipkart Ads</div>
                                <div className='flex justify-between p-2 hover:bg-gray-50'>Flipkart Value Services</div>
                                <div className='flex justify-between p-2 hover:bg-gray-50'>Shopping Festivals</div>
                                <div className='flex justify-between p-2 hover:bg-gray-50'>Service Partners</div>
                            </div>}
                        </span>
                    </div>
                    <div className='top-header-product-box' onMouseOver={() => setopenTopMenu4(true)} onMouseLeave={() => setopenTopMenu4(false)}>
                        <span >
                            <span>Learn</span>
                            {!openTopMenu4 ? <ExpandMore /> : <ExpandLess />}
                        </span>
                        {openTopMenu4 && <div className="z-[99] text-nowrap  rounded-[10px] text-black shadow-lg absolute top-15 p-1 bg-white">
                            <div className='flex justify-between p-2 gap-5  hover:bg-gray-50'><div >FAQs</div></div>
                            <div className='flex justify-between p-2 hover:bg-gray-50'>Seller Success Stories</div>
                            <div className='flex justify-between p-2 hover:bg-gray-50'>Seller Blogs</div>
                        </div>}
                    </div>
                    <div className='top-header-product-box'>
                        <span>
                            <span>Shopsy</span>
                        </span>
                    </div>
                </div>
                <div className='flex gap-5 item-center '>
                    <button>Login</button>
                    <button className='bg-[orange] px-4'>Start Selling</button>
                </div>
            </div >
        </div>

    )
}
