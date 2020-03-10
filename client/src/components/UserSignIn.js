//Stateful Class Component
// This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import Form from './Form.js'; //brings in validation error handling and submit and cancel event handler as well as renders the buttons for submit and cancel
import { Link } from 'react-router-dom'; //adds functionality for "click here" link to the user sign in page


export default class UserSignIn extends Component {
  
state = { //state to hold values entered into form field by users and errors sent from the validation handler
  emailAddress: '',
  password: '',
  errors: [], //from the form.js validation error handler
}

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return ( //<Form /> JSX modeled using React Authentication Workshop
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => ( //render prop (streamlines DOM formatting)
              <React.Fragment>
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
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }
  //EVENT HANDLERS
  submit = () => {
    const { context } = this.props; //extract the context prop from this.props
    const { emailAddress, password } = this.state; 
    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          console.log("sign in error");
        } else {
          console.log("sign in successful!");
        }
      })
  }
}
