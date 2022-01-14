import React from "react";
import "../App.css";

import { useFormik } from "formik";

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
 */

const YoutubeForm = () => {
  const formik = useFormik({});

  return (
    <>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel" />

        <button>Submit</button>
      </form>
    </>
  );
};

export default YoutubeForm;
