import {
  ErrorMessage,
  FastField,
  Field,
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
} from "formik";
import React from "react";
import * as Yup from "yup";
import { TextError } from "./TextError";
/**
 * Lecture -26
 * To be able to trigger validations manually, formik provides
 * us with two helper methods.
 * In order to access these methods though, we need to use the render
 * props pattern on the entire form itself.
 *
 * We will have function as children i.e render props on the top-level
 * Formik component.
 * The function will receive some props which we are going to call as
 * formik and then return the entire form component.
 *
 * Initially, after adding helper methods on onClick method of button,
 * when we try to test it, we will see any error message.
 * Because, even though the error object get populated but touched object
 * will be empty. This is the reason, none of the error messages are being displayed.
 *
 * To fix this issues, we can make use of two other helper method.
 * 1) setFieldToched - This will add that particular field to the touched object.
 * 2) setTouched - Add multiple fields to the touched object.
 *
 */

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const validateComments = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values: any) => {
  console.log("Form data", values);
};
export const YoutubeFormManualTrigger = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {/* with formik props, we can control everything that has to do with our form */}
      {(formik) => {
        console.log("Formik props", formik);
        return (
          <Form>
            <label htmlFor="name">Name</label>
            <div>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>

            <div>
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel">
                {(errorMsg: string) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                type="text"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              {/* With FastField component, the log will not render until we 
          change the state of address field. */}
              <FastField type="text" id="address" name="address">
                {(props: any) => {
                  console.log(props);
                  // this funtion will return JSX, in our case an input element for address
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error && <div>{meta.error}</div>}
                    </div>
                  );
                }}
              </FastField>
              <ErrorMessage name="address" />
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook Profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter Profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone Number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone Number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label htmlFor="">List of Phone Numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps: FieldArrayRenderProps) => {
                  console.log("fieldArrayProps", fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  // Iterate through this pNumbers array and render a Field
                  // component for each value in that array.
                  return (
                    <div>
                      {phNumbers.map((phNumber: string, index: number) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {/* we also need buttons for user to add or remove 
                      the fields dynamically 
                      and for the click handler of this button, we will make use of remove and push functions*/}

                          {/* we are disabling remove button from first input */}
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}

                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* Field name (here comments) */}
            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              validate comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit comments
            </button>
            {/* In setTouched method,as an argument,we have to specify an 
            object which contains all the fields that we want to have touched set to true.  */}
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit all fields
            </button>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};
