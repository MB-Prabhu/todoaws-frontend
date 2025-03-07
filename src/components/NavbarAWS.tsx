import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './navbar.module.css'
import apidemoInstance from '../utils/apiclient'
import axios from 'axios'
const NavbarAWS:React.FC = () => {

let navigate = useNavigate()

  const handleLogout = async()=>{
    try{
      let {data} = await apidemoInstance.post('/api/logout')

      if(data.ok){
        console.log("logout successfully")
        navigate('/')
      }

      if(data.msg==="please login to logout"){
        alert(data.msg)
      }
    }
    catch(err){
      console.log(err)
      if (axios.isAxiosError(err)) { 
        if (err.response?.data.msg === "please login to logout") {
          alert(err.response.data.msg); 
        }
      }
    }
  }


  return (
    <nav className={`${style.navbarContainer}`}>
 <div>

<h1>Todo</h1>

    <ul>

        <li><Link to={'/'}>login</Link></li>
        <li><Link to={'/home'}>home</Link></li>
        <li><Link to={'/about'}>about</Link></li>
        <li><Link to={'/contact'}>contact</Link></li>
        
        <li onClick={handleLogout} style={{cursor:"pointer"}}>logout</li>
    </ul>
</div>
    </nav>
   
  )
}

export default NavbarAWS