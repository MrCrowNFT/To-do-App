import React, {useState} from "react";
import bin from './assets/bin.png';

function ToDoList(){
    //define the tasks as an array of objects
    const [tasks, setTasks] = useState([]);

    const [objective, setObjective] = useState("");
    const [deadline, setDeadline] = useState(new Date());
    const [state, setState] = useState("Pending");
    
    function handleAddTask(){
        //Deadline must be converted to string for some reason
        //We'll add a unique id because the change color functionality with
        // the state change was not working for properly, so now the key is id
        const newTask ={id: Date.now(),
                     Objective: objective,
                     Deadline: deadline.toDateString(),
                     State: state}

        setTasks(t => [...t, newTask]);

        //Reset the variable for the next task
        setObjective("");
        setDeadline(new Date());
        setState("Pending")
    }
    function handleRemoveTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }
    function handleSetObjective(event){
        setObjective(event.target.value)
    }
    function handleSetDeadline(event){
        setDeadline(new Date(event.target.value));
    }
    function handleSetState(id, newState) {
        setTasks(t =>
            t.map(task => (task.id === id ? { ...task, State: newState } : task))
        );
    }
    



 

    return(<div className="to-do-list">
        <h2>To Do List</h2>
        <div className="task-input">
        <input className="objective-input" type="text" value={objective} 
                onChange={handleSetObjective} placeholder="Enter you task"/>
        <input  type="date" className="date-picker"  selected={deadline}
                    onChange={(date) => handleSetDeadline(date)} />
        <button className="add-button" onClick={handleAddTask}>Add Task</button>
        </div>
        <ol>
        {tasks
        // Create a copy of the tasks array  and sort it so that
        //the closest task to the deadline is above
        .slice() 
        .sort((a, b) => new Date(a.Deadline) - new Date(b.Deadline))
        .map((task, index) => {
            // Define dynamic background color based on task state
            let backgroundColor;
            switch (task.State) {
                case "Pending":
                    backgroundColor = "white";
                    break;
                case "In Progress":
                    backgroundColor = "lightblue";
                    break;
                case "Done":
                    backgroundColor = "lightgreen";
                    break;
                default:
                    backgroundColor = "white";
            }

            // Return the JSX for the task item
            return (
                <li className="task" key={task.id} style={{ backgroundColor }}>
                    <p>{task.Objective}</p>
                    <p>{task.Deadline}</p> 
                    <select
                        className="state-select"
                        value={task.State}
                        onChange={(event) => handleSetState(task.id, event.target.value)}
                    >
                        <option value="" disabled>Select an option</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <button onClick={() => handleRemoveTask(task.id)} className="bin">
                        <img src={bin} alt="Delete" />
                    </button>
                </li>
            );
        })}
    </ol>
    </div>)
}
export default ToDoList