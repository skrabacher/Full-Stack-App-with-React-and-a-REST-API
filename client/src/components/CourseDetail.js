//Stateful Class Component
// This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import { Link } from 'react-router-dom';


import ReactMarkdown from 'react-markdown'; // REACT MARKDOWN basic usage: https://www.npmjs.com/package/react-markdown // const ReactMarkdown = require('react-markdown');

//Pro Tip: Resist the temptation to keep and manage the courses data as global state in the App component. Instead, allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. Using this approach simplifies the management of the courses data and ensures that the data won't get out of sync with the REST API's persisted data.

export default class CourseDetail extends Component {

    state = { //state with empty array to hold courses
        course: {
            instructor: {},
        }
      }
    
      //makes a GET request to the /courses/:id endpoint and returns a single course object with these properties: id, title, description, estimatedTime, materialsNeeded
      async componentDidMount() { 
          console.log("in componentDidMount coursedetail")
        const { match: { params } } = this.props; //pulls params with course id number by accessing the key/value pair parsed into the route in app.js  
        const { context } = this.props; //extracts context from props so we can access context.actions
        const response = await context.actions.api(`/courses/${params.id}`);//uses api method to make request to course detail route
        if (response.status === 200) { //if request response is returned OKAY
            console.log("200");
          return response.json()//format response to json
            // .then(jsonData => console.log("jsonData: ", jsonData)); 
            .then(jsonData => this.setState({course: jsonData }));
        } else if (response.status === 401) { //if request can not be authenticated
            console.log("401");
          return null; //return nothing
        } else { // if anything else
            console.log("throw new");
          throw new Error();
        }
      }

    render(){
        const courseTitle = this.state.course.title;
        const instructorFirstName = this.state.course.instructor.firstName;
        const instructorLastName = this.state.course.instructor.lastName;
        const courseDesc = `${this.state.course.description}`; //converts variable to string for ReactMarkdown 
        const courseEstTime = this.state.course.estimatedTime;
        const courseMaterials = `${this.state.course.materialsNeeded}`; //converts variable to string for ReactMarkdown 
        const courseId = this.state.course.id;
        const authUser = this.props.context.authUser;
        const instructorId = this.state.course.instructor.id;

        console.log("courseMaterials: ", courseMaterials);
        console.log("courseMaterials TYPE: ", typeof courseMaterials); //STRING :) 

        console.log("this.state.course: ", this.state.course);
        console.log("this.props.context.authUser ", this.props.context.authUser);
        console.log("this.state.course: ", this.state.course);
        console.log("this.state.course: ", this.state.course);


        return(
            <div >
                <div className="actions--bar">
                    <div className="bounds">
                    { (authUser !== null && authUser.id === instructorId) ?
                        <div className="grid-100">
                            <span>
                                <Link className="button" to={ `/courses/${ courseId }/update` }>Update Course</Link>
                                <button className="button" onClick={ this.delete } >Delete Course</button>
                            </span>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    :
                        <div className="grid-100">
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    }

                    
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">

                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{ courseTitle }</h3>
                        <p>By { instructorFirstName } { instructorLastName }</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown source={ courseDesc }  />
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <h3>{ courseEstTime }</h3>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                                <ReactMarkdown source={ courseMaterials }  />
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
          
 
        );
    }
//Delete Button Event Handler
    delete = () => {
        const { context } = this.props; // 
        const { match: { params } } = this.props; //pulls params with course id number by accessing the key/value pair parsed into the route in app.js  
        console.log(context);
        console.log(params.id);
        const courseId = params.id;
        const emailAddress = context.authUser.emailAddress;
        const password = context.authUser.password;
        context.actions.deleteCourse(courseId, emailAddress, password)
            .then(window.location.href = "/")// AFTER the course has been deleted user is navigated to home page where they can view the updated and re-rendered course list
    }

// context.actions.deleteCourse(courseId, instructor.emailAddress, instructor.password)


}
