import { Close } from "@material-ui/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const UserForm = ({
    initialValues,
    validationSchema,
    handleSubmit,
    userObjArray,
    buttonText,
    handleChange,
}) => {

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <Form >
                    <div className="row d-flex justify-content-center ">
                        <Close className="text-black" />
                        <h5 className="text-center mt-3">{props?.values?._id ? "Edit" : "Add"} User</h5>
                        {userObjArray.map(({ name, placeHolder, intputType }) => (
                            <div className="col-md-8 col-sm-12">
                                <label>{placeHolder}</label>
                                <Field
                                    value={props?.values?.[name]}
                                    onKeyDown={handleEnter}
                                    onChange={(e) => handleChange(e, props.setFieldValue)}
                                    placeholder={placeHolder}
                                    name={name}
                                    type={intputType}
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
                            {buttonText}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
