import { CheckBox, Search } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'

function FilterBox() {
    return (
        <>
            <h5>Filter</h5>
            <h6>ORDER STATUS</h6>
            <div><CheckBox /><span>On the Way</span></div>
            <div><CheckBox /><span>Delivered</span></div>
            <div><CheckBox /><span>Cancelled</span></div>
            <div><CheckBox /><span>Returned</span></div>
            <h6>Order Time</h6>
            <div><CheckBox /><span>Last 30 days</span></div>
            <div><CheckBox /><span>2024</span></div>
            <div><CheckBox /><span>2023</span></div>
            <div><CheckBox /><span>2020</span></div>
            <div><CheckBox /><span>2021</span></div>
            <div><CheckBox /><span>Older</span></div>
        </>

    )
}

export default function MyOrders() {
    const { user } = useSelector((state) => state.auth)
    const is_have_Items = user?.is_logged_in && user?.orders?.length > 0
    return (
        <div className='flex gap-5'>
            <FilterBox />
            <div>
                <div className={"navbar-search bg-white rounded-[5px]"}>
                    <Search className="navbar-search-icon"
                    />
                    <input
                        className={isHome ? 'bg-[#f0f5ff]' : 'bg-white'}
                        placeholder="Search For Products,Brands,and More"
                    />
                </div>
                <div className=" flex justify-center " >  <img src="https://rukminim2.flixcart.com/www/400/400/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" /></div>
                <div>
                    <p>{!user?.is_logged_in ? 'Login for the see your orders' : "You have no orders"}</p>
                    <button onClick={handleCart} className="bg-[#fb641b] text-white p-2 w-[12%]">{is_have_Items ? 'Addd more items' : "Start Shopping"}</button></div>
            </div>
        </div>
    )
}
