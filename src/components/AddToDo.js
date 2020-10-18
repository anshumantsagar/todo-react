import React, {Component} from 'react';
import ToDoContext from '../context/todoContext';

class AddToDo extends Component {
    static contextType = ToDoContext;
    render () {
        return (
            <div>
                <input placeholder="Enter a new task"
                value={this.context.newTaskValue} 
                onChange={(event) => {this.context.onChangeAdd(event.target.value)}}/>
                <button onClick={this.context.addToDo}>Add Task</button>
            </div>
        );
    }
}

export default AddToDo;