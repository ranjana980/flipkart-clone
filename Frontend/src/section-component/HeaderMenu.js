import { useLocation } from "react-router-dom"
import TopHeader from "./home-top-menu"
import ProductTopMenu from "./product-top-menu"

export default function HeaderMenu() {
    const { pathname } = useLocation()
    return (
        <> {pathname === "/" ? <TopHeader /> : <ProductTopMenu />}
        </>

    )
}