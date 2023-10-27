import React, { useState } from "react";
import { Modal } from "reactstrap";
import axios from "axios";
import swal from "sweetalert";
import "react-modal-video/scss/modal-video.scss";
import { ShoppingCart, Favorite, Search } from "@material-ui/icons";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { AuthBanner } from "../auth/auth-banner";
import { AuthForm } from "../auth/form";
import {
  loginObjArray,
  loginSchema,
  loginValues,
  signUPSchema,
  signUpObjArray,
  signUpValues,
} from "../auth/helper";
import { topMenuItems } from "../utils/constant";
import { baseUrl } from "../api/baseUrl";
import { loginUser, signUpUser, uploadImage } from "../api/routes";

export default function Navbar() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.FormDataReducer);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleFormChange = (route) => {
    if (route === "Login") {
      setModal(false);
      setModal1(true);
    } else {
      setModal(true);
    }
  };

  const handleSubmit = (values) => {
    axios
      .post(`${baseUrl}${signUpUser}`, values)
      .then((response) => {
        if (response.data.code == 200) {
          dispatch({ type: "USerInfo", payload: response.data.data });
          swal({
            title: "Success",
            text: "SignUp SuccessFully",
            icon: "success",
            button: "Okay",
          });
          setModal1(false);
          localStorage.setItem("USerInfo", JSON.stringify(response.data.data));
        } else {
          swal({
            text: response.data.msg,
            icon: "Danger",
            button: "Okay",
          });
        }
      })
      .catch((error) => {});
  };

  const handleSignUpChange = (e, setFieldValue) => {
    setFieldValue(e.target.name, e.target.value);
  };

  const handleLoginChange = (e, setFieldValue) => {
    setFieldValue(e.target.name, e.target.value);
    if (e.target.name == "profile_pic") {
      const formData = new FormData();
      formData.append("item_photo", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post( `${baseUrl}${uploadImage}`, formData, config)
        .then((response) => {
          setFieldValue(e.target.name, response.data.msg);
        })
        .catch((error) => {});
    } else {
      setFieldValue(e.target.name, e.target.value);
    }
  };

  const handleSubmit3 = async (values) => {
    const result = await axios.post(
      `${baseUrl}${loginUser}`,
      values
    );
    if (result.data.code == 200) {
      swal({
        title: "Success",
        text: "Login SuccessFully",
        icon: "success",
        button: "Okay",
      });
      setModal1(false);
      dispatch({ type: "USerInfo", payload: result.data.data });
      localStorage.setItem("USerInfo", JSON.stringify(result.data.data));
    } else {
    }
  };

  return (
    <>
      <div className="lg:bg-[#333] sm:bg-[#333] md:bg-[#333] xs:bg-[#333] h-[65px] ">
        <div className="grid container lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 xs:grid-cols-12 gap-[20px] ">
          <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12">
            <h3 className="font-mono text-white italic relative lg:top-3 top-2 position  lg:right-0 xs:text-start md:text-start sm:text-start font-bold">
              E-Commerce
            </h3>
          </div>
          <div className="lg:col-span-6 ml-1 lg:ml-0 md:col-span-10 sm:col-span-12 xs:col-span-10">
            <div className="lg:d-flex ">
              <input
                style={{ color: "#4b61c0", fontWeight: "700" }}
                className="p-2 mt-3  w-100  lg:rounded-none italic xs:text-xs lg:text-base"
                placeholder="Search Your Dream Products Here...."
              />
              <Search
                style={{ color: "#4b61c0", fontWeight: "900" }}
                className="lg:relative lg:bottom-10 lg:left-72 lg:font-medium mt-2 sm:relative sm:bottom-10 md:relative md:bottom-10 xs:relative xs:bottom-10 xs:left-24 "
              />
            </div>
          </div>
          {userInfo.login_status != 1 ? (
            <button
              className="mt-3 lg:col-span-2  xs:col-span-3 md:col-span-3 bg-white text-blue-600 xs:p-1 md:p-1  w-32 h-[40px]"
              style={{ color: "#4b61c0", fontSize: "16px", fontWeight: "600" }}
              onClick={() => {
                setModal1(!modal1);
              }}
            >
              Login
            </button>
          ) : (
            <div className="lg:col-span-3 flex xs:col-span-2 xs:ml-5 sm:col-span-2 md:col-span-12 lg:ml-10  ">
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <Menu.Button className="justify-center  py-2 text-sm font-medium text-gray-700 lg-outline-none  rounded-md   focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <img
                      src={userInfo?.profile_pic}
                      style={{
                        borderRadius: "50%",
                        height: "30px",
                        width: "30px",
                      }}
                    />
                    <b className="text-white float-center xs:text-xs lg:text-lg">
                      {userInfo?.username}
                    </b>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  right-0 z-40 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <span className="triangle text-white"></span>
                      {topMenuItems.map((MenuItem) => (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 no-underline"
                                  : "text-gray-900 no-underline",
                                "block px-4 py-2 text-sm no-underline"
                              )}
                            >
                             {MenuItem}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {userInfo.role ==="admin" ? null : (
                <>
                  <div className="mt-1">
                    <ShoppingCart
                      className="text-white relative left-10 "
                      style={{ fontSize: "25px" }}

                    />
                    <b
                      className="text-white ml-1 relative top-7"
                      style={{ fontSize: "14px" }}
                    >
                      Cart
                    </b>
                  </div>
                  <div className="mt-1">
                    <Favorite
                      className="text-white  relative left-10 "
                      style={{ fontSize: "25px" }}
                    />
                    <b
                      className="text-white ml-1 relative top-7"
                      style={{ fontSize: "14px" }}
                    >
                      Wishlist
                    </b>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modal1}
        toggle={() => {
          setModal1(!modal1);
        }}
        backdrop={true}
        keyboard={false}
        fullscreen={"lg"}
        scrollable={true}
        size="lg"
      >
        {modal ? (
          <div className="grid grid-cols-12">
            <AuthBanner
              heading="Create Account"
              secondaryHeading="SignUp With these Details"
              startHeading="to get Started"
            />
            <AuthForm
              initialValues={signUpValues}
              validationSchema={signUPSchema}
              handleSubmit={handleSubmit}
              authArrObj={signUpObjArray}
              buttonText="Create Account"
              bottomHeading="Don't have Account?"
              routeText="Login"
              handleFormChange={handleFormChange}
              handleChange={handleSignUpChange}
              onClose={() => setModal1(false)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-12">
            <AuthBanner
              heading="Login"
              secondaryHeading="Get access to your"
              startHeading=" Orders, Wishlist and Recommendations"
            />
            <AuthForm
              initialValues={loginValues}
              validationSchema={loginSchema}
              handleSubmit={handleSubmit3}
              authArrObj={loginObjArray}
              buttonText="Login"
              bottomHeading="Already have An Account?"
              routeText="Create Account"
              handleFormChange={handleFormChange}
              onClose={() => setModal1(false)}
              handleChange={handleLoginChange}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
