import { useEffect, useState } from 'react'
import { Table, Button, DialogContent, DialogContentText, } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import swal from 'sweetalert';
import { useSelector, useDispatch } from "react-redux";
export default function EditForm() {
    const { dataObj, dataList } = useSelector((state) => state.FormDataReducer);
    const history = useNavigate()
    const dispatch = useDispatch();
    const [Isopen1, setIsopen1] = useState(false)
    function handleFileChange(e,setFieldValue) {
        setFieldValue(e.target.name,URL.createObjectURL(e.target.files[0]) )
    }
    var initialVal = {
        role_no: dataObj.role_no,
        first_name: dataObj.first_name,
        last_name: dataObj.last_name,
        photo: dataObj.photo,
        subject: dataObj.subject,
        gender: dataObj.gender,
        pincode: dataObj.pincode,
        country: dataObj.country,
        state: dataObj.state,
        city:dataObj.city
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

    const handleChange = (e, setFieldValue) => {
        setFieldValue(e.target.name, e.target.value)
    }

    const handleSubmit = (values) => {
        const index = dataList.findIndex(object => {
            return object.role_no == values.role_no;
          })
        dataList[index]=values
        dispatch({ type: 'Edit_Data', payload: dataList })
        history('/')
    }

    return (
        <div>
            <DialogContent className='pay-card' style={{ marginTop: '-304px', left: '30%', width: '450px', marginLeft: "-84px", overflowY: "hidden", }}>
                <DialogContentText id="alert-dialog-description">
                    <Formik initialValues={initialVal} validationSchema={valSchema} onSubmit={handleSubmit} >
                        {
                            (props) =>
                            (<Form >
                                <div >
                                    <h3>Edit Data</h3>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-6">
                                            <Field
                                                disabled={true}
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

                                    <Button type="submit" className="cancel" style={{ backgroundColor: "#248adb", right: '0px', left: '35px' }}>Submit</Button>
                                </div>
                            </Form>)
                        }
                    </Formik>
                </DialogContentText>
            </DialogContent>
        </div>
    )
}
