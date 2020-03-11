//Stateful Class Component
// This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.
import React, { Component } from 'react'; /*To add React to a stateful component:*/

//retrieves data from the REST API

//Pro Tip: Resist the temptation to keep and manage the courses data as global state in the App component. Instead, allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. Using this approach simplifies the management of the courses data and ensures that the data won't get out of sync with the REST API's persisted data.
export default class Courses extends Component {

  state = { //state with empty array to hold courses
    courses: []
  }

  //makes a GET request to the /courses endpoint and returns array of course objects with these properties: id, title, description, estimatedTime, materialsNeeded
  async componentDidMount() { 
    const { context } = this.props; //extracts context from props so we can access context.actions
    const response = await context.actions.api(`/courses`);//uses api method to make request to courses route
    if (response.status === 200) { //if request response is returned OKAY
      return response.json()//format response to json
        // .then(jsonData => console.log(jsonData)); 
        .then(jsonData => this.setState({courses: jsonData }));
    } else if (response.status === 401) { //if request can not be authenticated
      return null; //return nothing
    } else { // if anything else
      throw new Error();
    }
  }

  // componentDidMount() {
  //   context.actions.getCourses()
  //     .then(response => console.log(response)); 
  // }

    render() {

      const courseIndex = this.state.courses;
      courseIndex.map(
        <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Build a Basic Bookcase</h3>
            </a></div>
      )

      return (
        <div className="bounds">
          {/* replace 4 placeholders below with single CourseIndex object that maps over the array */}
          <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Build a Basic Bookcase</h3>
            </a></div>
          <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Learn How to Program</h3>
            </a></div>
          <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Learn How to Test Programs</h3>
            </a></div>
            {/* LINK TO CREATE COURSE BELOW */}
          <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                </svg>New Course</h3>
            </a></div>
        </div>
      
      );
    }
  }
