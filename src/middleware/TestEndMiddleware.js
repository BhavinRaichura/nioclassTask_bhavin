import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const TestEndMiddleware = ({children}) => {
    const state = useSelector(state => state.userReducer)
    console.log(state);
    if(state.end===1){
        console.log("end page called")
        return (
            <>
                {children}
            </>
          )
    }
    return <Navigate to={'/'} replace />;
}

export default TestEndMiddleware