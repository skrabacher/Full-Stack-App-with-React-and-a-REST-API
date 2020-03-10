//Stateful Class Component
// This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { Component } from 'react'; /*To add React to a stateful component:*/

export default class UserSignUp extends Component {
  
  render() {

    return (
      <div className="App">
            
                <p>
                user sign UP page.
                </p>
                
            </div>
    );
  }

}