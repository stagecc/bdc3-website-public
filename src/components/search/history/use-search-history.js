import { useEffect, useReducer } from 'react'
import { useLocalStorage } from '../../../hooks'

const MAX_HISTORY_SIZE = 20

export const useSearchHistory = () => {
  const [savedHistory, saveHistory] = useLocalStorage('search-history', [])
  const [items, dispatch] = useReducer(reducer, savedHistory)

  useEffect(() => {
    saveHistory([...items])
    // saveHistory is not needed to be in this dependency array;
    // see https://react.dev/learn/lifecycle-of-reactive-effects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  function reducer(state, signal) {
    switch (signal.action) {
      case 'add':
        // new item to add: object with the query and the time it was searched
        return [
          signal.item,
          ...state,
        ].slice(0, MAX_HISTORY_SIZE)
      default:
        return state
    }
  }


  const add = query => {
    dispatch({
      action: 'add',
      item: { query, timestamp: Date.now() },
    })
  }

  return {
    items,
    add,
  }
}