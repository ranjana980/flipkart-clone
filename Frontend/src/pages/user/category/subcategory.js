
import { Favorite } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { addToCartAction } from "../../../entities/auth-reducer"

export default function ProductCotegory() {
    const { subcategory } = useParams()
    const { user } = useSelector((state) => state.auth)
    const { productList } = useSelector((state) => state.products)
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        user.cart.push({ ...product, quantity: 1 })
        dispatch(addToCartAction(user))
    }

    const handleToWishList = (product) => {
        user.wishlist.push(product)
        dispatch(addToCartAction(user))
    }

    const subCategories = productList?.filter((item) => item?.subcategory === subcategory)


    return <>
        <h1 className="captilize"> {subcategory}</h1>
        <div className="flex flex-wrap justify-center  bg-white gap-[2px]  m-3">
            {subCategories?.map((categoryProduct) => (
                <Link className="hover:shadow-2xl bg-white relative  cursor-pointer p-2 pb-4 min-h-[500px] w-[290px]" >
                    <Favorite className="float-right mt-2 mr-3 text-[red]" onClick={() => handleToWishList(categoryProduct)} />
                    <img
                        style={{ height: "300px", width: "300px" }}
                        src={categoryProduct.image}
                    />
                    <b className="text-center text-wrap"
                    >{categoryProduct.title}</b>
                    <h5 className="text-center">From $ {categoryProduct.price}</h5>
                    <div className="flex justify-center">
                        <div className="flex justify-center gap-4  absolute bottom-[15px] text-white">
                            <button className="bg-[orange] p-2 rounded  " onClick={() => handleAddToCart(categoryProduct)}> Add to Cart</button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </>
}

