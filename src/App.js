import React from 'react';
import './App.css';

//components
import Remaining from './components/Remaining';
import ToDoList from './components/ToDoList';
import ToDoContext from './context/todoContext';
import AddToDo from './components/AddToDo';
 
class App extends React.Component  {
  state = {
    newTask: '',
    taskList : [
      {taskName:'task 1',id:1,checked:false},
      {taskName:'task 2',id:2,checked:true}
    ],
    filterVariable: 'all'
  }

  _addToDO = () => {
    if (this.state.newTask.trim() !== '') {
      const newTask = {
        taskName : this.state.newTask,
        id : Date.now(),
        checked: false
      }
      const newRemaining = [...this.state.taskList];
      newRemaining.push(newTask);
      this.setState({newTask:'',taskList:newRemaining}, () => {
        console.log(this.state.taskList);
      });
    }
  }

  _deleteToDo = (id) => {
    let newTaskList = [...this.state.taskList];
    newTaskList = newTaskList.filter(elem => {
      return elem.id !== id;
    })
    this.setState({taskList:newTaskList}, () => {
      console.log(this.state.taskList);
    });
  }

  _markAsDoneUndone = (id) => {
    const newTaskList = [...this.state.taskList];  
    newTaskList.forEach(task => {
      if (task.id === id) {
        task.checked = !task.checked;
      }
    }) 
    this.setState({taskList:newTaskList}, () => {
      console.log(this.state.taskList);
    });
  }

  _markAllAsDone = () => {
    if (this.state.taskList.length === 0) {
      return false;
    } else {
      let newTaskList = [...this.state.taskList];
      let value = newTaskList.every( elem => {
        return elem.checked
      })
      if (value) {
        newTaskList.forEach(task => {
          if (task.checked) {
            task.checked = false
          }
        })
      } else {
        newTaskList.forEach(task => {
          if (task.checked !== true) {
            task.checked = true
          }
        })
      }
      this.setState({taskList:newTaskList});
      console.log(newTaskList);
    }
  }

  _clearDone = () => {
    let newTaskList = [...this.state.taskList];
    newTaskList = newTaskList.filter(elem => {
      return elem.checked === false;
    });
    this.setState({taskList:newTaskList});
  }

  _editExistingTask = (event,id) => {
    let newList = [...this.state.taskList]
    newList.forEach(task => {
      if (task.id === id) {
        task.taskName = event.target.value
      }
    });
    this.setState({taskList:newList});
  }

  _onChangeNewTask = (value) => {
    this.setState({newTask:value})
  }

  render() {
    let propList = '';
    let all = '',remain = '',done='';
    let checked = false;
    if (this.state.filterVariable === 'all') {
      propList = this.state.taskList;
      all = 'active';
      remain = '';
      done = '';
    }
    else if (this.state.filterVariable === 'remaining') {
      propList = this.state.taskList.filter(elem => {
        return elem.checked === true
      });
      all = '';
      remain = 'active';
      done = '';
    }
    else if (this.state.filterVariable === 'done') {
      propList = this.state.taskList.filter(elem => {
        return elem.checked === false
      });
      all = '';
      remain = '';
      done = 'active';
    }
    let remaining = 0;
    if (this.state.taskList.length > 0) {
      this.state.taskList.filter(elem => {
        if (elem.checked === false) {
          remaining++;
        }
        return true;
      });
    }
   
    checked = this.state.taskList.every(each => {
      return each.checked;
    })
    

    return (
      <div className="App">
        <ToDoContext.Provider value={
          {
            markAsDoneUndone: this._markAsDoneUndone,
            editTask: this._editExistingTask,
            delete: this._deleteToDo,
            onChangeAdd: this._onChangeNewTask,
            addToDo: this._addToDO,
            newTaskValue: this.state.newTask
          }
        }>
          <h1>todos</h1>
          
          <AddToDo/>
          <div className='features'>
            <input type='checkbox' onChange={this._markAllAsDone} checked={checked}/><p>Mark All Done/Undone</p>
            <button onClick={this._clearDone}>Clear Done</button>
          </div>

          <div>
            <ul>
              <ToDoList list={propList}/>
            </ul>
          </div>

          <div className='filter'>
            <h3 className={all} onClick={() => this.setState({filterVariable:'all'}, () => {console.log(this.state.filterVariable)})}>Show All</h3>
            <h3 className={remain} onClick={() => this.setState({filterVariable:'remaining'}, () => {console.log(this.state.filterVariable)})}>Show Completed</h3>
            <h3 className={done} onClick={() => this.setState({filterVariable:'done'}, () => {console.log(this.state.filterVariable)})}>Show Remaining</h3>
          </div>
          <Remaining value={remaining}/>
        </ToDoContext.Provider>
      </div>

    );
  }
}

export default App;
