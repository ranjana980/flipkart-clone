import * as yup from "yup";

const signUpValues = {
  full_name: "",
  phone: "",
  email: "",
  profile_pic: "",
  password: "",
};

const signUPSchema = yup.object().shape({
  full_name: yup
    .string()
    .required("Name is Required!")
    .matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name")
    .min(3, "Invalid Name"),
  profile_pic: yup.string().required("Profile Image is Required!"),
  phone: yup.string().required("Mobile Number is Required"),
  email: yup.string().required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const loginValues = {
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const loginObjArray = [
  { name: "email", label: "Enter Your Email",type:'text' },
  { name: "password", label: "Enter Your Password",type:'text' },
];

const signUpObjArray = [
    { name: "full_name", label: "Enter Your Name",type:'text' },
    { name: "phone", label: "Enter Your Mobile Number",type:'text' },
    { name: "email", label: "Enter Your Email",type:'text' },
    { name: "password", label: "Enter Your Password",type:'text' },
    { name: "profile_pic", label: "",type:'file' },
  ];

export { signUpValues, signUPSchema, loginValues, loginSchema, loginObjArray,signUpObjArray };
