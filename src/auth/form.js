import { Formik, Form, Field, ErrorMessage } from "formik";
import { Close } from "@material-ui/icons";

export const AuthForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
  authArrObj,
  buttonText,
  bottomHeading,
  routeText,
  handleFormChange,
  handleChange,
  onClose,
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
    <div className="col-span-7">
      <Close
        className="relative float-right cursor-pointer text-[35px]"
        style={{ zIndex: "999" }}
        onClick={onClose}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-8 col-sm-6 d-flex justify-content-center">
                  <img
                    src={
                      props.values.profile_pic
                        ? props.values.profile_pic
                        : "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
                    }
                    style={{
                      borderRadius: "50%",
                      height: "100px",
                      width: "100px",
                    }}
                  />
                </div>
                {authArrObj.map(({ name, label, type }) => (
                  <div className="col-md-8 col-sm-12">
                    <Field
                      value={props?.values?.[name]}
                      onKeyDown={handleEnter}
                      onChange={(e) => handleChange(e, props.setFieldValue)}
                      placeholder={label}
                      name={name}
                      type={type}
                      className={` ${
                        props?.touched?.[name] && props?.errors?.[name]
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
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                type="submit"
                className="mt-1 bg-blue-600 w-32 p-1  ml-4"
                style={{
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {buttonText}
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <h6 className="text-blue-600 text-center mt-2">
                {bottomHeading}
              </h6>
              <button
                type="button"
                className="mt-1 text-blue-600   p-1   mb-2"
                style={{ fontSize: "15px", fontWeight: "600" }}
                onClick={() => handleFormChange(routeText)}
              >
                {routeText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
