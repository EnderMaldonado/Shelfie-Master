import React,{useReducer} from 'react'
import NavigationContext from './NavigationContext'
import {SET_PAGE} from '../actions'

const initialState = {
  page:"createLabels",
}

const navigationReducer = (state, {type, page}) => {
  switch (type) {
    case SET_PAGE:
      return {...state, page}
    default:
      return state
  }
}

const NavigationProvider = ({children}) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState)
  return (
    <NavigationContext.Provider value={[state, dispatch]}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
