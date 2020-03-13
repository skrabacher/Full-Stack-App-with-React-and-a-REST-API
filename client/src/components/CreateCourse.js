//Stateful Class Component
// This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import Form from './Form.js'; //brings in validation error handling and submit and cancel event handler as well as renders the buttons for submit and cancel

export default class CreateCourse extends Component {

    state = { //state to hold user input values for new course
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
      }
    
      

    render(){
        const {
					title,
					description,
					estimatedTime,
					materialsNeeded,
					errors
				} = this.state;
		const instructor = this.props.context.authUser;
		console.log("instructor: ", instructor);

        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
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
												submitButtonText="Create Course"
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
																	value={title} 
																	onChange={this.change}  
																	placeholder="Course title..." 
																	defaultValue={""} /></div>
																<p>By { instructor.firstName } { instructor.lastName }</p>
																</div>
																<div className="course--description">
																<div><textarea 
																	id="description" 
																	name="description" 
																	className placeholder="Course description..." 
																	value={description} 
																	onChange={this.change}  
																	defaultValue={""} /></div>
																</div>
														</div>
														<div className="grid-25 grid-right">
																<div className="course--stats">
																<ul className="course--stats--list">
																		<li className="course--stats--list--item">
																		<h4>Estimated Time</h4>
																		<div><input 
																			id="estimatedTime" 
																			name="estimatedTime" 
																			type="text" 
																			className="course--time--input" 
																			value={estimatedTime} 
																			onChange={this.change} 
																			placeholder="Hours" 
																			defaultValue={""} /></div>
																		</li>
																		<li className="course--stats--list--item">
																		<h4>Materials Needed</h4>
																		<div><textarea 
																			id="materialsNeeded" 
																			name="materialsNeeded" 
																			className placeholder="List materials..." 
																			value={materialsNeeded} 
																			onChange={this.change} 
																			defaultValue={""} /></div>
																		</li>
																</ul>
																</div>
														</div>
													
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
            [name]: value
          };
        });
      }
    //submit
		submit = () => {
			const { context } = this.props; //extracts context from props so we can access context.actions

			const {
				title,
				description,
				estimatedTime,
				materialsNeeded
			} = this.state; //unpacks all the data stored in state into distinct variables

    	// New course data to be sent to DB (payload)
			const course = {
				title,
				description,
				estimatedTime,
				materialsNeeded
			};

			context.actions.createCourse(course) //createCourse() is an asynchronous operation that returns a promise. The resolved value of the promise is either an array of errors (sent from the API if the response is 400), or an empty array (if the response is 201).
				.then( errors => { //use .then() to get the value of the returned promise and check if it's an error
					if (errors.length) {
						this.setState({ errors });
					} else {
						this.props.history.push('/');
					}
				})
				.catch( error => { // handle rejected promise if createCourse() returns a rejected promise
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