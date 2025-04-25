import * as yup from "yup";

var productValues = {
  item_name: "",
  original_price: "",
  price: "",
  size: "",
  free_deliver: "",
  item_photo: "",
};

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

export { productValues, productSchema,productObjArray };
