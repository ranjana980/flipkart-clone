import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './styles.scss'
import { bannerSliderItems } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../../entities/product-reducer";
import { Link } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch()
  const { productList: userProducts } = useSelector((state) => state.products)
  const [productList, setproductList] = useState([])

  useEffect(() => {
    if (productList.length <= 0) {
      const category = []
      userProducts?.map((product) => {
        if (!category.includes(product?.category)) {
          if (product?.subcategory) {
            category.push("")
          }
          else {
            category.push(product.category)
          }
        }
      })
      const products = []
      category?.map((item) => {
        const categoryData = userProducts?.filter((filterValue) => item === filterValue?.category && !filterValue.subcategory)
        products.push({ category: item, products: categoryData })
        setproductList(products)
      })
      dispatch(getProductsAction())
    }
  }, [userProducts])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1025, min: 768 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 3,
    },
    largeMobile: {
      breakpoint: { max: 425, min: 320 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 320, min: 0 },
      items: 2,
    },
  };

  const responsive1 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  return (
    <>
      <div className="grid grid-cols-12 bg-white  mb-2 my-3 mx-3">
        <div className="lg:col-span-12  main-page    xs:col-span-12">
          <div>
            <Carousel
              responsive={responsive1}
              interval={7000}
              height={600}
              width={850}
              swipeable={true}
              infiniteLoop={true}
              autoPlay={true}
              dynamicHeight={true}
              showDots
            >
              {bannerSliderItems.map(({ image }) => (
                <div>
                  <img
                    src={image}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      {productList?.map((product) => (
        <>{product?.category !== "" && <div className="bg-white text-start m-3" key={product?.category}>
          <b className="pl-[10px] pb-[30px] text-[25px] captilize">Best of {product?.category}</b>
          <Carousel
            swipeable={true}
            responsive={responsive}
            dynamicHeight={true}
          >
            {product?.products.map((item) => (
              <Link className=" cursor-pointer  xs:ml-2 " to={`/${item?.category}/${item?.title?.toLowerCase()}`}>
                <img
                  style={{ height: "300px", width: "300px" }}
                  className=" p-2"
                  src={item.image}
                />
                <b className="ml-2 text-center"
                >{item.title}</b>
                <h5 className="text-center">From $ {item.price}</h5>
              </Link>
            ))}
          </Carousel>
        </div >}</>
      ))
      }
    </>
  )
}



