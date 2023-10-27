import { useState } from "react";
import { Modal } from "reactstrap";
import { ProductForm } from "./form";
import { productObjArray, productSchema, productValues } from "./helper";
import axios from "axios";
import swal from "sweetalert";

export const ProductList = () => {
  const [modal, setModal] = useState(false);
  const [sizeArray, setSizeArray] = useState([]);

  const handleSubmit = async (values) => {
    console.log(values, "vals");
    const result = await axios.post(
      "http://localhost:5000/api/e-commerce/addDetails",
      values
    );
    if (result.data.code == 200) {
      swal({
        title: "Success",
        text: "SuccessFully Added",
        icon: "success",
        button: "Okay",
      });
    } else {
      swal({
        text: result.data.msg,
        icon: "Danger",
        button: "Okay",
      });
    }
    setModal(false);
  };

  const handleChange = (e, setFieldValue) => {
    if (e.target.name == "size") {
      if (!sizeArray.includes(e.target.value))
        setSizeArray([...sizeArray, e.target.value]);
      setFieldValue(e.target.name, sizeArray);
    } else if (e.target.name == "item_photo") {
      setFieldValue(e.target.name, sizeArray);
      const formData = new FormData();
      formData.append("item_photo", e.target.files[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:5000/api/e-commerce/upload", formData, config)
        .then((response) => {
          setFieldValue(e.target.name, response.data.msg);
        })
        .catch((error) => {});
      //
    } else {
      setFieldValue(e.target.name, sizeArray);
      setFieldValue(e.target.name, e.target.value);
    }
  };

  return (
    <div>
      <button onClick={() => setModal(true)}> add Product</button>
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        backdrop={true}
        keyboard={false}
      >
        <ProductForm
          buttonText="Add"
          initialValues={productValues}
          validationSchema={productSchema}
          handleSubmit={handleSubmit}
          productArrObj={productObjArray}
          handleChange={handleChange}
        />
      </Modal>
    </div>
  );
};
