import React, {Component} from "react";
import {Col, Row, Container} from "../../components/Grid";
import {List, ListItem} from "../../components/List";
import {FormBtn, Input} from "../../components/Form";
import {DeleteBtn, Checkbox} from "../../components/Buttons";
import Jumbotron from "../../components/Jumbotron";
import NavHome from "../../components/NavHome";
import API from "../../utils/API";

class Profile extends Component {
    
    state = {
        users:[],
        tasks:[],
        id:"",
        title:"",
        points: 0,
        pointsEarned: 0,
        taskAccomplished: false
    };

    componentDidMount(){
        this.loadTasks();
    }

    loadTasks= () => {
        API.getTasks()
        .then(res => {
            console.log("wtf mate")
            console.log(res)
            console.log(res.data)
            console.log(res.data.task._id)
            this.setState({ tasks: res.data.task, id: "", points: "" })
            }
        )
        .catch(err => console.log(err))
    };

    deleteTask = id => {
        API.deleteTask(id)
        .then(res => this.loadTasks())
        .catch(err => console.log(err))

    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };


    handleCheckboxChange = (id, points) => {
        console.log(id)
        console.log("valueChange")
        API.updateTask(id)
        .then(
            this.setState({taskAccomplished:!this.state.taskAccomplished})
            
        )
        .then(alert("now value is " + !this.state.taskAccomplished))
        .then(this.setState({pointsEarned: this.state.pointsEarned + points}))
        .then(res => this.loadTasks())
        .catch(err => console.log(err))

    }
    

    handleFormSubmit = event => {
        event.preventDefault();
        let user = JSON.parse(sessionStorage.getItem("user"))
        if (this.state.title){
            API.addTask({
                title: this.state.title,
                points: this.state.points,
                taskAccomplished: false,
                userId: user.id
            })
            .then(res => this.loadTasks())
            .catch(err => console.log(err));
        }

    };
    
    render(){
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <NavHome />
                    </Col>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>HIGHTIDE TASK LIST</h1>
                        </Jumbotron>
                    </Col>
                    <Col size="md-6">
                            <h1>ADD SOMETHING TO YOUR TASK LIST</h1>
                            <Row>
                                <Col size="sm-10">
                                    <form>
                                        <Input 
                                            value={this.state.title}
                                            onChange={this.handleInputChange}
                                            name="title"
                                            placeholder="Title (Required)"
                                        />
                                    </form>
                                </Col>
                                <Col size="sm-2">
                                    <form>    
                                         <select 
                                            className="custom-select mr-sm-2" 
                                            id="inlineFormCustomSelect" 
                                            value={this.state.points} 
                                            onChange={this.handleInputChange}
                                            name="points">
                                                <option >Point Value</option>
                                                <option value="1">1</option>
                                                <option value="3">3</option>
                                                <option value="5">5</option>
                                        </select>
                                    </form>    
                                </Col>
                            </Row>
                            <FormBtn
                                disabled={!(this.state.title && this.state.points)}
                                onClick={this.handleFormSubmit}>
                                Add Task
                            </FormBtn>
                            <Row>
                                <h1 className = "pointTitle">
                                Points:
                                </h1>
                                <div className = "pointsDisplay">
                                    {this.state.pointsEarned}
                                </div>
                            </Row>   
                    </Col>
                    <Col size="md-6">
                        <h1>THE LIST</h1>
                        {this.state.tasks.length ? (
                            <List>
                                {this.state.tasks.map(task => {
                                    return (    
                                        <ListItem key={task._id}>
                                            <Row>
                                            <Checkbox value={this.state.taskAccomplished}  onClick={() => (this.handleCheckboxChange(task._id, task.points))}/>
                                             
                                            <strong>
                                                {task.points}
                                            </strong>
                                            <h3>
                                                {task.id}
                                            </h3>
                                            </Row>
                                            <DeleteBtn onClick={() => (this.deleteTask(task._id))}/>
                                        </ListItem>  
                                    );
                                })}
                            </List>
                        ):(
                            <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>
            );
        }
    }
    
    export default Profile;