import React,{useReducer} from 'react'
import LoadingContext from './LoadingContext'
import {SET_LOADING} from '../actions'

const initialState = {
  loading: false
}

const LoadingReducer = (state, {type, loading}) => {
  switch (type) {
    case SET_LOADING:
      return {...state, loading}
    default:
      return state
  }
}

const LoadingProvider = ({children}) => {
  const [state, dispatch] = useReducer(LoadingReducer, initialState)
  return (
    <LoadingContext.Provider value={[state, dispatch]}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
