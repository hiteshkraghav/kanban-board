import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      taskName:'',
      tasks: [
        { name: '1', stage: 0 },
        { name: '2', stage: 0 },
      ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  moveToForward = (task) => {
    const stateCopy = [...this.state.tasks];
   
    let newArray= stateCopy.filter(x=>x.name!=task.name);
    newArray=[...newArray,{name:task.name,stage:task.stage+1}];
    this.setState({
      tasks: newArray
    });
  }
addInput =(e)=>
{
  this.setState({taskName:e.target.value});
}

addTask=()=>{
  if(this.state.taskName=='')
    return;
  this.setState({
    tasks:[
      ...this.state.tasks,
      {
        name : this.state.taskName,
        stage:0
      }
    ]
  });
  this.setState({taskName:''});
}

 moveToBack = (task) => {
  const stateCopy = [...this.state.tasks];
  let newArray= stateCopy.filter(x=>x.name!=task.name);
  newArray=[...newArray,{name:task.name,stage:task.stage-1}];
  this.setState({
    tasks: newArray
  });
}

deleteTask = (task) => {
  const stateCopy = [...this.state.tasks];
  let newArray= stateCopy.filter(x=>x.name!=task.name);
  
  this.setState({
    tasks: newArray
  });
}
  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input value={this.state.taskName} onChange={e=>this.addInput(e)}id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" />
          <button onClick={this.addTask} type="submit" className="ml-30" data-testid="create-task-button">Create task</button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            <button className="icon-only x-small mx-2" disabled={task.stage==0?true:false} onClick={()=>this.moveToBack(task)} data-testid={`${task.name.split(' ').join('-')}-back`}>
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button className="icon-only x-small mx-2" disabled={task.stage==3?true:false} onClick={()=>this.moveToForward(task)} data-testid={`${task.name.split(' ').join('-')}-forward`}>
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button className="icon-only danger x-small mx-2" onClick={()=>this.deleteTask(task)}  data-testid={`${task.name.split(' ').join('-')}-delete`}>
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}