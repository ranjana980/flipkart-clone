import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeToCartAction } from "../../../entities/auth-reducer"

export default function CartItem() {
    const navigate = useNavigate()
    const { user } = useSelector((state => state.auth))
    const is_not_have_Items = user?.is_logged_in && user?.cart?.length === 0
    const is_have_Items = user?.is_logged_in && user?.cart?.length > 0
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const handleCart = () => {
        if (user?.is_logged_in) {
            navigate('/')
        }
        else {
            navigate('/account?login=true')
        }
    }

    const getTotalAmount = () => {
        return user?.cart?.reduce((acc, curr) => {
            return (acc * quantity + (curr?.price * quantity || 0));
        }, 0);
    }

    const getDeliveryCharges = () => {
        return user?.cart?.reduce((acc, curr) => {
            return (acc * quantity + (curr?.deliveryCharge * quantity || 0));
        }, 0);
    }

    const handleRemoveToCart = (product) => {
        const data = user?.cart?.filter((item) => item?.id !== product.id)
        user['cart'] = data
        dispatch(removeToCartAction(user))
    }

    return (
        <>
            <div className="border-b border-[lightgrey] ">
                {is_not_have_Items ?
                    <div className="bg-white pb-10  p-4 mb-5">
                        <div className=" flex justify-center " >  <img src="https://rukminim2.flixcart.com/www/400/400/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" /></div>
                        <h5>Missing Cart Items?</h5>
                        <div>
                            <p>{!user?.is_logged_in ? 'Login for the see items  you added previously' : "No Item found  please add first"}</p>
                            <button onClick={handleCart} className="bg-[#fb641b] text-white p-2 w-[12%]">{is_not_have_Items ? "Go to Product" : is_have_Items ? 'Add more items' : "Login"}</button></div>
                    </div> :
                    <div className="bg-white gap-[2px] relative">
                        <div>
                            {user?.cart?.map((product) => (
                                <Link to="/product-details" className="flex items-center   mx-10 justify-between hover:shadow-2xl bg-white relative  cursor-pointer p-2 pb-5 " >
                                    <div className="w-[200px]"> <img
                                        style={{ height: "100px", width: "100px" }}
                                        src={product.image}
                                    />
                                        <b className="text-center text-wrap text-[12px]"
                                        >{product.title}</b>
                                        <h5 className="text-center">From $ {parseInt(product.price)}</h5>
                                        <p>Delivery Charge $ {parseInt(product?.deliveryCharge)}</p>
                                    </div>
                                    <div className="flex gap-2 justify-center"><b>Quantity</b><button className="w-[25px] h-[25px] bg-[yellow] rounded" onClick={() => { if (quantity > 1) setQuantity(quantity - 1) }}>-</button>{quantity}<button className="w-[25px] h-[25px] bg-[yellow] rounded" onClick={() => setQuantity(quantity + 1)}>+</button></div>
                                    <div className="flex justify-center mt-4">
                                        <div className="flex flex-col justify-center gap-2  text-white">
                                            <Link className="bg-[orange] hover:!text-[white] text-white p-2 rounded  text-[12px]" >Go to the Product</Link>
                                            <button onClick={() => handleRemoveToCart(product)} className="bg-[orange] p-2 rounded   text-[12px]" >Remove from cart</button>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Delivery charges: $ {parseInt(product?.deliveryCharge * quantity)}</p>
                                        <b>Total Amount: $ {parseInt(product?.price * quantity)}</b>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="float-right  absolute right-5 bottom-3 ">
                            <p>Total Delivery charges: ${parseInt(getDeliveryCharges())}</p>
                            <p><b>Total Amount: ${parseInt(getTotalAmount())} </b></p>
                        </div>
                    </div>
                }
                <div className="pt-3 mb-10 mx-5 text-[grey] flex justify-between item">
                    <div className="flex gap-2 " >
                        <div className="border-r border-[grey] pr-2">Policies:Returns Policy</div>
                        <div className="border-r border-[grey] pr-2">Terms of use</div>
                        <div className="border-r border-[grey] pr-2">Security</div>
                        <div >Privacy</div>
                        <div className="ml-5">© 2007-2025 Flipkart.com</div>
                    </div>
                    <div> Need help? Visit the Help Center or Contact Us</div>
                </div>
            </div >
        </>
    )
}