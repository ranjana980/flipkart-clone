import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './styles.scss'
import { bannerSliderItems } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../entities/product-reducer";
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
          category.push(product.category)
        }
      })
      const products = []
      category?.map((item) => {
        const categoryData = userProducts?.filter((filterValue) => item === filterValue?.category)
        products.push({ category: item, products: categoryData })
        setproductList(products)
      })
      dispatch(getProductsAction())
    }
  }, [])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
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
        <div className="bg-white text-start m-3" key={product?.category}>
          <b className="pl-[10px] pb-[30px] text-[25px] captilize">Best of {product?.category}</b>
          <Carousel
            height={600}
            className="grid lg:grid-cols-10 xs:grid-cols-12 ml-1 mr-7 "
            swipeable={true}
            responsive={responsive}
            dynamicHeight={true}
          >
            {product?.products.map((item) => (
              <>{item?.subCategories?.length > 0 ?
                <Link className="lg:col-auto cursor-pointer xs:col-span-6 sm:col-span-4 md:col-span-4   xs:ml-2 " to={`${item?.category}/${item?.subCategories[0]?.category}`}>
                  <img
                    style={{ height: "300px", width: "300px" }}
                    className=" p-2"
                    src={item.image}
                  />
                  <b className="ml-2 text-center"
                  >{item.title}</b>
                  <h5 className="text-center">From $ {item.price}</h5>
                </Link> : <div className="lg:col-auto cursor-pointer xs:col-span-6 sm:col-span-4 md:col-span-4   xs:ml-2 ">
                  <img
                    style={{ height: "300px", width: "300px" }}
                    className=" p-2"
                    src={item.image}
                  />
                  <b className="ml-2 text-center"
                  >{item.title}</b>
                  <h5 className="text-center">From $ {item.price}</h5>
                </div>}</>
            ))}
          </Carousel>
        </div >
      ))
      }
    </>
  )
}



