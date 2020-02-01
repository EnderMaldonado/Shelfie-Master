import React,{useReducer} from 'react'
import HandlesContext from './HandlesContext'
import {SET_HANDLE, DELETE_HANDLE} from '../actions'

const initialState = {
  handleKeyDown: ()=>null
}

const handlesReducer = (state, {type, handleName, handle}) => {
  switch (type) {
    case SET_HANDLE:
      return {...state, [handleName]:handle}
    case DELETE_HANDLE:
      let stateAux = {...state}
      delete state[handleName]
      return stateAux
    default:
      return state
  }
}

const HandlesProvider = ({children}) => {
  const [state, dispatch] = useReducer(handlesReducer, initialState)
  return (
    <HandlesContext.Provider value={[state, dispatch]}>
      {children}
    </HandlesContext.Provider>
  )
}

export default HandlesProvider
