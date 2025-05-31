import { ErrorMessage, Field, Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userObjArray, userSchema } from "../../admin/helper";
import { updateUserAction } from "../../../entities/user-reducer";

export default function EditUser() {
    const { user } = useSelector((state) => state.auth)
    const [userValue, setUserValue] = useState(user)
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        dispatch(updateUserAction(values?._id))
    }

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
        setUserValue({ ...userValue, [e.target.name]: e.target.value })
    }

    return (
        <Formik
            initialValues={userValue}
            validationSchema={userSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form className="flex flex-col justify-center items-center">
                    <h5 className="text-center mt-3">Edit Your Profile</h5>
                    <div className="grid grid-cols-10 gap-3 w-[35%] p-5 border-[1px] border-gray-500 mb-4 rounded">
                        {userObjArray.map(({ name, placeHolder, intputType, options }, index) => (
                            <div className={`${index === userObjArray?.length - 1 ? "col-span-10" : "lg:col-span-5"}`}>

                                <label className="flex justify-start text-start">{placeHolder}<b className="text-red-500 ml-1 mt-1">*</b></label>
                                {intputType !== 'select' ?
                                    <>
                                        <Field
                                            value={props?.values?.[name]}
                                            onKeyDown={handleEnter}
                                            onChange={(e) => handleChange(e, props.setFieldValue)}
                                            placeholder={`Enter the ${placeHolder}`}
                                            name={name}
                                            disabled={name === "role" || name === "email"}
                                            type={intputType}
                                            className={` ${props?.touched?.[name] && props?.errors?.[name]
                                                ? `is-invalid`
                                                : `form-control`
                                                }`}
                                        />
                                        <ErrorMessage name={name}>
                                            {(msg) => <div className="errText">{msg}</div>}
                                        </ErrorMessage> </> :
                                    <>
                                        <Field
                                            as={'select'}
                                            value={props?.values?.[name]}
                                            onKeyDown={handleEnter}
                                            onChange={(e) => handleChange(e, props.setFieldValue)}
                                            placeholder={`Enter the ${placeHolder}`}
                                            name={name}
                                            className={` ${props?.touched?.[name] && props?.errors?.[name]
                                                ? `is-invalid`
                                                : `form-control`
                                                }`}


                                        >{options.entries.map((key, value) => (
                                            <option value={value}>{key}</option>
                                        ))}
                                        </Field>
                                        <ErrorMessage name={name}>
                                            {(msg) => <div className="errText">{msg}</div>}
                                        </ErrorMessage>
                                    </>}
                            </div>))}

                        <button
                            type="submit"
                            className="mt-1 bg-blue-600 col-span-10 p-2 rounded  ml-4 mb-5 c"
                            style={{
                                color: "white",
                                fontSize: "15px",
                                fontWeight: "600",
                            }}
                        >
                            update
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}