//Modeled from React Authentication Workshop form component

// renders the "Submit" and "Cancel" buttons for the sign up and sign in pages
// contains the event handlers for the "Submit" and "Cancel" buttons
// displays validation errors sent from the API using <ErrorsDisplay />

import React from 'react';

export default (props) => { //props from user sign up or user sign in
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) { //sign-in/sign-up/create-course button submit handler
    event.preventDefault();
    submit();
  }

  function handleCancel(event) { //cancel button event handler
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) { //renders any validation errors sent from the API, via <ErrorsDisplay> 
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}