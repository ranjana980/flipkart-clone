import { useLocation } from "react-router-dom"
import TopHeader from "./home-top-menu"
import ProductTopMenu from "./product-top-menu"
import SellerTopMenu from "../pages/become-a-seller/seller-top-menu"

export default function HeaderMenu() {
    const { pathname } = useLocation()
    const seller = pathname === "/become-a-seller"
    return (
        <> {pathname === "/" ? <TopHeader /> : seller ? <SellerTopMenu /> : <ProductTopMenu />}
        </>

    )
}