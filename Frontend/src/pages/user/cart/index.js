import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { createPayemntAction, removeToCartAction, verifyPaymentAction } from "../../../entities/auth-reducer"

export default function CartItem() {
    const navigate = useNavigate()
    const { user } = useSelector((state => state.auth))
    const [productList, setProductList] = useState([])
    const [isNotHaveItems, setIsNotHaveItems] = useState(false)
    const [isHaveItems, setIsHaveItems] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.cart?.length > 0) {
            setIsNotHaveItems(user?.is_logged_in && productList?.length === 0)
            setIsHaveItems(user?.is_logged_in && productList?.length > 0)
            setProductList(user?.cart)
        }
    }, [user])

    const handleCart = () => {
        if (user?.is_logged_in) {
            navigate('/')
        }
        else {
            navigate('/account?login=true')
        }
    }

    const getTotalAmount = () => {
        return productList?.reduce((acc, curr) => {
            return (acc * curr.quantity + (curr?.price * curr.quantity || 0));
        }, 0);
    }

    const getDeliveryCharges = () => {
        return productList?.reduce((acc, curr) => {
            return (acc * curr.quantity + (curr?.deliveryCharge * curr.quantity || 0));
        }, 0);
    }

    const handleRemoveToCart = (product) => {
        const data = productList?.filter((item) => item?.id !== product.id)
        user['cart'] = data
        dispatch(removeToCartAction(user))
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const onSuccess = (order) => {
        const options = {
            key: "rzp_test_lKjA37PSjWtrJS",
            amount: order.amount,
            currency: order.currency,
            name: "E-commerce",
            description: "Payment for your order",
            order_id: order.id,
            handler: async (response) => {
                const [razorpay_order_id, razorpay_payment_id, razorpay_signature] = response
                try {
                    await dispatch(verifyPaymentAction({ razorpay_order_id, razorpay_payment_id, razorpay_signature }))
                    alert("Payment successful!");
                } catch (err) {
                    alert("Payment verification failed: " + err.message);
                }
            },
            prefill: {
                name: "John Doe",
                email: "john@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzpay = new window.Razorpay(options);
        rzpay.open();
    };

    const handleCheckOut = async () => {
        const res = await loadRazorpayScript();
        if (!res) {
            alert("Failed to load Razorpay SDK");
            return;
        }
        try {
            const result = await dispatch(createPayemntAction({ amount: parseInt(getTotalAmount()) }, onSuccess));
        } catch (err) {
            alert("Error creating order: " + err.message);
        }
    };

    const handleProductQuanity = async (type, productId) => {
        setProductList(productList.map((item) => {
            if (item._id === productId) {
                return {
                    ...item, quantity: type === "increament" ? item.quantity + 1 : item.quantity > 1 ? item.quantity - 1 : item.quantity
                }
            }
            else {
                return item
            }
        }))
    }

    return (
        <>
            <div className="border-b border-[lightgrey] ">
                {isNotHaveItems ?
                    <div className="bg-white pb-10  p-4 mb-5">
                        <div className=" flex justify-center " >  <img src="https://rukminim2.flixcart.com/www/400/400/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" /></div>
                        <h5>Missing Cart Items?</h5>
                        <div>
                            <p>{!user?.is_logged_in ? 'Login for the see items  you added previously' : "No Item found  please add first"}</p>
                            <button onClick={handleCart} className="bg-[#fb641b] text-white p-2 w-[12%]">{isNotHaveItems ? "Go to Product" : isHaveItems ? 'Add more items' : "Login"}</button></div>
                    </div> :
                    <div className="bg-white gap-[2px] relative">
                        <div>
                            {productList?.map((product) => (
                                <div className="flex items-center    justify-between hover:shadow-2xl bg-white relative  cursor-pointer p-2 pb-5 " >
                                    <Link to="/product-details" className="w-[200px]"> <img
                                        style={{ height: "100px", width: "100px" }}
                                        src={product.image}
                                    />
                                        <b className="text-center text-wrap text-[12px]"
                                        >{product.title}</b>
                                        <h5 className="text-center">From $ {parseInt(product.price)}</h5>
                                        <p>Delivery Charge $ {parseInt(product?.deliveryCharge)}</p>
                                    </Link>
                                    <div className="flex gap-2 justify-center"><b>Quantity</b><button className="w-[25px] h-[25px] bg-[yellow] rounded" onClick={() => handleProductQuanity('decreament', product?._id)}>-</button>{product.quantity}<button className="w-[25px] h-[25px] bg-[yellow] rounded" onClick={() => handleProductQuanity("increament", product._id)}>+</button></div>
                                    <div className="flex justify-center mt-4">
                                        <div className="flex flex-col justify-center gap-2  text-white">
                                            <Link className="bg-[orange] hover:!text-[white] text-white p-2 rounded  text-[12px]" >Go to the Product</Link>
                                            <button onClick={() => handleRemoveToCart(product)} className="bg-[orange] p-2 rounded   text-[12px]" >Remove from cart</button>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Delivery charges: $ {parseInt(product?.deliveryCharge * product.quantity)}</p>
                                        <b>Total Amount: $ {parseInt(product?.price * product.quantity)}</b>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="float-right  absolute right-5 bottom-3 ">
                            <p>Total Delivery charges: ${parseInt(getDeliveryCharges())}</p>
                            <p><b>Total Amount: ${parseInt(getTotalAmount())} </b></p>
                            <button onClick={handleCheckOut} className="bg-[orange]  w-[200px]  p-2 rounded text-[white]    text-[12px]" >CheckOut</button>
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