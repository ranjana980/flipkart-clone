import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeToCartAction } from "../../../entities/auth-reducer"

export default function WishList() {
    const navigate = useNavigate()
    const { user } = useSelector((state => state.auth))
    const is_not_have_Items = user?.is_logged_in && user?.wishlist?.length === 0
    const is_have_Items = user?.is_logged_in && user?.wishlist?.length > 1
    const dispatch = useDispatch()

    const handleWishlist = () => {
        if (user?.is_logged_in) {
            navigate('/')
        }
        else {
            navigate('/account?login=true')
        }
    }

    const handleRemoveToWishList = (product) => {
        const data = user?.wishlist?.filter((item) => item?._id !== product._id)
        user['wishlist'] = data
        dispatch(removeToCartAction(user))
    }

    return (<div className="border-b border-[lightgrey] ">
        {is_not_have_Items ?
            <div className="bg-white  p-4 mb-5">
                <div className=" flex justify-center " >  <img src="https://rukminim2.flixcart.com/www/400/400/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" /></div>
                <h5>Empty Wishlist?</h5>
                <div>
                    <p>{!user?.is_logged_in ? 'Login for the see items  you added previously' : "you have no items in your wishlist. start adding"}</p>
                    <button onClick={handleWishlist} className="bg-[#fb641b] text-white p-2 w-[12%]">{is_not_have_Items ? "Go to Products" : is_have_Items ? 'Add more items' : "Login"}</button></div>
            </div> :
            <div className="flex flex-wrap justify-center  bg-white gap-[2px]  m-3">
                {user?.wishlist?.map((product) => (
                    <Link to="/product-details" className="hover:shadow-2xl bg-white relative  cursor-pointer p-2 pb-4 min-h-[500px] w-[290px]" >
                        <img
                            style={{ height: "300px", width: "300px" }}
                            src={product.image}
                        />
                        <b className="text-center text-wrap"
                        >{product.title}</b>
                        <h5 className="text-center">From $ {product.price}</h5>
                        <div className="flex justify-center">
                            <div className="flex flex-col justify-center gap-3  absolute bottom-[15px] text-white">
                                <Link className="bg-[orange] hover:!text-[white] text-white p-2 rounded " to="/">Go to the Product</Link>
                                <button className="bg-[orange] p-2 rounded  " onClick={() => handleRemoveToWishList(product)}>Remove from wishlist</button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>}
        <div className="pt-3 mb-64 mx-5 text-[grey] flex justify-between item">
            <div className="flex gap-2 " >
                <div className="border-r border-[grey] pr-2">Policies:Returns Policy</div>
                <div className="border-r border-[grey] pr-2">Terms of use</div>
                <div className="border-r border-[grey] pr-2">Security</div>
                <div >Privacy</div>
                <div className="ml-5">© 2007-2025 Flipkart.com</div>
            </div>
            <div> Need help? Visit the Help Center or Contact Us</div>
        </div>
    </div>)
}