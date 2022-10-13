import './App.css';
import React, {useEffect, useState} from "react";
import  {add, clearCompleted, markAllCompleted, remove, toggleCompleted,startCountdown,updateCountdown} from "./features/toDoSlice";
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';


const Todos = () => {
    const todos = useSelector((state)=>state)
    const [title, setTitle] = useState("");
    const [expiry,setExpiry]=useState(new Date().toISOString());
    const [currenttodos,setcurrentTodos]=useState([]);

    useEffect(()=>{
        const updteTimer=()=>{
        const newTodos=todos.map((v)=>{
         return {...v,remainingTime:differnce(v)
        }
       })
       setcurrentTodos(newTodos)
    }
    updteTimer();
    let timer=setInterval(updteTimer,1000*60*10);

    return ()=>clearInterval(timer)
    }
    ,[todos])
    const dispatch = useDispatch()
    
    
    const onSave = (e) => {
      e.preventDefault()
      dispatch(add({title:title,expiryDate:expiry}))
      setTitle("")
    }

    const onDelete = (id) => {
        dispatch(remove(id))
    }

    const handleToggle = (id) => {
        dispatch(toggleCompleted(id))
    }

    const handleCompleted = () => {
        dispatch(clearCompleted())
    }

    const handleMark = () => {
        dispatch(markAllCompleted())
    }
    // const startDeadline=()=>{
    //     dispatch(startCountdown)()
    // }
    // const handleTimer=()=>{
    //     dispatch(updateCountdown())
    // }

    const differnce=(todo)=>{
        if (moment(todo.expiryDate).isAfter(moment(Date.now())))
        {
            // return (`  Remaining ${moment(todo.expiryDate).diff(moment(Date.now()))}`)
            return (`  Remaining ${moment(todo.expiryDate).fromNow()}`)
        }
        else {
            // return (`   Expiry  ${(moment(Date.now())).diff(moment(todo.expiryDate))}`)
            return (`   Expiry  ${moment(todo.expiryDate).fromNow()}`)

        }
    }

  console.log(todos)
    return (
        <div className="container">
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <button  className="saveBtn" onClick={onSave}>Add</button>
            <input type="datetime-local" value={expiry} onChange={(e)=>setExpiry(e.target.value)}></input>
            <ul>
                {currenttodos.map((task) => {
                    return (
                        <li key={task.id}>
                            <div className="taskWrapper">
                                <button className="deleteBtn button-primary" onClick={() => onDelete(task.id)}>X</button>
                                <span className={task.completed ? "toggled" : null } onClick={() => handleToggle(task.id)}>   {task.title}</span>
                                <span>{task.remainingTime}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <button  className="clearBtn" onClick={handleCompleted}>Clear completed tasks</button>
            <button  className="markBtn" onClick={handleMark}>Mark all completed</button>
        </div>
    )
}

export default Todos;
