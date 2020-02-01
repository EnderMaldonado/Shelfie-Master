import React,{useReducer} from 'react'
import ListContext from './ListContext'
import {SET_ITEM_HISTORY_ACTIONS, ADD_ITEM_HISTORY_ACTIONS, REMOVE_ITEM_HISTORY_ACTIONS, 
        CLEAM_LIST_HISTORY_ACTIONS} from '../actions.js'

const initialState = {
}

const listReducer = (state, {type, item, index}) => {
  let historyActions = state.historyActions || []
  
  switch (type) {
    case ADD_ITEM_HISTORY_ACTIONS:
      historyActions.unshift(item)
      if(historyActions.length > 100)
        historyActions.pop()
      return {...state, historyActions}
    case SET_ITEM_HISTORY_ACTIONS:
      if(!historyActions.length)
        return state
      historyActions[index] = item
      return {...state, historyActions}
    case REMOVE_ITEM_HISTORY_ACTIONS:
      historyActions.splice(index, 1)
      return  {...state, historyActions}
    case CLEAM_LIST_HISTORY_ACTIONS:
      return {...state, historyActions:[]}
    default:
      return state
  }
}

const ListProvider = ({children}) => {
  const [state, dispatch] = useReducer(listReducer, initialState)
  return (
    <ListContext.Provider value={[state, dispatch]}>
      {children}
    </ListContext.Provider>
  )
}

export default ListProvider
