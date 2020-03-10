// stateless functional component
import React from 'react';
import { Redirect } from 'react-router-dom';// adds routing redirect functionality 
// This component is a bit of an oddball as it doesn't render any visual elements. Instead, it signs out the authenticated user and redirects the user to the default route (i.e. the list of courses).

export default () => {
//export default ({ context }) => {
    // context.actions.signOut(); //signs user out
  
    return (
      <Redirect to="/" /> //redirects to home page after sign out
    );
  }

