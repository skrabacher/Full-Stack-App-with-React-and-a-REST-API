//Stateful Class Component
// This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import Form from './Form.js'; //brings in validation error handling and submit and cancel event handler as well as renders the buttons for submit and cancel
import { Link } from 'react-router-dom'; //adds functionality for "click here" link to the user sign in page


export default class UserSignUp extends Component {
  
  state = { //state to hold values entered into form field by users and errors sent from the validation handler
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }
  
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
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
            elements={() => ( //render prop (streamlines DOM formatting)
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                  <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
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
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="confirmPassword"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Password Confirmation" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }



  //EVENT HANDLERS

  change = (event) => { //saves to state, any changes made to the firstname, lastname, email, confirmpassword, and password input fields
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => { //makes the submit handler cleaner and easier to understand using detructuring
    const { context } = this.props; //extracts context from props so we can access context.actions

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state; // unpacks the name, username and password properties from the state object (this.state) into distinct variables
    
    // New user data to be sent to DB (payload)
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    }; //This user object is the new user payload that will be passed to the createUser() method. It uses the ES2015 object shorthand syntax to include the just the key names because the values have the same name as the keys.

    if (password === confirmPassword) { //if the passwords the user entered do not match, add an error to the errors array in state
     
      context.actions.createUser(user) //createUser() is an asynchronous operation that returns a promise. The resolved value of the promise is either an array of errors (sent from the API if the response is 400), or an empty array (if the response is 201).
      .then( errors => { //use .then() to get the value of the returned promise and check if it's an error or console lgo successful sign up
        if (errors.length) {
          this.setState({ errors }); // OR console.log(errors);
        } else {
          context.actions.signIn(emailAddress, password) //automatically signs user in when they sign up
            .then(() => { //signIn() is async & returns a promise so we can use .then() method chaining
              this.props.history.push('/'); //redirects user to authenticated page so they know sign up was successful   
            });
          // console.log(`${username} is successfully signed up and authenticated!`);
        }
      })
      .catch( error => { // handle rejected promise if createUser() returns a rejected promise
        console.log(error);
        this.props.history.push('/error'); // redirects user to error route in event of an error
      }); 
    } else {
    this.setState( {errors: [{message: "Error: Password and Password Confirmation do not match"}]})
    }
    
  }

  //If a user decides to cancel registration, we will redirect them back to the home route upon clicking "Cancel".
  cancel = () => {
    this.props.history.push('/'); //redirects to homepage
  }

}