import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { userSchema, userValue, profileForm } from "../../admin-product/helper";

export default function UserProfile() {
    const handleSubmit = async () => {

    }
    const handleEnter = () => {

    }
    const handleChange = () => {

    }

    return (<Formik
        initialValues={userValue}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
    >
        {(props) => (
            <Form>
                <div className="row d-flex justify-content-center">
                    <h5 className="text-center mt-3">Edit Your Profile</h5>
                    {profileForm.map(({ name, label, type }) => (
                        <div className="col-md-8 col-sm-12">
                            <Field
                                value={props?.values?.[name]}
                                onKeyDown={handleEnter}
                                onChange={(e) => handleChange(e, props.setFieldValue)}
                                placeholder={label}
                                name={name}
                                type={type}
                                className={` ${props?.touched?.[name] && props?.errors?.[name]
                                    ? `is-invalid`
                                    : `form-control`
                                    }`}
                            />
                            <ErrorMessage name={name}>
                                {(msg) => <div className="errText">{msg}</div>}
                            </ErrorMessage>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button
                        type="submit"
                        className="mt-1 bg-blue-600 w-32 p-1  ml-4 mb-5"
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
    </Formik>)
}