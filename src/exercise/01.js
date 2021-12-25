// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js
// 1. 💯 accept the step as the action
import * as React from 'react'

const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.step }
    default:
      throw new Error(`countReducer: Unsupported action type ${action.type}`)
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = state

  const increment = () => dispatch({type: 'INCREMENT', step})

  return (
    <div>
      <button onClick={increment}>{count}</button>
    </div>
  )
}

function App() {
  return <Counter />
}

export default App
