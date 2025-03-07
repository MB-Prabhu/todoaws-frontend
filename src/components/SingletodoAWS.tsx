import React from 'react'
import { TodoListinter } from '../types';
import style from './SingleTodoAWs.module.css'
import apidemoInstance from '../utils/apiclient';

interface singletodinter {
    setTodoList:React.Dispatch<React.SetStateAction<TodoListinter[]>>;
    TodoItem:TodoListinter;
}

const SingletodoAWS:React.FC<singletodinter>= ({setTodoList, TodoItem}) => {

    const updateTodo = async (id:string, completed:boolean)=>{

        try {

           
    
            // Flip the completed status
            let updatedCompleted = !completed;
    
            // Send the request to update the todo
            let { data } = await apidemoInstance.patch(`/api/updateTodo/${TodoItem._id}`, { completed: updatedCompleted });
    
            // console.log(data); 
    
            // Update the local state to reflect the change
            if (data) {
                setTodoList((prev) => 
                    prev.map((ele) => 
                        ele._id === id ? { ...ele, completed: updatedCompleted } : ele
                    )
                );
            }
        }
        catch (err) {
            // console.log(err)
        }
    
       
    }

    const handleDelete = async (id:string)=>{
        try{
            let { data } = await apidemoInstance.delete(`/api/deleteTodo/${TodoItem._id}`);
    
    
            // Update the local state to reflect the change
            if (data) {
                setTodoList((prev) => 
                    prev.filter((ele) => 
                        ele._id !== id 
                    )
                );
            }
        }
        catch(err){
            // console.log(err)
        }
    }
    

  return (
    <div className={`${style.singletodocontainer}`}>
        <p>{TodoItem.todoName}</p>
        <input  type="checkbox" checked={TodoItem.completed} onChange={()=> updateTodo(TodoItem._id as string, TodoItem.completed as boolean)}/>
       <button type='button' onClick={()=> handleDelete(TodoItem._id as string)}>delete</button>
    </div>
  )
}

export default SingletodoAWS