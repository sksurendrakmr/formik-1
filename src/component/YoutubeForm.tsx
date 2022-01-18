import React from "react";
import "../App.css";

import { useFormik } from "formik";
import * as Yup from "yup";

/**
 * In this component we create a form and
 * manage the form state, handling form submission
 * and validation and display error message using formik
 */

/**
 * Step1 : Import a hook called useFormik which the library provides.
 *
 *
 *         This useFormik hooks takes in an object as its parameter and
 *         this hook then return an object which contains a variety of
 *         useful properties and methods that we can use with our form.
 *
 *         The object that we get as a return value is going to help us
 *         with :-
 *         1) Managing the form state
 *         2) Handling form submission
 *         3) Validation and error messages.
 *
 *      The object that useFormik takes as an arguments contains
 *      1) initialValues properties which is an object and it contains
 *         the initial values for all our form fields.
 *      2) The properties for initialValues (in our case name, email and channel)
 *         must corresponds to the name attribute of the individual fields.
 *
 *
 * Step 2: We need to add the onChange and the value prop for each of the
 *         form fields. This is require to ensure the form fields are tracked in
 *         react by formik.
 */

/**
 *How to get hold of form state when the user clicks on the submit button?
 *Step 1: We need to specify the onSubmit handler on the form tag.
 *        This is going to be equal to handleSubmit method provided by formik.
 *
 *        By doing above step, formik will automatically tied the onSubmit method
 *        to the submit event.
 *
 * Step 2: onSubmit method that we are passing as an argument in useFromik hook
 *         is automatically receives the form state as its argument.
 */

/**
 * The validation rules that we are going to apply for this form fields.
 * 1) All fields are required and has to be filled.
 * 2) Proper email format
 *
 *
 *
 * Formik let us define a validation function and that validation function
 * needs to be assigned to a property called validate in the object that
 * we pass to the useFormik.
 *
 * vaidate property that we have useFormik object argument, receives
 * the values object as its argument.
 *
 */

type FromFields = {
  name: string;
  email: string;
  channel: string;
};

const initialValues = {
  name: "",
  email: "",
  channel: "",
};

const onSubmit = (values: FromFields) => {
  console.log("Form data", values);
};

/**This validate function is a function that must satisfy some
 *conditions for formik to work as inteded.
 *
 * The conditions are:-
 * 1) This function must return an object.
 * 2) The keys of the errors object should be similar to that of the
 *    values object (i.e. this keys will correspond to the name attribute of the three form fields).
 * 3)The value of these keys should be string indicating what the error message
 *   should be for that particular field.
 */
const validate = (values: FromFields) => {
  const { name, email, channel } = values;
  let errors: FromFields = {
    name: "",
    email: "",
    channel: "",
  };

  if (!name) {
    errors.name = "Required";
  }
  if (!email) {
    errors.email = "Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) {
    errors.email = "Invalid email format";
  }
  if (!channel) {
    errors.channel = "Required";
  }
  return errors;
};

/**
 * Lecture 9
 * How do we keep track of the fields the user has interacted with.
 * (How do we keep track of the visited fields in a form)
 *
 * If we have to track whether a form fields has been visited,
 * we have to add onBlur prop on the form input element.
 * And in this prop, we have to pass handleOnBlur method provided by
 * formik.
 *
 * Where does formik store the information about visited fields??
 * It stores it in an object called touched. This object has the same shape
 * as the values object.
 */

/**
 * Lecture - 11
 * An alternate way of writing validation rules with formik.
 * This alternate way depends on a library called YUP (Mainly used for object schema validation).
 *
 * Step 1 - we need to write a validation schema object.
 *
 * Yup.object() -> Here inside object, as argument we pass in an object which contains the rules
 * for each of the form fields.
 *
 * Step 2 - Pass this schema (in our case validationSchema) in useFromik hook.
 */

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const YoutubeForm = () => {
  const { handleChange, values, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  /**
   * values ==> An Object provided by formik. This object always reflects
   *            the state of the form.
   * handleChange, handleBlur => It's a formik helper to update the values object.
   *
   * errors => It's an object with key-values pairs for each of the form fields
   *           which has error string message.
   *
   * toched -> Object that store information about wheather a field is visited or not.
   *            If its has been visited, the property would be present with a value of true.
   */

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <div className="error">{errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <div className="error">{errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            value={values.channel}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.channel && errors.channel && (
            <div className="error">{errors.channel}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default YoutubeForm;
