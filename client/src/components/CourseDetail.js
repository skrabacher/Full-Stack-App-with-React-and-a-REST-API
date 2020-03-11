//Stateful Class Component
// This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen.
import React, { Component } from 'react'; /*To add React to a stateful component:*/


//retrieves data from the REST API



//Pro Tip: Resist the temptation to keep and manage the courses data as global state in the App component. Instead, allow the Courses and CourseDetail components to retrieve their data from the REST API when those components are mounted. Using this approach simplifies the management of the courses data and ensures that the data won't get out of sync with the REST API's persisted data.

export default class CourseDetail extends Component {

    state = { //state with empty array to hold courses
        course: {},
        id: '',
      }
    
      //makes a GET request to the /courses/:id endpoint and returns a single course object with these properties: id, title, description, estimatedTime, materialsNeeded
      async componentDidMount(id) { 
          console.log("in componentDidMount coursedetail")
        const { context } = this.props; //extracts context from props so we can access context.actions
        const response = await context.actions.api(`/courses/${id}`);//uses api method to make request to course detail route
        if (response.status === 200) { //if request response is returned OKAY
            console.log("200");
          return response.json()//format response to json
            .then(jsonData => console.log("jsonData: ", jsonData)); 
            // .then(jsonData => this.setState({courses: jsonData }));
        } else if (response.status === 401) { //if request can not be authenticated
            console.log("401");
          return null; //return nothing
        } else { // if anything else
            console.log("throw new");
          throw new Error();
        }
      }

    render(){
        return(
            <div className="bounds course--detail">
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">Build a Basic Bookcase</h3>
                    <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                    <p>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</p>
                    <p>Not every piece of furniture needs to be a museum showpiece, though. Often a simple design does the job just as well and the experience gained in completing it goes a long way toward making the next project even better.</p>
                    <p>Our pine bookcase, for example, features simple construction and it's designed to be built with basic woodworking tools. Yet, the finished project is a worthy and useful addition to any room of the house. While it's meant to rest on the floor, you can convert the bookcase to a wall-mounted storage unit by leaving off the baseboard. You can secure the cabinet to the wall by screwing through the cabinet cleats into the wall studs.</p>
                    <p>We made the case out of materials available at most building-supply dealers and lumberyards, including 1/2 x 3/4-in. parting strip, 1 x 2, 1 x 4 and 1 x 10 common pine and 1/4-in.-thick lauan plywood. Assembly is quick and easy with glue and nails, and when you're done with construction you have the option of a painted or clear finish.</p>
                    <p>As for basic tools, you'll need a portable circular saw, hammer, block plane, combination square, tape measure, metal rule, two clamps, nail set and putty knife. Other supplies include glue, nails, sandpaper, wood filler and varnish or paint and shellac.</p>
                    <p>The specifications that follow will produce a bookcase with overall dimensions of 10 3/4 in. deep x 34 in. wide x 48 in. tall. While the depth of the case is directly tied to the 1 x 10 stock, you can vary the height, width and shelf spacing to suit your needs. Keep in mind, though, that extending the width of the cabinet may require the addition of central shelf supports.</p>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>14 hours</h3>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                        <li>1/2 x 3/4 inch parting strip</li>
                        <li>1 x 2 common pine</li>
                        <li>1 x 4 common pine</li>
                        <li>1 x 10 common pine</li>
                        <li>1/4 inch thick lauan plywood</li>
                        <li>Finishing Nails</li>
                        <li>Sandpaper</li>
                        <li>Wood Glue</li>
                        <li>Wood Filler</li>
                        <li>Minwax Oil Based Polyurethane</li>
                        </ul>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
          
 
        );
    }
}
