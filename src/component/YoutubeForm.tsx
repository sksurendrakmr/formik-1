import React from "react";
import "../App.css";

/**
 * In this component we create a form and
 * manage the form state, handling form submission
 * and validation and display error message using formik
 */

const YoutubeForm = () => {
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
