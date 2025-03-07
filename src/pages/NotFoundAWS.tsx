import React from 'react'
import {useNavigate } from 'react-router-dom';

const NotFoundAWS:React.FC = () => {

    let navigate = useNavigate()



  return (
    <div>
        page not found 
        <button onClick={()=> navigate('/')}>go back</button>
    </div>
  )
}

export default NotFoundAWS