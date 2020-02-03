import React,{useReducer} from 'react'
import SessionContext from './SessionContext'
import {SET_USER, EXIT_SESSION} from '../actions'

const initialState = {
  user:"",
  typeUser:""
}

const sessionReducer = (state, {type, user, typeUser}) => {
  switch (type) {
    case SET_USER:
      return {...state, user, typeUser}
    case EXIT_SESSION:
      return {...state, user:"", typeUser:""}
    default:
      return state
  }
}

const SessionProvider = ({children}) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState)
  return (
    <SessionContext.Provider value={[state, dispatch]}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
