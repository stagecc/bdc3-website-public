import React, { createContext, useContext, useReducer } from 'react'
import { useLocalStorage } from '../../../hooks'

const CartContext = createContext({ })

function initialState(keys) {
  return keys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
}

//

export const useCart = (keys) => {
  const [cart, dispatch] = useReducer(reducer, initialState(keys))

  function reducer(state, signal) {
    switch (signal.action) {
      case 'add':
        return { ...state, [signal.type]: [...state[signal.type], signal.item] }
      case 'remove':
        const index = state[signal.type].findIndex(item => item.id === signal.id)
        if (index === -1) {
          return { ...state }
        }
        return {
          ...state,
          [signal.type]: [...state[signal.type].slice(0, index), ...state[signal.type].slice(index + 1)],
        }
      case 'clear':
        return initialState(keys)
      default:
        return { ...state }
    }
    throw Error('Unknown action: ' + signal.action);
  }

  const add = (type, item) => {
    dispatch({
      action: 'add',
      type, // item type. a key indicating where to store this item
      item, // the item to add
    })
  }

  const remove = (type, id) => {
    dispatch({
      action: 'remove',
      type, // item type. a key indicating where this item lives in the cart object.
      id, // the id of the item to remove
    })
  }

  const contains = (type, id) => {
    return cart[type].some(item => item.id === id)
  }

  const clear = () => {
    dispatch({ action: 'clear' })
  }

  return {
    contents: cart,
    add, remove, clear, contains,
  }
}
