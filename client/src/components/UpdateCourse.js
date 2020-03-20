//Stateful Class Component
// This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
import React, { Component } from 'react'; /*To add React to a stateful component:*/
import Form from './Form.js'; //brings in validation error handling and submit and cancel event handler as well as renders the buttons for submit and cancel


export default class UpdateCourse extends Component {
    state = { //state to hold form field values
		title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
		errors: [],
		userId: this.props.context.authUser.id
		
      }
    render(
        
        return(){

        };
    )
}