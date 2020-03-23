//Stateful Class Component
// This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import Form from './Form.js'; //brings in validation error handling and submit and cancel event handler as well as renders the buttons for submit and cancel


export default class UpdateCourse extends Component {

    state = { //state to hold form field values
        course: {
            id: "",
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: ""
        },
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
        const { errors } = this.state;

        return(
          
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                        <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                    </div>
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course"
                            elements={() => (
                                <React.Fragment>
                                    <div className="grid-66">

                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div><input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            className="input-title course--title--input" 
                                            placeholder={ title } 
                                            value={ title }
                                            onChange={ this.change } 
                                        /></div>
                                        <p>By { instructorFirstName } { instructorLastName }</p>
                                    </div>

                                    <div className="course--description">
                                        <div><textarea id="description" name="description" className placeholder="Course description..." value={ description } onChange={ this.change } /></div>
                                    </div>

                                    </div>
                                    <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={ estimatedTime } onChange={ this.change } /></div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." value={ materialsNeeded } onChange={ this.change } /></div>
                                        </li>
                                        </ul>
                                    </div>
                                    </div>
                                    {/* <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div> */}
                                </React.Fragment>
                            )} />
                           
                </div>
            </div>
    
        );
    }
    //EVENT HANDLERS
    //change
    change = (event) => { //saves to state, any changes made to the firstname, lastname, email, confirmpassword, and password input fields
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            course: {
                [name]: value
            }
          };
        });
      }

    //submit
    submit = () => {
        const { context } = this.props; //extracts context from props so we can access context.actions

        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        } = this.state; //unpacks all the data stored in state into distinct variables

    // New course data to be sent to DB (payload)
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };
        const instructor = this.props.context.authUser;

        context.actions.updateCourse(course, instructor.emailAddress, instructor.password) //createCourse() is an asynchronous operation that returns a promise. The resolved value of the promise is either an array of errors (sent from the API if the response is 400), or an empty array (if the response is 201).

            .then( errors => { //use .then() to get the value of the returned promise and check if it's an error
                if (errors.length) {
                    console.log("err email: ", instructor.emailAddress);
                    console.log("err password: ", instructor.password);
                    this.setState({ errors });
                } else {
                    console.log("email: ", instructor.emailAddress);
                    console.log("password: ", instructor.password);
                    context.actions.signIn( instructor.emailAddress, instructor.password )
                    .then(() => {
                        this.props.history.push('/'); //send user to home page once course created
                    });
                    // this.props.history.push('/');
                }
            })
            .catch( error => { // handle rejected promise if createCourse() returns a rejected promise
                console.log("instructor: ", instructor);
                console.log("catch err email: ", instructor.emailAddress);
                console.log("catch err password: ", instructor.password);
                console.log(error);
                this.props.history.push('/error'); // redirects user to error route in event of an error
            });
    }
    //cancel
    //If a user decides to cancel registration, we will redirect them back to the home route upon clicking "Cancel".
    cancel = () => {
        this.props.history.push('/'); //redirects to homepage
    }
}