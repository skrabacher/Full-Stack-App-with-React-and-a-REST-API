//Stateful Class Component
// This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import Form from './Form.js'; //brings in validation error handling and submit and cancel event handler as well as renders the buttons for submit and cancel


export default class UpdateCourse extends Component {

    state = { //state to hold form field values
        course: {},
       
		errors: [],
        userId: this.props.context.authUser.id,
        instructorFirstName: this.props.context.authUser.firstName,
        instructorLastName: this.props.context.authUser.lastName
      }
      
    //makes a GET request to the /courses/:id endpoint and returns a single course object with these properties: id, title, description, estimatedTime, materialsNeeded
    async componentDidMount() { 
        console.log("in componentDidMount updatecourse")
        const { match: { params } } = this.props; //pulls params with course id number by accessing the key/value pair parsed into the route in app.js  
        const { context } = this.props; //extracts context from props so we can access context.actions
        const response = await context.actions.api(`/courses/${params.id}`);//uses api method to make request to course detail route
        console.log("response :", response);
        if (response.status === 200) { //if request response is returned OKAY
            console.log("200");
        return response.json()//format response to json
            // .then(jsonData => console.log("jsonData: ", jsonData)); 
            .then(jsonData => this.setState({course: jsonData }))
                .then(console.log("this.state: ", this.state));
        } else if (response.status === 401) { //if request can not be authenticated
            console.log("401");
        return null; //return nothing
        } else { // if anything else
            console.log("throw new");
        throw new Error();
        }
    }

    render() {
        // const courseTitle = this.state.course.title;
        // const instructorFirstName = this.state.course.instructor.firstName;
        // const instructorLastName = this.state.course.instructor.lastName;
        // const courseDesc = this.state.course.description;
        // const courseEstTime = this.state.course.estimatedTime;
        // const courseMaterials = this.state.course.materialsNeeded;
        // const courseId = this.state.course.id;

        console.log("this.state.course: ", this.state.course);
        
        const  { course }  = this.state;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        } = course;
        
        console.log("course: ", course);
         console.log("course.title: ", course.title);

        const { instructorFirstName } = this.state;
        const { instructorLastName } = this.state;

        return(
          
                    <div className="bounds course--detail">
                        <h1>Update Course</h1>
                        <div>
                        <form>
                            <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder={ title } defaultValue={ title } /></div>
                                <p>By { instructorFirstName } { instructorLastName }</p>
                            </div>
                            <div className="course--description">
                                <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={ description } /></div>
                            </div>
                            </div>
                            <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={ estimatedTime } /></div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={ materialsNeeded } /></div>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
                        </form>
                        </div>
                    </div>
         
        );
    }
}