//Stateful Class Component
// This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { Component } from 'react'; /*To add React to a stateful component:*/
// import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
  
    render() {
  
      return (
        <div className="App">
              
                  <p>
                  user sign IN page.
                  </p>
                  
              </div>
      );
    }
  
  }

