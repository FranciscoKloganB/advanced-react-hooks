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

export function useAsyncMemo(asyncCallBack, initialState, dependencies) {
  const [state, dispatch] = React.useReducer(reduce, {
    status: 'idle',
    data: null,
    error: null,
    // We accept initial state to allow hook users to override defaults as they wish
    ...initialState,
  })

  React.useEffect(() => {
    // Users of the useAsync API will need to return a promise if they want the Async procedure to carry on.
    // If they asyncCallback is falsey, the procedure will not execute.
    const promise = asyncCallBack()
    if (!promise) {
      return
    }

    dispatch({type: 'pending'})
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
    // since we can not known the dependency array of our hook users we will accept a prop with these specified
    // naming asyncCallback as a dependency is not a solution, because it would effectively be the same as not
    // specifying a depdency array, e.g.: it would likely cause a re-render everytime (for most use cases)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  // A custom React hook, much like our Vue composition API hooks, need to expose the data we want to the outside world
  return state
};
