import React from "react";
import "../App.css";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FieldArrayRenderProps,
} from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError";

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
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
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

/**
 * Lecture - 16
 * ErrorMessage Component
 *
 * At the moment for displaying error messages we check if the field
 * has been visited and check if the error exists and if does, we render the error.
 *
 * It's again seems like a pattern across different form fields and
 * when there is a pattern formik wants to help us out.
 *
 * Step 1 - Import Error Message from Fromik
 * Step 2- Replace the block of code rendering the block message with
 *         the ErrorMessage Component.
 * Step 3 - Pass in a name prop which is equal to the name attribute on
 *          the Field Component.
 *
 *
 * ErrorMessage Component behind the scene will take care for rendering
 * the error message for particular field indicated by the name prop
 * only if the field has been visited and if the error exists.
 */

/**
 * Lecture 18
 * In Field component, by default it renders a HTML input element.
 * Behind the scene, it hooks up the input element to formik i.e.
 * it's hooks up handleChange, handleBlur and the value of the form fields.
 *
 * 1) The Field Component will pass through any additional props that we
 *   specify to the input element.
 * 2) Ability to render a different element other than the input element.
 *    To instruct formik to render different element (other than input element),
 *    we simply need to add 'as' props and pass the elementName (E.g. textarea)
 *
 * The 'as' props can only accept value either input or textarea or select
 * or a custom react component as well.
 * It's default value is input.
 *
 * Instead of 'as' props, we can also use 'component' props.
 *
 * The internal implementation of component and as props are slightly
 * different though.
 *
 * Summary
 * Field component accepts 'as' props to decide what element to render.
 *
 * 3) renderprops pattern
 *    It will give more fine-grined control over the rendering and
 *    behaviour of our form field.
 *
 *    Let's say, we need to render another input element to collect
 *    the user's address.
 *
 * With renderprops pattern, we use function as children to the component.
 *
 * When renderProps pattern??
 * When we want to use custom components in our form and we want them
 * to be hooked in the formik.
 *
 */

/**
 * Lecture -19
 * ErrorMessage Component accepts a name props and renders the error message
 * for that particular field if the field has been visited and an error message
 * exists for that fields.
 *
 * If we inspect that element, we observe that that is plain text (it is not wrapped in HTML element)
 *
 * To inform the ErrorMessage component to wrap the error message with as HTML
 * element, we need to use component prop.
 * We can also wrap the error message within custom react component.
 *
 * We will create a component and render the error message text as red color
 * and then pass the component in the component props of ErrorMessage component.
 *
 *
 * An alternative of this is to use renderProps pattern.
 */

/**
 * Lecture - 20
 * Sometimes, we might want / need to group together some data into
 * its own separate object.
 * The reason could be that the API accepts the data in such a manner
 * or the database stores the data in particular format.
 *
 * Thus, we want to group together some of the fields in our form
 * for that we can make use of nested object.
 *
 * Scenario
 * The youtube form should also collect information about the social
 * presence that the user has. So the form will ask the user for their
 * facebook and twitter profiles.
 * Since they are related, we want them to be grouped and stored
 * as the nested object.
 *
 * Steps
 * 1)On the initialValues object, we are going to specify a property,
 *   (in our case called social) which is an object.
 * 2) Add the form Fields in our JSX.
 *
 */

/**
 * Lecture - 21
 * Managing a field state as an array.
 *
 * Scenario
 * We need to collect the users phone number.
 * We want to collect their primary and secondary phoneNo.
 * But when storing the data, we don't need any clear distinction.
 * We just want them store it as an array of phone numbers under the same label.
 *
 *
 * Steps
 * 1) We need to add a property to our initialValues object.
 * (In our case, intialValue is going to be an array with two empty strings)
 * 2) Add the JSX.
 */

/**
 * Lecture -22
 * FieldArray Component
 * This component helps with a common scenario namely dynamic form controls.
 * Generally though, FieldArray Component help us with common array or
 * list manipulations.
 *
 * Typically, collecting multiple phoneNumbers or multiple addresses
 * is handled through dynamic form controls.
 * i.e. To begin with we only render one field for the user to enter
 * their phoneNumber, we then give them the option to add or provide
 * more numbers if they wish to.
 * List of phoneNumbers would be managed as an array in our form state.
 *
 * Scenario
 * Implement a dynamic form control to collect the users phone numbers
 * using the FieldArray Component.
 *
 * Steps
 * 1) Import FieldArray from formik.
 * 2) We need to add a new property to our initialValues object.
 *    (In our case phNumbers), It will be an array with one empty string.
 *    Since, we start off by asking for just phone number. so only one
 *    value to begin with.
 * 3) Add JSX.
 *    3.1) Add div tag and label.
 *    3.2) with previous implementation, after the label we have the field component.
 *         But now, since we are working with a list of form
 *         fields that are dynamic.We will use the FieldArray Component.
 *
 *          To the FieldArray Component, we have to specif the name props
 *          just like the Field Component.
 *
 *          In case of FieldArray Component, the name props will be equal
 *          to the propert that is specified in the initial values object.
 *
 *    3.3) To be in control of this dynamic form, we need to use the
 *          render props pattern for this FieldArray Component.
 *
 *        In the fieldArrayProps object, (In our case) we are
 *        interested in two functions and one property.
 *        1) push() -> To add a new phone number
 *        2) remove() -> use to remove an existing phone number.
 *        3) values property -> need this to render our JSX.
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
          <Field as="textarea" type="text" id="comments" name="comments" />
          <ErrorMessage name="comments" />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <Field type="text" id="address" name="address">
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
          </Field>
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

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
