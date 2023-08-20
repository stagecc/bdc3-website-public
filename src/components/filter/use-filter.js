import { useReducer } from 'react'

//


// this utility turns an array os strings, like
//   ['item1', 'item2', 'item3', ...],
// into a filter object, like
//   { item1: false, item2: false, item3: false, ... }.
const listToFilters = words => words.reduce((acc, f) => ({ ...acc, [f]: false }), {})

export const useFilter = (keys) => {
  const [filters, dispatch] = useReducer(reducer, { ...listToFilters(keys) })

  function reducer(state, signal) {
    switch (signal.action) {
      case 'update':
        return { ...listToFilters(signal.items), ...state }
      case 'toggle':
        return { ...state, [signal.key]: !state[signal.key] }
      case 'clear':
        return { ...Object.keys(state).reduce((acc, key) => ({ ...acc, [key]: false }), {}) }
      default:
        return { ...state }
    }
  }

  const update = items => dispatch({ action: 'update', items })

  const toggle = key => dispatch({ action: 'toggle', key })
  
  const clear = key => dispatch({ action: 'clear' })
  
  const active = () => Object.keys(filters).length === 0
    ? []
    : Object.keys(filters).filter(key => filters[key] === true)
  
  const isActive = key => filters[key] || false

  return {
    filters,
    update,
    toggle,
    clear,
    active,
    isActive,
  }
}
