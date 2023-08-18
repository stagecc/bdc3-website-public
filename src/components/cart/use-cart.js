import { useMemo, useReducer } from 'react'

function initialState(keys) {
  return keys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
}

//

/*
 * Returns a "Cart" object with functions to interact with its items,
 * e.g., ['type1', 'type2', 'type3'].
 * 
 * @param {Array} keys The keys for the cart object, indicating the types of items stored.
 * @return {Object} An object with keys for keys and empty arrays for values,
 * e.g.,  { type1: [], type2: [], type3: [] }.
 */
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

  const count = useMemo(() => Object.keys(cart)
    .reduce((sum, type) => sum + cart[type].length, 0), [cart])

  return {
    contents: cart,
    add, remove, clear, contains,
    count,
  }
}
