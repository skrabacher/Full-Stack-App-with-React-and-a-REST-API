//Stateful Class Component
// This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { Component } from 'react'; /*To add React to a stateful component:*/
// import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
  
state = { //state to hold values entered into form field by users
  emailAddress: '',
  password: '',
}

  render() {
    const {
      emailAddress,
      password,
    } = this.state;

    return (
      <div class="bounds">
        <div class="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div><input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" value=""></input></div>
              <div><input id="password" name="password" type="password" class="" placeholder="Password" value=""></input></div>
              <div class="grid-100 pad-bottom"><button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
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
