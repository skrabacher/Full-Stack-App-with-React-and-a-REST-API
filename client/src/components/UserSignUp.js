//Stateful Class Component
// This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import Form from './Form.js';
import { Link } from 'react-router-dom'; //adds functionality for "click here" link to the user sign in page


export default class UserSignUp extends Component {
  state = { //state to hold values entered into form field by users and errors sent from the validation handler
    name: '',
    emailAddress: '',
    password: '',
    errors: [],
  }
  render() {
    const {
      name,
      emailAddress,
      password,
      errors,
    } = this.state;
    return ( //<Form /> JSX modeled using React Authentication Workshop
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => ( //render prop
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

}