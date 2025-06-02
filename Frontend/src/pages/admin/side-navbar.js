import React, { useState } from "react";
import {
    KeyboardArrowRight,
    KeyboardArrowDown,
    KeyboardArrowLeft,
} from "@material-ui/icons";
import './style.css'
import { useNavigate } from "react-router-dom";
import IconRenderer from "../../utils/icons";
import swal from 'sweetalert';
import { navBarItems } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { logOutUserAction } from "../../entities/auth-reducer";

export default function SideNavbar() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const { menu } = useSelector((state) => state.style)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleAddProduct = () => {

    }

    const handleAddUser = () => {

    }

    const handleLogout = () => {
        const onSuccess = () => {
            localStorage.removeItem("userId")
            navigate('/')
            swal('Logout SuccessFully')
        }
        dispatch(logOutUserAction(user?._id, onSuccess))

    }


    return (
        <div className={`text-white admin-side-nav   ${menu ? "w-[15%]" : "w-[5%]"} h-[90%]  mb-2 pb-5 rounded-l `}>
            <div
                className={` pt-[30px] overflow-y-scroll side-navbar  h-[510px]
                    }`}
            >
                {navBarItems.map((item, index) => (
                    <React.Fragment key={`${item.label}-${index}`}>
                        <div
                            className={`justify-between cursor-pointer text-center ${item.border ? " border-b  solid border-teal-200" : ""
                                } ${menu ? "p-2 flex" : "block"} `}
                            onClick={() => {
                                if (item.route) navigate(item.route);
                                else setId(id !== item.label ? item.label : "");
                            }}
                        >
                            <div className={`${menu ? "flex" : "block"}`}>
                                <IconRenderer
                                    iconName={item.icon}
                                    style={{ fontSize: "20px" }}
                                    className={
                                        item.label === "Dashboard"
                                            ? "fa fa-tachometer text-sm text-white"
                                            : ""
                                    }
                                />
                                <h6 className={`${menu ? "ml-3 text-sm" : "pl-0 text-xs"}  `}>
                                    {item.label}
                                </h6>
                            </div>
                            {menu &&
                                item.arrow &&
                                (id == item.label ? (
                                    <KeyboardArrowDown style={{ fontSize: "20px" }} />
                                ) : (
                                    <KeyboardArrowRight
                                        style={{ fontSize: "20px" }}
                                        className=""
                                    />
                                ))}
                        </div>
                        {item?.subnavMenu.length > 1 && id === item.label && (
                            <div className="bg-white text-start absolute w-[150px]  ml-3 p-2 rounded-[5px]">
                                {item.subnavMenu?.map(({ label, route }, index1) => (
                                    <div
                                        key={`${label}-${index1}`}
                                        className="p-[4px] rounded-[5px] hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            if (route === '/logout') handleLogout()
                                            else navigate(route)
                                        }}
                                    >
                                        <p className="p-[4px] text-black leading-[0px] text-sm">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div
                className="p-1  text-center mt-4 mb-4 ml-4 flex justify-center  text-gray-300 bg-[#e9efef4a] w-[35px] rounded-[50%] cursor-pointer"
                onClick={() => dispatch({ type: 'OPEN_MENU', payload: !menu })}
            >
                {menu ? (
                    <KeyboardArrowLeft style={{ fontSize: "25px" }} />
                ) : (
                    <KeyboardArrowRight style={{ fontSize: "25px" }} />
                )}
            </div>
        </div >
    );
}