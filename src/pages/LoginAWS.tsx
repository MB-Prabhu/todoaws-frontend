import React, { useState } from 'react'
import apidemoInstance from '../utils/apiclient';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginAWS = () => {

    const [userDetail, setUserDetail] = useState({
        email:"",
        password:""
    })

    let navigate = useNavigate()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{

        let {name, value} = e.target

        setUserDetail(prev=> ({...prev, [name]:value}))
    }

    const handleSubmit = async (e:React.FormEvent)=>{
      try{
        e.preventDefault()

        let {data} = await apidemoInstance.post('/api/login', userDetail) 

        if(data.ok){
          setUserDetail({
            email:"",
            password:""
          })
          navigate('/home')
        }
      }
      catch(err){
        

        if (axios.isAxiosError(err)) { // ✅ Check if it's an Axios error
          if (err.response?.data.message === "Invalid email or password") {
            alert(err.response.data.message); // ✅ Fix: Use err.response.data.msg
          }
          else{
            if(err.response?.data.message)
            alert(err.response.data.message)
          }
        } else {
          alert("Something went wrong.");
        }
      }

    }


  return (
    <div style={{margin:"50px", width:"100vw"}}>
       <form onSubmit={handleSubmit}>
        <h1>login demo</h1>
      <label htmlFor="">email</label> <input type="email"   value={userDetail.email}   name='email' onChange={handleChange} />
      <br />
       <label htmlFor="">password</label> <input type="password" value={userDetail.password} name='password' onChange={handleChange}  />

        <button type='submit'>submit</button>

       </form>
        
       
    </div>
  )
}

export default LoginAWS