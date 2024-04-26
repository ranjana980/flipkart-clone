import React from 'react'
import grocery from "../assests/images/top-grocery.png"
import Phone from "../assests/images/top-phone.png"
import fashion from "../assests/images/top-fashion.png"
import electronic from "../assests/images/top-electronic.png"
import furnitures from "../assests/images/top-home-furnitures.jpg"
import apliences from "../assests/images/top-apliences.jpg"
import travel from "../assests/images/top-travel.png"
import bebyCare from "../assests/images/top-beby-care.png"
import twoWheelers from "../assests/images/top-two-wheelers.png"
import './style.scss'
export default function TopHeader() {
    return (
        <div className='top-header-product'>
            <div className='top-header-product-box'>
                <img src={grocery} />
                <span className='top-header-product-lable'>
                    <span>Grocery</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={Phone} />
                <span className='top-header-product-lable'>
                    <span>Mobiles</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={fashion} />
                <span className='top-header-product-lable'>
                    <span>Fashion</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={electronic} />
                <span className='top-header-product-lable'>
                    <span>Electronics</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={furnitures} />
                <span className='top-header-product-lable'>
                    <span>Home & Furniture</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={apliences} />
                <span className='top-header-product-lable'>
                    <span>Appliances</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={travel} />
                <span className='top-header-product-lable'>
                    <span>Travel</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={bebyCare} />
                <span className='top-header-product-lable'>
                    <span>Beauty, Toys & More</span>
                </span>
            </div>
            <div className='top-header-product-box'>
                <img src={twoWheelers} />
                <span className='top-header-product-lable'>
                    <span>Two Wheelers</span>
                </span>
            </div>
        </div>
    )
}
