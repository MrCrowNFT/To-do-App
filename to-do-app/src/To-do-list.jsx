import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bin from './assets/bin.png';

function ToDoList(){
    //define the tasks as an array of objects
    const [tasks, setTasks] = useState([]);

    const [objective, setObjective] = useState("");
    const [deadline, setDeadline] = useState(new Date());
    const [state, setState] = useState("Pending");
    
    function handleAddTask(){
        //Deadline must be converted to string for some reason
        const newTask ={Objective: objective,
                     Deadline: deadline.toDateString(),
                     State: state}

        setTasks(t => [...t, newTask]);

        //Reset the variable for the next task
        setObjective("");
        setDeadline(new Date());
        setState("Pending")
    }
    function handleRemoveTask(index){ 
        setTasks(tasks.filter((_, i) => i !== index));
    }
    function handleSetObjective(event){
        setObjective(event.target.value)
    }
    function handleSetDeadline(date){
        setDeadline(date);
    }
    function handleSetState(index, newState){
        setTasks(t => 
            t.map((task, i) =>
                index === i ? {...task, State: newState} : task
        ));
    }

    return(<div>
        <h2>To Do List</h2>
        <input type="text" value={objective} onChange={handleSetObjective} 
               placeholder="Insert you task"/>
        <DatePicker selected={deadline} onChange={(date) => handleSetDeadline(date)} />
        <button onClick={handleAddTask}>Add Task</button>
        <ol>
            {tasks.map((task, index) =>
                <li className="task" key={index}>
                                <p>{task.Objective}</p>
                                <p>{task.Deadline}</p> 
                                <p>{task.State}</p>
                                <select value={task.State} 
                                    onChange={(event) => handleSetState(index, event.target.value)}>
                                        <option value="">Select an option</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                </select>
                                <button><img src={bin} 
                                             onClick={() =>handleRemoveTask(index)}/>
                                </button>
                </li>)}
        </ol>
        
    </div>)
}
export default ToDoList