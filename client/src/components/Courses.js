//Stateful Class Component
// This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.
import React, { Component } from 'react'; /*To add React to a stateful component:*/

//retrieves data from the REST API

//Pro Tip: Resist the temptation to keep and manage the courses data as global state in the App component. Instead, allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. Using this approach simplifies the management of the courses data and ensures that the data won't get out of sync with the REST API's persisted data.
export default class Courses extends Component {
    render() {
      return (
        <div className="bounds">
          <div className="grid-100">
            <h1>`Welcome to the Main Page - Returns a list of courses (including the user that owns each course)`</h1>
          </div>
        </div>
      );
    }
  }