import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

export default function GiftCardsStore() {
    return (
        <div className='text-start'>
            <div className='p-2 text-[grey] text-[14px]'> <b >Gift Card Store</b>
                <p>Special occasions call for special gifts. Whether it’s a birthday or an anniversary, finding the right gift for your loved ones is always a difficult task. And after you get a gift, you have to hope that they like what you got. Well, there’s a simple solution to this conundrum - Flipkart Gift Cards Store. You can give Flipkart gift cards and Vouchers across multiple occasions to your friends or family and give them the chance to shop for whatever their heart desires. So, what are you waiting for? Get gift vouchers online on Flipkart, gift or redeem them and do more with this feature. Flipkart Gift Card Store also has a wide range of Gift Cards from categories such as travel, jewellery, fashion, grocery, and apps & more. You can choose from a diverse range of denominations available or enter any preferred amount between Rs 25 to Rs 10,000. Bid adieu to gifting troubles, send online gift cards to your friends and family, bring a smile to their faces and make special moments even more special!. The information you are reading has been last updated on 26-Apr-25.
                </p></div>
            <div className='bg-white gift-cards-store'>
                <img src="https://rukminim2.flixcart.com/flap/3600/3600/image/81ebdc5d337e7190.jpg?q=80" />
                <Link> <img src="https://rukminim2.flixcart.com/fk-p-flap/2000/2000/image/93881a4d42932961.jpg?q=50" /></Link>
                <img src="https://rukminim2.flixcart.com/flap/2000/2000/image/21e9c498b1a3da2a.jpg?q=50" />
                <img src="https://rukminim2.flixcart.com/flap/2000/2000/image/9b1dbf0d26f05fab.jpg?q=50" />
                <img src="https://rukminim2.flixcart.com/fk-p-flap/2000/2000/image/37406a98c93c3cb7.jpg?q=50" />
            </div>
        </div>
    )
}
