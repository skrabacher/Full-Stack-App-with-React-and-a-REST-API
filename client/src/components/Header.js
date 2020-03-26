
// Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user).
import React from 'react';
import { Link } from 'react-router-dom'; //adds functionality for "click here" link to the user sign in page

export default class Header extends React.PureComponent { //Performance improvement: adding pure component feature allows use of the shouldcomponentUpdate() lifecycle method which skips re-rendering when the state and props have not changed
  render() {
    const authUser = this.props.context.authUser;
    console.log("authUser status: ", authUser); 
    return (
      <div className="header">
          <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
             
              {authUser ?
                <React.Fragment>
                  <span>Welcome, { authUser.firstName + ' ' + authUser.lastName }!</span>
                  <Link to="/signout">Sign Out</Link>
                </React.Fragment>
              :
                <React.Fragment>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
                </React.Fragment>
              } 
             
            </nav>
          </div>
        </div>
    );
  }
 
};

