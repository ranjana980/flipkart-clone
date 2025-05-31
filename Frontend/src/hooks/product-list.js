import { useDispatch, useSelector } from "react-redux";
import { addProductAction, deleteProductAction, getProductsAction, updateProductAction } from "../entities/product-reducer";
import { Delete, Edit } from "@material-ui/icons";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { productValues } from "../pages/admin/helper";

export default function useProducts() {
    const [modal, setModal] = useState(false);
    const [sizeArray, setSizeArray] = useState([]);
    const dispatch = useDispatch()
    const { menu } = useSelector((state) => state.style)
    const { productList } = useSelector((state) => state.products)
    const [productValue, setProductValue] = useState(productValues)

    useEffect(() => {
        dispatch(getProductsAction())
    }, [])


    const handleSubmit = async (values) => {
        const onSuccess = (data) => {
            if (data.code == 200) {
                swal({
                    title: "Success",
                    text: "SuccessFully Added",
                    icon: "success",
                    button: "Okay",
                });
            } else {
                swal({
                    text: data.msg,
                    icon: "Danger",
                    button: "Okay",
                });
            }
            setModal(false);
        }
        if (values?._id)
            dispatch(updateProductAction(values?._id))
        else
            dispatch(addProductAction(values, onSuccess))
    };

    const handleChange = (e, setFieldValue) => {
        if (e.target.name == "size") {
            if (!sizeArray.includes(e.target.value))
                setSizeArray([...sizeArray, e.target.value]);
            setFieldValue(e.target.name, sizeArray);
        } else if (e.target.name == "item_photo") {
            setFieldValue(e.target.name, sizeArray);
            const formData = new FormData();
            const file = e.target.file[0]
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    formData.append("item_photo", reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFieldValue(e.target.name, sizeArray);
            setFieldValue(e.target.name, e.target.value);
        }
    };


    const handleDelete = (id) => {
        dispatch(deleteProductAction(id))
    }

    const handleViewProduct = (id) => {
        setProductValue(productList?.find((item) => item?._id === id))
        setModal(!modal)
    }

    const updatedList = productList?.map((item) => {
        return {
            ...item, image: <img src={item?.image} className="w-[25px] h-[25px] rounded-full" />, action: <div className="flex gap-2 "><Edit className="text-[green] cursor-pointer" onClick={() => handleViewProduct(item?._id)} />
                < Delete className="text-[red]  cursor-pointer" onClick={() => handleDelete(item?._id)} /></div>
        }
    })


    return { modal, updatedList, menu, handleChange, handleDelete, handleSubmit, setModal }
}