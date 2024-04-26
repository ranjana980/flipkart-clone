import React, { useEffect, useState, Fragment } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { baseUrl } from "../../api/baseUrl";
import { productList } from "../../api/routes";
import TopHeader from "../../section-component/top-header";
import { sideMenuItems, bannerSliderItems, sellingSliderItems } from "../../utils/constant";

export default function MainPage() {
  const [Isopen1, setIsopen1] = useState(false);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    const result = await axios.get(`${baseUrl}${productList}`);
    setItemList(result.data.data);
    console.log(result, "get all data");
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
    <div className="product-container">
      <TopHeader />
      <div className="grid grid-cols-12">
        <div className="lg:col-span-2 xs:col-span-0 side-box lg:ml-2 mt-3  p-2 lg:block md:block  xs:hidden">
          <div className="d-flex justify-content-between w-100 mt-3 bg-[#333]   ">
            <h5 className="text-white p-2 ">All Categories</h5>
          </div>
          {sideMenuItems.map(({ title, subCategories, id }) => (
            <Fragment key={id}>
              <div
                className="d-flex justify-content-between w-100  sm-div p-2 bg-gray-300 mt-2"
                onClick={() => {
                  if (Isopen1 === id) {
                    setIsopen1("");
                  } else {
                    setIsopen1(id);
                  }
                }}
              >
                <span>{title}</span>
                {Isopen1 === id ? (
                  <KeyboardArrowDownIcon
                    style={{ color: "gray", fontSize: "25px" }}
                  />
                ) : (
                  <ArrowForwardIosIcon
                    style={{ color: "gray", fontSize: "15px" }}
                  />
                )}
              </div>
              {Isopen1 === id && (
                <div className="ml-2 mt-3 mb-3">
                  {subCategories.map(({ title }) => (
                    <div
                      key={id}
                      className="d-flex justify-content-between w-100  mb-1"
                    >
                      <span>{title}</span>
                    </div>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div className="lg:col-span-8  main-page mt-3  lg:ml-3  xs:col-span-12">
          <div>
            <Carousel
              responsive={responsive1}
              interval={7000}
              className="mt-2"
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
                    style={{ height: "470px", width: "970px" }}
                    className="ml-2 mt-1"
                    src={image}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className=" lg:col-span-2  xs:col-span-6 ml-3 mt-3 h-100 mr-5 lg:block md:block xs:hidden ">
          <div className="box h-40">
            {" "}
            <img
              style={{ height: "159px", width: "214px" }}
              className="p-1 "
              src="https://th.bing.com/th/id/R.0f2741e83552feef6ccfe56f4bd8e438?rik=RlT3lqaAYH1p9Q&riu=http%3a%2f%2fwww.annelibush.com%2fwp-content%2fuploads%2f2016%2f07%2fcocktails-2-1-768x512.jpg&ehk=PnBpxu4lbXsRoLQwFAGB2dB4%2f9yAfwYay5trPXchnUg%3d&risl=&pid=ImgRaw&r=0"
            />
          </div>
          <div className="box mt-2 h-40">
            {" "}
            <img
              style={{ height: "159px", width: "214px" }}
              className="p-1  "
              src="https://images-na.ssl-images-amazon.com/images/I/8118ZfaYYlL._AC_UL1500_.jpg"
            />
          </div>
          <div className="box mt-2 h-40">
            {" "}
            <img
              style={{ height: "159px", width: "214px" }}
              className="p-1  "
              src="https://th.bing.com/th/id/OIP.y21E373yCnZ2ackw3YgMJAHaFj?pid=ImgDet&rs=1"
            />
          </div>
        </div>
      </div>
      <div className="mt-[30px] text-start">
        <b className="pl-[10px] pb-[30px] text-[25px] ">Top Categories</b>
        <Carousel
          height={600}
          className="grid lg:grid-cols-10 xs:grid-cols-12 ml-1 mr-7"
          swipeable={true}
          responsive={responsive}
          dynamicHeight={true}
        >
          {sellingSliderItems.map(({ title, image }) => (
            <div className="lg:col-auto xs:col-span-6 sm:col-span-4 md:col-span-4 box  xs:ml-2 ">
              <img
                style={{ height: "350px", width: "300px" }}
                className=" p-2"
                src={image}
              />
              <b className="ml-2">{title}</b>
            </div>
          ))}
        </Carousel>
      </div>
      <div>
        <Carousel
          className="grid lg:grid-cols-10 xs:grid-cols-12 ml-1  mt-3 mr-7"
          swipeable={true}
          arrows={true}
          responsive={responsive}
        // removeArrowOnDeviceType={[ "mobile"]}
        >
          {itemList.map((item) => (
            <div className="lg:col-auto xs:col-span-6 box xs:ml-2 xs:mt-2">
              <img
                style={{ height: "166px", width: "182px" }}
                className=" p-2"
                src={item.item_photo}
              />
              <h6 style={{ lineHeight: "0px" }}>{item.item_name}</h6>
              <b className="priceO" style={{ lineHeight: "0px" }}>
                Rs.{item.original_price}
              </b>
              <h5 style={{ fontSize: "15px" }}>Rs.{item.price}</h5>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
