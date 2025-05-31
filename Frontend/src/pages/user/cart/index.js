import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function CartItem() {
    const navigate = useNavigate()
    const { user } = useSelector((state => state.auth))
    const is_not_have_Items = user?.is_logged_in && user?.cart?.length === 0
    const is_have_Items = user?.is_logged_in && user?.cart?.length > 0
    const deliveryCharges = 0
    const quantity = 1

    const handleCart = () => {
        if (user?.is_logged_in) {
            navigate('/')
        }
        else {
            navigate('/account?login=true')
        }
    }

    return (
        <>
            <div className="border-b border-[lightgrey] ">
                {is_not_have_Items ?
                    <div className="bg-white  p-4 mb-5">
                        <div className=" flex justify-center " >  <img src="https://rukminim2.flixcart.com/www/400/400/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" /></div>
                        <h5>Missing Cart Items?</h5>
                        <div>
                            <p>{!user?.is_logged_in ? 'Login for the see items  you added previously' : "No Item found  please add first"}</p>
                            <button onClick={handleCart} className="bg-[#fb641b] text-white p-2 w-[12%]">{is_not_have_Items ? "Go to Product" : is_have_Items ? 'Addd more items' : "Login"}</button></div>
                    </div> :
                    <div className="bg-white gap-[2px] relative">
                        <div className="flex flex-wrap justify-center">
                            {user?.cart?.map((product) => (
                                <div className="hover:shadow-2xl bg-white relative  cursor-pointer p-2 pb-5 min-h-[550px] w-[290px]" >
                                    <img
                                        style={{ height: "300px", width: "300px" }}
                                        src={product.image}
                                    />
                                    <b className="text-center text-wrap"
                                    >{product.title}</b>
                                    <h5 className="text-center">From $ {product.price}</h5>
                                    <div className="flex justify-center mt-4">
                                        <div className="flex flex-col justify-center gap-2  absolute bottom-[5px] text-white">
                                            <Link className="bg-[orange] p-2 rounded  " to="/product-details">Go to the Product Details</Link>
                                            <Link className="bg-[orange] p-2 rounded  " to="/product-details">Remove from cart</Link>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-center"><b>Quantity</b><button className="w-[50px] bg-[yellow] rounded">-</button>{quantity}<button className="w-[50px] bg-[yellow] rounded">+</button></div>
                                </div>
                            ))}
                        </div>
                        <div className="float-right mr-3 absolute right-3 bottom-5">
                            <p>Delivery charges:{deliveryCharges}</p>
                            <p><b>Total Amount:</b></p>
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
            </div>
        </>
    )
}