import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'

import SignupPage from './Auth/SignupPage'
import LoginPage from './Auth/LoginPage'
import DashBoard from './Component/DashBoard'
import PrivateRoute from './Auth/PrivateRoute'
function App() {
 

  return (
    <>
    <Routes>
       <Route path='/' exact element={  <SignupPage/>} />
       <Route path='/login'  element={  <LoginPage/>} />
       <Route path='/dashboard' element={<DashBoard/>}/>
       {/* <PrivateRoute path="/dashboard" element={<DashBoard />} /> */}
    </Routes>
   
     {/* <LoginPage/> */}
      
    </>
  )
}

export default App
