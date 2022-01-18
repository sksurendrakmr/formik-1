import React from "react";
import "../App.css";

import { Formik, Form, Field } from "formik";
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

/**
 * Lecture - 12
 * In all the form fields, three props are sort of
 * similar across the fields.
 * i.e. onChange, onBlur, value
 *
 * So formik provides an alternate way for reducing this boilerplate code for every field in this form.
 * Formik provides us a helper method called getFieldProps which behind the scene
 * add these props for us
 *
 */

/**
 * Lecture - 13
 * Formik components
 * In previous lecture, we have made use of getFieldProps helper method
 * to reduce some boilerplate code.
 *
 * But still, we have to manully pass each input the getFieldProps helper method.
 *
 * To save us more time, formik provides a few components that implicitly
 * uses react context to make our code less verbose.
 *
 * We can make use of four components that formik provides :
 * 1. Formik
 * 2. Form
 * 3. Field
 * 4. ErrorMessage
 *
 *
 * Steps to Implement Fromik component
 *
 * Fromik component is a replacement of useFromik hook.
 * The argument which we passed to useFromik as an object will be
 * passed in as props to the formik component.
 *
 * step 1 - import Formik instead of useFormik.
 * Step 2 - Remove the call of useFromik
 * Step 3 - wrap our entire form with Fromik component and pass the required props
 *
 * This Formik component behaves as a context provider component that provides
 * the different properties and helper methods for other three components
 * (provided by formik library i.e. Form, Field,ErrorMessage)
 */

/**
 * Lecture - 14
 * Form Component
 * Step 1 - Import From from formik
 * Step 2 - Replace the html form element with Form component
 * Step 3 - Remove onSubmit prop
 *
 * Because From component is a small wrapper around the HTML form element
 * that automatically hooks into formik handleSumit method.
 *
 * Thus, Form component helps us by automatically linking the onSubmit
 * method to our form submitEvent.
 */

/**
 * Field Component
 * Simplifies the code for a form field.
 *
 * Right now, we are passing getFieldProps helper method passing in
 * the name attribute value. Formik seen this as a common pattern which can
 * be abstracted and provides us with the Field component to simplify the code.
 *
 *
 * Step 1 - Import field from formik.
 * Step 2 - Replace each input tag with the Field component.
 * Step 3 - Get rid of getFieldProp Helper method from each of the field.
 *
 * Field component does three things :-
 * 1) It will behind the scenes hook up inputs to the top-level Formik component.
 * 2) It uses the name attribute to match up with the formik state.
 * 3) By default field will render an input element which is what YoutubeForm had as well.
 */

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const YoutubeForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <div>
          <Field type="text" id="name" name="name" />
          {touched.name && errors.name && (
            <div className="error">{errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          {touched.email && errors.email && (
            <div className="error">{errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="channel">Channel</label>
          <Field type="text" id="channel" name="channel" />
          {touched.channel && errors.channel && (
            <div className="error">{errors.channel}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
