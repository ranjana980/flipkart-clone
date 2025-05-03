import * as yup from "yup";

var productValues = {
  item_name: "",
  original_price: "",
  price: "",
  size: "",
  free_deliver: "",
  item_photo: "",
};

const userValue = {
  first_Name: "",
  last_name: "",
  profile_image: "",
}

var productSchema = yup.object().shape({
  item_name: yup
    .string()
    .required("Name is Required!")
    .matches(/^([A-Za-z ])+$/, "Invalid Name")
    .min(3, "Invalid Name"),
  original_price: yup.string().required("Original Price is Required!"),
  price: yup.string().required("Price is Required"),
  size: yup.array().required("Size is Required"),
  free_deliver: yup.string().required("Free Deliver is Required"),
  item_photo: yup.string().required("Item Photo is Required"),
});

const productObjArray = [
  { name: "item_name", label: "Enter Item Name", type: "text" },
  {
    name: "original_price",
    label: "Enter Product Original Price",
    type: "text",
  },
  { name: "price", label: "Enter Product Price", type: "text" },
  { name: "size", label: "Enter Product Sizes", type: "text" },
  { name: "free_deliver", label: "Select Free Delivery", type: "text" },
  { name: "item_photo", label: "", type: "file" },
];

const profileForm = [{
  name: "name", placeHolder: "First Name", inputType: "text"
},
{
  name: "lastName", placeHolder: "Last Name", inputType: "text"
},
{
  name: "role", placeHolder: "Role", inputType: "text"
},
{ name: "gender", placeHolder: "Gender", inputType: "text" },
{ name: "profileImage", placeHolder: "Profile Image", intputType: "file" }
]

const userSchema = yup.object().shape({
  first_Name: yup
    .string()
    .required("Name is Required!")
    .matches(/^([A-Za-z ])+$/, "Invalid Name")
    .min(3, "Invalid Name"),
  last__Name: yup
    .string()
    .required("Name is Required!")
    .matches(/^([A-Za-z ])+$/, "Invalid Name")
    .min(3, "Invalid Name"),
  profile_imgae: yup.string().required("Profile image is Required!")
});

export { productValues, productSchema, productObjArray, profileForm, userValue, userSchema };
