import React,{useReducer} from 'react'
import ShopContext from './ShopContext'
import {SET_SHOP_NAME} from '../actions.js'

const initialState = {
  shopName: ""
}

const shopReducer = (state, {type, shopName}) => {
  switch (type) {
    case SET_SHOP_NAME:
      return {...state, shopName}
    default:
      return state
  }
}

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(shopReducer, initialState)
  return (
    <ShopContext.Provider value={[state, dispatch]}>
      {children}
    </ShopContext.Provider>
  )
}

export default StoreProvider
