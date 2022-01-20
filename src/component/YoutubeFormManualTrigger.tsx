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

/**
 * Lecture - 27
 *  Most common scenario where we want submit button to be disable :-
 * 1) validity of the form state
 * 2) Form submission in progress
 *
 * Scenario 1
 * We want submit button to be disabled if the form state is invalid.
 *
 * To implement this functionality, we need to understand some
 * properties in the formik props object.
 *
 * 1) isValid -> it's a read only property that is set to true if
 *               the errors object is empty.
 *
 * Thus, isValid is a property that lets us know if the form has
 * no errors at any given time. So we can use this property to disable
 * the submit button.
 *
 * Even after making the changes in submit button, we will observe the submit
 * button is not disabled.
 * Since when page load, errors object will be empty so isValid will be true.
 *
 * There are two ways to solve this :
 * 1) Add validateOnmount props on the Fromik component and set it to true.
 *
 * On page load as soon as the form mounts on the DOM, formik will run the validation
 * against each fields and populate the errors object.
 *
 * Drawback of this approach
 * If we have a form with 20 or 30 fields with complex validation,
 * It really doesn't make sense to run all the validation rules even
 * before the user typed in a single letter.
 *
 * So this approach of using validateOnMount is suitable for a form with
 * very few fields with simple validations.
 *
 *Other approach
 * We will use another property present in the formik props object.
 * dirty ->  boolean value which indicated if at least one of the form
 *           fields value has changed since it was initialized.
 *
 * This approach will only work if on page load, the form field will always invalid.
 * If we know for a fact the user will interact with our form and enter values which will
 * never be the same values as the initial values object then we can stick to this approach.
 */

/**
 * Lecture 28
 * Disabling submit button in progress
 *
 * To acheive this, we can make use of a property of formik props object.
 * isSubmitting -> a boolean property which formik is set to true
 *                 if a form submission has been attempted.
 *
 * So All we have to do is check if isSubmitting is true and if it is then
 * disabled the submit button.
 *
 * By default, if we click submittton, formik will automatically set
 * isSubmitting to true and that would disable the submit button.
 * Once the validation completes if at all there were errors,
 * formik will automatically set isSubmitting to false and that is
 * the reason the submit button is enabled again.
 *
 * If we submit the form with valid data, the data will be submitted but
 * submit button will be still disabled and this is an intended behaviour
 * because formik doesn't know when our API is going to respond back.
 *
 * So we have to manually set isSubmitting to false again and
 * the way to do that is in the onSubmit method.
 *
 * onSubmit recieve second props / arguments
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

const onSubmit = (values: any, onSubmitProps: any) => {
  console.log("Form data", values);
  onSubmitProps.setSubmitting(false); //update isSubmitting to false which will in turn enable the submit button
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
            {/* Now we are telling formik to disable the submit button if
             the user has changed any field value and the form is not in a valid state */}
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
