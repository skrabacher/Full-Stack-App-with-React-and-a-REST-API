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
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';



//import Context
import withContext from './Context'; // withContext function from Context.js

//import private route (any route designated as a PrivateRoute will require user sign in, if user not signed in will redirect to sign in page)
import PrivateRoute from './PrivateRoute';

//make context available to specific components
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp); // This connects the UserSignUp component to context. In other words, UserSignUp is now a consuming component that's subscribed to all context changes.
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);



export default () => (
  
  
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} /> 
        <Route path="/courses/:id" component={CourseDetailWithContext} /> 
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
      </Switch>
    </div>
  </Router>
);


// //ROUTE ORDER: 

// / - Courses
// /courses/create - CreateCourse
// /courses/:id/update - UpdateCourse
// /courses/:id - CourseDetail
// /signin - UserSignIn
// /signup - UserSignUp
// /signout - UserSignOut


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