import React from 'react'
import Token from './Token'
const TokenProvider = ({children}) => {

    const[token,setToken]=React.useState()
    
  return (
   <Token.Provider value={{token,setToken}} >
    {children}

   </Token.Provider >
  )
}

export default TokenProvider