import { Formik, Form, Field, ErrorMessage } from "formik";

export const ProductForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
  productArrObj,
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
        <Form>
          <div className="row d-flex justify-content-center">
            <h5 className="text-center mt-3">Add New Product</h5>
            {productArrObj.map(({ name, label, type }) => (
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
              {buttonText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
