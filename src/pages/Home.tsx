import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import { TodoListinter } from '../types'
import SingletodoAWS from '../components/SingletodoAWS'
import apidemoInstance from '../utils/apiclient'
import axios from 'axios'

const Home = () => {

    const [TodoList, setTodoList] = useState<TodoListinter[]>([])


    const [userInput, setUserInput] = useState<string>("")


    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()

            let newObject = {
                todoName: userInput,
                completed: false
            }

            let { data } = await apidemoInstance.post('/api/createTodo', newObject)

            if (data.ok) {
                setTodoList((prev) => ([...prev, { _id:data.data._id, todoName: userInput, completed: false }]))
            }
        }
        catch (err) {

        if (axios.isAxiosError(err)) { // ✅ Check if it's an Axios error
            if (err.response?.data.message) {
              alert(err.response.data.message); // ✅ Fix: Use err.response.data.msg
            }
          } else {
            alert("Something went wrong.");
          }
        }
    }

    useEffect(()=>{
        const getTodo = async ()=>{
            try{
            let { data } = await apidemoInstance.get('/api/getTodo')

            if(data.ok){
                setTodoList(data.data)
            }
            }
            catch(err){
                if (axios.isAxiosError(err)) { 
                    if (err.response?.data.message) {
                      alert(err.response.data.message); 
                    }
                  } else {
                    alert("Something went wrong.");
                  }
                }
            }

        getTodo()
    }, [])

    return (
        <div className={`${style.homecontainer}`}>
            <section>
                <h1>Todo list</h1>

                <form onSubmit={handleSubmit}>
                    <div className={`${style.inputcontainer}`}>
                        <input className={`${style.userInput}`} type="text" onChange={(e) => setUserInput(e.target.value)} />
                        <button type="submit">add</button>
                    </div>

                    {/* <div> */}
                    {TodoList.length > 0 ? TodoList.map(ele => (
                        <SingletodoAWS key={ele._id} setTodoList={setTodoList} TodoItem={ele} />
                    ))
                    :

                    <div>No Todos avaialble...</div>
                    }
                    
                </form>
            </section>
        </div>
    )
}

export default Home