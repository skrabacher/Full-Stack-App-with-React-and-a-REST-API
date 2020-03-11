import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// import './App.css';
//import Components
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

//import Context
import withContext from './Context'; // withContext function from Context.js

//make context available to specific components
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp); // This connects the UserSignUp component to context. In other words, UserSignUp is now a consuming component that's subscribed to all context changes.
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);



export default () => (
  
  
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} /> {/*  will change path to "/courses/:id" once set up */}
        
      </Switch>
    </div>
  </Router>
);


//OG CODE
// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );