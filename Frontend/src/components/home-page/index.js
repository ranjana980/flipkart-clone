import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerSliderItems, furnitures, sellingSliderItems } from "../../utils/constant";
import itemList from '../../utils/product.json'

export default function HomePage() {

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
      <div className="m-3 text-start bg-white p-2">
        <b className="pl-[10px] pb-[30px] text-[25px]">Best of Wears</b >
        <Carousel
          height={600}
          className="grid lg:grid-cols-10 xs:grid-cols-12 ml-1 mr-7 "
          swipeable={true}
          responsive={responsive}
          dynamicHeight={true}
        >
          {sellingSliderItems.map(({ title, image, price }) => (
            <div className="lg:col-auto text-center  xs:col-span-6 sm:col-span-4 md:col-span-4   xs:ml-2 ">
              <img
                style={{ height: "350px", width: "300px" }}
                className=" p-2"
                src={image}
              />
              <b className="ml-2 text-center"
              >{title}</b>
              <h5 className="text-center">From $ {price}</h5>
            </div>
          ))}
        </Carousel>
      </div >
      <div className="bg-white text-start mx-3">
        <b className="pl-[10px] pb-[30px] text-[25px]">Best of Electronics</b>
        <Carousel
          height={600}
          className="grid lg:grid-cols-10 xs:grid-cols-12 ml-1 mr-7 "
          swipeable={true}
          responsive={responsive}
          dynamicHeight={true}
        >
          {itemList.map((item) => (
            <div className="lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4   xs:ml-2 ">
              <img
                style={{ height: "300px", width: "300px" }}
                className=" p-2"
                src={item.image}
              />
              <b className="ml-2 text-center"
              >{item.title}</b>
              <h5 className="text-center">From $ {item.price}</h5>
            </div>
          ))}
        </Carousel >
      </div >
      <div className="bg-white text-start mx-3 my-3">
        <b className="pl-[10px] pb-[30px] text-[25px]">Best of Furnitures</b >
        <Carousel
          height={600}
          className="grid lg:grid-cols-10 xs:grid-cols-12 ml-1 mr-7 "
          swipeable={true}
          responsive={responsive}
          dynamicHeight={true}
        >
          {furnitures.map((item) => (
            <div className="lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4   xs:ml-2 ">
              <img
                style={{ height: "300px", width: "300px" }}
                className=" p-2"
                src={item.image}
              />
              <b className="ml-2 text-center"
              >{item.title}</b>
              <h5 className="text-center">From $ {item.price}</h5>
            </div>
          ))}
        </Carousel>
      </div >
    </>
  );
}
