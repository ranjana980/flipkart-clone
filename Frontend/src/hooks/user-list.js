import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@material-ui/icons";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { addUserAction, deleteUserAction, updateUserAction, getUserAction } from "../entities/user-reducer";
import { userValue } from "../pages/admin/helper";

export default function useUsers() {
    const [modal, setModal] = useState(false);
    const [sizeArray, setSizeArray] = useState([]);
    const dispatch = useDispatch()
    const { menu } = useSelector((state) => state.style)
    const { userList } = useSelector((state) => state.users)
    const [userValues, setUserValues] = useState(userValue)

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
            dispatch(updateUserAction(values?._id, values))

        else
            dispatch(addUserAction(values, onSuccess))
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

    useEffect(() => {
        dispatch(getUserAction())
    }, [])

    const handleDelete = (id) => {
        dispatch(deleteUserAction(id))
    }

    const handleViewUser = (id) => {
        setUserValues(userList?.find((item) => item?._id === id))
        setModal(!modal)
    }

    const updatedList = userList?.map((item) => {
        return {
            ...item, image: <img src={item?.image} className="w-[25px] h-[25px] rounded-full" />, action: <div className="flex gap-2 "><Edit className="text-[green] cursor-pointer" onClick={() => handleViewUser(item?._id)} />
                <Delete className="text-[red]  cursor-pointer" onClick={() => handleDelete(item?._id)} /></div>
        }
    })


    return { modal, updatedList, menu, userValues, handleChange, handleSubmit, setModal }
}