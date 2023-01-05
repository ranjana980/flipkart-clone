import React from 'react'
import { useEffect, useState } from "react"
import { Table, Button, DialogContent, DialogContentText, } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import * as yup from 'yup';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
export default function ListForm() {
    const navigate = useNavigate()
    const { dataList } = useSelector((state) => state.FormDataReducer);
    const [userList, setuserList] = useState([])
    const dispatch = useDispatch();


    useEffect(() => {
        setuserList(dataList)
    }, [dataList])


    const handleEdit = (item) => {
        dataList.map((item) => {
            if (item == item) {
                dispatch({ type: "View_Data", payload: item })
                navigate('/EditForm')
            }
        })
    }
    const onDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    dispatch({ type: 'Delete_Data', payload: id })
                    console.log(dataList, 'list')
                }
            });
    }
    return (
        <div className="main-div">
            <Link to="/AddForm"> <Button className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '500px', bottom: '10px' }} >Add New</Button></Link>
            <Table responsive="true">
                <thead>
                    <tr style={{ background: 'skyblue' }}>
                        <th>S.No</th>
                        <th>Role No</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((item, index) => (
                        <tr key={item.role_no}> <td>{index + 1}</td>
                            <td>{item.role_no}</td>
                            <td><img src={item.photo} style={{ height: '50px', width: '50px', borderRadius: '10px' }} /></td>
                            <td>{item.first_name}{item.last_name}</td>
                            <td>{item.subject}</td>
                            <td>{item.gender}</td>
                            <td>{item.state}{item.city}{item.pincode},{item.country}</td>
                            <td><BorderColorIcon style={{ color: 'green' }} onClick={() => handleEdit(item)} /><DeleteIcon style={{ color: 'red', marginLeft: '10px' }} onClick={() => onDelete(item)} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
