
import { useEffect, useState } from "react"
import { Table, Button, DialogContent, DialogContentText, } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";

export default function StudentList() {
    const FormData = useSelector((state) => state.FormDataReducer);
    const [userList, setuserList] = useState([])
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const dispatch = useDispatch();
    const [Isopen1, setIsopen1] = useState(false)
    const [Editable, setEditable] = useState(false)
    const [DataObj, setDataObj] = useState({ role_no: "", first_name: "", last_name: "", subject: "", photo: "", gender: "", pincode: "", city: "", state: "", country: "" })



    const handleEdit = (item) => {
        setDataObj(item)
        setEditable(true)
        setOpen(true)
    }

    const handleChange = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
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
                    setuserList(FormData)

                }
            });
    }

    var initialVal = {
        role_no: "",
        first_name: "",
        last_name: "",
        photo: "",
        subject: "",
        gender: "",
        pincod: "",
        country: "",
        state: "",
    }

    var valSchema = yup.object().shape({
        role_no: yup.string().required('role_no is Required'),
        first_name: yup.string().required('Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        last_name: yup.string().required('Name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        photo: yup.string().required('photo is Required!'),
        subject: yup.string().required('subject is Required'),
        gender: yup.string().required('Gender is Required'),
        pincode: yup.string().required('pincode is Required'),
        city: yup.string().required('city is Required'),
        country: yup.string().required('country is Required'),
        state: yup.string().required('state is Required'),
    });

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const handleSubmit = (values) => {
        if (Editable == true) {
            dispatch({ type: 'Update_Data', payload: values })
            setuserList(FormData)
            setIsopen1(false)
            setOpen(false)
        }
        else {
            var list = FormData
            list.push(values)
            dispatch({ type: 'Add_Data', payload: list })
            setuserList(FormData)
            setIsopen1(false)
            setOpen(false)

        }


    }
    return (
        <div className="main-div">
            <Button className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '500px', bottom: '10px' }} onClick={() => { setOpen(true) }}>Add New</Button>
            <Table responsive>
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
                {/* {console.log(FormData, 'formData')} */}
                {userList.map((item, index) => (
                    <tr> <td>{index + 1}</td>
                        <td>{item.role_no}</td>
                        <td><img src={item.photo} style={{ height: '50px', width: '50px', borderRadius: '10px' }} /></td>
                        <td>{item.first_name}{item.last_name}</td>
                        <td>{item.subject}</td>
                        <td>{item.gender}</td>
                        <td>{item.state}{item.city}{item.pincode},{item.country}</td>
                        <td><BorderColorIcon style={{ color: 'green' }} onClick={() => handleEdit(item, index)} /><DeleteIcon style={{ color: 'red', marginLeft: '10px' }} onClick={() => onDelete(item)} /></td>
                    </tr>
                ))}
            </Table>
            {(open) ?
                <DialogContent className='pay-card' style={{ marginTop: '-304px', left: '52%', width: '450px', marginLeft: "-84px", overflowY: "hidden", }}>
                    <DialogContentText id="alert-dialog-description">
                        <Formik initialValues={initialVal} validationSchema={valSchema} onSubmit={handleSubmit} >
                            {
                                (props) =>
                                (<Form >
                                    <div >
                                        <h3>Add New Data</h3>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-6">
                                                <Field
                                                    disabled={Editable}
                                                    value={props.values.role_no}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Role Number" name="role_no" type="text" className={` ${props.touched.role_no && props.errors.role_no ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="role_no">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-6">
                                                <Field
                                                    value={props.values.first_name}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="first_name" type="text" className={` ${props.touched.first_name && props.errors.first_name ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="first_name">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-6">
                                                <Field
                                                    value={props.values.last_name}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Last Name" name="last_name" type="text" className={` ${props.touched.last_name && props.errors.last_name ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="last_name">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.subject}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the subject" name="subject" type="text" className={` ${props.touched.subject && props.errors.subject ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="subject">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <select value={props.values.gender} onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    name="gender" type="text" className={` ${props.touched.gender && props.errors.gender ? `is-invalid` : `form-control`}`}>
                                                    <option value="">select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <ErrorMessage name="gender">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <select value={props.values.photo} onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    name="photo" type="text" className={` ${props.touched.photo && props.errors.photo ? `is-invalid` : `form-control`}`}>
                                                    <option value="">Select Profile</option>
                                                    <option value="https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1">Male</option>
                                                    <option value="https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?pid=ImgDet&rs=1">Female</option>
                                                    <option value="https://www.bing.com/images/search?view=detailV2&ccid=%2fVoTfUzE&id=89A24D493F004F5F1DA1D1B5DD2DDB46529277C0&thid=OIP._VoTfUzENldEmDbFEcQi4QHaHa&mediaurl=https%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_24787.png&exph=980&expw=980&q=Profile+Image+Icon&simid=608002670342536403&FORM=IRPRST&ck=52F3EC6626361115EE5C8D0FDCA1EA18&selectedIndex=0&idpp=overlayview&ajaxhist=0&ajaxserp=0">Other</option>
                                                </select>
                                                <ErrorMessage name="gender">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-5 mt-2"> <Button className="bg-primary color-white" onClick={() => setIsopen1(true)}>Add Address</Button></div>
                                            <div className="ml-3">
                                                {Isopen1 ?
                                                    <>
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-6">
                                                                <Field
                                                                    value={props.values.city}
                                                                    onKeyDown={handleEnter}
                                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                                    placeholder="Enter the city" name="city" type="text" className={` ${props.touched.city && props.errors.city ? `is-invalid` : `form-control`}`} />
                                                                <ErrorMessage name="city">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                            <div className="col-md-5 col-sm-6">
                                                                <Field
                                                                    value={props.values.state}
                                                                    onKeyDown={handleEnter}
                                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                                    placeholder="Enter the state" name="state" type="text" className={` ${props.touched.state && props.errors.state ? `is-invalid` : `form-control`}`} />
                                                                <ErrorMessage name="state">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-6">
                                                                <Field
                                                                    value={props.values.pincode}
                                                                    onKeyDown={handleEnter}
                                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                                    placeholder="Enter the pincode" name="pincode" type="text" className={` ${props.touched.pincode && props.errors.pincode ? `is-invalid` : `form-control`}`} />
                                                                <ErrorMessage name="pincode">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                            <div className="col-md-5 col-sm-6">
                                                                <Field
                                                                    value={props.values.country}
                                                                    onKeyDown={handleEnter}
                                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                                    placeholder="Enter the country" name="country" type="text" className={` ${props.touched.country && props.errors.country ? `is-invalid` : `form-control`}`} />
                                                                <ErrorMessage name="country">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                                            </div>
                                                        </div></>

                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <Button onClick={() => {
                                            setOpen(false)
                                        }
                                        } className="cancel" style={{ backgroundColor: "red" }}>Cancel</Button>
                                        <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '35px' }}>Submit</Button>
                                    </div>
                                </Form>)
                            }
                        </Formik>
                    </DialogContentText>
                </DialogContent> : ""
            }
            {(open1) ?
                <DialogContent className='pay-card' style={{ marginTop: '-304px', left: '52%', width: '221px', marginLeft: "-84px", overflowY: "hidden", }}>
                    <DialogContentText id="alert-dialog-description">
                        <Formik initialValues={initialVal} validationSchema={valSchema} onSubmit={handleSubmit} >
                            {
                                (props) =>
                                (<Form >
                                    <div >
                                        <h3>Edit Data</h3>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <Field
                                                    value={props.values.name}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="name" type="text" className={` ${props.touched.name && props.errors.name ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="name">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <Field
                                                    value={props.values.email}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Email" name="email" type="text" className={` ${props.touched.email && props.errors.email ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="email">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.phone}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="phone" type="text" className={` ${props.touched.phone && props.errors.phone ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="phone">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.age}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="age" type="text" className={` ${props.touched.age && props.errors.age ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="age">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <Field
                                                    value={props.values.designation}
                                                    onKeyDown={handleEnter}
                                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                                    placeholder="Enter the Name" name="designation" type="text" className={` ${props.touched.designation && props.errors.designation ? `is-invalid` : `form-control`}`} />
                                                <ErrorMessage name="designation">{msg => <div className="errText">{msg}</div>}</ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div >
                                        <Button onClick={() => {
                                            setOpen1(false)
                                        }
                                        } className="cancel" style={{ backgroundColor: "red" }} >Cancel</Button>
                                        <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '35px' }}>Save</Button>
                                    </div>
                                </Form>)
                            }
                        </Formik>
                    </DialogContentText>
                </DialogContent> : ""
            }
        </div>
    )

}