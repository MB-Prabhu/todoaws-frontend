import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import apidemoInstance from '../utils/apiclient';

interface ProtectedRoutesProps {
    element: ReactElement;
  }
  
  const ProtectedRoutesAWS: React.FC<ProtectedRoutesProps> = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    let location = useLocation()
  
    useEffect(() => {
      const checkAuth = async () => {
          try {
            console.log("im from check auth")

             let {data} =  await apidemoInstance.get(`/api/isAuthenticatedUser`, {
              withCredentials: true
             })
              console.log("data from Protected routes", data)
              setIsAuthenticated(data.authenticated);
          }  catch (error) {
              console.log("error form protected routes", error)
              if (axios.isAxiosError(error)) {
                console.log(error)
              }
              else {
                console.log(error)
              }
              setIsAuthenticated(false)
          } finally
           {
              setLoading(false);
          }
      };
  
      checkAuth();
  }, [location.pathname]);
  
  if (loading || isAuthenticated === null) {
    return <>protected routes loading</>
  }
  
    console.log("isAuthenticated protectedRoutes", isAuthenticated)
   
     console.log("im in protectedRutes")
  
    if(isAuthenticated){
      console.log("returning the component")
      
     return <>{element}</>
    }
    else{
     
        return <Navigate to="/" />

     
    }
  };
export default ProtectedRoutesAWS