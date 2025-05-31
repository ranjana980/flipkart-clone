import sliderImg1 from "../assests/images/flight.jpg";
import sliderImg2 from "../assests/images/furtniure.jpg";
import sliderImg3 from "../assests/images/phones.jpg";


export const bannerSliderItems = [
  { image: sliderImg1 },
  { image: sliderImg2 },
  { image: sliderImg3 },
];

export const navBarItems = [
  {
    label: "Dashboard",
    icon: "Dashboard",
    arrow: false,
    route: "/dashboard",
    subnavMenu: [],
    border: true,
  },
  ,
  {
    label: "Users",
    icon: "Group",
    arrow: true,
    subnavMenu: [
      { label: "User List", route: "/admin/user-list" },
      { label: "Add User", route: "/admin/add-user" },
    ],
    border: false,
  },
  {
    label: "Products",
    icon: "ListAlt",
    arrow: true,
    subnavMenu: [
      { label: "Product List", route: "/admin/product-list" },
      { label: "Add Porduct", route: "/admin/add-product" },
    ],
    border: false,
  },
  {
    label: "Settings",
    icon: "Settings",
    arrow: true,
    subnavMenu: [
      { label: "Payment option", route: "/payment" },
      { label: "Logout", route: "/" },
    ],
    border: false,
  },

];

export const productColumns = [
  { header: 'Title', accessor: 'title' },
  { header: 'Category', accessor: 'category' },
  { header: 'SubCategory', accessor: 'subCategory' },
  { header: 'Delivery Charges', accessor: 'deliveryCharges' },
  { header: 'Price', accessor: 'price' },
  { header: 'Image', accessor: 'image' },
  { header: 'Rating', accessor: 'rating' },
  { header: 'Action', accessor: 'action' },
];

export const userColumns = [
  { header: 'Name', accessor: 'first_name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Phone', accessor: 'phone' },
  { header: 'Login Status', accessor: 'is_logged_in' },
  { header: 'Verification', accessor: 'verification' },
  { header: 'Role', accessor: 'role' },
  { header: 'Profile Image', accessor: 'image' },
  { header: 'Total Orders', accessor: 'orders' },
  { header: 'Total Item into Cart', accessor: 'cart' },
  { header: 'Action', accessor: 'action' },
];
