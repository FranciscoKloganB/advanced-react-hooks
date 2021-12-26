import * as React from 'react'

// 🐨 this is going to be our generic asyncReducer
function reduce(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function useAsyncMemo(initialState) {
  // calling unsafeDispatch directly might cause memory leaks when promise resolves and component is not mounted
  const mountedRef = React.useRef(false)

  React.useEffect(() => {
    mountedRef.current = true

    return () => (mountedRef.current = false)
    // No dependencies, only want to call on mount and before unmount
  }, [])

  const [state, unsafeDispatch] = React.useReducer(reduce, {
    status: 'idle',
    data: null,
    error: null,
    // We accept initial state to allow hook users to override defaults as they wish
    ...initialState,
  })

  const dispatch = React.useCallback((...args) => {
    if (mountedRef.current) {
      unsafeDispatch(...args)
    }
    // no dependencies because useReducer dispatch function never changes (is stable)
  }, [])

  const run = React.useCallback(
    promise => {
      if (!promise) {
        return
      }

      dispatch({type: 'pending'})
      promise
        .then(
          data => {
            dispatch({type: 'resolved', data})
          },
          error => {
            dispatch({type: 'rejected', error})
          },
        )
        .catch(error => {
          if (error.name !== 'AbortError') {
            throw error
          }
          console.warn('useAsyncMemo asyncCallback: promise abortion handled', promise)
        })
      // We could pass an empty array as dependency list, because:
      // 1. useReducer ensures that dispatch function reference never changes
      // 2. promise is a dependency that we are taking in as an argument, so that will never change either
    },
    [dispatch],
  )

  return {...state, run}
}
