import React , {Component} from 'react';
import ToDoContext from '../context/todoContext';

class ToDoList extends Component {
    static contextType= ToDoContext;
    render () {
        let ToDoList
        if (this.props.list.length > 0) {
            ToDoList  = this.props.list.map(task => {
                return <li key={task.id}>
                      <input type="checkbox" onChange={() => this.context.markAsDoneUndone(task.id)} checked={task.checked}/>
                      <input type="text" value={task.taskName} onChange={(event) => this.context.editTask(event,task.id)}/>
                      <button className='delete' onClick={() => this.context.delete(task.id)}>Delete</button>
                    </li>;
            });
        }
        return (
            <div>
                {ToDoList}
            </div>
        );
    }
}

export default ToDoList;